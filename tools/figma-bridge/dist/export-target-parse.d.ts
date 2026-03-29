export type ParsedExportTargetKind = "page" | "preset" | "modal" | "module" | "global-button" | "global-background" | "global-element";
export interface ParsedExportTarget {
    kind: ParsedExportTargetKind;
    key: string;
    label: string;
    responsiveRole?: "desktop" | "mobile";
}
/** Resolve `Prefix/Name` from a raw Figma layer name (annotations stripped inside). */
export declare function parseExportTargetFromLayerName(rawName: string): ParsedExportTarget;
/** Prefix diagnostics for unknown `foo/...` patterns (warnings only). */
export declare function getLayerPrefixDiagnostics(rawName: string): string[];
