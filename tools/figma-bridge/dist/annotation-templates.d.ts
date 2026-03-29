import type { InspectableNode } from "./inspect-types";
export interface AnnotationTemplate {
    scope: "element" | "section";
    key: string;
    description: string;
    example: string;
    snippet: string;
}
export declare function getAnnotationTemplateTotal(nodeType: string): number;
export declare function getTopAnnotationTemplates(node: InspectableNode, limit: number): AnnotationTemplate[];
/**
 * Returns all annotation templates, optionally filtered by scope.
 * Useful for reference panels that display the full key catalogue.
 */
export declare function getAllAnnotationTemplates(scope?: "element" | "section" | "all"): AnnotationTemplate[];
