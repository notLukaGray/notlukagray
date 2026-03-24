import { inspectNode } from "./rules";

const { widget } = figma;
const { AutoLayout, Text, useSyncedState, useEffect } = widget;

// ── Serializable state (must survive JSON round-trip) ─────────────────────────

interface StoredIssue {
  category: string;
  confidence: string;
  message: string;
}

interface StoredSuggestion {
  kind: string;
  label: string;
  description: string;
  snippet?: string;
}

interface StoredAnnotationTemplate {
  scope: "element" | "section";
  key: string;
  description: string;
  example: string;
  snippet: string;
}

interface InspectorState {
  nodeId: string;
  nodeName: string;
  nodeType: string;
  dimensions: string;
  childCount: number;
  issues: StoredIssue[];
  suggestions: StoredSuggestion[];
  annotationTemplates: StoredAnnotationTemplate[];
  annotationTemplateTotal: number;
}

const EMPTY: InspectorState = {
  nodeId: "",
  nodeName: "",
  nodeType: "",
  dimensions: "",
  childCount: 0,
  issues: [],
  suggestions: [],
  annotationTemplates: [],
  annotationTemplateTotal: 0,
};

// ── Design tokens ─────────────────────────────────────────────────────────────

const BG = "#1A1A1A";
const SURFACE = "#242424";
const BORDER = "#333333";
const TEXT_PRIMARY = "#F0F0F0";
const TEXT_DIM = "#777777";

const CATEGORY_COLOR: Record<string, string> = {
  structure: "#FFB347",
  naming: "#47CFFF",
  annotations: "#A8FF47",
  typography: "#FF9DFF",
  visual: "#FF6B6B",
  trace: "#47FFC8",
  general: "#AAAAAA",
};

const CONFIDENCE_COLOR: Record<string, string> = {
  high: "#FF5A5A",
  medium: "#FFA340",
  low: "#888888",
};

function catColor(c: string): string {
  return CATEGORY_COLOR[c] ?? CATEGORY_COLOR.general;
}

function confColor(c: string): string {
  return CONFIDENCE_COLOR[c] ?? CONFIDENCE_COLOR.low;
}

// ── Widget ────────────────────────────────────────────────────────────────────

