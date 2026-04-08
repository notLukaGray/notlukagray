import type { ElementBlock } from "./page-builder-schemas";

export function generateElementKey(block: ElementBlock, index: number): string {
  const type = block.type;

  // Prefer stable, author-controlled IDs when present; section schemas enforce uniqueness.
  if ("id" in block && typeof block.id === "string" && block.id.trim().length > 0) {
    return `${type}_${block.id}`;
  }

  if ("text" in block && typeof block.text === "string") {
    const textHash = block.text.slice(0, 20).replace(/\s/g, "_") + "_" + block.text.length;
    return `${type}_${textHash}`;
  }

  if ("src" in block && typeof block.src === "string" && block.src) {
    const srcHash = block.src.slice(-20).replace(/[^a-zA-Z0-9]/g, "_");
    return `${type}_${srcHash}`;
  }

  if (type === "elementVector" && "viewBox" in block && typeof block.viewBox === "string") {
    const shapesLen = Array.isArray(block.shapes) ? block.shapes.length : 0;
    const vbHash = block.viewBox.slice(0, 15).replace(/[^a-zA-Z0-9]/g, "_");
    return `${type}_${vbHash}_${shapesLen}`;
  }

  if (type === "elementSVG" && "markup" in block && typeof block.markup === "string") {
    const len = block.markup.length;
    const slice = block.markup.slice(0, 30).replace(/[^a-zA-Z0-9]/g, "_");
    return `${type}_${slice}_${len}`;
  }

  return `${type}_${index}`;
}
