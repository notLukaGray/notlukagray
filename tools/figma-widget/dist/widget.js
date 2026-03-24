"use strict";
(() => {
  // src/rules.ts
  function createRuleSignature(id, category, confidence, message = "") {
    return { id, category, confidence, message };
  }
  function createSuggestion(kind, label, description, annotation, targetId) {
    const snippet = annotation ? toAnnotationSnippet(annotation) : void 0;
    return { kind, label, description, annotation, snippet, targetId };
  }
  function toAnnotationSnippet(annotation) {
    const pairs = Object.keys(annotation).sort().map((key) => `${key}=${annotation[key]}`);
    return `[pb: ${pairs.join(", ")}]`;
  }
  var GENERIC_NAME_RE = /^(Frame|Group|Rectangle|Ellipse|Text|Component|Section|Vector|Image|Polygon|Star|Line|Arrow)\s*\d*$/i;
  var FRAME_LIKE = /* @__PURE__ */ new Set(["FRAME", "COMPONENT", "COMPONENT_SET", "SECTION", "GROUP"]);
  function template(scope, key, example, description) {
    return { scope, key, example, description, snippet: toAnnotationSnippet({ [key]: example }) };
  }
  var ELEMENT_ANNOTATION_TEMPLATES = [
    template("element", "type", "button", "Force output element type"),
    template("element", "label", "Learn more", "Button/link label override"),
    template("element", "href", "/about", "Navigation path"),
    template("element", "action", "modalOpen:contact", "Trigger action payload"),
    template("element", "variant", "primary", "Visual variant token"),
    template("element", "size", "lg", "Visual size token"),
    template("element", "disabled", "true", "Disable interactions"),
    template("element", "module", "featureCard", "Bind to module key"),
    template("element", "src", "cdn/hero.mp4", "Media source override"),
    template("element", "poster", "cdn/hero-poster.jpg", "Video poster source"),
    template("element", "autoplay", "true", "Video autoplay"),
    template("element", "loop", "true", "Video loop"),
    template("element", "muted", "true", "Video muted"),
    template("element", "showplaybutton", "true", "Show play control"),
    template("element", "objectfit", "cover", "Image/video fit mode"),
    template("element", "objectposition", "center center", "Image/video focal point"),
    template("element", "seo", "h1", "Semantic heading tag for text"),
    template("element", "style", "body1", "Text style token"),
    template("element", "variablekey", "heroTitle", "Variable/content key"),
    template("element", "contentkey", "ctaText", "Content binding key"),
    template("element", "hidden", "true", "Hide element initially"),
    template("element", "opacity", "0.8", "Opacity override"),
    template("element", "blendmode", "multiply", "Blend mode override"),
    template("element", "overflow", "hidden", "Overflow behavior"),
    template("element", "fliph", "true", "Horizontal flip"),
    template("element", "flipv", "true", "Vertical flip"),
    template("element", "arialabel", "Primary CTA", "ARIA label"),
    template("element", "ariarole", "button", "ARIA role"),
    template("element", "ariahidden", "true", "ARIA hidden"),
    template("element", "zindex", "10", "Layer stacking"),
    template("element", "visiblewhen", "videoPlaying", "Conditional visibility"),
    template("element", "cursor", "pointer", "Cursor style"),
    template("element", "hardswap", "true", "Hard swap behavior"),
    template("element", "entrance", "fadeUp", "Motion entrance preset"),
    template("element", "exit", "fadeOut", "Motion exit preset"),
    template("element", "trigger", "inView", "Motion trigger"),
    template("element", "duration", "0.35", "Motion duration"),
    template("element", "delay", "0.1", "Motion delay"),
    template("element", "ease", "easeOut", "Motion easing"),
    template("element", "stiffness", "220", "Spring stiffness"),
    template("element", "damping", "24", "Spring damping"),
    template("element", "viewportamount", "0.35", "In-view threshold"),
    template("element", "onclick", "elementShow:target-id", "Pointer click trigger action"),
    template("element", "onhoverenter", "elementShow:target-id", "Hover enter trigger"),
    template("element", "onhoverleave", "elementHide:target-id", "Hover leave trigger"),
    template("element", "onpointerdown", "elementShow:target-id", "Pointer down trigger"),
    template("element", "onpointerup", "elementHide:target-id", "Pointer up trigger"),
    template("element", "ondoubleclick", "navigate:/next", "Double-click trigger"),
    template("element", "ondragend", "elementToggle:target-id", "Drag-end trigger")
  ];
  var SECTION_ANNOTATION_TEMPLATES = [
    template("section", "type", "sectionColumn", "Force section block type"),
    template("section", "fill", "#111111", "Section fill override"),
    template("section", "overflow", "hidden", "Section overflow override"),
    template("section", "hidden", "true", "Hide section initially"),
    template("section", "onscrolldown", "elementShow:target-id", "Scroll down action"),
    template("section", "onscrollup", "elementHide:target-id", "Scroll up action"),
    template("section", "sticky", "true", "Enable sticky behavior"),
    template("section", "stickyoffset", "24", "Sticky offset"),
    template("section", "stickyposition", "top", "Sticky pin position"),
    template("section", "visiblewhen", "videoPlaying", "Conditional visibility"),
    template("section", "scrollopacity", "0.2,1.0", "Scroll opacity range"),
    template("section", "triggeronce", "true", "Fire trigger once"),
    template("section", "threshold", "0.35", "Viewport threshold"),
    template("section", "rootmargin", "0px 0px -10% 0px", "Viewport root margin"),
    template("section", "delay", "120", "Trigger delay in ms"),
    template("section", "arialabel", "Hero section", "Section ARIA label"),
    template("section", "onvisible", "elementShow:target-id", "On visible action"),
    template("section", "oninvisible", "elementHide:target-id", "On invisible action"),
    template("section", "scrollspeed", "0.6", "Parallax speed"),
    template("section", "triggermode", "click", "Reveal trigger mode"),
    template("section", "expandaxis", "vertical", "Reveal expansion axis"),
    template("section", "initialrevealed", "false", "Initial reveal state"),
    template("section", "revealpreset", "fadeUp", "Reveal animation preset"),
    template("section", "expanddurationms", "280", "Reveal duration"),
    template("section", "externaltriggerkey", "hero-cta", "External reveal trigger key"),
    template("section", "timer1", "elementShow:target-id", "Timer action sequence"),
    template("section", "timerinterval1", "1200", "Timer interval in ms"),
    template("section", "key1", "elementToggle:target-id", "Keyboard shortcut action"),
    template("section", "idle1", "elementHide:target-id", "Idle timeout action"),
    template("section", "cursor1", "elementShow:target-id", "Cursor event action"),
    template("section", "effect1", "backgroundBlur:8", "Effect action template")
  ];
  function getAnnotationTemplatesForNode(nodeType) {
    const templates = [...ELEMENT_ANNOTATION_TEMPLATES];
    if (FRAME_LIKE.has(nodeType)) {
      templates.push(...SECTION_ANNOTATION_TEMPLATES);
    }
    return templates;
  }
  function scoreAnnotationTemplate(node, t) {
    let score = 0;
    const nodeType = node.type.toUpperCase();
    const name = node.name.toLowerCase();
    const isFrameLike = FRAME_LIKE.has(nodeType);
    const isText = nodeType === "TEXT";
    const isVectorLike = nodeType === "RECTANGLE" || nodeType === "ELLIPSE" || nodeType === "VECTOR";
    if (t.scope === "section") {
      if (!isFrameLike) return -100;
      score += 8;
    } else {
      score += isFrameLike ? 2 : 6;
    }
    if (isText) {
      if (t.key === "seo" || t.key === "style") score += 25;
      if (t.key === "contentkey" || t.key === "variablekey") score += 12;
      if (t.key.startsWith("on")) score += 4;
    }
    if (isFrameLike) {
      if (t.scope === "section" && t.key === "type") score += 20;
      if (t.scope === "section" && (t.key === "onvisible" || t.key === "oninvisible")) score += 10;
      if (t.scope === "section" && (t.key === "overflow" || t.key === "hidden")) score += 8;
      if (node.childCount >= 3 && t.key === "type" && t.example === "sectionColumn") score += 20;
      if (node.childCount >= 8 && (t.key === "scrollspeed" || t.key === "sticky")) score += 9;
    }
    if (isVectorLike) {
      if (t.key === "objectfit" || t.key === "objectposition") score += 14;
      if (t.key === "src") score += 10;
    }
    if (name.includes("video")) {
      if (t.key === "src" || t.key === "poster") score += 20;
      if (t.key === "autoplay" || t.key === "loop" || t.key === "muted") score += 16;
      if (t.key === "showplaybutton") score += 12;
    }
    if (name.includes("button") || name.includes("cta")) {
      if (t.key === "type" && t.example === "button") score += 20;
      if (t.key === "label" || t.key === "href" || t.key === "action") score += 16;
      if (t.key === "variant" || t.key === "size" || t.key === "disabled") score += 10;
      if (t.key === "onclick") score += 12;
    }
    if (name.includes("modal")) {
      if (t.key === "action" && t.example.startsWith("modalOpen:")) score += 16;
    }
    if (name.includes("hero") && t.key === "seo" && t.example === "h1") {
      score += 12;
    }
    return score;
  }
  function getTopAnnotationTemplates(node, limit) {
    const candidates = getAnnotationTemplatesForNode(node.type);
    const ranked = candidates.map((template2) => ({ template: template2, score: scoreAnnotationTemplate(node, template2) })).filter((entry) => entry.score > -50).sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (a.template.scope !== b.template.scope)
        return a.template.scope.localeCompare(b.template.scope);
      return a.template.key.localeCompare(b.template.key);
    });
    return ranked.slice(0, limit).map((entry) => entry.template);
  }
  function inspectNode(node) {
    const issues = [];
    const suggestions = [];
    const annotationTemplateTotal = getAnnotationTemplatesForNode(node.type).length;
    const annotationTemplates = getTopAnnotationTemplates(node, 5);
    if (GENERIC_NAME_RE.test(node.name.trim())) {
      issues.push(
        createRuleSignature(
          "generic-name",
          "naming",
          "high",
          `"${node.name}" looks like a default name`
        )
      );
      suggestions.push(
        createSuggestion("inspect", "Rename node", "Give this node a semantic name before export")
      );
    }
    if (node.width === 0 || node.height === 0) {
      issues.push(
        createRuleSignature(
          "zero-size",
          "structure",
          "high",
          `Zero dimension (${node.width} \xD7 ${node.height})`
        )
      );
    }
    if (node.childCount > 8 && !node.hasAutoLayout) {
      issues.push(
        createRuleSignature(
          "no-autolayout",
          "structure",
          "medium",
          `${node.childCount} children with no auto-layout`
        )
      );
      suggestions.push(
        createSuggestion(
          "annotation",
          "Treat as columns",
          "If this is a multi-column section, annotate it explicitly.",
          { type: "sectionColumn" }
        )
      );
      suggestions.push(
        createSuggestion(
          "annotation",
          "Treat as reveal",
          "If this is a collapsed/expanded container, annotate reveal mode.",
          { type: "revealSection", triggerMode: "click" }
        )
      );
    }
    if (node.width > 0 && node.height > 0 && (node.width < 4 || node.height < 4)) {
      issues.push(
        createRuleSignature(
          "tiny-node",
          "visual",
          "low",
          `Very small node (${node.width} \xD7 ${node.height})`
        )
      );
    }
    if (FRAME_LIKE.has(node.type) && issues.length === 0) {
      suggestions.push(
        createSuggestion(
          "annotation",
          "Mark as default section",
          "Use an explicit section type when this frame is a standard content block.",
          { type: "contentBlock" }
        )
      );
      suggestions.push(
        createSuggestion(
          "annotation",
          "Mark as columns",
          "Use this when direct children are intended to map into section columns.",
          { type: "sectionColumn" }
        )
      );
    }
    if (node.type === "TEXT") {
      suggestions.push(
        createSuggestion(
          "annotation",
          "Semantic heading (H1)",
          "For primary page heading semantics.",
          { seo: "h1" }
        )
      );
      suggestions.push(
        createSuggestion(
          "annotation",
          "Semantic heading (H2)",
          "For secondary section heading semantics.",
          { seo: "h2" }
        )
      );
      suggestions.push(
        createSuggestion(
          "annotation",
          "Body style template",
          "Use an explicit body style token when needed.",
          { style: "body1" }
        )
      );
    }
    return { issues, suggestions, annotationTemplates, annotationTemplateTotal };
  }

  // src/widget-main.tsx
  var { widget } = figma;
  var { AutoLayout, Text, useSyncedState, useEffect } = widget;
  var EMPTY = {
    nodeId: "",
    nodeName: "",
    nodeType: "",
    dimensions: "",
    childCount: 0,
    issues: [],
    suggestions: [],
    annotationTemplates: [],
    annotationTemplateTotal: 0
  };
  var BG = "#1A1A1A";
  var SURFACE = "#242424";
  var BORDER = "#333333";
  var TEXT_PRIMARY = "#F0F0F0";
  var TEXT_DIM = "#777777";
  var CATEGORY_COLOR = {
    structure: "#FFB347",
    naming: "#47CFFF",
    annotations: "#A8FF47",
    typography: "#FF9DFF",
    visual: "#FF6B6B",
    trace: "#47FFC8",
    general: "#AAAAAA"
  };
  var CONFIDENCE_COLOR = {
    high: "#FF5A5A",
    medium: "#FFA340",
    low: "#888888"
  };
  function catColor(c) {
    var _a;
    return (_a = CATEGORY_COLOR[c]) != null ? _a : CATEGORY_COLOR.general;
  }
  function confColor(c) {
    var _a;
    return (_a = CONFIDENCE_COLOR[c]) != null ? _a : CONFIDENCE_COLOR.low;
  }
  function PageBuilderWidget() {
    const [state, setState] = useSyncedState("inspector", EMPTY);
    useEffect(() => {
      function refresh() {
        var _a, _b, _c;
        const sel = figma.currentPage.selection;
        if (!sel.length) {
          setState(EMPTY);
          return;
        }
        const node = sel[0];
        const w = Math.round((_a = node.width) != null ? _a : 0);
        const h = Math.round((_b = node.height) != null ? _b : 0);
        const children = (_c = node.children) != null ? _c : [];
        const hasAutoLayout = "layoutMode" in node && node.layoutMode !== "NONE";
        const result = inspectNode({
          id: node.id,
          name: node.name,
          type: node.type,
          width: w,
          height: h,
          childCount: children.length,
          hasAutoLayout
        });
        setState({
          nodeId: node.id,
          nodeName: node.name,
          nodeType: node.type,
          dimensions: `${w} \xD7 ${h}`,
          childCount: children.length,
          issues: result.issues.map((i) => ({
            category: i.category,
            confidence: i.confidence,
            message: i.message
          })),
          suggestions: result.suggestions.map((s) => ({
            kind: s.kind,
            label: s.label,
            description: s.description,
            snippet: s.snippet
          })),
          annotationTemplates: result.annotationTemplates.map((t) => ({
            scope: t.scope,
            key: t.key,
            description: t.description,
            example: t.example,
            snippet: t.snippet
          })),
          annotationTemplateTotal: result.annotationTemplateTotal
        });
      }
      figma.on("selectionchange", refresh);
      refresh();
      return () => figma.off("selectionchange", refresh);
    });
    const selected = state.nodeId !== "";
    return /* @__PURE__ */ figma.widget.h(
      AutoLayout,
      {
        direction: "vertical",
        width: 248,
        padding: 14,
        spacing: 0,
        cornerRadius: 10,
        fill: BG,
        stroke: BORDER,
        strokeWidth: 1
      },
      /* @__PURE__ */ figma.widget.h(
        AutoLayout,
        {
          direction: "horizontal",
          width: "fill-parent",
          verticalAlignItems: "center",
          spacing: 6,
          padding: { bottom: 10 }
        },
        /* @__PURE__ */ figma.widget.h(Text, { fontSize: 12, fontWeight: "bold", fill: TEXT_PRIMARY, width: "fill-parent" }, "Page Builder"),
        /* @__PURE__ */ figma.widget.h(Text, { fontSize: 10, fill: TEXT_DIM }, "inspector")
      ),
      /* @__PURE__ */ figma.widget.h(AutoLayout, { width: "fill-parent", height: 1, fill: BORDER }),
      !selected ? /* @__PURE__ */ figma.widget.h(AutoLayout, { padding: { top: 14, bottom: 4 }, width: "fill-parent" }, /* @__PURE__ */ figma.widget.h(Text, { fontSize: 11, fill: TEXT_DIM, width: "fill-parent" }, "Select a frame to inspect")) : /* @__PURE__ */ figma.widget.h(AutoLayout, { direction: "vertical", width: "fill-parent", spacing: 12, padding: { top: 12 } }, /* @__PURE__ */ figma.widget.h(AutoLayout, { direction: "vertical", width: "fill-parent", spacing: 3 }, /* @__PURE__ */ figma.widget.h(Text, { fontSize: 13, fontWeight: "bold", fill: TEXT_PRIMARY, width: "fill-parent" }, state.nodeName), /* @__PURE__ */ figma.widget.h(Text, { fontSize: 10, fill: TEXT_DIM }, state.nodeType, " \xB7 ", state.dimensions, state.childCount > 0 ? ` \xB7 ${state.childCount} children` : "")), state.issues.length > 0 && /* @__PURE__ */ figma.widget.h(AutoLayout, { direction: "vertical", width: "fill-parent", spacing: 5 }, /* @__PURE__ */ figma.widget.h(Text, { fontSize: 9, fontWeight: "bold", fill: TEXT_DIM, letterSpacing: 1 }, "ISSUES"), state.issues.map((issue, i) => /* @__PURE__ */ figma.widget.h(
        AutoLayout,
        {
          key: `issue-${i}`,
          direction: "horizontal",
          width: "fill-parent",
          padding: { vertical: 6, horizontal: 8 },
          spacing: 8,
          cornerRadius: 6,
          fill: SURFACE,
          verticalAlignItems: "center"
        },
        /* @__PURE__ */ figma.widget.h(
          AutoLayout,
          {
            padding: { vertical: 2, horizontal: 5 },
            cornerRadius: 3,
            fill: confColor(issue.confidence) + "28"
          },
          /* @__PURE__ */ figma.widget.h(Text, { fontSize: 9, fill: confColor(issue.confidence) }, issue.confidence)
        ),
        /* @__PURE__ */ figma.widget.h(AutoLayout, { direction: "vertical", width: "fill-parent", spacing: 2 }, /* @__PURE__ */ figma.widget.h(
          AutoLayout,
          {
            padding: { vertical: 1, horizontal: 4 },
            cornerRadius: 3,
            fill: catColor(issue.category) + "22"
          },
          /* @__PURE__ */ figma.widget.h(Text, { fontSize: 9, fill: catColor(issue.category) }, issue.category)
        ), /* @__PURE__ */ figma.widget.h(Text, { fontSize: 10, fill: TEXT_PRIMARY, width: "fill-parent" }, issue.message))
      ))), state.suggestions.length > 0 && /* @__PURE__ */ figma.widget.h(AutoLayout, { direction: "vertical", width: "fill-parent", spacing: 5 }, /* @__PURE__ */ figma.widget.h(Text, { fontSize: 9, fontWeight: "bold", fill: TEXT_DIM, letterSpacing: 1 }, "SUGGESTIONS"), state.suggestions.map((s, i) => /* @__PURE__ */ figma.widget.h(
        AutoLayout,
        {
          key: `sug-${i}`,
          direction: "horizontal",
          width: "fill-parent",
          padding: { vertical: 6, horizontal: 8 },
          spacing: 6,
          cornerRadius: 6,
          fill: SURFACE,
          verticalAlignItems: "center"
        },
        /* @__PURE__ */ figma.widget.h(Text, { fontSize: 10, fill: TEXT_DIM }, "\u2192"),
        /* @__PURE__ */ figma.widget.h(AutoLayout, { direction: "vertical", width: "fill-parent", spacing: 2 }, /* @__PURE__ */ figma.widget.h(Text, { fontSize: 10, fill: TEXT_PRIMARY, width: "fill-parent" }, s.label), s.snippet ? /* @__PURE__ */ figma.widget.h(Text, { fontSize: 9, fill: TEXT_DIM, width: "fill-parent" }, s.snippet) : /* @__PURE__ */ figma.widget.h(Text, { fontSize: 9, fill: TEXT_DIM, width: "fill-parent" }, s.description))
      ))), state.annotationTemplates.length > 0 && /* @__PURE__ */ figma.widget.h(AutoLayout, { direction: "vertical", width: "fill-parent", spacing: 5 }, /* @__PURE__ */ figma.widget.h(Text, { fontSize: 9, fontWeight: "bold", fill: TEXT_DIM, letterSpacing: 1 }, "TOP ANNOTATIONS (", state.annotationTemplates.length, " of", " ", state.annotationTemplateTotal, ")"), state.annotationTemplates.map((a, i) => /* @__PURE__ */ figma.widget.h(
        AutoLayout,
        {
          key: `ann-${i}`,
          direction: "vertical",
          width: "fill-parent",
          padding: { vertical: 6, horizontal: 8 },
          spacing: 2,
          cornerRadius: 6,
          fill: SURFACE
        },
        /* @__PURE__ */ figma.widget.h(AutoLayout, { direction: "horizontal", width: "fill-parent", spacing: 6 }, /* @__PURE__ */ figma.widget.h(Text, { fontSize: 9, fill: TEXT_DIM }, a.scope), /* @__PURE__ */ figma.widget.h(Text, { fontSize: 9, fill: TEXT_PRIMARY }, a.key)),
        /* @__PURE__ */ figma.widget.h(Text, { fontSize: 9, fill: TEXT_DIM, width: "fill-parent" }, a.snippet)
      ))), state.issues.length === 0 && state.suggestions.length === 0 && state.annotationTemplates.length === 0 && /* @__PURE__ */ figma.widget.h(Text, { fontSize: 10, fill: TEXT_DIM, width: "fill-parent" }, "No issues found"))
    );
  }
  figma.widget.register(PageBuilderWidget);
})();
