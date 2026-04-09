(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/apps/web/src/app/theme/pb-color-tokens.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** Page builder color tokens surfaced in the M1 color dev tool (brand + links). */ __turbopack_context__.s([
    "M1_ON_PAIR",
    ()=>M1_ON_PAIR,
    "M1_TOKEN_IDS",
    ()=>M1_TOKEN_IDS,
    "M1_TOKEN_META",
    ()=>M1_TOKEN_META
]);
const M1_TOKEN_IDS = [
    "--pb-primary",
    "--pb-on-primary",
    "--pb-secondary",
    "--pb-on-secondary",
    "--pb-accent",
    "--pb-on-accent",
    "--pb-link",
    "--pb-link-hover",
    "--pb-link-active"
];
const M1_ON_PAIR = {
    "--pb-on-primary": "--pb-primary",
    "--pb-on-secondary": "--pb-secondary",
    "--pb-on-accent": "--pb-accent",
    // Links appear on the secondary surface — measure contrast there
    "--pb-link": "--pb-secondary",
    "--pb-link-hover": "--pb-secondary",
    "--pb-link-active": "--pb-secondary"
};
const M1_TOKEN_META = {
    "--pb-primary": {
        label: "Primary"
    },
    "--pb-on-primary": {
        label: "On primary",
        contrastWith: "--pb-primary"
    },
    "--pb-secondary": {
        label: "Secondary"
    },
    "--pb-on-secondary": {
        label: "On secondary",
        contrastWith: "--pb-secondary"
    },
    "--pb-accent": {
        label: "Accent"
    },
    "--pb-on-accent": {
        label: "On accent",
        contrastWith: "--pb-accent"
    },
    "--pb-link": {
        label: "Link"
    },
    "--pb-link-hover": {
        label: "Link hover"
    },
    "--pb-link-active": {
        label: "Link active"
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/app/theme/palette-suggest.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_M1_SEEDS_DARK",
    ()=>DEFAULT_M1_SEEDS_DARK,
    "DEFAULT_M1_SEEDS_LIGHT",
    ()=>DEFAULT_M1_SEEDS_LIGHT,
    "contrastHintForToken",
    ()=>contrastHintForToken,
    "contrastPair",
    ()=>contrastPair,
    "detectHarmony",
    ()=>detectHarmony,
    "fitOnFill",
    ()=>fitOnFill,
    "formatPbColor",
    ()=>formatPbColor,
    "inferHarmony",
    ()=>inferHarmony,
    "initialM1Rows",
    ()=>initialM1Rows,
    "isFullyFluidPalette",
    ()=>isFullyFluidPalette,
    "jitterOklch",
    ()=>jitterOklch,
    "proposeM1Values",
    ()=>proposeM1Values,
    "suggestSeeds",
    ()=>suggestSeeds,
    "tokenVariantHash",
    ()=>tokenVariantHash,
    "wcagContrastTooltipLines",
    ()=>wcagContrastTooltipLines
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$culori$2f$src$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/culori/src/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$culori$2f$src$2f$converter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__converter$3e$__ = __turbopack_context__.i("[project]/node_modules/culori/src/converter.js [app-client] (ecmascript) <export default as converter>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$culori$2f$src$2f$formatter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/culori/src/formatter.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$culori$2f$src$2f$parse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__parse$3e$__ = __turbopack_context__.i("[project]/node_modules/culori/src/parse.js [app-client] (ecmascript) <export default as parse>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$culori$2f$src$2f$wcag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__contrast__as__wcagContrast$3e$__ = __turbopack_context__.i("[project]/node_modules/culori/src/wcag.js [app-client] (ecmascript) <export contrast as wcagContrast>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$culori$2f$src$2f$clamp$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/culori/src/clamp.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$theme$2f$pb$2d$color$2d$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/app/theme/pb-color-tokens.ts [app-client] (ecmascript)");
;
;
const toOklch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$culori$2f$src$2f$converter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__converter$3e$__["converter"])("oklch");
const DEFAULT_M1_SEEDS_LIGHT = {
    primary: "oklch(0.205 0 0)",
    secondary: "oklch(0.97 0 0)",
    accent: "oklch(0.97 0 0)",
    linkAccent: "#f000b8"
};
const DEFAULT_M1_SEEDS_DARK = {
    primary: "oklch(0.922 0 0)",
    secondary: "oklch(0.269 0 0)",
    accent: "oklch(0.269 0 0)",
    linkAccent: "#f000b8"
};
function isFullyFluidPalette(rows) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$theme$2f$pb$2d$color$2d$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["M1_TOKEN_IDS"].every((id)=>!rows[id]?.confirmed);
}
function mix32(a, b) {
    return Math.imul(a ^ b, 2654435761) >>> 0;
}
function tokenVariantHash(tokenId, variant) {
    let h = variant >>> 0;
    for(let i = 0; i < tokenId.length; i++){
        h = mix32(h, tokenId.charCodeAt(i));
    }
    return h >>> 0;
}
function asOklch(color) {
    const parsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$culori$2f$src$2f$parse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__parse$3e$__["parse"])(color);
    if (!parsed) return {
        mode: "oklch",
        l: 0.5,
        c: 0,
        h: 0
    };
    const o = toOklch(parsed);
    if (!o || o.mode !== "oklch") return {
        mode: "oklch",
        l: 0.5,
        c: 0,
        h: 0
    };
    return {
        mode: "oklch",
        l: o.l ?? 0.5,
        c: o.c ?? 0,
        h: o.h
    };
}
function clampOklch(o) {
    const clipped = toOklch((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$culori$2f$src$2f$clamp$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clampGamut"])("rgb")(o));
    if (!clipped || clipped.mode !== "oklch") {
        return {
            mode: "oklch",
            l: o.l,
            c: o.c,
            h: o.h
        };
    }
    return {
        mode: "oklch",
        l: Math.min(1, Math.max(0, clipped.l)),
        c: Math.min(0.37, Math.max(0, clipped.c)),
        h: clipped.h
    };
}
function formatPbColor(o) {
    const s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$culori$2f$src$2f$formatter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCss"])(clampOklch(o));
    return s ?? "oklch(0.5 0 0)";
}
// ── Harmony inference ──────────────────────────────────────────────────────────
/** Circular hue distance, normalized to [0, 180]. */ function hueDist(a, b) {
    const d = ((b - a) % 360 + 360) % 360;
    return d > 180 ? 360 - d : d;
}
/** Gaussian score: 1.0 when d equals target, falls off with sigma. */ function gScore(d, target, sigma) {
    const diff = d - target;
    return Math.exp(-(diff * diff) / (2 * sigma * sigma));
}
function inferHarmony(primaryHue, otherHues) {
    if (otherHues.length === 0) return {
        harmony: "unknown",
        confidence: 0
    };
    const dists = otherHues.map((h)=>hueDist(primaryHue, h));
    // Score each harmony by how well locked hue distances match expected offsets.
    // Uses the average best-match score across all locked hues.
    const score = (targets, sigma)=>{
        const perHue = dists.map((d)=>Math.max(...targets.map((t)=>gScore(d, t, sigma))));
        return perHue.reduce((a, b)=>a + b, 0) / perHue.length;
    };
    const candidates = [
        [
            "monochromatic",
            score([
                0
            ], 12)
        ],
        [
            "analogous",
            score([
                30,
                45,
                60
            ], 20)
        ],
        [
            "triadic",
            score([
                120,
                240
            ], 22)
        ],
        [
            "split-complementary",
            score([
                150,
                210
            ], 22)
        ],
        [
            "complementary",
            score([
                180
            ], 25)
        ],
        [
            "tetradic",
            score([
                90,
                180,
                270
            ], 22)
        ]
    ];
    const [harmony, confidence] = candidates.reduce((a, b)=>b[1] > a[1] ? b : a);
    return {
        harmony,
        confidence
    };
}
/** Expected secondary and accent hues for a given primary hue and harmony. */ function harmonyTargetHues(primaryHue, harmony) {
    const h = primaryHue;
    switch(harmony){
        case "complementary":
            // Secondary stays near primary family; accent is the opposite
            return {
                secondary: h,
                accent: (h + 180) % 360
            };
        case "split-complementary":
            return {
                secondary: (h + 150) % 360,
                accent: (h + 210) % 360
            };
        case "triadic":
            return {
                secondary: (h + 120) % 360,
                accent: (h + 240) % 360
            };
        case "tetradic":
            return {
                secondary: (h + 90) % 360,
                accent: (h + 180) % 360
            };
        case "analogous":
            return {
                secondary: (h + 30 + 360) % 360,
                accent: (h - 30 + 360) % 360
            };
        case "monochromatic":
        case "unknown":
        default:
            return {
                secondary: h,
                accent: h
            };
    }
}
/** Shortest arc blend between two hues on the color wheel. */ function blendHue(from, to, t) {
    const arc = (to - from + 540) % 360 - 180;
    return ((from + arc * t) % 360 + 360) % 360;
}
// ── Jitter ─────────────────────────────────────────────────────────────────────
/**
 * Jitter scale: higher = wider lottery.
 * Starts wide when few fills are locked and harmony is uncertain;
 * narrows as the user locks colors and the harmony becomes clear.
 */ function computeJitterScale(confidence, lockedFillCount) {
    const base = Math.max(0.5, 4.5 - lockedFillCount * 1.0);
    return Math.max(0.4, base * (1 - confidence * 0.55));
}
function jitterOklch(base, tokenId, rowVariant, scale = 1.0) {
    const h = tokenVariantHash(tokenId, rowVariant);
    const dH = ((h & 0xff) / 255 - 0.5) * 30 * scale;
    const dC = ((h >> 8 & 0xff) / 255 - 0.5) * 0.08 * scale;
    const dL = ((h >> 16 & 0xff) / 255 - 0.5) * 0.04 * scale;
    const chroma = base.c ?? 0;
    const rawH = base.h ?? 0;
    // Keep hue stable for near-neutral colors (grays) to avoid random hue drift
    const nh = chroma < 0.02 ? rawH : ((rawH + dH) % 360 + 360) % 360;
    return clampOklch({
        mode: "oklch",
        l: Math.min(1, Math.max(0, base.l + dL)),
        c: Math.min(0.37, Math.max(0, chroma + dC)),
        h: nh
    });
}
// ── WCAG AA ────────────────────────────────────────────────────────────────────
const WCAG_AA_RATIO = 4.5;
function fitOnFill(fill) {
    const fillO = clampOklch(fill);
    const lightFill = fillO.l >= 0.55;
    let lo = lightFill ? 0 : 0.52;
    let hi = lightFill ? 0.48 : 1;
    for(let i = 0; i < 28; i++){
        const mid = (lo + hi) / 2;
        const cand = {
            mode: "oklch",
            l: mid,
            c: 0,
            h: 0
        };
        const ratio = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$culori$2f$src$2f$wcag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__contrast__as__wcagContrast$3e$__["wcagContrast"])(cand, fillO);
        if (lightFill) {
            if (ratio >= WCAG_AA_RATIO) lo = mid;
            else hi = mid;
        } else {
            if (ratio >= WCAG_AA_RATIO) hi = mid;
            else lo = mid;
        }
    }
    return clampOklch({
        mode: "oklch",
        l: lightFill ? lo : hi,
        c: 0,
        h: 0
    });
}
// ── Seed-fill helpers ──────────────────────────────────────────────────────────
/**
 * Propose a fill from a seed.
 * At rowVariant 0 the seed is returned exactly — the token equals what you typed.
 * After Refresh (rowVariant > 0) jitter explores variations around the seed.
 */ function proposeSeedFill(seedCss, tokenId, rowVariant, scale) {
    const base = asOklch(seedCss);
    return rowVariant === 0 ? clampOklch(base) : jitterOklch(base, tokenId, rowVariant, scale);
}
/**
 * Derive the secondary surface from the relationship between primary and accent.
 * Secondary is always generated — it's the only token the user never sets directly.
 * Blends toward harmony-appropriate hues as confidence in the detected harmony grows.
 */ function deriveSecondary(primary, accent, rows, theme, jitterScale) {
    const primaryHue = primary.h ?? 0;
    const harmonyFit = (accent.c ?? 0) > 0.03 ? inferHarmony(primaryHue, [
        accent.h ?? primaryHue
    ]) : {
        harmony: "unknown",
        confidence: 0
    };
    const { secondary: hS } = harmonyTargetHues(primaryHue, harmonyFit.harmony);
    const secHue = blendHue(primaryHue, hS, harmonyFit.confidence);
    const chromaBoost = harmonyFit.confidence * 0.02;
    if (theme === "light") {
        return jitterOklch({
            mode: "oklch",
            l: primary.l > 0.55 ? Math.min(0.99, primary.l + 0.035) : 0.965,
            c: 0.022 + chromaBoost,
            h: secHue
        }, "--pb-secondary", rows["--pb-secondary"].rowVariant, jitterScale);
    }
    return jitterOklch({
        mode: "oklch",
        l: 0.26,
        c: 0.028 + chromaBoost,
        h: secHue
    }, "--pb-secondary", rows["--pb-secondary"].rowVariant, jitterScale);
}
function detectHarmony(seeds, rows) {
    const effPrimary = rows["--pb-primary"].confirmed ? asOklch(rows["--pb-primary"].value) : asOklch(seeds.primary);
    const effAccent = rows["--pb-accent"].confirmed ? asOklch(rows["--pb-accent"].value) : asOklch(seeds.accent);
    const primaryHue = effPrimary.h ?? 0;
    const otherHues = [];
    if ((effAccent.c ?? 0) > 0.03) otherHues.push(effAccent.h ?? primaryHue);
    if (rows["--pb-secondary"].confirmed) {
        const secO = asOklch(rows["--pb-secondary"].value);
        if ((secO.c ?? 0) > 0.04) otherHues.push(secO.h ?? primaryHue);
    }
    return inferHarmony(primaryHue, otherHues);
}
// ── Link hue helper ────────────────────────────────────────────────────────────
function normalizeHue(primary, linkAccentCss) {
    if ((primary.c ?? 0) > 0.02) return primary.h ?? 0;
    const a = asOklch(linkAccentCss);
    if ((a.c ?? 0) > 0.04) return a.h ?? 320;
    return 85;
}
// ── Link proposals ─────────────────────────────────────────────────────────────
/**
 * Binary-search lightness on a chromatic color to hit WCAG AA (4.5:1) against
 * a given surface. Hue and chroma are fixed; only L is adjusted.
 */ function fitLinkOnSurface(surface, hue, chroma) {
    const s = clampOklch(surface);
    const lightSurface = s.l >= 0.55;
    let lo = lightSurface ? 0.0 : 0.52;
    let hi = lightSurface ? 0.48 : 1.0;
    for(let i = 0; i < 28; i++){
        const mid = (lo + hi) / 2;
        const cand = {
            mode: "oklch",
            l: mid,
            c: chroma,
            h: hue
        };
        const ratio = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$culori$2f$src$2f$wcag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__contrast__as__wcagContrast$3e$__["wcagContrast"])(cand, s);
        if (lightSurface) {
            if (ratio >= WCAG_AA_RATIO) lo = mid;
            else hi = mid;
        } else {
            if (ratio >= WCAG_AA_RATIO) hi = mid;
            else lo = mid;
        }
    }
    return clampOklch({
        mode: "oklch",
        l: lightSurface ? lo : hi,
        c: chroma,
        h: hue
    });
}
/**
 * Link default: primary hue, meaningful chroma, lightness fitted to AA on secondary.
 * Jitter explores hue ± and chroma range on Refresh — L stays contrast-safe.
 */ function proposeLinkDefault(primaryFill, secondaryFill, tokenId, rowVariant, scale) {
    const hash = tokenVariantHash(tokenId, rowVariant);
    const baseHue = (primaryFill.c ?? 0) > 0.02 ? primaryFill.h ?? 0 : 40;
    const dH = ((hash & 0xff) / 255 - 0.5) * 40 * Math.min(scale, 2.0);
    const hue = ((baseHue + dH) % 360 + 360) % 360;
    const chroma = 0.13 + (hash >> 8 & 0xff) / 255 * 0.1; // 0.13–0.23
    return fitLinkOnSurface(secondaryFill, hue, chroma);
}
/**
 * Link hover: linkAccent hue, higher chroma, fitted to AA on secondary.
 */ function proposeLinkHover(linkAccentSeed, secondaryFill, tokenId, rowVariant, scale) {
    const hash = tokenVariantHash(tokenId, rowVariant);
    const base = asOklch(linkAccentSeed);
    const dH = ((hash & 0xff) / 255 - 0.5) * 20 * Math.min(scale, 1.5);
    const hue = (((base.h ?? 0) + dH) % 360 + 360) % 360;
    const chroma = Math.max(base.c ?? 0, 0.18) + (hash >> 8 & 0xff) / 255 * 0.06;
    return fitLinkOnSurface(secondaryFill, hue, chroma);
}
/**
 * Link active: same hue as default, pushed to max contrast extreme on secondary.
 */ function proposeLinkActive(linkDefault, secondaryFill, tokenId, rowVariant) {
    const hash = tokenVariantHash(tokenId, rowVariant);
    const dH = ((hash & 0xff) / 255 - 0.5) * 10;
    const hue = (((linkDefault.h ?? 0) + dH) % 360 + 360) % 360;
    // Push chroma up for a more saturated pressed state
    const chroma = Math.min(0.3, (linkDefault.c ?? 0.15) * 1.3);
    return fitLinkOnSurface(secondaryFill, hue, chroma);
}
/**
 * Coherent link hover for fully-fluid mode: blends primary and linkAccent hues,
 * fitted to AA on secondary.
 */ function proposeCoherentLinkHover(primary, linkAccentCss, secondaryFill, tokenId, rowVariant, scale) {
    const pop = asOklch(linkAccentCss);
    const hP = normalizeHue(primary, linkAccentCss);
    const hA = (pop.c ?? 0) > 0.03 ? pop.h ?? hP : hP;
    const blendedHue = ((hA * 0.52 + hP * 0.48) % 360 + 360) % 360;
    const hash = tokenVariantHash(tokenId, rowVariant);
    const dH = ((hash & 0xff) / 255 - 0.5) * 20 * Math.min(scale, 1.5);
    const hue = ((blendedHue + dH) % 360 + 360) % 360;
    const chroma = Math.max(pop.c ?? 0, 0.18);
    return fitLinkOnSurface(secondaryFill, hue, chroma);
}
// ── Proposal helpers ───────────────────────────────────────────────────────────
/**
 * Given the effective primary and accent (from lock or seed), infer harmony
 * and compute a jitter scale for unlocked rows.
 */ function paletteContext(effPrimary, effAccent, lockedFillCount) {
    const primaryHue = effPrimary.h ?? 0;
    const harmony = (effAccent.c ?? 0) > 0.03 ? inferHarmony(primaryHue, [
        effAccent.h ?? primaryHue
    ]) : {
        harmony: "unknown",
        confidence: 0
    };
    return {
        harmony,
        scale: computeJitterScale(harmony.confidence, lockedFillCount)
    };
}
// ── Full-fluid proposal ────────────────────────────────────────────────────────
/**
 * All rows unlocked.
 * Primary and accent equal their seeds exactly (until Refresh is hit).
 * Secondary derives from the primary ↔ accent relationship — it's the "magic" surface.
 */ function proposeM1ValuesFullyFluid(seeds, rows, theme) {
    const primaryOklch = asOklch(seeds.primary);
    const accentOklch = asOklch(seeds.accent);
    const { scale } = paletteContext(primaryOklch, accentOklch, 0);
    const primaryFill = proposeSeedFill(seeds.primary, "--pb-primary", rows["--pb-primary"].rowVariant, scale);
    const accentFill = proposeSeedFill(seeds.accent, "--pb-accent", rows["--pb-accent"].rowVariant, scale);
    const secondaryFill = deriveSecondary(primaryFill, accentFill, rows, theme, scale);
    const linkDefault = proposeLinkDefault(primaryFill, secondaryFill, "--pb-link", rows["--pb-link"].rowVariant, scale);
    const out = {};
    for (const id of __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$theme$2f$pb$2d$color$2d$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["M1_TOKEN_IDS"]){
        switch(id){
            case "--pb-primary":
                out[id] = formatPbColor(primaryFill);
                break;
            case "--pb-secondary":
                out[id] = formatPbColor(secondaryFill);
                break;
            case "--pb-accent":
                out[id] = formatPbColor(accentFill);
                break;
            case "--pb-on-primary":
                out[id] = formatPbColor(fitOnFill(primaryFill));
                break;
            case "--pb-on-secondary":
                out[id] = formatPbColor(fitOnFill(secondaryFill));
                break;
            case "--pb-on-accent":
                out[id] = formatPbColor(fitOnFill(accentFill));
                break;
            case "--pb-link":
                out[id] = formatPbColor(linkDefault);
                break;
            case "--pb-link-hover":
                out[id] = formatPbColor(proposeCoherentLinkHover(primaryFill, seeds.linkAccent, secondaryFill, id, rows[id].rowVariant, scale));
                break;
            case "--pb-link-active":
                out[id] = formatPbColor(proposeLinkActive(linkDefault, secondaryFill, id, rows[id].rowVariant));
                break;
            default:
                break;
        }
    }
    return out;
}
function proposeM1Values(seeds, rows, theme) {
    if (isFullyFluidPalette(rows)) {
        return proposeM1ValuesFullyFluid(seeds, rows, theme);
    }
    // Effective primary+accent for context (locked value takes priority over seed)
    const effPrimary = rows["--pb-primary"].confirmed ? asOklch(rows["--pb-primary"].value) : asOklch(seeds.primary);
    const effAccent = rows["--pb-accent"].confirmed ? asOklch(rows["--pb-accent"].value) : asOklch(seeds.accent);
    const lockedFillCount = [
        "--pb-primary",
        "--pb-secondary",
        "--pb-accent"
    ].filter((id)=>rows[id].confirmed).length;
    const { scale } = paletteContext(effPrimary, effAccent, lockedFillCount);
    const primaryFill = rows["--pb-primary"].confirmed ? effPrimary : proposeSeedFill(seeds.primary, "--pb-primary", rows["--pb-primary"].rowVariant, scale);
    const accentFill = rows["--pb-accent"].confirmed ? effAccent : proposeSeedFill(seeds.accent, "--pb-accent", rows["--pb-accent"].rowVariant, scale);
    const secondaryFill = rows["--pb-secondary"].confirmed ? asOklch(rows["--pb-secondary"].value) : deriveSecondary(primaryFill, accentFill, rows, theme, scale);
    const linkDefault = rows["--pb-link"].confirmed ? asOklch(rows["--pb-link"].value) : proposeLinkDefault(primaryFill, secondaryFill, "--pb-link", rows["--pb-link"].rowVariant, scale);
    const out = {};
    for (const id of __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$theme$2f$pb$2d$color$2d$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["M1_TOKEN_IDS"]){
        if (rows[id].confirmed) {
            out[id] = rows[id].value;
            continue;
        }
        switch(id){
            case "--pb-primary":
                out[id] = formatPbColor(primaryFill);
                break;
            case "--pb-secondary":
                out[id] = formatPbColor(secondaryFill);
                break;
            case "--pb-accent":
                out[id] = formatPbColor(accentFill);
                break;
            case "--pb-on-primary":
                out[id] = formatPbColor(fitOnFill(primaryFill));
                break;
            case "--pb-on-secondary":
                out[id] = formatPbColor(fitOnFill(secondaryFill));
                break;
            case "--pb-on-accent":
                out[id] = formatPbColor(fitOnFill(accentFill));
                break;
            case "--pb-link":
                out[id] = formatPbColor(linkDefault);
                break;
            case "--pb-link-hover":
                out[id] = formatPbColor(proposeLinkHover(seeds.linkAccent, secondaryFill, id, rows[id].rowVariant, scale));
                break;
            case "--pb-link-active":
                out[id] = formatPbColor(proposeLinkActive(linkDefault, secondaryFill, id, rows[id].rowVariant));
                break;
            default:
                break;
        }
    }
    return out;
}
function contrastPair(foregroundCss, backgroundCss) {
    try {
        const a = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$culori$2f$src$2f$parse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__parse$3e$__["parse"])(foregroundCss);
        const b = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$culori$2f$src$2f$parse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__parse$3e$__["parse"])(backgroundCss);
        if (!a || !b) return undefined;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$culori$2f$src$2f$wcag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__contrast__as__wcagContrast$3e$__["wcagContrast"])(a, b);
    } catch  {
        return undefined;
    }
}
function contrastHintForToken(tokenId, values) {
    const pair = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$theme$2f$pb$2d$color$2d$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["M1_ON_PAIR"][tokenId];
    if (!pair) return undefined;
    return contrastPair(values[tokenId], values[pair]);
}
function wcagContrastTooltipLines(ratio) {
    if (ratio == null || !Number.isFinite(ratio)) return null;
    const n = ratio.toFixed(2);
    const normal = ratio >= 7 ? "AAA" : ratio >= 4.5 ? "AA" : ratio >= 3 ? "A (large text only)" : "Below AA";
    const large = ratio >= 4.5 ? "AAA" : ratio >= 3 ? "AA" : "Below AA";
    return [
        `${n}∶1`,
        `Normal text: ${normal}`,
        `Large text: ${large}`
    ];
}
function suggestSeeds() {
    const primaryHue = Math.random() * 360;
    const offsets = [
        30,
        60,
        120,
        150,
        180
    ];
    const accentHue = (primaryHue + (offsets[Math.floor(Math.random() * offsets.length)] ?? 60)) % 360;
    const pC = 0.13 + Math.random() * 0.13; // chroma 0.13–0.26
    const aC = 0.14 + Math.random() * 0.13;
    const pL_light = 0.22 + Math.random() * 0.2; // dark enough to read on light bg
    const pL_dark = 0.78 + Math.random() * 0.14; // light enough to read on dark bg
    const aL = 0.5 + Math.random() * 0.2;
    return {
        seedsLight: {
            primary: formatPbColor({
                mode: "oklch",
                l: pL_light,
                c: pC,
                h: primaryHue
            }),
            secondary: DEFAULT_M1_SEEDS_LIGHT.secondary,
            accent: formatPbColor({
                mode: "oklch",
                l: aL,
                c: aC,
                h: accentHue
            }),
            linkAccent: DEFAULT_M1_SEEDS_LIGHT.linkAccent
        },
        seedsDark: {
            primary: formatPbColor({
                mode: "oklch",
                l: pL_dark,
                c: pC * 0.85,
                h: primaryHue
            }),
            secondary: DEFAULT_M1_SEEDS_DARK.secondary,
            accent: formatPbColor({
                mode: "oklch",
                l: aL,
                c: aC,
                h: accentHue
            }),
            linkAccent: DEFAULT_M1_SEEDS_DARK.linkAccent
        }
    };
}
function initialM1Rows(seeds, theme) {
    const base = Object.fromEntries(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$theme$2f$pb$2d$color$2d$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["M1_TOKEN_IDS"].map((id)=>[
            id,
            {
                value: "",
                confirmed: false,
                rowVariant: 0
            }
        ]));
    const proposed = proposeM1Values(seeds, base, theme);
    const rows = {
        ...base
    };
    for (const id of __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$theme$2f$pb$2d$color$2d$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["M1_TOKEN_IDS"]){
        rows[id] = {
            ...rows[id],
            value: proposed[id]
        };
    }
    return rows;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/app/dev/colors/color-tool-baseline.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEV_NEUTRAL_M1_SEEDS_DARK",
    ()=>DEV_NEUTRAL_M1_SEEDS_DARK,
    "DEV_NEUTRAL_M1_SEEDS_LIGHT",
    ()=>DEV_NEUTRAL_M1_SEEDS_LIGHT
]);
const DEV_NEUTRAL_M1_SEEDS_LIGHT = {
    primary: "oklch(0.56 0.17 250)",
    secondary: "oklch(0.96 0.01 250)",
    accent: "oklch(0.92 0.03 230)",
    linkAccent: "oklch(0.58 0.19 215)"
};
const DEV_NEUTRAL_M1_SEEDS_DARK = {
    primary: "oklch(0.86 0.13 250)",
    secondary: "oklch(0.22 0.02 250)",
    accent: "oklch(0.29 0.05 230)",
    linkAccent: "oklch(0.74 0.17 215)"
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/app/dev/colors/color-tool-persistence.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "COLOR_TOOL_LEGACY_STORAGE_KEY",
    ()=>COLOR_TOOL_LEGACY_STORAGE_KEY,
    "coerceColorToolPersisted",
    ()=>coerceColorToolPersisted,
    "getDefaultColorToolPersistedV2",
    ()=>getDefaultColorToolPersistedV2,
    "getProductionColorToolPersistedV2",
    ()=>getProductionColorToolPersistedV2,
    "parseColorToolPersistedJson",
    ()=>parseColorToolPersistedJson,
    "parseColorToolPersistedValue",
    ()=>parseColorToolPersistedValue,
    "readColorToolFromLegacyLocalStorage",
    ()=>readColorToolFromLegacyLocalStorage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$theme$2f$palette$2d$suggest$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/app/theme/palette-suggest.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$colors$2f$color$2d$tool$2d$baseline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/app/dev/colors/color-tool-baseline.ts [app-client] (ecmascript)");
;
;
const COLOR_TOOL_LEGACY_STORAGE_KEY = "pb-color-tool-m1";
function getDefaultColorToolPersistedV2() {
    return {
        seedsLight: {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$colors$2f$color$2d$tool$2d$baseline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEV_NEUTRAL_M1_SEEDS_LIGHT"]
        },
        seedsDark: {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$colors$2f$color$2d$tool$2d$baseline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEV_NEUTRAL_M1_SEEDS_DARK"]
        },
        rowsLight: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$theme$2f$palette$2d$suggest$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initialM1Rows"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$colors$2f$color$2d$tool$2d$baseline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEV_NEUTRAL_M1_SEEDS_LIGHT"], "light"),
        rowsDark: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$theme$2f$palette$2d$suggest$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initialM1Rows"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$colors$2f$color$2d$tool$2d$baseline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEV_NEUTRAL_M1_SEEDS_DARK"], "dark"),
        syncSeedsAcrossThemes: true
    };
}
function getProductionColorToolPersistedV2() {
    return {
        seedsLight: {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$theme$2f$palette$2d$suggest$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_M1_SEEDS_LIGHT"]
        },
        seedsDark: {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$theme$2f$palette$2d$suggest$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_M1_SEEDS_DARK"]
        },
        rowsLight: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$theme$2f$palette$2d$suggest$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initialM1Rows"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$theme$2f$palette$2d$suggest$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_M1_SEEDS_LIGHT"], "light"),
        rowsDark: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$theme$2f$palette$2d$suggest$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initialM1Rows"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$theme$2f$palette$2d$suggest$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_M1_SEEDS_DARK"], "dark"),
        syncSeedsAcrossThemes: true
    };
}
function migrateV1ToV2(data) {
    const seedsLight = {
        primary: data.seeds.primaryLight,
        secondary: data.seeds.secondaryLight,
        accent: data.seeds.accentLight,
        linkAccent: data.seeds.linkAccent
    };
    return {
        seedsLight,
        seedsDark: {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$colors$2f$color$2d$tool$2d$baseline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEV_NEUTRAL_M1_SEEDS_DARK"]
        },
        rowsLight: data.rows,
        rowsDark: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$theme$2f$palette$2d$suggest$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initialM1Rows"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$colors$2f$color$2d$tool$2d$baseline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEV_NEUTRAL_M1_SEEDS_DARK"], "dark")
    };
}
function isRecord(value) {
    return value !== null && typeof value === "object";
}
function hasRequiredV2Slices(value) {
    return value.seedsLight != null && value.seedsDark != null && value.rowsLight != null && value.rowsDark != null;
}
function readV2Shape(data) {
    if (!isRecord(data)) return null;
    const v = data;
    if (!hasRequiredV2Slices(v)) return null;
    if (!isRecord(v.seedsLight) || !isRecord(v.seedsDark)) return null;
    return {
        seedsLight: v.seedsLight,
        seedsDark: v.seedsDark,
        rowsLight: v.rowsLight,
        rowsDark: v.rowsDark,
        syncSeedsAcrossThemes: v.syncSeedsAcrossThemes === true
    };
}
function readV1Shape(data) {
    if (!data || typeof data !== "object") return null;
    const v1 = data;
    if (!v1.seeds || typeof v1.seeds !== "object" || !v1.rows) return null;
    if (!("primaryLight" in v1.seeds)) return null;
    return v1;
}
function parseColorToolPersistedJson(raw) {
    try {
        const parsed = JSON.parse(raw);
        const v2 = readV2Shape(parsed);
        if (v2) return v2;
        const v1 = readV1Shape(parsed);
        return v1 ? migrateV1ToV2(v1) : null;
    } catch  {
        return null;
    }
}
function parseColorToolPersistedValue(data) {
    if (data == null) return null;
    try {
        return parseColorToolPersistedJson(JSON.stringify(data));
    } catch  {
        return null;
    }
}
function readColorToolFromLegacyLocalStorage() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const raw = localStorage.getItem(COLOR_TOOL_LEGACY_STORAGE_KEY);
        if (!raw) return null;
        return parseColorToolPersistedJson(raw);
    } catch  {
        return null;
    }
}
function coerceColorToolPersisted(data) {
    if (typeof data === "string") return parseColorToolPersistedJson(data);
    return parseColorToolPersistedValue(data);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/core/src/internal/defaults/pb-builder-defaults.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_PB_BUILDER_FOUNDATIONS",
    ()=>DEFAULT_PB_BUILDER_FOUNDATIONS,
    "buildImageMotionTimingFromAnimationDefaults",
    ()=>buildImageMotionTimingFromAnimationDefaults,
    "buildLayeredHybridEntranceMotion",
    ()=>buildLayeredHybridEntranceMotion,
    "buildSequentialHybridEntranceMotion",
    ()=>buildSequentialHybridEntranceMotion,
    "createPbBuilderDefaultsFromFoundations",
    ()=>createPbBuilderDefaultsFromFoundations,
    "mergeHybridExitStackKeyframes",
    ()=>mergeHybridExitStackKeyframes,
    "pbBuilderDefaultsV1",
    ()=>pbBuilderDefaultsV1,
    "toPbContentGuidelines",
    ()=>toPbContentGuidelines,
    "withUnifiedRadius",
    ()=>withUnifiedRadius
]);
const MIN_SPACING_REM = 0.125;
const MIN_RADIUS_REM = 0.25;
function clampNumber(n, min, max) {
    if (!Number.isFinite(n)) return min;
    return Math.min(max, Math.max(min, n));
}
function normalizeBezierTuple(value) {
    return [
        Number.isFinite(value[0]) ? value[0] : 0.25,
        Number.isFinite(value[1]) ? value[1] : 0.46,
        Number.isFinite(value[2]) ? value[2] : 0.45,
        Number.isFinite(value[3]) ? value[3] : 0.94
    ];
}
function toMotionEase(curve) {
    if (curve.preset === "customBezier") return normalizeBezierTuple(curve.customBezier);
    return curve.preset;
}
function toMotionTransition(duration, delay, curve) {
    return {
        type: "tween",
        duration: Math.max(0, duration),
        delay: Math.max(0, delay),
        ease: toMotionEase(curve)
    };
}
function toEntranceOffset(direction, distancePx) {
    const distance = Math.max(0, distancePx);
    if (direction === "up") return {
        y: distance
    };
    if (direction === "down") return {
        y: -distance
    };
    if (direction === "left") return {
        x: distance
    };
    if (direction === "right") return {
        x: -distance
    };
    return {};
}
function toExitOffset(direction, distancePx) {
    const distance = Math.max(0, distancePx);
    if (direction === "up") return {
        y: -distance
    };
    if (direction === "down") return {
        y: distance
    };
    if (direction === "left") return {
        x: -distance
    };
    if (direction === "right") return {
        x: distance
    };
    return {};
}
function getEntrancePresetKeyframes(preset) {
    switch(preset){
        case "fade":
            return {
                initial: {
                    opacity: 0
                },
                animate: {
                    opacity: 1
                }
            };
        case "slideUp":
            return {
                initial: {
                    y: 24
                },
                animate: {
                    y: 0
                }
            };
        case "slideDown":
            return {
                initial: {
                    y: -24
                },
                animate: {
                    y: 0
                }
            };
        case "slideLeft":
            return {
                initial: {
                    x: 24
                },
                animate: {
                    x: 0
                }
            };
        case "slideRight":
            return {
                initial: {
                    x: -24
                },
                animate: {
                    x: 0
                }
            };
        case "zoomIn":
            return {
                initial: {
                    scale: 0.92
                },
                animate: {
                    scale: 1
                }
            };
        case "zoomOut":
            return {
                initial: {
                    scale: 1.08
                },
                animate: {
                    scale: 1
                }
            };
        case "tiltIn":
            return {
                initial: {
                    rotate: -4
                },
                animate: {
                    rotate: 0
                }
            };
        default:
            return {
                initial: {},
                animate: {}
            };
    }
}
function getExitPresetKeyframes(preset) {
    switch(preset){
        case "fade":
            return {
                exit: {
                    opacity: 0
                }
            };
        case "slideUp":
            return {
                exit: {
                    y: -24
                }
            };
        case "slideDown":
            return {
                exit: {
                    y: 24
                }
            };
        case "slideLeft":
            return {
                exit: {
                    x: -24
                }
            };
        case "slideRight":
            return {
                exit: {
                    x: 24
                }
            };
        case "zoomIn":
            return {
                exit: {
                    scale: 1.08
                }
            };
        case "zoomOut":
            return {
                exit: {
                    scale: 0.92
                }
            };
        case "tiltIn":
            return {
                exit: {
                    rotate: 4
                }
            };
        default:
            return {
                exit: {}
            };
    }
}
function getHybridEntranceStackKeyframes(stack) {
    if (stack === "none") return {
        initial: {},
        animate: {}
    };
    return getEntrancePresetKeyframes(stack);
}
function getHybridExitStackKeyframes(stack) {
    if (stack === "none") return {
        exit: {}
    };
    return getExitPresetKeyframes(stack);
}
function mergeHybridExitStackKeyframes(stacks) {
    let exit = {};
    const layers = stacks.length > 0 ? stacks : [
        "none"
    ];
    for (const stack of layers){
        const kf = getHybridExitStackKeyframes(stack);
        exit = {
            ...exit,
            ...kf.exit
        };
    }
    return {
        exit
    };
}
/** Shallow merge of motion snapshot objects; later arguments override earlier for the same key. */ function mergeAnimationRecords(...parts) {
    const out = {};
    for (const p of parts){
        for (const [k, v] of Object.entries(p)){
            if (v !== undefined) out[k] = v;
        }
    }
    return out;
}
/** Ensure every keyframe has the same keys (forward-fill, then backward-fill gaps). */ function densifyHybridKeyframes(frames) {
    if (frames.length === 0) return [];
    const keys = new Set();
    for (const f of frames){
        Object.keys(f).forEach((k)=>keys.add(k));
    }
    const filled = frames.map((f)=>({
            ...f
        }));
    for (const key of keys){
        let last = undefined;
        for(let i = 0; i < filled.length; i++){
            const row = filled[i];
            if (!row) continue;
            if (row[key] !== undefined) last = row[key];
            else if (last !== undefined) row[key] = last;
        }
        let next = undefined;
        for(let i = filled.length - 1; i >= 0; i--){
            const row = filled[i];
            if (!row) continue;
            if (row[key] !== undefined) next = row[key];
            else if (next !== undefined) row[key] = next;
        }
    }
    return filled;
}
/**
 * Per-property keyframe arrays + `times` for Framer Motion (`whileInView` / `animate` compatible).
 */ function hybridKeyframesToAnimateAndTimes(frames) {
    const K = frames.length;
    if (K === 0) {
        return {
            animate: {},
            times: [
                0,
                1
            ]
        };
    }
    const keys = new Set();
    for (const f of frames)Object.keys(f).forEach((k)=>keys.add(k));
    const animate = {};
    for (const key of keys){
        animate[key] = frames.map((f)=>f[key]);
    }
    const times = K === 1 ? [
        0
    ] : Array.from({
        length: K
    }, (_, i)=>i === K - 1 ? 1 : i / (K - 1));
    return {
        animate,
        times
    };
}
/** Converts per-segment durations (seconds, relative weights) to Framer `transition.times` knots. */ function segmentDurationsToTimes(segmentDurations) {
    if (segmentDurations.length === 0) return [
        0,
        1
    ];
    const w = segmentDurations.map((x)=>Number.isFinite(x) && x > 0 ? x : 0.0001);
    const sum = w.reduce((a, b)=>a + b, 0);
    const times = [
        0
    ];
    let acc = 0;
    for(let i = 0; i < w.length; i++){
        const wi = w[i] ?? 0.0001;
        acc += wi / sum;
        times.push(i === w.length - 1 ? 1 : acc);
    }
    return times;
}
function buildSequentialHybridEntranceMotion(entrancePreset, hybridStackIn, hybridDuration, segmentDurations) {
    const base = getEntrancePresetKeyframes(entrancePreset);
    const layers = hybridStackIn.filter((s)=>s !== "none").map((s)=>getHybridEntranceStackKeyframes(s));
    const frames = [];
    const startParts = [
        base.initial
    ];
    for (const l of layers)startParts.push(l.initial);
    frames.push(mergeAnimationRecords(...startParts));
    const midParts = [
        base.animate
    ];
    for (const l of layers)midParts.push(l.initial);
    frames.push(mergeAnimationRecords(...midParts));
    for(let i = 0; i < layers.length; i++){
        const chunk = [
            base.animate
        ];
        for(let j = 0; j < layers.length; j++){
            const layer = layers[j];
            if (!layer) continue;
            chunk.push(j <= i ? layer.animate : layer.initial);
        }
        frames.push(mergeAnimationRecords(...chunk));
    }
    const dense = densifyHybridKeyframes(frames);
    const initial = dense[0] ?? {};
    const { animate, times: uniformTimes } = hybridKeyframesToAnimateAndTimes(dense);
    const F = dense.length;
    const segmentCount = Math.max(0, F - 1);
    const times = segmentDurations && segmentDurations.length === segmentCount && segmentCount > 0 ? segmentDurationsToTimes(segmentDurations) : uniformTimes;
    const duration = Math.max(0, Number(hybridDuration) || 0.45);
    return {
        initial,
        animate,
        transition: {
            type: "tween",
            duration,
            delay: 0,
            ease: "easeOut",
            times
        }
    };
}
function propertyStaggerIndex(key, base, layers) {
    if (base.initial[key] !== base.animate[key]) return 0;
    for(let i = 0; i < layers.length; i++){
        const L = layers[i];
        if (L && L.initial[key] !== L.animate[key]) return i + 1;
    }
    return 0;
}
function buildLayeredHybridEntranceMotion(entrancePreset, hybridStackIn, hybridDuration, options) {
    const base = getEntrancePresetKeyframes(entrancePreset);
    const layers = hybridStackIn.filter((s)=>s !== "none").map((s)=>getHybridEntranceStackKeyframes(s));
    const initialMerged = mergeAnimationRecords(base.initial, ...layers.map((l)=>l.initial));
    const animateMerged = mergeAnimationRecords(base.animate, ...layers.map((l)=>l.animate));
    const duration = Math.max(0.05, Number(hybridDuration) || 0.45);
    const staggerEnabled = options?.staggerEnabled === true;
    const staggerSec = Math.max(0, Number(options?.staggerSec ?? 0));
    if (staggerEnabled && staggerSec > 0 && layers.length > 0) {
        const keys = new Set([
            ...Object.keys(initialMerged),
            ...Object.keys(animateMerged)
        ]);
        const transition = {};
        for (const key of keys){
            const idx = propertyStaggerIndex(key, base, layers);
            transition[key] = {
                type: "tween",
                duration,
                delay: idx * staggerSec,
                ease: "easeOut"
            };
        }
        return {
            initial: initialMerged,
            animate: animateMerged,
            transition
        };
    }
    return {
        initial: initialMerged,
        animate: animateMerged,
        transition: {
            type: "tween",
            duration,
            delay: 0,
            ease: "easeOut"
        }
    };
}
function createImageAnimationFineTune(entranceDirection, exitDirection) {
    return {
        entranceBehavior: "preset",
        exitBehavior: "preset",
        hybridCompositionIn: "ordered",
        hybridLayerStaggerEnabled: false,
        hybridLayerStaggerSec: 0.08,
        hybridOrderedUseStepDurations: false,
        hybridOrderedStepDurations: [],
        hybridStackIn: [
            "none"
        ],
        hybridStackOut: [
            "none"
        ],
        hybridEntranceDuration: 0.45,
        hybridExitDuration: 0.45,
        entrance: {
            direction: entranceDirection,
            distancePx: 24,
            fromOpacity: 0,
            toOpacity: 1,
            fromX: 0,
            toX: 0,
            fromY: 0,
            toY: 0,
            fromScale: 1,
            toScale: 1,
            fromRotate: 0,
            toRotate: 0,
            duration: 0.45,
            delay: 0,
            curve: {
                preset: "easeOut",
                customBezier: [
                    0.25,
                    0.46,
                    0.45,
                    0.94
                ]
            }
        },
        exit: {
            direction: exitDirection,
            distancePx: 24,
            toOpacity: 0,
            toX: 0,
            toY: 0,
            toScale: 1,
            toRotate: 0,
            duration: 0.28,
            delay: 0,
            curve: {
                preset: "easeInOut",
                customBezier: [
                    0.4,
                    0,
                    0.2,
                    1
                ]
            }
        }
    };
}
function rem(n) {
    return `${n}rem`;
}
function normalizeSpacingBaseRem(n) {
    return Number.isFinite(n) ? Math.max(MIN_SPACING_REM, n) : MIN_SPACING_REM;
}
function normalizeRadiusBaseRem(n) {
    return Number.isFinite(n) ? Math.max(0, n) : 0;
}
function toTextAlign(alignment) {
    if (alignment === "center") return "center";
    if (alignment === "end") return "right";
    return "start";
}
function toFlexAlignItems(alignment) {
    if (alignment === "center") return "center";
    if (alignment === "end") return "flex-end";
    return "flex-start";
}
function toFlexJustifyContent(alignment) {
    if (alignment === "center") return "center";
    if (alignment === "end") return "flex-end";
    return "flex-start";
}
const DEFAULT_PB_BUILDER_FOUNDATIONS = {
    alignment: "center",
    spacingBaseRem: 0.5,
    radiusBaseRem: 0.375
};
function createPbBuilderDefaultsFromFoundations(foundations) {
    const spacingBaseRem = normalizeSpacingBaseRem(foundations.spacingBaseRem);
    const radiusBaseRem = normalizeRadiusBaseRem(foundations.radiusBaseRem);
    const textAlign = toTextAlign(foundations.alignment);
    const alignItems = toFlexAlignItems(foundations.alignment);
    const justifyContent = toFlexJustifyContent(foundations.alignment);
    const radiusCss = rem(Math.max(MIN_RADIUS_REM, radiusBaseRem));
    return {
        version: 1,
        foundations: {
            alignment: foundations.alignment,
            spacingBaseRem,
            radiusBaseRem
        },
        sections: {
            defaultTextAlign: textAlign
        },
        modules: {
            frame: {
                gapWhenUnset: rem(spacingBaseRem * 2),
                rowGapWhenUnset: null,
                columnGapWhenUnset: null,
                alignItemsDefault: alignItems,
                flexDirectionDefault: "row",
                justifyContentDefault: justifyContent,
                paddingDefault: "0",
                flexWrapDefault: "nowrap",
                borderRadiusDefault: radiusCss
            }
        },
        elements: {
            richText: {
                paragraphGap: rem(spacingBaseRem),
                codeBorderRadius: rem(Math.max(MIN_RADIUS_REM, spacingBaseRem)),
                headingH1Margin: `${rem(spacingBaseRem * 2)} ${rem(spacingBaseRem * 0.5)}`,
                headingH1MarginTop: null,
                headingH1MarginBottom: null,
                headingH2Margin: `${rem(spacingBaseRem * 1.5)} ${rem(spacingBaseRem * 0.5)}`,
                headingH2MarginTop: null,
                headingH2MarginBottom: null,
                headingH3Margin: `${rem(spacingBaseRem * 1)} ${rem(spacingBaseRem * 0.5)}`,
                headingH3MarginTop: null,
                headingH3MarginBottom: null,
                listMarginY: rem(spacingBaseRem),
                blockquoteMarginY: rem(spacingBaseRem),
                hrMarginY: rem(spacingBaseRem * 1.5),
                preWrapMarginY: rem(spacingBaseRem * 1.5)
            },
            button: {
                labelGap: rem(spacingBaseRem),
                nakedPadding: `${rem(spacingBaseRem)} ${rem(spacingBaseRem * 2.5)}`,
                nakedPaddingY: null,
                nakedPaddingX: null,
                nakedBorderRadius: radiusCss,
                defaultVariant: "default",
                variants: {
                    default: {
                        typography: {
                            copyType: "body",
                            level: 4
                        }
                    },
                    accent: {
                        typography: {
                            copyType: "body",
                            level: 3
                        },
                        wrapperFill: "var(--pb-accent)",
                        wrapperBorderRadius: radiusCss
                    },
                    ghost: {
                        typography: {
                            copyType: "body",
                            level: 5
                        },
                        wrapperStroke: "var(--pb-border)",
                        wrapperBorderRadius: radiusCss
                    },
                    /** Naked text link — no wrapper styling, just typography binding. */ text: {
                        typography: {
                            copyType: "body",
                            level: 5
                        }
                    }
                }
            },
            image: {
                borderRadius: radiusCss,
                defaultVariant: "hero",
                variants: {
                    hero: {
                        layoutMode: "aspectRatio",
                        objectFit: "cover",
                        aspectRatio: "16 / 9",
                        borderRadius: radiusCss,
                        objectPosition: "center",
                        align: "center",
                        alignY: "center",
                        flipHorizontal: false,
                        flipVertical: false,
                        opacity: 1,
                        overflow: "hidden",
                        hidden: false,
                        priority: true,
                        animation: {
                            trigger: "onFirstVisible",
                            exitTrigger: "manual",
                            entrancePreset: "slideUp",
                            exitPreset: "fade",
                            fineTune: createImageAnimationFineTune("up", "up")
                        }
                    },
                    inline: {
                        layoutMode: "aspectRatio",
                        objectFit: "contain",
                        aspectRatio: "4 / 3",
                        borderRadius: radiusCss,
                        objectPosition: "center",
                        align: "left",
                        alignY: "top",
                        flipHorizontal: false,
                        flipVertical: false,
                        opacity: 1,
                        overflow: "visible",
                        hidden: false,
                        priority: false,
                        animation: {
                            trigger: "onFirstVisible",
                            exitTrigger: "manual",
                            entrancePreset: "fade",
                            exitPreset: "fade",
                            fineTune: createImageAnimationFineTune("none", "none")
                        }
                    },
                    fullCover: {
                        layoutMode: "fill",
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                        borderRadius: "0",
                        objectPosition: "center",
                        align: "center",
                        alignY: "center",
                        flipHorizontal: false,
                        flipVertical: false,
                        opacity: 1,
                        overflow: "hidden",
                        hidden: false,
                        priority: true,
                        animation: {
                            trigger: "onMount",
                            exitTrigger: "manual",
                            entrancePreset: "fade",
                            exitPreset: "fade",
                            fineTune: createImageAnimationFineTune("none", "none")
                        }
                    },
                    feature: {
                        layoutMode: "aspectRatio",
                        objectFit: "cover",
                        aspectRatio: "3 / 4",
                        borderRadius: radiusCss,
                        objectPosition: "center top",
                        align: "center",
                        alignY: "center",
                        flipHorizontal: false,
                        flipVertical: false,
                        opacity: 1,
                        overflow: "hidden",
                        hidden: false,
                        priority: false,
                        animation: {
                            trigger: "onFirstVisible",
                            exitTrigger: "manual",
                            entrancePreset: "slideLeft",
                            exitPreset: "slideRight",
                            fineTune: createImageAnimationFineTune("left", "right")
                        }
                    },
                    crop: {
                        layoutMode: "aspectRatio",
                        objectFit: "crop",
                        aspectRatio: "16 / 9",
                        borderRadius: radiusCss,
                        objectPosition: "center",
                        imageCrop: {
                            x: 0,
                            y: 0,
                            scale: 1
                        },
                        align: "center",
                        alignY: "center",
                        flipHorizontal: false,
                        flipVertical: false,
                        opacity: 1,
                        overflow: "hidden",
                        hidden: false,
                        priority: false,
                        animation: {
                            trigger: "onFirstVisible",
                            exitTrigger: "manual",
                            entrancePreset: "fade",
                            exitPreset: "fade",
                            fineTune: createImageAnimationFineTune("none", "none")
                        }
                    }
                }
            },
            video: {
                defaultVariant: "inline",
                variants: {
                    inline: {
                        objectFit: "cover",
                        aspectRatio: "16 / 9",
                        showPlayButton: true
                    },
                    compact: {
                        objectFit: "cover",
                        aspectRatio: "4 / 3",
                        module: "video-player-compact",
                        showPlayButton: true
                    },
                    fullcover: {
                        objectFit: "cover",
                        module: "video-player-full",
                        showPlayButton: false
                    },
                    hero: {
                        objectFit: "cover",
                        aspectRatio: "21 / 9",
                        module: "video-player",
                        showPlayButton: true,
                        autoplay: true,
                        loop: true,
                        muted: true
                    }
                }
            },
            input: {
                defaultVariant: "default",
                variants: {
                    default: {
                        showIcon: true,
                        color: "rgba(255,255,255,0.85)"
                    },
                    compact: {
                        showIcon: false,
                        color: "rgba(255,255,255,0.7)",
                        height: "2.25rem"
                    },
                    minimal: {
                        showIcon: false,
                        color: "rgba(255,255,255,0.5)"
                    }
                }
            },
            range: {
                defaultVariant: "default",
                variants: {
                    default: {
                        style: {
                            trackColor: "rgba(255,255,255,0.2)",
                            fillColor: "rgba(255,255,255,0.9)",
                            trackHeight: "4px",
                            thumbSize: "14px",
                            borderRadius: "9999px"
                        }
                    },
                    slim: {
                        style: {
                            trackColor: "rgba(255,255,255,0.1)",
                            fillColor: "rgba(255,255,255,0.7)",
                            trackHeight: "2px",
                            thumbSize: "10px",
                            borderRadius: "9999px"
                        }
                    },
                    accent: {
                        style: {
                            trackColor: "rgba(255,255,255,0.15)",
                            fillColor: "#a78bfa",
                            trackHeight: "4px",
                            thumbSize: "16px",
                            borderRadius: "9999px"
                        }
                    }
                }
            },
            spacer: {
                defaultVariant: "md",
                variants: {
                    sm: {
                        height: "1rem"
                    },
                    md: {
                        height: "2rem"
                    },
                    lg: {
                        height: "4rem"
                    }
                }
            },
            heading: {
                defaultVariant: "display",
                variants: {
                    display: {
                        variant: "display",
                        level: 1,
                        text: "Display heading",
                        wordWrap: true,
                        align: "left",
                        alignY: "center"
                    },
                    section: {
                        variant: "section",
                        level: 2,
                        text: "Section heading",
                        wordWrap: true,
                        align: "left",
                        alignY: "top"
                    },
                    label: {
                        variant: "label",
                        level: 5,
                        text: "Eyebrow label",
                        wordWrap: true,
                        align: "left",
                        alignY: "center"
                    }
                }
            },
            body: {
                defaultVariant: "standard",
                variants: {
                    lead: {
                        variant: "lead",
                        text: "Lead paragraph for introductions and hero copy that should read larger than body text.",
                        level: 2,
                        wordWrap: true,
                        align: "left",
                        alignY: "top"
                    },
                    standard: {
                        variant: "standard",
                        text: "Standard body copy for descriptions, lists, and long-form content in layouts.",
                        level: 4,
                        wordWrap: true,
                        align: "left",
                        alignY: "top"
                    },
                    fine: {
                        variant: "fine",
                        text: "Fine print, captions, and tertiary supporting text.",
                        level: 6,
                        wordWrap: true,
                        align: "left",
                        alignY: "top"
                    }
                }
            },
            link: {
                defaultVariant: "inline",
                variants: {
                    inline: {
                        variant: "inline",
                        label: "Inline link",
                        href: "/",
                        external: false,
                        copyType: "body",
                        level: 4,
                        wordWrap: true,
                        align: "left",
                        alignY: "center"
                    },
                    emphasis: {
                        variant: "emphasis",
                        label: "Emphasized link",
                        href: "/work",
                        external: false,
                        copyType: "heading",
                        level: 3,
                        wordWrap: true,
                        align: "left",
                        alignY: "center"
                    },
                    nav: {
                        variant: "nav",
                        label: "Navigation link",
                        href: "/about",
                        external: false,
                        copyType: "body",
                        level: 4,
                        wordWrap: true,
                        align: "center",
                        alignY: "center"
                    }
                }
            }
        }
    };
}
const pbBuilderDefaultsV1 = createPbBuilderDefaultsFromFoundations(DEFAULT_PB_BUILDER_FOUNDATIONS);
function toPbContentGuidelines(defaults) {
    const frame = defaults.modules.frame;
    const rich = defaults.elements.richText;
    const btn = defaults.elements.button;
    return {
        copyTextAlign: defaults.sections.defaultTextAlign,
        frameGapWhenUnset: frame.gapWhenUnset,
        frameRowGapWhenUnset: frame.rowGapWhenUnset,
        frameColumnGapWhenUnset: frame.columnGapWhenUnset,
        frameAlignItemsDefault: frame.alignItemsDefault,
        frameFlexDirectionDefault: frame.flexDirectionDefault,
        frameJustifyContentDefault: frame.justifyContentDefault,
        framePaddingDefault: frame.paddingDefault,
        frameFlexWrapDefault: frame.flexWrapDefault,
        frameBorderRadiusDefault: frame.borderRadiusDefault,
        richTextParagraphGap: rich.paragraphGap,
        richTextCodeBorderRadius: rich.codeBorderRadius,
        richTextHeadingH1Margin: rich.headingH1Margin,
        richTextHeadingH1MarginTop: rich.headingH1MarginTop,
        richTextHeadingH1MarginBottom: rich.headingH1MarginBottom,
        richTextHeadingH2Margin: rich.headingH2Margin,
        richTextHeadingH2MarginTop: rich.headingH2MarginTop,
        richTextHeadingH2MarginBottom: rich.headingH2MarginBottom,
        richTextHeadingH3Margin: rich.headingH3Margin,
        richTextHeadingH3MarginTop: rich.headingH3MarginTop,
        richTextHeadingH3MarginBottom: rich.headingH3MarginBottom,
        richTextListMarginY: rich.listMarginY,
        richTextBlockquoteMarginY: rich.blockquoteMarginY,
        richTextHrMarginY: rich.hrMarginY,
        richTextPreWrapMarginY: rich.preWrapMarginY,
        buttonLabelGap: btn.labelGap,
        buttonNakedPadding: btn.nakedPadding,
        buttonNakedPaddingY: btn.nakedPaddingY,
        buttonNakedPaddingX: btn.nakedPaddingX,
        buttonNakedBorderRadius: btn.nakedBorderRadius
    };
}
function withUnifiedRadius(defaults, radiusCss) {
    return {
        ...defaults,
        modules: {
            ...defaults.modules,
            frame: {
                ...defaults.modules.frame,
                borderRadiusDefault: radiusCss
            }
        },
        elements: {
            ...defaults.elements,
            button: {
                ...defaults.elements.button,
                nakedBorderRadius: radiusCss
            },
            image: {
                ...defaults.elements.image,
                borderRadius: radiusCss,
                variants: {
                    ...defaults.elements.image.variants,
                    hero: {
                        ...defaults.elements.image.variants.hero,
                        borderRadius: radiusCss
                    },
                    inline: {
                        ...defaults.elements.image.variants.inline,
                        borderRadius: radiusCss
                    },
                    feature: {
                        ...defaults.elements.image.variants.feature,
                        borderRadius: radiusCss
                    },
                    crop: {
                        ...defaults.elements.image.variants.crop,
                        borderRadius: radiusCss
                    }
                }
            }
        }
    };
}
function buildImageMotionTimingFromAnimationDefaults(animation) {
    const base = {
        trigger: animation.trigger,
        exitTrigger: animation.exitTrigger ?? "manual",
        ...animation.exitViewport ? {
            exitViewport: animation.exitViewport
        } : {}
    };
    if (animation.entrancePreset.trim().length > 0) {
        base.entrancePreset = animation.entrancePreset;
    }
    if (animation.exitPreset.trim().length > 0) {
        base.exitPreset = animation.exitPreset;
    }
    const ft = animation.fineTune;
    const entranceFt = ft.entrance;
    const exitFt = ft.exit;
    const entranceTransition = toMotionTransition(entranceFt.duration, entranceFt.delay, entranceFt.curve);
    const exitTransition = toMotionTransition(exitFt.duration, exitFt.delay, exitFt.curve);
    /** Both sides use named presets only (optional duration overrides on `animation`). */ if (ft.entranceBehavior === "preset" && ft.exitBehavior === "preset") {
        const pe = animation.presetEntranceDuration;
        const px = animation.presetExitDuration;
        if (pe != null && Number.isFinite(pe) && pe > 0) {
            base.entranceMotion = {
                transition: {
                    type: "tween",
                    duration: pe,
                    delay: 0,
                    ease: "easeOut"
                }
            };
        }
        if (px != null && Number.isFinite(px) && px > 0) {
            base.exitMotion = {
                transition: {
                    type: "tween",
                    duration: px,
                    delay: 0,
                    ease: "easeOut"
                }
            };
        }
        return base;
    }
    let entranceMotion;
    let exitMotion;
    if (ft.entranceBehavior === "preset") {
        const pe = animation.presetEntranceDuration;
        if (pe != null && Number.isFinite(pe) && pe > 0) {
            entranceMotion = {
                transition: {
                    type: "tween",
                    duration: pe,
                    delay: 0,
                    ease: "easeOut"
                }
            };
        }
    } else if (ft.entranceBehavior === "hybrid") {
        const hybridEntranceDuration = Math.max(0, Number(ft.hybridEntranceDuration || 0.45));
        const composition = ft.hybridCompositionIn ?? "ordered";
        const activeLayers = ft.hybridStackIn.filter((s)=>s !== "none");
        const segmentCount = Math.max(0, 1 + activeLayers.length);
        const segmentDurations = ft.hybridOrderedUseStepDurations && Array.isArray(ft.hybridOrderedStepDurations) && ft.hybridOrderedStepDurations.length === segmentCount && segmentCount > 0 ? ft.hybridOrderedStepDurations : undefined;
        entranceMotion = composition === "layered" ? buildLayeredHybridEntranceMotion(animation.entrancePreset, ft.hybridStackIn, hybridEntranceDuration, {
            staggerEnabled: ft.hybridLayerStaggerEnabled,
            staggerSec: ft.hybridLayerStaggerSec
        }) : buildSequentialHybridEntranceMotion(animation.entrancePreset, ft.hybridStackIn, hybridEntranceDuration, segmentDurations);
    } else {
        const entranceOffset = toEntranceOffset(entranceFt.direction, entranceFt.distancePx);
        const entranceInitialX = (entranceFt.fromX ?? 0) + (entranceOffset.x ?? 0);
        const entranceInitialY = (entranceFt.fromY ?? 0) + (entranceOffset.y ?? 0);
        entranceMotion = {
            initial: {
                opacity: clampNumber(entranceFt.fromOpacity, 0, 1),
                x: entranceInitialX,
                y: entranceInitialY,
                scale: Number.isFinite(entranceFt.fromScale) ? entranceFt.fromScale : 1,
                rotate: Number.isFinite(entranceFt.fromRotate) ? entranceFt.fromRotate : 0
            },
            animate: {
                opacity: clampNumber(entranceFt.toOpacity, 0, 1),
                x: entranceFt.toX ?? 0,
                y: entranceFt.toY ?? 0,
                scale: Number.isFinite(entranceFt.toScale) ? entranceFt.toScale : 1,
                rotate: Number.isFinite(entranceFt.toRotate) ? entranceFt.toRotate : 0
            },
            transition: entranceTransition
        };
    }
    if (ft.exitBehavior === "preset") {
        const px = animation.presetExitDuration;
        if (px != null && Number.isFinite(px) && px > 0) {
            exitMotion = {
                transition: {
                    type: "tween",
                    duration: px,
                    delay: 0,
                    ease: "easeOut"
                }
            };
        }
    } else if (ft.exitBehavior === "hybrid") {
        const hybridExitDuration = Math.max(0, Number(ft.hybridExitDuration || 0.45));
        const baseExit = getExitPresetKeyframes(animation.exitPreset);
        const stackExit = mergeHybridExitStackKeyframes(ft.hybridStackOut);
        exitMotion = {
            exit: {
                ...baseExit.exit,
                ...stackExit.exit
            },
            transition: {
                type: "tween",
                duration: hybridExitDuration,
                delay: 0,
                ease: "easeOut"
            }
        };
    } else {
        const exitOffset = toExitOffset(exitFt.direction, exitFt.distancePx);
        const exitTargetX = (exitFt.toX ?? 0) + (exitOffset.x ?? 0);
        const exitTargetY = (exitFt.toY ?? 0) + (exitOffset.y ?? 0);
        exitMotion = {
            exit: {
                opacity: clampNumber(exitFt.toOpacity, 0, 1),
                x: exitTargetX,
                y: exitTargetY,
                scale: Number.isFinite(exitFt.toScale) ? exitFt.toScale : 1,
                rotate: Number.isFinite(exitFt.toRotate) ? exitFt.toRotate : 0
            },
            transition: exitTransition
        };
    }
    const out = {
        ...base,
        ...entranceMotion ? {
            entranceMotion
        } : {},
        ...exitMotion ? {
            exitMotion
        } : {}
    };
    if (ft.entranceBehavior === "custom") delete out.entrancePreset;
    if (ft.exitBehavior === "custom") delete out.exitPreset;
    return out;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/contracts/src/capability-schemas.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "capabilityContractVersionSchema",
    ()=>capabilityContractVersionSchema,
    "cmsAdapterCapabilitySchema",
    ()=>cmsAdapterCapabilitySchema,
    "exporterCapabilitySchema",
    ()=>exporterCapabilitySchema,
    "importerCapabilitySchema",
    ()=>importerCapabilitySchema,
    "integrationCapabilitySchema",
    ()=>integrationCapabilitySchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-client] (ecmascript) <export * as z>");
