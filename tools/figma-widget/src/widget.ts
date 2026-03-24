import { createRuleSignature, createSuggestion, type SuggestionAction } from "./rules";

export interface WidgetState {
  selectedNodeId: string | null;
  issues: ReturnType<typeof createRuleSignature>[];
  suggestions: SuggestionAction[];
}

export function createInitialWidgetState(): WidgetState {
  // Scaffold only: the real widget will hydrate this from Figma selection context.
  return {
    selectedNodeId: null,
    issues: [createRuleSignature("widget-scaffold", "general", "low")],
    suggestions: [
      createSuggestion(
        "inspect",
        "Inspect selection",
        "Open the widget inspector for the current node"
      ),
    ],
  };
}

export function summarizeWidgetTracks(): string[] {
  // This is a placeholder bridge for the three planned widget tracks.
  return ["Inspector MVP", "On-canvas helper", "Bridge-first integration"];
}
