import type { bgBlock, ElementBlock, SectionBlock } from "@pb/contracts";
import { ASSET_URL_KEYS, MODEL3D_ASSET_KEYS } from "@pb/contracts";

export type AssetTreeNodeKind = "standard" | "model3d" | "bg" | "element" | "section";

export type AssetKeyVisitor = (
  assetKey: string,
  value: string,
  node: Record<string, unknown>,
  kind: AssetTreeNodeKind
) => void;

function visitStandardAssetKeys(
  obj: Record<string, unknown>,
  kind: AssetTreeNodeKind,
  visitor: AssetKeyVisitor
): void {
  for (const key of ASSET_URL_KEYS) {
    const v = obj[key];
    if (typeof v === "string") {
      visitor(key, v, obj, kind);
    }
  }
}

function walkModel3DNode(obj: Record<string, unknown>, visitor: AssetKeyVisitor): void {
  for (const key of MODEL3D_ASSET_KEYS) {
    const v = obj[key];
    if (typeof v === "string") {
      visitor(key, v, obj, "model3d");
    }
  }

  const textures = obj.textures as Record<string, Record<string, unknown>> | undefined;
  if (textures && typeof textures === "object") {
    for (const def of Object.values(textures)) {
      if (def && typeof def === "object") walkModel3DNode(def, visitor);
    }
  }

  const materials = obj.materials as Record<string, unknown> | undefined;
  if (materials && typeof materials === "object") {
    for (const def of Object.values(materials)) {
      if (def && typeof def === "object") {
        walkModel3DNode(def as Record<string, unknown>, visitor);
      }
    }
  }

  const models = obj.models as Record<string, Record<string, unknown>> | undefined;
  if (models && typeof models === "object") {
    for (const def of Object.values(models)) {
      if (def && typeof def === "object") walkModel3DNode(def, visitor);
    }
  }

  const scene = obj.scene as Record<string, unknown> | undefined;
  if (scene && typeof scene === "object") {
    walkModel3DNode(scene, visitor);

    const env = scene.environment as Record<string, unknown> | undefined;
    if (env && typeof env === "object") walkModel3DNode(env, visitor);

    const contents = scene.contents as Record<string, unknown> | undefined;
    if (contents && typeof contents === "object") {
      const modelInstances = contents.models as Record<string, unknown>[] | undefined;
      if (Array.isArray(modelInstances)) {
        for (const inst of modelInstances) {
          if (inst && typeof inst === "object") {
            walkModel3DNode(inst as Record<string, unknown>, visitor);
          }
        }
      }
    }
  }
}

function walkBgBlockInternal(obj: Record<string, unknown>, visitor: AssetKeyVisitor): void {
  visitStandardAssetKeys(obj, "bg", visitor);

  if (obj.type !== "backgroundTransition") return;

  const from = obj.from as bgBlock | undefined;
  const to = obj.to as bgBlock | undefined;

  if (from && typeof from === "object" && "type" in from) {
    walkBgBlockInternal(from as Record<string, unknown>, visitor);
  }
  if (to && typeof to === "object" && "type" in to) {
    walkBgBlockInternal(to as Record<string, unknown>, visitor);
  }
}

export function walkBgBlock(block: bgBlock, visitor: AssetKeyVisitor): void {
  if (!block || typeof block !== "object") return;
  walkBgBlockInternal(block as Record<string, unknown>, visitor);
}

export function walkElement(element: ElementBlock, visitor: AssetKeyVisitor): void {
  if (!element || typeof element !== "object") return;

  const el = element as Record<string, unknown>;

  // Standard asset keys on the element itself (including elementModel3D).
  visitStandardAssetKeys(el, "element", visitor);

  if (el.type === "elementVideo" && Array.isArray(el.sources)) {
    for (const source of el.sources) {
      if (source && typeof source === "object") {
        visitStandardAssetKeys(source as Record<string, unknown>, "element", visitor);
      }
    }
  }

  // 3D subtree for elementModel3D.
  if (el.type === "elementModel3D") {
    walkModel3DNode(el, visitor);
  }

  // Element group: recurse into section.definitions[*].
  const groupSection = (
    el as {
      section?: { definitions?: Record<string, unknown> };
    }
  ).section;
  if (
    el.type === "elementGroup" &&
    groupSection?.definitions &&
    typeof groupSection.definitions === "object"
  ) {
    for (const def of Object.values(groupSection.definitions)) {
      if (def && typeof def === "object") {
        walkElement(def as ElementBlock, visitor);
      }
    }
  }

  // Element module: recurse into moduleConfig.slots[*].section.definitions[*].
  const moduleConfig = el.moduleConfig as Record<string, unknown> | undefined;
  if (moduleConfig && typeof moduleConfig === "object" && moduleConfig.slots) {
    const slots = moduleConfig.slots as Record<
      string,
      { section?: { definitions?: Record<string, unknown> } }
    >;
    for (const slot of Object.values(slots)) {
      const section = slot?.section;
      if (!section?.definitions || typeof section.definitions !== "object") continue;
      for (const def of Object.values(section.definitions)) {
        if (def && typeof def === "object") {
          walkElement(def as ElementBlock, visitor);
        }
      }
    }
  }
}

export function walkSectionKeys(section: SectionBlock, visitor: AssetKeyVisitor): void {
  if (!section || typeof section !== "object") return;
  visitStandardAssetKeys(section as Record<string, unknown>, "section", visitor);
}

export function walkSection(section: SectionBlock, visitor: AssetKeyVisitor): void {
  if (!section || typeof section !== "object") return;

  const s = section as SectionBlock & Record<string, unknown>;

  walkSectionKeys(s, visitor);

  const hasElements =
    (s.type === "contentBlock" || s.type === "scrollContainer" || s.type === "sectionColumn") &&
    Array.isArray(s.elements);
  if (hasElements) {
    for (const el of s.elements as ElementBlock[]) {
      if (el && typeof el === "object") {
        walkElement(el, visitor);
      }
    }
  }

  if (s.type === "revealSection") {
    const collapsed = (s as { collapsedElements?: ElementBlock[] }).collapsedElements;
    const revealed = (s as { revealedElements?: ElementBlock[] }).revealedElements;
    if (Array.isArray(collapsed)) {
      for (const el of collapsed) {
        if (el && typeof el === "object") walkElement(el, visitor);
      }
    }
    if (Array.isArray(revealed)) {
      for (const el of revealed) {
        if (el && typeof el === "object") walkElement(el, visitor);
      }
    }
  }
}

export function walkPageBuilderAssetTree(
  bg: bgBlock | null,
  sections: SectionBlock[],
  visitor: AssetKeyVisitor
): void {
  if (bg) {
    walkBgBlock(bg, visitor);
  }

  for (const section of sections) {
    if (section && typeof section === "object") {
      walkSection(section, visitor);
    }
  }
}