;
const capabilityContractVersionSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1);
const importerCapabilitySchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal("importer"),
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    version: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    supportedContractVersions: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(capabilityContractVersionSchema).min(1),
    supportedElementTypes: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1)).default([]),
    supportedSectionTypes: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1)).default([]),
    diagnosticCodes: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1)).default([])
});
const exporterCapabilitySchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal("exporter"),
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    version: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    inputContractVersions: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(capabilityContractVersionSchema).min(1),
    outputTargets: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1)).min(1),
    fidelityLevel: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "lossless",
        "high",
        "medium",
        "low"
    ]),
    diagnosticCodes: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1)).default([])
});
const cmsAdapterCapabilitySchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal("cmsAdapter"),
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    version: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    cmsProvider: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    syncModes: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "pull",
        "push",
        "bidirectional"
    ])).min(1),
    mappingFeatures: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1)).default([]),
    conflictPolicies: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "lastWriteWins",
        "manualReview",
        "reject"
    ])).default([]),
    diagnosticCodes: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1)).default([])
});
const integrationCapabilitySchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].discriminatedUnion("type", [
    importerCapabilitySchema,
    exporterCapabilitySchema,
    cmsAdapterCapabilitySchema
]);
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/contracts/src/version.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CONTRACT_VERSION",
    ()=>CONTRACT_VERSION,
    "SUPPORTED_CONTRACT_VERSIONS",
    ()=>SUPPORTED_CONTRACT_VERSIONS
]);
const CONTRACT_VERSION = "1.0.0";
const SUPPORTED_CONTRACT_VERSIONS = [
    "0.5.0-v0",
    CONTRACT_VERSION
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/contracts/src/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$page$2d$builder$2f$core$2f$page$2d$builder$2d$schemas$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/contracts/src/page-builder/core/page-builder-schemas.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$page$2d$builder$2f$core$2f$page$2d$builder$2d$motion$2d$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/contracts/src/page-builder/core/page-builder-motion-defaults.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$page$2d$builder$2f$core$2f$page$2d$density$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/contracts/src/page-builder/core/page-density.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$capability$2d$schemas$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/contracts/src/capability-schemas.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$version$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/contracts/src/version.ts [app-client] (ecmascript)");
;
;
;
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/core/src/internal/defaults/pb-guidelines-expand.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Derives injected `--pb-*` CSS variables from logical `PbContentGuidelines` fields
 * (block margins, block padding, etc.).
 */ __turbopack_context__.s([
    "expandGuidelinesToCssVars",
    ()=>expandGuidelinesToCssVars,
    "resolveAxisPadding",
    ()=>resolveAxisPadding,
    "resolveBlockMarginPair",
    ()=>resolveBlockMarginPair,
    "serializePbContentGuidelinesToCss",
    ()=>serializePbContentGuidelinesToCss
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/contracts/src/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$page$2d$builder$2f$core$2f$page$2d$density$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/contracts/src/page-builder/core/page-density.ts [app-client] (ecmascript)");
;
function resolveBlockMarginPair(block, top, bottom) {
    const parts = block.trim().split(/\s+/).filter(Boolean);
    let baseTop;
    let baseBottom;
    if (parts.length >= 2) {
        baseTop = parts[0] ?? "0";
        baseBottom = parts[1] ?? "0";
    } else {
        const one = parts[0] ?? "0";
        baseTop = one;
        baseBottom = one;
    }
    const t = top?.trim();
    const b = bottom?.trim();
    return {
        top: t && t.length > 0 ? t : baseTop,
        bottom: b && b.length > 0 ? b : baseBottom
    };
}
function resolveAxisPadding(block, y, x) {
    const parts = block.trim().split(/\s+/).filter(Boolean);
    let baseY;
    let baseX;
    if (parts.length >= 2) {
        baseY = parts[0] ?? "0";
        baseX = parts[1] ?? "0";
    } else {
        const one = parts[0] ?? "0";
        baseY = one;
        baseX = one;
    }
    const yy = y?.trim();
    const xx = x?.trim();
    return {
        py: yy && yy.length > 0 ? yy : baseY,
        px: xx && xx.length > 0 ? xx : baseX
    };
}
function expandGuidelinesToCssVars(g) {
    const h1 = resolveBlockMarginPair(g.richTextHeadingH1Margin, g.richTextHeadingH1MarginTop, g.richTextHeadingH1MarginBottom);
    const h2 = resolveBlockMarginPair(g.richTextHeadingH2Margin, g.richTextHeadingH2MarginTop, g.richTextHeadingH2MarginBottom);
    const h3 = resolveBlockMarginPair(g.richTextHeadingH3Margin, g.richTextHeadingH3MarginTop, g.richTextHeadingH3MarginBottom);
    const btn = resolveAxisPadding(g.buttonNakedPadding, g.buttonNakedPaddingY, g.buttonNakedPaddingX);
    return {
        "--pb-copy-text-align": String(g.copyTextAlign),
        "--pb-frame-border-radius": (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$page$2d$builder$2f$core$2f$page$2d$density$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scaleRadiusForDensity"])(g.frameBorderRadiusDefault),
        "--pb-rich-text-code-radius": (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$page$2d$builder$2f$core$2f$page$2d$density$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scaleRadiusForDensity"])(g.richTextCodeBorderRadius),
        "--pb-rich-text-p-gap": g.richTextParagraphGap,
        "--pb-rich-text-h1-mt": h1.top,
        "--pb-rich-text-h1-mb": h1.bottom,
        "--pb-rich-text-h2-mt": h2.top,
        "--pb-rich-text-h2-mb": h2.bottom,
        "--pb-rich-text-h3-mt": h3.top,
        "--pb-rich-text-h3-mb": h3.bottom,
        "--pb-rich-text-list-my": g.richTextListMarginY,
        "--pb-rich-text-bq-my": g.richTextBlockquoteMarginY,
        "--pb-rich-text-hr-my": g.richTextHrMarginY,
        "--pb-rich-text-pre-my": g.richTextPreWrapMarginY,
        "--pb-button-label-gap": g.buttonLabelGap,
        "--pb-button-naked-pad-y": btn.py,
        "--pb-button-naked-pad-x": btn.px,
        "--pb-button-naked-radius": (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$page$2d$builder$2f$core$2f$page$2d$density$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scaleRadiusForDensity"])(g.buttonNakedBorderRadius)
    };
}
function serializePbContentGuidelinesToCss(g) {
    const vars = expandGuidelinesToCssVars(g);
    const lines = Object.keys(vars).sort().map((k)=>`  ${k}: ${vars[k]};`);
    return `:root {\n${lines.join("\n")}\n}`;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/core/src/defaults.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$defaults$2f$pb$2d$builder$2d$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/core/src/internal/defaults/pb-builder-defaults.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$defaults$2f$pb$2d$guidelines$2d$expand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/core/src/internal/defaults/pb-guidelines-expand.ts [app-client] (ecmascript)");
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/app/theme/pb-builder-defaults.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/core/src/defaults.ts [app-client] (ecmascript) <locals>");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/app/dev/elements/element-dev-baseline.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEV_NEUTRAL_BODY_DEFAULTS",
    ()=>DEV_NEUTRAL_BODY_DEFAULTS,
    "DEV_NEUTRAL_HEADING_DEFAULTS",
    ()=>DEV_NEUTRAL_HEADING_DEFAULTS,
    "DEV_NEUTRAL_IMAGE_DEFAULTS",
    ()=>DEV_NEUTRAL_IMAGE_DEFAULTS,
    "DEV_NEUTRAL_LINK_DEFAULTS",
    ()=>DEV_NEUTRAL_LINK_DEFAULTS,
    "DEV_NEUTRAL_PB_DEFAULTS",
    ()=>DEV_NEUTRAL_PB_DEFAULTS,
    "DEV_NEUTRAL_PB_FOUNDATIONS",
    ()=>DEV_NEUTRAL_PB_FOUNDATIONS,
    "DEV_PRODUCTION_BODY_DEFAULTS",
    ()=>DEV_PRODUCTION_BODY_DEFAULTS,
    "DEV_PRODUCTION_HEADING_DEFAULTS",
    ()=>DEV_PRODUCTION_HEADING_DEFAULTS,
    "DEV_PRODUCTION_IMAGE_DEFAULTS",
    ()=>DEV_PRODUCTION_IMAGE_DEFAULTS,
    "DEV_PRODUCTION_LINK_DEFAULTS",
    ()=>DEV_PRODUCTION_LINK_DEFAULTS,
    "cloneTypographyAnimationFromImageDefaults",
    ()=>cloneTypographyAnimationFromImageDefaults,
    "createTypographyDevDefaults",
    ()=>createTypographyDevDefaults
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$theme$2f$pb$2d$builder$2d$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/app/theme/pb-builder-defaults.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$defaults$2f$pb$2d$builder$2d$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/core/src/internal/defaults/pb-builder-defaults.ts [app-client] (ecmascript)");
;
const DEV_NEUTRAL_PB_FOUNDATIONS = {
    alignment: "start",
    spacingBaseRem: 0.75,
    radiusBaseRem: 0.5
};
const DEV_NEUTRAL_PB_DEFAULTS = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$defaults$2f$pb$2d$builder$2d$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPbBuilderDefaultsFromFoundations"])(DEV_NEUTRAL_PB_FOUNDATIONS);
_c = DEV_NEUTRAL_PB_DEFAULTS;
function cloneTypographyAnimationFromImageDefaults(imageDefaults) {
    return JSON.parse(JSON.stringify(imageDefaults.variants[imageDefaults.defaultVariant].animation));
}
function withTypographyAnimation(variants, animationSeed) {
    const out = {};
    for (const key of Object.keys(variants)){
        out[key] = {
            ...variants[key],
            animation: JSON.parse(JSON.stringify(animationSeed))
        };
    }
    return out;
}
function createTypographyDevDefaults(source) {
    const animationSeed = cloneTypographyAnimationFromImageDefaults(source.elements.image);
    return {
        heading: {
            defaultVariant: source.elements.heading.defaultVariant,
            variants: withTypographyAnimation(source.elements.heading.variants, animationSeed)
        },
        body: {
            defaultVariant: source.elements.body.defaultVariant,
            variants: withTypographyAnimation(source.elements.body.variants, animationSeed)
        },
        link: {
            defaultVariant: source.elements.link.defaultVariant,
            variants: withTypographyAnimation(source.elements.link.variants, animationSeed)
        }
    };
}
const NEUTRAL_TYPOGRAPHY_DEFAULTS = createTypographyDevDefaults(DEV_NEUTRAL_PB_DEFAULTS);
_c1 = NEUTRAL_TYPOGRAPHY_DEFAULTS;
const PRODUCTION_TYPOGRAPHY_DEFAULTS = createTypographyDevDefaults(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$defaults$2f$pb$2d$builder$2d$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pbBuilderDefaultsV1"]);
const DEV_NEUTRAL_IMAGE_DEFAULTS = DEV_NEUTRAL_PB_DEFAULTS.elements.image;
const DEV_NEUTRAL_HEADING_DEFAULTS = NEUTRAL_TYPOGRAPHY_DEFAULTS.heading;
const DEV_NEUTRAL_BODY_DEFAULTS = NEUTRAL_TYPOGRAPHY_DEFAULTS.body;
const DEV_NEUTRAL_LINK_DEFAULTS = NEUTRAL_TYPOGRAPHY_DEFAULTS.link;
const DEV_PRODUCTION_IMAGE_DEFAULTS = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$defaults$2f$pb$2d$builder$2d$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pbBuilderDefaultsV1"].elements.image;
const DEV_PRODUCTION_HEADING_DEFAULTS = PRODUCTION_TYPOGRAPHY_DEFAULTS.heading;
const DEV_PRODUCTION_BODY_DEFAULTS = PRODUCTION_TYPOGRAPHY_DEFAULTS.body;
const DEV_PRODUCTION_LINK_DEFAULTS = PRODUCTION_TYPOGRAPHY_DEFAULTS.link;
var _c, _c1;
__turbopack_context__.k.register(_c, "DEV_NEUTRAL_PB_DEFAULTS");
__turbopack_context__.k.register(_c1, "NEUTRAL_TYPOGRAPHY_DEFAULTS");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/app/dev/elements/body/constants.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BASE_DEFAULTS",
    ()=>BASE_DEFAULTS,
    "STORAGE_KEY",
    ()=>STORAGE_KEY,
    "VARIANT_LABELS",
    ()=>VARIANT_LABELS,
    "VARIANT_ORDER",
    ()=>VARIANT_ORDER
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$elements$2f$element$2d$dev$2d$baseline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/app/dev/elements/element-dev-baseline.ts [app-client] (ecmascript)");
;
const STORAGE_KEY = "pb-element-body-dev-v1";
const VARIANT_ORDER = [
    "lead",
    "standard",
    "fine"
];
const VARIANT_LABELS = {
    lead: "Lead",
    standard: "Standard",
    fine: "Fine"
};
const BASE_DEFAULTS = {
    defaultVariant: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$elements$2f$element$2d$dev$2d$baseline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEV_NEUTRAL_BODY_DEFAULTS"].defaultVariant,
    variants: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$elements$2f$element$2d$dev$2d$baseline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEV_NEUTRAL_BODY_DEFAULTS"].variants
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/app/dev/elements/heading/constants.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BASE_DEFAULTS",
    ()=>BASE_DEFAULTS,
    "STORAGE_KEY",
    ()=>STORAGE_KEY,
    "VARIANT_LABELS",
    ()=>VARIANT_LABELS,
    "VARIANT_ORDER",
    ()=>VARIANT_ORDER
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$elements$2f$element$2d$dev$2d$baseline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/app/dev/elements/element-dev-baseline.ts [app-client] (ecmascript)");
;
const STORAGE_KEY = "pb-element-heading-dev-v1";
const VARIANT_ORDER = [
    "display",
    "section",
    "label"
];
const VARIANT_LABELS = {
    display: "Display",
    section: "Section",
    label: "Label"
};
const BASE_DEFAULTS = {
    defaultVariant: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$elements$2f$element$2d$dev$2d$baseline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEV_NEUTRAL_HEADING_DEFAULTS"].defaultVariant,
    variants: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$elements$2f$element$2d$dev$2d$baseline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEV_NEUTRAL_HEADING_DEFAULTS"].variants
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/app/dev/elements/_shared/motion-lab.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MOTION_CURVE_PRESET_OPTIONS",
    ()=>MOTION_CURVE_PRESET_OPTIONS,
    "MOTION_CUSTOM_FIELD_KEYS",
    ()=>MOTION_CUSTOM_FIELD_KEYS,
    "MOTION_DIRECTION_OPTIONS",
    ()=>MOTION_DIRECTION_OPTIONS,
    "MOTION_HYBRID_STACK_OPTIONS",
    ()=>MOTION_HYBRID_STACK_OPTIONS,
    "getAnimationBehavior",
    ()=>getAnimationBehavior
]);
const MOTION_DIRECTION_OPTIONS = [
    "none",
    "up",
    "down",
    "left",
    "right"
];
const MOTION_CURVE_PRESET_OPTIONS = [
    "easeOut",
    "easeInOut",
    "easeIn",
    "linear",
    "customBezier"
];
const MOTION_HYBRID_STACK_OPTIONS = [
    "none",
    "zoomIn",
    "zoomOut",
    "tiltIn"
];
const MOTION_CUSTOM_FIELD_KEYS = [
    "opacity",
    "x",
    "y",
    "scale",
    "rotate",
    "duration",
    "delay",
    "ease/curve",
    "trigger"
];
function getAnimationBehavior(fineTune) {
    if (fineTune.entranceBehavior === "custom" || fineTune.exitBehavior === "custom") {
        return "custom";
    }
    if (fineTune.entranceBehavior === "hybrid" || fineTune.exitBehavior === "hybrid") {
        return "hybrid";
    }
    return "preset";
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/app/dev/elements/_shared/dev-controls/foundation-constants.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** Universal option lists aligned with `elementLayoutSchema` / element foundation. */ __turbopack_context__.s([
    "ALIGN_OPTIONS",
    ()=>ALIGN_OPTIONS,
    "ALIGN_Y_OPTIONS",
    ()=>ALIGN_Y_OPTIONS,
    "BLEND_MODE_OPTIONS",
    ()=>BLEND_MODE_OPTIONS,
    "INTERACTION_CURSOR_OPTIONS",
    ()=>INTERACTION_CURSOR_OPTIONS,
    "OBJECT_FIT_OPTIONS",
    ()=>OBJECT_FIT_OPTIONS,
    "OBJECT_POSITION_OPTIONS",
    ()=>OBJECT_POSITION_OPTIONS,
    "OVERFLOW_OPTIONS",
    ()=>OVERFLOW_OPTIONS,
    "TEXT_ALIGN_OPTIONS",
    ()=>TEXT_ALIGN_OPTIONS,
    "VISIBLE_WHEN_OPERATOR_OPTIONS",
    ()=>VISIBLE_WHEN_OPERATOR_OPTIONS
]);
const OVERFLOW_OPTIONS = [
    "visible",
    "hidden",
    "auto",
    "scroll"
];
const BLEND_MODE_OPTIONS = [
    "",
    "normal",
    "multiply",
    "screen",
    "overlay",
    "darken",
    "lighten",
    "color-dodge",
    "color-burn",
    "hard-light",
    "soft-light",
    "difference",
    "exclusion",
    "hue",
    "saturation",
    "color",
    "luminosity",
    "plus-lighter",
    "glass"
];
const ALIGN_OPTIONS = [
    "left",
    "center",
    "right"
];
const ALIGN_Y_OPTIONS = [
    "top",
    "center",
    "bottom"
];
const TEXT_ALIGN_OPTIONS = [
    "left",
    "center",
    "right",
    "justify"
];
const OBJECT_FIT_OPTIONS = [
    "cover",
    "contain",
    "fillWidth",
    "fillHeight",
    "crop"
];
const OBJECT_POSITION_OPTIONS = [
    "center",
    "left top",
    "center top",
    "right top",
    "left center",
    "center center",
    "right center",
    "left bottom",
    "center bottom",
    "right bottom",
    "left",
    "right",
    "top",
    "bottom"
];
const INTERACTION_CURSOR_OPTIONS = [
    "",
    "pointer",
    "default",
    "grab",
    "grabbing",
    "crosshair",
    "zoom-in",
    "zoom-out",
    "text",
    "move",
    "not-allowed"
];
const VISIBLE_WHEN_OPERATOR_OPTIONS = [
    "equals",
    "notEquals",
    "gt",
    "gte",
    "lt",
    "lte",
    "contains",
    "startsWith"
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/app/dev/elements/image/constants.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ANIMATION_EXIT_TRIGGER_OPTIONS",
    ()=>ANIMATION_EXIT_TRIGGER_OPTIONS,
    "ANIMATION_TRIGGER_OPTIONS",
    ()=>ANIMATION_TRIGGER_OPTIONS,
    "BASE_DEFAULTS",
    ()=>BASE_DEFAULTS,
    "CATEGORY_LABELS",
    ()=>CATEGORY_LABELS,
    "CURVE_PRESET_OPTIONS",
    ()=>CURVE_PRESET_OPTIONS,
    "DIRECTION_OPTIONS",
    ()=>DIRECTION_OPTIONS,
    "ENTRANCE_PRESET_OPTIONS",
    ()=>ENTRANCE_PRESET_OPTIONS,
    "EXIT_PRESET_OPTIONS",
    ()=>EXIT_PRESET_OPTIONS,
    "HYBRID_STACK_OPTIONS",
    ()=>HYBRID_STACK_OPTIONS,
    "IMAGE_VARIABLES_NOT_SUPPORTED_YET",
    ()=>IMAGE_VARIABLES_NOT_SUPPORTED_YET,
    "LAYOUT_MODE_OPTIONS",
    ()=>LAYOUT_MODE_OPTIONS,
    "PREVIEW_FALLBACK_IMAGE_SRC",
    ()=>PREVIEW_FALLBACK_IMAGE_SRC,
    "STORAGE_KEY",
    ()=>STORAGE_KEY,
    "VARIANT_LABELS",
    ()=>VARIANT_LABELS,
    "VARIANT_ORDER",
    ()=>VARIANT_ORDER
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$elements$2f$element$2d$dev$2d$baseline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/app/dev/elements/element-dev-baseline.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/contracts/src/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$page$2d$builder$2f$core$2f$page$2d$builder$2d$motion$2d$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/contracts/src/page-builder/core/page-builder-motion-defaults.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$elements$2f$_shared$2f$motion$2d$lab$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/app/dev/elements/_shared/motion-lab.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$elements$2f$_shared$2f$dev$2d$controls$2f$foundation$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/app/dev/elements/_shared/dev-controls/foundation-constants.ts [app-client] (ecmascript)");
;
;
;
;
;
const STORAGE_KEY = "pb-element-image-dev-v1";
const PREVIEW_FALLBACK_IMAGE_SRC = "/dev/image-preview-placeholder.svg";
const BASE_DEFAULTS = {
    defaultVariant: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$elements$2f$element$2d$dev$2d$baseline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEV_NEUTRAL_IMAGE_DEFAULTS"].defaultVariant,
    variants: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$elements$2f$element$2d$dev$2d$baseline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEV_NEUTRAL_IMAGE_DEFAULTS"].variants
};
const VARIANT_ORDER = [
    "hero",
    "inline",
    "fullCover",
    "feature",
    "crop"
];
const VARIANT_LABELS = {
    hero: "Hero",
    inline: "Inline",
    fullCover: "Full Cover",
    feature: "Feature",
    crop: "Crop"
};
const CATEGORY_LABELS = {
    content: "Content",
    layout: "Layout",
    traits: "Traits",
    animation: "Animation",
    runtime: "Runtime"
};
const ANIMATION_TRIGGER_OPTIONS = [
    "onMount",
    "onFirstVisible",
    "onEveryVisible",
    "onTrigger"
];
const ANIMATION_EXIT_TRIGGER_OPTIONS = [
    "manual",
    "leaveViewport"
];
const ENTRANCE_PRESET_OPTIONS = Object.keys(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$page$2d$builder$2f$core$2f$page$2d$builder$2d$motion$2d$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOTION_DEFAULTS"].entrancePresets).length > 0 ? Object.keys(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$page$2d$builder$2f$core$2f$page$2d$builder$2d$motion$2d$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOTION_DEFAULTS"].entrancePresets) : [
    "fade"
];
const EXIT_PRESET_OPTIONS = Object.keys(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$page$2d$builder$2f$core$2f$page$2d$builder$2d$motion$2d$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOTION_DEFAULTS"].exitPresets).length > 0 ? Object.keys(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$page$2d$builder$2f$core$2f$page$2d$builder$2d$motion$2d$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOTION_DEFAULTS"].exitPresets) : [
    "fade"
];
const LAYOUT_MODE_OPTIONS = [
    "aspectRatio",
    "fill",
    "constraints"
];
const DIRECTION_OPTIONS = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$elements$2f$_shared$2f$motion$2d$lab$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOTION_DIRECTION_OPTIONS"];
const CURVE_PRESET_OPTIONS = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$elements$2f$_shared$2f$motion$2d$lab$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOTION_CURVE_PRESET_OPTIONS"];
const HYBRID_STACK_OPTIONS = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$elements$2f$_shared$2f$motion$2d$lab$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOTION_HYBRID_STACK_OPTIONS"];
const IMAGE_VARIABLES_NOT_SUPPORTED_YET = [
    "native imageRotation field (schema-only)",
    "imageCrop pairs with object fit `crop` (variant templates may include defaults)",
    "native imageFilters object (schema-only)",
    "native fillOpacity field (schema-only)"
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/app/dev/elements/link/constants.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BASE_DEFAULTS",
    ()=>BASE_DEFAULTS,
    "STORAGE_KEY",
    ()=>STORAGE_KEY,
    "VARIANT_LABELS",
    ()=>VARIANT_LABELS,
    "VARIANT_ORDER",
    ()=>VARIANT_ORDER
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$elements$2f$element$2d$dev$2d$baseline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/app/dev/elements/element-dev-baseline.ts [app-client] (ecmascript)");
;
const STORAGE_KEY = "pb-element-link-dev-v1";
const VARIANT_ORDER = [
    "inline",
    "emphasis",
    "nav"
];
const VARIANT_LABELS = {
    inline: "Inline",
    emphasis: "Emphasis",
    nav: "Nav"
};
const BASE_DEFAULTS = {
    defaultVariant: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$elements$2f$element$2d$dev$2d$baseline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEV_NEUTRAL_LINK_DEFAULTS"].defaultVariant,
    variants: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$elements$2f$element$2d$dev$2d$baseline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEV_NEUTRAL_LINK_DEFAULTS"].variants
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/app/dev/fonts/font-tool-baseline.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEV_NEUTRAL_FONT_CONFIGS",
    ()=>DEV_NEUTRAL_FONT_CONFIGS,
    "DEV_NEUTRAL_TYPE_SCALE",
    ()=>DEV_NEUTRAL_TYPE_SCALE
]);
const DEFAULT_WEIGHTS = {
    thin: 100,
    light: 300,
    regular: 400,
    book: 500,
    bold: 700,
    black: 900
};
const DEV_NEUTRAL_FONT_CONFIGS = {
    primary: {
        family: "Manrope",
        weights: {
            ...DEFAULT_WEIGHTS
        },
        italic: true,
        source: "webfont"
    },
    secondary: {
        family: "Lora",
        weights: {
            ...DEFAULT_WEIGHTS
        },
        italic: true,
        source: "webfont"
    },
    mono: {
        family: "IBM Plex Mono",
        weights: {
            ...DEFAULT_WEIGHTS
        },
        italic: false,
        source: "webfont"
    }
};
const DEV_NEUTRAL_TYPE_SCALE = {
    headingXs: {
        sizeDesktop: 20,
        sizeMobile: 16,
        lineHeightDesktop: 24,
        lineHeightMobile: 20,
        letterSpacing: "0",
        fontWeightRole: "regular"
    },
    headingSm: {
        sizeDesktop: 24,
        sizeMobile: 18,
        lineHeightDesktop: 30,
        lineHeightMobile: 24,
        letterSpacing: "0",
        fontWeightRole: "book"
    },
    headingMd: {
        sizeDesktop: 30,
        sizeMobile: 22,
        lineHeightDesktop: 36,
        lineHeightMobile: 28,
        letterSpacing: "0",
        fontWeightRole: "book"
    },
    headingLg: {
        sizeDesktop: 38,
        sizeMobile: 28,
        lineHeightDesktop: 44,
        lineHeightMobile: 34,
        letterSpacing: "0",
        fontWeightRole: "bold"
    },
    headingXl: {
        sizeDesktop: 48,
        sizeMobile: 34,
        lineHeightDesktop: 54,
        lineHeightMobile: 40,
        letterSpacing: "0",
        fontWeightRole: "bold"
    },
    heading2xl: {
        sizeDesktop: 62,
        sizeMobile: 42,
        lineHeightDesktop: 70,
        lineHeightMobile: 48,
        letterSpacing: "0",
        fontWeightRole: "black"
    },
    bodyXs: {
        sizeDesktop: 12,
        sizeMobile: 11,
        lineHeightDesktop: 18,
        lineHeightMobile: 16,
        letterSpacing: "0",
        fontWeightRole: "regular"
    },
    bodySm: {
        sizeDesktop: 14,
        sizeMobile: 12,
        lineHeightDesktop: 20,
        lineHeightMobile: 18,
        letterSpacing: "0",
        fontWeightRole: "regular"
    },
    bodyMd: {
        sizeDesktop: 16,
        sizeMobile: 14,
        lineHeightDesktop: 24,
        lineHeightMobile: 20,
        letterSpacing: "0",
        fontWeightRole: "regular"
    },
    bodyLg: {
        sizeDesktop: 18,
        sizeMobile: 16,
        lineHeightDesktop: 27,
        lineHeightMobile: 24,
        letterSpacing: "0",
        fontWeightRole: "book"
    },
    bodyXl: {
        sizeDesktop: 22,
        sizeMobile: 18,
        lineHeightDesktop: 32,
        lineHeightMobile: 26,
        letterSpacing: "0",
        fontWeightRole: "book"
    },
    body2xl: {
        sizeDesktop: 26,
        sizeMobile: 20,
        lineHeightDesktop: 38,
        lineHeightMobile: 30,
        letterSpacing: "0",
        fontWeightRole: "book"
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/app/theme/pb-guidelines-expand.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/core/src/defaults.ts [app-client] (ecmascript) <locals>");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/app/theme/pb-content-guidelines-config.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "pbBuilderDefaults",
    ()=>pbBuilderDefaults,
    "pbContentGuidelines",
    ()=>pbContentGuidelines,
    "pbContentGuidelinesConfigFileExport",
    ()=>pbContentGuidelinesConfigFileExport,
    "pbContentGuidelinesCssInline",
    ()=>pbContentGuidelinesCssInline
]);
/**
 * Legacy flat page-builder defaults (frames, rich-text rhythm, button chrome).
 * Source-of-truth now lives in `pb-builder-defaults.ts` (grouped by sections/modules/elements),
 * and this file derives the runtime flat shape for backward compatibility.
 *
 * **Colors** → `theme/config.ts`; **type scale** → `fonts/type-scale.ts`.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$theme$2f$pb$2d$guidelines$2d$expand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/app/theme/pb-guidelines-expand.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$defaults$2f$pb$2d$guidelines$2d$expand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/core/src/internal/defaults/pb-guidelines-expand.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$theme$2f$pb$2d$builder$2d$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/app/theme/pb-builder-defaults.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$defaults$2f$pb$2d$builder$2d$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/core/src/internal/defaults/pb-builder-defaults.ts [app-client] (ecmascript)");
;
;
const pbBuilderDefaults = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$defaults$2f$pb$2d$builder$2d$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pbBuilderDefaultsV1"];
const pbContentGuidelines = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$defaults$2f$pb$2d$builder$2d$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toPbContentGuidelines"])(pbBuilderDefaults);
function pbContentGuidelinesCssInline() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$defaults$2f$pb$2d$guidelines$2d$expand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serializePbContentGuidelinesToCss"])(pbContentGuidelines);
}
function fmtKey(k, v) {
    if (v === null) return `  ${String(k)}: null,`;
    return `  ${String(k)}: ${JSON.stringify(v)},`;
}
/** Keys in a stable documentation order (matches dev tool sections). */ const CONFIG_EXPORT_KEY_ORDER = [
    "copyTextAlign",
    "frameGapWhenUnset",
    "frameRowGapWhenUnset",
    "frameColumnGapWhenUnset",
    "frameAlignItemsDefault",
    "frameFlexDirectionDefault",
    "frameJustifyContentDefault",
    "framePaddingDefault",
    "frameFlexWrapDefault",
    "frameBorderRadiusDefault",
    "richTextParagraphGap",
    "richTextCodeBorderRadius",
    "richTextHeadingH1Margin",
    "richTextHeadingH1MarginTop",
    "richTextHeadingH1MarginBottom",
    "richTextHeadingH2Margin",
    "richTextHeadingH2MarginTop",
    "richTextHeadingH2MarginBottom",
    "richTextHeadingH3Margin",
    "richTextHeadingH3MarginTop",
    "richTextHeadingH3MarginBottom",
    "richTextListMarginY",
    "richTextBlockquoteMarginY",
    "richTextHrMarginY",
    "richTextPreWrapMarginY",
    "buttonLabelGap",
    "buttonNakedPadding",
    "buttonNakedPaddingY",
    "buttonNakedPaddingX",
    "buttonNakedBorderRadius"
];
function pbContentGuidelinesConfigFileExport(g) {
    const body = CONFIG_EXPORT_KEY_ORDER.map((k)=>fmtKey(k, g[k])).join("\n");
    return [
        "/**",
        " * Page-builder **layout & copy** defaults.",
        " * Expansion → `pb-guidelines-expand.ts`. Edit via `/dev/style` or by hand.",
        " */",
        'import type { PbContentGuidelines } from "@/app/theme/pb-guidelines-expand";',
        'import { serializePbContentGuidelinesToCss } from "@/app/theme/pb-guidelines-expand";',
        "",
        'export type { PbContentGuidelines } from "@/app/theme/pb-guidelines-expand";',
        "",
        "export const pbContentGuidelines: PbContentGuidelines = {",
        body,
        "};",
        "",
        "export function pbContentGuidelinesCssInline(): string {",
        "  return serializePbContentGuidelinesToCss(pbContentGuidelines);",
        "}"
    ].join("\n");
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/app/theme/pb-style-suggest.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Seed → proposed page-builder style guidelines (dev `/dev/style` + future tooling).
 * Mirrors the color tool: **seeds** drive unlocked rows; **locks** pin values.
 */ __turbopack_context__.s([
    "DEFAULT_STYLE_TOOL_SEEDS",
    ()=>DEFAULT_STYLE_TOOL_SEEDS,
    "PB_GUIDELINE_KEYS",
    ()=>PB_GUIDELINE_KEYS,
    "emptyLocks",
    ()=>emptyLocks,
    "mergeGuidelinesWithLocks",
    ()=>mergeGuidelinesWithLocks,
    "proposePbContentGuidelines",
    ()=>proposePbContentGuidelines
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$theme$2f$pb$2d$builder$2d$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/app/theme/pb-builder-defaults.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$defaults$2f$pb$2d$builder$2d$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/core/src/internal/defaults/pb-builder-defaults.ts [app-client] (ecmascript)");
;
const DEFAULT_STYLE_TOOL_SEEDS = {
    alignment: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$defaults$2f$pb$2d$builder$2d$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_PB_BUILDER_FOUNDATIONS"].alignment,
    spacingBaseRem: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$defaults$2f$pb$2d$builder$2d$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_PB_BUILDER_FOUNDATIONS"].spacingBaseRem,
    radiusBaseRem: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$defaults$2f$pb$2d$builder$2d$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_PB_BUILDER_FOUNDATIONS"].radiusBaseRem,
    useDefaultFrameGap: true
};
function rem(n) {
    return `${n}rem`;
}
function proposePbContentGuidelines(seeds) {
    const b = Math.max(0.125, seeds.spacingBaseRem);
    const r = Math.max(0.25, seeds.radiusBaseRem);
    const copyTextAlign = seeds.alignment === "center" ? "center" : seeds.alignment === "end" ? "right" : "start";
    const frameAlignItemsDefault = seeds.alignment === "center" ? "center" : seeds.alignment === "end" ? "flex-end" : "flex-start";
    const frameJustifyContentDefault = seeds.alignment === "center" ? "center" : seeds.alignment === "end" ? "flex-end" : "flex-start";
    return {
        copyTextAlign,
        frameGapWhenUnset: seeds.useDefaultFrameGap ? rem(b * 2) : null,
        frameRowGapWhenUnset: null,
        frameColumnGapWhenUnset: null,
        frameAlignItemsDefault,
        frameFlexDirectionDefault: "row",
        frameJustifyContentDefault,
        framePaddingDefault: "0",
        frameFlexWrapDefault: "nowrap",
        frameBorderRadiusDefault: rem(r),
        richTextParagraphGap: rem(b),
        richTextCodeBorderRadius: rem(r),
        richTextHeadingH1Margin: `${rem(b * 2)} ${rem(b * 0.5)}`,
        richTextHeadingH1MarginTop: null,
        richTextHeadingH1MarginBottom: null,
        richTextHeadingH2Margin: `${rem(b * 1.5)} ${rem(b * 0.5)}`,
        richTextHeadingH2MarginTop: null,
        richTextHeadingH2MarginBottom: null,
        richTextHeadingH3Margin: `${rem(b * 1)} ${rem(b * 0.5)}`,
        richTextHeadingH3MarginTop: null,
        richTextHeadingH3MarginBottom: null,
        richTextListMarginY: rem(b),
        richTextBlockquoteMarginY: rem(b),
        richTextHrMarginY: rem(b * 1.5),
        richTextPreWrapMarginY: rem(b * 1.5),
        buttonLabelGap: rem(b),
        buttonNakedPadding: `${rem(b)} ${rem(b * 2.5)}`,
        buttonNakedPaddingY: null,
        buttonNakedPaddingX: null,
        buttonNakedBorderRadius: rem(r)
    };
}
function mergeGuidelinesWithLocks(proposed, prev, locks) {
    const out = {
        ...proposed
    };
    for (const k of Object.keys(out)){
        if (locks[k]) out[k] = prev[k];
    }
    return out;
}
const PB_GUIDELINE_KEYS = [
    "copyTextAlign",
    "frameGapWhenUnset",
    "frameRowGapWhenUnset",
    "frameColumnGapWhenUnset",
    "frameAlignItemsDefault",
    "frameFlexDirectionDefault",
    "frameJustifyContentDefault",
    "framePaddingDefault",
    "frameFlexWrapDefault",
    "frameBorderRadiusDefault",
    "richTextParagraphGap",
    "richTextCodeBorderRadius",
    "richTextHeadingH1Margin",
    "richTextHeadingH1MarginTop",
    "richTextHeadingH1MarginBottom",
    "richTextHeadingH2Margin",
    "richTextHeadingH2MarginTop",
    "richTextHeadingH2MarginBottom",
    "richTextHeadingH3Margin",
    "richTextHeadingH3MarginTop",
    "richTextHeadingH3MarginBottom",
    "richTextListMarginY",
    "richTextBlockquoteMarginY",
    "richTextHrMarginY",
    "richTextPreWrapMarginY",
    "buttonLabelGap",
    "buttonNakedPadding",
    "buttonNakedPaddingY",
    "buttonNakedPaddingX",
    "buttonNakedBorderRadius"
];
function emptyLocks() {
    return Object.fromEntries(PB_GUIDELINE_KEYS.map((k)=>[
            k,
            false
        ]));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/app/dev/style/style-tool-baseline.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEV_NEUTRAL_STYLE_SEEDS",
    ()=>DEV_NEUTRAL_STYLE_SEEDS,
    "createNeutralStyleGuidelines",
    ()=>createNeutralStyleGuidelines
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$theme$2f$pb$2d$style$2d$suggest$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/app/theme/pb-style-suggest.ts [app-client] (ecmascript)");
;
const DEV_NEUTRAL_STYLE_SEEDS = {
    alignment: "start",
    spacingBaseRem: 0.75,
    radiusBaseRem: 0.5,
    useDefaultFrameGap: true
};
function createNeutralStyleGuidelines() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$theme$2f$pb$2d$style$2d$suggest$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["proposePbContentGuidelines"])(DEV_NEUTRAL_STYLE_SEEDS);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/app/dev/style/style-tool-persistence.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "STYLE_TOOL_LEGACY_STORAGE_KEY_V1",
    ()=>STYLE_TOOL_LEGACY_STORAGE_KEY_V1,
    "STYLE_TOOL_LEGACY_STORAGE_KEY_V2",
    ()=>STYLE_TOOL_LEGACY_STORAGE_KEY_V2,
    "coerceStyleToolPersisted",
    ()=>coerceStyleToolPersisted,
    "fillRequiredGuidelineDefaults",
    ()=>fillRequiredGuidelineDefaults,
    "getDefaultStyleToolPersistedV2",
    ()=>getDefaultStyleToolPersistedV2,
    "getProductionStyleToolPersistedV2",
    ()=>getProductionStyleToolPersistedV2,
    "readStyleToolFromLegacyLocalStorage",
    ()=>readStyleToolFromLegacyLocalStorage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$theme$2f$pb$2d$content$2d$guidelines$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/app/theme/pb-content-guidelines-config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$theme$2f$pb$2d$style$2d$suggest$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/app/theme/pb-style-suggest.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$style$2f$style$2d$tool$2d$baseline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/app/dev/style/style-tool-baseline.ts [app-client] (ecmascript)");
;
;
;
const STYLE_TOOL_LEGACY_STORAGE_KEY_V1 = "pb-style-tool-guidelines-v1";
const STYLE_TOOL_LEGACY_STORAGE_KEY_V2 = "pb-style-tool-v2";
function fillRequiredGuidelineDefaults(g) {
    const baseline = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$style$2f$style$2d$tool$2d$baseline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createNeutralStyleGuidelines"])();
    const out = {
        ...g
    };
    const pick = (key)=>{
        const v = out[key];
        if (v == null || typeof v === "string" && v.trim() === "") {
            out[key] = baseline[key];
        }
    };
    pick("frameJustifyContentDefault");
    pick("framePaddingDefault");
    pick("frameFlexWrapDefault");
    pick("frameBorderRadiusDefault");
    pick("richTextCodeBorderRadius");
    pick("buttonNakedBorderRadius");
    return out;
}
function readStyleFromV2Raw(raw) {
    const data = JSON.parse(raw);
    if (data.v === 2 && data.seeds && data.locks && data.guidelines) {
        const locks = {
            ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$theme$2f$pb$2d$style$2d$suggest$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["emptyLocks"])(),
            ...data.locks
        };
        return {
            v: 2,
            seeds: {
                ...__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$style$2f$style$2d$tool$2d$baseline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEV_NEUTRAL_STYLE_SEEDS"],
                ...data.seeds
            },
            locks,
            guidelines: fillRequiredGuidelineDefaults({
                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$style$2f$style$2d$tool$2d$baseline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createNeutralStyleGuidelines"])(),
                ...data.guidelines
            })
        };
    }
    return null;
}
function readStyleToolFromLegacyLocalStorage() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const rawV2 = localStorage.getItem(STYLE_TOOL_LEGACY_STORAGE_KEY_V2);
        if (rawV2) {
            const parsed = readStyleFromV2Raw(rawV2);
            if (parsed) return parsed;
        }
        const rawV1 = localStorage.getItem(STYLE_TOOL_LEGACY_STORAGE_KEY_V1);
        if (rawV1) {
            const flat = JSON.parse(rawV1);
            const guidelines = fillRequiredGuidelineDefaults({
                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$style$2f$style$2d$tool$2d$baseline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createNeutralStyleGuidelines"])(),
                ...flat
            });
            return {
                v: 2,
                seeds: {
                    ...__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$style$2f$style$2d$tool$2d$baseline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEV_NEUTRAL_STYLE_SEEDS"]
                },
                locks: Object.fromEntries(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$theme$2f$pb$2d$style$2d$suggest$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PB_GUIDELINE_KEYS"].map((k)=>[
                        k,
                        true
                    ])),
                guidelines
            };
        }
        return null;
    } catch  {
        return null;
    }
}
function coerceStyleToolPersisted(data) {
    if (!data || typeof data !== "object") return null;
    const d = data;
    if (d.v !== 2 || !d.seeds || !d.locks || !d.guidelines) return null;
    try {
        return readStyleFromV2Raw(JSON.stringify(d));
    } catch  {
        return null;
    }
}
function getDefaultStyleToolPersistedV2() {
    const seeds = {
        ...__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$style$2f$style$2d$tool$2d$baseline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEV_NEUTRAL_STYLE_SEEDS"]
    };
    const locks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$theme$2f$pb$2d$style$2d$suggest$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["emptyLocks"])();
    const guidelines = fillRequiredGuidelineDefaults((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$theme$2f$pb$2d$style$2d$suggest$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["proposePbContentGuidelines"])(seeds));
    return {
        v: 2,
        seeds,
        locks,
        guidelines
    };
}
function getProductionStyleToolPersistedV2() {
    const seeds = {
        ...__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$style$2f$style$2d$tool$2d$baseline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEV_NEUTRAL_STYLE_SEEDS"]
    };
    const locks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$theme$2f$pb$2d$style$2d$suggest$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["emptyLocks"])();
    return {
        v: 2,
        seeds,
        locks,
        guidelines: fillRequiredGuidelineDefaults(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$theme$2f$pb$2d$content$2d$guidelines$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pbContentGuidelines"])
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/app/fonts/config.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FONT_WEIGHT_ROLES",
    ()=>FONT_WEIGHT_ROLES,
    "monoFontConfig",
    ()=>monoFontConfig,
    "primaryFontConfig",
    ()=>primaryFontConfig,
    "secondaryFontConfig",
    ()=>secondaryFontConfig
]);
const FONT_WEIGHT_ROLES = [
    "thin",
    "light",
    "regular",
    "book",
    "bold",
    "black"
];
const primaryFontConfig = {
    source: "webfont",
    webfont: {
        family: "Inter"
    },
    // Stub until real files are added. Switch to variable: true for a variable font:
    //   local: { variable: true, path: "Exo2[wght].woff2", weightRange: "100 900" }
    // or list individual weight files:
    //   local: { variable: false, files: [{ path: "Gothica-Bold.woff2", weight: 700, style: "normal" }, ...] }
    local: {
        variable: false,
        files: [
            {
                path: "../../../public/font/_local-loader-stub.woff2",
                weight: 400,
                style: "normal"
            }
        ]
    },
    weights: {
        thin: 100,
        light: 300,
        book: 500,
        regular: 400,
        bold: 700,
        black: 900
    },
    italic: true
};
const secondaryFontConfig = {
    source: "webfont",
    webfont: {
        family: "Newsreader"
    },
    local: {
        variable: false,
        files: [
            {
                path: "../../../public/font/_local-loader-stub.woff2",
                weight: 400,
                style: "normal"
            }
        ]
    },
    weights: {
        thin: 100,
        light: 300,
        book: 500,
        regular: 400,
        bold: 700,
        black: 900
    },
    italic: true
};
const monoFontConfig = {
    source: "webfont",
    webfont: {
        family: "JetBrains Mono"
    },
    local: {
        variable: false,
        files: [
            {
                path: "../../../public/font/_local-loader-stub.woff2",
                weight: 400,
                style: "normal"
            }
        ]
    },
    weights: {
        thin: 100,
        light: 300,
        book: 500,
        regular: 400,
        bold: 700,
        black: 900
    },
    italic: false
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/app/fonts/type-scale.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Type scale configuration.
 *
 * Six **heading** steps and six **body** steps from **extra small** through **double
 * extra large** (XS → 2XL). Size, line-height, letter-spacing, and **weight role** are
 * independent per step — tokens are a ladder only, not a fixed HTML outline slot.
 *
 * Values drive CSS custom properties injected in the layout; globals.css references
 * vars only. To change the scale: edit the numbers here. To preview: /dev/fonts.
 */ __turbopack_context__.s([
    "TYPE_SCALE_LABELS",
    ()=>TYPE_SCALE_LABELS,
    "TYPE_SCALE_LEGACY_KEYS",
    ()=>TYPE_SCALE_LEGACY_KEYS,
    "TYPE_SCALE_PREVIOUS_TSHIRT_SLOT_MAP",
    ()=>TYPE_SCALE_PREVIOUS_TSHIRT_SLOT_MAP,
    "TYPE_SCALE_SHORT_TAG",
    ()=>TYPE_SCALE_SHORT_TAG,
    "TYPE_SCALE_UTILITY_CLASS",
    ()=>TYPE_SCALE_UTILITY_CLASS,
    "TYPE_SCALE_VAR_PREFIXES",
    ()=>TYPE_SCALE_VAR_PREFIXES,
    "typeScaleConfig",
    ()=>typeScaleConfig
]);
const typeScaleConfig = {
    headingXs: {
        sizeDesktop: 24,
        sizeMobile: 16,
        lineHeightDesktop: 28,
        lineHeightMobile: 20,
        letterSpacing: "0",
        fontWeightRole: "light"
    },
    headingSm: {
        sizeDesktop: 30,
        sizeMobile: 20,
        lineHeightDesktop: 33,
        lineHeightMobile: 22,
        letterSpacing: "0",
        fontWeightRole: "bold"
    },
    headingMd: {
        sizeDesktop: 32,
        sizeMobile: 22,
        lineHeightDesktop: 36,
        lineHeightMobile: 26,
        letterSpacing: "0",
        fontWeightRole: "light"
    },
    headingLg: {
        sizeDesktop: 40,
        sizeMobile: 26,
        lineHeightDesktop: 44,
        lineHeightMobile: 29,
        letterSpacing: "0",
        fontWeightRole: "bold"
    },
    headingXl: {
        sizeDesktop: 50,
        sizeMobile: 30,
        lineHeightDesktop: 55,
        lineHeightMobile: 33,
        letterSpacing: "0",
        fontWeightRole: "bold"
    },
    heading2xl: {
        sizeDesktop: 76,
        sizeMobile: 44,
        lineHeightDesktop: 84,
        lineHeightMobile: 48,
        letterSpacing: "0",
        fontWeightRole: "bold"
    },
    bodyXs: {
        sizeDesktop: 12,
        sizeMobile: 8,
        lineHeightDesktop: 18,
        lineHeightMobile: 12,
        letterSpacing: "0",
        fontWeightRole: "light"
    },
    bodySm: {
        sizeDesktop: 12,
        sizeMobile: 8,
        lineHeightDesktop: 18,
        lineHeightMobile: 12,
        letterSpacing: "0",
        fontWeightRole: "book"
    },
    bodyMd: {
        sizeDesktop: 22,
        sizeMobile: 12,
        lineHeightDesktop: 33,
        lineHeightMobile: 18,
        letterSpacing: "0",
        fontWeightRole: "thin"
    },
    bodyLg: {
        sizeDesktop: 22,
        sizeMobile: 12,
        lineHeightDesktop: 33,
        lineHeightMobile: 18,
        letterSpacing: "0",
        fontWeightRole: "book"
    },
    bodyXl: {
        sizeDesktop: 26,
        sizeMobile: 18,
        lineHeightDesktop: 39,
        lineHeightMobile: 28,
        letterSpacing: "0",
        fontWeightRole: "thin"
    },
    body2xl: {
        sizeDesktop: 26,
        sizeMobile: 18,
        lineHeightDesktop: 39,
        lineHeightMobile: 28,
        letterSpacing: "0",
        fontWeightRole: "book"
    }
};
const TYPE_SCALE_VAR_PREFIXES = {
    headingXs: "--type-heading-xs",
    headingSm: "--type-heading-sm",
    headingMd: "--type-heading-md",
    headingLg: "--type-heading-lg",
    headingXl: "--type-heading-xl",
    heading2xl: "--type-heading-2xl",
    bodyXs: "--type-body-xs",
    bodySm: "--type-body-sm",
    bodyMd: "--type-body-md",
    bodyLg: "--type-body-lg",
    bodyXl: "--type-body-xl",
    body2xl: "--type-body-2xl"
};
const TYPE_SCALE_LABELS = {
    headingXs: "Heading Extra Small",
    headingSm: "Heading Small",
    headingMd: "Heading Medium",
    headingLg: "Heading Large",
    headingXl: "Heading Extra Large",
    heading2xl: "Heading Double Extra Large",
    bodyXs: "Body Extra Small",
    bodySm: "Body Small",
    bodyMd: "Body Medium",
    bodyLg: "Body Large",
    bodyXl: "Body Extra Large",
    body2xl: "Body Double Extra Large"
};
const TYPE_SCALE_SHORT_TAG = {
    headingXs: "XS",
    headingSm: "SM",
    headingMd: "MD",
    headingLg: "LG",
    headingXl: "XL",
    heading2xl: "2XL",
    bodyXs: "XS",
    bodySm: "SM",
    bodyMd: "MD",
    bodyLg: "LG",
    bodyXl: "XL",
    body2xl: "2XL"
};
const TYPE_SCALE_UTILITY_CLASS = {
    headingXs: "typography-heading-xs",
    headingSm: "typography-heading-sm",
    headingMd: "typography-heading-md",
    headingLg: "typography-heading-lg",
    headingXl: "typography-heading-xl",
    heading2xl: "typography-heading-2xl",
    bodyXs: "typography-body-xs",
    bodySm: "typography-body-sm",
    bodyMd: "typography-body-md",
    bodyLg: "typography-body-lg",
    bodyXl: "typography-body-xl",
    body2xl: "typography-body-2xl"
};
const TYPE_SCALE_LEGACY_KEYS = {
    headingPrimary: "heading2xl",
    headingSecondary: "headingXl",
    headingTertiaryBold: "headingLg",
    headingTertiaryLight: "headingMd",
    headingCardBold: "headingSm",
    headingCardLight: "headingXs",
    bodyLargeRegular: "body2xl",
    bodyLargeThin: "bodyXl",
    bodyMediumRegular: "bodyLg",
    bodyMediumThin: "bodyMd",
    bodyLegalBook: "bodySm",
    bodyLegalLight: "bodyXs"
};
const TYPE_SCALE_PREVIOUS_TSHIRT_SLOT_MAP = {
    headingXl: "heading2xl",
    headingLg: "headingXl",
    headingMd: "headingLg",
    headingSm: "headingMd",
    headingXs: "headingSm",
    heading2xs: "headingXs",
    bodyXl: "body2xl",
    bodyLg: "bodyXl",
    bodyMd: "bodyLg",
    bodySm: "bodyMd",
    bodyXs: "bodySm",
    body2xs: "bodyXs"
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/app/dev/workbench/workbench-session-shape.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "hasCompleteWorkbenchStorageShape",
    ()=>hasCompleteWorkbenchStorageShape,
    "mergeWorkbenchSessionShape",
    ()=>mergeWorkbenchSessionShape
]);
function mergeElements(elements, defaults) {
    const merged = {
        ...defaults
    };
    if (!elements) return merged;
    if (elements.image != null) merged.image = elements.image;
    if (elements.body != null) merged.body = elements.body;
    if (elements.heading != null) merged.heading = elements.heading;
    if (elements.link != null) merged.link = elements.link;
    return merged;
}
function mergeWorkbenchSessionShape(session, defaults) {
    return {
        v: 1,
        colors: session.colors ?? defaults.colors,
        fonts: session.fonts ?? defaults.fonts,
        style: session.style ?? defaults.style,
        elements: mergeElements(session.elements, defaults.elements)
    };
}
function isRecord(value) {
    return value !== null && typeof value === "object";
}
function hasRequiredElements(elements) {
    if (!isRecord(elements)) return false;
    return elements.image != null && elements.body != null && elements.heading != null && elements.link != null;
}
function hasCompleteWorkbenchStorageShape(raw) {
    if (!raw || raw.trim() === "") return false;
    try {
        const parsed = JSON.parse(raw);
        return parsed.v === 1 && parsed.colors != null && parsed.fonts != null && parsed.style != null && hasRequiredElements(parsed.elements);
    } catch  {
        return false;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/app/dev/workbench/workbench-defaults.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getDefaultBodyElementPersisted",
    ()=>getDefaultBodyElementPersisted,
    "getDefaultFontsWorkbenchPrefs",
    ()=>getDefaultFontsWorkbenchPrefs,
    "getDefaultHeadingElementPersisted",
    ()=>getDefaultHeadingElementPersisted,
    "getDefaultImageElementPersisted",
    ()=>getDefaultImageElementPersisted,
    "getDefaultLinkElementPersisted",
    ()=>getDefaultLinkElementPersisted,
    "getDefaultWorkbenchSession",
    ()=>getDefaultWorkbenchSession,
    "getProductionBodyElementPersisted",
    ()=>getProductionBodyElementPersisted,
    "getProductionFontsWorkbenchPrefs",
    ()=>getProductionFontsWorkbenchPrefs,
    "getProductionHeadingElementPersisted",
    ()=>getProductionHeadingElementPersisted,
    "getProductionImageElementPersisted",
    ()=>getProductionImageElementPersisted,
    "getProductionLinkElementPersisted",
    ()=>getProductionLinkElementPersisted,
    "getProductionWorkbenchSession",
    ()=>getProductionWorkbenchSession,
    "isWorkbenchStorageJsonComplete",
    ()=>isWorkbenchStorageJsonComplete,
    "mergeWorkbenchSessionWithDefaults",
    ()=>mergeWorkbenchSessionWithDefaults
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$colors$2f$color$2d$tool$2d$persistence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/app/dev/colors/color-tool-persistence.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$elements$2f$element$2d$dev$2d$baseline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/app/dev/elements/element-dev-baseline.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$fonts$2f$font$2d$tool$2d$baseline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/app/dev/fonts/font-tool-baseline.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$style$2f$style$2d$tool$2d$persistence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/app/dev/style/style-tool-persistence.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$fonts$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/app/fonts/config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$fonts$2f$type$2d$scale$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/app/fonts/type-scale.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$workbench$2f$workbench$2d$session$2d$shape$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/app/dev/workbench/workbench-session-shape.ts [app-client] (ecmascript)");
;
;
;
;
;
;
;
const DEFAULT_PREVIEW_PHRASE = "The quick brown fox jumps over the lazy dog. 0123456789";
function toSlotState(config) {
    return {
        family: config.family,
        weights: {
            ...config.weights
        },
        italic: config.italic,
        source: config.source
    };
}
function toProductionSlotState(cfg) {
    return {
        family: cfg.webfont.family,
        weights: {
            ...cfg.weights
        },
        italic: cfg.italic,
        source: cfg.source === "local" ? "local" : "webfont"
    };
}
function createFontsWorkbenchPrefs(configs, scale) {
    return {
        v: 1,
        configs,
        slotPreviewMode: {
            primary: "catalog",
            secondary: "catalog",
            mono: "catalog"
        },
        typeScale: structuredClone(scale),
        previewSampleText: DEFAULT_PREVIEW_PHRASE
    };
}
function getDefaultFontsWorkbenchPrefs() {
    return createFontsWorkbenchPrefs({
        primary: toSlotState(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$fonts$2f$font$2d$tool$2d$baseline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEV_NEUTRAL_FONT_CONFIGS"].primary),
        secondary: toSlotState(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$fonts$2f$font$2d$tool$2d$baseline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEV_NEUTRAL_FONT_CONFIGS"].secondary),
        mono: toSlotState(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$fonts$2f$font$2d$tool$2d$baseline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEV_NEUTRAL_FONT_CONFIGS"].mono)
    }, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$fonts$2f$font$2d$tool$2d$baseline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEV_NEUTRAL_TYPE_SCALE"]);
}
function getProductionFontsWorkbenchPrefs() {
    return createFontsWorkbenchPrefs({
        primary: toProductionSlotState(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$fonts$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["primaryFontConfig"]),
        secondary: toProductionSlotState(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$fonts$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["secondaryFontConfig"]),
        mono: toProductionSlotState(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$fonts$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["monoFontConfig"])
    }, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$fonts$2f$type$2d$scale$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["typeScaleConfig"]);
}
function getDefaultImageElementPersisted() {
    return {
        v: 3,
        defaultVariant: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$elements$2f$element$2d$dev$2d$baseline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEV_NEUTRAL_IMAGE_DEFAULTS"].defaultVariant,
        variants: structuredClone(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$elements$2f$element$2d$dev$2d$baseline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEV_NEUTRAL_IMAGE_DEFAULTS"].variants)
    };
}
function getProductionImageElementPersisted() {
    return {
        v: 3,
        defaultVariant: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$elements$2f$element$2d$dev$2d$baseline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEV_PRODUCTION_IMAGE_DEFAULTS"].defaultVariant,
        variants: structuredClone(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$elements$2f$element$2d$dev$2d$baseline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEV_PRODUCTION_IMAGE_DEFAULTS"].variants)
    };
}
function getDefaultBodyElementPersisted() {
    return {
        v: 1,
        defaultVariant: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$elements$2f$element$2d$dev$2d$baseline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEV_NEUTRAL_BODY_DEFAULTS"].defaultVariant,
        variants: structuredClone(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$elements$2f$element$2d$dev$2d$baseline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEV_NEUTRAL_BODY_DEFAULTS"].variants)
    };
}
function getProductionBodyElementPersisted() {
    return {
        v: 1,
        defaultVariant: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$elements$2f$element$2d$dev$2d$baseline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEV_PRODUCTION_BODY_DEFAULTS"].defaultVariant,
        variants: structuredClone(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$elements$2f$element$2d$dev$2d$baseline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEV_PRODUCTION_BODY_DEFAULTS"].variants)
    };
}
function getDefaultHeadingElementPersisted() {
    return {
        v: 1,
        defaultVariant: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$elements$2f$element$2d$dev$2d$baseline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEV_NEUTRAL_HEADING_DEFAULTS"].defaultVariant,
        variants: structuredClone(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$elements$2f$element$2d$dev$2d$baseline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEV_NEUTRAL_HEADING_DEFAULTS"].variants)
    };
}
function getProductionHeadingElementPersisted() {
    return {
        v: 1,
        defaultVariant: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$elements$2f$element$2d$dev$2d$baseline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEV_PRODUCTION_HEADING_DEFAULTS"].defaultVariant,
        variants: structuredClone(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$elements$2f$element$2d$dev$2d$baseline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEV_PRODUCTION_HEADING_DEFAULTS"].variants)
    };
}
function getDefaultLinkElementPersisted() {
    return {
        v: 1,
        defaultVariant: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$elements$2f$element$2d$dev$2d$baseline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEV_NEUTRAL_LINK_DEFAULTS"].defaultVariant,
        variants: structuredClone(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$elements$2f$element$2d$dev$2d$baseline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEV_NEUTRAL_LINK_DEFAULTS"].variants)
    };
}
function getProductionLinkElementPersisted() {
    return {
        v: 1,
        defaultVariant: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$elements$2f$element$2d$dev$2d$baseline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEV_PRODUCTION_LINK_DEFAULTS"].defaultVariant,
        variants: structuredClone(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$elements$2f$element$2d$dev$2d$baseline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEV_PRODUCTION_LINK_DEFAULTS"].variants)
    };
}
function createWorkbenchSession(colors, fonts, style, elements) {
    return {
        v: 1,
        colors,
        fonts,
        style,
        elements
    };
}
function getDefaultWorkbenchSession() {
    return createWorkbenchSession((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$colors$2f$color$2d$tool$2d$persistence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultColorToolPersistedV2"])(), getDefaultFontsWorkbenchPrefs(), (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$style$2f$style$2d$tool$2d$persistence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultStyleToolPersistedV2"])(), {
        image: getDefaultImageElementPersisted(),
        body: getDefaultBodyElementPersisted(),
        heading: getDefaultHeadingElementPersisted(),
        link: getDefaultLinkElementPersisted()
    });
}
function getProductionWorkbenchSession() {
    return createWorkbenchSession((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$colors$2f$color$2d$tool$2d$persistence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProductionColorToolPersistedV2"])(), getProductionFontsWorkbenchPrefs(), (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$style$2f$style$2d$tool$2d$persistence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProductionStyleToolPersistedV2"])(), {
        image: getProductionImageElementPersisted(),
        body: getProductionBodyElementPersisted(),
        heading: getProductionHeadingElementPersisted(),
        link: getProductionLinkElementPersisted()
    });
}
function mergeWorkbenchSessionWithDefaults(session) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$workbench$2f$workbench$2d$session$2d$shape$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeWorkbenchSessionShape"])(session, getDefaultWorkbenchSession());
}
function isWorkbenchStorageJsonComplete(raw) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$workbench$2f$workbench$2d$session$2d$shape$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasCompleteWorkbenchStorageShape"])(raw);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/app/dev/workbench/workbench-session-import.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseImportedWorkbenchSessionJson",
    ()=>parseImportedWorkbenchSessionJson
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$colors$2f$color$2d$tool$2d$persistence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/app/dev/colors/color-tool-persistence.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$style$2f$style$2d$tool$2d$persistence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/app/dev/style/style-tool-persistence.ts [app-client] (ecmascript)");
;
;
function isPlainObject(value) {
    return value !== null && typeof value === "object" && !Array.isArray(value);
}
function parseJsonObject(raw) {
    try {
        const parsed = JSON.parse(raw);
        if (!isPlainObject(parsed)) return {
            ok: false,
            error: "Root must be an object"
        };
        if (parsed.v !== 1) return {
            ok: false,
            error: 'Expected "v": 1'
        };
        return {
            ok: true,
            data: parsed
        };
    } catch  {
        return {
            ok: false,
            error: "Invalid JSON"
        };
    }
}
function applyColors(session, data) {
    if (!("colors" in data) || data.colors === undefined) return null;
    const coerced = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$colors$2f$color$2d$tool$2d$persistence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["coerceColorToolPersisted"])(data.colors);
    if (!coerced) return {
        ok: false,
        error: "Invalid colors payload"
    };
    session.colors = coerced;
    return {
        ok: true,
        session
    };
}
function applyFonts(session, data) {
    if (!("fonts" in data) || data.fonts === undefined) return null;
    if (!isPlainObject(data.fonts)) return {
        ok: false,
        error: "fonts must be an object"
    };
    const fonts = data.fonts;
    if (fonts.v !== 1) return {
        ok: false,
        error: "fonts must have v: 1"
    };
    if (!isPlainObject(fonts.configs)) return {
        ok: false,
        error: "fonts.configs must be an object"
    };
    session.fonts = data.fonts;
    return {
        ok: true,
        session
    };
}
function applyStyle(session, data) {
    if (!("style" in data) || data.style === undefined) return null;
    const coerced = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$style$2f$style$2d$tool$2d$persistence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["coerceStyleToolPersisted"])(data.style);
    if (!coerced) return {
        ok: false,
        error: "Invalid style payload"
    };
    session.style = coerced;
    return {
        ok: true,
        session
    };
}
const ELEMENT_IMPORT_KEYS = [
    "image",
    "body",
    "heading",
    "link"
];
function applyElements(session, data) {
    if (!("elements" in data) || data.elements === undefined) return null;
    if (!isPlainObject(data.elements)) return {
        ok: false,
        error: "elements must be an object"
    };
    const incoming = data.elements;
    const elements = {};
    for (const key of ELEMENT_IMPORT_KEYS){
        const value = incoming[key];
        if (value === undefined) continue;
        if (!isPlainObject(value)) return {
            ok: false,
            error: `elements.${key} must be an object`
        };
        elements[key] = value;
    }
    if (Object.keys(elements).length > 0) session.elements = elements;
    return {
        ok: true,
        session
    };
}
function parseImportedWorkbenchSessionJson(raw) {
    const root = parseJsonObject(raw);
    if (!root.ok) return root;
    const session = {
        v: 1
    };
    const checks = [
        applyColors,
        applyFonts,
        applyStyle,
        applyElements
    ];
    for (const apply of checks){
        const result = apply(session, root.data);
        if (result && !result.ok) return result;
    }
    return {
        ok: true,
        session
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/app/dev/workbench/workbench-session-legacy-migration.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "migrateLegacyIntoSession",
    ()=>migrateLegacyIntoSession
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$elements$2f$body$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/app/dev/elements/body/constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$elements$2f$heading$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/app/dev/elements/heading/constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$elements$2f$image$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/app/dev/elements/image/constants.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$elements$2f$link$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/app/dev/elements/link/constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$colors$2f$color$2d$tool$2d$persistence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/app/dev/colors/color-tool-persistence.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$style$2f$style$2d$tool$2d$persistence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/app/dev/style/style-tool-persistence.ts [app-client] (ecmascript)");
;
;
;
;
;
;
const FONT_DEV_LEGACY_STORAGE_KEY = "notlukagray-font-dev-prefs-v1";
function tryParseJson(raw) {
    try {
        return JSON.parse(raw);
    } catch  {
        return undefined;
    }
}
function isLegacyFontsPayload(value) {
    if (!value || typeof value !== "object") return false;
    const candidate = value;
    return candidate.v === 1 && candidate.configs != null && typeof candidate.configs === "object";
}
function migrateLegacyFonts(next) {
    if (next.fonts != null) return false;
    const raw = localStorage.getItem(FONT_DEV_LEGACY_STORAGE_KEY);
    if (!raw) return false;
    const parsed = tryParseJson(raw);
    if (!isLegacyFontsPayload(parsed)) return false;
    next.fonts = parsed;
    return true;
}
function migrateLegacyElement(elements, key, storageKey) {
    if (elements[key] != null) return false;
    const raw = localStorage.getItem(storageKey);
    if (!raw) return false;
    const parsed = tryParseJson(raw);
    if (!parsed || typeof parsed !== "object") return false;
    elements[key] = parsed;
    return true;
}
const LEGACY_ELEMENT_ENTRIES = [
    [
        "image",
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$elements$2f$image$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["STORAGE_KEY"]
    ],
    [
        "body",
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$elements$2f$body$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEY"]
    ],
    [
        "heading",
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$elements$2f$heading$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEY"]
    ],
    [
        "link",
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$elements$2f$link$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEY"]
    ]
];
function applyLegacyGlobalSlices(next) {
    let dirty = false;
    const legacyColors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$colors$2f$color$2d$tool$2d$persistence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readColorToolFromLegacyLocalStorage"])();
    if (next.colors == null && legacyColors) {
        next.colors = legacyColors;
        dirty = true;
    }
    if (migrateLegacyFonts(next)) dirty = true;
    const legacyStyle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$style$2f$style$2d$tool$2d$persistence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readStyleToolFromLegacyLocalStorage"])();
    if (next.style == null && legacyStyle) {
        next.style = legacyStyle;
        dirty = true;
    }
    return dirty;
}
function applyLegacyElements(next, elements) {
    let dirty = false;
    for (const [key, storageKey] of LEGACY_ELEMENT_ENTRIES){
        if (migrateLegacyElement(elements, key, storageKey)) dirty = true;
    }
    if (Object.keys(elements).length > 0) next.elements = elements;
    else delete next.elements;
    return dirty;
}
function migrateLegacyIntoSession(session) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const next = {
        ...session,
        v: 1
    };
    const elements = {
        ...next.elements
    };
    const dirty = applyLegacyGlobalSlices(next) || applyLegacyElements(next, elements);
    Object.assign(session, next);
    return dirty;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/app/dev/workbench/workbench-session.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ALL_WORKBENCH_DEV_STORAGE_KEYS",
    ()=>ALL_WORKBENCH_DEV_STORAGE_KEYS,
    "FONT_DEV_LEGACY_STORAGE_KEY",
    ()=>FONT_DEV_LEGACY_STORAGE_KEY,
    "WORKBENCH_LEGACY_LOCAL_STORAGE_KEYS",
    ()=>WORKBENCH_LEGACY_LOCAL_STORAGE_KEYS,
    "WORKBENCH_SESSION_BOOKMARK_KEY",
    ()=>WORKBENCH_SESSION_BOOKMARK_KEY,
    "WORKBENCH_SESSION_CHANGED_EVENT",
    ()=>WORKBENCH_SESSION_CHANGED_EVENT,
    "WORKBENCH_SESSION_STORAGE_KEY",
    ()=>WORKBENCH_SESSION_STORAGE_KEY,
    "applyImportedWorkbenchSession",
    ()=>applyImportedWorkbenchSession,
    "clearWorkbenchColors",
    ()=>clearWorkbenchColors,
    "clearWorkbenchElement",
    ()=>clearWorkbenchElement,
    "clearWorkbenchFonts",
    ()=>clearWorkbenchFonts,
    "clearWorkbenchLegacyLocalStorageKeys",
    ()=>clearWorkbenchLegacyLocalStorageKeys,
    "clearWorkbenchStyle",
    ()=>clearWorkbenchStyle,
    "dispatchWorkbenchSessionChanged",
    ()=>dispatchWorkbenchSessionChanged,
    "exportWorkbenchSessionJson",
    ()=>exportWorkbenchSessionJson,
    "getWorkbenchSession",
    ()=>getWorkbenchSession,
    "importWorkbenchProductionDefaults",
    ()=>importWorkbenchProductionDefaults,
    "importWorkbenchSessionFromJson",
    ()=>importWorkbenchSessionFromJson,
    "loadWorkbenchBookmark",
    ()=>loadWorkbenchBookmark,
    "patchWorkbenchColors",
    ()=>patchWorkbenchColors,
    "patchWorkbenchElement",
    ()=>patchWorkbenchElement,
    "patchWorkbenchFonts",
    ()=>patchWorkbenchFonts,
    "patchWorkbenchStyle",
    ()=>patchWorkbenchStyle,
    "saveWorkbenchBookmark",
    ()=>saveWorkbenchBookmark,
    "saveWorkbenchSession",
    ()=>saveWorkbenchSession
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$colors$2f$color$2d$tool$2d$persistence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/app/dev/colors/color-tool-persistence.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$elements$2f$body$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/app/dev/elements/body/constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$elements$2f$heading$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/app/dev/elements/heading/constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$elements$2f$image$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/app/dev/elements/image/constants.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$elements$2f$link$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/app/dev/elements/link/constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$workbench$2f$workbench$2d$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/app/dev/workbench/workbench-defaults.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$style$2f$style$2d$tool$2d$persistence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/app/dev/style/style-tool-persistence.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$workbench$2f$workbench$2d$session$2d$import$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/app/dev/workbench/workbench-session-import.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$workbench$2f$workbench$2d$session$2d$legacy$2d$migration$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/app/dev/workbench/workbench-session-legacy-migration.ts [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
const WORKBENCH_SESSION_STORAGE_KEY = "workbench-session-v1";
const WORKBENCH_SESSION_BOOKMARK_KEY = "workbench-session-bookmark-v1";
const WORKBENCH_SESSION_CHANGED_EVENT = "pb-workbench-session-changed";
const FONT_DEV_LEGACY_STORAGE_KEY = "notlukagray-font-dev-prefs-v1";
const WORKBENCH_LEGACY_LOCAL_STORAGE_KEYS = [
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$colors$2f$color$2d$tool$2d$persistence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COLOR_TOOL_LEGACY_STORAGE_KEY"],
    FONT_DEV_LEGACY_STORAGE_KEY,
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$style$2f$style$2d$tool$2d$persistence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STYLE_TOOL_LEGACY_STORAGE_KEY_V1"],
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$style$2f$style$2d$tool$2d$persistence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STYLE_TOOL_LEGACY_STORAGE_KEY_V2"],
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$elements$2f$image$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["STORAGE_KEY"],
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$elements$2f$body$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEY"],
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$elements$2f$heading$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEY"],
    __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$elements$2f$link$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEY"]
];
const ALL_WORKBENCH_DEV_STORAGE_KEYS = [
    WORKBENCH_SESSION_STORAGE_KEY,
    WORKBENCH_SESSION_BOOKMARK_KEY,
    ...WORKBENCH_LEGACY_LOCAL_STORAGE_KEYS
];
function readParsedOnly() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const raw = localStorage.getItem(WORKBENCH_SESSION_STORAGE_KEY);
        if (!raw) return null;
        const p = JSON.parse(raw);
        if (p?.v !== 1) return null;
        return p;
    } catch  {
        return null;
    }
}
function clearWorkbenchLegacyLocalStorageKeys() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    for (const k of WORKBENCH_LEGACY_LOCAL_STORAGE_KEYS){
        try {
            localStorage.removeItem(k);
        } catch  {
        /* ignore */ }
    }
}
function dispatchWorkbenchSessionChanged() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    window.dispatchEvent(new CustomEvent(WORKBENCH_SESSION_CHANGED_EVENT));
}
function applyImportedWorkbenchSession(session) {
    clearWorkbenchLegacyLocalStorageKeys();
    saveWorkbenchSession(session);
    dispatchWorkbenchSessionChanged();
}
function saveWorkbenchBookmark() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const s = getWorkbenchSession();
        localStorage.setItem(WORKBENCH_SESSION_BOOKMARK_KEY, JSON.stringify(s));
    } catch  {
    /* ignore quota / private mode */ }
}
function loadWorkbenchBookmark() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const raw = localStorage.getItem(WORKBENCH_SESSION_BOOKMARK_KEY);
        if (raw == null || raw.trim() === "") return {
            ok: false,
            error: "No saved snapshot yet"
        };
        const r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$workbench$2f$workbench$2d$session$2d$import$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseImportedWorkbenchSessionJson"])(raw);
        if (!r.ok) return r;
        applyImportedWorkbenchSession(r.session);
        return {
            ok: true
        };
    } catch  {
        return {
            ok: false,
            error: "Could not load snapshot"
        };
    }
}
function importWorkbenchSessionFromJson(raw) {
    const r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$workbench$2f$workbench$2d$session$2d$import$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseImportedWorkbenchSessionJson"])(raw);
    if (!r.ok) return r;
    applyImportedWorkbenchSession(r.session);
    return {
        ok: true
    };
}
function importWorkbenchProductionDefaults() {
    applyImportedWorkbenchSession((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$workbench$2f$workbench$2d$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProductionWorkbenchSession"])());
    return {
        ok: true
    };
}
function exportWorkbenchSessionJson() {
    return JSON.stringify(getWorkbenchSession(), null, 2);
}
function saveWorkbenchSession(session) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const complete = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$workbench$2f$workbench$2d$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeWorkbenchSessionWithDefaults"])(session);
    try {
        localStorage.setItem(WORKBENCH_SESSION_STORAGE_KEY, JSON.stringify(complete));
    } catch  {
    /* quota / private mode */ }
}
function getWorkbenchSession() {
    const base = readParsedOnly() ?? {
        v: 1
    };
    const normalized = {
        ...base,
        v: 1
    };
    const migratedDirty = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$workbench$2f$workbench$2d$session$2d$legacy$2d$migration$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["migrateLegacyIntoSession"])(normalized);
    const complete = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$workbench$2f$workbench$2d$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeWorkbenchSessionWithDefaults"])(normalized);
    const raw = ("TURBOPACK compile-time truthy", 1) ? localStorage.getItem(WORKBENCH_SESSION_STORAGE_KEY) : "TURBOPACK unreachable";
    if (migratedDirty || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$workbench$2f$workbench$2d$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isWorkbenchStorageJsonComplete"])(raw)) {
        try {
            localStorage.setItem(WORKBENCH_SESSION_STORAGE_KEY, JSON.stringify(complete));
        } catch  {
        /* ignore */ }
    }
    return complete;
}
function patchWorkbenchColors(next) {
    const s = getWorkbenchSession();
    try {
        localStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$colors$2f$color$2d$tool$2d$persistence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COLOR_TOOL_LEGACY_STORAGE_KEY"]);
    } catch  {
    /* ignore */ }
    saveWorkbenchSession({
        ...s,
        colors: next
    });
}
function clearWorkbenchColors() {
    const s = getWorkbenchSession();
    const d = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$workbench$2f$workbench$2d$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultWorkbenchSession"])();
    try {
        localStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$colors$2f$color$2d$tool$2d$persistence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COLOR_TOOL_LEGACY_STORAGE_KEY"]);
    } catch  {
    /* ignore */ }
    saveWorkbenchSession({
        ...s,
        colors: d.colors
    });
}
function patchWorkbenchStyle(next) {
    const s = getWorkbenchSession();
    try {
        localStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$style$2f$style$2d$tool$2d$persistence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STYLE_TOOL_LEGACY_STORAGE_KEY_V1"]);
        localStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$style$2f$style$2d$tool$2d$persistence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STYLE_TOOL_LEGACY_STORAGE_KEY_V2"]);
    } catch  {
    /* ignore */ }
    saveWorkbenchSession({
        ...s,
        style: next
    });
}
function clearWorkbenchStyle() {
    const s = getWorkbenchSession();
    const d = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$workbench$2f$workbench$2d$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultWorkbenchSession"])();
    try {
        localStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$style$2f$style$2d$tool$2d$persistence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STYLE_TOOL_LEGACY_STORAGE_KEY_V2"]);
        localStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$style$2f$style$2d$tool$2d$persistence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STYLE_TOOL_LEGACY_STORAGE_KEY_V1"]);
    } catch  {
    /* ignore */ }
    saveWorkbenchSession({
        ...s,
        style: d.style
    });
}
function patchWorkbenchFonts(payload) {
    const s = getWorkbenchSession();
    try {
        localStorage.removeItem(FONT_DEV_LEGACY_STORAGE_KEY);
    } catch  {
    /* ignore */ }
    saveWorkbenchSession({
        ...s,
        fonts: payload
    });
}
function clearWorkbenchFonts() {
    const s = getWorkbenchSession();
    const d = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$workbench$2f$workbench$2d$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultWorkbenchSession"])();
    try {
        localStorage.removeItem(FONT_DEV_LEGACY_STORAGE_KEY);
    } catch  {
    /* ignore */ }
    saveWorkbenchSession({
        ...s,
        fonts: d.fonts
    });
}
const ELEMENT_LEGACY_KEYS = {
    image: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$elements$2f$image$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["STORAGE_KEY"],
    body: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$elements$2f$body$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEY"],
    heading: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$elements$2f$heading$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEY"],
    link: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$elements$2f$link$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEY"]
};
function patchWorkbenchElement(key, value) {
    const s = getWorkbenchSession();
    try {
        localStorage.removeItem(ELEMENT_LEGACY_KEYS[key]);
    } catch  {
    /* ignore */ }
    saveWorkbenchSession({
        ...s,
        elements: {
            ...s.elements,
            [key]: value
        }
    });
}
function clearWorkbenchElement(key) {
    const s = getWorkbenchSession();
    const d = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$workbench$2f$workbench$2d$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultWorkbenchSession"])();
    try {
        localStorage.removeItem(ELEMENT_LEGACY_KEYS[key]);
    } catch  {
    /* ignore */ }
    saveWorkbenchSession({
        ...s,
        elements: {
            ...s.elements,
            [key]: d.elements[key]
        }
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/devtools/app-dev/colors/color-tool-export.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildThemeConfigFileExport",
    ()=>buildThemeConfigFileExport
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$theme$2f$pb$2d$color$2d$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/app/theme/pb-color-tokens.ts [app-client] (ecmascript)");
;
function buildThemeConfigFileExport(light, dark) {
    const fmtObj = (name, rec)=>{
        const lines = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$theme$2f$pb$2d$color$2d$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["M1_TOKEN_IDS"].map((id)=>`  ${JSON.stringify(id)}: ${JSON.stringify(rec[id])},`).join("\n");
        return `export const ${name} = {\n${lines}\n} as const satisfies Record<M1TokenId, string>;`;
    };
    const pbInlineFn = [
        "export function pbBrandCssInline(): string {",
        '  const lightDerived = derivePbThemeTokens(pbBrandLight, "light");',
        '  const darkDerived = derivePbThemeTokens(pbBrandDark, "dark");',
        "  const rootLines = [",
        "    ...M1_TOKEN_IDS.map((id) => `  ${id}: ${pbBrandLight[id]};`),",
        "    ...PB_DERIVED_TOKEN_IDS.map((id) => `  ${id}: ${lightDerived[id]};`),",
        '  ].join("\\n");',
        "  const darkLines = [",
        "    ...M1_TOKEN_IDS.map((id) => `  ${id}: ${pbBrandDark[id]};`),",
        "    ...PB_DERIVED_TOKEN_IDS.map((id) => `  ${id}: ${darkDerived[id]};`),",
        '  ].join("\\n");',
        "  return " + "`" + ":root {\\n${rootLines}\\n}\\n\\n.dark {\\n${darkLines}\\n}" + "`" + ";",
        "}"
    ].join("\n");
    return [
        `import type { M1TokenId } from "@/app/theme/pb-color-tokens";`,
        `import { M1_TOKEN_IDS } from "@/app/theme/pb-color-tokens";`,
        `import { derivePbThemeTokens, PB_DERIVED_TOKEN_IDS } from "@/app/theme/pb-color-derived-tokens";`,
        "",
        "/**",
        " * Brand + link seeds for light UI. Edit via `/dev/colors` → copy replaces this file.",
        " * Extended surfaces/status/chart/sidebar tokens derive from these seeds at runtime.",
        " */",
        fmtObj("pbBrandLight", light),
        "",
        fmtObj("pbBrandDark", dark),
        "",
        "/** Emits `:root` / `.dark` blocks; injected at start of `<body>` so it overrides `globals.css`. */",
        pbInlineFn,
        ""
    ].join("\n");
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/app/dev/_components/dev-reset.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEV_TOOL_STORAGE_KEYS",
    ()=>DEV_TOOL_STORAGE_KEYS,
    "clearDevToolStorage",
    ()=>clearDevToolStorage,
    "confirmAndClearAllDevToolStorage",
    ()=>confirmAndClearAllDevToolStorage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$workbench$2f$workbench$2d$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/app/dev/workbench/workbench-session.ts [app-client] (ecmascript)");
"use client";
;
const DEV_TOOL_STORAGE_KEYS = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$workbench$2f$workbench$2d$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ALL_WORKBENCH_DEV_STORAGE_KEYS"];
function clearDevToolStorage(keys) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    for (const key of keys){
        try {
            localStorage.removeItem(key);
        } catch  {
        /* ignore private-mode/quota errors */ }
    }
}
function confirmAndClearAllDevToolStorage() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const ok = window.confirm("Total reset will clear all dev setup work: colors, typography, style, workbench session + bookmark, and element defaults (image, body, heading, link) saved in this browser. Neutral dev baselines will load on next open. This cannot be undone. Continue?");
    if (!ok) return false;
    clearDevToolStorage(DEV_TOOL_STORAGE_KEYS);
    return true;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/app/dev/elements/element-dev-registry.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* eslint-disable max-lines */ __turbopack_context__.s([
    "ELEMENT_DEV_BATCH_META",
    ()=>ELEMENT_DEV_BATCH_META,
    "ELEMENT_DEV_BATCH_ORDER",
    ()=>ELEMENT_DEV_BATCH_ORDER,
    "ELEMENT_DEV_ENTRIES",
    ()=>ELEMENT_DEV_ENTRIES,
    "getElementDevEntryBySlug",
    ()=>getElementDevEntryBySlug,
    "getElementDevPath",
    ()=>getElementDevPath,
    "groupElementDevEntriesByBatch",
    ()=>groupElementDevEntriesByBatch
]);
const ELEMENT_DEV_BATCH_META = {
    "batch-1-content": {
        label: "Batch 1 · Content",
        blurb: "Heading, body, and link defaults establish the baseline reading system."
    },
    "batch-2-interaction": {
        label: "Batch 2 · Interaction",
        blurb: "Buttons and form controls define baseline interaction behavior."
    },
    "batch-3-media": {
        label: "Batch 3 · Media",
        blurb: "Image/video defaults align media presentation and playback behavior."
    },
    "batch-4-graphics": {
        label: "Batch 4 · Graphics + Motion",
        blurb: "Vector/SVG/3D/Rive defaults govern visual and motion-heavy elements."
    },
    "batch-5-utility": {
        label: "Batch 5 · Utility",
        blurb: "Supporting utility elements that complete builder ergonomics."
    }
};
const ELEMENT_DEV_BATCH_ORDER = [
    "batch-1-content",
    "batch-2-interaction",
    "batch-3-media",
    "batch-4-graphics",
    "batch-5-utility"
];
function defineEntry(seed) {
    return {
        ...seed,
        editor: seed.editor ?? {
            kind: "placeholder"
        },
        status: seed.status ?? "scaffold"
    };
}
const ELEMENT_DEV_ENTRIES = [
    defineEntry({
        slug: "heading",
        type: "elementHeading",
        navLabel: "Heading",
        title: "Elements · Heading",
        description: "Heading variants (display / section / label), live preview, layout + runtime passthrough, and JSON export.",
        note: "Variant defaults start from the dev neutral foundation baseline.",
        batch: "batch-1-content",
        editor: {
            kind: "headingDev"
        },
        status: "live"
    }),
    defineEntry({
        slug: "body",
        type: "elementBody",
        navLabel: "Body",
        title: "Elements · Body",
        description: "Body variants (lead / standard / fine), typography level, preview, and export — defaults start from the dev neutral foundation baseline.",
        batch: "batch-1-content",
        editor: {
            kind: "bodyDev"
        },
        status: "live"
    }),
    defineEntry({
        slug: "link",
        type: "elementLink",
        navLabel: "Link",
        title: "Elements · Link",
        description: "Link variants (inline / emphasis / nav), body vs heading copy, link color tokens, preview, and export — defaults start from the dev neutral foundation baseline.",
        batch: "batch-1-content",
        editor: {
            kind: "linkDev"
        },
        status: "live"
    }),
    defineEntry({
        slug: "button",
        type: "elementButton",
        navLabel: "Button",
        title: "Elements · Button",
        description: "Button defaults define baseline spacing and radius for wrapper-less button chrome.",
        note: "Typography styles are still chosen in Foundations → Fonts.",
        batch: "batch-2-interaction",
        editor: {
            kind: "buttonDev"
        },
        status: "live"
    }),
    defineEntry({
        slug: "rich-text",
        type: "elementRichText",
        navLabel: "Rich Text",
        title: "Elements · Rich Text",
        description: "Rich text defaults set rhythm and readability for content blocks when local overrides are not set.",
        batch: "batch-1-content",
        editor: {
            kind: "richTextDev"
        },
        status: "live"
    }),
    defineEntry({
        slug: "image",
        type: "elementImage",
        navLabel: "Image",
        title: "Elements · Image",
        description: "Image defaults will be configured here (radius, object fit, base image behavior, and entry/exit motion presets).",
        note: "Variants focus on builder image usage (hero/inline/full-cover/feature). SVG/vector can handle logo/icon cases.",
        batch: "batch-3-media",
        editor: {
            kind: "imageVariants"
        },
        status: "live"
    }),
    defineEntry({
        slug: "video",
        type: "elementVideo",
        navLabel: "Video",
        title: "Elements · Video",
        description: "Video defaults (object fit, aspect ratio, playback flags, and layout framing) for inline, full-cover, and hero use cases.",
        note: "Variant defaults start from the dev neutral foundation baseline.",
        batch: "batch-3-media",
        editor: {
            kind: "videoDev"
        },
        status: "live"
    }),
    defineEntry({
        slug: "video-time",
        type: "elementVideoTime",
        navLabel: "Video Time",
        title: "Elements · Video Time",
        description: "Video time defaults (layout sizing and motion) for the time display element inside custom video player layouts.",
        note: "Content is fully driven by VideoControlContext at runtime.",
        batch: "batch-3-media",
        editor: {
            kind: "videoTimeDev"
        },
        status: "live"
    }),
    defineEntry({
        slug: "vector",
        type: "elementVector",
        navLabel: "Vector",
        title: "Elements · Vector",
        description: "Vector defaults: color behavior, viewBox, shapes, scaling, and motion. Variant defaults start from neutral dev baseline.",
        batch: "batch-4-graphics",
        editor: {
            kind: "vectorDev"
        },
        status: "live"
    }),
    defineEntry({
        slug: "svg",
        type: "elementSVG",
        navLabel: "SVG",
        title: "Elements · SVG",
        description: "SVG defaults: raw markup rendering, transforms, and motion presets. Variant defaults start from neutral dev baseline.",
        batch: "batch-4-graphics",
        editor: {
            kind: "svgDev"
        },
        status: "live"
    }),
    defineEntry({
        slug: "input",
        type: "elementInput",
        navLabel: "Input",
        title: "Elements · Input",
        description: "Input variants (default / compact / minimal), placeholder, icon toggle, color, layout, and export. Interactive preview lets you type in the field.",
        batch: "batch-2-interaction",
        editor: {
            kind: "inputDev"
        },
        status: "live"
    }),
    defineEntry({
        slug: "range",
        type: "elementRange",
        navLabel: "Range",
        title: "Elements · Range",
        description: "Range slider variants (default / slim / accent) with track/fill/thumb styling, min/max/step, and interactive preview.",
        batch: "batch-2-interaction",
        editor: {
            kind: "rangeDev"
        },
        status: "live"
    }),
    defineEntry({
        slug: "spacer",
        type: "elementSpacer",
        navLabel: "Spacer",
        title: "Elements · Spacer",
        description: "Spacer variants (sm / md / lg) for layout rhythm. Preview shows the spacer height with a dashed guide alongside adjacent content blocks.",
        batch: "batch-5-utility",
        editor: {
            kind: "spacerDev"
        },
        status: "live"
    }),
    defineEntry({
        slug: "scroll-progress-bar",
        type: "elementScrollProgressBar",
        navLabel: "Scroll Progress",
        title: "Elements · Scroll Progress Bar",
        description: "Progress bar variants (default / minimal / bold) with height, fill, and track colors. Preview shows the bar at a static fill to visualise the style.",
        batch: "batch-5-utility",
        editor: {
            kind: "scrollProgressBarDev"
        },
        status: "live"
    }),
    defineEntry({
        slug: "model-3d",
        type: "elementModel3D",
        navLabel: "Model 3D",
        title: "Elements · Model 3D",
        description: "3D model defaults: animation behavior, layout framing, and baseline presentation. Deep scene/model config is authored in the Custom JSON panel.",
        note: "Live preview requires a real .glb file reference — use Custom JSON to paste a full element block.",
        batch: "batch-4-graphics",
        editor: {
            kind: "model3dDev"
        },
        status: "live"
    }),
    defineEntry({
        slug: "rive",
        type: "elementRive",
        navLabel: "Rive",
        title: "Elements · Rive",
        description: "Rive defaults: state machine wiring, playback defaults, fit mode, aspect ratio, and animation behavior.",
        note: "Live preview requires a real .riv file reference — use Custom JSON to paste a full element block.",
        batch: "batch-4-graphics",
        editor: {
            kind: "riveDev"
        },
        status: "live"
    })
];
function getElementDevEntryBySlug(slug) {
    return ELEMENT_DEV_ENTRIES.find((entry)=>entry.slug === slug) ?? null;
}
function getElementDevPath(slug) {
    return `/dev/elements/${slug}`;
}
function groupElementDevEntriesByBatch() {
    return ELEMENT_DEV_ENTRIES.reduce((acc, entry)=>{
        acc[entry.batch].push(entry);
        return acc;
    }, {
        "batch-1-content": [],
        "batch-2-interaction": [],
        "batch-3-media": [],
        "batch-4-graphics": [],
        "batch-5-utility": []
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/app/dev/_components/dev-workbench-nav-groups.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEV_WORKBENCH_NAV_GROUPS",
    ()=>DEV_WORKBENCH_NAV_GROUPS,
    "DevWorkbenchNavDropdown",
    ()=>DevWorkbenchNavDropdown
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$elements$2f$element$2d$dev$2d$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/app/dev/elements/element-dev-registry.ts [app-client] (ecmascript)");
;
;
;
;
const DEV_WORKBENCH_NAV_GROUPS = [
    {
        title: "Foundations",
        items: [
            {
                label: "Color",
                href: "/dev/colors"
            },
            {
                label: "Fonts",
                href: "/dev/fonts"
            },
            {
                label: "Style",
                href: "/dev/style"
            }
        ]
    },
    {
        title: "Layout",
        items: [
            {
                label: "Pages",
                href: "/dev/layout/pages"
            },
            {
                label: "Sections",
                href: "/dev/layout/sections"
            },
            {
                label: "Frames",
                href: "/dev/layout/frames"
            }
        ]
    },
    {
        title: "Elements",
        items: [
            {
                label: "All Elements",
                href: "/dev/elements"
            },
            ...__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$elements$2f$element$2d$dev$2d$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ELEMENT_DEV_ENTRIES"].map((entry)=>({
                    label: entry.navLabel,
                    href: `/dev/elements/${entry.slug}`
                }))
        ]
    },
    {
        title: "Preview",
        items: [
            {
                label: "Test Page",
                href: "/dev/test"
            },
            {
                label: "Style Guide",
                href: "/style-guide"
            }
        ]
    },
    {
        title: "Builder",
        wip: true,
        items: [
            {
                label: "Modules (WIP)",
                disabled: true
            },
            {
                label: "Modals (WIP)",
                disabled: true
            }
        ]
    }
];
function isActivePath(pathname, href) {
    if (pathname === href) return true;
    return href !== "/" && pathname.startsWith(`${href}/`);
}
function DevWorkbenchNavDropdown(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(15);
    if ($[0] !== "c5133f8ec7d4c0a3eb32229ad3797c4031e6e24ca07c33d759f45b84aae03f6c") {
        for(let $i = 0; $i < 15; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "c5133f8ec7d4c0a3eb32229ad3797c4031e6e24ca07c33d759f45b84aae03f6c";
    }
    const { group, pathname } = t0;
    const groupIsActive = group.items.some({
        "DevWorkbenchNavDropdown[group.items.some()]": (item)=>!!item.href && isActivePath(pathname, item.href)
    }["DevWorkbenchNavDropdown[group.items.some()]"]);
    const t1 = `list-none cursor-pointer rounded border px-3 py-1.5 text-[11px] font-mono transition-colors ${groupIsActive ? "border-foreground/40 bg-foreground/10 text-foreground" : "border-border bg-background text-foreground hover:bg-muted/60"}`;
    const t2 = group.wip ? " (WIP)" : "";
    let t3;
    if ($[1] !== group.title || $[2] !== t1 || $[3] !== t2) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("summary", {
            className: t1,
            children: [
                group.title,
                t2
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/app/dev/_components/dev-workbench-nav-groups.tsx",
            lineNumber: 90,
            columnNumber: 10
        }, this);
        $[1] = group.title;
        $[2] = t1;
        $[3] = t2;
        $[4] = t3;
    } else {
        t3 = $[4];
    }
    let t4;
    if ($[5] !== group.items || $[6] !== pathname) {
        let t5;
        if ($[8] !== pathname) {
            t5 = ({
                "DevWorkbenchNavDropdown[group.items.map()]": (item_0)=>{
                    if (!item_0.href || item_0.disabled) {
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "inline-flex items-center rounded border border-border/60 px-2.5 py-1.5 text-[11px] font-mono text-muted-foreground",
                            children: item_0.label
                        }, item_0.label, false, {
                            fileName: "[project]/apps/web/src/app/dev/_components/dev-workbench-nav-groups.tsx",
                            lineNumber: 105,
                            columnNumber: 20
                        }, this);
                    }
                    const active = isActivePath(pathname, item_0.href);
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: item_0.href,
                        className: `inline-flex items-center rounded border px-2.5 py-1.5 text-[11px] font-mono transition-colors ${active ? "border-foreground/40 bg-foreground/10 text-foreground" : "border-border text-muted-foreground hover:bg-muted/60 hover:text-foreground"}`,
                        children: item_0.label
                    }, item_0.href, false, {
                        fileName: "[project]/apps/web/src/app/dev/_components/dev-workbench-nav-groups.tsx",
                        lineNumber: 108,
                        columnNumber: 18
                    }, this);
                }
            })["DevWorkbenchNavDropdown[group.items.map()]"];
            $[8] = pathname;
            $[9] = t5;
        } else {
            t5 = $[9];
        }
        t4 = group.items.map(t5);
        $[5] = group.items;
        $[6] = pathname;
        $[7] = t4;
    } else {
        t4 = $[7];
    }
    let t5;
    if ($[10] !== t4) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute left-0 top-full z-40 mt-1 min-w-44 rounded-md border border-border bg-background/95 p-1.5 shadow-lg backdrop-blur",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-1",
                children: t4
            }, void 0, false, {
                fileName: "[project]/apps/web/src/app/dev/_components/dev-workbench-nav-groups.tsx",
                lineNumber: 125,
                columnNumber: 150
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/web/src/app/dev/_components/dev-workbench-nav-groups.tsx",
            lineNumber: 125,
            columnNumber: 10
        }, this);
        $[10] = t4;
        $[11] = t5;
    } else {
        t5 = $[11];
    }
    let t6;
    if ($[12] !== t3 || $[13] !== t5) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("details", {
            className: "relative",
            children: [
                t3,
                t5
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/app/dev/_components/dev-workbench-nav-groups.tsx",
            lineNumber: 133,
            columnNumber: 10
        }, this);
        $[12] = t3;
        $[13] = t5;
        $[14] = t6;
    } else {
        t6 = $[14];
    }
    return t6;
}
_c = DevWorkbenchNavDropdown;
var _c;
__turbopack_context__.k.register(_c, "DevWorkbenchNavDropdown");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/app/dev/_components/DevWorkbenchNav.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DevWorkbenchNav",
    ()=>DevWorkbenchNav
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$_components$2f$dev$2d$reset$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/app/dev/_components/dev-reset.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$_components$2f$dev$2d$workbench$2d$nav$2d$groups$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/app/dev/_components/dev-workbench-nav-groups.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$workbench$2f$workbench$2d$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/app/dev/workbench/workbench-session.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const persistBtnClass = "inline-flex items-center rounded border px-2.5 py-1.5 text-[11px] font-mono transition-colors border-border text-muted-foreground hover:bg-muted/60 hover:text-foreground";
function DevWorkbenchNav(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(38);
    if ($[0] !== "c53ffcfc41402ad7921dfa5b24bb52bafab323f4262f720897347e178667ba68") {
        for(let $i = 0; $i < 38; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "c53ffcfc41402ad7921dfa5b24bb52bafab323f4262f720897347e178667ba68";
    }
    const { onResetSection, onTotalReset } = t0;
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])() ?? "";
    const [flash, setFlash] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const importRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const flashTimerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = ({
            "DevWorkbenchNav[showFlash]": (next)=>{
                if (flashTimerRef.current) {
                    clearTimeout(flashTimerRef.current);
                }
                setFlash(next);
                if (next) {
                    flashTimerRef.current = setTimeout({
                        "DevWorkbenchNav[showFlash > setTimeout()]": ()=>setFlash(null)
                    }["DevWorkbenchNav[showFlash > setTimeout()]"], 4500);
                }
            }
        })["DevWorkbenchNav[showFlash]"];
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    const showFlash = t1;
    let t2;
    let t3;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = ({
            "DevWorkbenchNav[useEffect()]": ()=>()=>{
                    if (flashTimerRef.current) {
                        clearTimeout(flashTimerRef.current);
                    }
                }
        })["DevWorkbenchNav[useEffect()]"];
        t3 = [];
        $[2] = t2;
        $[3] = t3;
    } else {
        t2 = $[2];
        t3 = $[3];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t2, t3);
    let t4;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = ({
            "DevWorkbenchNav[onSaveBookmark]": ()=>{
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$workbench$2f$workbench$2d$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveWorkbenchBookmark"])();
                showFlash({
                    kind: "success",
                    text: "Snapshot saved in this browser"
                });
            }
        })["DevWorkbenchNav[onSaveBookmark]"];
        $[4] = t4;
    } else {
        t4 = $[4];
    }
    const onSaveBookmark = t4;
    let t5;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = ({
            "DevWorkbenchNav[onLoadBookmark]": ()=>{
                const r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$workbench$2f$workbench$2d$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadWorkbenchBookmark"])();
                if (r.ok) {
                    showFlash({
                        kind: "success",
                        text: "Snapshot loaded"
                    });
                } else {
                    showFlash({
                        kind: "error",
                        text: r.error
                    });
                }
            }
        })["DevWorkbenchNav[onLoadBookmark]"];
        $[5] = t5;
    } else {
        t5 = $[5];
    }
    const onLoadBookmark = t5;
    let t6;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = ({
            "DevWorkbenchNav[onExport]": ()=>{
                try {
                    const text = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$workbench$2f$workbench$2d$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["exportWorkbenchSessionJson"])();
                    const blob = new Blob([
                        text
                    ], {
                        type: "application/json"
                    });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "workbench-session.json";
                    a.click();
                    URL.revokeObjectURL(url);
                    showFlash({
                        kind: "success",
                        text: "Session file saved"
                    });
                } catch  {
                    showFlash({
                        kind: "error",
                        text: "Could not export file"
                    });
                }
            }
        })["DevWorkbenchNav[onExport]"];
        $[6] = t6;
    } else {
        t6 = $[6];
    }
    const onExport = t6;
    let t7;
    if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = ({
            "DevWorkbenchNav[onPickImport]": ()=>importRef.current?.click()
        })["DevWorkbenchNav[onPickImport]"];
        $[7] = t7;
    } else {
        t7 = $[7];
    }
    const onPickImport = t7;
    let t8;
    if ($[8] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = ({
            "DevWorkbenchNav[onImportProduction]": ()=>{
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$workbench$2f$workbench$2d$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["importWorkbenchProductionDefaults"])();
                showFlash({
                    kind: "success",
                    text: "Loaded current production defaults"
                });
            }
        })["DevWorkbenchNav[onImportProduction]"];
        $[8] = t8;
    } else {
        t8 = $[8];
    }
    const onImportProduction = t8;
    let t9;
    if ($[9] === Symbol.for("react.memo_cache_sentinel")) {
        t9 = ({
            "DevWorkbenchNav[onImportFile]": (e)=>{
                const file = e.target.files?.[0];
                e.target.value = "";
                if (!file) {
                    return;
                }
                const reader = new FileReader();
                reader.onload = ()=>{
                    const text_0 = typeof reader.result === "string" ? reader.result : "";
                    const r_0 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$workbench$2f$workbench$2d$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["importWorkbenchSessionFromJson"])(text_0);
                    if (r_0.ok) {
                        showFlash({
                            kind: "success",
                            text: "Session imported"
                        });
                    } else {
                        showFlash({
                            kind: "error",
                            text: r_0.error
                        });
                    }
                };
                reader.onerror = ()=>showFlash({
                        kind: "error",
                        text: "Could not read file"
                    });
                reader.readAsText(file);
            }
        })["DevWorkbenchNav[onImportFile]"];
        $[9] = t9;
    } else {
        t9 = $[9];
    }
    const onImportFile = t9;
    let t10;
    if ($[10] !== pathname) {
        t10 = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$_components$2f$dev$2d$workbench$2d$nav$2d$groups$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEV_WORKBENCH_NAV_GROUPS"].map({
            "DevWorkbenchNav[DEV_WORKBENCH_NAV_GROUPS.map()]": (group)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$_components$2f$dev$2d$workbench$2d$nav$2d$groups$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DevWorkbenchNavDropdown"], {
                    group: group,
                    pathname: pathname
                }, group.title, false, {
                    fileName: "[project]/apps/web/src/app/dev/_components/DevWorkbenchNav.tsx",
                    lineNumber: 209,
                    columnNumber: 67
                }, this)
        }["DevWorkbenchNav[DEV_WORKBENCH_NAV_GROUPS.map()]"]);
        $[10] = pathname;
        $[11] = t10;
    } else {
        t10 = $[11];
    }
    let t11;
    if ($[12] !== t10) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-wrap items-center gap-2",
            children: t10
        }, void 0, false, {
            fileName: "[project]/apps/web/src/app/dev/_components/DevWorkbenchNav.tsx",
            lineNumber: 218,
            columnNumber: 11
        }, this);
        $[12] = t10;
        $[13] = t11;
    } else {
        t11 = $[13];
    }
    let t12;
    let t13;
    let t14;
    let t15;
    let t16;
    let t17;
    if ($[14] === Symbol.for("react.memo_cache_sentinel")) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            onClick: onSaveBookmark,
            className: persistBtnClass,
            title: "Save current dev workbench session to a named slot in this browser",
            children: "Save"
        }, void 0, false, {
            fileName: "[project]/apps/web/src/app/dev/_components/DevWorkbenchNav.tsx",
            lineNumber: 231,
            columnNumber: 11
        }, this);
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            onClick: onLoadBookmark,
            className: persistBtnClass,
            title: "Restore the last Save snapshot (overwrites live session)",
            children: "Load"
        }, void 0, false, {
            fileName: "[project]/apps/web/src/app/dev/_components/DevWorkbenchNav.tsx",
            lineNumber: 232,
            columnNumber: 11
        }, this);
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            onClick: onExport,
            className: persistBtnClass,
            title: "Download workbench session as a JSON file",
            children: "Export"
        }, void 0, false, {
            fileName: "[project]/apps/web/src/app/dev/_components/DevWorkbenchNav.tsx",
            lineNumber: 233,
            columnNumber: 11
        }, this);
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            onClick: onPickImport,
            className: persistBtnClass,
            title: "Replace live session from a JSON file (invalid files are rejected)",
            "aria-label": "Import workbench session JSON file",
            children: "Import"
        }, void 0, false, {
            fileName: "[project]/apps/web/src/app/dev/_components/DevWorkbenchNav.tsx",
            lineNumber: 234,
            columnNumber: 11
        }, this);
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            onClick: onImportProduction,
            className: persistBtnClass,
            title: "Replace live session using current production config defaults",
            children: "Import Prod"
        }, void 0, false, {
            fileName: "[project]/apps/web/src/app/dev/_components/DevWorkbenchNav.tsx",
            lineNumber: 235,
            columnNumber: 11
        }, this);
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            ref: importRef,
            type: "file",
            accept: "application/json,.json",
            className: "sr-only",
            tabIndex: -1,
            onChange: onImportFile,
            "aria-hidden": true
        }, void 0, false, {
            fileName: "[project]/apps/web/src/app/dev/_components/DevWorkbenchNav.tsx",
            lineNumber: 236,
            columnNumber: 11
        }, this);
        $[14] = t12;
        $[15] = t13;
        $[16] = t14;
        $[17] = t15;
        $[18] = t16;
        $[19] = t17;
    } else {
        t12 = $[14];
        t13 = $[15];
        t14 = $[16];
        t15 = $[17];
        t16 = $[18];
        t17 = $[19];
    }
    const t18 = !onResetSection;
    const t19 = `inline-flex items-center rounded border px-3 py-1.5 text-[11px] font-mono transition-colors ${onResetSection ? "border-border text-muted-foreground hover:bg-muted/60 hover:text-foreground" : "cursor-not-allowed border-border/50 text-muted-foreground/50"}`;
    const t20 = onResetSection ? "Reset this section only" : "No local state in this section yet";
    let t21;
    if ($[20] !== onResetSection || $[21] !== t18 || $[22] !== t19 || $[23] !== t20) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            onClick: onResetSection,
            disabled: t18,
            className: t19,
            title: t20,
            children: "Reset Section"
        }, void 0, false, {
            fileName: "[project]/apps/web/src/app/dev/_components/DevWorkbenchNav.tsx",
            lineNumber: 256,
            columnNumber: 11
        }, this);
        $[20] = onResetSection;
        $[21] = t18;
        $[22] = t19;
        $[23] = t20;
        $[24] = t21;
    } else {
        t21 = $[24];
    }
    let t22;
    if ($[25] !== onTotalReset) {
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            onClick: {
                "DevWorkbenchNav[<button>.onClick]": ()=>{
                    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$_components$2f$dev$2d$reset$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["confirmAndClearAllDevToolStorage"])()) {
                        return;
                    }
                    onTotalReset?.();
                }
            }["DevWorkbenchNav[<button>.onClick]"],
            className: "inline-flex items-center rounded border border-destructive/40 bg-background px-3 py-1.5 text-[11px] font-mono text-destructive transition-colors hover:bg-destructive/10 hover:text-destructive",
            title: "Clear workbench session, bookmark, and all legacy dev keys",
            children: "Total reset"
        }, void 0, false, {
            fileName: "[project]/apps/web/src/app/dev/_components/DevWorkbenchNav.tsx",
            lineNumber: 267,
            columnNumber: 11
        }, this);
        $[25] = onTotalReset;
        $[26] = t22;
    } else {
        t22 = $[26];
    }
    let t23;
    if ($[27] !== t21 || $[28] !== t22) {
        t23 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-wrap items-center justify-end gap-2",
            children: [
                t12,
                t13,
                t14,
                t15,
                t16,
                t17,
                t21,
                t22
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/app/dev/_components/DevWorkbenchNav.tsx",
            lineNumber: 282,
            columnNumber: 11
        }, this);
        $[27] = t21;
        $[28] = t22;
        $[29] = t23;
    } else {
        t23 = $[29];
    }
    let t24;
    if ($[30] !== flash) {
        t24 = flash ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            role: "status",
            className: `text-right text-[11px] font-mono leading-snug ${flash.kind === "error" ? "text-destructive" : "text-emerald-800 dark:text-emerald-400"}`,
            children: flash.text
        }, void 0, false, {
            fileName: "[project]/apps/web/src/app/dev/_components/DevWorkbenchNav.tsx",
            lineNumber: 291,
            columnNumber: 19
        }, this) : null;
        $[30] = flash;
        $[31] = t24;
    } else {
        t24 = $[31];
    }
    let t25;
    if ($[32] !== t23 || $[33] !== t24) {
        t25 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-stretch gap-2 sm:items-end",
            children: [
                t23,
                t24
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/app/dev/_components/DevWorkbenchNav.tsx",
            lineNumber: 299,
            columnNumber: 11
        }, this);
        $[32] = t23;
        $[33] = t24;
        $[34] = t25;
    } else {
        t25 = $[34];
    }
    let t26;
    if ($[35] !== t11 || $[36] !== t25) {
        t26 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
            className: "mb-6 w-full rounded-lg border border-border/80 bg-card/20 p-3",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-3 md:flex-row md:items-center md:justify-between",
                children: [
                    t11,
                    t25
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/app/dev/_components/DevWorkbenchNav.tsx",
                lineNumber: 308,
                columnNumber: 90
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/web/src/app/dev/_components/DevWorkbenchNav.tsx",
            lineNumber: 308,
            columnNumber: 11
        }, this);
        $[35] = t11;
        $[36] = t25;
        $[37] = t26;
    } else {
        t26 = $[37];
    }
    return t26;
}
_s(DevWorkbenchNav, "6a3G3PsMnPol2fz1LtHY9VeXQx0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = DevWorkbenchNav;
var _c;
__turbopack_context__.k.register(_c, "DevWorkbenchNav");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/app/dev/_components/DevWorkbenchPageHeader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DevWorkbenchPageHeader",
    ()=>DevWorkbenchPageHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
;
;
const DEFAULT_EYEBROW = "Dev · Workbench";
function DevWorkbenchPageHeader(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(14);
    if ($[0] !== "6f55b5a1644f804e03b22d38bf546812357b54aae8f513dad32d7a88da0df867") {
        for(let $i = 0; $i < 14; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "6f55b5a1644f804e03b22d38bf546812357b54aae8f513dad32d7a88da0df867";
    }
    const { eyebrow: t1, title, description, meta } = t0;
    const eyebrow = t1 === undefined ? DEFAULT_EYEBROW : t1;
    let t2;
    if ($[1] !== eyebrow) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "font-mono text-[11px] uppercase tracking-wide text-muted-foreground",
            children: eyebrow
        }, void 0, false, {
            fileName: "[project]/apps/web/src/app/dev/_components/DevWorkbenchPageHeader.tsx",
            lineNumber: 34,
            columnNumber: 10
        }, this);
        $[1] = eyebrow;
        $[2] = t2;
    } else {
        t2 = $[2];
    }
    let t3;
    if ($[3] !== title) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
            className: "text-2xl font-semibold tracking-tight text-foreground",
            children: title
        }, void 0, false, {
            fileName: "[project]/apps/web/src/app/dev/_components/DevWorkbenchPageHeader.tsx",
            lineNumber: 42,
            columnNumber: 10
        }, this);
        $[3] = title;
        $[4] = t3;
    } else {
        t3 = $[4];
    }
    let t4;
    if ($[5] !== description) {
        t4 = description ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-3xl text-sm leading-relaxed text-muted-foreground [&_strong]:font-semibold [&_strong]:text-foreground/90 [&_code]:font-mono [&_code]:text-[13px]",
            children: description
        }, void 0, false, {
            fileName: "[project]/apps/web/src/app/dev/_components/DevWorkbenchPageHeader.tsx",
            lineNumber: 50,
            columnNumber: 24
        }, this) : null;
        $[5] = description;
        $[6] = t4;
    } else {
        t4 = $[6];
    }
    let t5;
    if ($[7] !== meta) {
        t5 = meta ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-3xl text-[11px] leading-relaxed text-muted-foreground [&_code]:font-mono [&_code]:text-[0.95em] [&_strong]:font-semibold [&_strong]:text-foreground/90",
            children: meta
        }, void 0, false, {
            fileName: "[project]/apps/web/src/app/dev/_components/DevWorkbenchPageHeader.tsx",
            lineNumber: 58,
            columnNumber: 17
        }, this) : null;
        $[7] = meta;
        $[8] = t5;
    } else {
        t5 = $[8];
    }
    let t6;
    if ($[9] !== t2 || $[10] !== t3 || $[11] !== t4 || $[12] !== t5) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
            className: "space-y-2 pb-6",
            children: [
                t2,
                t3,
                t4,
                t5
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/app/dev/_components/DevWorkbenchPageHeader.tsx",
            lineNumber: 66,
            columnNumber: 10
        }, this);
        $[9] = t2;
        $[10] = t3;
        $[11] = t4;
        $[12] = t5;
        $[13] = t6;
    } else {
        t6 = $[13];
    }
    return t6;
}
_c = DevWorkbenchPageHeader;
var _c;
__turbopack_context__.k.register(_c, "DevWorkbenchPageHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/app/dev/_components/DevWorkbenchPageShell.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DevWorkbenchPageShell",
    ()=>DevWorkbenchPageShell
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
;
;
function DevWorkbenchPageShell(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(4);
    if ($[0] !== "d4112dc7f372bd2ecef0e74505badc565dbd17cfa76c0a33f10456a8ea3e49ba") {
        for(let $i = 0; $i < 4; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "d4112dc7f372bd2ecef0e74505badc565dbd17cfa76c0a33f10456a8ea3e49ba";
    }
    const { nav, children } = t0;
    let t1;
    if ($[1] !== children || $[2] !== nav) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "min-h-screen overflow-x-auto bg-background text-foreground",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto w-full min-w-[768px] max-w-[1520px] px-6 py-8 md:px-10 md:py-10 lg:px-14 lg:py-12",
                children: [
                    nav,
                    children
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/app/dev/_components/DevWorkbenchPageShell.tsx",
                lineNumber: 24,
                columnNumber: 87
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/web/src/app/dev/_components/DevWorkbenchPageShell.tsx",
            lineNumber: 24,
            columnNumber: 10
        }, this);
        $[1] = children;
        $[2] = nav;
        $[3] = t1;
    } else {
        t1 = $[3];
    }
    return t1;
}
_c = DevWorkbenchPageShell;
var _c;
__turbopack_context__.k.register(_c, "DevWorkbenchPageShell");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/devtools/app-dev/colors/color-tool-preview-helpers.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HarmonyIndicator",
    ()=>HarmonyIndicator,
    "PreviewColumn",
    ()=>PreviewColumn,
    "WcagBadge",
    ()=>WcagBadge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$theme$2f$palette$2d$suggest$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/app/theme/palette-suggest.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$theme$2f$pb$2d$color$2d$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/app/theme/pb-color-tokens.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
