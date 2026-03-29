import { type AnnotationTemplate } from "./annotation-templates";
import type { InspectContext, InspectableNode } from "./inspect-types";
export type WidgetUiCategory = "structure" | "naming" | "annotations" | "typography" | "visual" | "trace" | "general";
export interface WidgetIssueRow {
    id: string;
    category: WidgetUiCategory;
    confidence: "low" | "medium" | "high";
    message: string;
    source?: string;
}
export interface WidgetSuggestionRow {
    kind: string;
    label: string;
    description: string;
    snippet?: string;
}
export interface ExportPreview {
    parsedTargetKind: string;
    exportKey: string;
    label: string;
    slugifiedElementId: string;
    prefixDiagnostics: string[];
    /** Note shown in widget: runtime uses `sectionId:elementId` after expand */
    expandNote: string;
}
export interface UnifiedInspectResult {
    issues: WidgetIssueRow[];
    suggestions: WidgetSuggestionRow[];
    annotationTemplates: AnnotationTemplate[];
    annotationTemplateTotal: number;
    exportPreview: ExportPreview;
}
/** Single entry for widget + tests: structural rules, context inference, export preview, annotation ranking. */
export declare function inspectUnified(node: InspectableNode, ctx?: InspectContext): UnifiedInspectResult;