function PageBuilderWidget() {
  const [state, setState] = useSyncedState("inspector", EMPTY) as [
    InspectorState,
    (value: InspectorState) => void,
  ];

  useEffect(() => {
    function refresh() {
      const sel = figma.currentPage.selection;
      if (!sel.length) {
        setState(EMPTY);
        return;
      }
      const node = sel[0];
      const w = Math.round(node.width ?? 0);
      const h = Math.round(node.height ?? 0);
      const children = node.children ?? [];
      const hasAutoLayout = "layoutMode" in node && node.layoutMode !== "NONE";

      const result = inspectNode({
        id: node.id,
        name: node.name,
        type: node.type,
        width: w,
        height: h,
        childCount: children.length,
        hasAutoLayout,
      });

      setState({
        nodeId: node.id,
        nodeName: node.name,
        nodeType: node.type,
        dimensions: `${w} × ${h}`,
        childCount: children.length,
        issues: result.issues.map((i) => ({
          category: i.category,
          confidence: i.confidence,
          message: i.message,
        })),
        suggestions: result.suggestions.map((s) => ({
          kind: s.kind,
          label: s.label,
          description: s.description,
          snippet: s.snippet,
        })),
        annotationTemplates: result.annotationTemplates.map((t) => ({
          scope: t.scope,
          key: t.key,
          description: t.description,
          example: t.example,
          snippet: t.snippet,
        })),
        annotationTemplateTotal: result.annotationTemplateTotal,
      });
    }

    figma.on("selectionchange", refresh);
    refresh();
    return () => figma.off("selectionchange", refresh);
  });

  const selected = state.nodeId !== "";

  return (
    <AutoLayout
      direction="vertical"
      width={248}
      padding={14}
      spacing={0}
      cornerRadius={10}
      fill={BG}
      stroke={BORDER}
      strokeWidth={1}
    >
      {/* Header */}
      <AutoLayout
        direction="horizontal"
        width="fill-parent"
        verticalAlignItems="center"
        spacing={6}
        padding={{ bottom: 10 }}
      >
        <Text fontSize={12} fontWeight="bold" fill={TEXT_PRIMARY} width="fill-parent">
          Page Builder
        </Text>
        <Text fontSize={10} fill={TEXT_DIM}>
          inspector
        </Text>
      </AutoLayout>

      {/* Divider */}
      <AutoLayout width="fill-parent" height={1} fill={BORDER} />

      {!selected ? (
        <AutoLayout padding={{ top: 14, bottom: 4 }} width="fill-parent">
          <Text fontSize={11} fill={TEXT_DIM} width="fill-parent">
            Select a frame to inspect
          </Text>
        </AutoLayout>
      ) : (
        <AutoLayout direction="vertical" width="fill-parent" spacing={12} padding={{ top: 12 }}>
          {/* Node identity */}
          <AutoLayout direction="vertical" width="fill-parent" spacing={3}>
            <Text fontSize={13} fontWeight="bold" fill={TEXT_PRIMARY} width="fill-parent">
              {state.nodeName}
            </Text>
            <Text fontSize={10} fill={TEXT_DIM}>
              {state.nodeType} · {state.dimensions}
              {state.childCount > 0 ? ` · ${state.childCount} children` : ""}
            </Text>
          </AutoLayout>

          {/* Issues */}
          {state.issues.length > 0 && (
            <AutoLayout direction="vertical" width="fill-parent" spacing={5}>
              <Text fontSize={9} fontWeight="bold" fill={TEXT_DIM} letterSpacing={1}>
                ISSUES
              </Text>
              {state.issues.map((issue: StoredIssue, i: number) => (
                <AutoLayout
                  key={`issue-${i}`}
                  direction="horizontal"
                  width="fill-parent"
                  padding={{ vertical: 6, horizontal: 8 }}
                  spacing={8}
                  cornerRadius={6}
                  fill={SURFACE}
                  verticalAlignItems="center"
                >
                  <AutoLayout
                    padding={{ vertical: 2, horizontal: 5 }}
                    cornerRadius={3}
                    fill={confColor(issue.confidence) + "28"}
                  >
                    <Text fontSize={9} fill={confColor(issue.confidence)}>
                      {issue.confidence}
                    </Text>
                  </AutoLayout>
                  <AutoLayout direction="vertical" width="fill-parent" spacing={2}>
                    <AutoLayout
                      padding={{ vertical: 1, horizontal: 4 }}
                      cornerRadius={3}
                      fill={catColor(issue.category) + "22"}
                    >
                      <Text fontSize={9} fill={catColor(issue.category)}>
                        {issue.category}
                      </Text>
                    </AutoLayout>
                    <Text fontSize={10} fill={TEXT_PRIMARY} width="fill-parent">
                      {issue.message}
                    </Text>
                  </AutoLayout>
                </AutoLayout>
              ))}
            </AutoLayout>
          )}

          {/* Suggestions */}
          {state.suggestions.length > 0 && (
            <AutoLayout direction="vertical" width="fill-parent" spacing={5}>
              <Text fontSize={9} fontWeight="bold" fill={TEXT_DIM} letterSpacing={1}>
                SUGGESTIONS
              </Text>
              {state.suggestions.map((s: StoredSuggestion, i: number) => (
                <AutoLayout
                  key={`sug-${i}`}
                  direction="horizontal"
                  width="fill-parent"
                  padding={{ vertical: 6, horizontal: 8 }}
                  spacing={6}
                  cornerRadius={6}
                  fill={SURFACE}
                  verticalAlignItems="center"
                >
                  <Text fontSize={10} fill={TEXT_DIM}>
                    →
                  </Text>
                  <AutoLayout direction="vertical" width="fill-parent" spacing={2}>
                    <Text fontSize={10} fill={TEXT_PRIMARY} width="fill-parent">
                      {s.label}
                    </Text>
                    {s.snippet ? (
                      <Text fontSize={9} fill={TEXT_DIM} width="fill-parent">
                        {s.snippet}
                      </Text>
                    ) : (
                      <Text fontSize={9} fill={TEXT_DIM} width="fill-parent">
                        {s.description}
                      </Text>
                    )}
                  </AutoLayout>
                </AutoLayout>
              ))}
            </AutoLayout>
          )}

          {/* Available annotations */}
          {state.annotationTemplates.length > 0 && (
            <AutoLayout direction="vertical" width="fill-parent" spacing={5}>
              <Text fontSize={9} fontWeight="bold" fill={TEXT_DIM} letterSpacing={1}>
                TOP ANNOTATIONS ({state.annotationTemplates.length} of{" "}
                {state.annotationTemplateTotal})
              </Text>
              {state.annotationTemplates.map((a: StoredAnnotationTemplate, i: number) => (
                <AutoLayout
                  key={`ann-${i}`}
                  direction="vertical"
                  width="fill-parent"
                  padding={{ vertical: 6, horizontal: 8 }}
                  spacing={2}
                  cornerRadius={6}
                  fill={SURFACE}
                >
                  <AutoLayout direction="horizontal" width="fill-parent" spacing={6}>
                    <Text fontSize={9} fill={TEXT_DIM}>
                      {a.scope}
                    </Text>
                    <Text fontSize={9} fill={TEXT_PRIMARY}>
                      {a.key}
                    </Text>
                  </AutoLayout>
                  <Text fontSize={9} fill={TEXT_DIM} width="fill-parent">
                    {a.snippet}
                  </Text>
                </AutoLayout>
              ))}
            </AutoLayout>
          )}

          {state.issues.length === 0 &&
            state.suggestions.length === 0 &&
            state.annotationTemplates.length === 0 && (
              <Text fontSize={10} fill={TEXT_DIM} width="fill-parent">
                No issues found
              </Text>
            )}
        </AutoLayout>
      )}
    </AutoLayout>
  );
}

figma.widget.register(PageBuilderWidget);
