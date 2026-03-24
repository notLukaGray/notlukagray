export type IssueCategory = "naming" | "structure" | "annotations" | "typography" | "motion" | "assets" | "responsive" | "content" | "other";
export type SuggestionActionKind = "set-target" | "apply-annotation" | "promote-preset" | "keep-as-page" | "inspect" | "ignore";
export type HeuristicSignatureKind = "frame" | "group" | "text" | "component" | "instance" | "variant";
export interface RuleIssue {
    severity: "error" | "warn" | "info";
    category: IssueCategory;
    message: string;
    source?: string;
}
export interface SuggestionAction {
    kind: SuggestionActionKind;
    label: string;
    target?: "page" | "preset" | "modal" | "module" | "skip" | "global";
    annotation?: Record<string, string>;
}
export interface HeuristicSignature {
    kind: HeuristicSignatureKind;
    name?: string;
    layoutMode?: "NONE" | "HORIZONTAL" | "VERTICAL";
    childCount?: number;
    visibleChildCount?: number;
    repeatedChildren?: number;
}
export declare function createIssue(category: IssueCategory, message: string, severity?: RuleIssue["severity"], source?: string): RuleIssue;
export declare function createSuggestion(kind: SuggestionActionKind, label: string, extras?: Omit<SuggestionAction, "kind" | "label">): SuggestionAction;
export declare function createHeuristicSignature(kind: HeuristicSignatureKind, props?: Omit<HeuristicSignature, "kind">): HeuristicSignature;
export declare function summarizeCategories(issues: readonly RuleIssue[]): Record<IssueCategory, number>;
