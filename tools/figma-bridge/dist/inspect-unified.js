import { getAnnotationTemplateTotal, getTopAnnotationTemplates } from "./annotation-templates";
import { inferContextualInsights } from "./context-inference";
import { getLayerPrefixDiagnostics, parseExportTargetFromLayerName } from "./export-target-parse";
import { slugify } from "./slugify";
import { stripAnnotations } from "./annotations-strip";
const GENERIC_NAME_RE = /^(Frame|Group|Rectangle|Ellipse|Text|Component|Section|Vector|Image|Polygon|Star|Line|Arrow)\s*\d*$/i;
const FRAME_LIKE = new Set(["FRAME", "COMPONENT", "COMPONENT_SET", "SECTION", "GROUP"]);
function bridgeCategoryToUi(category) {
    switch (category) {
        case "naming":
        case "structure":
        case "annotations":
        case "typography":
            return category;
        case "motion":
        case "responsive":
            return "structure";
        case "assets":
            return "visual";
        case "content":
            return "annotations";
        default:
            return "general";
    }
}
function bridgeIssueToWidget(issue, index) {
    const confidence = issue.severity === "error" ? "high" : issue.severity === "warn" ? "medium" : "low";
    return {
        id: `bridge-${issue.source ?? "rule"}-${index}`,
        category: bridgeCategoryToUi(issue.category),
        confidence,
        message: issue.message,
        source: issue.source,
    };
}
function legacyIssue(id, category, confidence, message) {
    return { id, category, confidence, message };
}
function bridgeSuggestionToWidget(s) {
    let snippet;
    if (s.annotation) {
        snippet = `[pb: ${Object.keys(s.annotation)
            .sort()
            .map((k) => `${k}=${s.annotation[k]}`)
            .join(", ")}]`;
    }
    const descParts = [s.target ? `export → ${s.target}` : "", snippet ?? ""].filter(Boolean);
    return {
        kind: s.kind,
        label: s.label,
        description: descParts.length ? descParts.join(" · ") : s.label,
        snippet,
    };
}
function textAnnotationSuggestions() {
    return [
        { kind: "apply-annotation", label: "Semantic heading (H1)", annotation: { seo: "h1" } },
        { kind: "apply-annotation", label: "Semantic heading (H2)", annotation: { seo: "h2" } },
        { kind: "apply-annotation", label: "Body style template", annotation: { style: "body1" } },
    ];
}
function frameSectionSuggestions() {
    return [
        { kind: "apply-annotation", label: "Mark as default section", annotation: { type: "contentBlock" } },
        { kind: "apply-annotation", label: "Mark as columns", annotation: { type: "sectionColumn" } },
    ];
}
/** Single entry for widget + tests: structural rules, context inference, export preview, annotation ranking. */
export function inspectUnified(node, ctx) {
    const issues = [];
    const suggestionRows = [];
    const rawSuggestions = [];
    const stripped = stripAnnotations(node.name || "");
    const parsed = parseExportTargetFromLayerName(node.name);
    const slugEl = slugify(stripped || node.name || "element");
    const prefixDiagnostics = getLayerPrefixDiagnostics(node.name);
    if (GENERIC_NAME_RE.test(node.name.trim())) {
        issues.push(legacyIssue("generic-name", "naming", "high", `"${node.name}" looks like a default name`));
        rawSuggestions.push({
            kind: "inspect",
            label: "Rename node",
        });
    }
    if (node.width === 0 || node.height === 0) {
        issues.push(legacyIssue("zero-size", "structure", "high", `Zero dimension (${node.width} × ${node.height})`));
    }
    if (node.childCount > 8 && !node.hasAutoLayout) {
        issues.push(legacyIssue("no-autolayout", "structure", "medium", `${node.childCount} children with no auto-layout`));
        rawSuggestions.push({
            kind: "apply-annotation",
            label: "Treat as columns",
            annotation: { type: "sectionColumn" },
        });
        rawSuggestions.push({
            kind: "apply-annotation",
            label: "Treat as reveal",
            annotation: { type: "revealSection", triggerMode: "click" },
        });
    }
    if (node.width > 0 && node.height > 0 && (node.width < 4 || node.height < 4)) {
        issues.push(legacyIssue("tiny-node", "visual", "low", `Very small node (${node.width} × ${node.height})`));
    }
    if (node.overflowDirection && node.overflowDirection !== "NONE") {
        rawSuggestions.push({
            kind: "inspect",
            label: "Scroll overflow on frame — exporter emits scrollContainer without a type annotation",
        });
    }
    if (node.hasVariableBindings) {
        rawSuggestions.push({
            kind: "inspect",
            label: "Variable bindings present — numeric bindings export as CSS var() where supported",
        });
    }
    if (ctx?.textStyleName && node.type === "TEXT") {
        rawSuggestions.push({
            kind: "inspect",
            label: `Text uses style “${ctx.textStyleName}”${ctx.fontSizePx ? ` (~${ctx.fontSizePx}px)` : ""} — semantic heading/body can still be set via [pb: seo=…] if needed`,
        });
    }
    const contextual = inferContextualInsights(node, ctx);
    for (let i = 0; i < contextual.issues.length; i++) {
        issues.push(bridgeIssueToWidget(contextual.issues[i], i));
    }
    rawSuggestions.push(...contextual.suggestions);
    if (node.type === "TEXT") {
        rawSuggestions.push(...textAnnotationSuggestions());
    }
    else if (FRAME_LIKE.has(node.type) && issues.length === 0) {
        rawSuggestions.push(...frameSectionSuggestions());
    }
    const seen = new Set();
    for (let i = 0; i < rawSuggestions.length; i++) {
        const row = bridgeSuggestionToWidget(rawSuggestions[i]);
        const key = `${row.kind}|${row.label}|${row.snippet ?? ""}`;
        if (seen.has(key))
            continue;
        seen.add(key);
        suggestionRows.push(row);
    }
    const annotationTemplateTotal = getAnnotationTemplateTotal(node.type);
    const annotationTemplates = getTopAnnotationTemplates(node, 5);
    return {
        issues,
        suggestions: suggestionRows,
        annotationTemplates,
        annotationTemplateTotal,
        exportPreview: {
            parsedTargetKind: parsed.kind,
            exportKey: parsed.key,
            label: parsed.label,
            slugifiedElementId: slugEl,
            prefixDiagnostics,
            expandNote: `Exports as ${parsed.kind} with key "${parsed.key}". After expandPageBuilder, element ids are prefixed with the section id.`,
        },
    };
}
