"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));

  // ../figma-bridge/src/rules.ts
  function createIssue(category, message, severity = "warn", source) {
    return { severity, category, message, source };
  }
  function createSuggestion(kind, label, extras = {}) {
    return __spreadValues({ kind, label }, extras);
  }

  // ../figma-bridge/src/annotations-strip.ts
  var ANNOTATION_REGEX_GLOBAL = /\[pb:\s*([^\]]+)\]/gi;
  function stripAnnotations(name) {
    return name.replace(ANNOTATION_REGEX_GLOBAL, "").replace(/\s{2,}/g, " ").trim();
  }

  // ../figma-bridge/src/slugify.ts
  function slugify(name) {
    return name.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/[\s]+/g, "-").replace(/-{2,}/g, "-").replace(/^-+|-+$/g, "").slice(0, 64) || "element";
  }

  // ../figma-bridge/src/export-target-parse.ts
  var KNOWN_PREFIXES = /* @__PURE__ */ new Set([
    "page",
    "section",
    "section[desktop]",
    "section[mobile]",
    "modal",
    "module",
    "button",
    "background",
    "global"
  ]);
  function splitPrefixName(name) {
    const slashIdx = name.indexOf("/");
    if (slashIdx < 0) {
      return { prefix: "", rest: name, hasSlash: false };
    }
    return {
      prefix: name.slice(0, slashIdx).trim().toLowerCase(),
      rest: name.slice(slashIdx + 1).trim(),
      hasSlash: true
    };
  }
  function parseExportTargetFromLayerName(rawName) {
    const name = stripAnnotations(rawName || "untitled");
    const { prefix, rest } = splitPrefixName(name);
    const key = slugify(rest || name);
    const label = rest || name;
    switch (prefix) {
      case "page":
        return { kind: "page", key, label };
      case "section":
        return { kind: "preset", key, label };
      case "section[desktop]":
        return { kind: "preset", key, label, responsiveRole: "desktop" };
      case "section[mobile]":
        return { kind: "preset", key, label, responsiveRole: "mobile" };
      case "modal":
        return { kind: "modal", key, label };
      case "module":
        return { kind: "module", key, label };
      case "button":
        return { kind: "global-button", key, label };
      case "background":
        return { kind: "global-background", key, label };
      case "global":
        return { kind: "global-element", key, label };
      default:
        return { kind: "page", key: slugify(name), label: name };
    }
  }
  function getLayerPrefixDiagnostics(rawName) {
    const name = stripAnnotations(rawName || "untitled");
    const { prefix, rest, hasSlash } = splitPrefixName(name);
    const diagnostics = [];
    if (!hasSlash) return diagnostics;
    if (!rest) {
      diagnostics.push(`Frame "${name}" has no name after "/".`);
    }
    if (!KNOWN_PREFIXES.has(prefix)) {
      diagnostics.push(
        `Unknown prefix "${prefix || "(empty)"}" \u2014 export defaults to page; use Page/, Section/, Module/, etc.`
      );
    }
    return diagnostics;
  }

  // ../figma-bridge/src/context-inference.ts
  var GENERIC_NAME_RE = /^(Frame|Group|Rectangle|Ellipse|Text|Component|Section|Vector|Image|Polygon|Star|Line|Arrow)\s*\d*$/i;
  function parentLooksLikePageFrame(parentName) {
    if (!parentName) return false;
    const base = stripAnnotations(parentName);
    return /^page\//i.test(base);
  }
  function inferSuggestedBaseName(node, ctx) {
    var _a;
    if (!GENERIC_NAME_RE.test(node.name.trim())) return null;
    const mc = (_a = ctx == null ? void 0 : ctx.mainComponentName) == null ? void 0 : _a.trim();
    if (mc) return slugify(mc);
    const pn = ctx == null ? void 0 : ctx.parentName;
    if (pn) {
      const stripped = stripAnnotations(pn);
      const slash = stripped.indexOf("/");
      const tail = slash >= 0 ? stripped.slice(slash + 1).trim() : stripped;
      const fromParent = slugify(tail || stripped);
      if (fromParent && fromParent !== "element") {
        const role = node.type === "TEXT" ? "copy" : "item";
        return `${fromParent}-${role}`;
      }
    }
    return null;
  }
  function inferContextualInsights(node, ctx) {
    const issues = [];
    const suggestions = [];
    const parsed = parseExportTargetFromLayerName(node.name);
    const parentPage = parentLooksLikePageFrame(ctx == null ? void 0 : ctx.parentName);
    if (parsed.kind === "global-element" && parentPage) {
      issues.push(
        createIssue(
          "structure",
          "Layer uses Global/ while nested under a Page/ frame \u2014 export may land in globals.json, not the page definitions map.",
          "warn",
          "context-inference"
        )
      );
      suggestions.push(
        createSuggestion(
          "set-target",
          "Use Page/\u2026 or a non-Global prefix so this lives in page definitions",
          {
            target: "page"
          }
        )
      );
    }
    if (node.type === "INSTANCE" && (ctx == null ? void 0 : ctx.mainComponentName)) {
      const n = ctx.mainComponentName.toLowerCase();
      if (n.includes("button") || n.includes("cta")) {
        suggestions.push(
          createSuggestion(
            "inspect",
            "Button-like instance \u2014 exporter infers elementButton from naming; use [pb: type=button] only to force."
          )
        );
      }
      if (n.includes("card")) {
        suggestions.push(
          createSuggestion("set-target", "Card instance \u2014 consider Module/ for reusable blocks", {
            target: "module"
          })
        );
      }
    }
    const suggested = inferSuggestedBaseName(node, ctx);
    if (suggested) {
      suggestions.push(
        createSuggestion("inspect", `Rename hint: "${suggested}" (from parent/component)`)
      );
    }
    if ((ctx == null ? void 0 : ctx.siblingCount) != null && ctx.siblingCount >= 3 && ctx.siblingIndex != null && ctx.siblingIndex === 0 && !node.hasAutoLayout && (node.type === "FRAME" || node.type === "GROUP")) {
      issues.push(
        createIssue(
          "structure",
          "Multiple siblings without auto-layout \u2014 export may mis-infer columns or stacking.",
          "info",
          "context-inference"
        )
      );
    }
    return { issues, suggestions };
  }

  // ../figma-bridge/src/annotation-templates.ts
  var FRAME_LIKE = /* @__PURE__ */ new Set(["FRAME", "COMPONENT", "COMPONENT_SET", "SECTION", "GROUP"]);
  function toAnnotationSnippet(annotation) {
    const pairs = Object.keys(annotation).sort().map((key) => `${key}=${annotation[key]}`);
    return `[pb: ${pairs.join(", ")}]`;
  }
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
    template(
      "section",
      "type",
      "scrollContainer",
      "Force scroll container (usually inferred from overflow)"
    ),
    template(
      "section",
      "type",
      "formBlock",
      "Force form section (usually inferred from input instances)"
    ),
    template("section", "fill", "#111111", "Section fill override"),
    template("section", "overflow", "hidden", "Section overflow override"),
    template("section", "hidden", "true", "Hide section initially"),
    template("section", "onscrolldown", "elementShow:target-id", "Scroll down action"),
    template("section", "onscrollup", "elementHide:target-id", "Scroll up action"),
    template("section", "sticky", "true", "Enable sticky behavior"),
    template("section", "stickyoffset", "24", "Sticky offset"),
    template("section", "stickyposition", "top", "Sticky pin position"),
    template(
      "section",
      "visiblewhen",
      "videoPlaying:equals:true",
      "Conditional visibility (variable:operator:value)"
    ),
    template(
      "section",
      "scrollopacity",
      "0:1:0.2:1",
      "Scroll opacity inputStart:inputEnd:outputStart:outputEnd (colon) or four comma numbers"
    ),
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
    if (FRAME_LIKE.has(nodeType.toUpperCase())) {
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
  function getAnnotationTemplateTotal(nodeType) {
    return getAnnotationTemplatesForNode(nodeType).length;
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
  function getAllAnnotationTemplates(scope) {
    if (scope === "element") return [...ELEMENT_ANNOTATION_TEMPLATES];
    if (scope === "section") return [...SECTION_ANNOTATION_TEMPLATES];
    return [...ELEMENT_ANNOTATION_TEMPLATES, ...SECTION_ANNOTATION_TEMPLATES];
  }

  // ../figma-bridge/src/inspect-unified.ts
  var GENERIC_NAME_RE2 = /^(Frame|Group|Rectangle|Ellipse|Text|Component|Section|Vector|Image|Polygon|Star|Line|Arrow)\s*\d*$/i;
  var FRAME_LIKE2 = /* @__PURE__ */ new Set(["FRAME", "COMPONENT", "COMPONENT_SET", "SECTION", "GROUP"]);
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
    var _a;
    const confidence = issue.severity === "error" ? "high" : issue.severity === "warn" ? "medium" : "low";
    return {
      id: `bridge-${(_a = issue.source) != null ? _a : "rule"}-${index}`,
      category: bridgeCategoryToUi(issue.category),
      confidence,
      message: issue.message,
      source: issue.source
    };
  }
  function legacyIssue(id, category, confidence, message) {
    return { id, category, confidence, message };
  }
  function bridgeSuggestionToWidget(s) {
    let snippet;
    if (s.annotation) {
      snippet = `[pb: ${Object.keys(s.annotation).sort().map((k) => `${k}=${s.annotation[k]}`).join(", ")}]`;
    }
    const descParts = [s.target ? `export \u2192 ${s.target}` : "", snippet != null ? snippet : ""].filter(Boolean);
    return {
      kind: s.kind,
      label: s.label,
      description: descParts.length ? descParts.join(" \xB7 ") : s.label,
      snippet
    };
  }
  function textAnnotationSuggestions() {
    return [
      { kind: "apply-annotation", label: "Semantic heading (H1)", annotation: { seo: "h1" } },
      { kind: "apply-annotation", label: "Semantic heading (H2)", annotation: { seo: "h2" } },
      { kind: "apply-annotation", label: "Body style template", annotation: { style: "body1" } }
    ];
  }
  function frameSectionSuggestions() {
    return [
      {
        kind: "apply-annotation",
        label: "Mark as default section",
        annotation: { type: "contentBlock" }
      },
      { kind: "apply-annotation", label: "Mark as columns", annotation: { type: "sectionColumn" } }
    ];
  }
  function inspectUnified(node, ctx) {
    var _a;
    const issues = [];
    const suggestionRows = [];
    const rawSuggestions = [];
    const stripped = stripAnnotations(node.name || "");
    const parsed = parseExportTargetFromLayerName(node.name);
    const slugEl = slugify(stripped || node.name || "element");
    const prefixDiagnostics = getLayerPrefixDiagnostics(node.name);
    if (GENERIC_NAME_RE2.test(node.name.trim())) {
      issues.push(
        legacyIssue("generic-name", "naming", "high", `"${node.name}" looks like a default name`)
      );
      rawSuggestions.push({
        kind: "inspect",
        label: "Rename node"
      });
    }
    if (node.width === 0 || node.height === 0) {
      issues.push(
        legacyIssue(
          "zero-size",
          "structure",
          "high",
          `Zero dimension (${node.width} \xD7 ${node.height})`
        )
      );
    }
    if (node.childCount > 8 && !node.hasAutoLayout) {
      issues.push(
        legacyIssue(
          "no-autolayout",
          "structure",
          "medium",
          `${node.childCount} children with no auto-layout`
        )
      );
      rawSuggestions.push({
        kind: "apply-annotation",
        label: "Treat as columns",
        annotation: { type: "sectionColumn" }
      });
      rawSuggestions.push({
        kind: "apply-annotation",
        label: "Treat as reveal",
        annotation: { type: "revealSection", triggerMode: "click" }
      });
    }
    if (node.width > 0 && node.height > 0 && (node.width < 4 || node.height < 4)) {
      issues.push(
        legacyIssue("tiny-node", "visual", "low", `Very small node (${node.width} \xD7 ${node.height})`)
      );
    }
    if (node.overflowDirection && node.overflowDirection !== "NONE") {
      rawSuggestions.push({
        kind: "inspect",
        label: "Scroll overflow on frame \u2014 exporter emits scrollContainer without a type annotation"
      });
    }
    if (node.hasVariableBindings) {
      rawSuggestions.push({
        kind: "inspect",
        label: "Variable bindings present \u2014 numeric bindings export as CSS var() where supported"
      });
    }
    if ((ctx == null ? void 0 : ctx.textStyleName) && node.type === "TEXT") {
      rawSuggestions.push({
        kind: "inspect",
        label: `Text uses style \u201C${ctx.textStyleName}\u201D${ctx.fontSizePx ? ` (~${ctx.fontSizePx}px)` : ""} \u2014 semantic heading/body can still be set via [pb: seo=\u2026] if needed`
      });
    }
    const contextual = inferContextualInsights(node, ctx);
    for (let i = 0; i < contextual.issues.length; i++) {
      issues.push(bridgeIssueToWidget(contextual.issues[i], i));
    }
    rawSuggestions.push(...contextual.suggestions);
    if (node.type === "TEXT") {
      rawSuggestions.push(...textAnnotationSuggestions());
    } else if (FRAME_LIKE2.has(node.type) && issues.length === 0) {
      rawSuggestions.push(...frameSectionSuggestions());
    }
    const seen = /* @__PURE__ */ new Set();
    for (let i = 0; i < rawSuggestions.length; i++) {
      const row = bridgeSuggestionToWidget(rawSuggestions[i]);
      const key = `${row.kind}|${row.label}|${(_a = row.snippet) != null ? _a : ""}`;
      if (seen.has(key)) continue;
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
        expandNote: `Exports as ${parsed.kind} with key "${parsed.key}". After expandPageBuilder, element ids are prefixed with the section id.`
      }
    };
  }

  // src/widget.ts
  var INITIAL_WIDGET_STATE = {
    activeTab: "audit",
    lastScannedPageName: "",
    auditRows: [],
    keyFilter: "",
    keyScope: "all",
    inspectedNodeName: "",
    inspectedExportKind: "",
    inspectedExportKey: ""
  };
  function buildInspectableNodePayload(node) {
    var _a, _b, _c;
    const w = Math.round((_a = node.width) != null ? _a : 0);
    const h = Math.round((_b = node.height) != null ? _b : 0);
    const children = (_c = node.children) != null ? _c : [];
    const frameLike = node;
    const hasAutoLayout = "layoutMode" in frameLike && frameLike.layoutMode !== void 0 && frameLike.layoutMode !== "NONE";
    let overflowDirection;
    if ("overflowDirection" in frameLike) {
      overflowDirection = frameLike.overflowDirection;
    }
    let primaryFillKind = "none";
    const rawFills = "fills" in frameLike ? frameLike.fills : void 0;
    if (Array.isArray(rawFills)) {
      const visible = rawFills.filter((f) => f.visible !== false);
      if (visible.length === 0) primaryFillKind = "none";
      else if (visible.length > 1) primaryFillKind = "mixed";
      else {
        const t = visible[0].type;
        if (t === "SOLID") primaryFillKind = "solid";
        else if (t === "IMAGE") primaryFillKind = "image";
        else primaryFillKind = "gradient";
      }
    }
    let hasVariableBindings = false;
    if (frameLike.boundVariables && typeof frameLike.boundVariables === "object") {
      hasVariableBindings = Object.keys(frameLike.boundVariables).length > 0;
    }
    return {
      id: node.id,
      name: node.name,
      type: node.type,
      width: w,
      height: h,
      childCount: children.length,
      hasAutoLayout,
      overflowDirection,
      primaryFillKind,
      hasVariableBindings
    };
  }
  function buildInspectContext(node) {
    var _a, _b;
    const parent = node.parent;
    let parentName;
    let parentType;
    let siblingIndex;
    let siblingCount;
    if (parent && "children" in parent) {
      const ch = parent.children;
      siblingCount = ch.length;
      const idx = ch.indexOf(node);
      siblingIndex = idx >= 0 ? idx : void 0;
    }
    if (parent && "name" in parent && typeof parent.name === "string") {
      parentName = parent.name;
      parentType = parent.type;
    }
    let mainComponentName;
    if (node.type === "INSTANCE") {
      mainComponentName = (_b = (_a = node.mainComponent) == null ? void 0 : _a.name) != null ? _b : void 0;
    }
    let textStyleName;
    let fontSizePx;
    if (node.type === "TEXT") {
      const t = node;
      const styleId = t.textStyleId;
      if (typeof styleId === "string" && styleId.length > 0) {
        const st = figma.getLocalTextStyles().find((s) => s.id === styleId);
        if (st) textStyleName = st.name;
      }
      const fs = t.fontSize;
      if (typeof fs === "number") {
        fontSizePx = Math.round(fs);
      }
    }
    return {
      parentName,
      parentType,
      siblingIndex,
      siblingCount,
      mainComponentName,
      textStyleName,
      fontSizePx
    };
  }

  // src/widget-audit.ts
  function scanPageFrames() {
    var _a;
    const rows = [];
    for (const node of figma.currentPage.children) {
      if (node.type !== "FRAME") continue;
      const parsed = parseExportTargetFromLayerName(node.name);
      const prefixWarnings = getLayerPrefixDiagnostics(node.name);
      rows.push({
        frameId: node.id,
        frameName: node.name,
        exportKind: parsed.kind,
        exportKey: parsed.key,
        prefixWarnings,
        responsiveRole: (_a = parsed.responsiveRole) != null ? _a : null,
        pairStatus: "n/a"
      });
    }
    const desktopByKey = /* @__PURE__ */ new Map();
    const mobileByKey = /* @__PURE__ */ new Map();
    for (const row of rows) {
      if (row.exportKind !== "preset") continue;
      if (row.responsiveRole === "desktop") {
        addResponsiveRowWithCollisionHandling(desktopByKey, row, "desktop");
      } else if (row.responsiveRole === "mobile") {
        addResponsiveRowWithCollisionHandling(mobileByKey, row, "mobile");
      }
    }
    for (const row of rows) {
      if (row.exportKind !== "preset" || row.responsiveRole === null) continue;
      const partnerMap = row.responsiveRole === "desktop" ? mobileByKey : desktopByKey;
      const partner = partnerMap.get(row.exportKey);
      if (partner) {
        row.pairStatus = "paired";
        row.pairedWithName = partner.frameName;
      } else {
        row.pairStatus = "orphan";
      }
    }
    return rows;
  }
  function addResponsiveRowWithCollisionHandling(rowsByKey, row, role) {
    const existing = rowsByKey.get(row.exportKey);
    if (!existing) {
      rowsByKey.set(row.exportKey, row);
      return;
    }
    row.prefixWarnings = [
      ...row.prefixWarnings,
      `[responsive] Duplicate Section[${role === "desktop" ? "Desktop" : "Mobile"}]/${row.exportKey} frame key; pairing keeps "${existing.frameName}" and ignores this duplicate.`
    ];
  }

  // src/widget-tab-audit.tsx
  var SURFACE = "#242424";
  var SURFACE2 = "#2E2E2E";
  var BORDER = "#333333";
  var TEXT_PRIMARY = "#F0F0F0";
  var TEXT_DIM = "#777777";
  var GREEN = "#47FF8A";
  var YELLOW = "#FFA340";
  function rowStatus(row) {
    if (row.pairStatus === "orphan") return "warn";
    if (row.prefixWarnings.length > 0) return "warn";
    return "ok";
  }
  function AuditTab({ rows, lastScannedPageName, onScan }) {
    const { widget: widget2 } = figma;
    const { AutoLayout: AutoLayout2, Text: Text2 } = widget2;
    const warnCount = rows.filter((r) => rowStatus(r) === "warn").length;
    const summaryText = rows.length > 0 ? `${rows.length} frame${rows.length === 1 ? "" : "s"} \xB7 ${warnCount} warning${warnCount === 1 ? "" : "s"}` : lastScannedPageName !== "" ? "0 frames" : "Not scanned yet";
    return /* @__PURE__ */ figma.widget.h(AutoLayout2, { direction: "vertical", width: "fill-parent", spacing: 6 }, /* @__PURE__ */ figma.widget.h(
      AutoLayout2,
      {
        direction: "horizontal",
        width: "fill-parent",
        verticalAlignItems: "center",
        spacing: 8
      },
      /* @__PURE__ */ figma.widget.h(
        AutoLayout2,
        {
          padding: { vertical: 4, horizontal: 10 },
          cornerRadius: 4,
          fill: SURFACE2,
          onClick: onScan
        },
        /* @__PURE__ */ figma.widget.h(Text2, { fontSize: 10, fill: TEXT_PRIMARY }, "Scan")
      ),
      /* @__PURE__ */ figma.widget.h(Text2, { fontSize: 10, fill: TEXT_DIM, width: "fill-parent" }, summaryText)
    ), rows.length === 0 && lastScannedPageName === "" && /* @__PURE__ */ figma.widget.h(AutoLayout2, { padding: { vertical: 10 }, width: "fill-parent" }, /* @__PURE__ */ figma.widget.h(Text2, { fontSize: 10, fill: TEXT_DIM, width: "fill-parent" }, "Hit Scan to audit this page")), rows.map((row) => {
      const status = rowStatus(row);
      const dotColor = status === "ok" ? GREEN : YELLOW;
      return /* @__PURE__ */ figma.widget.h(
        AutoLayout2,
        {
          key: row.frameId,
          direction: "vertical",
          width: "fill-parent",
          padding: { vertical: 6, horizontal: 8 },
          cornerRadius: 6,
          fill: SURFACE,
          spacing: 3
        },
        /* @__PURE__ */ figma.widget.h(
          AutoLayout2,
          {
            direction: "horizontal",
            width: "fill-parent",
            verticalAlignItems: "center",
            spacing: 6
          },
          /* @__PURE__ */ figma.widget.h(AutoLayout2, { width: 6, height: 6, cornerRadius: 3, fill: dotColor }),
          /* @__PURE__ */ figma.widget.h(
            AutoLayout2,
            {
              direction: "horizontal",
              width: "fill-parent",
              verticalAlignItems: "center",
              spacing: 5
            },
            /* @__PURE__ */ figma.widget.h(AutoLayout2, { padding: { vertical: 1, horizontal: 4 }, cornerRadius: 3, fill: BORDER }, /* @__PURE__ */ figma.widget.h(Text2, { fontSize: 8, fill: TEXT_DIM }, row.exportKind)),
            /* @__PURE__ */ figma.widget.h(Text2, { fontSize: 10, fill: TEXT_PRIMARY, width: "fill-parent" }, row.exportKey !== "" ? row.exportKey : "(no key)")
          ),
          /* @__PURE__ */ figma.widget.h(AutoLayout2, { direction: "horizontal", spacing: 4, verticalAlignItems: "center" }, row.responsiveRole !== null && /* @__PURE__ */ figma.widget.h(Text2, { fontSize: 9, fill: TEXT_DIM }, row.responsiveRole), row.pairStatus === "orphan" && /* @__PURE__ */ figma.widget.h(Text2, { fontSize: 9, fill: YELLOW }, "no pair"), row.prefixWarnings.length > 0 && /* @__PURE__ */ figma.widget.h(Text2, { fontSize: 9, fill: YELLOW }, "\u26A0"))
        ),
        /* @__PURE__ */ figma.widget.h(AutoLayout2, { width: "fill-parent", overflow: "hidden" }, /* @__PURE__ */ figma.widget.h(Text2, { fontSize: 8, fill: TEXT_DIM, width: 260, truncate: true }, row.frameName))
      );
    }));
  }

  // src/widget-tab-keys.tsx
  var SURFACE3 = "#242424";
  var SURFACE22 = "#2E2E2E";
  var BORDER2 = "#333333";
  var TEXT_PRIMARY2 = "#F0F0F0";
  var TEXT_DIM2 = "#777777";
  var SCOPE_OPTIONS = ["all", "element", "section"];
  function KeysTab({ filter, scope, onFilterChange, onScopeChange }) {
    const { widget: widget2 } = figma;
    const { AutoLayout: AutoLayout2, Text: Text2, Input } = widget2;
    const allTemplates = scope === "all" ? getAllAnnotationTemplates(void 0) : getAllAnnotationTemplates(scope);
    const needle = filter.toLowerCase();
    const filtered = allTemplates.filter(
      (t) => needle.length === 0 ? true : (t.key + " " + t.description).toLowerCase().includes(needle)
    );
    const capped = filtered.slice(0, 20);
    return /* @__PURE__ */ figma.widget.h(AutoLayout2, { direction: "vertical", width: "fill-parent", spacing: 8 }, /* @__PURE__ */ figma.widget.h(
      Input,
      {
        value: filter,
        placeholder: "Filter keys\u2026",
        onTextEditEnd: (e) => onFilterChange(e.characters),
        fontSize: 10,
        fill: TEXT_DIM2,
        width: "fill-parent"
      }
    ), /* @__PURE__ */ figma.widget.h(AutoLayout2, { direction: "horizontal", width: "fill-parent", spacing: 4 }, SCOPE_OPTIONS.map((opt) => /* @__PURE__ */ figma.widget.h(
      AutoLayout2,
      {
        key: opt,
        padding: { vertical: 3, horizontal: 8 },
        cornerRadius: 4,
        fill: scope === opt ? SURFACE22 : "transparent",
        onClick: () => onScopeChange(opt)
      },
      /* @__PURE__ */ figma.widget.h(Text2, { fontSize: 9, fill: scope === opt ? TEXT_PRIMARY2 : TEXT_DIM2 }, opt)
    ))), capped.length === 0 ? /* @__PURE__ */ figma.widget.h(AutoLayout2, { padding: { vertical: 8 }, width: "fill-parent" }, /* @__PURE__ */ figma.widget.h(Text2, { fontSize: 10, fill: TEXT_DIM2, width: "fill-parent" }, "No keys match")) : /* @__PURE__ */ figma.widget.h(AutoLayout2, { direction: "vertical", width: "fill-parent", spacing: 5 }, capped.map((t, i) => /* @__PURE__ */ figma.widget.h(
      AutoLayout2,
      {
        key: `${t.scope}-${t.key}-${i}`,
        direction: "vertical",
        width: "fill-parent",
        padding: { vertical: 6, horizontal: 8 },
        cornerRadius: 6,
        fill: SURFACE3,
        spacing: 3
      },
      /* @__PURE__ */ figma.widget.h(
        AutoLayout2,
        {
          direction: "horizontal",
          width: "fill-parent",
          verticalAlignItems: "center",
          spacing: 5
        },
        /* @__PURE__ */ figma.widget.h(AutoLayout2, { padding: { vertical: 1, horizontal: 4 }, cornerRadius: 3, fill: BORDER2 }, /* @__PURE__ */ figma.widget.h(Text2, { fontSize: 8, fill: TEXT_DIM2 }, t.scope === "element" ? "elem" : "sect")),
        /* @__PURE__ */ figma.widget.h(Text2, { fontSize: 10, fill: TEXT_PRIMARY2, width: "fill-parent" }, t.key)
      ),
      /* @__PURE__ */ figma.widget.h(Text2, { fontSize: 9, fill: TEXT_DIM2, width: "fill-parent" }, t.description),
      /* @__PURE__ */ figma.widget.h(
        AutoLayout2,
        {
          padding: { vertical: 3, horizontal: 6 },
          cornerRadius: 3,
          fill: SURFACE22,
          width: "fill-parent"
        },
        /* @__PURE__ */ figma.widget.h(Text2, { fontSize: 8, fill: TEXT_DIM2, width: "fill-parent" }, t.snippet)
      )
    ))));
  }

  // src/widget-main.tsx
  var { widget } = figma;
  var { AutoLayout, Text, useSyncedState, useEffect } = widget;
  var BG = "#1A1A1A";
  var SURFACE23 = "#2E2E2E";
  var BORDER3 = "#333333";
  var TEXT_PRIMARY3 = "#F0F0F0";
  var TEXT_DIM3 = "#777777";
  function PageBuilderWidget() {
    const [state, setState] = useSyncedState("pb-widget-v2", INITIAL_WIDGET_STATE);
    useEffect(() => {
      function refresh() {
        const sel = figma.currentPage.selection;
        if (!sel.length) {
          if (state.inspectedNodeName === "" && state.inspectedExportKind === "" && state.inspectedExportKey === "")
            return;
          setState(__spreadProps(__spreadValues({}, state), {
            inspectedNodeName: "",
            inspectedExportKind: "",
            inspectedExportKey: ""
          }));
          return;
        }
        const node = sel[0];
        const snap = buildInspectableNodePayload(node);
        const ctx = buildInspectContext(node);
        const result = inspectUnified(snap, ctx);
        const newName = node.name;
        const newKind = result.exportPreview.parsedTargetKind;
        const newKey = result.exportPreview.exportKey;
        if (newName === state.inspectedNodeName && newKind === state.inspectedExportKind && newKey === state.inspectedExportKey)
          return;
        setState(__spreadProps(__spreadValues({}, state), {
          inspectedNodeName: newName,
          inspectedExportKind: newKind,
          inspectedExportKey: newKey
        }));
      }
      figma.on("selectionchange", refresh);
      refresh();
      return () => figma.off("selectionchange", refresh);
    });
    return /* @__PURE__ */ figma.widget.h(
      AutoLayout,
      {
        direction: "vertical",
        width: 300,
        padding: 14,
        spacing: 0,
        cornerRadius: 10,
        fill: BG,
        stroke: BORDER3,
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
        /* @__PURE__ */ figma.widget.h(Text, { fontSize: 12, fontWeight: "bold", fill: TEXT_PRIMARY3, width: "fill-parent" }, "Page Builder"),
        ["audit", "keys"].map((tab) => /* @__PURE__ */ figma.widget.h(
          AutoLayout,
          {
            key: tab,
            padding: { vertical: 3, horizontal: 8 },
            cornerRadius: 4,
            fill: state.activeTab === tab ? SURFACE23 : "transparent",
            onClick: () => setState(__spreadProps(__spreadValues({}, state), { activeTab: tab }))
          },
          /* @__PURE__ */ figma.widget.h(Text, { fontSize: 10, fill: state.activeTab === tab ? TEXT_PRIMARY3 : TEXT_DIM3 }, tab === "audit" ? "Audit" : "Keys")
        ))
      ),
      /* @__PURE__ */ figma.widget.h(AutoLayout, { width: "fill-parent", height: 1, fill: BORDER3 }),
      /* @__PURE__ */ figma.widget.h(AutoLayout, { direction: "vertical", width: "fill-parent", padding: { top: 10 }, spacing: 0 }, state.activeTab === "audit" ? /* @__PURE__ */ figma.widget.h(
        AuditTab,
        {
          rows: state.auditRows,
          lastScannedPageName: state.lastScannedPageName,
          onScan: () => {
            const rows = scanPageFrames();
            setState(__spreadProps(__spreadValues({}, state), { auditRows: rows, lastScannedPageName: figma.currentPage.name }));
          }
        }
      ) : /* @__PURE__ */ figma.widget.h(
        KeysTab,
        {
          filter: state.keyFilter,
          scope: state.keyScope,
          onFilterChange: (v) => setState(__spreadProps(__spreadValues({}, state), { keyFilter: v })),
          onScopeChange: (s) => setState(__spreadProps(__spreadValues({}, state), { keyScope: s }))
        }
      )),
      state.inspectedNodeName !== "" && /* @__PURE__ */ figma.widget.h(figma.widget.Fragment, null, /* @__PURE__ */ figma.widget.h(AutoLayout, { width: "fill-parent", height: 1, fill: BORDER3 }), /* @__PURE__ */ figma.widget.h(AutoLayout, { direction: "vertical", width: "fill-parent", spacing: 2, padding: { top: 8 } }, /* @__PURE__ */ figma.widget.h(Text, { fontSize: 9, fontWeight: "bold", fill: TEXT_DIM3, letterSpacing: 1 }, "SELECTED"), /* @__PURE__ */ figma.widget.h(Text, { fontSize: 10, fill: TEXT_PRIMARY3, width: "fill-parent" }, state.inspectedNodeName), /* @__PURE__ */ figma.widget.h(Text, { fontSize: 9, fill: TEXT_DIM3 }, state.inspectedExportKind, " \xB7 ", state.inspectedExportKey)))
    );
  }
  figma.widget.register(PageBuilderWidget);
})();
