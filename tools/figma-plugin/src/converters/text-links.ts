/**
 * Hyperlink segment extraction from TextNodes.
 */

/**
 * Describes a substring of a TextNode that carries a hyperlink.
 */
export interface TextLinkSegment {
  characters: string;
  href: string;
  external: boolean;
}

/**
 * Extracts hyperlinked text segments from a Figma text node.
 * Returns an array of link descriptors, or empty array if none.
 */
export function extractTextLinks(node: TextNode): TextLinkSegment[] {
  try {
    const segments = node.getStyledTextSegments(["hyperlink"]) as Array<{
      characters: string;
      hyperlink: { type: "URL" | "NODE"; value: string } | null;
    }>;

    return segments
      .filter((s) => s.hyperlink !== null)
      .map((s) => ({
        characters: s.characters,
        href: s.hyperlink!.type === "URL" ? s.hyperlink!.value : `#${s.hyperlink!.value}`,
        external: s.hyperlink!.type === "URL",
      }));
  } catch {
    return [];
  }
}
