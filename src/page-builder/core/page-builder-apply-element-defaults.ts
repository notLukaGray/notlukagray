import {
  buildImageMotionTimingFromAnimationDefaults,
  pbBuilderDefaultsV1,
  type PbBodyVariantKey,
  type PbHeadingVariantKey,
  type PbImageVariantKey,
  type PbLinkVariantKey,
} from "@/app/theme/pb-builder-defaults";
import type { ElementBlock, SectionBlock } from "@/page-builder/core/page-builder-schemas";

function asRecord(value: unknown): Record<string, unknown> | null {
  return value != null && typeof value === "object" ? (value as Record<string, unknown>) : null;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isResponsiveStringValue(value: unknown): boolean {
  if (isNonEmptyString(value)) return true;
  if (!Array.isArray(value) || value.length !== 2) return false;
  return value.some((entry) => isNonEmptyString(entry));
}

function isMissingResponsiveString(value: unknown): boolean {
  if (value == null) return true;
  if (typeof value === "string") return value.trim().length === 0;
  if (!Array.isArray(value) || value.length !== 2) return true;
  return value.every((entry) => typeof entry === "string" && entry.trim().length === 0);
}

function isConstraintObject(
  value: unknown
): value is { minWidth?: string; maxWidth?: string; minHeight?: string; maxHeight?: string } {
  return value != null && typeof value === "object" && !Array.isArray(value);
}

function isBoolean(value: unknown): value is boolean {
  return typeof value === "boolean";
}

function isMotionExitTrigger(value: unknown): value is "manual" | "leaveViewport" {
  return value === "manual" || value === "leaveViewport";
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function resolveImageVariantKey(value: unknown): PbImageVariantKey {
  const variants = pbBuilderDefaultsV1.elements.image.variants;
  if (typeof value === "string" && value in variants) return value as PbImageVariantKey;
  return pbBuilderDefaultsV1.elements.image.defaultVariant;
}

function resolveHeadingVariantKey(value: unknown): PbHeadingVariantKey {
  const variants = pbBuilderDefaultsV1.elements.heading.variants;
  if (typeof value === "string" && value in variants) return value as PbHeadingVariantKey;
  return pbBuilderDefaultsV1.elements.heading.defaultVariant;
}

function resolveBodyVariantKey(value: unknown): PbBodyVariantKey {
  const variants = pbBuilderDefaultsV1.elements.body.variants;
  if (typeof value === "string" && value in variants) return value as PbBodyVariantKey;
  return pbBuilderDefaultsV1.elements.body.defaultVariant;
}

function resolveLinkVariantKey(value: unknown): PbLinkVariantKey {
  const variants = pbBuilderDefaultsV1.elements.link.variants;
  if (typeof value === "string" && value in variants) return value as PbLinkVariantKey;
  return pbBuilderDefaultsV1.elements.link.defaultVariant;
}

function mergeMissingFromTemplate(
  el: Record<string, unknown>,
  template: Record<string, unknown>
): boolean {
  let changed = false;
  for (const [key, val] of Object.entries(template)) {
    if (val === undefined) continue;
    if (el[key] === undefined) {
      el[key] = val;
      changed = true;
    }
  }
  return changed;
}

function applyHeadingDefaults(el: ElementBlock): ElementBlock {
  if (el.type !== "elementHeading") return el;
  const rec = { ...(el as unknown as Record<string, unknown>) };
  const variantKey = resolveHeadingVariantKey(rec.variant);
  const template = pbBuilderDefaultsV1.elements.heading.variants[variantKey] as unknown as Record<
    string,
    unknown
  >;
  return mergeMissingFromTemplate(rec, template) ? (rec as ElementBlock) : el;
}

function applyBodyDefaults(el: ElementBlock): ElementBlock {
  if (el.type !== "elementBody") return el;
  const rec = { ...(el as unknown as Record<string, unknown>) };
  const variantKey = resolveBodyVariantKey(rec.variant);
  const template = pbBuilderDefaultsV1.elements.body.variants[variantKey] as unknown as Record<
    string,
    unknown
  >;
  return mergeMissingFromTemplate(rec, template) ? (rec as ElementBlock) : el;
}

function applyLinkDefaults(el: ElementBlock): ElementBlock {
  if (el.type !== "elementLink") return el;
  const rec = { ...(el as unknown as Record<string, unknown>) };
  const variantKey = resolveLinkVariantKey(rec.variant);
  const template = pbBuilderDefaultsV1.elements.link.variants[variantKey] as unknown as Record<
    string,
    unknown
  >;
  return mergeMissingFromTemplate(rec, template) ? (rec as ElementBlock) : el;
}

function applyImageDefaults(el: ElementBlock): ElementBlock {
  if (el.type !== "elementImage") return el;

  const imageDefaults = pbBuilderDefaultsV1.elements.image;
  const image = el as ElementBlock & {
    variant?: unknown;
    motion?: unknown;
    motionTiming?: unknown;
    objectPosition?: unknown;
    objectFit?: unknown;
    aspectRatio?: unknown;
    width?: unknown;
    height?: unknown;
    constraints?: unknown;
    borderRadius?: unknown;
    align?: unknown;
    alignY?: unknown;
    marginTop?: unknown;
    marginBottom?: unknown;
    marginLeft?: unknown;
    marginRight?: unknown;
    rotate?: unknown;
    flipHorizontal?: unknown;
    flipVertical?: unknown;
    opacity?: unknown;
    blendMode?: unknown;
    boxShadow?: unknown;
    filter?: unknown;
    backdropFilter?: unknown;
    overflow?: unknown;
    hidden?: unknown;
    priority?: unknown;
    exitPreset?: unknown;
    imageCrop?: unknown;
  };
  const variantKey = resolveImageVariantKey(image.variant);
  const variant = imageDefaults.variants[variantKey];
  const variantMotionTiming = buildImageMotionTimingFromAnimationDefaults(variant.animation);
  const hasCustomMotion = image.motion != null;

  let changed = false;
  const out: Record<string, unknown> = { ...image };

  if (image.objectFit == null) {
    out.objectFit = variant.objectFit;
    changed = true;
  }
  if (variant.layoutMode === "aspectRatio") {
    if (
      isMissingResponsiveString(image.aspectRatio) &&
      isResponsiveStringValue(variant.aspectRatio)
    ) {
      out.aspectRatio = variant.aspectRatio;
      changed = true;
    }
  } else if (variant.layoutMode === "fill") {
    if (isMissingResponsiveString(image.width) && isResponsiveStringValue(variant.width)) {
      out.width = variant.width;
      changed = true;
    }
    if (isMissingResponsiveString(image.height) && isResponsiveStringValue(variant.height)) {
      out.height = variant.height;
      changed = true;
    }
  } else if (variant.layoutMode === "constraints") {
    if (image.constraints == null && variant.constraints != null) {
      out.constraints = variant.constraints;
      changed = true;
    } else if (isConstraintObject(image.constraints) && isConstraintObject(variant.constraints)) {
      const nextConstraints: Record<string, unknown> = { ...image.constraints };
      let constraintsChanged = false;
      for (const key of ["minWidth", "maxWidth", "minHeight", "maxHeight"] as const) {
        if (!isNonEmptyString(nextConstraints[key]) && isNonEmptyString(variant.constraints[key])) {
          nextConstraints[key] = variant.constraints[key];
          constraintsChanged = true;
        }
      }
      if (constraintsChanged) {
        out.constraints = nextConstraints;
        changed = true;
      }
    }
  }
  if (image.imageCrop == null && variant.imageCrop != null) {
    out.imageCrop = variant.imageCrop;
    changed = true;
  }
  if (!isNonEmptyString(image.objectPosition) && isNonEmptyString(variant.objectPosition)) {
    out.objectPosition = variant.objectPosition;
    changed = true;
  }
  if (
    isMissingResponsiveString(image.borderRadius) &&
    isResponsiveStringValue(variant.borderRadius)
  ) {
    out.borderRadius = variant.borderRadius;
    changed = true;
  }
  if (image.align == null && variant.align != null) {
    out.align = variant.align;
    changed = true;
  }
  if (image.alignY == null && variant.alignY != null) {
    out.alignY = variant.alignY;
    changed = true;
  }
  if (isMissingResponsiveString(image.marginTop) && isResponsiveStringValue(variant.marginTop)) {
    out.marginTop = variant.marginTop;
    changed = true;
  }
  if (
    isMissingResponsiveString(image.marginBottom) &&
    isResponsiveStringValue(variant.marginBottom)
  ) {
    out.marginBottom = variant.marginBottom;
    changed = true;
  }
  if (isMissingResponsiveString(image.marginLeft) && isResponsiveStringValue(variant.marginLeft)) {
    out.marginLeft = variant.marginLeft;
    changed = true;
  }
  if (
    isMissingResponsiveString(image.marginRight) &&
    isResponsiveStringValue(variant.marginRight)
  ) {
    out.marginRight = variant.marginRight;
    changed = true;
  }
  if (image.rotate == null && variant.rotate != null) {
    out.rotate = variant.rotate;
    changed = true;
  }
  if (!isBoolean(image.flipHorizontal) && isBoolean(variant.flipHorizontal)) {
    out.flipHorizontal = variant.flipHorizontal;
    changed = true;
  }
  if (!isBoolean(image.flipVertical) && isBoolean(variant.flipVertical)) {
    out.flipVertical = variant.flipVertical;
    changed = true;
  }
  if (!isFiniteNumber(image.opacity) && isFiniteNumber(variant.opacity)) {
    out.opacity = variant.opacity;
    changed = true;
  }
  if (!isNonEmptyString(image.blendMode) && isNonEmptyString(variant.blendMode)) {
    out.blendMode = variant.blendMode;
    changed = true;
  }
  if (!isNonEmptyString(image.boxShadow) && isNonEmptyString(variant.boxShadow)) {
    out.boxShadow = variant.boxShadow;
    changed = true;
  }
  if (!isNonEmptyString(image.filter) && isNonEmptyString(variant.filter)) {
    out.filter = variant.filter;
    changed = true;
  }
  if (!isNonEmptyString(image.backdropFilter) && isNonEmptyString(variant.backdropFilter)) {
    out.backdropFilter = variant.backdropFilter;
    changed = true;
  }
  if (!isNonEmptyString(image.overflow) && isNonEmptyString(variant.overflow)) {
    out.overflow = variant.overflow;
    changed = true;
  }
  if (!isBoolean(image.hidden) && isBoolean(variant.hidden)) {
    out.hidden = variant.hidden;
    changed = true;
  }
  if (!isBoolean(image.priority) && isBoolean(variant.priority)) {
    out.priority = variant.priority;
    changed = true;
  }

  if (!hasCustomMotion) {
    const motionTiming = asRecord(image.motionTiming);
    if (!motionTiming) {
      out.motionTiming = variantMotionTiming;
      changed = true;
    } else {
      const nextMotionTiming: Record<string, unknown> = { ...motionTiming };
      let motionChanged = false;
      if (!isNonEmptyString(nextMotionTiming.trigger)) {
        nextMotionTiming.trigger = variantMotionTiming.trigger;
        motionChanged = true;
      }
      if (!isNonEmptyString(nextMotionTiming.entrancePreset)) {
        nextMotionTiming.entrancePreset = variantMotionTiming.entrancePreset;
        motionChanged = true;
      }
      if (!isNonEmptyString(nextMotionTiming.exitPreset)) {
        nextMotionTiming.exitPreset = variantMotionTiming.exitPreset;
        motionChanged = true;
      }
      if (
        !isMotionExitTrigger(nextMotionTiming.exitTrigger) &&
        isMotionExitTrigger(variantMotionTiming.exitTrigger)
      ) {
        nextMotionTiming.exitTrigger = variantMotionTiming.exitTrigger;
        motionChanged = true;
      }
      if (nextMotionTiming.exitViewport == null && variantMotionTiming.exitViewport != null) {
        nextMotionTiming.exitViewport = variantMotionTiming.exitViewport;
        motionChanged = true;
      }
      if (nextMotionTiming.entranceMotion == null && variantMotionTiming.entranceMotion != null) {
        nextMotionTiming.entranceMotion = variantMotionTiming.entranceMotion;
        motionChanged = true;
      }
      if (nextMotionTiming.exitMotion == null && variantMotionTiming.exitMotion != null) {
        nextMotionTiming.exitMotion = variantMotionTiming.exitMotion;
        motionChanged = true;
      }
      if (motionChanged) {
        out.motionTiming = nextMotionTiming;
        changed = true;
      }
    }
  }

  return changed ? (out as ElementBlock) : el;
}

function processElement(el: unknown): unknown {
  const rec = asRecord(el);
  if (!rec || typeof rec.type !== "string") return el;
  if (rec.type === "cssGradient") return el;

  let changed = false;
  let withDefaults = el as ElementBlock;
  withDefaults = applyImageDefaults(withDefaults);
  withDefaults = applyHeadingDefaults(withDefaults);
  withDefaults = applyBodyDefaults(withDefaults);
  withDefaults = applyLinkDefaults(withDefaults);
  if (withDefaults !== el) changed = true;
  const result = { ...(withDefaults as Record<string, unknown>) };

  // elementGroup: recurse into section.definitions
  if (result.type === "elementGroup") {
    const section = asRecord(result.section);
    const definitions = asRecord(section?.definitions);
    if (section && definitions) {
      const nextDefs: Record<string, unknown> = {};
      let defsChanged = false;
      for (const [k, def] of Object.entries(definitions)) {
        const nextDef = processElement(def);
        if (nextDef !== def) defsChanged = true;
        nextDefs[k] = nextDef;
      }
      if (defsChanged) {
        result.section = { ...section, definitions: nextDefs };
        changed = true;
      }
    }
  }

  // moduleConfig slots: recurse into nested definitions
  const moduleConfig = asRecord(result.moduleConfig);
  const slots = asRecord(moduleConfig?.slots);
  if (moduleConfig && slots) {
    const nextSlots: Record<string, unknown> = {};
    let slotsChanged = false;
    for (const [slotKey, slotVal] of Object.entries(slots)) {
      const slot = asRecord(slotVal);
      const section = asRecord(slot?.section);
      const definitions = asRecord(section?.definitions);
      if (!slot || !section || !definitions) {
        nextSlots[slotKey] = slotVal;
        continue;
      }
      const nextDefs: Record<string, unknown> = {};
      let defsChanged = false;
      for (const [defKey, defVal] of Object.entries(definitions)) {
        const nextDef = processElement(defVal);
        if (nextDef !== defVal) defsChanged = true;
        nextDefs[defKey] = nextDef;
      }
      if (defsChanged) {
        nextSlots[slotKey] = { ...slot, section: { ...section, definitions: nextDefs } };
        slotsChanged = true;
      } else {
        nextSlots[slotKey] = slotVal;
      }
    }
    if (slotsChanged) {
      result.moduleConfig = { ...moduleConfig, slots: nextSlots };
      changed = true;
    }
  }

  return changed ? result : el;
}

function processSection(section: SectionBlock): SectionBlock {
  const rec = asRecord(section);
  if (!rec) return section;
  let changed = false;
  const out: Record<string, unknown> = { ...rec };

  if (Array.isArray(rec.elements)) {
    const elements = rec.elements as unknown[];
    const nextElements = elements.map((el) => processElement(el));
    if (nextElements.some((el, i) => el !== elements[i])) {
      out.elements = nextElements;
      changed = true;
    }
  }

  if (rec.type === "revealSection") {
    if (Array.isArray(rec.collapsedElements)) {
      const collapsedElements = rec.collapsedElements as unknown[];
      const nextCollapsed = collapsedElements.map((el) => processElement(el));
      if (nextCollapsed.some((el, i) => el !== collapsedElements[i])) {
        out.collapsedElements = nextCollapsed;
        changed = true;
      }
    }
    if (Array.isArray(rec.revealedElements)) {
      const revealedElements = rec.revealedElements as unknown[];
      const nextRevealed = revealedElements.map((el) => processElement(el));
      if (nextRevealed.some((el, i) => el !== revealedElements[i])) {
        out.revealedElements = nextRevealed;
        changed = true;
      }
    }
  }

  return changed ? (out as SectionBlock) : section;
}

/**
 * Injects missing element-level defaults from `pbBuilderDefaultsV1` (image, heading, body, link
 * variant templates) before entrance-motion resolution and rendering.
 */
export function applyBuilderElementDefaultsToSections(sections: SectionBlock[]): SectionBlock[] {
  return sections.map((section) => processSection(section));
}
