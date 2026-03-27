import fs from "fs";
import path from "path";
import { isSafePathSegment, resolvePathUnder } from "@/page-builder/core/page-builder-paths";
import { parseJsonSafe } from "@/page-builder/core/load/page-builder-load-io";
import { buildPresets } from "@/page-builder/core/load/page-builder-load-presets";
import { resolveDefinitionPresets } from "@/page-builder/core/load/page-builder-load-definitions";
import { expandPageBuilder } from "@/page-builder/core/page-builder-expand";
import type {
  PageBuilderDefinitionBlock,
  SectionBlock,
} from "@/page-builder/core/page-builder-schemas";

const OVERLAYS_DIR = path.join(process.cwd(), "src/content/site/overlays");

export function loadOverlaySections(disableOverlays?: string[]): SectionBlock[] {
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

    const { sections: expanded } = expandPageBuilder({
      slug: id,
      title: id,
      sectionOrder: [sectionKey],
      definitions: resolvedDefinitions,
    });

    for (const section of expanded) {
      sections.push(section);
    }
  }

  return sections;
}