const HARMONY_LABELS = {
    monochromatic: "Monochromatic",
    analogous: "Analogous",
    complementary: "Complementary",
    "split-complementary": "Split-complementary",
    triadic: "Triadic",
    tetradic: "Tetradic",
    unknown: "—"
};
function HarmonyIndicator(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(10);
    if ($[0] !== "a6ac384093ad0776a9f418d59e9338f829ebd752b618327c7e30db0cc1bf3766") {
        for(let $i = 0; $i < 10; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "a6ac384093ad0776a9f418d59e9338f829ebd752b618327c7e30db0cc1bf3766";
    }
    const { fit } = t0;
    if (fit.confidence < 0.3 || fit.harmony === "unknown") {
        return null;
    }
    let t1;
    if ($[1] !== fit.confidence) {
        t1 = Math.round(fit.confidence * 100);
        $[1] = fit.confidence;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const pct = t1;
    const t2 = HARMONY_LABELS[fit.harmony];
    let t3;
    if ($[3] !== t2) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-foreground/70",
            children: t2
        }, void 0, false, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-preview-helpers.tsx",
            lineNumber: 42,
            columnNumber: 10
        }, this);
        $[3] = t2;
        $[4] = t3;
    } else {
        t3 = $[4];
    }
    let t4;
    if ($[5] !== pct) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "opacity-60",
            children: [
                pct,
                "%"
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-preview-helpers.tsx",
            lineNumber: 50,
            columnNumber: 10
        }, this);
        $[5] = pct;
        $[6] = t4;
    } else {
        t4 = $[6];
    }
    let t5;
    if ($[7] !== t3 || $[8] !== t4) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/40 px-2.5 py-0.5 font-mono text-[10px] text-muted-foreground",
            children: [
                t3,
                t4
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-preview-helpers.tsx",
            lineNumber: 58,
            columnNumber: 10
        }, this);
        $[7] = t3;
        $[8] = t4;
        $[9] = t5;
    } else {
        t5 = $[9];
    }
    return t5;
}
_c = HarmonyIndicator;
function WcagBadge(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(5);
    if ($[0] !== "a6ac384093ad0776a9f418d59e9338f829ebd752b618327c7e30db0cc1bf3766") {
        for(let $i = 0; $i < 5; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "a6ac384093ad0776a9f418d59e9338f829ebd752b618327c7e30db0cc1bf3766";
    }
    const { ratio } = t0;
    if (ratio >= 7) {
        let t1;
        if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
            t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "rounded px-1.5 py-0.5 font-mono text-[10px] font-medium bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300",
                children: "AAA"
            }, void 0, false, {
                fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-preview-helpers.tsx",
                lineNumber: 83,
                columnNumber: 12
            }, this);
            $[1] = t1;
        } else {
            t1 = $[1];
        }
        return t1;
    }
    if (ratio >= 4.5) {
        let t1;
        if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
            t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "rounded px-1.5 py-0.5 font-mono text-[10px] font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
                children: "AA"
            }, void 0, false, {
                fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-preview-helpers.tsx",
                lineNumber: 93,
                columnNumber: 12
            }, this);
            $[2] = t1;
        } else {
            t1 = $[2];
        }
        return t1;
    }
    if (ratio >= 3) {
        let t1;
        if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
            t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "rounded px-1.5 py-0.5 font-mono text-[10px] font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
                children: "A"
            }, void 0, false, {
                fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-preview-helpers.tsx",
                lineNumber: 103,
                columnNumber: 12
            }, this);
            $[3] = t1;
        } else {
            t1 = $[3];
        }
        return t1;
    }
    let t1;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "rounded px-1.5 py-0.5 font-mono text-[10px] font-medium bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
            children: "✗"
        }, void 0, false, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-preview-helpers.tsx",
            lineNumber: 112,
            columnNumber: 10
        }, this);
        $[4] = t1;
    } else {
        t1 = $[4];
    }
    return t1;
}
_c1 = WcagBadge;
function WcagHoverBubble(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(12);
    if ($[0] !== "a6ac384093ad0776a9f418d59e9338f829ebd752b618327c7e30db0cc1bf3766") {
        for(let $i = 0; $i < 12; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "a6ac384093ad0776a9f418d59e9338f829ebd752b618327c7e30db0cc1bf3766";
    }
    const { fg, bg, title, children } = t0;
    let t1;
    let t2;
    let t3;
    if ($[1] !== bg || $[2] !== children || $[3] !== fg || $[4] !== title) {
        const lines = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$theme$2f$palette$2d$suggest$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["wcagContrastTooltipLines"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$theme$2f$palette$2d$suggest$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contrastPair"])(fg, bg));
        t1 = "group/wcag relative w-fit max-w-full overflow-visible";
        t2 = children;
        t3 = lines ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "pointer-events-none absolute bottom-full left-1/2 z-20 mb-1.5 block w-max min-w-48 max-w-[min(18rem,calc(100vw-2rem))] -translate-x-1/2 rounded-md border border-border bg-card px-2.5 py-2 font-mono text-[10px] leading-snug text-foreground opacity-0 shadow-lg transition-opacity duration-150 group-hover/wcag:opacity-100",
            role: "tooltip",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "mb-1 block border-b border-border/60 pb-1 text-[9px] uppercase tracking-wide text-muted-foreground",
                    children: title
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-preview-helpers.tsx",
                    lineNumber: 140,
                    columnNumber: 371
                }, this),
                lines.map(_WcagHoverBubbleLinesMap)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-preview-helpers.tsx",
            lineNumber: 140,
            columnNumber: 18
        }, this) : null;
        $[1] = bg;
        $[2] = children;
        $[3] = fg;
        $[4] = title;
        $[5] = t1;
        $[6] = t2;
        $[7] = t3;
    } else {
        t1 = $[5];
        t2 = $[6];
        t3 = $[7];
    }
    let t4;
    if ($[8] !== t1 || $[9] !== t2 || $[10] !== t3) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t1,
            children: [
                t2,
                t3
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-preview-helpers.tsx",
            lineNumber: 155,
            columnNumber: 10
        }, this);
        $[8] = t1;
        $[9] = t2;
        $[10] = t3;
        $[11] = t4;
    } else {
        t4 = $[11];
    }
    return t4;
}
_c2 = WcagHoverBubble;
function _WcagHoverBubbleLinesMap(line, index) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "block",
        children: line
    }, index, false, {
        fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-preview-helpers.tsx",
        lineNumber: 166,
        columnNumber: 10
    }, this);
}
function WcagLinkBubble(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(4);
    if ($[0] !== "a6ac384093ad0776a9f418d59e9338f829ebd752b618327c7e30db0cc1bf3766") {
        for(let $i = 0; $i < 4; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "a6ac384093ad0776a9f418d59e9338f829ebd752b618327c7e30db0cc1bf3766";
    }
    const { v } = t0;
    let t1;
    if ($[1] !== v) {
        const linesDef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$theme$2f$palette$2d$suggest$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["wcagContrastTooltipLines"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$theme$2f$palette$2d$suggest$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contrastPair"])(v["--pb-link"], v["--pb-secondary"]));
        const linesHov = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$theme$2f$palette$2d$suggest$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["wcagContrastTooltipLines"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$theme$2f$palette$2d$suggest$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contrastPair"])(v["--pb-link-hover"], v["--pb-secondary"]));
        let t2;
        if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
            t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                href: "#",
                className: "underline decoration-2 underline-offset-4",
                style: {
                    color: "var(--pb-link)"
                },
                onMouseEnter: _WcagLinkBubbleAOnMouseEnter,
                onMouseLeave: _WcagLinkBubbleAOnMouseLeave,
                onMouseDown: _WcagLinkBubbleAOnMouseDown,
                onMouseUp: _WcagLinkBubbleAOnMouseUp,
                onClick: _WcagLinkBubbleAOnClick,
                children: "Call to action link"
            }, void 0, false, {
                fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-preview-helpers.tsx",
                lineNumber: 185,
                columnNumber: 12
            }, this);
            $[3] = t2;
        } else {
            t2 = $[3];
        }
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "group/wlink relative inline-block overflow-visible",
            children: [
                t2,
                linesDef || linesHov ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "pointer-events-none absolute bottom-full left-1/2 z-20 mb-1.5 block w-max min-w-52 max-w-[min(20rem,calc(100vw-2rem))] -translate-x-1/2 rounded-md border border-border bg-card px-2.5 py-2 font-mono text-[10px] leading-snug text-foreground opacity-0 shadow-lg transition-opacity duration-150 group-hover/wlink:opacity-100",
                    children: [
                        linesDef ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "mb-1 block border-b border-border/60 pb-1 text-[9px] uppercase tracking-wide text-muted-foreground",
                                    children: "Link · default"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-preview-helpers.tsx",
                                    lineNumber: 192,
                                    columnNumber: 460
                                }, this),
                                linesDef.map(_WcagLinkBubbleLinesDefMap)
                            ]
                        }, void 0, true) : null,
                        linesHov ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: `block text-[9px] uppercase tracking-wide text-muted-foreground ${linesDef ? "mt-2 border-t border-border/60 pt-2" : "mb-1 border-b border-border/60 pb-1"}`,
                                    children: "Link · hover vs surface"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-preview-helpers.tsx",
                                    lineNumber: 192,
                                    columnNumber: 665
                                }, this),
                                linesHov.map(_WcagLinkBubbleLinesHovMap)
                            ]
                        }, void 0, true) : null
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-preview-helpers.tsx",
                    lineNumber: 192,
                    columnNumber: 107
                }, this) : null
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-preview-helpers.tsx",
            lineNumber: 192,
            columnNumber: 10
        }, this);
        $[1] = v;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    return t1;
}
_c3 = WcagLinkBubble;
function _WcagLinkBubbleLinesHovMap(line_0, index_0) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "block",
        children: line_0
    }, `h-${index_0}`, false, {
        fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-preview-helpers.tsx",
        lineNumber: 201,
        columnNumber: 10
    }, this);
}
function _WcagLinkBubbleLinesDefMap(line, index) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "block",
        children: line
    }, `d-${index}`, false, {
        fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-preview-helpers.tsx",
        lineNumber: 204,
        columnNumber: 10
    }, this);
}
function _WcagLinkBubbleAOnClick(e_3) {
    return e_3.preventDefault();
}
function _WcagLinkBubbleAOnMouseUp(e_2) {
    e_2.currentTarget.style.color = "var(--pb-link-hover)";
}
function _WcagLinkBubbleAOnMouseDown(e_1) {
    e_1.currentTarget.style.color = "var(--pb-link-active)";
}
function _WcagLinkBubbleAOnMouseLeave(e_0) {
    e_0.currentTarget.style.color = "var(--pb-link)";
}
function _WcagLinkBubbleAOnMouseEnter(e) {
    e.currentTarget.style.color = "var(--pb-link-hover)";
}
function PreviewColumn(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(38);
    if ($[0] !== "a6ac384093ad0776a9f418d59e9338f829ebd752b618327c7e30db0cc1bf3766") {
        for(let $i = 0; $i < 38; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "a6ac384093ad0776a9f418d59e9338f829ebd752b618327c7e30db0cc1bf3766";
    }
    const { label, v } = t0;
    let out;
    if ($[1] !== v) {
        out = {};
        for (const id of __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$theme$2f$pb$2d$color$2d$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["M1_TOKEN_IDS"]){
            out[id] = v[id];
        }
        $[1] = v;
        $[2] = out;
    } else {
        out = $[2];
    }
    const vars = out;
    let t1;
    if ($[3] !== vars) {
        t1 = {
            ...vars,
            background: "var(--pb-secondary)",
            color: "var(--pb-on-secondary)"
        };
        $[3] = vars;
        $[4] = t1;
    } else {
        t1 = $[4];
    }
    let t2;
    if ($[5] !== label) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "border-b border-border/40 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wide text-muted-foreground",
            children: label
        }, void 0, false, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-preview-helpers.tsx",
            lineNumber: 259,
            columnNumber: 10
        }, this);
        $[5] = label;
        $[6] = t2;
    } else {
        t2 = $[6];
    }
    const t3 = v["--pb-on-primary"];
    const t4 = v["--pb-primary"];
    let t5;
    if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            className: "rounded-md px-3 py-1.5 text-sm font-medium",
            style: {
                background: "var(--pb-primary)",
                color: "var(--pb-on-primary)"
            },
            children: "Primary"
        }, void 0, false, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-preview-helpers.tsx",
            lineNumber: 269,
            columnNumber: 10
        }, this);
        $[7] = t5;
    } else {
        t5 = $[7];
    }
    let t6;
    if ($[8] !== t3 || $[9] !== t4) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WcagHoverBubble, {
            fg: t3,
            bg: t4,
            title: "On primary / primary",
            children: t5
        }, void 0, false, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-preview-helpers.tsx",
            lineNumber: 279,
            columnNumber: 10
        }, this);
        $[8] = t3;
        $[9] = t4;
        $[10] = t6;
    } else {
        t6 = $[10];
    }
    const t7 = v["--pb-on-accent"];
    const t8 = v["--pb-accent"];
    let t9;
    if ($[11] === Symbol.for("react.memo_cache_sentinel")) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            className: "rounded-md px-3 py-1.5 text-sm font-medium",
            style: {
                background: "var(--pb-accent)",
                color: "var(--pb-on-accent)"
            },
            children: "Accent"
        }, void 0, false, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-preview-helpers.tsx",
            lineNumber: 290,
            columnNumber: 10
        }, this);
        $[11] = t9;
    } else {
        t9 = $[11];
    }
    let t10;
    if ($[12] !== t7 || $[13] !== t8) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WcagHoverBubble, {
            fg: t7,
            bg: t8,
            title: "On accent / accent",
            children: t9
        }, void 0, false, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-preview-helpers.tsx",
            lineNumber: 300,
            columnNumber: 11
        }, this);
        $[12] = t7;
        $[13] = t8;
        $[14] = t10;
    } else {
        t10 = $[14];
    }
    const t11 = v["--pb-on-secondary"];
    const t12 = v["--pb-secondary"];
    let t13;
    if ($[15] === Symbol.for("react.memo_cache_sentinel")) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "inline-flex rounded-md border-2 px-3 py-1.5 text-sm font-medium",
            style: {
                borderColor: "var(--pb-on-secondary)",
                color: "var(--pb-on-secondary)"
            },
            children: "Ghost"
        }, void 0, false, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-preview-helpers.tsx",
            lineNumber: 311,
            columnNumber: 11
        }, this);
        $[15] = t13;
    } else {
        t13 = $[15];
    }
    let t14;
    if ($[16] !== t11 || $[17] !== t12) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WcagHoverBubble, {
            fg: t11,
            bg: t12,
            title: "Outline / surface",
            children: t13
        }, void 0, false, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-preview-helpers.tsx",
            lineNumber: 321,
            columnNumber: 11
        }, this);
        $[16] = t11;
        $[17] = t12;
        $[18] = t14;
    } else {
        t14 = $[18];
    }
    let t15;
    if ($[19] !== t10 || $[20] !== t14 || $[21] !== t6) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-wrap gap-2 overflow-visible",
            children: [
                t6,
                t10,
                t14
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-preview-helpers.tsx",
            lineNumber: 330,
            columnNumber: 11
        }, this);
        $[19] = t10;
        $[20] = t14;
        $[21] = t6;
        $[22] = t15;
    } else {
        t15 = $[22];
    }
    const t16 = v["--pb-on-secondary"];
    const t17 = v["--pb-secondary"];
    let t18;
    if ($[23] === Symbol.for("react.memo_cache_sentinel")) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "max-w-prose text-sm leading-relaxed",
            children: "Body copy on the secondary surface — hover this block for contrast. Shorter labels and large type can pass with lower ratios than dense paragraph text."
        }, void 0, false, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-preview-helpers.tsx",
            lineNumber: 342,
            columnNumber: 11
        }, this);
        $[23] = t18;
    } else {
        t18 = $[23];
    }
    let t19;
    if ($[24] !== t16 || $[25] !== t17) {
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WcagHoverBubble, {
            fg: t16,
            bg: t17,
            title: "Body / surface",
            children: t18
        }, void 0, false, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-preview-helpers.tsx",
            lineNumber: 349,
            columnNumber: 11
        }, this);
        $[24] = t16;
        $[25] = t17;
        $[26] = t19;
    } else {
        t19 = $[26];
    }
    let t20;
    if ($[27] === Symbol.for("react.memo_cache_sentinel")) {
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-xs opacity-80",
            children: "Muted-style line (same ink, reduced emphasis for hierarchy only)."
        }, void 0, false, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-preview-helpers.tsx",
            lineNumber: 358,
            columnNumber: 11
        }, this);
        $[27] = t20;
    } else {
        t20 = $[27];
    }
    let t21;
    if ($[28] !== v) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-sm",
            children: [
                "Inline copy with a ",
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WcagLinkBubble, {
                    v: v
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-preview-helpers.tsx",
                    lineNumber: 365,
                    columnNumber: 53
                }, this),
                " in context."
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-preview-helpers.tsx",
            lineNumber: 365,
            columnNumber: 11
        }, this);
        $[28] = v;
        $[29] = t21;
    } else {
        t21 = $[29];
    }
    let t22;
    if ($[30] !== t15 || $[31] !== t19 || $[32] !== t21) {
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-3 overflow-visible p-3",
            children: [
                t15,
                t19,
                t20,
                t21
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-preview-helpers.tsx",
            lineNumber: 373,
            columnNumber: 11
        }, this);
        $[30] = t15;
        $[31] = t19;
        $[32] = t21;
        $[33] = t22;
    } else {
        t22 = $[33];
    }
    let t23;
    if ($[34] !== t1 || $[35] !== t2 || $[36] !== t22) {
        t23 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "overflow-visible rounded-lg border border-border/80",
            style: t1,
            children: [
                t2,
                t22
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-preview-helpers.tsx",
            lineNumber: 383,
            columnNumber: 11
        }, this);
        $[34] = t1;
        $[35] = t2;
        $[36] = t22;
        $[37] = t23;
    } else {
        t23 = $[37];
    }
    return t23;
}
_c4 = PreviewColumn;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "HarmonyIndicator");
__turbopack_context__.k.register(_c1, "WcagBadge");
__turbopack_context__.k.register(_c2, "WcagHoverBubble");
__turbopack_context__.k.register(_c3, "WcagLinkBubble");
__turbopack_context__.k.register(_c4, "PreviewColumn");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/devtools/app-dev/colors/color-tool-native-swatch.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NativeColorSwatch",
    ()=>NativeColorSwatch
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$culori$2f$src$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/culori/src/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$culori$2f$src$2f$formatter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/culori/src/formatter.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$culori$2f$src$2f$parse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__parse$3e$__ = __turbopack_context__.i("[project]/node_modules/culori/src/parse.js [app-client] (ecmascript) <export default as parse>");
"use client";
;
;
;
/** sRGB hex for native color inputs (SSR-safe). */ function hexApproxForInput(css) {
    try {
        const parsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$culori$2f$src$2f$parse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__parse$3e$__["parse"])(css);
        if (!parsed) return "#808080";
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$culori$2f$src$2f$formatter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatHex"])(parsed) ?? "#808080";
    } catch  {
        return "#808080";
    }
}
function NativeColorSwatch(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(16);
    if ($[0] !== "860ff960e07d79ba3c8ce1a09e51bf1bf9d23a8eebdc8a61585a1d31fb07a032") {
        for(let $i = 0; $i < 16; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "860ff960e07d79ba3c8ce1a09e51bf1bf9d23a8eebdc8a61585a1d31fb07a032";
    }
    const { cssValue, disabled, onPickHex, size, ariaLabel } = t0;
    let t1;
    if ($[1] !== cssValue) {
        t1 = hexApproxForInput(cssValue);
        $[1] = cssValue;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const hex = t1;
    const box = size === "sm" ? "h-8 w-12" : size === "lg" ? "h-11 w-16" : "h-9 w-14";
    const t2 = `relative inline-block shrink-0 overflow-hidden rounded border border-border shadow-inner ${box}`;
    let t3;
    if ($[3] !== hex) {
        t3 = {
            backgroundColor: hex
        };
        $[3] = hex;
        $[4] = t3;
    } else {
        t3 = $[4];
    }
    let t4;
    if ($[5] !== onPickHex) {
        t4 = ({
            "NativeColorSwatch[<input>.onChange]": (e)=>onPickHex(e.target.value)
        })["NativeColorSwatch[<input>.onChange]"];
        $[5] = onPickHex;
        $[6] = t4;
    } else {
        t4 = $[6];
    }
    let t5;
    if ($[7] !== ariaLabel || $[8] !== disabled || $[9] !== hex || $[10] !== t4) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            type: "color",
            disabled: disabled,
            className: "absolute inset-0 block h-full w-full min-h-0 min-w-0 cursor-pointer opacity-0 disabled:cursor-not-allowed disabled:pointer-events-none",
            value: hex,
            onChange: t4,
            "aria-label": ariaLabel
        }, void 0, false, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-native-swatch.tsx",
            lineNumber: 66,
            columnNumber: 10
        }, this);
        $[7] = ariaLabel;
        $[8] = disabled;
        $[9] = hex;
        $[10] = t4;
        $[11] = t5;
    } else {
        t5 = $[11];
    }
    let t6;
    if ($[12] !== t2 || $[13] !== t3 || $[14] !== t5) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: t2,
            style: t3,
            children: t5
        }, void 0, false, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-native-swatch.tsx",
            lineNumber: 77,
            columnNumber: 10
        }, this);
        $[12] = t2;
        $[13] = t3;
        $[14] = t5;
        $[15] = t6;
    } else {
        t6 = $[15];
    }
    return t6;
}
_c = NativeColorSwatch;
var _c;
__turbopack_context__.k.register(_c, "NativeColorSwatch");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/devtools/app-dev/colors/color-tool-token-table.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ColorToolTokenTable",
    ()=>ColorToolTokenTable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$theme$2f$palette$2d$suggest$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/app/theme/palette-suggest.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$theme$2f$pb$2d$color$2d$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/app/theme/pb-color-tokens.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$devtools$2f$app$2d$dev$2f$colors$2f$color$2d$tool$2d$preview$2d$helpers$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/devtools/app-dev/colors/color-tool-preview-helpers.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$devtools$2f$app$2d$dev$2f$colors$2f$color$2d$tool$2d$native$2d$swatch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/devtools/app-dev/colors/color-tool-native-swatch.tsx [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
function ColorToolTokenTable(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(18);
    if ($[0] !== "eb1c5ee7e7f44022ddb7aadff06ba83cacba9932e565be989be8efe477b59495") {
        for(let $i = 0; $i < 18; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "eb1c5ee7e7f44022ddb7aadff06ba83cacba9932e565be989be8efe477b59495";
    }
    const { rows, resolved, editTheme, displayValue, onValueInput, onConfirmToggle, onRefresh, onShuffleAll } = t0;
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "font-mono text-[10px] uppercase tracking-wide text-muted-foreground",
            children: "Tokens"
        }, void 0, false, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-token-table.tsx",
            lineNumber: 38,
            columnNumber: 10
        }, this);
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    let t2;
    if ($[2] !== onShuffleAll) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between border-b border-border bg-muted/30 px-3 py-2",
            children: [
                t1,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    className: "rounded border border-border px-2.5 py-1 font-mono text-[11px] text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground",
                    title: "Re-roll all unlocked token rows",
                    onClick: onShuffleAll,
                    children: "Re-roll all"
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-token-table.tsx",
                    lineNumber: 45,
                    columnNumber: 110
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-token-table.tsx",
            lineNumber: 45,
            columnNumber: 10
        }, this);
        $[2] = onShuffleAll;
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    let t3;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                className: "border-b border-border/60 bg-muted/10",
                children: [
                    "Token",
                    "",
                    "Value",
                    "Contrast",
                    "Lock",
                    ""
                ].map(_ColorToolTokenTableAnonymous)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-token-table.tsx",
                lineNumber: 53,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-token-table.tsx",
            lineNumber: 53,
            columnNumber: 10
        }, this);
        $[4] = t3;
    } else {
        t3 = $[4];
    }
    let t4;
    if ($[5] !== displayValue || $[6] !== editTheme || $[7] !== onConfirmToggle || $[8] !== onRefresh || $[9] !== onValueInput || $[10] !== resolved || $[11] !== rows) {
        t4 = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$theme$2f$pb$2d$color$2d$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["M1_TOKEN_IDS"].map({
            "ColorToolTokenTable[M1_TOKEN_IDS.map()]": (id)=>{
                const ratio = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$theme$2f$palette$2d$suggest$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contrastHintForToken"])(id, resolved);
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                    className: "border-b border-border/80 last:border-b-0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                            className: "px-3 py-2.5 align-middle",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm font-medium text-foreground",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$theme$2f$pb$2d$color$2d$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["M1_TOKEN_META"][id].label
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-token-table.tsx",
                                    lineNumber: 63,
                                    columnNumber: 124
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "font-mono text-[10px] text-muted-foreground",
                                    children: id
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-token-table.tsx",
                                    lineNumber: 63,
                                    columnNumber: 210
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-token-table.tsx",
                            lineNumber: 63,
                            columnNumber: 83
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                            className: "px-3 py-2.5 align-middle",
                            children: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$theme$2f$pb$2d$color$2d$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["M1_ON_PAIR"][id] ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex items-center gap-1",
                                title: "Fill context \xB7 editable text color",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "h-8 w-5 shrink-0 rounded-l border border-border/40",
                                        style: {
                                            background: displayValue(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$theme$2f$pb$2d$color$2d$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["M1_ON_PAIR"][id])
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-token-table.tsx",
                                        lineNumber: 63,
                                        columnNumber: 435
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$devtools$2f$app$2d$dev$2f$colors$2f$color$2d$tool$2d$native$2d$swatch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NativeColorSwatch"], {
                                        cssValue: displayValue(id),
                                        onPickHex: {
                                            "ColorToolTokenTable[M1_TOKEN_IDS.map() > <NativeColorSwatch>.onPickHex]": (hex)=>onValueInput(id, hex)
                                        }["ColorToolTokenTable[M1_TOKEN_IDS.map() > <NativeColorSwatch>.onPickHex]"],
                                        size: "sm",
                                        ariaLabel: `${__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$theme$2f$pb$2d$color$2d$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["M1_TOKEN_META"][id].label} color (${editTheme})`
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-token-table.tsx",
                                        lineNumber: 65,
                                        columnNumber: 20
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-token-table.tsx",
                                lineNumber: 63,
                                columnNumber: 345
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$devtools$2f$app$2d$dev$2f$colors$2f$color$2d$tool$2d$native$2d$swatch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NativeColorSwatch"], {
                                cssValue: displayValue(id),
                                onPickHex: {
                                    "ColorToolTokenTable[M1_TOKEN_IDS.map() > <NativeColorSwatch>.onPickHex]": (hex_0)=>onValueInput(id, hex_0)
                                }["ColorToolTokenTable[M1_TOKEN_IDS.map() > <NativeColorSwatch>.onPickHex]"],
                                size: "sm",
                                ariaLabel: `${__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$theme$2f$pb$2d$color$2d$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["M1_TOKEN_META"][id].label} color (${editTheme})`
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-token-table.tsx",
                                lineNumber: 67,
                                columnNumber: 177
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-token-table.tsx",
                            lineNumber: 63,
                            columnNumber: 286
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                            className: "max-w-[min(280px,40vw)] px-3 py-2.5 align-middle",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                className: "w-full rounded border border-border bg-background px-3 py-1.5 font-mono text-[11px] text-foreground focus:outline-none focus:ring-1 focus:ring-ring",
                                value: displayValue(id),
                                onChange: {
                                    "ColorToolTokenTable[M1_TOKEN_IDS.map() > <input>.onChange]": (e)=>onValueInput(id, e.target.value)
                                }["ColorToolTokenTable[M1_TOKEN_IDS.map() > <input>.onChange]"]
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-token-table.tsx",
                                lineNumber: 69,
                                columnNumber: 236
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-token-table.tsx",
                            lineNumber: 69,
                            columnNumber: 171
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                            className: "px-3 py-2.5 align-middle",
                            children: ratio != null ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex items-center gap-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$devtools$2f$app$2d$dev$2f$colors$2f$color$2d$tool$2d$preview$2d$helpers$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WcagBadge"], {
                                        ratio: ratio
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-token-table.tsx",
                                        lineNumber: 71,
                                        columnNumber: 187
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-mono text-[11px] tabular-nums text-muted-foreground",
                                        children: [
                                            ratio.toFixed(2),
                                            "∶1"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-token-table.tsx",
                                        lineNumber: 71,
                                        columnNumber: 214
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-token-table.tsx",
                                lineNumber: 71,
                                columnNumber: 143
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono text-[11px] text-muted-foreground",
                                children: "—"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-token-table.tsx",
                                lineNumber: 71,
                                columnNumber: 326
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-token-table.tsx",
                            lineNumber: 71,
                            columnNumber: 85
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                            className: "px-3 py-2.5 align-middle",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "flex cursor-pointer items-center gap-2 font-mono text-[11px] text-muted-foreground",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "checkbox",
                                        className: "rounded border-border",
                                        checked: rows[id].confirmed,
                                        onChange: {
                                            "ColorToolTokenTable[M1_TOKEN_IDS.map() > <input>.onChange]": (e_0)=>onConfirmToggle(id, e_0.target.checked)
                                        }["ColorToolTokenTable[M1_TOKEN_IDS.map() > <input>.onChange]"]
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-token-table.tsx",
                                        lineNumber: 71,
                                        columnNumber: 545
                                    }, this),
                                    "Lock"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-token-table.tsx",
                                lineNumber: 71,
                                columnNumber: 443
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-token-table.tsx",
                            lineNumber: 71,
                            columnNumber: 402
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                            className: "px-3 py-2.5 align-middle",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "rounded border border-border px-2.5 py-1 font-mono text-[11px] text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40",
                                disabled: rows[id].confirmed,
                                title: rows[id].confirmed ? "Uncheck lock to try another suggestion" : "Re-roll suggestion",
                                onClick: {
                                    "ColorToolTokenTable[M1_TOKEN_IDS.map() > <button>.onClick]": ()=>onRefresh(id)
                                }["ColorToolTokenTable[M1_TOKEN_IDS.map() > <button>.onClick]"],
                                children: "Refresh"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-token-table.tsx",
                                lineNumber: 73,
                                columnNumber: 140
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-token-table.tsx",
                            lineNumber: 73,
                            columnNumber: 99
                        }, this)
                    ]
                }, id, true, {
                    fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-token-table.tsx",
                    lineNumber: 63,
                    columnNumber: 16
                }, this);
            }
        }["ColorToolTokenTable[M1_TOKEN_IDS.map()]"]);
        $[5] = displayValue;
        $[6] = editTheme;
        $[7] = onConfirmToggle;
        $[8] = onRefresh;
        $[9] = onValueInput;
        $[10] = resolved;
        $[11] = rows;
        $[12] = t4;
    } else {
        t4 = $[12];
    }
    let t5;
    if ($[13] !== t4) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
            className: "w-full min-w-[640px] border-collapse text-left",
            children: [
                t3,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                    children: t4
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-token-table.tsx",
                    lineNumber: 91,
                    columnNumber: 80
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-token-table.tsx",
            lineNumber: 91,
            columnNumber: 10
        }, this);
        $[13] = t4;
        $[14] = t5;
    } else {
        t5 = $[14];
    }
    let t6;
    if ($[15] !== t2 || $[16] !== t5) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "overflow-x-auto rounded-lg border border-border bg-card/10",
            children: [
                t2,
                t5
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-token-table.tsx",
            lineNumber: 99,
            columnNumber: 10
        }, this);
        $[15] = t2;
        $[16] = t5;
        $[17] = t6;
    } else {
        t6 = $[17];
    }
    return t6;
}
_c = ColorToolTokenTable;
function _ColorToolTokenTableAnonymous(header, index) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
        className: "px-3 py-2 font-mono text-[10px] font-normal uppercase tracking-wide text-muted-foreground",
        children: header
    }, index, false, {
        fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-token-table.tsx",
        lineNumber: 109,
        columnNumber: 10
    }, this);
}
var _c;
__turbopack_context__.k.register(_c, "ColorToolTokenTable");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/devtools/app-dev/colors/color-tool-workspace.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ColorToolWorkspace",
    ()=>ColorToolWorkspace
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$theme$2f$palette$2d$suggest$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/app/theme/palette-suggest.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$_components$2f$DevWorkbenchNav$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/app/dev/_components/DevWorkbenchNav.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$_components$2f$DevWorkbenchPageHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/app/dev/_components/DevWorkbenchPageHeader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$_components$2f$DevWorkbenchPageShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/app/dev/_components/DevWorkbenchPageShell.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$devtools$2f$app$2d$dev$2f$colors$2f$color$2d$tool$2d$preview$2d$helpers$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/devtools/app-dev/colors/color-tool-preview-helpers.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$devtools$2f$app$2d$dev$2f$colors$2f$color$2d$tool$2d$native$2d$swatch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/devtools/app-dev/colors/color-tool-native-swatch.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$devtools$2f$app$2d$dev$2f$colors$2f$color$2d$tool$2d$token$2d$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/devtools/app-dev/colors/color-tool-token-table.tsx [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
function ColorToolWorkspace(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(114);
    if ($[0] !== "526112cb229c2a2430d8c8cc203b0aef4753afc807f9b46d51e4ae1093a40c1d") {
        for(let $i = 0; $i < 114; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "526112cb229c2a2430d8c8cc203b0aef4753afc807f9b46d51e4ae1093a40c1d";
    }
    const { resetColorTool, editTheme, setEditTheme, syncSeedsAcrossThemes, onSyncSeedsToggle, harmonyFit, rows, seeds, setSeed, displayValue, onValueInput, onConfirmToggle, onRefresh, onShuffleSeeds, onShuffleAll, resolved, resolvedLight, resolvedDark, exportText, copyExportWithFlash, exportCopied } = t0;
    let t1;
    if ($[1] !== resetColorTool) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$_components$2f$DevWorkbenchNav$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DevWorkbenchNav"], {
            onResetSection: resetColorTool,
            onTotalReset: resetColorTool
        }, void 0, false, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-workspace.tsx",
            lineNumber: 69,
            columnNumber: 10
        }, this);
        $[1] = resetColorTool;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    let t2;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
            children: "--pb-*"
        }, void 0, false, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-workspace.tsx",
            lineNumber: 77,
            columnNumber: 10
        }, this);
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    let t3;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
            children: "light"
        }, void 0, false, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-workspace.tsx",
            lineNumber: 84,
            columnNumber: 10
        }, this);
        $[4] = t3;
    } else {
        t3 = $[4];
    }
    let t4;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
            children: "dark"
        }, void 0, false, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-workspace.tsx",
            lineNumber: 91,
            columnNumber: 10
        }, this);
        $[5] = t4;
    } else {
        t4 = $[5];
    }
    let t5;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
            children: "primary"
        }, void 0, false, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-workspace.tsx",
            lineNumber: 98,
            columnNumber: 10
        }, this);
        $[6] = t5;
    } else {
        t5 = $[6];
    }
    let t6;
    let t7;
    if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                "Tune ",
                t2,
                " brand and link tokens for ",
                t3,
                " and",
                " ",
                t4,
                ". With nothing locked, the palette tracks ",
                t5,
                "; lock rows for finer control. Refresh re-rolls an unlocked row. Runtime surfaces, text, status, charts, and sidebar tokens derive from these seeds. Copy into",
                " ",
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                    children: "src/app/theme/config.ts"
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-workspace.tsx",
                    lineNumber: 106,
                    columnNumber: 274
                }, this),
                " (replace whole file)."
            ]
        }, void 0, true);
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "font-medium text-foreground/90",
            children: "Note:"
        }, void 0, false, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-workspace.tsx",
            lineNumber: 107,
            columnNumber: 10
        }, this);
        $[7] = t6;
        $[8] = t7;
    } else {
        t6 = $[7];
        t7 = $[8];
    }
    let t8;
    if ($[9] !== rows) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$_components$2f$DevWorkbenchPageHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DevWorkbenchPageHeader"], {
            eyebrow: "Dev \xB7 Foundations",
            title: "Colors",
            description: t6,
            meta: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    t7,
                    " ",
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$theme$2f$palette$2d$suggest$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isFullyFluidPalette"])(rows) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: "Full-fluid mode: secondary and accent seeds are paused until you lock a token."
                    }, void 0, false) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: "Partial locks: unlocked fills use their seed while confirmed values stay pinned."
                    }, void 0, false)
                ]
            }, void 0, true)
        }, void 0, false, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-workspace.tsx",
            lineNumber: 116,
            columnNumber: 10
        }, this);
        $[9] = rows;
        $[10] = t8;
    } else {
        t8 = $[10];
    }
    let t9;
    if ($[11] === Symbol.for("react.memo_cache_sentinel")) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "font-mono text-[10px] uppercase tracking-wide text-muted-foreground",
            children: "Edit theme"
        }, void 0, false, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-workspace.tsx",
            lineNumber: 124,
            columnNumber: 10
        }, this);
        $[11] = t9;
    } else {
        t9 = $[11];
    }
    let t10;
    if ($[12] === Symbol.for("react.memo_cache_sentinel")) {
        t10 = [
            "light",
            "dark"
        ];
        $[12] = t10;
    } else {
        t10 = $[12];
    }
    let t11;
    if ($[13] !== editTheme || $[14] !== setEditTheme) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-wrap items-center gap-3",
            children: [
                t9,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-1",
                    children: t10.map({
                        "ColorToolWorkspace[(anonymous)()]": (mode)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: `rounded px-2 py-0.5 text-[11px] font-mono transition-colors ${editTheme === mode ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`,
                                onClick: {
                                    "ColorToolWorkspace[(anonymous)() > <button>.onClick]": ()=>setEditTheme(mode)
                                }["ColorToolWorkspace[(anonymous)() > <button>.onClick]"],
                                children: mode === "light" ? "Light" : "Dark"
                            }, mode, false, {
                                fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-workspace.tsx",
                                lineNumber: 139,
                                columnNumber: 56
                            }, this)
                    }["ColorToolWorkspace[(anonymous)()]"])
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-workspace.tsx",
                    lineNumber: 138,
                    columnNumber: 66
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-workspace.tsx",
            lineNumber: 138,
            columnNumber: 11
        }, this);
        $[13] = editTheme;
        $[14] = setEditTheme;
        $[15] = t11;
    } else {
        t11 = $[15];
    }
    let t12;
    if ($[16] !== onSyncSeedsToggle) {
        t12 = ({
            "ColorToolWorkspace[<input>.onChange]": (e)=>onSyncSeedsToggle(e.target.checked)
        })["ColorToolWorkspace[<input>.onChange]"];
        $[16] = onSyncSeedsToggle;
        $[17] = t12;
    } else {
        t12 = $[17];
    }
    let t13;
    if ($[18] !== syncSeedsAcrossThemes || $[19] !== t12) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            type: "checkbox",
            className: "h-3.5 w-3.5 rounded border-border accent-foreground",
            checked: syncSeedsAcrossThemes,
            onChange: t12
        }, void 0, false, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-workspace.tsx",
            lineNumber: 161,
            columnNumber: 11
        }, this);
        $[18] = syncSeedsAcrossThemes;
        $[19] = t12;
        $[20] = t13;
    } else {
        t13 = $[20];
    }
    let t14;
    if ($[21] === Symbol.for("react.memo_cache_sentinel")) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: [
                "Sync seeds",
                " ",
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-[10px] font-normal text-muted-foreground",
                    children: "(light & dark share seed values)"
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-workspace.tsx",
                    lineNumber: 170,
                    columnNumber: 32
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-workspace.tsx",
            lineNumber: 170,
            columnNumber: 11
        }, this);
        $[21] = t14;
    } else {
        t14 = $[21];
    }
    let t15;
    if ($[22] !== t13) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "flex cursor-pointer select-none items-center gap-2 font-mono text-[11px] text-foreground",
            children: [
                t13,
                t14
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-workspace.tsx",
            lineNumber: 177,
            columnNumber: 11
        }, this);
        $[22] = t13;
        $[23] = t15;
    } else {
        t15 = $[23];
    }
    let t16;
    if ($[24] !== t11 || $[25] !== t15) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mb-6 flex flex-wrap items-center gap-x-4 gap-y-2",
            children: [
                t11,
                t15
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-workspace.tsx",
            lineNumber: 185,
            columnNumber: 11
        }, this);
        $[24] = t11;
        $[25] = t15;
        $[26] = t16;
    } else {
        t16 = $[26];
    }
    let t17;
    if ($[27] !== editTheme) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "mb-0 font-mono text-[11px] uppercase tracking-wide text-muted-foreground",
            children: [
                "Global seeds · ",
                editTheme
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-workspace.tsx",
            lineNumber: 194,
            columnNumber: 11
        }, this);
        $[27] = editTheme;
        $[28] = t17;
    } else {
        t17 = $[28];
    }
    let t18;
    if ($[29] !== harmonyFit) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$devtools$2f$app$2d$dev$2f$colors$2f$color$2d$tool$2d$preview$2d$helpers$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HarmonyIndicator"], {
            fit: harmonyFit
        }, void 0, false, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-workspace.tsx",
            lineNumber: 202,
            columnNumber: 11
        }, this);
        $[29] = harmonyFit;
        $[30] = t18;
    } else {
        t18 = $[30];
    }
    let t19;
    if ($[31] !== onShuffleSeeds) {
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            className: "rounded border border-border px-2.5 py-1 font-mono text-[11px] text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground",
            title: "Pick a new random primary + accent pair",
            onClick: onShuffleSeeds,
            children: "Shuffle"
        }, void 0, false, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-workspace.tsx",
            lineNumber: 210,
            columnNumber: 11
        }, this);
        $[31] = onShuffleSeeds;
        $[32] = t19;
    } else {
        t19 = $[32];
    }
    let t20;
    if ($[33] !== t18 || $[34] !== t19) {
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-2",
            children: [
                t18,
                t19
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-workspace.tsx",
            lineNumber: 218,
            columnNumber: 11
        }, this);
        $[33] = t18;
        $[34] = t19;
        $[35] = t20;
    } else {
        t20 = $[35];
    }
    let t21;
    if ($[36] !== t17 || $[37] !== t20) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-wrap items-center justify-between gap-2",
            children: [
                t17,
                t20
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-workspace.tsx",
            lineNumber: 227,
            columnNumber: 11
        }, this);
        $[36] = t17;
        $[37] = t20;
        $[38] = t21;
    } else {
        t21 = $[38];
    }
    let t22;
    if ($[39] === Symbol.for("react.memo_cache_sentinel")) {
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "font-mono text-[10px] uppercase tracking-wide text-muted-foreground",
            children: "Primary"
        }, void 0, false, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-workspace.tsx",
            lineNumber: 236,
            columnNumber: 11
        }, this);
        $[39] = t22;
    } else {
        t22 = $[39];
    }
    let t23;
    if ($[40] !== setSeed) {
        t23 = ({
            "ColorToolWorkspace[<NativeColorSwatch>.onPickHex]": (hex)=>setSeed("primary", hex)
        })["ColorToolWorkspace[<NativeColorSwatch>.onPickHex]"];
        $[40] = setSeed;
        $[41] = t23;
    } else {
        t23 = $[41];
    }
    const t24 = `Primary picker (${editTheme})`;
    let t25;
    if ($[42] !== seeds.primary || $[43] !== t23 || $[44] !== t24) {
        t25 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$devtools$2f$app$2d$dev$2f$colors$2f$color$2d$tool$2d$native$2d$swatch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NativeColorSwatch"], {
            cssValue: seeds.primary,
            onPickHex: t23,
            size: "lg",
            ariaLabel: t24
        }, void 0, false, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-workspace.tsx",
            lineNumber: 254,
            columnNumber: 11
        }, this);
        $[42] = seeds.primary;
        $[43] = t23;
        $[44] = t24;
        $[45] = t25;
    } else {
        t25 = $[45];
    }
    let t26;
    if ($[46] !== setSeed) {
        t26 = ({
            "ColorToolWorkspace[<input>.onChange]": (e_0)=>setSeed("primary", e_0.target.value)
        })["ColorToolWorkspace[<input>.onChange]"];
        $[46] = setSeed;
        $[47] = t26;
    } else {
        t26 = $[47];
    }
    let t27;
    if ($[48] !== seeds.primary || $[49] !== t26) {
        t27 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            type: "text",
            className: "min-w-0 flex-1 rounded border border-border bg-background px-3 py-2 font-mono text-[11px] text-foreground focus:outline-none focus:ring-1 focus:ring-ring",
            value: seeds.primary,
            onChange: t26
        }, void 0, false, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-workspace.tsx",
            lineNumber: 274,
            columnNumber: 11
        }, this);
        $[48] = seeds.primary;
        $[49] = t26;
        $[50] = t27;
    } else {
        t27 = $[50];
    }
    let t28;
    if ($[51] !== t25 || $[52] !== t27) {
        t28 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-1.5",
            children: [
                t22,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "flex items-center gap-2",
                    children: [
                        t25,
                        t27
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-workspace.tsx",
                    lineNumber: 283,
                    columnNumber: 45
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-workspace.tsx",
            lineNumber: 283,
            columnNumber: 11
        }, this);
        $[51] = t25;
        $[52] = t27;
        $[53] = t28;
    } else {
        t28 = $[53];
    }
    let t29;
    if ($[54] === Symbol.for("react.memo_cache_sentinel")) {
        t29 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "font-mono text-[10px] uppercase tracking-wide text-muted-foreground",
            children: "Accent"
        }, void 0, false, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-workspace.tsx",
            lineNumber: 292,
            columnNumber: 11
        }, this);
        $[54] = t29;
    } else {
        t29 = $[54];
    }
    let t30;
    if ($[55] !== setSeed) {
        t30 = ({
            "ColorToolWorkspace[<NativeColorSwatch>.onPickHex]": (hex_0)=>setSeed("accent", hex_0)
        })["ColorToolWorkspace[<NativeColorSwatch>.onPickHex]"];
        $[55] = setSeed;
        $[56] = t30;
    } else {
        t30 = $[56];
    }
    const t31 = `Accent picker (${editTheme})`;
    let t32;
    if ($[57] !== seeds.accent || $[58] !== t30 || $[59] !== t31) {
        t32 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$devtools$2f$app$2d$dev$2f$colors$2f$color$2d$tool$2d$native$2d$swatch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NativeColorSwatch"], {
            cssValue: seeds.accent,
            onPickHex: t30,
            size: "md",
            ariaLabel: t31
        }, void 0, false, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-workspace.tsx",
            lineNumber: 310,
            columnNumber: 11
        }, this);
        $[57] = seeds.accent;
        $[58] = t30;
        $[59] = t31;
        $[60] = t32;
    } else {
        t32 = $[60];
    }
    let t33;
    if ($[61] !== setSeed) {
        t33 = ({
            "ColorToolWorkspace[<input>.onChange]": (e_1)=>setSeed("accent", e_1.target.value)
        })["ColorToolWorkspace[<input>.onChange]"];
        $[61] = setSeed;
        $[62] = t33;
    } else {
        t33 = $[62];
    }
    let t34;
    if ($[63] !== seeds.accent || $[64] !== t33) {
        t34 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            type: "text",
            className: "min-w-0 flex-1 rounded border border-border bg-background px-3 py-2 font-mono text-[11px] text-foreground focus:outline-none focus:ring-1 focus:ring-ring",
            value: seeds.accent,
            onChange: t33
        }, void 0, false, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-workspace.tsx",
            lineNumber: 330,
            columnNumber: 11
        }, this);
        $[63] = seeds.accent;
        $[64] = t33;
        $[65] = t34;
    } else {
        t34 = $[65];
    }
    let t35;
    if ($[66] !== t32 || $[67] !== t34) {
        t35 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-1.5",
            children: [
                t29,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "flex items-center gap-2",
                    children: [
                        t32,
                        t34
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-workspace.tsx",
                    lineNumber: 339,
                    columnNumber: 45
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-workspace.tsx",
            lineNumber: 339,
            columnNumber: 11
        }, this);
        $[66] = t32;
        $[67] = t34;
        $[68] = t35;
    } else {
        t35 = $[68];
    }
    let t36;
    if ($[69] !== t21 || $[70] !== t28 || $[71] !== t35) {
        t36 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "space-y-4 rounded-lg border border-border bg-card/20 p-4",
            children: [
                t21,
                t28,
                t35
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-workspace.tsx",
            lineNumber: 348,
            columnNumber: 11
        }, this);
        $[69] = t21;
        $[70] = t28;
        $[71] = t35;
        $[72] = t36;
    } else {
        t36 = $[72];
    }
    let t37;
    if ($[73] !== displayValue || $[74] !== editTheme || $[75] !== onConfirmToggle || $[76] !== onRefresh || $[77] !== onShuffleAll || $[78] !== onValueInput || $[79] !== resolved || $[80] !== rows) {
        t37 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$devtools$2f$app$2d$dev$2f$colors$2f$color$2d$tool$2d$token$2d$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ColorToolTokenTable"], {
            rows: rows,
            resolved: resolved,
            editTheme: editTheme,
            displayValue: displayValue,
            onValueInput: onValueInput,
            onConfirmToggle: onConfirmToggle,
            onRefresh: onRefresh,
            onShuffleAll: onShuffleAll
        }, void 0, false, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-workspace.tsx",
            lineNumber: 358,
            columnNumber: 11
        }, this);
        $[73] = displayValue;
        $[74] = editTheme;
        $[75] = onConfirmToggle;
        $[76] = onRefresh;
        $[77] = onShuffleAll;
        $[78] = onValueInput;
        $[79] = resolved;
        $[80] = rows;
        $[81] = t37;
    } else {
        t37 = $[81];
    }
    let t38;
    if ($[82] === Symbol.for("react.memo_cache_sentinel")) {
        t38 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "font-mono text-[11px] uppercase tracking-wide text-muted-foreground",
                    children: "Preview"
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-workspace.tsx",
                    lineNumber: 373,
                    columnNumber: 16
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-1 text-[10px] leading-relaxed text-muted-foreground",
                    children: "Light and dark together. Hover buttons, body copy, or link for WCAG contrast details."
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-workspace.tsx",
                    lineNumber: 373,
                    columnNumber: 110
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-workspace.tsx",
            lineNumber: 373,
            columnNumber: 11
        }, this);
        $[82] = t38;
    } else {
        t38 = $[82];
    }
    let t39;
    if ($[83] !== resolvedLight) {
        t39 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$devtools$2f$app$2d$dev$2f$colors$2f$color$2d$tool$2d$preview$2d$helpers$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PreviewColumn"], {
            label: "Light (resolved)",
            v: resolvedLight
        }, void 0, false, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-workspace.tsx",
            lineNumber: 380,
            columnNumber: 11
        }, this);
        $[83] = resolvedLight;
        $[84] = t39;
    } else {
        t39 = $[84];
    }
    let t40;
    if ($[85] !== resolvedDark) {
        t40 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$devtools$2f$app$2d$dev$2f$colors$2f$color$2d$tool$2d$preview$2d$helpers$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PreviewColumn"], {
            label: "Dark (resolved)",
            v: resolvedDark
        }, void 0, false, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-workspace.tsx",
            lineNumber: 388,
            columnNumber: 11
        }, this);
        $[85] = resolvedDark;
        $[86] = t40;
    } else {
        t40 = $[86];
    }
    let t41;
    if ($[87] !== t39 || $[88] !== t40) {
        t41 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "space-y-3 rounded-lg border border-border bg-card/20 p-4",
            children: [
                t38,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid gap-3 overflow-visible sm:grid-cols-2",
                    children: [
                        t39,
                        t40
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-workspace.tsx",
                    lineNumber: 396,
                    columnNumber: 94
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-workspace.tsx",
            lineNumber: 396,
            columnNumber: 11
        }, this);
        $[87] = t39;
        $[88] = t40;
        $[89] = t41;
    } else {
        t41 = $[89];
    }
    let t42;
    if ($[90] !== t36 || $[91] !== t37 || $[92] !== t41) {
        t42 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6",
            children: [
                t36,
                t37,
                t41
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-workspace.tsx",
            lineNumber: 405,
            columnNumber: 11
        }, this);
        $[90] = t36;
        $[91] = t37;
        $[92] = t41;
        $[93] = t42;
    } else {
        t42 = $[93];
    }
    let t43;
    if ($[94] === Symbol.for("react.memo_cache_sentinel")) {
        t43 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "font-mono text-[11px] uppercase tracking-wide text-muted-foreground",
            children: "Code to paste"
        }, void 0, false, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-workspace.tsx",
            lineNumber: 415,
            columnNumber: 11
        }, this);
        $[94] = t43;
    } else {
        t43 = $[94];
    }
    let t44;
    if ($[95] === Symbol.for("react.memo_cache_sentinel")) {
        t44 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-[10px] leading-snug text-muted-foreground",
            children: [
                "Replace ",
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                    className: "font-mono text-[0.95em]",
                    children: "src/app/theme/config.ts"
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-workspace.tsx",
                    lineNumber: 422,
                    columnNumber: 81
                }, this),
                " ",
                "entirely."
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-workspace.tsx",
            lineNumber: 422,
            columnNumber: 11
        }, this);
        $[95] = t44;
    } else {
        t44 = $[95];
    }
    let t45;
    if ($[96] !== exportText) {
        t45 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
            className: "max-h-96 overflow-x-auto overflow-y-auto whitespace-pre-wrap rounded bg-muted/40 p-3 font-mono text-[11px] leading-relaxed text-foreground",
            children: exportText
        }, void 0, false, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-workspace.tsx",
            lineNumber: 429,
            columnNumber: 11
        }, this);
        $[96] = exportText;
        $[97] = t45;
    } else {
        t45 = $[97];
    }
    let t46;
    if ($[98] !== copyExportWithFlash) {
        t46 = ({
            "ColorToolWorkspace[<button>.onClick]": ()=>void copyExportWithFlash()
        })["ColorToolWorkspace[<button>.onClick]"];
        $[98] = copyExportWithFlash;
        $[99] = t46;
    } else {
        t46 = $[99];
    }
    const t47 = exportCopied ? "Copied!" : "Copy code";
    let t48;
    if ($[100] !== t46 || $[101] !== t47) {
        t48 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            onClick: t46,
            className: "w-full rounded border border-border px-3 py-2 text-sm font-mono text-foreground transition-colors hover:bg-muted",
            children: t47
        }, void 0, false, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-workspace.tsx",
            lineNumber: 448,
            columnNumber: 11
        }, this);
        $[100] = t46;
        $[101] = t47;
        $[102] = t48;
    } else {
        t48 = $[102];
    }
    let t49;
    if ($[103] !== t45 || $[104] !== t48) {
        t49 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "md:sticky md:top-8",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-3 rounded-lg border border-border bg-card/20 p-4",
                children: [
                    t43,
                    t44,
                    t45,
                    t48
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-workspace.tsx",
                lineNumber: 457,
                columnNumber: 47
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-workspace.tsx",
            lineNumber: 457,
            columnNumber: 11
        }, this);
        $[103] = t45;
        $[104] = t48;
        $[105] = t49;
    } else {
        t49 = $[105];
    }
    let t50;
    if ($[106] !== t42 || $[107] !== t49) {
        t50 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,1fr)_minmax(17.5rem,26.25rem)] md:items-start",
            children: [
                t42,
                t49
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-workspace.tsx",
            lineNumber: 466,
            columnNumber: 11
        }, this);
        $[106] = t42;
        $[107] = t49;
        $[108] = t50;
    } else {
        t50 = $[108];
    }
    let t51;
    if ($[109] !== t1 || $[110] !== t16 || $[111] !== t50 || $[112] !== t8) {
        t51 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$_components$2f$DevWorkbenchPageShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DevWorkbenchPageShell"], {
            nav: t1,
            children: [
                t8,
                t16,
                t50
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/color-tool-workspace.tsx",
            lineNumber: 475,
            columnNumber: 11
        }, this);
        $[109] = t1;
        $[110] = t16;
        $[111] = t50;
        $[112] = t8;
        $[113] = t51;
    } else {
        t51 = $[113];
    }
    return t51;
}
_c = ColorToolWorkspace;
var _c;
__turbopack_context__.k.register(_c, "ColorToolWorkspace");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/devtools/app-dev/colors/ColorToolClient.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ColorToolClient",
    ()=>ColorToolClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$theme$2f$palette$2d$suggest$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/app/theme/palette-suggest.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$colors$2f$color$2d$tool$2d$baseline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/app/dev/colors/color-tool-baseline.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$theme$2f$pb$2d$color$2d$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/app/theme/pb-color-tokens.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$workbench$2f$workbench$2d$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/app/dev/workbench/workbench-session.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$devtools$2f$app$2d$dev$2f$colors$2f$color$2d$tool$2d$export$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/devtools/app-dev/colors/color-tool-export.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$devtools$2f$app$2d$dev$2f$colors$2f$color$2d$tool$2d$workspace$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/devtools/app-dev/colors/color-tool-workspace.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
