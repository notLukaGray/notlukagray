import { type RuleIssue, type SuggestionAction } from "./rules";
import type { InspectContext, InspectableNode } from "./inspect-types";
/**
 * Heuristic issues/suggestions using parent/sibling/component context.
 * Complements generic structure rules in `inspectUnified`.
 */
export declare function inferContextualInsights(node: InspectableNode, ctx?: InspectContext): {
    issues: RuleIssue[];
    suggestions: SuggestionAction[];
};
