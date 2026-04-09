import fs from "fs";
import path from "path";
import { isSafePathSegment, resolvePathUnder } from "@pb/core/internal/page-builder-paths";
import { CONTENT_DIR, parseJsonSafe } from "@pb/core/internal/load/page-builder-load-io";
import { buildPresets } from "@pb/core/internal/load/page-builder-load-presets";
import { resolveDefinitionPresets } from "@pb/core/internal/load/page-builder-load-definitions";
import { expandPageBuilder } from "@pb/core/internal/page-builder-expand";
import type { PageBuilderDefinitionBlock, SectionBlock } from "@pb/contracts";
import type { BreakpointDefinitions } from "@pb/core/internal/defaults/pb-breakpoint-defaults";

const OVERLAYS_DIR = path.join(CONTENT_DIR, "site/overlays");

type LoadOverlaySectionsOptions = {
  breakpoints?: Partial<BreakpointDefinitions>;
  viewportWidthPx?: number;
};

export function loadOverlaySections(
  disableOverlays?: string[],
  options?: LoadOverlaySectionsOptions
): SectionBlock[] {
  if (!fs.existsSync(OVERLAYS_DIR) || !fs.statSync(OVERLAYS_DIR).isDirectory()) return [];

  const disabled = new Set(disableOverlays ?? []);
  const files = fs.readdirSync(OVERLAYS_DIR).filter((f) => f.endsWith(".json"));
  const sections: SectionBlock[] = [];

  for (const file of files) {
    const id = path.basename(file, ".json");
    if (!isSafePathSegment(id)) continue;
    if (disabled.has(id)) continue;

    const filePath = resolvePathUnder(OVERLAYS_DIR, file);
    if (!filePath) continue;

    let raw: string;
    try {
      raw = fs.readFileSync(filePath, "utf-8");
    } catch {
      continue;
    }

    const result = parseJsonSafe<Record<string, unknown>>(raw);
    if (!result.ok || result.data == null || typeof result.data !== "object") continue;

    const data = result.data;
    if (!("type" in data)) continue;

    const sectionKey = typeof data.id === "string" && isSafePathSegment(data.id) ? data.id : id;
    const definitions: Record<string, PageBuilderDefinitionBlock> = {
      [sectionKey]: data as PageBuilderDefinitionBlock,
    };

    const presets = buildPresets({});
    const resolvedDefinitions = resolveDefinitionPresets(definitions, presets);

    const { sections: expanded } = expandPageBuilder(
      {
        slug: id,
        title: id,
        sectionOrder: [sectionKey],
        definitions: resolvedDefinitions,
      },
      {
        breakpoints: options?.breakpoints,
        viewportWidthPx: options?.viewportWidthPx,
      }
    );

    for (const section of expanded) {
      sections.push(section);
    }
  }

  return sections;
}