function ColorToolClient() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(68);
    if ($[0] !== "f6ba571659b1c8b0b445febf8d9e2e3cad02a8cf983e263db68e53fe59326955") {
        for(let $i = 0; $i < 68; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "f6ba571659b1c8b0b445febf8d9e2e3cad02a8cf983e263db68e53fe59326955";
    }
    const [initialColors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(_ColorToolClientUseState);
    const [seedsLight, setSeedsLight] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialColors.seedsLight);
    const [seedsDark, setSeedsDark] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialColors.seedsDark);
    const [rowsLight, setRowsLight] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialColors.rowsLight);
    const [rowsDark, setRowsDark] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialColors.rowsDark);
    const [editTheme, setEditTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("light");
    const [syncSeedsAcrossThemes, setSyncSeedsAcrossThemes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialColors.syncSeedsAcrossThemes === true);
    const [hydrated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [exportCopied, setExportCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    let t0;
    let t1;
    if ($[1] !== hydrated) {
        t0 = ({
            "ColorToolClient[useEffect()]": ()=>{
                if (("TURBOPACK compile-time value", "object") === "undefined" || !hydrated) {
                    return;
                }
                const syncColorsFromSession = {
                    "ColorToolClient[useEffect() > syncColorsFromSession]": ()=>{
                        const next = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$workbench$2f$workbench$2d$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getWorkbenchSession"])().colors;
                        if (next) {
                            setSeedsLight(next.seedsLight);
                            setSeedsDark(next.seedsDark);
                            setRowsLight(next.rowsLight);
                            setRowsDark(next.rowsDark);
                            setSyncSeedsAcrossThemes(next.syncSeedsAcrossThemes === true);
                        } else {
                            setSeedsLight(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$colors$2f$color$2d$tool$2d$baseline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEV_NEUTRAL_M1_SEEDS_LIGHT"]);
                            setSeedsDark(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$colors$2f$color$2d$tool$2d$baseline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEV_NEUTRAL_M1_SEEDS_DARK"]);
                            setRowsLight((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$theme$2f$palette$2d$suggest$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initialM1Rows"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$colors$2f$color$2d$tool$2d$baseline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEV_NEUTRAL_M1_SEEDS_LIGHT"], "light"));
                            setRowsDark((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$theme$2f$palette$2d$suggest$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initialM1Rows"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$colors$2f$color$2d$tool$2d$baseline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEV_NEUTRAL_M1_SEEDS_DARK"], "dark"));
                            setSyncSeedsAcrossThemes(false);
                        }
                    }
                }["ColorToolClient[useEffect() > syncColorsFromSession]"];
                const onStorage = {
                    "ColorToolClient[useEffect() > onStorage]": (e)=>{
                        if (e.key !== __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$workbench$2f$workbench$2d$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WORKBENCH_SESSION_STORAGE_KEY"]) {
                            return;
                        }
                        syncColorsFromSession();
                    }
                }["ColorToolClient[useEffect() > onStorage]"];
                const onWorkbenchCustom = {
                    "ColorToolClient[useEffect() > onWorkbenchCustom]": ()=>syncColorsFromSession()
                }["ColorToolClient[useEffect() > onWorkbenchCustom]"];
                window.addEventListener("storage", onStorage);
                window.addEventListener(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$workbench$2f$workbench$2d$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WORKBENCH_SESSION_CHANGED_EVENT"], onWorkbenchCustom);
                return ()=>{
                    window.removeEventListener("storage", onStorage);
                    window.removeEventListener(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$workbench$2f$workbench$2d$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WORKBENCH_SESSION_CHANGED_EVENT"], onWorkbenchCustom);
                };
            }
        })["ColorToolClient[useEffect()]"];
        t1 = [
            hydrated
        ];
        $[1] = hydrated;
        $[2] = t0;
        $[3] = t1;
    } else {
        t0 = $[2];
        t1 = $[3];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t0, t1);
    let t2;
    let t3;
    if ($[4] !== hydrated || $[5] !== rowsDark || $[6] !== rowsLight || $[7] !== seedsDark || $[8] !== seedsLight || $[9] !== syncSeedsAcrossThemes) {
        t2 = ({
            "ColorToolClient[useEffect()]": ()=>{
                if (!hydrated) {
                    return;
                }
                const payload = {
                    seedsLight,
                    seedsDark,
                    rowsLight,
                    rowsDark,
                    syncSeedsAcrossThemes
                };
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$workbench$2f$workbench$2d$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["patchWorkbenchColors"])(payload);
            }
        })["ColorToolClient[useEffect()]"];
        t3 = [
            hydrated,
            seedsLight,
            seedsDark,
            rowsLight,
            rowsDark,
            syncSeedsAcrossThemes
        ];
        $[4] = hydrated;
        $[5] = rowsDark;
        $[6] = rowsLight;
        $[7] = seedsDark;
        $[8] = seedsLight;
        $[9] = syncSeedsAcrossThemes;
        $[10] = t2;
        $[11] = t3;
    } else {
        t2 = $[10];
        t3 = $[11];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t2, t3);
    let t4;
    if ($[12] !== rowsLight || $[13] !== seedsLight) {
        t4 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$theme$2f$palette$2d$suggest$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["proposeM1Values"])(seedsLight, rowsLight, "light");
        $[12] = rowsLight;
        $[13] = seedsLight;
        $[14] = t4;
    } else {
        t4 = $[14];
    }
    const resolvedLight = t4;
    let t5;
    if ($[15] !== rowsDark || $[16] !== seedsDark) {
        t5 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$theme$2f$palette$2d$suggest$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["proposeM1Values"])(seedsDark, rowsDark, "dark");
        $[15] = rowsDark;
        $[16] = seedsDark;
        $[17] = t5;
    } else {
        t5 = $[17];
    }
    const resolvedDark = t5;
    const seeds = editTheme === "light" ? seedsLight : seedsDark;
    const rows = editTheme === "light" ? rowsLight : rowsDark;
    const resolved = editTheme === "light" ? resolvedLight : resolvedDark;
    let t6;
    if ($[18] !== rows || $[19] !== seeds) {
        t6 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$theme$2f$palette$2d$suggest$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["detectHarmony"])(seeds, rows);
        $[18] = rows;
        $[19] = seeds;
        $[20] = t6;
    } else {
        t6 = $[20];
    }
    const harmonyFit = t6;
    const setRows = editTheme === "light" ? setRowsLight : setRowsDark;
    const setSeeds = editTheme === "light" ? setSeedsLight : setSeedsDark;
    let t7;
    if ($[21] !== resolved || $[22] !== rows) {
        t7 = ({
            "ColorToolClient[displayValue]": (id)=>rows[id].confirmed ? rows[id].value : resolved[id]
        })["ColorToolClient[displayValue]"];
        $[21] = resolved;
        $[22] = rows;
        $[23] = t7;
    } else {
        t7 = $[23];
    }
    const displayValue = t7;
    let t8;
    if ($[24] !== setSeeds || $[25] !== syncSeedsAcrossThemes) {
        t8 = ({
            "ColorToolClient[setSeed]": (key, v)=>{
                if (syncSeedsAcrossThemes) {
                    setSeedsLight({
                        "ColorToolClient[setSeed > setSeedsLight()]": (s)=>({
                                ...s,
                                [key]: v
                            })
                    }["ColorToolClient[setSeed > setSeedsLight()]"]);
                    setSeedsDark({
                        "ColorToolClient[setSeed > setSeedsDark()]": (s_0)=>({
                                ...s_0,
                                [key]: v
                            })
                    }["ColorToolClient[setSeed > setSeedsDark()]"]);
                } else {
                    setSeeds({
                        "ColorToolClient[setSeed > setSeeds()]": (s_1)=>({
                                ...s_1,
                                [key]: v
                            })
                    }["ColorToolClient[setSeed > setSeeds()]"]);
                }
            }
        })["ColorToolClient[setSeed]"];
        $[24] = setSeeds;
        $[25] = syncSeedsAcrossThemes;
        $[26] = t8;
    } else {
        t8 = $[26];
    }
    const setSeed = t8;
    let t9;
    if ($[27] !== editTheme || $[28] !== seedsDark || $[29] !== seedsLight) {
        t9 = ({
            "ColorToolClient[onSyncSeedsToggle]": (checked)=>{
                setSyncSeedsAcrossThemes(checked);
                if (checked) {
                    const source = editTheme === "light" ? seedsLight : seedsDark;
                    const next_0 = {
                        ...source
                    };
                    setSeedsLight(next_0);
                    setSeedsDark(next_0);
                }
            }
        })["ColorToolClient[onSyncSeedsToggle]"];
        $[27] = editTheme;
        $[28] = seedsDark;
        $[29] = seedsLight;
        $[30] = t9;
    } else {
        t9 = $[30];
    }
    const onSyncSeedsToggle = t9;
    let t10;
    if ($[31] !== editTheme || $[32] !== seedsDark || $[33] !== seedsLight || $[34] !== setRows) {
        t10 = ({
            "ColorToolClient[onConfirmToggle]": (id_0, checked_0)=>{
                setRows({
                    "ColorToolClient[onConfirmToggle > setRows()]": (r)=>{
                        const seedsNow = editTheme === "light" ? seedsLight : seedsDark;
                        if (checked_0) {
                            const v_0 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$theme$2f$palette$2d$suggest$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["proposeM1Values"])(seedsNow, r, editTheme)[id_0];
                            return {
                                ...r,
                                [id_0]: {
                                    ...r[id_0],
                                    confirmed: true,
                                    value: v_0
                                }
                            };
                        }
                        return {
                            ...r,
                            [id_0]: {
                                ...r[id_0],
                                confirmed: false
                            }
                        };
                    }
                }["ColorToolClient[onConfirmToggle > setRows()]"]);
            }
        })["ColorToolClient[onConfirmToggle]"];
        $[31] = editTheme;
        $[32] = seedsDark;
        $[33] = seedsLight;
        $[34] = setRows;
        $[35] = t10;
    } else {
        t10 = $[35];
    }
    const onConfirmToggle = t10;
    let t11;
    if ($[36] !== setRows) {
        t11 = ({
            "ColorToolClient[onValueInput]": (id_1, v_1)=>{
                setRows({
                    "ColorToolClient[onValueInput > setRows()]": (r_0)=>({
                            ...r_0,
                            [id_1]: {
                                ...r_0[id_1],
                                value: v_1,
                                confirmed: true
                            }
                        })
                }["ColorToolClient[onValueInput > setRows()]"]);
            }
        })["ColorToolClient[onValueInput]"];
        $[36] = setRows;
        $[37] = t11;
    } else {
        t11 = $[37];
    }
    const onValueInput = t11;
    let t12;
    if ($[38] !== setRows) {
        t12 = ({
            "ColorToolClient[onRefresh]": (id_2)=>{
                setRows({
                    "ColorToolClient[onRefresh > setRows()]": (r_1)=>{
                        if (r_1[id_2].confirmed) {
                            return r_1;
                        }
                        return {
                            ...r_1,
                            [id_2]: {
                                ...r_1[id_2],
                                rowVariant: r_1[id_2].rowVariant + 1
                            }
                        };
                    }
                }["ColorToolClient[onRefresh > setRows()]"]);
            }
        })["ColorToolClient[onRefresh]"];
        $[38] = setRows;
        $[39] = t12;
    } else {
        t12 = $[39];
    }
    const onRefresh = t12;
    let t13;
    if ($[40] === Symbol.for("react.memo_cache_sentinel")) {
        t13 = ({
            "ColorToolClient[onShuffleSeeds]": ()=>{
                const { seedsLight: seedsLight_0, seedsDark: seedsDark_0 } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$theme$2f$palette$2d$suggest$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["suggestSeeds"])();
                setSeedsLight(seedsLight_0);
                setSeedsDark(seedsDark_0);
            }
        })["ColorToolClient[onShuffleSeeds]"];
        $[40] = t13;
    } else {
        t13 = $[40];
    }
    const onShuffleSeeds = t13;
    let t14;
    if ($[41] !== setRows) {
        t14 = ({
            "ColorToolClient[onShuffleAll]": ()=>{
                setRows(_ColorToolClientOnShuffleAllSetRows);
            }
        })["ColorToolClient[onShuffleAll]"];
        $[41] = setRows;
        $[42] = t14;
    } else {
        t14 = $[42];
    }
    const onShuffleAll = t14;
    let t15;
    if ($[43] === Symbol.for("react.memo_cache_sentinel")) {
        t15 = ({
            "ColorToolClient[resetColorTool]": ()=>{
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$workbench$2f$workbench$2d$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clearWorkbenchColors"])();
                setSeedsLight(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$colors$2f$color$2d$tool$2d$baseline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEV_NEUTRAL_M1_SEEDS_LIGHT"]);
                setSeedsDark(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$colors$2f$color$2d$tool$2d$baseline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEV_NEUTRAL_M1_SEEDS_DARK"]);
                setRowsLight((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$theme$2f$palette$2d$suggest$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initialM1Rows"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$colors$2f$color$2d$tool$2d$baseline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEV_NEUTRAL_M1_SEEDS_LIGHT"], "light"));
                setRowsDark((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$theme$2f$palette$2d$suggest$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initialM1Rows"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$colors$2f$color$2d$tool$2d$baseline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEV_NEUTRAL_M1_SEEDS_DARK"], "dark"));
                setSyncSeedsAcrossThemes(false);
                setEditTheme("light");
                setExportCopied(false);
            }
        })["ColorToolClient[resetColorTool]"];
        $[43] = t15;
    } else {
        t15 = $[43];
    }
    const resetColorTool = t15;
    let t16;
    if ($[44] !== resolvedDark || $[45] !== resolvedLight) {
        t16 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$devtools$2f$app$2d$dev$2f$colors$2f$color$2d$tool$2d$export$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildThemeConfigFileExport"])(resolvedLight, resolvedDark);
        $[44] = resolvedDark;
        $[45] = resolvedLight;
        $[46] = t16;
    } else {
        t16 = $[46];
    }
    const exportText = t16;
    let t17;
    if ($[47] !== exportText) {
        t17 = ({
            "ColorToolClient[copyExportWithFlash]": async ()=>{
                try {
                    await navigator.clipboard.writeText(exportText);
                    setExportCopied(true);
                    setTimeout({
                        "ColorToolClient[copyExportWithFlash > setTimeout()]": ()=>setExportCopied(false)
                    }["ColorToolClient[copyExportWithFlash > setTimeout()]"], 2000);
                } catch  {}
            }
        })["ColorToolClient[copyExportWithFlash]"];
        $[47] = exportText;
        $[48] = t17;
    } else {
        t17 = $[48];
    }
    const copyExportWithFlash = t17;
    let t18;
    if ($[49] !== copyExportWithFlash || $[50] !== displayValue || $[51] !== editTheme || $[52] !== exportCopied || $[53] !== exportText || $[54] !== harmonyFit || $[55] !== onConfirmToggle || $[56] !== onRefresh || $[57] !== onShuffleAll || $[58] !== onSyncSeedsToggle || $[59] !== onValueInput || $[60] !== resolved || $[61] !== resolvedDark || $[62] !== resolvedLight || $[63] !== rows || $[64] !== seeds || $[65] !== setSeed || $[66] !== syncSeedsAcrossThemes) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$devtools$2f$app$2d$dev$2f$colors$2f$color$2d$tool$2d$workspace$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ColorToolWorkspace"], {
            resetColorTool: resetColorTool,
            editTheme: editTheme,
            setEditTheme: setEditTheme,
            syncSeedsAcrossThemes: syncSeedsAcrossThemes,
            onSyncSeedsToggle: onSyncSeedsToggle,
            harmonyFit: harmonyFit,
            rows: rows,
            seeds: seeds,
            setSeed: setSeed,
            onShuffleSeeds: onShuffleSeeds,
            displayValue: displayValue,
            onValueInput: onValueInput,
            onConfirmToggle: onConfirmToggle,
            onRefresh: onRefresh,
            onShuffleAll: onShuffleAll,
            resolved: resolved,
            resolvedLight: resolvedLight,
            resolvedDark: resolvedDark,
            exportText: exportText,
            copyExportWithFlash: copyExportWithFlash,
            exportCopied: exportCopied
        }, void 0, false, {
            fileName: "[project]/apps/web/src/devtools/app-dev/colors/ColorToolClient.tsx",
            lineNumber: 385,
            columnNumber: 11
        }, this);
        $[49] = copyExportWithFlash;
        $[50] = displayValue;
        $[51] = editTheme;
        $[52] = exportCopied;
        $[53] = exportText;
        $[54] = harmonyFit;
        $[55] = onConfirmToggle;
        $[56] = onRefresh;
        $[57] = onShuffleAll;
        $[58] = onSyncSeedsToggle;
        $[59] = onValueInput;
        $[60] = resolved;
        $[61] = resolvedDark;
        $[62] = resolvedLight;
        $[63] = rows;
        $[64] = seeds;
        $[65] = setSeed;
        $[66] = syncSeedsAcrossThemes;
        $[67] = t18;
    } else {
        t18 = $[67];
    }
    return t18;
}
_s(ColorToolClient, "kjx+in0FG9MAl59YHSisH9oCCdU=");
_c = ColorToolClient;
function _ColorToolClientOnShuffleAllSetRows(r_2) {
    const next_1 = {
        ...r_2
    };
    for (const id_3 of __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$theme$2f$pb$2d$color$2d$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["M1_TOKEN_IDS"]){
        if (!r_2[id_3].confirmed) {
            next_1[id_3] = {
                ...r_2[id_3],
                rowVariant: r_2[id_3].rowVariant + 1
            };
        }
    }
    return next_1;
}
function _ColorToolClientUseState() {
    const saved = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$workbench$2f$workbench$2d$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getWorkbenchSession"])().colors;
    return saved ?? {
        seedsLight: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$colors$2f$color$2d$tool$2d$baseline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEV_NEUTRAL_M1_SEEDS_LIGHT"],
        seedsDark: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$colors$2f$color$2d$tool$2d$baseline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEV_NEUTRAL_M1_SEEDS_DARK"],
        rowsLight: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$theme$2f$palette$2d$suggest$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initialM1Rows"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$colors$2f$color$2d$tool$2d$baseline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEV_NEUTRAL_M1_SEEDS_LIGHT"], "light"),
        rowsDark: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$theme$2f$palette$2d$suggest$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initialM1Rows"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$app$2f$dev$2f$colors$2f$color$2d$tool$2d$baseline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEV_NEUTRAL_M1_SEEDS_DARK"], "dark"),
        syncSeedsAcrossThemes: true
    };
}
var _c;
__turbopack_context__.k.register(_c, "ColorToolClient");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/devtools/app-dev/colors/ColorToolClient.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/apps/web/src/devtools/app-dev/colors/ColorToolClient.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=_07511344._.js.map