(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/apps/web/src/core/providers/theme-provider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-themes/dist/index.mjs [app-client] (ecmascript)");
"use client";
;
;
;
function ThemeProvider(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(7);
    if ($[0] !== "6753a6d0a01d00f89f3854eafe113560f5a8c3006287d13f56cdbd37ad280d0e") {
        for(let $i = 0; $i < 7; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "6753a6d0a01d00f89f3854eafe113560f5a8c3006287d13f56cdbd37ad280d0e";
    }
    let children;
    let props;
    if ($[1] !== t0) {
        ({ children, ...props } = t0);
        $[1] = t0;
        $[2] = children;
        $[3] = props;
    } else {
        children = $[2];
        props = $[3];
    }
    let t1;
    if ($[4] !== children || $[5] !== props) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeProvider"], {
            ...props,
            children: children
        }, void 0, false, {
            fileName: "[project]/apps/web/src/core/providers/theme-provider.tsx",
            lineNumber: 30,
            columnNumber: 10
        }, this);
        $[4] = children;
        $[5] = props;
        $[6] = t1;
    } else {
        t1 = $[6];
    }
    return t1;
}
_c = ThemeProvider;
var _c;
__turbopack_context__.k.register(_c, "ThemeProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/core/ui/app-layout.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppLayout",
    ()=>AppLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
"use client";
;
;
function AppLayout(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(6);
    if ($[0] !== "0e391f99333f96f6b795f314333209a24357a1e364aafd699b4a605124834cb4") {
        for(let $i = 0; $i < 6; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "0e391f99333f96f6b795f314333209a24357a1e364aafd699b4a605124834cb4";
    }
    const { children, afterChildren } = t0;
    let t1;
    if ($[1] !== children) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-dvh w-full min-w-0 flex flex-col",
            children: children
        }, void 0, false, {
            fileName: "[project]/apps/web/src/core/ui/app-layout.tsx",
            lineNumber: 22,
            columnNumber: 10
        }, this);
        $[1] = children;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const t2 = afterChildren ?? null;
    let t3;
    if ($[3] !== t1 || $[4] !== t2) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                t1,
                t2
            ]
        }, void 0, true);
        $[3] = t1;
        $[4] = t2;
        $[5] = t3;
    } else {
        t3 = $[5];
    }
    return t3;
}
_c = AppLayout;
var _c;
__turbopack_context__.k.register(_c, "AppLayout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/core/providers/device-type-provider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DeviceTypeProvider",
    ()=>DeviceTypeProvider,
    "ServerBreakpointProvider",
    ()=>ServerBreakpointProvider,
    "useDeviceType",
    ()=>useDeviceType
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
const DeviceTypeContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
/** When set (e.g. by PageBuilderRenderer with server-resolved tree), useDeviceType returns this and no resize listener runs. */ const ServerBreakpointContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const MOBILE_BREAKPOINT = 768;
function useDeviceType() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(1);
    if ($[0] !== "56b7f71f6295562ef9dd74508adeb55585d184b4aacba4682e1f8b2216da262d") {
        for(let $i = 0; $i < 1; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "56b7f71f6295562ef9dd74508adeb55585d184b4aacba4682e1f8b2216da262d";
    }
    const serverBreakpoint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ServerBreakpointContext);
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(DeviceTypeContext);
    if (serverBreakpoint !== undefined) {
        return serverBreakpoint;
    }
    if (context === undefined) {
        throw new Error("useDeviceType must be used within DeviceTypeProvider or ServerBreakpointProvider");
    }
    return context;
}
_s(useDeviceType, "xEIFMZ3V+oICbXSwrOblM41Lz+o=");
function ServerBreakpointProvider(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(7);
    if ($[0] !== "56b7f71f6295562ef9dd74508adeb55585d184b4aacba4682e1f8b2216da262d") {
        for(let $i = 0; $i < 7; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "56b7f71f6295562ef9dd74508adeb55585d184b4aacba4682e1f8b2216da262d";
    }
    const { isMobile, children } = t0;
    const t1 = !isMobile;
    let t2;
    if ($[1] !== isMobile || $[2] !== t1) {
        t2 = {
            isMobile,
            isDesktop: t1
        };
        $[1] = isMobile;
        $[2] = t1;
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    const value = t2;
    let t3;
    if ($[4] !== children || $[5] !== value) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ServerBreakpointContext.Provider, {
            value: value,
            children: children
        }, void 0, false, {
            fileName: "[project]/apps/web/src/core/providers/device-type-provider.tsx",
            lineNumber: 62,
            columnNumber: 10
        }, this);
        $[4] = children;
        $[5] = value;
        $[6] = t3;
    } else {
        t3 = $[6];
    }
    return t3;
}
_c = ServerBreakpointProvider;
function DeviceTypeProvider(t0) {
    _s1();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "56b7f71f6295562ef9dd74508adeb55585d184b4aacba4682e1f8b2216da262d") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "56b7f71f6295562ef9dd74508adeb55585d184b4aacba4682e1f8b2216da262d";
    }
    const { children } = t0;
    const [isDesktop, setIsDesktop] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    let t1;
    let t2;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = ({
            "DeviceTypeProvider[useEffect()]": ()=>{
                const checkDeviceType = {
                    "DeviceTypeProvider[useEffect() > checkDeviceType]": ()=>{
                        const isMobileUserAgent = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
                        const isMobileWidth = window.innerWidth < MOBILE_BREAKPOINT;
                        const isMobile = isMobileUserAgent || isMobileWidth;
                        setIsDesktop(!isMobile);
                    }
                }["DeviceTypeProvider[useEffect() > checkDeviceType]"];
                checkDeviceType();
                window.addEventListener("resize", checkDeviceType);
                return ()=>{
                    window.removeEventListener("resize", checkDeviceType);
                };
            }
        })["DeviceTypeProvider[useEffect()]"];
        t2 = [];
        $[1] = t1;
        $[2] = t2;
    } else {
        t1 = $[1];
        t2 = $[2];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t1, t2);
    const t3 = !isDesktop;
    let t4;
    if ($[3] !== isDesktop || $[4] !== t3) {
        t4 = {
            isDesktop,
            isMobile: t3
        };
        $[3] = isDesktop;
        $[4] = t3;
        $[5] = t4;
    } else {
        t4 = $[5];
    }
    const value = t4;
    let t5;
    if ($[6] !== children || $[7] !== value) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DeviceTypeContext.Provider, {
            value: value,
            children: children
        }, void 0, false, {
            fileName: "[project]/apps/web/src/core/providers/device-type-provider.tsx",
            lineNumber: 127,
            columnNumber: 10
        }, this);
        $[6] = children;
        $[7] = value;
        $[8] = t5;
    } else {
        t5 = $[8];
    }
    return t5;
}
_s1(DeviceTypeProvider, "zvsbGeQuqUJ/EOlRKb9NVdk+wLo=");
_c1 = DeviceTypeProvider;
var _c, _c1;
__turbopack_context__.k.register(_c, "ServerBreakpointProvider");
__turbopack_context__.k.register(_c1, "DeviceTypeProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/core/dev/DevPageValidationClient.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DevPageValidationClient",
    ()=>DevPageValidationClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
/** Current page slug path from pathname (e.g. /work/lenero → work/lenero). */ function getSlugFromPathname(pathname) {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length < 2) return null;
    return segments.join("/");
}
/** Only validate when we're on a page-builder detail route (e.g. /teaching/foo, /work/bar). Skip index/section routes like /teaching, /work, and internal dev tools like /dev/*, /playground. */ function isPageBuilderDetailPath(pathname) {
    const segments = pathname.split("/").filter(Boolean);
    if (segments[0] === "dev" || segments[0] === "playground") return false;
    return segments.length >= 2;
}
function DevPageValidationClient() {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DevPageValidationClient.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            if (!pathname || !isPageBuilderDetailPath(pathname)) return;
            const slug = getSlugFromPathname(pathname);
            if (!slug) return;
            const controller = new AbortController();
            const url = `/api/dev/page-validation?slug=${encodeURIComponent(slug)}`;
            async function run() {
                try {
                    const res = await fetch(url, {
                        signal: controller.signal
                    });
                    if (!res.ok) return;
                    const data = await res.json();
                    if (!Array.isArray(data.results) || data.results.length === 0) return;
                    const [page] = data.results;
                    if (!page) return;
                    if (page.valid) return;
                    console.error("[page-builder validation] Page has errors:", page.slug);
                    for (const error_0 of page.errors){
                        console.error(error_0);
                    }
                } catch (error) {
                    if (error.name === "AbortError") return;
                    console.error("[page-builder validation] Failed to fetch validation results", error);
                }
            }
            void run();
            return ({
                "DevPageValidationClient.useEffect": ()=>{
                    controller.abort();
                }
            })["DevPageValidationClient.useEffect"];
        }
    }["DevPageValidationClient.useEffect"], [
        pathname
    ]);
    return null;
}
_s(DevPageValidationClient, "V/ldUoOTYUs0Cb2F6bbxKSn7KxI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = DevPageValidationClient;
var _c;
__turbopack_context__.k.register(_c, "DevPageValidationClient");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/core/dev/DevContentReloadClient.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DevContentReloadClient",
    ()=>DevContentReloadClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
const POLL_INTERVAL_MS = 1200;
function DevContentReloadClient() {
    _s();
    const lastSeen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const hasBaseline = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DevContentReloadClient.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            const controller = new AbortController();
            const poll = {
                "DevContentReloadClient.useEffect.poll": async ()=>{
                    try {
                        const res = await fetch("/api/dev/content-watch", {
                            signal: controller.signal,
                            cache: "no-store"
                        });
                        if (!res.ok) return;
                        const data = await res.json();
                        const t = typeof data.lastContentChange === "number" ? data.lastContentChange : 0;
                        if (hasBaseline.current && t > lastSeen.current) {
                            window.location.reload();
                        }
                        lastSeen.current = t;
                        hasBaseline.current = true;
                    } catch (e) {
                        if (e.name === "AbortError") return;
                    }
                }
            }["DevContentReloadClient.useEffect.poll"];
            void poll();
            const id = setInterval(poll, POLL_INTERVAL_MS);
            return ({
                "DevContentReloadClient.useEffect": ()=>{
                    controller.abort();
                    clearInterval(id);
                }
            })["DevContentReloadClient.useEffect"];
        }
    }["DevContentReloadClient.useEffect"], []);
    return null;
}
_s(DevContentReloadClient, "kql3KkGBpVHtZAJ6ja+iU5/qDFU=");
_c = DevContentReloadClient;
var _c;
__turbopack_context__.k.register(_c, "DevContentReloadClient");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/runtime-react/src/page-builder/runtime/page-builder-variable-store.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearVariables",
    ()=>clearVariables,
    "getVariable",
    ()=>getVariable,
    "hasVariable",
    ()=>hasVariable,
    "setVariable",
    ()=>setVariable,
    "useActionLogStore",
    ()=>useActionLogStore,
    "useVariable",
    ()=>useVariable,
    "useVariableStore",
    ()=>useVariableStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
/**
 * Runtime variable store for page-builder setVariable / conditionalAction.
 * Zustand singleton with subscribeWithSelector middleware.
 * Cleared on route change — no persistence middleware by design.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/middleware.mjs [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
const useActionLogStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])()((set)=>({
        entries: [],
        push: (entry)=>set((state)=>({
                    entries: [
                        {
                            ...entry,
                            id: state.entries.length
                        },
                        ...state.entries
                    ].slice(0, 50)
                })),
        clear: ()=>set({
                entries: []
            })
    }));
const useVariableStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribeWithSelector"])((set)=>({
        variables: {},
        setVariable: (key, value)=>set((state)=>({
                    variables: {
                        ...state.variables,
                        [key]: value
                    }
                })),
        clearVariables: ()=>set({
                variables: {}
            })
    })));
function useVariable(key) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "aa403877ae67ad9acf074c80f9540a8e285167b8c00eb5883dddef7db45ef6e4") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "aa403877ae67ad9acf074c80f9540a8e285167b8c00eb5883dddef7db45ef6e4";
    }
    let t0;
    if ($[1] !== key) {
        t0 = ({
            "useVariable[useVariableStore()]": (state)=>state.variables[key]
        })["useVariable[useVariableStore()]"];
        $[1] = key;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    return useVariableStore(t0);
}
_s(useVariable, "MvivRmI+JtFzySy9f8aXgkGHmLM=", false, function() {
    return [
        useVariableStore
    ];
});
const setVariable = (key, value)=>useVariableStore.getState().setVariable(key, value);
const getVariable = (key)=>useVariableStore.getState().variables[key];
const hasVariable = (key)=>key in useVariableStore.getState().variables;
const clearVariables = ()=>useVariableStore.getState().clearVariables();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/runtime-react/src/core/lib/responsive-value.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Responsive layout values: single value = both breakpoints, [mobile, desktop] = override per breakpoint.
 * Convention: array is always [mobile, desktop].
 */ __turbopack_context__.s([
    "resolveResponsiveValue",
    ()=>resolveResponsiveValue
]);
function resolveResponsiveValue(value, isMobile) {
    if (value === undefined) return undefined;
    if (Array.isArray(value)) return isMobile ? value[0] : value[1];
    return value;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/core/src/internal/section-constants.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_BACKDROP_BLUR_AMOUNT",
    ()=>DEFAULT_BACKDROP_BLUR_AMOUNT,
    "DEFAULT_BLEND_MODE",
    ()=>DEFAULT_BLEND_MODE,
    "DEFAULT_SCROLL_SPEED",
    ()=>DEFAULT_SCROLL_SPEED,
    "Z_INDEX",
    ()=>Z_INDEX
]);
const Z_INDEX = {
    FIXED_SECTION: 50,
    LAYER_STACK: 10
};
const DEFAULT_SCROLL_SPEED = 1;
const DEFAULT_BLEND_MODE = "normal";
const DEFAULT_BACKDROP_BLUR_AMOUNT = "12px";
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/core/src/internal/section-effects.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sectionEffectsToStyle",
    ()=>sectionEffectsToStyle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$section$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/core/src/internal/section-constants.ts [app-client] (ecmascript)");
;
function handleBackdropBlur(effect) {
    const amount = effect.amount ?? __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$section$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_BACKDROP_BLUR_AMOUNT"];
    return {
        backdropFilter: `blur(${amount})`,
        WebkitBackdropFilter: `blur(${amount})`
    };
}
function handleDropShadow(effect) {
    const x = effect.x ?? "0px";
    const y = effect.y ?? "4px";
    const blur = effect.blur ?? "24px";
    const spread = effect.spread ? ` ${effect.spread}` : "";
    const color = effect.color ?? "rgba(0,0,0,0.15)";
    return {
        boxShadow: `${x} ${y} ${blur}${spread} ${color}`
    };
}
function handleGlass(effect) {
    void effect;
    return {};
}
function handleInnerShadow(effect) {
    const x = effect.x ?? "0px";
    const y = effect.y ?? "4px";
    const blur = effect.blur ?? "24px";
    const spread = effect.spread ? ` ${effect.spread}` : "";
    const color = effect.color ?? "rgba(0,0,0,0.15)";
    return {
        boxShadow: `inset ${x} ${y} ${blur}${spread} ${color}`
    };
}
function handleGlow(effect) {
    const blur = effect.blur ?? "20px";
    const spread = effect.spread ?? "0px";
    const color = effect.color ?? "rgba(0,0,0,0.5)";
    return {
        boxShadow: `0 0 ${blur} ${spread} ${color}`
    };
}
function handleOpacity(effect) {
    return {
        opacity: effect.value ?? 1
    };
}
function handleBlur(effect) {
    const amount = effect.amount ?? "4px";
    return {
        filter: `blur(${amount})`
    };
}
function handleBrightness(effect) {
    return {
        filter: `brightness(${effect.value ?? 1})`
    };
}
function handleContrast(effect) {
    return {
        filter: `contrast(${effect.value ?? 1})`
    };
}
function handleSaturate(effect) {
    return {
        filter: `saturate(${effect.value ?? 1})`
    };
}
function handleGrayscale(effect) {
    return {
        filter: `grayscale(${effect.value ?? 0})`
    };
}
function handleSepia(effect) {
    return {
        filter: `sepia(${effect.value ?? 0})`
    };
}
const EFFECT_HANDLERS = {
    backdropBlur: handleBackdropBlur,
    glass: handleGlass,
    dropShadow: handleDropShadow,
    innerShadow: handleInnerShadow,
    glow: handleGlow,
    opacity: handleOpacity,
    blur: handleBlur,
    brightness: handleBrightness,
    contrast: handleContrast,
    saturate: handleSaturate,
    grayscale: handleGrayscale,
    sepia: handleSepia
};
function sectionEffectsToStyle(effects) {
    if (!effects?.length) return {};
    const shadows = [];
    const filters = [];
    const backdropFilters = [];
    let style = {};
    for (const effect of effects){
        const handler = EFFECT_HANDLERS[effect.type];
        const result = handler ? handler(effect) : {};
        const boxShadow = result.boxShadow;
        const filter = result.filter;
        const backdropFilter = result.backdropFilter;
        const rest = {
            ...result
        };
        delete rest.boxShadow;
        delete rest.filter;
        delete rest.backdropFilter;
        delete rest.WebkitBackdropFilter;
        if (typeof boxShadow === "string" && boxShadow.length > 0) shadows.push(boxShadow);
        if (typeof filter === "string" && filter.length > 0) filters.push(filter);
        if (typeof backdropFilter === "string" && backdropFilter.length > 0) {
            backdropFilters.push(backdropFilter);
        }
        if (Object.keys(rest).length > 0) style = {
            ...style,
            ...rest
        };
    }
    return {
        ...style,
        ...shadows.length > 0 && {
            boxShadow: shadows.join(", ")
        },
        ...filters.length > 0 && {
            filter: filters.join(" ")
        },
        ...backdropFilters.length > 0 && {
            backdropFilter: backdropFilters.join(" "),
            WebkitBackdropFilter: backdropFilters.join(" ")
        }
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/core/src/internal/section-utils/section-layout-and-scroll.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getDefaultScrollSpeed",
    ()=>getDefaultScrollSpeed,
    "getSectionAlignStyle",
    ()=>getSectionAlignStyle,
    "handleSectionWheel",
    ()=>handleSectionWheel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$section$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/core/src/internal/section-constants.ts [app-client] (ecmascript)");
;
function getSectionAlignStyle(align, width) {
    if (align === "center") {
        return {
            marginLeft: "auto",
            marginRight: "auto"
        };
    }
    if (align === "right") {
        return {
            marginLeft: "auto",
            marginRight: 0
        };
    }
    if (align === "full") {
        return width !== "hug" ? {
            width: "100%",
            marginLeft: 0,
            marginRight: 0
        } : {
            marginLeft: 0,
            marginRight: 0
        };
    }
    return {};
}
function getDefaultScrollSpeed() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$section$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_SCROLL_SPEED"];
}
;
function handleSectionWheel(e, scrollSpeed = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$section$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_SCROLL_SPEED"]) {
    const el = e.currentTarget;
    if (el.scrollHeight <= el.clientHeight) return;
    if (scrollSpeed === __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$section$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_SCROLL_SPEED"]) {
        e.stopPropagation();
        return;
    }
    e.preventDefault();
    e.stopPropagation();
    const delta = e.deltaY * scrollSpeed;
    el.scrollTop += delta;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/core/src/internal/section-utils/section-effects-and-transforms.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "borderToCss",
    ()=>borderToCss,
    "buildTransformString",
    ()=>buildTransformString,
    "castBlendMode",
    ()=>castBlendMode,
    "computeParallaxOffset",
    ()=>computeParallaxOffset,
    "getDefaultBlendMode",
    ()=>getDefaultBlendMode
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$section$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/core/src/internal/section-constants.ts [app-client] (ecmascript)");
;
const DEFAULT_BLEND = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$section$2d$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_BLEND_MODE"];
function computeParallaxOffset(scrollTop, config) {
    const speedMultiplier = config.scrollSpeed - config.defaultScrollSpeed;
    if (config.basePosition !== null) {
        return -(scrollTop * speedMultiplier);
    }
    // Continuous: (scrollTop - sectionTop) * multiplier for all scroll. No gate so parallax runs from page start.
    return (scrollTop - config.sectionTop) * speedMultiplier;
}
function getDefaultBlendMode() {
    return DEFAULT_BLEND;
}
function buildTransformString(existingTransform, parallaxY) {
    const transformParts = [];
    if (existingTransform) transformParts.push(existingTransform);
    if (parallaxY !== undefined && parallaxY !== 0) {
        transformParts.push(`translateY(${parallaxY}px)`);
    }
    return transformParts.length > 0 ? transformParts.join(" ") : undefined;
}
function borderToCss(border) {
    if (!border) return undefined;
    const width = border.width ?? "1px";
    const style = border.style ?? "solid";
    const color = border.color ?? "#000";
    return `${width} ${style} ${color}`;
}
function castBlendMode(blendMode) {
    return blendMode ?? DEFAULT_BLEND;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/core/src/internal/section-utils/css-value-parsing.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "convertToPixels",
    ()=>convertToPixels,
    "getDefaultParseCssContext",
    ()=>getDefaultParseCssContext,
    "normalizeCssValue",
    ()=>normalizeCssValue,
    "parseCssValueToPixels",
    ()=>parseCssValueToPixels,
    "parseNumericWithUnit",
    ()=>parseNumericWithUnit
]);
function getDefaultParseCssContext(isVertical) {
    if (("TURBOPACK compile-time value", "object") === "undefined" || typeof document === "undefined") return null;
    try {
        const fs = parseFloat(getComputedStyle(document.documentElement).fontSize);
        return {
            rootFontSizePx: Number.isFinite(fs) ? fs : 16,
            viewportWidth: window.innerWidth,
            viewportHeight: window.innerHeight,
            isVertical
        };
    } catch  {
        return null;
    }
}
function normalizeCssValue(input) {
    return input.trim();
}
function parseNumericWithUnit(value) {
    const match = value.match(/^([\d.]+)(px|vh|vw|rem|em|%)$/);
    if (!match || match[1] == null || match[2] == null) return null;
    const num = parseFloat(match[1]);
    return Number.isFinite(num) ? {
        num,
        unit: match[2]
    } : null;
}
function convertToPixels(parsed, ctx) {
    const { num, unit } = parsed;
    if (unit === "px") return num;
    if (unit === "%") return null;
    if (!ctx) return null;
    if (unit === "vh" && ctx.isVertical) return num / 100 * ctx.viewportHeight;
    if (unit === "vw" && !ctx.isVertical) return num / 100 * ctx.viewportWidth;
    if (unit === "rem" || unit === "em") return num * ctx.rootFontSizePx;
    return null;
}
function parseCssValueToPixels(value, isVertical) {
    if (value === undefined) return null;
    if (typeof value === "number") return Number.isFinite(value) ? value : null;
    if (typeof value !== "string") return null;
    const normalized = normalizeCssValue(value);
    const parsed = parseNumericWithUnit(normalized);
    if (!parsed) return null;
    const ctx = getDefaultParseCssContext(isVertical);
    return convertToPixels(parsed, ctx);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/core/src/internal/section-utils.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$section$2d$utils$2f$section$2d$layout$2d$and$2d$scroll$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/core/src/internal/section-utils/section-layout-and-scroll.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$section$2d$utils$2f$section$2d$effects$2d$and$2d$transforms$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/core/src/internal/section-utils/section-effects-and-transforms.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$section$2d$utils$2f$css$2d$value$2d$parsing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/core/src/internal/section-utils/css-value-parsing.ts [app-client] (ecmascript)");
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/runtime-react/src/core/providers/device-type-provider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DeviceTypeProvider",
    ()=>DeviceTypeProvider,
    "ServerBreakpointProvider",
    ()=>ServerBreakpointProvider,
    "useDeviceType",
    ()=>useDeviceType
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
const DeviceTypeContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
/** When set (e.g. by PageBuilderRenderer with server-resolved tree), useDeviceType returns this and no resize listener runs. */ const ServerBreakpointContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const MOBILE_BREAKPOINT = 768;
function useDeviceType() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(1);
    if ($[0] !== "56b7f71f6295562ef9dd74508adeb55585d184b4aacba4682e1f8b2216da262d") {
        for(let $i = 0; $i < 1; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "56b7f71f6295562ef9dd74508adeb55585d184b4aacba4682e1f8b2216da262d";
    }
    const serverBreakpoint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ServerBreakpointContext);
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(DeviceTypeContext);
    if (serverBreakpoint !== undefined) {
        return serverBreakpoint;
    }
    if (context === undefined) {
        throw new Error("useDeviceType must be used within DeviceTypeProvider or ServerBreakpointProvider");
    }
    return context;
}
_s(useDeviceType, "xEIFMZ3V+oICbXSwrOblM41Lz+o=");
function ServerBreakpointProvider(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(7);
    if ($[0] !== "56b7f71f6295562ef9dd74508adeb55585d184b4aacba4682e1f8b2216da262d") {
        for(let $i = 0; $i < 7; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "56b7f71f6295562ef9dd74508adeb55585d184b4aacba4682e1f8b2216da262d";
    }
    const { isMobile, children } = t0;
    const t1 = !isMobile;
    let t2;
    if ($[1] !== isMobile || $[2] !== t1) {
        t2 = {
            isMobile,
            isDesktop: t1
        };
        $[1] = isMobile;
        $[2] = t1;
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    const value = t2;
    let t3;
    if ($[4] !== children || $[5] !== value) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ServerBreakpointContext.Provider, {
            value: value,
            children: children
        }, void 0, false, {
            fileName: "[project]/packages/runtime-react/src/core/providers/device-type-provider.tsx",
            lineNumber: 62,
            columnNumber: 10
        }, this);
        $[4] = children;
        $[5] = value;
        $[6] = t3;
    } else {
        t3 = $[6];
    }
    return t3;
}
_c = ServerBreakpointProvider;
function DeviceTypeProvider(t0) {
    _s1();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "56b7f71f6295562ef9dd74508adeb55585d184b4aacba4682e1f8b2216da262d") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "56b7f71f6295562ef9dd74508adeb55585d184b4aacba4682e1f8b2216da262d";
    }
    const { children } = t0;
    const [isDesktop, setIsDesktop] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    let t1;
    let t2;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = ({
            "DeviceTypeProvider[useEffect()]": ()=>{
                const checkDeviceType = {
                    "DeviceTypeProvider[useEffect() > checkDeviceType]": ()=>{
                        const isMobileUserAgent = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
                        const isMobileWidth = window.innerWidth < MOBILE_BREAKPOINT;
                        const isMobile = isMobileUserAgent || isMobileWidth;
                        setIsDesktop(!isMobile);
                    }
                }["DeviceTypeProvider[useEffect() > checkDeviceType]"];
                checkDeviceType();
                window.addEventListener("resize", checkDeviceType);
                return ()=>{
                    window.removeEventListener("resize", checkDeviceType);
                };
            }
        })["DeviceTypeProvider[useEffect()]"];
        t2 = [];
        $[1] = t1;
        $[2] = t2;
    } else {
        t1 = $[1];
        t2 = $[2];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t1, t2);
    const t3 = !isDesktop;
    let t4;
    if ($[3] !== isDesktop || $[4] !== t3) {
        t4 = {
            isDesktop,
            isMobile: t3
        };
        $[3] = isDesktop;
        $[4] = t3;
        $[5] = t4;
    } else {
        t4 = $[5];
    }
    const value = t4;
    let t5;
    if ($[6] !== children || $[7] !== value) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DeviceTypeContext.Provider, {
            value: value,
            children: children
        }, void 0, false, {
            fileName: "[project]/packages/runtime-react/src/core/providers/device-type-provider.tsx",
            lineNumber: 127,
            columnNumber: 10
        }, this);
        $[6] = children;
        $[7] = value;
        $[8] = t5;
    } else {
        t5 = $[8];
    }
    return t5;
}
_s1(DeviceTypeProvider, "zvsbGeQuqUJ/EOlRKb9NVdk+wLo=");
_c1 = DeviceTypeProvider;
var _c, _c1;
__turbopack_context__.k.register(_c, "ServerBreakpointProvider");
__turbopack_context__.k.register(_c1, "DeviceTypeProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/runtime-react/src/page-builder/section/position/use-scroll-container.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ScrollContainerProvider",
    ()=>ScrollContainerProvider,
    "useScrollContainer",
    ()=>useScrollContainer,
    "useScrollContainerRef",
    ()=>useScrollContainerRef
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
const ScrollContainerContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
function ScrollContainerProvider(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(6);
    if ($[0] !== "51636253cb718d93bec258d77b494b32ad9d90d46158e9e76e128251c52613a8") {
        for(let $i = 0; $i < 6; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "51636253cb718d93bec258d77b494b32ad9d90d46158e9e76e128251c52613a8";
    }
    const { children, containerRef } = t0;
    let t1;
    if ($[1] !== containerRef) {
        t1 = {
            containerRef
        };
        $[1] = containerRef;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    let t2;
    if ($[3] !== children || $[4] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ScrollContainerContext.Provider, {
            value: t1,
            children: children
        }, void 0, false, {
            fileName: "[project]/packages/runtime-react/src/page-builder/section/position/use-scroll-container.tsx",
            lineNumber: 35,
            columnNumber: 10
        }, this);
        $[3] = children;
        $[4] = t1;
        $[5] = t2;
    } else {
        t2 = $[5];
    }
    return t2;
}
_c = ScrollContainerProvider;
function useScrollContainer() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(1);
    if ($[0] !== "51636253cb718d93bec258d77b494b32ad9d90d46158e9e76e128251c52613a8") {
        for(let $i = 0; $i < 1; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "51636253cb718d93bec258d77b494b32ad9d90d46158e9e76e128251c52613a8";
    }
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ScrollContainerContext);
    return context?.containerRef.current ?? null;
}
_s(useScrollContainer, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
function useScrollContainerRef() {
    _s1();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(1);
    if ($[0] !== "51636253cb718d93bec258d77b494b32ad9d90d46158e9e76e128251c52613a8") {
        for(let $i = 0; $i < 1; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "51636253cb718d93bec258d77b494b32ad9d90d46158e9e76e128251c52613a8";
    }
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ScrollContainerContext);
    return context?.containerRef ?? null;
}
_s1(useScrollContainerRef, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "ScrollContainerProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/triggers.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
"use client";
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/motion-values.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
"use client";
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/accessibility.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
"use client";
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/reduced-motion.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useShouldReduceMotion",
    ()=>useShouldReduceMotion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$accessibility$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/accessibility.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/reduced-motion/use-reduced-motion.mjs [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function useShouldReduceMotion(ignorePreference) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(1);
    if ($[0] !== "6d51317729982caf20c070749b7d223d2bff6d12eef4971937058dbe92f75ddf") {
        for(let $i = 0; $i < 1; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "6d51317729982caf20c070749b7d223d2bff6d12eef4971937058dbe92f75ddf";
    }
    const prefersReduced = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    if (ignorePreference) {
        return false;
    }
    return Boolean(prefersReduced);
}
_s(useShouldReduceMotion, "+unYVajia9EPCCnuCfd4PsBxgcE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/runtime-react/src/page-builder/section/position/use-section-parallax.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSectionParallax",
    ()=>useSectionParallax
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$section$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/core/src/internal/section-utils.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$section$2d$utils$2f$section$2d$layout$2d$and$2d$scroll$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/core/src/internal/section-utils/section-layout-and-scroll.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$section$2d$utils$2f$css$2d$value$2d$parsing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/core/src/internal/section-utils/css-value-parsing.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$section$2d$utils$2f$section$2d$effects$2d$and$2d$transforms$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/core/src/internal/section-utils/section-effects-and-transforms.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$section$2f$position$2f$use$2d$scroll$2d$container$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/section/position/use-scroll-container.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$triggers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/triggers.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-scroll.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$motion$2d$values$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/motion-values.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-motion-value.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$motion$2d$value$2d$event$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/use-motion-value-event.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-transform.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$reduced$2d$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/reduced-motion.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
function useSectionParallax(t0, initialY, sectionRef, options) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(25);
    if ($[0] !== "eebd57240da8f41cad10c4d87338d375edb6548f43bf74019fff2732e690d5a6") {
        for(let $i = 0; $i < 25; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "eebd57240da8f41cad10c4d87338d375edb6548f43bf74019fff2732e690d5a6";
    }
    let t1;
    if ($[1] !== t0) {
        t1 = t0 === undefined ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$section$2d$utils$2f$section$2d$layout$2d$and$2d$scroll$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getDefaultScrollSpeed"])() : t0;
        $[1] = t0;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const scrollSpeed = t1;
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$section$2f$position$2f$use$2d$scroll$2d$container$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollContainerRef"])();
    let t2;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$section$2d$utils$2f$section$2d$layout$2d$and$2d$scroll$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getDefaultScrollSpeed"])();
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    const defaultSpeed = t2;
    let t3;
    if ($[4] !== initialY) {
        t3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$section$2d$utils$2f$css$2d$value$2d$parsing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseCssValueToPixels"])(initialY, true);
        $[4] = initialY;
        $[5] = t3;
    } else {
        t3 = $[5];
    }
    const basePosition = t3;
    const respectReducedMotion = options?.respectReducedMotion !== false;
    const shouldReduceMotion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$reduced$2d$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useShouldReduceMotion"])(!respectReducedMotion);
    const t4 = containerRef ?? undefined;
    let t5;
    if ($[6] !== t4) {
        t5 = {
            container: t4
        };
        $[6] = t4;
        $[7] = t5;
    } else {
        t5 = $[7];
    }
    const { scrollY } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScroll"])(t5);
    const sectionTopMotion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"])(0);
    let t6;
    let t7;
    if ($[8] !== containerRef || $[9] !== scrollSpeed || $[10] !== sectionRef || $[11] !== sectionTopMotion || $[12] !== shouldReduceMotion) {
        t6 = ({
            "useSectionParallax[useLayoutEffect()]": ()=>{
                const container = containerRef?.current ?? null;
                const section = sectionRef?.current ?? null;
                if (!container || !section || scrollSpeed === defaultSpeed || shouldReduceMotion) {
                    return;
                }
                const updateSectionTop = {
                    "useSectionParallax[useLayoutEffect() > updateSectionTop]": ()=>{
                        const containerRect = container.getBoundingClientRect();
                        const sectionRect = section.getBoundingClientRect();
                        const sectionTop = sectionRect.top - containerRect.top + container.scrollTop;
                        sectionTopMotion.set(sectionTop);
                    }
                }["useSectionParallax[useLayoutEffect() > updateSectionTop]"];
                updateSectionTop();
                const ro = new ResizeObserver(updateSectionTop);
                ro.observe(container);
                return ()=>ro.disconnect();
            }
        })["useSectionParallax[useLayoutEffect()]"];
        t7 = [
            containerRef,
            sectionRef,
            scrollSpeed,
            defaultSpeed,
            sectionTopMotion,
            shouldReduceMotion
        ];
        $[8] = containerRef;
        $[9] = scrollSpeed;
        $[10] = sectionRef;
        $[11] = sectionTopMotion;
        $[12] = shouldReduceMotion;
        $[13] = t6;
        $[14] = t7;
    } else {
        t6 = $[13];
        t7 = $[14];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])(t6, t7);
    let t8;
    if ($[15] !== scrollY || $[16] !== sectionTopMotion) {
        t8 = [
            scrollY,
            sectionTopMotion
        ];
        $[15] = scrollY;
        $[16] = sectionTopMotion;
        $[17] = t8;
    } else {
        t8 = $[17];
    }
    let t9;
    if ($[18] !== basePosition || $[19] !== scrollSpeed || $[20] !== shouldReduceMotion) {
        t9 = ({
            "useSectionParallax[useTransform()]": (t10)=>{
                const [scrollTop, sectionTop_0] = t10;
                if (scrollSpeed === defaultSpeed || shouldReduceMotion) {
                    return 0;
                }
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$section$2d$utils$2f$section$2d$effects$2d$and$2d$transforms$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["computeParallaxOffset"])(typeof scrollTop === "number" ? scrollTop : 0, {
                    scrollSpeed,
                    defaultScrollSpeed: defaultSpeed,
                    basePosition,
                    sectionTop: typeof sectionTop_0 === "number" ? sectionTop_0 : 0
                });
            }
        })["useSectionParallax[useTransform()]"];
        $[18] = basePosition;
        $[19] = scrollSpeed;
        $[20] = shouldReduceMotion;
        $[21] = t9;
    } else {
        t9 = $[21];
    }
    const parallaxY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(t8, t9);
    let t10;
    if ($[22] !== parallaxY) {
        t10 = ({
            "useSectionParallax[useState()]": ()=>parallaxY.get()
        })["useSectionParallax[useState()]"];
        $[22] = parallaxY;
        $[23] = t10;
    } else {
        t10 = $[23];
    }
    const [transformY, setTransformY] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t10);
    let t11;
    if ($[24] === Symbol.for("react.memo_cache_sentinel")) {
        t11 = ({
            "useSectionParallax[useMotionValueEvent()]": (v)=>setTransformY(v)
        })["useSectionParallax[useMotionValueEvent()]"];
        $[24] = t11;
    } else {
        t11 = $[24];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$motion$2d$value$2d$event$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValueEvent"])(parallaxY, "change", t11);
    if (!containerRef || scrollSpeed === defaultSpeed || shouldReduceMotion) {
        return 0;
    }
    return transformY;
}
_s(useSectionParallax, "0w2Pnq2h3W1LkJwj0ba1II3gCtU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$section$2f$position$2f$use$2d$scroll$2d$container$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollContainerRef"],
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$reduced$2d$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useShouldReduceMotion"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScroll"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$motion$2d$value$2d$event$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValueEvent"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/runtime-react/src/page-builder/section/position/use-section-positioning.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSectionPositioning",
    ()=>useSectionPositioning
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$section$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/core/src/internal/section-utils.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$section$2d$utils$2f$section$2d$layout$2d$and$2d$scroll$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/core/src/internal/section-utils/section-layout-and-scroll.ts [app-client] (ecmascript) <locals>");
"use client";
;
;
function useSectionPositioning(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(14);
    if ($[0] !== "0e46dfcc3bf224a1638105e0c7dc5fe4f36a71cd4bf990a355e61e1334d4dc8b") {
        for(let $i = 0; $i < 14; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "0e46dfcc3bf224a1638105e0c7dc5fe4f36a71cd4bf990a355e61e1334d4dc8b";
    }
    const { align, width, initialX, initialY } = t0;
    let t1;
    if ($[1] !== align || $[2] !== width) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$section$2d$utils$2f$section$2d$layout$2d$and$2d$scroll$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getSectionAlignStyle"])(align, width);
        $[1] = align;
        $[2] = width;
        $[3] = t1;
    } else {
        t1 = $[3];
    }
    const alignStyle = t1;
    const hasInitialPosition = initialX !== undefined || initialY !== undefined;
    let t2;
    bb0: {
        if (!hasInitialPosition) {
            let t3;
            if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
                t3 = {};
                $[4] = t3;
            } else {
                t3 = $[4];
            }
            t2 = t3;
            break bb0;
        }
        let style;
        if ($[5] !== align || $[6] !== initialX || $[7] !== initialY) {
            style = {
                position: "absolute"
            };
            if (initialX !== undefined) {
                style.left = initialX;
            } else {
                if (align === "center") {
                    style.left = "50%";
                    style.transform = "translateX(-50%)";
                } else {
                    if (align === "right") {
                        style.right = "0";
                    } else {
                        style.left = "0";
                    }
                }
            }
            if (initialY !== undefined) {
                style.top = initialY;
            } else {
                style.top = "0";
            }
            $[5] = align;
            $[6] = initialX;
            $[7] = initialY;
            $[8] = style;
        } else {
            style = $[8];
        }
        t2 = style;
    }
    const positioningStyle = t2;
    const t3 = !hasInitialPosition || initialX === undefined;
    let t4;
    if ($[9] !== alignStyle || $[10] !== hasInitialPosition || $[11] !== positioningStyle || $[12] !== t3) {
        t4 = {
            alignStyle,
            positioningStyle,
            hasInitialPosition,
            shouldApplyAlignStyle: t3
        };
        $[9] = alignStyle;
        $[10] = hasInitialPosition;
        $[11] = positioningStyle;
        $[12] = t3;
        $[13] = t4;
    } else {
        t4 = $[13];
    }
    return t4;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/runtime-react/src/page-builder/section/position/use-section-base-styles.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSectionBaseStyles",
    ()=>useSectionBaseStyles
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$core$2f$lib$2f$responsive$2d$value$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/core/lib/responsive-value.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$section$2d$effects$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/core/src/internal/section-effects.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$section$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/core/src/internal/section-utils.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$section$2d$utils$2f$section$2d$layout$2d$and$2d$scroll$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/core/src/internal/section-utils/section-layout-and-scroll.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$section$2d$utils$2f$section$2d$effects$2d$and$2d$transforms$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/core/src/internal/section-utils/section-effects-and-transforms.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$core$2f$providers$2f$device$2d$type$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/core/providers/device-type-provider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$section$2f$position$2f$use$2d$section$2d$parallax$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/section/position/use-section-parallax.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$section$2f$position$2f$use$2d$section$2d$positioning$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/section/position/use-section-positioning.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
function useSectionBaseStyles(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(131);
    if ($[0] !== "f013c9b783b0996687385162911ed63fd4f4b7b3622ffa32b6871d93ea762679") {
        for(let $i = 0; $i < 131; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "f013c9b783b0996687385162911ed63fd4f4b7b3622ffa32b6871d93ea762679";
    }
    const { width, height, minWidth, maxWidth, minHeight, maxHeight, align, marginLeft, marginRight, marginTop, marginBottom, borderRadius, border, boxShadow, filter, backdropFilter, scrollSpeed: t1, initialX, initialY, zIndex, effects, sectionRef, usePadding: t2, reduceMotion } = t0;
    let t3;
    if ($[1] !== t1) {
        t3 = t1 === undefined ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$section$2d$utils$2f$section$2d$layout$2d$and$2d$scroll$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getDefaultScrollSpeed"])() : t1;
        $[1] = t1;
        $[2] = t3;
    } else {
        t3 = $[2];
    }
    const scrollSpeed = t3;
    const usePadding = t2 === undefined ? false : t2;
    const { isMobile } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$core$2f$providers$2f$device$2d$type$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDeviceType"])();
    let t4;
    if ($[3] !== isMobile || $[4] !== width) {
        t4 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$core$2f$lib$2f$responsive$2d$value$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveResponsiveValue"])(width, isMobile);
        $[3] = isMobile;
        $[4] = width;
        $[5] = t4;
    } else {
        t4 = $[5];
    }
    let t5;
    if ($[6] !== height || $[7] !== isMobile) {
        t5 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$core$2f$lib$2f$responsive$2d$value$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveResponsiveValue"])(height, isMobile);
        $[6] = height;
        $[7] = isMobile;
        $[8] = t5;
    } else {
        t5 = $[8];
    }
    let t6;
    if ($[9] !== isMobile || $[10] !== minWidth) {
        t6 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$core$2f$lib$2f$responsive$2d$value$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveResponsiveValue"])(minWidth, isMobile);
        $[9] = isMobile;
        $[10] = minWidth;
        $[11] = t6;
    } else {
        t6 = $[11];
    }
    let t7;
    if ($[12] !== isMobile || $[13] !== maxWidth) {
        t7 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$core$2f$lib$2f$responsive$2d$value$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveResponsiveValue"])(maxWidth, isMobile);
        $[12] = isMobile;
        $[13] = maxWidth;
        $[14] = t7;
    } else {
        t7 = $[14];
    }
    let t8;
    if ($[15] !== isMobile || $[16] !== minHeight) {
        t8 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$core$2f$lib$2f$responsive$2d$value$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveResponsiveValue"])(minHeight, isMobile);
        $[15] = isMobile;
        $[16] = minHeight;
        $[17] = t8;
    } else {
        t8 = $[17];
    }
    let t9;
    if ($[18] !== isMobile || $[19] !== maxHeight) {
        t9 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$core$2f$lib$2f$responsive$2d$value$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveResponsiveValue"])(maxHeight, isMobile);
        $[18] = isMobile;
        $[19] = maxHeight;
        $[20] = t9;
    } else {
        t9 = $[20];
    }
    let t10;
    if ($[21] !== align || $[22] !== isMobile) {
        t10 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$core$2f$lib$2f$responsive$2d$value$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveResponsiveValue"])(align, isMobile);
        $[21] = align;
        $[22] = isMobile;
        $[23] = t10;
    } else {
        t10 = $[23];
    }
    const t11 = t10;
    let t12;
    if ($[24] !== isMobile || $[25] !== marginLeft) {
        t12 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$core$2f$lib$2f$responsive$2d$value$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveResponsiveValue"])(marginLeft, isMobile);
        $[24] = isMobile;
        $[25] = marginLeft;
        $[26] = t12;
    } else {
        t12 = $[26];
    }
    let t13;
    if ($[27] !== isMobile || $[28] !== marginRight) {
        t13 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$core$2f$lib$2f$responsive$2d$value$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveResponsiveValue"])(marginRight, isMobile);
        $[27] = isMobile;
        $[28] = marginRight;
        $[29] = t13;
    } else {
        t13 = $[29];
    }
    let t14;
    if ($[30] !== isMobile || $[31] !== marginTop) {
        t14 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$core$2f$lib$2f$responsive$2d$value$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveResponsiveValue"])(marginTop, isMobile);
        $[30] = isMobile;
        $[31] = marginTop;
        $[32] = t14;
    } else {
        t14 = $[32];
    }
    let t15;
    if ($[33] !== isMobile || $[34] !== marginBottom) {
        t15 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$core$2f$lib$2f$responsive$2d$value$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveResponsiveValue"])(marginBottom, isMobile);
        $[33] = isMobile;
        $[34] = marginBottom;
        $[35] = t15;
    } else {
        t15 = $[35];
    }
    let t16;
    if ($[36] !== initialX || $[37] !== isMobile) {
        t16 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$core$2f$lib$2f$responsive$2d$value$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveResponsiveValue"])(initialX, isMobile);
        $[36] = initialX;
        $[37] = isMobile;
        $[38] = t16;
    } else {
        t16 = $[38];
    }
    let t17;
    if ($[39] !== initialY || $[40] !== isMobile) {
        t17 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$core$2f$lib$2f$responsive$2d$value$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveResponsiveValue"])(initialY, isMobile);
        $[39] = initialY;
        $[40] = isMobile;
        $[41] = t17;
    } else {
        t17 = $[41];
    }
    let t18;
    if ($[42] !== t11 || $[43] !== t12 || $[44] !== t13 || $[45] !== t14 || $[46] !== t15 || $[47] !== t16 || $[48] !== t17 || $[49] !== t4 || $[50] !== t5 || $[51] !== t6 || $[52] !== t7 || $[53] !== t8 || $[54] !== t9) {
        t18 = {
            width: t4,
            height: t5,
            minWidth: t6,
            maxWidth: t7,
            minHeight: t8,
            maxHeight: t9,
            align: t11,
            marginLeft: t12,
            marginRight: t13,
            marginTop: t14,
            marginBottom: t15,
            initialX: t16,
            initialY: t17
        };
        $[42] = t11;
        $[43] = t12;
        $[44] = t13;
        $[45] = t14;
        $[46] = t15;
        $[47] = t16;
        $[48] = t17;
        $[49] = t4;
        $[50] = t5;
        $[51] = t6;
        $[52] = t7;
        $[53] = t8;
        $[54] = t9;
        $[55] = t18;
    } else {
        t18 = $[55];
    }
    const resolvedLayout = t18;
    const t19 = reduceMotion !== false;
    let t20;
    if ($[56] !== t19) {
        t20 = {
            respectReducedMotion: t19
        };
        $[56] = t19;
        $[57] = t20;
    } else {
        t20 = $[57];
    }
    const transformY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$section$2f$position$2f$use$2d$section$2d$parallax$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSectionParallax"])(scrollSpeed, resolvedLayout.initialY, sectionRef, t20);
    let t21;
    if ($[58] !== resolvedLayout.align || $[59] !== resolvedLayout.initialX || $[60] !== resolvedLayout.initialY || $[61] !== resolvedLayout.width) {
        t21 = {
            align: resolvedLayout.align,
            width: resolvedLayout.width,
            initialX: resolvedLayout.initialX,
            initialY: resolvedLayout.initialY
        };
        $[58] = resolvedLayout.align;
        $[59] = resolvedLayout.initialX;
        $[60] = resolvedLayout.initialY;
        $[61] = resolvedLayout.width;
        $[62] = t21;
    } else {
        t21 = $[62];
    }
    const { alignStyle, positioningStyle, shouldApplyAlignStyle, hasInitialPosition } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$section$2f$position$2f$use$2d$section$2d$positioning$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSectionPositioning"])(t21);
    let t22;
    if ($[63] !== borderRadius || $[64] !== isMobile) {
        t22 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$core$2f$lib$2f$responsive$2d$value$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveResponsiveValue"])(borderRadius, isMobile);
        $[63] = borderRadius;
        $[64] = isMobile;
        $[65] = t22;
    } else {
        t22 = $[65];
    }
    const resolvedBorderRadius = t22;
    let t23;
    if ($[66] !== effects) {
        t23 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$section$2d$effects$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sectionEffectsToStyle"])(effects);
        $[66] = effects;
        $[67] = t23;
    } else {
        t23 = $[67];
    }
    const effectStyle = t23;
    let t24;
    if ($[68] !== boxShadow || $[69] !== effectStyle.boxShadow) {
        t24 = [
            effectStyle.boxShadow,
            boxShadow
        ].filter(_useSectionBaseStylesAnonymous);
        $[68] = boxShadow;
        $[69] = effectStyle.boxShadow;
        $[70] = t24;
    } else {
        t24 = $[70];
    }
    const mergedBoxShadow = t24.join(", ");
    let t25;
    if ($[71] !== effectStyle.filter || $[72] !== filter) {
        t25 = [
            effectStyle.filter,
            filter
        ].filter(_useSectionBaseStylesAnonymous2);
        $[71] = effectStyle.filter;
        $[72] = filter;
        $[73] = t25;
    } else {
        t25 = $[73];
    }
    const mergedFilter = t25.join(" ");
    let t26;
    if ($[74] !== backdropFilter || $[75] !== effectStyle.backdropFilter) {
        t26 = [
            effectStyle.backdropFilter,
            backdropFilter
        ].filter(_useSectionBaseStylesAnonymous3);
        $[74] = backdropFilter;
        $[75] = effectStyle.backdropFilter;
        $[76] = t26;
    } else {
        t26 = $[76];
    }
    const mergedBackdropFilter = t26.join(" ");
    const w = resolvedLayout.width;
    const h = resolvedLayout.height;
    const t27 = w === "hug" ? "fit-content" : w;
    const t28 = h === "hug" ? "fit-content" : h;
    let t29;
    if ($[77] !== resolvedLayout.minWidth) {
        t29 = resolvedLayout.minWidth != null ? {
            minWidth: resolvedLayout.minWidth
        } : {};
        $[77] = resolvedLayout.minWidth;
        $[78] = t29;
    } else {
        t29 = $[78];
    }
    let t30;
    if ($[79] !== resolvedLayout.maxWidth) {
        t30 = resolvedLayout.maxWidth != null ? {
            maxWidth: resolvedLayout.maxWidth
        } : {};
        $[79] = resolvedLayout.maxWidth;
        $[80] = t30;
    } else {
        t30 = $[80];
    }
    let t31;
    if ($[81] !== resolvedLayout.minHeight) {
        t31 = resolvedLayout.minHeight != null ? {
            minHeight: resolvedLayout.minHeight
        } : {};
        $[81] = resolvedLayout.minHeight;
        $[82] = t31;
    } else {
        t31 = $[82];
    }
    let t32;
    if ($[83] !== resolvedLayout.maxHeight) {
        t32 = resolvedLayout.maxHeight != null ? {
            maxHeight: resolvedLayout.maxHeight
        } : {};
        $[83] = resolvedLayout.maxHeight;
        $[84] = t32;
    } else {
        t32 = $[84];
    }
    let t33;
    if ($[85] !== border) {
        t33 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$section$2d$utils$2f$section$2d$effects$2d$and$2d$transforms$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["borderToCss"])(border);
        $[85] = border;
        $[86] = t33;
    } else {
        t33 = $[86];
    }
    let t34;
    if ($[87] !== zIndex) {
        t34 = zIndex != null ? {
            zIndex
        } : {};
        $[87] = zIndex;
        $[88] = t34;
    } else {
        t34 = $[88];
    }
    let t35;
    if ($[89] !== alignStyle || $[90] !== shouldApplyAlignStyle) {
        t35 = shouldApplyAlignStyle ? alignStyle : {};
        $[89] = alignStyle;
        $[90] = shouldApplyAlignStyle;
        $[91] = t35;
    } else {
        t35 = $[91];
    }
    let t36;
    if ($[92] !== mergedBoxShadow) {
        t36 = mergedBoxShadow ? {
            boxShadow: mergedBoxShadow
        } : {};
        $[92] = mergedBoxShadow;
        $[93] = t36;
    } else {
        t36 = $[93];
    }
    let t37;
    if ($[94] !== mergedFilter) {
        t37 = mergedFilter ? {
            filter: mergedFilter
        } : {};
        $[94] = mergedFilter;
        $[95] = t37;
    } else {
        t37 = $[95];
    }
    let t38;
    if ($[96] !== mergedBackdropFilter) {
        t38 = mergedBackdropFilter ? {
            backdropFilter: mergedBackdropFilter,
            WebkitBackdropFilter: mergedBackdropFilter
        } : {};
        $[96] = mergedBackdropFilter;
        $[97] = t38;
    } else {
        t38 = $[97];
    }
    let style;
    if ($[98] !== effectStyle || $[99] !== positioningStyle || $[100] !== resolvedBorderRadius || $[101] !== resolvedLayout.marginBottom || $[102] !== resolvedLayout.marginLeft || $[103] !== resolvedLayout.marginRight || $[104] !== resolvedLayout.marginTop || $[105] !== t27 || $[106] !== t28 || $[107] !== t29 || $[108] !== t30 || $[109] !== t31 || $[110] !== t32 || $[111] !== t33 || $[112] !== t34 || $[113] !== t35 || $[114] !== t36 || $[115] !== t37 || $[116] !== t38 || $[117] !== transformY || $[118] !== usePadding) {
        style = {
            width: t27,
            height: t28,
            ...t29,
            ...t30,
            ...t31,
            ...t32,
            borderRadius: resolvedBorderRadius,
            border: t33,
            overflowX: "hidden",
            overflowY: "hidden",
            scrollBehavior: "smooth",
            ...t34,
            ...t35,
            ...positioningStyle,
            ...effectStyle,
            ...t36,
            ...t37,
            ...t38
        };
        if (usePadding) {
            style.paddingLeft = resolvedLayout.marginLeft;
            style.paddingRight = resolvedLayout.marginRight;
            style.paddingTop = resolvedLayout.marginTop;
            style.paddingBottom = resolvedLayout.marginBottom;
        } else {
            style.marginLeft = resolvedLayout.marginLeft;
            style.marginRight = resolvedLayout.marginRight;
            style.marginTop = resolvedLayout.marginTop;
            style.marginBottom = resolvedLayout.marginBottom;
            if (resolvedLayout.marginLeft != null) {
                style.marginLeft = resolvedLayout.marginLeft;
            }
            if (resolvedLayout.marginRight != null) {
                style.marginRight = resolvedLayout.marginRight;
            }
        }
        const existingTransform = positioningStyle.transform;
        let t39;
        if ($[120] !== existingTransform || $[121] !== transformY) {
            t39 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$section$2d$utils$2f$section$2d$effects$2d$and$2d$transforms$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildTransformString"])(existingTransform, transformY);
            $[120] = existingTransform;
            $[121] = transformY;
            $[122] = t39;
        } else {
            t39 = $[122];
        }
        const transform = t39;
        if (transform) {
            style.transform = transform;
        }
        $[98] = effectStyle;
        $[99] = positioningStyle;
        $[100] = resolvedBorderRadius;
        $[101] = resolvedLayout.marginBottom;
        $[102] = resolvedLayout.marginLeft;
        $[103] = resolvedLayout.marginRight;
        $[104] = resolvedLayout.marginTop;
        $[105] = t27;
        $[106] = t28;
        $[107] = t29;
        $[108] = t30;
        $[109] = t31;
        $[110] = t32;
        $[111] = t33;
        $[112] = t34;
        $[113] = t35;
        $[114] = t36;
        $[115] = t37;
        $[116] = t38;
        $[117] = transformY;
        $[118] = usePadding;
        $[119] = style;
    } else {
        style = $[119];
    }
    const baseStyle = style;
    let t39;
    if ($[123] !== alignStyle || $[124] !== baseStyle || $[125] !== hasInitialPosition || $[126] !== positioningStyle || $[127] !== resolvedLayout || $[128] !== shouldApplyAlignStyle || $[129] !== transformY) {
        t39 = {
            baseStyle,
            transformY,
            alignStyle,
            positioningStyle,
            shouldApplyAlignStyle,
            resolvedLayout,
            hasInitialPosition
        };
        $[123] = alignStyle;
        $[124] = baseStyle;
        $[125] = hasInitialPosition;
        $[126] = positioningStyle;
        $[127] = resolvedLayout;
        $[128] = shouldApplyAlignStyle;
        $[129] = transformY;
        $[130] = t39;
    } else {
        t39 = $[130];
    }
    return t39;
}
_s(useSectionBaseStyles, "13KdSMNOvpDLnKq0z9bRhLJfMUw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$core$2f$providers$2f$device$2d$type$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDeviceType"],
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$section$2f$position$2f$use$2d$section$2d$parallax$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSectionParallax"],
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$section$2f$position$2f$use$2d$section$2d$positioning$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSectionPositioning"]
    ];
});
function _useSectionBaseStylesAnonymous3(value_1) {
    return typeof value_1 === "string" && value_1.length > 0;
}
function _useSectionBaseStylesAnonymous2(value_0) {
    return typeof value_0 === "string" && value_0.length > 0;
}
function _useSectionBaseStylesAnonymous(value) {
    return typeof value === "string" && value.length > 0;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/runtime-react/src/page-builder/triggers/core/trigger-event.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PAGE_BUILDER_TRIGGER_EVENT",
    ()=>PAGE_BUILDER_TRIGGER_EVENT,
    "firePageBuilderAction",
    ()=>firePageBuilderAction,
    "firePageBuilderProgressTrigger",
    ()=>firePageBuilderProgressTrigger,
    "firePageBuilderTrigger",
    ()=>firePageBuilderTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$runtime$2f$page$2d$builder$2d$variable$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/runtime/page-builder-variable-store.ts [app-client] (ecmascript)");
"use client";
;
const PAGE_BUILDER_TRIGGER_EVENT = "page-builder-trigger";
function firePageBuilderTrigger(visible, action, triggerId) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    window.dispatchEvent(new CustomEvent(PAGE_BUILDER_TRIGGER_EVENT, {
        detail: {
            triggerId,
            visible,
            action
        }
    }));
}
function firePageBuilderProgressTrigger(progress, action, triggerId) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    window.dispatchEvent(new CustomEvent(PAGE_BUILDER_TRIGGER_EVENT, {
        detail: {
            triggerId,
            progress,
            action
        }
    }));
}
function firePageBuilderAction(action, source = "system") {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    window.dispatchEvent(new CustomEvent(PAGE_BUILDER_TRIGGER_EVENT, {
        detail: {
            action,
            source
        }
    }));
    if ("TURBOPACK compile-time truthy", 1) {
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$runtime$2f$page$2d$builder$2d$variable$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useActionLogStore"].getState().push({
            type: action.type,
            payload: action.payload,
            timestamp: Date.now(),
            source
        });
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/section-scroll-progress.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSectionScrollProgressFM",
    ()=>useSectionScrollProgressFM
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$triggers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/triggers.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-scroll.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$motion$2d$values$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/motion-values.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$motion$2d$value$2d$event$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/use-motion-value-event.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$section$2f$position$2f$use$2d$scroll$2d$container$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/section/position/use-scroll-container.tsx [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function useSectionScrollProgressFM(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "a79d976f955467e8067860824154fba81f6b86251fc5b96e98fe813d876a6c65") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "a79d976f955467e8067860824154fba81f6b86251fc5b96e98fe813d876a6c65";
    }
    const { sectionRef, onProgress, startOffset: t1, endOffset: t2 } = t0;
    const startOffset = t1 === undefined ? 0 : t1;
    const endOffset = t2 === undefined ? 0 : t2;
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$section$2f$position$2f$use$2d$scroll$2d$container$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollContainerRef"])();
    const t3 = containerRef ?? undefined;
    let t4;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = [
            "start end",
            "end start"
        ];
        $[1] = t4;
    } else {
        t4 = $[1];
    }
    let t5;
    if ($[2] !== sectionRef || $[3] !== t3) {
        t5 = {
            target: sectionRef,
            container: t3,
            offset: t4
        };
        $[2] = sectionRef;
        $[3] = t3;
        $[4] = t5;
    } else {
        t5 = $[4];
    }
    const { scrollYProgress } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScroll"])(t5);
    let t6;
    if ($[5] !== endOffset || $[6] !== onProgress || $[7] !== startOffset) {
        t6 = ({
            "useSectionScrollProgressFM[useMotionValueEvent()]": (latest)=>{
                if (!onProgress) {
                    return;
                }
                const clamped = Math.max(0, Math.min(1, latest));
                if (startOffset === 0 && endOffset === 0) {
                    onProgress(clamped);
                    return;
                }
                const start = startOffset;
                const end = 1 - endOffset;
                const mapped = end <= start ? clamped : (clamped - start) / (end - start);
                onProgress(Math.max(0, Math.min(1, mapped)));
            }
        })["useSectionScrollProgressFM[useMotionValueEvent()]"];
        $[5] = endOffset;
        $[6] = onProgress;
        $[7] = startOffset;
        $[8] = t6;
    } else {
        t6 = $[8];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$motion$2d$value$2d$event$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValueEvent"])(scrollYProgress, "change", t6);
}
_s(useSectionScrollProgressFM, "VjApCV6XeIZhVWZX1YUVo/RFNFs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$section$2f$position$2f$use$2d$scroll$2d$container$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollContainerRef"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScroll"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$motion$2d$value$2d$event$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValueEvent"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/runtime-react/src/page-builder/section/position/use-section-scroll-progress.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSectionScrollProgress",
    ()=>useSectionScrollProgress
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$section$2d$scroll$2d$progress$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/section-scroll-progress.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function useSectionScrollProgress(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(6);
    if ($[0] !== "f9fd29d496661f8ef0b5b60b20194236e88d20faec8a12ce447fdebdd17b2d25") {
        for(let $i = 0; $i < 6; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "f9fd29d496661f8ef0b5b60b20194236e88d20faec8a12ce447fdebdd17b2d25";
    }
    const { sectionRef, onProgress, startOffset: t1, endOffset: t2 } = t0;
    const startOffset = t1 === undefined ? 0 : t1;
    const endOffset = t2 === undefined ? 0 : t2;
    let t3;
    if ($[1] !== endOffset || $[2] !== onProgress || $[3] !== sectionRef || $[4] !== startOffset) {
        t3 = {
            sectionRef,
            onProgress,
            startOffset,
            endOffset
        };
        $[1] = endOffset;
        $[2] = onProgress;
        $[3] = sectionRef;
        $[4] = startOffset;
        $[5] = t3;
    } else {
        t3 = $[5];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$section$2d$scroll$2d$progress$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSectionScrollProgressFM"])(t3);
}
_s(useSectionScrollProgress, "9KyvGkMKvG8BX5NxQBlouYZ4NZs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$section$2d$scroll$2d$progress$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSectionScrollProgressFM"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/runtime-react/src/page-builder/triggers/core/use-keyboard-trigger.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useKeyboardTrigger",
    ()=>useKeyboardTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/triggers/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$trigger$2d$event$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/triggers/core/trigger-event.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function useKeyboardTrigger(triggers) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(4);
    if ($[0] !== "e08c67b9695f6c37959a8211fc5a380a263f3cdeebcb16be7176151eeda65834") {
        for(let $i = 0; $i < 4; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "e08c67b9695f6c37959a8211fc5a380a263f3cdeebcb16be7176151eeda65834";
    }
    let t0;
    let t1;
    if ($[1] !== triggers) {
        t0 = ({
            "useKeyboardTrigger[useEffect()]": ()=>{
                if (!triggers || triggers.length === 0) {
                    return;
                }
                const matchModifiers = _useKeyboardTriggerUseEffectMatchModifiers;
                const onKeyDown = {
                    "useKeyboardTrigger[useEffect() > onKeyDown]": (e_0)=>{
                        const target = e_0.target;
                        if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) {
                            return;
                        }
                        for (const def_0 of triggers){
                            if (e_0.key === def_0.key && matchModifiers(def_0, e_0)) {
                                if (def_0.preventDefault) {
                                    e_0.preventDefault();
                                }
                                if (def_0.onKeyDown) {
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$trigger$2d$event$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["firePageBuilderAction"])(def_0.onKeyDown, "trigger");
                                }
                            }
                        }
                    }
                }["useKeyboardTrigger[useEffect() > onKeyDown]"];
                const onKeyUp = {
                    "useKeyboardTrigger[useEffect() > onKeyUp]": (e_1)=>{
                        const target_0 = e_1.target;
                        if (target_0.tagName === "INPUT" || target_0.tagName === "TEXTAREA" || target_0.isContentEditable) {
                            return;
                        }
                        for (const def_1 of triggers){
                            if (e_1.key === def_1.key && matchModifiers(def_1, e_1)) {
                                if (def_1.onKeyUp) {
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$trigger$2d$event$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["firePageBuilderAction"])(def_1.onKeyUp, "trigger");
                                }
                            }
                        }
                    }
                }["useKeyboardTrigger[useEffect() > onKeyUp]"];
                window.addEventListener("keydown", onKeyDown);
                window.addEventListener("keyup", onKeyUp);
                return ()=>{
                    window.removeEventListener("keydown", onKeyDown);
                    window.removeEventListener("keyup", onKeyUp);
                };
            }
        })["useKeyboardTrigger[useEffect()]"];
        t1 = [
            triggers
        ];
        $[1] = triggers;
        $[2] = t0;
        $[3] = t1;
    } else {
        t0 = $[2];
        t1 = $[3];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t0, t1);
}
_s(useKeyboardTrigger, "OD7bBpZva5O2jO+Puf00hKivP7c=");
function _useKeyboardTriggerUseEffectMatchModifiers(def, e) {
    if (def.shift !== undefined && e.shiftKey !== def.shift) {
        return false;
    }
    if (def.ctrl !== undefined && e.ctrlKey !== def.ctrl) {
        return false;
    }
    if (def.alt !== undefined && e.altKey !== def.alt) {
        return false;
    }
    if (def.meta !== undefined && e.metaKey !== def.meta) {
        return false;
    }
    return true;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/runtime-react/src/page-builder/triggers/core/use-timer-trigger.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useTimerTrigger",
    ()=>useTimerTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/triggers/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$trigger$2d$event$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/triggers/core/trigger-event.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function useTimerTrigger(triggers) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(5);
    if ($[0] !== "03a9cc0c0042e6dbf51d60861e137ac1151c9ef20f0b5fd483486882035486af") {
        for(let $i = 0; $i < 5; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "03a9cc0c0042e6dbf51d60861e137ac1151c9ef20f0b5fd483486882035486af";
    }
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = new Map();
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    const countRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(t0);
    let t1;
    let t2;
    if ($[2] !== triggers) {
        t1 = ({
            "useTimerTrigger[useEffect()]": ()=>{
                if (!triggers || triggers.length === 0) {
                    return;
                }
                const timeoutIds = [];
                const intervalIds = [];
                countRef.current.clear();
                triggers.forEach({
                    "useTimerTrigger[useEffect() > triggers.forEach()]": (def, i)=>{
                        if (def.delay != null && def.interval == null) {
                            const id = setTimeout({
                                "useTimerTrigger[useEffect() > triggers.forEach() > setTimeout()]": ()=>{
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$trigger$2d$event$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["firePageBuilderAction"])(def.action, "trigger");
                                }
                            }["useTimerTrigger[useEffect() > triggers.forEach() > setTimeout()]"], def.delay);
                            timeoutIds.push(id);
                        } else {
                            if (def.interval != null) {
                                const start = {
                                    "useTimerTrigger[useEffect() > triggers.forEach() > start]": ()=>{
                                        const id_0 = setInterval({
                                            "useTimerTrigger[useEffect() > triggers.forEach() > start > setInterval()]": ()=>{
                                                const count = (countRef.current.get(i) ?? 0) + 1;
                                                countRef.current.set(i, count);
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$trigger$2d$event$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["firePageBuilderAction"])(def.action, "trigger");
                                                if (def.maxFires != null && count >= def.maxFires) {
                                                    clearInterval(id_0);
                                                }
                                            }
                                        }["useTimerTrigger[useEffect() > triggers.forEach() > start > setInterval()]"], def.interval);
                                        intervalIds.push(id_0);
                                    }
                                }["useTimerTrigger[useEffect() > triggers.forEach() > start]"];
                                if (def.delay != null) {
                                    const delayId = setTimeout(start, def.delay);
                                    timeoutIds.push(delayId);
                                } else {
                                    start();
                                }
                            }
                        }
                    }
                }["useTimerTrigger[useEffect() > triggers.forEach()]"]);
                return ()=>{
                    timeoutIds.forEach(clearTimeout);
                    intervalIds.forEach(clearInterval);
                };
            }
        })["useTimerTrigger[useEffect()]"];
        t2 = [
            triggers
        ];
        $[2] = triggers;
        $[3] = t1;
        $[4] = t2;
    } else {
        t1 = $[3];
        t2 = $[4];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t1, t2);
}
_s(useTimerTrigger, "EqunGrKJM1Wp9GB7DWLVKNTtKNY=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/runtime-react/src/page-builder/triggers/core/use-cursor-trigger.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCursorTrigger",
    ()=>useCursorTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/triggers/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$trigger$2d$event$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/triggers/core/trigger-event.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function useCursorTrigger(triggers) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(5);
    if ($[0] !== "f43351d312c9bb3c188380357bc15e5f280028e94eb86f06c56f3066ee46427a") {
        for(let $i = 0; $i < 5; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "f43351d312c9bb3c188380357bc15e5f280028e94eb86f06c56f3066ee46427a";
    }
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = new Map();
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    const lastFireRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(t0);
    let t1;
    let t2;
    if ($[2] !== triggers) {
        t1 = ({
            "useCursorTrigger[useEffect()]": ()=>{
                if (!triggers || triggers.length === 0) {
                    return;
                }
                const onMouseMove = {
                    "useCursorTrigger[useEffect() > onMouseMove]": (e)=>{
                        const now = performance.now();
                        const xProgress = e.clientX / window.innerWidth;
                        const yProgress = e.clientY / window.innerHeight;
                        triggers.forEach({
                            "useCursorTrigger[useEffect() > onMouseMove > triggers.forEach()]": (def, i)=>{
                                const throttle = def.throttleMs ?? 16;
                                const last = lastFireRef.current.get(i) ?? 0;
                                if (now - last < throttle) {
                                    return;
                                }
                                lastFireRef.current.set(i, now);
                                const progress = def.axis === "x" ? xProgress : yProgress;
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$trigger$2d$event$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["firePageBuilderProgressTrigger"])(progress, def.action);
                            }
                        }["useCursorTrigger[useEffect() > onMouseMove > triggers.forEach()]"]);
                    }
                }["useCursorTrigger[useEffect() > onMouseMove]"];
                window.addEventListener("mousemove", onMouseMove, {
                    passive: true
                });
                return ()=>window.removeEventListener("mousemove", onMouseMove);
            }
        })["useCursorTrigger[useEffect()]"];
        t2 = [
            triggers
        ];
        $[2] = triggers;
        $[3] = t1;
        $[4] = t2;
    } else {
        t1 = $[3];
        t2 = $[4];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t1, t2);
}
_s(useCursorTrigger, "iN/xWf94slN7clokx/XmNNumXp8=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/runtime-react/src/page-builder/triggers/core/use-scroll-direction-trigger.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useScrollDirectionTrigger",
    ()=>useScrollDirectionTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/triggers/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$trigger$2d$event$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/triggers/core/trigger-event.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function useScrollDirectionTrigger(triggers) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(4);
    if ($[0] !== "2026e17ab176e1ff16242a66e3f8a94444f72ff223a6c92a42946e70e3523480") {
        for(let $i = 0; $i < 4; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "2026e17ab176e1ff16242a66e3f8a94444f72ff223a6c92a42946e70e3523480";
    }
    const lastScrollY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(("TURBOPACK compile-time truthy", 1) ? window.scrollY : "TURBOPACK unreachable");
    const lastDirection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    let t0;
    let t1;
    if ($[1] !== triggers) {
        t0 = ({
            "useScrollDirectionTrigger[useEffect()]": ()=>{
                if (!triggers || triggers.length === 0) {
                    return;
                }
                const onScroll = {
                    "useScrollDirectionTrigger[useEffect() > onScroll]": ()=>{
                        const current = window.scrollY;
                        const delta = current - lastScrollY.current;
                        const threshold = Math.max(...triggers.map(_useScrollDirectionTriggerUseEffectOnScrollTriggersMap));
                        if (Math.abs(delta) < threshold) {
                            return;
                        }
                        const direction = delta > 0 ? "down" : "up";
                        if (direction === lastDirection.current) {
                            lastScrollY.current = current;
                            return;
                        }
                        lastDirection.current = direction;
                        lastScrollY.current = current;
                        triggers.forEach({
                            "useScrollDirectionTrigger[useEffect() > onScroll > triggers.forEach()]": (def)=>{
                                if (direction === "down" && def.onScrollDown) {
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$trigger$2d$event$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["firePageBuilderAction"])(def.onScrollDown, "trigger");
                                }
                                if (direction === "up" && def.onScrollUp) {
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$trigger$2d$event$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["firePageBuilderAction"])(def.onScrollUp, "trigger");
                                }
                            }
                        }["useScrollDirectionTrigger[useEffect() > onScroll > triggers.forEach()]"]);
                    }
                }["useScrollDirectionTrigger[useEffect() > onScroll]"];
                window.addEventListener("scroll", onScroll, {
                    passive: true
                });
                return ()=>window.removeEventListener("scroll", onScroll);
            }
        })["useScrollDirectionTrigger[useEffect()]"];
        t1 = [
            triggers
        ];
        $[1] = triggers;
        $[2] = t0;
        $[3] = t1;
    } else {
        t0 = $[2];
        t1 = $[3];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t0, t1);
}
_s(useScrollDirectionTrigger, "AJruB4jnV53vT6XkXCOss7NFImI=");
function _useScrollDirectionTriggerUseEffectOnScrollTriggersMap(t) {
    return t.threshold ?? 5;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/runtime-react/src/page-builder/triggers/core/use-idle-trigger.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useIdleTrigger",
    ()=>useIdleTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/triggers/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$trigger$2d$event$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/triggers/core/trigger-event.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function useIdleTrigger(triggers) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(4);
    if ($[0] !== "aceb8c0f37f53ff32a657af1c47e40819fc7dc0e76e5777a2187888bae358b95") {
        for(let $i = 0; $i < 4; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "aceb8c0f37f53ff32a657af1c47e40819fc7dc0e76e5777a2187888bae358b95";
    }
    const isIdleRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const timeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    let t0;
    let t1;
    if ($[1] !== triggers) {
        t0 = ({
            "useIdleTrigger[useEffect()]": ()=>{
                if (!triggers || triggers.length === 0) {
                    return;
                }
                const resetTimer = {
                    "useIdleTrigger[useEffect() > resetTimer]": ()=>{
                        if (isIdleRef.current) {
                            isIdleRef.current = false;
                            triggers.forEach(_useIdleTriggerUseEffectResetTimerTriggersForEach);
                        }
                        if (timeoutRef.current) {
                            clearTimeout(timeoutRef.current);
                        }
                        const minIdleMs = Math.min(...triggers.map(_useIdleTriggerUseEffectResetTimerTriggersMap));
                        timeoutRef.current = setTimeout({
                            "useIdleTrigger[useEffect() > resetTimer > setTimeout()]": ()=>{
                                isIdleRef.current = true;
                                triggers.forEach(_useIdleTriggerUseEffectResetTimerSetTimeoutTriggersForEach);
                            }
                        }["useIdleTrigger[useEffect() > resetTimer > setTimeout()]"], minIdleMs);
                    }
                }["useIdleTrigger[useEffect() > resetTimer]"];
                const events = [
                    "mousemove",
                    "keydown",
                    "pointerdown",
                    "scroll",
                    "touchstart"
                ];
                events.forEach({
                    "useIdleTrigger[useEffect() > events.forEach()]": (e)=>window.addEventListener(e, resetTimer, {
                            passive: true
                        })
                }["useIdleTrigger[useEffect() > events.forEach()]"]);
                resetTimer();
                return ()=>{
                    if (timeoutRef.current) {
                        clearTimeout(timeoutRef.current);
                    }
                    events.forEach({
                        "useIdleTrigger[useEffect() > <anonymous> > events.forEach()]": (e_0)=>window.removeEventListener(e_0, resetTimer)
                    }["useIdleTrigger[useEffect() > <anonymous> > events.forEach()]"]);
                };
            }
        })["useIdleTrigger[useEffect()]"];
        t1 = [
            triggers
        ];
        $[1] = triggers;
        $[2] = t0;
        $[3] = t1;
    } else {
        t0 = $[2];
        t1 = $[3];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t0, t1);
}
_s(useIdleTrigger, "ERpbcXQHzv5tKk57108TeWw4Y+w=");
function _useIdleTriggerUseEffectResetTimerSetTimeoutTriggersForEach(def_0) {
    if (def_0.onIdle) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$trigger$2d$event$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["firePageBuilderAction"])(def_0.onIdle, "trigger");
    }
}
function _useIdleTriggerUseEffectResetTimerTriggersMap(t) {
    return t.idleAfterMs ?? 5000;
}
function _useIdleTriggerUseEffectResetTimerTriggersForEach(def) {
    if (def.onActive) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$trigger$2d$event$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["firePageBuilderAction"])(def.onActive, "trigger");
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/runtime-react/src/page-builder/triggers/core/use-section-custom-triggers.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSectionCustomTriggers",
    ()=>useSectionCustomTriggers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/triggers/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$use$2d$keyboard$2d$trigger$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/triggers/core/use-keyboard-trigger.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$use$2d$timer$2d$trigger$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/triggers/core/use-timer-trigger.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$use$2d$cursor$2d$trigger$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/triggers/core/use-cursor-trigger.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$use$2d$scroll$2d$direction$2d$trigger$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/triggers/core/use-scroll-direction-trigger.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$use$2d$idle$2d$trigger$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/triggers/core/use-idle-trigger.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function useSectionCustomTriggers(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(11);
    if ($[0] !== "8db0d24bf8e7579c16ec201a06f4769e9a5377088ceebe920f1da771947f3076") {
        for(let $i = 0; $i < 11; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "8db0d24bf8e7579c16ec201a06f4769e9a5377088ceebe920f1da771947f3076";
    }
    const { keyboardTriggers, timerTriggers, cursorTriggers, scrollDirectionTriggers, idleTriggers } = t0;
    let t1;
    if ($[1] !== keyboardTriggers) {
        t1 = keyboardTriggers ?? [];
        $[1] = keyboardTriggers;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$use$2d$keyboard$2d$trigger$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useKeyboardTrigger"])(t1);
    let t2;
    if ($[3] !== timerTriggers) {
        t2 = timerTriggers ?? [];
        $[3] = timerTriggers;
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$use$2d$timer$2d$trigger$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTimerTrigger"])(t2);
    let t3;
    if ($[5] !== cursorTriggers) {
        t3 = cursorTriggers ?? [];
        $[5] = cursorTriggers;
        $[6] = t3;
    } else {
        t3 = $[6];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$use$2d$cursor$2d$trigger$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCursorTrigger"])(t3);
    let t4;
    if ($[7] !== scrollDirectionTriggers) {
        t4 = scrollDirectionTriggers ?? [];
        $[7] = scrollDirectionTriggers;
        $[8] = t4;
    } else {
        t4 = $[8];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$use$2d$scroll$2d$direction$2d$trigger$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollDirectionTrigger"])(t4);
    let t5;
    if ($[9] !== idleTriggers) {
        t5 = idleTriggers ?? [];
        $[9] = idleTriggers;
        $[10] = t5;
    } else {
        t5 = $[10];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$use$2d$idle$2d$trigger$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIdleTrigger"])(t5);
}
_s(useSectionCustomTriggers, "3u1w2SjX59Gt/NWnBEKRtqa/v+E=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$use$2d$keyboard$2d$trigger$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useKeyboardTrigger"],
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$use$2d$timer$2d$trigger$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTimerTrigger"],
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$use$2d$cursor$2d$trigger$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCursorTrigger"],
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$use$2d$scroll$2d$direction$2d$trigger$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollDirectionTrigger"],
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$use$2d$idle$2d$trigger$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIdleTrigger"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/viewport.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
"use client";
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/animations.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
"use client";
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/presence.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
"use client";
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/layout.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
"use client";
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/layout-motion-div.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LayoutMotionDiv",
    ()=>LayoutMotionDiv
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
"use client";
;
;
;
function LayoutMotionDiv(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(7);
    if ($[0] !== "bb99ab2a8a6ecd09e29a7cb0aa6342d04dac42c591f8e4ae94b1a93f0da1d778") {
        for(let $i = 0; $i < 7; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "bb99ab2a8a6ecd09e29a7cb0aa6342d04dac42c591f8e4ae94b1a93f0da1d778";
    }
    const { children, className, style } = t0;
    let t1;
    if ($[1] !== style) {
        t1 = {
            overflow: "visible",
            ...style
        };
        $[1] = style;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    let t2;
    if ($[3] !== children || $[4] !== className || $[5] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            layout: true,
            className: className,
            style: t1,
            children: children
        }, void 0, false, {
            fileName: "[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/layout-motion-div.tsx",
            lineNumber: 40,
            columnNumber: 10
        }, this);
        $[3] = children;
        $[4] = className;
        $[5] = t1;
        $[6] = t2;
    } else {
        t2 = $[6];
    }
    return t2;
}
_c = LayoutMotionDiv;
var _c;
__turbopack_context__.k.register(_c, "LayoutMotionDiv");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/gestures.tsx [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReorderGroup",
    ()=>ReorderGroup,
    "ReorderItem",
    ()=>ReorderItem
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$Reorder$2f$namespace$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Reorder$3e$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/Reorder/namespace.mjs [app-client] (ecmascript) <export * as Reorder>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$gestures$2f$drag$2f$use$2d$drag$2d$controls$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/gestures/drag/use-drag-controls.mjs [app-client] (ecmascript)");
"use client";
;
;
;
;
function ReorderGroup(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(7);
    if ($[0] !== "71090c86d3bbc92f7ab4cc148fff2fcda0456d2422101f2564dcd12eb64b2d42") {
        for(let $i = 0; $i < 7; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "71090c86d3bbc92f7ab4cc148fff2fcda0456d2422101f2564dcd12eb64b2d42";
    }
    const { axis: t1, values, onReorder, style, children } = t0;
    const axis = t1 === undefined ? "y" : t1;
    let t2;
    if ($[1] !== axis || $[2] !== children || $[3] !== onReorder || $[4] !== style || $[5] !== values) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$Reorder$2f$namespace$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Reorder$3e$__["Reorder"].Group, {
            as: "div",
            axis: axis,
            values: values,
            onReorder: onReorder,
            style: style,
            children: children
        }, void 0, false, {
            fileName: "[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/gestures.tsx",
            lineNumber: 32,
            columnNumber: 10
        }, this);
        $[1] = axis;
        $[2] = children;
        $[3] = onReorder;
        $[4] = style;
        $[5] = values;
        $[6] = t2;
    } else {
        t2 = $[6];
    }
    return t2;
}
_c = ReorderGroup;
function ReorderItem(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(8);
    if ($[0] !== "71090c86d3bbc92f7ab4cc148fff2fcda0456d2422101f2564dcd12eb64b2d42") {
        for(let $i = 0; $i < 8; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "71090c86d3bbc92f7ab4cc148fff2fcda0456d2422101f2564dcd12eb64b2d42";
    }
    const { value, drag: t1, dragBehavior: t2, style, children } = t0;
    const drag = t1 === undefined ? true : t1;
    const dragBehavior = t2 === undefined ? "elasticSnap" : t2;
    const elastic = dragBehavior === "elasticSnap" ? 0.2 : undefined;
    const momentum = dragBehavior === "elasticSnap" ? false : undefined;
    let t3;
    if ($[1] !== children || $[2] !== drag || $[3] !== elastic || $[4] !== momentum || $[5] !== style || $[6] !== value) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$Reorder$2f$namespace$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Reorder$3e$__["Reorder"].Item, {
            as: "div",
            value: value,
            drag: drag,
            dragElastic: elastic,
            dragMomentum: momentum,
            style: style,
            children: children
        }, void 0, false, {
            fileName: "[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/gestures.tsx",
            lineNumber: 72,
            columnNumber: 10
        }, this);
        $[1] = children;
        $[2] = drag;
        $[3] = elastic;
        $[4] = momentum;
        $[5] = style;
        $[6] = value;
        $[7] = t3;
    } else {
        t3 = $[7];
    }
    return t3;
}
_c1 = ReorderItem;
var _c, _c1;
__turbopack_context__.k.register(_c, "ReorderGroup");
__turbopack_context__.k.register(_c1, "ReorderItem");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/contracts/src/content/framer-motion/motion-defaults.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"motionComponent":{"animate":{"opacity":1,"x":0,"y":0,"z":0,"rotate":0,"rotateX":0,"rotateY":0,"rotateZ":0,"scale":1,"scaleX":1,"scaleY":1,"skew":0,"skewX":0,"skewY":0,"originX":"50%","originY":"50%","originZ":0,"perspective":null,"translateX":0,"translateY":0,"translateZ":0,"width":null,"height":null,"top":null,"left":null,"bottom":null,"right":null,"borderRadius":null,"borderTopLeftRadius":null,"borderTopRightRadius":null,"borderBottomLeftRadius":null,"borderBottomRightRadius":null,"backgroundColor":null,"color":null,"boxShadow":null,"textShadow":null,"filter":null,"backdropFilter":null,"clipPath":null,"pathLength":null,"pathOffset":null,"pathSpacing":null,"strokeDasharray":null,"strokeDashoffset":null,"fill":null,"stroke":null,"strokeWidth":null,"strokeOpacity":null,"fillOpacity":null},"initial":{"opacity":0,"x":0,"y":0,"scale":1,"rotate":0},"exit":{"opacity":0,"x":0,"y":0,"scale":1,"rotate":0,"transition":null},"transition":{"type":"tween","tween":{"type":"tween","duration":0.3,"ease":"easeOut","easeCubicBezier":[0.25,0.46,0.45,0.94],"delay":0,"repeat":0,"repeatType":"loop","repeatDelay":0,"from":null,"times":null},"spring":{"type":"spring","stiffness":100,"damping":10,"mass":1,"velocity":0,"restSpeed":0.01,"restDelta":0.01,"bounce":0.25,"duration":null,"delay":0,"repeat":0,"repeatType":"loop","repeatDelay":0},"inertia":{"type":"inertia","velocity":0,"power":0.8,"timeConstant":750,"bounceStiffness":500,"bounceDamping":10,"min":null,"max":null,"restSpeed":10,"restDelta":0.01},"keyframes":{"type":"keyframes","duration":0.8,"ease":"easeInOut","times":null,"delay":0,"repeat":0,"repeatType":"loop","repeatDelay":0},"layout":{"duration":0.3,"delay":0,"ease":"easeOut","type":"tween"},"enterDuration":0.2,"exitDuration":0.15,"staggerDelay":0.05,"staggerChildren":0.05,"delayChildren":0,"staggerDirection":1,"when":false,"perProperty":{"opacity":{"duration":0.2,"ease":"easeInOut"},"x":{"type":"spring","stiffness":300,"damping":30},"backgroundColor":{"type":"tween","duration":0.3}}},"variants":{"hidden":{"opacity":0,"y":20,"scale":0.95,"transition":{"type":"tween","duration":0.2}},"visible":{"opacity":1,"y":0,"scale":1,"transition":{"type":"spring","stiffness":300,"damping":30,"staggerChildren":0,"delayChildren":0,"staggerDirection":1,"when":false}},"exit":{"opacity":0,"y":-20,"scale":0.95}},"custom":null,"inherit":true,"onAnimationStart":null,"onAnimationComplete":null,"style":{"x":null,"y":null,"rotate":null,"scale":null,"opacity":null,"scaleX":null,"scaleY":null}},"gestures":{"whileHover":{"scale":1,"opacity":1,"transition":{"type":"spring","stiffness":400,"damping":25}},"whileTap":{"scale":1,"opacity":1},"whileFocus":{"scale":1,"outline":"2px solid currentColor"},"whileDrag":{"scale":1.05,"cursor":"grabbing","zIndex":100},"whileInView":{"opacity":1,"y":0,"transition":{"type":"spring","stiffness":200,"damping":30}},"viewport":{"once":true,"root":null,"margin":"0px","amount":0.1},"propagate":{"tap":true},"hoverCallbacks":{"onHoverStart":null,"onHoverEnd":null},"tapCallbacks":{"onTap":null,"onTapStart":null,"onTapCancel":null},"panCallbacks":{"onPan":null,"onPanStart":null,"onPanEnd":null}},"drag":{"drag":false,"dragDirectionLock":false,"dragPropagation":false,"dragConstraints":null,"dragElastic":0.5,"dragMomentum":true,"dragTransition":{"type":"inertia","power":0.8,"timeConstant":750,"bounceStiffness":500,"bounceDamping":10,"min":null,"max":null},"dragSnapToOrigin":false,"dragControls":null,"onDragStart":null,"onDrag":null,"onDragEnd":null,"onDirectionLock":null},"layout":{"layout":false,"layoutId":null,"layoutDependency":null,"layoutScroll":false,"layoutRoot":false,"onLayoutAnimationStart":null,"onLayoutAnimationComplete":null},"animatePresence":{"initial":true,"mode":"sync","onExitComplete":null,"presenceAffectsLayout":true},"layoutGroup":{"id":null,"inherit":true},"reorder":{"group":{"axis":"y","values":[],"onReorder":null,"as":"ul"},"item":{"value":null,"as":"li","drag":"y","dragListener":true,"layout":true}},"motionConfig":{"transition":{"type":"spring","stiffness":100,"damping":10},"reducedMotion":"user","nonce":null,"isStatic":false},"lazyMotion":{"features":null,"strict":false},"hooks":{"useAnimate":{"scope":null,"animateArgs":{"selector_or_element":null,"keyframes":{},"options":{"duration":0.3,"delay":0,"ease":"easeInOut","type":"tween","repeat":0,"repeatType":"loop","repeatDelay":0,"at":null}},"sequenceFormat":[["selector",{"opacity":1},{"duration":0.3}],["selector2",{"x":100},{"at":0.2}]],"controls":{"play":null,"pause":null,"stop":null,"complete":null,"cancel":null,"speed":1,"time":0,"duration":null,"state":"idle"}},"useMotionValue":{"initialValue":0,"methods":{"get":null,"set":null,"jump":null,"getPrevious":null,"getVelocity":null,"on":null,"destroy":null}},"useTransform":{"input":null,"inputRange":[0,1],"outputRange":[0,100],"options":{"clamp":true,"ease":null}},"useSpring":{"source":null,"config":{"stiffness":100,"damping":10,"mass":1,"velocity":0,"restSpeed":0.01,"restDelta":0.01}},"useScroll":{"returns":{"scrollX":"MotionValue<number>","scrollY":"MotionValue<number>","scrollXProgress":"MotionValue<number> 0-1","scrollYProgress":"MotionValue<number> 0-1"},"options":{"container":null,"target":null,"axis":"y","offset":["start end","end start"]}},"useVelocity":{"source":null},"useMotionTemplate":{},"useMotionValueEvent":{"value":null,"event":"change","callback":null},"useAnimation":{"methods":{"start":null,"stop":null,"set":null}},"useCycle":{"values":[]},"useInView":{"options":{"root":null,"margin":"0px","amount":"some","once":false}},"useReducedMotion":{},"useDragControls":{"methods":{"start":null}},"useWillChange":{}},"svgMotionValues":{"pathLength":{"range":"0 to 1"},"pathOffset":{"range":"0 to 1"},"pathSpacing":{"range":"0 to 1"}},"animate_standalone":{"element":null,"keyframes":{},"options":{"duration":0.3,"delay":0,"ease":"easeInOut","repeat":0,"repeatType":"loop","repeatDelay":0,"onComplete":null,"onUpdate":null}},"scroll_standalone":{"callback":null,"options":{"source":null,"target":null,"offset":["start end","end start"],"axis":"y"}},"inView_standalone":{"element":null,"callback":null,"options":{"root":null,"margin":"0px","amount":"some"}},"stagger_standalone":{"duration":0.05,"options":{"startDelay":0,"from":"first","ease":null}},"animatableProperties":{"transforms":["x","y","z","rotate","rotateX","rotateY","rotateZ","scale","scaleX","scaleY","skew","skewX","skewY","translateX","translateY","translateZ","perspective"],"origin":["originX","originY","originZ"],"visual":["opacity","backgroundColor","color","fill","stroke","strokeWidth","strokeOpacity","fillOpacity","borderRadius","borderTopLeftRadius","borderTopRightRadius","borderBottomLeftRadius","borderBottomRightRadius","boxShadow","textShadow","filter","backdropFilter","clipPath","background","backgroundImage"],"layout":["width","height","top","left","right","bottom","margin","padding"],"svg":["pathLength","pathOffset","pathSpacing","strokeDasharray","strokeDashoffset","d"]},"easings":{"named":["linear","easeIn","easeOut","easeInOut","circIn","circOut","circInOut","backIn","backOut","backInOut","anticipate"],"cubicBezier":[0.25,0.46,0.45,0.94],"steps":[4,"end"],"customFunction":null},"progressBar":{"height":"4px","fill":"rgba(255,255,255,0.4)","trackBackground":"rgba(255,255,255,0.1)"},"defaultSlideDistancePx":24,"defaultFeedbackDurationMs":400});}),
"[project]/packages/contracts/src/content/framer-motion/framer-motion-presets.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"entrancePresets":{"fade":{"initial":{"opacity":0},"animate":{"opacity":1}},"slideUp":{"initial":{"y":24},"animate":{"y":0}},"slideDown":{"initial":{"y":-24},"animate":{"y":0}},"slideLeft":{"initial":{"x":24},"animate":{"x":0}},"slideRight":{"initial":{"x":-24},"animate":{"x":0}},"zoomIn":{"initial":{"scale":0.92},"animate":{"scale":1}},"zoomOut":{"initial":{"scale":1.08},"animate":{"scale":1}},"popIn":{"initial":{"opacity":0,"scale":0.86,"y":10},"animate":{"opacity":1,"scale":1,"y":0}},"blurIn":{"initial":{"opacity":0,"filter":"blur(8px)"},"animate":{"opacity":1,"filter":"blur(0px)"}},"tiltIn":{"initial":{"rotate":-4},"animate":{"rotate":0}}},"exitPresets":{"fade":{"exit":{"opacity":0}},"slideUp":{"exit":{"y":-24}},"slideDown":{"exit":{"y":24}},"slideLeft":{"exit":{"x":-24}},"slideRight":{"exit":{"x":24}},"zoomIn":{"exit":{"scale":1.08}},"zoomOut":{"exit":{"scale":0.92}},"popIn":{"exit":{"opacity":0,"scale":0.92,"y":8}},"blurIn":{"exit":{"opacity":0,"filter":"blur(8px)"}},"tiltIn":{"exit":{"rotate":4}}}});}),
"[project]/packages/contracts/src/page-builder/core/page-builder-motion-defaults.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ENTRANCE_PRESET_NAMES",
    ()=>ENTRANCE_PRESET_NAMES,
    "EXIT_PRESET_NAMES",
    ()=>EXIT_PRESET_NAMES,
    "MOTION_DEFAULTS",
    ()=>MOTION_DEFAULTS,
    "getEntranceMotionFromPreset",
    ()=>getEntranceMotionFromPreset,
    "getExitMotionFromPreset",
    ()=>getExitMotionFromPreset,
    "mergeMotionDefaults",
    ()=>mergeMotionDefaults,
    "stripLayoutKeysFromKeyframes",
    ()=>stripLayoutKeysFromKeyframes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$content$2f$framer$2d$motion$2f$motion$2d$defaults$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/packages/contracts/src/content/framer-motion/motion-defaults.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$content$2f$framer$2d$motion$2f$framer$2d$motion$2d$presets$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/packages/contracts/src/content/framer-motion/framer-motion-presets.json (json)");
;
;
function stripCommentKeys(obj) {
    if (obj === null || typeof obj !== "object") return obj;
    if (Array.isArray(obj)) return obj.map(stripCommentKeys);
    const out = {};
    for (const [k, v] of Object.entries(obj)){
        if (k.startsWith("$")) continue;
        out[k] = stripCommentKeys(v);
    }
    return out;
}
const LAYOUT_KEYFRAME_KEYS = new Set([
    "position",
    "top",
    "right",
    "bottom",
    "left",
    "display",
    "flex",
    "flexDirection",
    "flexGrow",
    "flexShrink",
    "flexBasis",
    "alignItems",
    "alignSelf",
    "justifyContent",
    "justifySelf",
    "gap",
    "rowGap",
    "columnGap",
    "padding",
    "paddingTop",
    "paddingRight",
    "paddingBottom",
    "paddingLeft",
    "margin",
    "marginTop",
    "marginRight",
    "marginBottom",
    "marginLeft",
    "width",
    "height",
    "minWidth",
    "minHeight",
    "maxWidth",
    "maxHeight",
    "gridTemplateColumns",
    "gridTemplateRows",
    "gridColumn",
    "gridRow"
]);
/**
 * Keys stripped from GESTURE keyframes (whileHover, whileTap, etc.).
 * Narrower than LAYOUT_KEYFRAME_KEYS — deliberately excludes width/height/min/max
 * because Framer Motion CAN animate dimensions in gesture targets, and the
 * ElementRenderer dimension-gesture path handles ownership correctly.
 */ const GESTURE_LAYOUT_STRIP_KEYS = new Set([
    "position",
    "top",
    "right",
    "bottom",
    "left",
    "display",
    "flex",
    "flexDirection",
    "flexGrow",
    "flexShrink",
    "flexBasis",
    "alignItems",
    "alignSelf",
    "justifyContent",
    "justifySelf",
    "gap",
    "rowGap",
    "columnGap",
    "gridTemplateColumns",
    "gridTemplateRows",
    "gridColumn",
    "gridRow"
]);
function stripLayoutKeysFromKeyframes(keyframes) {
    if (!keyframes || typeof keyframes !== "object" || Array.isArray(keyframes)) return keyframes ?? {};
    const out = {};
    for (const [k, v] of Object.entries(keyframes)){
        if (!LAYOUT_KEYFRAME_KEYS.has(k)) out[k] = v;
    }
    return out;
}
/** Like stripLayoutKeysFromKeyframes but allows width/height so gesture dimension tweens work. */ function stripGestureLayoutKeys(keyframes) {
    if (!keyframes || typeof keyframes !== "object" || Array.isArray(keyframes)) return keyframes ?? {};
    const out = {};
    for (const [k, v] of Object.entries(keyframes)){
        if (!GESTURE_LAYOUT_STRIP_KEYS.has(k)) out[k] = v;
    }
    return out;
}
const mc = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$content$2f$framer$2d$motion$2f$motion$2d$defaults$2e$json__$28$json$29$__["default"].motionComponent;
const gestures = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$content$2f$framer$2d$motion$2f$motion$2d$defaults$2e$json__$28$json$29$__["default"].gestures;
const layoutJson = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$content$2f$framer$2d$motion$2f$motion$2d$defaults$2e$json__$28$json$29$__["default"].layout;
const tween = mc?.transition?.tween;
const transitionShape = mc?.transition;
const inheritDefault = typeof mc?.inherit === "boolean" ? mc.inherit ?? true : true;
const transitionFromJson = {
    type: mc?.transition?.type ?? "tween",
    duration: tween?.duration ?? 0.3,
    delay: tween?.delay ?? 0,
    ease: tween?.ease ?? "easeOut",
    enterDuration: mc?.transition?.enterDuration ?? 0.2,
    exitDuration: mc?.transition?.exitDuration ?? 0.15,
    staggerDelay: mc?.transition?.staggerDelay ?? 0.05,
    layout: stripCommentKeys(transitionShape?.layout ?? {})
};
function normalizeViewportAmount(amount) {
    if (amount === "some") return 0.1;
    if (amount === "all") return 1;
    if (typeof amount === "number" && Number.isFinite(amount)) return Math.max(0, Math.min(1, amount));
    return 0.1;
}
const entrancePresetsFromFile = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$content$2f$framer$2d$motion$2f$framer$2d$motion$2d$presets$2e$json__$28$json$29$__["default"].entrancePresets;
const exitPresetsFromFile = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$content$2f$framer$2d$motion$2f$framer$2d$motion$2d$presets$2e$json__$28$json$29$__["default"].exitPresets;
const entrancePresetsBuilt = (()=>{
    const out = {};
    if (entrancePresetsFromFile && typeof entrancePresetsFromFile === "object") {
        for (const key of Object.keys(entrancePresetsFromFile)){
            const p = entrancePresetsFromFile[key];
            if (p && typeof p === "object" && p.initial && p.animate) out[key] = stripCommentKeys(p);
        }
    }
    return out;
})();
const exitPresetsBuilt = (()=>{
    const out = {};
    if (exitPresetsFromFile && typeof exitPresetsFromFile === "object") {
        for (const key of Object.keys(exitPresetsFromFile)){
            const p = exitPresetsFromFile[key];
            if (p && typeof p === "object" && p.exit) out[key] = stripCommentKeys(p);
        }
    }
    return out;
})();
const ENTRANCE_PRESET_NAMES = Object.keys(entrancePresetsBuilt).length > 0 ? Object.keys(entrancePresetsBuilt) : [
    "fade"
];
const EXIT_PRESET_NAMES = Object.keys(exitPresetsBuilt).length > 0 ? Object.keys(exitPresetsBuilt) : [
    "fade"
];
const MOTION_DEFAULTS = {
    transition: transitionFromJson,
    viewport: (()=>{
        const raw = stripCommentKeys(gestures?.viewport ?? {
            once: true,
            amount: 0.1,
            margin: "0px"
        });
        return {
            ...raw,
            amount: normalizeViewportAmount(raw.amount)
        };
    })(),
    drag: stripCommentKeys(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$content$2f$framer$2d$motion$2f$motion$2d$defaults$2e$json__$28$json$29$__["default"].drag ?? {}),
    layout: stripCommentKeys(layoutJson ?? {}),
    defaultSlideDistancePx: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$content$2f$framer$2d$motion$2f$motion$2d$defaults$2e$json__$28$json$29$__["default"].defaultSlideDistancePx ?? 24,
    defaultFeedbackDurationMs: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$content$2f$framer$2d$motion$2f$motion$2d$defaults$2e$json__$28$json$29$__["default"].defaultFeedbackDurationMs ?? 400,
    progressBar: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$content$2f$framer$2d$motion$2f$motion$2d$defaults$2e$json__$28$json$29$__["default"].progressBar ?? {
        height: "4px",
        fill: "rgba(255,255,255,0.4)",
        trackBackground: "rgba(255,255,255,0.1)"
    },
    easeTuple: tween?.easeCubicBezier ?? [
        0.25,
        0.46,
        0.45,
        0.94
    ],
    entrancePresets: entrancePresetsBuilt,
    exitPresets: exitPresetsBuilt,
    defaultEntrancePreset: (()=>{
        const v = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$content$2f$framer$2d$motion$2f$motion$2d$defaults$2e$json__$28$json$29$__["default"].defaultEntrancePreset;
        return typeof v === "string" && v.trim() ? v.trim() : Object.keys(entrancePresetsBuilt)[0];
    })(),
    defaultExitPreset: (()=>{
        const v = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$content$2f$framer$2d$motion$2f$motion$2d$defaults$2e$json__$28$json$29$__["default"].defaultExitPreset;
        return typeof v === "string" && v.trim() ? v.trim() : Object.keys(exitPresetsBuilt)[0];
    })(),
    motionComponent: {
        initial: stripCommentKeys(mc?.initial ?? {
            opacity: 0
        }),
        animate: stripCommentKeys(mc?.animate ?? {
            opacity: 1
        }),
        exit: stripCommentKeys(mc?.exit ?? {
            opacity: 0
        }),
        variants: stripCommentKeys(mc?.variants ?? {}),
        inherit: inheritDefault
    },
    gestures: {
        whileHover: stripCommentKeys(gestures?.whileHover ?? {}),
        whileTap: stripCommentKeys(gestures?.whileTap ?? {}),
        whileFocus: stripCommentKeys(gestures?.whileFocus ?? {}),
        whileDrag: stripCommentKeys(gestures?.whileDrag ?? {}),
        whileInView: stripCommentKeys(gestures?.whileInView ?? {})
    }
};
function deepMerge(base, overrides) {
    if (!overrides || typeof overrides !== "object") return {
        ...base
    };
    const out = {
        ...base
    };
    for (const key of Object.keys(overrides)){
        const o = overrides[key];
        const b = out[key];
        if (o != null && typeof o === "object" && !Array.isArray(o) && b != null && typeof b === "object" && !Array.isArray(b)) {
            out[key] = deepMerge(b, o);
        } else if (o !== undefined) {
            out[key] = o;
        }
    }
    return out;
}
function mergeMotionDefaults(config) {
    if (!config || typeof config !== "object") {
        return config ?? {};
    }
    const d = MOTION_DEFAULTS;
    const merged = {
        ...config
    };
    if (merged.initial === undefined || merged.initial === null) merged.initial = {
        ...d.motionComponent.initial
    };
    if (merged.animate === undefined || merged.animate === null) merged.animate = {
        ...d.motionComponent.animate
    };
    if (merged.exit === undefined || merged.exit === null) merged.exit = {
        ...d.motionComponent.exit
    };
    if (Object.keys(d.motionComponent.variants).length > 0 && (merged.variants === undefined || merged.variants === null)) merged.variants = {
        ...d.motionComponent.variants
    };
    if (merged.transition === undefined || merged.transition === null) {
        merged.transition = {
            ...d.transition
        };
    } else if (typeof merged.transition === "object") {
        merged.transition = deepMerge(d.transition, merged.transition);
    }
    if (merged.viewport === undefined || merged.viewport === null) {
        merged.viewport = {
            ...d.viewport
        };
    } else if (typeof merged.viewport === "object") {
        merged.viewport = deepMerge(d.viewport, merged.viewport);
    }
    if (merged.viewport != null && typeof merged.viewport === "object") {
        merged.viewport.amount = normalizeViewportAmount(merged.viewport.amount);
    }
    const isEmptyGesture = (o)=>o != null && typeof o === "object" && !Array.isArray(o) && Object.keys(o).length === 0;
    if (config.whileHover === undefined || config.whileHover === null || isEmptyGesture(config.whileHover)) merged.whileHover = Object.keys(d.gestures.whileHover).length > 0 ? {
        ...d.gestures.whileHover
    } : undefined;
    else merged.whileHover = config.whileHover;
    if (config.whileTap === undefined || config.whileTap === null || isEmptyGesture(config.whileTap)) merged.whileTap = Object.keys(d.gestures.whileTap).length > 0 ? {
        ...d.gestures.whileTap
    } : undefined;
    else merged.whileTap = config.whileTap;
    if (config.whileFocus === undefined || config.whileFocus === null || isEmptyGesture(config.whileFocus)) merged.whileFocus = Object.keys(d.gestures.whileFocus).length > 0 ? {
        ...d.gestures.whileFocus
    } : undefined;
    else merged.whileFocus = config.whileFocus;
    if (config.whileDrag === undefined || config.whileDrag === null || isEmptyGesture(config.whileDrag)) merged.whileDrag = Object.keys(d.gestures.whileDrag).length > 0 ? {
        ...d.gestures.whileDrag
    } : undefined;
    else merged.whileDrag = config.whileDrag;
    if (merged.whileInView === undefined && Object.keys(d.gestures.whileInView).length > 0) merged.whileInView = {
        ...d.gestures.whileInView
    };
    const dragPreset = d.drag;
    if (merged.drag === undefined && (typeof dragPreset.drag === "boolean" || dragPreset.drag === "x" || dragPreset.drag === "y")) merged.drag = dragPreset.drag;
    if (merged.dragConstraints === undefined && (dragPreset.dragConstraints === "parent" || dragPreset.dragConstraints != null && typeof dragPreset.dragConstraints === "object")) merged.dragConstraints = dragPreset.dragConstraints;
    if (merged.dragElastic === undefined && typeof dragPreset.dragElastic === "number") merged.dragElastic = dragPreset.dragElastic;
    if (merged.dragMomentum === undefined && typeof dragPreset.dragMomentum === "boolean") merged.dragMomentum = dragPreset.dragMomentum;
    if (merged.dragTransition === undefined && dragPreset.dragTransition != null && typeof dragPreset.dragTransition === "object") merged.dragTransition = dragPreset.dragTransition;
    if (merged.dragSnapToOrigin === undefined && typeof dragPreset.dragSnapToOrigin === "boolean") merged.dragSnapToOrigin = dragPreset.dragSnapToOrigin;
    if (merged.dragDirectionLock === undefined && typeof dragPreset.dragDirectionLock === "boolean") merged.dragDirectionLock = dragPreset.dragDirectionLock;
    if (merged.dragPropagation === undefined && typeof dragPreset.dragPropagation === "boolean") merged.dragPropagation = dragPreset.dragPropagation;
    const layoutPreset = d.layout;
    if (merged.layout === undefined && typeof layoutPreset.layout === "boolean") merged.layout = layoutPreset.layout;
    if (merged.layoutId === undefined && (typeof layoutPreset.layoutId === "string" || layoutPreset.layoutId === null)) merged.layoutId = layoutPreset.layoutId;
    if (merged.layoutDependency === undefined && (typeof layoutPreset.layoutDependency === "string" || typeof layoutPreset.layoutDependency === "number" || layoutPreset.layoutDependency === null)) merged.layoutDependency = layoutPreset.layoutDependency;
    if (merged.layoutScroll === undefined && typeof layoutPreset.layoutScroll === "boolean") merged.layoutScroll = layoutPreset.layoutScroll;
    if (merged.layoutRoot === undefined && typeof layoutPreset.layoutRoot === "boolean") merged.layoutRoot = layoutPreset.layoutRoot;
    if (merged.inherit === undefined && typeof d.motionComponent.inherit === "boolean") merged.inherit = d.motionComponent.inherit;
    // Resolve inheritMode -> inherit: isolate = false, inherit = true, auto = use default
    const inheritMode = config.inheritMode;
    if (inheritMode === "isolate") merged.inherit = false;
    else if (inheritMode === "inherit") merged.inherit = true;
    else if (inheritMode === "auto" || inheritMode === undefined) merged.inherit = merged.inherit ?? d.motionComponent.inherit;
    // Strip layout-owned keys from keyframes so motion doesn't fight page-builder layout
    if (merged.initial != null && typeof merged.initial === "object" && !Array.isArray(merged.initial)) merged.initial = stripLayoutKeysFromKeyframes(merged.initial);
    if (merged.animate != null && typeof merged.animate === "object" && !Array.isArray(merged.animate)) merged.animate = stripLayoutKeysFromKeyframes(merged.animate);
    if (merged.exit != null && typeof merged.exit === "object" && !Array.isArray(merged.exit)) merged.exit = stripLayoutKeysFromKeyframes(merged.exit);
    if (merged.variants != null && typeof merged.variants === "object") {
        const variants = merged.variants;
        const stripped = {};
        for (const key of Object.keys(variants)){
            const v = variants[key];
            if (!v || typeof v !== "object") {
                stripped[key] = v;
                continue;
            }
            stripped[key] = {
                ...v,
                ...v.initial != null && {
                    initial: stripLayoutKeysFromKeyframes(v.initial)
                },
                ...v.animate != null && {
                    animate: stripLayoutKeysFromKeyframes(v.animate)
                },
                ...v.exit != null && {
                    exit: stripLayoutKeysFromKeyframes(v.exit)
                }
            };
        }
        merged.variants = stripped;
    }
    // Strip incompatible layout keys from gesture keyframes.
    // Uses the narrower GESTURE_LAYOUT_STRIP_KEYS so width/height survive — they're
    // valid Framer Motion gesture targets and the ElementRenderer handles them correctly.
    for (const gestureKey of [
        "whileHover",
        "whileTap",
        "whileFocus",
        "whileDrag",
        "whileInView"
    ]){
        const val = merged[gestureKey];
        if (val != null && typeof val === "object" && !Array.isArray(val)) merged[gestureKey] = stripGestureLayoutKeys(val);
    }
    // Don't pass internal/schema-only keys to motion components
    delete merged.inheritMode;
    delete merged.motionTiming;
    return merged;
}
function getEntranceMotionFromPreset(presetName, options) {
    const presets = MOTION_DEFAULTS.entrancePresets;
    const preset = presets[presetName] ?? (MOTION_DEFAULTS.defaultEntrancePreset ? presets[MOTION_DEFAULTS.defaultEntrancePreset] : undefined);
    const mc = MOTION_DEFAULTS.motionComponent;
    const initial = preset ? preset.initial : mc.initial;
    const animate = preset ? preset.animate : mc.animate;
    const d = Math.max(0, options.distancePx);
    const applyDistance = (keyframes)=>{
        const out = {
            ...keyframes
        };
        if (typeof out.y === "number" && out.y !== 0) out.y = out.y > 0 ? d : -d;
        if (typeof out.x === "number" && out.x !== 0) out.x = out.x > 0 ? d : -d;
        return out;
    };
    return {
        initial: applyDistance(initial),
        animate: applyDistance(animate),
        transition: {
            type: "tween",
            duration: options.duration,
            delay: options.delay,
            ease: options.ease
        }
    };
}
function getExitMotionFromPreset(presetName, options) {
    const presets = MOTION_DEFAULTS.exitPresets;
    const preset = presets[presetName] ?? (MOTION_DEFAULTS.defaultExitPreset ? presets[MOTION_DEFAULTS.defaultExitPreset] : undefined);
    const mc = MOTION_DEFAULTS.motionComponent;
    const exit = preset?.exit ?? mc.exit;
    const duration = options?.duration ?? MOTION_DEFAULTS.transition.exitDuration ?? MOTION_DEFAULTS.transition.duration;
    const delay = options?.delay ?? 0;
    const ease = options?.ease ?? MOTION_DEFAULTS.transition.ease;
    return {
        exit,
        transition: {
            type: "tween",
            duration,
            delay,
            ease
        }
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/use-video-lazy-load.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useVideoLazyLoad",
    ()=>useVideoLazyLoad
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$viewport$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/viewport.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/use-in-view.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$page$2d$builder$2f$core$2f$page$2d$builder$2d$motion$2d$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/contracts/src/page-builder/core/page-builder-motion-defaults.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function useVideoLazyLoad(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(5);
    if ($[0] !== "4ced083d9e81505c57b7dc611dc715597dadeb53afe11608bb5f900acef8eb80") {
        for(let $i = 0; $i < 5; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "4ced083d9e81505c57b7dc611dc715597dadeb53afe11608bb5f900acef8eb80";
    }
    const { autoplay, hasSource, priority: t1, containerRef } = t0;
    const priority = t1 === undefined ? false : t1;
    const [userArmed, setUserArmed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    let t2;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = {
            amount: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$page$2d$builder$2f$core$2f$page$2d$builder$2d$motion$2d$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOTION_DEFAULTS"].viewport.amount,
            once: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$page$2d$builder$2f$core$2f$page$2d$builder$2d$motion$2d$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOTION_DEFAULTS"].viewport.once
        };
        $[1] = t2;
    } else {
        t2 = $[1];
    }
    const isInView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"])(containerRef, t2);
    const shouldLoadVideo = priority || autoplay || hasSource && (isInView || userArmed);
    let t3;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = ({
            "useVideoLazyLoad[armVideoLoad]": ()=>{
                setUserArmed(true);
            }
        })["useVideoLazyLoad[armVideoLoad]"];
        $[2] = t3;
    } else {
        t3 = $[2];
    }
    const armVideoLoad = t3;
    let t4;
    if ($[3] !== shouldLoadVideo) {
        t4 = {
            shouldLoadVideo,
            armVideoLoad
        };
        $[3] = shouldLoadVideo;
        $[4] = t4;
    } else {
        t4 = $[4];
    }
    return t4;
}
_s(useVideoLazyLoad, "GWqOqZHdrE/L5dIyShhlGeZCYlM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/motion-from-json.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MotionFromJson",
    ()=>MotionFromJson
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$page$2d$builder$2f$core$2f$page$2d$builder$2d$motion$2d$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/contracts/src/page-builder/core/page-builder-motion-defaults.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
const MOTION_TAGS = [
    "div",
    "span",
    "section",
    "article",
    "main",
    "header",
    "footer"
];
const MotionFromJson = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = ({ motion: motionConfig, animateOverride, useMotionAsIs, as: tag = "div", children, style, className, ...rest }, ref)=>{
    if (!motionConfig || typeof motionConfig !== "object") {
        const Tag = MOTION_TAGS.includes(tag) ? tag : "div";
        const setRef = (el)=>{
            if (typeof ref === "function") ref(el);
            else if (ref && "current" in ref) ref.current = el;
        };
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tag, {
            ref: setRef,
            style: style,
            className: className,
            ...rest,
            children: children
        }, void 0, false, {
            fileName: "[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/motion-from-json.tsx",
            lineNumber: 54,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0));
    }
    const merged = useMotionAsIs ? motionConfig : (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$page$2d$builder$2f$core$2f$page$2d$builder$2d$motion$2d$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeMotionDefaults"])(motionConfig);
    if (!merged || typeof merged !== "object") {
        const Tag = MOTION_TAGS.includes(tag) ? tag : "div";
        const setRef = (el)=>{
            if (typeof ref === "function") ref(el);
            else if (ref && "current" in ref) ref.current = el;
        };
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tag, {
            ref: setRef,
            style: style,
            className: className,
            ...rest,
            children: children
        }, void 0, false, {
            fileName: "[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/motion-from-json.tsx",
            lineNumber: 76,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0));
    }
    const { initialVariant, animateVariant, exitVariant, ...motionOnly } = merged;
    const resolvedAnimate = animateVariant ?? motionOnly.animate;
    const animateWithOverride = animateOverride && Object.keys(animateOverride).length > 0 ? {
        ...typeof resolvedAnimate === "object" && resolvedAnimate != null ? resolvedAnimate : {},
        ...animateOverride
    } : resolvedAnimate;
    const motionProps = {
        ...motionOnly,
        initial: initialVariant ?? motionOnly.initial,
        animate: animateWithOverride,
        exit: exitVariant ?? motionOnly.exit,
        style,
        className,
        ref,
        ...rest
    };
    const MotionComponent = MOTION_TAGS.includes(tag) && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"][tag] ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"][tag] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MotionComponent, {
        ...motionProps,
        children: children
    }, void 0, false, {
        fileName: "[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/motion-from-json.tsx",
        lineNumber: 113,
        columnNumber: 12
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = MotionFromJson;
MotionFromJson.displayName = "MotionFromJson";
var _c, _c1;
__turbopack_context__.k.register(_c, "MotionFromJson$forwardRef");
__turbopack_context__.k.register(_c1, "MotionFromJson");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/element-exit-wrapper.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ElementExitWrapper",
    ()=>ElementExitWrapper
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$motion$2d$from$2d$json$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/motion-from-json.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$viewport$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/viewport.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/use-in-view.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$page$2d$builder$2f$core$2f$page$2d$builder$2d$motion$2d$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/contracts/src/page-builder/core/page-builder-motion-defaults.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function ElementExitWrapper(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(33);
    if ($[0] !== "3c9ce4113d03fc18b3e2813f1f32db93cdfe3b73d90e35bb1a16c196f2a72ba4") {
        for(let $i = 0; $i < 33; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "3c9ce4113d03fc18b3e2813f1f32db93cdfe3b73d90e35bb1a16c196f2a72ba4";
    }
    const { show, motion: motionFromJson, motionTiming, exitPreset, exitDuration: t1, exitEasing: t2, exitKey: t3, presenceMode: t4, onExitComplete, className, style, children } = t0;
    const exitDuration = t1 === undefined ? __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$page$2d$builder$2f$core$2f$page$2d$builder$2d$motion$2d$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOTION_DEFAULTS"].transition.exitDuration ?? __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$page$2d$builder$2f$core$2f$page$2d$builder$2d$motion$2d$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOTION_DEFAULTS"].transition.duration : t1;
    const exitEasing = t2 === undefined ? __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$page$2d$builder$2f$core$2f$page$2d$builder$2d$motion$2d$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOTION_DEFAULTS"].transition.ease : t2;
    const exitKey = t3 === undefined ? "element-exit" : t3;
    const presenceMode = t4 === undefined ? "sync" : t4;
    const exitTrigger = motionTiming?.exitTrigger ?? "manual";
    const exitVp = motionTiming?.exitViewport;
    const effectiveExitPreset = motionTiming?.exitPreset ?? exitPreset;
    const effectiveExitMotion = motionTiming?.exitMotion ?? motionFromJson;
    let t5;
    bb0: {
        if (!effectiveExitMotion || typeof effectiveExitMotion !== "object") {
            t5 = undefined;
            break bb0;
        }
        const transition = effectiveExitMotion.transition;
        if (!transition || typeof transition !== "object") {
            t5 = undefined;
            break bb0;
        }
        t5 = transition;
    }
    const exitTransitionOverrides = t5;
    const resolvedExitDuration = exitTransitionOverrides?.duration ?? exitDuration;
    const resolvedExitDelay = exitTransitionOverrides?.delay ?? 0;
    const resolvedExitEasing = exitTransitionOverrides?.ease ?? exitEasing;
    let t6;
    bb1: {
        const hasMotionExit = effectiveExitMotion != null && typeof effectiveExitMotion === "object" && effectiveExitMotion?.exit != null;
        if (hasMotionExit && effectiveExitMotion != null) {
            let t7;
            if ($[1] !== effectiveExitMotion) {
                t7 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$page$2d$builder$2f$core$2f$page$2d$builder$2d$motion$2d$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeMotionDefaults"])(effectiveExitMotion) ?? {};
                $[1] = effectiveExitMotion;
                $[2] = t7;
            } else {
                t7 = $[2];
            }
            t6 = t7;
            break bb1;
        }
        if (effectiveExitPreset && typeof effectiveExitPreset === "string") {
            let t7;
            if ($[3] !== effectiveExitPreset || $[4] !== resolvedExitDelay || $[5] !== resolvedExitDuration || $[6] !== resolvedExitEasing) {
                const { exit, transition: transition_0 } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$page$2d$builder$2f$core$2f$page$2d$builder$2d$motion$2d$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getExitMotionFromPreset"])(effectiveExitPreset, {
                    duration: resolvedExitDuration,
                    delay: resolvedExitDelay,
                    ease: resolvedExitEasing
                });
                t7 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$page$2d$builder$2f$core$2f$page$2d$builder$2d$motion$2d$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeMotionDefaults"])({
                    initial: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$page$2d$builder$2f$core$2f$page$2d$builder$2d$motion$2d$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOTION_DEFAULTS"].motionComponent.animate ?? {
                        opacity: 1
                    },
                    animate: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$page$2d$builder$2f$core$2f$page$2d$builder$2d$motion$2d$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOTION_DEFAULTS"].motionComponent.animate,
                    exit: exit,
                    transition: transition_0
                }) ?? {};
                $[3] = effectiveExitPreset;
                $[4] = resolvedExitDelay;
                $[5] = resolvedExitDuration;
                $[6] = resolvedExitEasing;
                $[7] = t7;
            } else {
                t7 = $[7];
            }
            t6 = t7;
            break bb1;
        }
        const mc = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$page$2d$builder$2f$core$2f$page$2d$builder$2d$motion$2d$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOTION_DEFAULTS"].motionComponent;
        let t7;
        if ($[8] !== resolvedExitDelay || $[9] !== resolvedExitDuration || $[10] !== resolvedExitEasing) {
            const exitTransition = {
                type: "tween",
                duration: resolvedExitDuration,
                delay: resolvedExitDelay,
                ease: resolvedExitEasing
            };
            t7 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$page$2d$builder$2f$core$2f$page$2d$builder$2d$motion$2d$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeMotionDefaults"])({
                initial: mc.animate,
                animate: mc.animate,
                exit: mc.exit ?? {
                    opacity: 0
                },
                transition: exitTransition
            }) ?? {};
            $[8] = resolvedExitDelay;
            $[9] = resolvedExitDuration;
            $[10] = resolvedExitEasing;
            $[11] = t7;
        } else {
            t7 = $[11];
        }
        t6 = t7;
    }
    const motionConfig = t6;
    if (exitTrigger !== "leaveViewport") {
        let t7;
        if ($[12] !== children || $[13] !== className || $[14] !== exitKey || $[15] !== motionConfig || $[16] !== show || $[17] !== style) {
            t7 = show && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$motion$2d$from$2d$json$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MotionFromJson"], {
                motion: motionConfig,
                className: className,
                style: style,
                children: children
            }, exitKey, false, {
                fileName: "[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/element-exit-wrapper.tsx",
                lineNumber: 167,
                columnNumber: 20
            }, this);
            $[12] = children;
            $[13] = className;
            $[14] = exitKey;
            $[15] = motionConfig;
            $[16] = show;
            $[17] = style;
            $[18] = t7;
        } else {
            t7 = $[18];
        }
        let t8;
        if ($[19] !== onExitComplete || $[20] !== presenceMode || $[21] !== t7) {
            t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                mode: presenceMode,
                onExitComplete: onExitComplete,
                children: t7
            }, void 0, false, {
                fileName: "[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/element-exit-wrapper.tsx",
                lineNumber: 180,
                columnNumber: 12
            }, this);
            $[19] = onExitComplete;
            $[20] = presenceMode;
            $[21] = t7;
            $[22] = t8;
        } else {
            t8 = $[22];
        }
        return t8;
    }
    let t7;
    if ($[23] !== children || $[24] !== className || $[25] !== exitKey || $[26] !== exitVp || $[27] !== motionConfig || $[28] !== onExitComplete || $[29] !== presenceMode || $[30] !== show || $[31] !== style) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LeaveViewportExitPresence, {
            show: show,
            exitVp: exitVp,
            exitKey: exitKey,
            motionConfig: motionConfig,
            presenceMode: presenceMode,
            onExitComplete: onExitComplete,
            className: className,
            style: style,
            children: children
        }, void 0, false, {
            fileName: "[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/element-exit-wrapper.tsx",
            lineNumber: 192,
            columnNumber: 10
        }, this);
        $[23] = children;
        $[24] = className;
        $[25] = exitKey;
        $[26] = exitVp;
        $[27] = motionConfig;
        $[28] = onExitComplete;
        $[29] = presenceMode;
        $[30] = show;
        $[31] = style;
        $[32] = t7;
    } else {
        t7 = $[32];
    }
    return t7;
}
_c = ElementExitWrapper;
function LeaveViewportExitPresence(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(16);
    if ($[0] !== "3c9ce4113d03fc18b3e2813f1f32db93cdfe3b73d90e35bb1a16c196f2a72ba4") {
        for(let $i = 0; $i < 16; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "3c9ce4113d03fc18b3e2813f1f32db93cdfe3b73d90e35bb1a16c196f2a72ba4";
    }
    const { show, exitVp, exitKey, motionConfig, presenceMode, onExitComplete, className, style, children } = t0;
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const t1 = exitVp?.once ?? false;
    const t2 = exitVp?.margin;
    const t3 = exitVp?.amount;
    let t4;
    if ($[1] !== t1 || $[2] !== t2 || $[3] !== t3) {
        t4 = {
            once: t1,
            margin: t2,
            amount: t3
        };
        $[1] = t1;
        $[2] = t2;
        $[3] = t3;
        $[4] = t4;
    } else {
        t4 = $[4];
    }
    const isInView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"])(containerRef, t4);
    const [wasEverInView, setWasEverInView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    if (isInView && !wasEverInView) {
        setWasEverInView(true);
    }
    const presenceShow = show && (!wasEverInView || isInView);
    let t5;
    if ($[5] !== children || $[6] !== className || $[7] !== exitKey || $[8] !== motionConfig || $[9] !== presenceShow || $[10] !== style) {
        t5 = presenceShow && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$motion$2d$from$2d$json$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MotionFromJson"], {
            motion: motionConfig,
            className: className,
            style: style,
            children: children
        }, exitKey, false, {
            fileName: "[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/element-exit-wrapper.tsx",
            lineNumber: 258,
            columnNumber: 26
        }, this);
        $[5] = children;
        $[6] = className;
        $[7] = exitKey;
        $[8] = motionConfig;
        $[9] = presenceShow;
        $[10] = style;
        $[11] = t5;
    } else {
        t5 = $[11];
    }
    let t6;
    if ($[12] !== onExitComplete || $[13] !== presenceMode || $[14] !== t5) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: containerRef,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                mode: presenceMode,
                onExitComplete: onExitComplete,
                children: t5
            }, void 0, false, {
                fileName: "[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/element-exit-wrapper.tsx",
                lineNumber: 271,
                columnNumber: 34
            }, this)
        }, void 0, false, {
            fileName: "[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/element-exit-wrapper.tsx",
            lineNumber: 271,
            columnNumber: 10
        }, this);
        $[12] = onExitComplete;
        $[13] = presenceMode;
        $[14] = t5;
        $[15] = t6;
    } else {
        t6 = $[15];
    }
    return t6;
}
_s(LeaveViewportExitPresence, "JzE2RyxVTT09x7Ajzpv8VOcAbnY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"]
    ];
});
_c1 = LeaveViewportExitPresence;
var _c, _c1;
__turbopack_context__.k.register(_c, "ElementExitWrapper");
__turbopack_context__.k.register(_c1, "LeaveViewportExitPresence");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/section-scroll-progress-bar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SectionScrollProgressBar",
    ()=>SectionScrollProgressBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-scroll.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-transform.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$motion$2d$value$2d$event$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/use-motion-value-event.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$section$2f$position$2f$use$2d$scroll$2d$container$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/section/position/use-scroll-container.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$page$2d$builder$2f$core$2f$page$2d$builder$2d$motion$2d$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/contracts/src/page-builder/core/page-builder-motion-defaults.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$reduced$2d$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/reduced-motion.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
/**
 * Renders a scroll progress bar driven by useScroll + useTransform.
 * ScaleX goes 0→1 as the section scrolls through the viewport.
 * Styling from content/motion-defaults progressBar when not overridden.
 */ const DEFAULT_OFFSET = [
    "start end",
    "end start"
];
function SectionScrollProgressBar(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(23);
    if ($[0] !== "7f4da1f33eb5044b24df0a6ff3c8077c7a0ae280f4e3583cc051000eb63cb5e9") {
        for(let $i = 0; $i < 23; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "7f4da1f33eb5044b24df0a6ff3c8077c7a0ae280f4e3583cc051000eb63cb5e9";
    }
    const { sectionRef, height: t1, fill: t2, trackBackground: t3, offset: t4, className, respectReducedMotion: t5 } = t0;
    const height = t1 === undefined ? __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$page$2d$builder$2f$core$2f$page$2d$builder$2d$motion$2d$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOTION_DEFAULTS"].progressBar.height : t1;
    const fill = t2 === undefined ? __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$page$2d$builder$2f$core$2f$page$2d$builder$2d$motion$2d$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOTION_DEFAULTS"].progressBar.fill : t2;
    const trackBackground = t3 === undefined ? __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$page$2d$builder$2f$core$2f$page$2d$builder$2d$motion$2d$defaults$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOTION_DEFAULTS"].progressBar.trackBackground : t3;
    const offset = t4 === undefined ? DEFAULT_OFFSET : t4;
    const respectReducedMotion = t5 === undefined ? true : t5;
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$section$2f$position$2f$use$2d$scroll$2d$container$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollContainerRef"])();
    const shouldReduceMotion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$reduced$2d$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useShouldReduceMotion"])(!respectReducedMotion);
    const t6 = containerRef ?? undefined;
    let t7;
    if ($[1] !== offset || $[2] !== sectionRef || $[3] !== t6) {
        t7 = {
            target: sectionRef,
            container: t6,
            offset
        };
        $[1] = offset;
        $[2] = sectionRef;
        $[3] = t6;
        $[4] = t7;
    } else {
        t7 = $[4];
    }
    const scrollOptions = t7;
    const { scrollYProgress } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScroll"])(scrollOptions);
    let t8;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = [
            0,
            1
        ];
        $[5] = t8;
    } else {
        t8 = $[5];
    }
    let t9;
    if ($[6] !== shouldReduceMotion) {
        t9 = shouldReduceMotion ? [
            0,
            0
        ] : [
            0,
            1
        ];
        $[6] = shouldReduceMotion;
        $[7] = t9;
    } else {
        t9 = $[7];
    }
    const scaleX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(scrollYProgress, t8, t9);
    let t10;
    if ($[8] !== scrollYProgress) {
        t10 = ({
            "SectionScrollProgressBar[useState()]": ()=>Math.round(Math.max(0, Math.min(1, scrollYProgress.get())) * 100) / 100
        })["SectionScrollProgressBar[useState()]"];
        $[8] = scrollYProgress;
        $[9] = t10;
    } else {
        t10 = $[9];
    }
    const [progressForA11y, setProgressForA11y] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t10);
    let t11;
    if ($[10] === Symbol.for("react.memo_cache_sentinel")) {
        t11 = ({
            "SectionScrollProgressBar[useMotionValueEvent()]": (latest)=>{
                const clamped = Math.max(0, Math.min(1, latest));
                setProgressForA11y(Math.round(clamped * 100) / 100);
            }
        })["SectionScrollProgressBar[useMotionValueEvent()]"];
        $[10] = t11;
    } else {
        t11 = $[10];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$motion$2d$value$2d$event$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValueEvent"])(scrollYProgress, "change", t11);
    let t12;
    if ($[11] !== height || $[12] !== trackBackground) {
        t12 = {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height,
            background: trackBackground,
            transformOrigin: "0 0",
            zIndex: 5
        };
        $[11] = height;
        $[12] = trackBackground;
        $[13] = t12;
    } else {
        t12 = $[13];
    }
    let t13;
    if ($[14] !== fill || $[15] !== height || $[16] !== scaleX) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            style: {
                scaleX,
                originX: 0,
                height,
                background: fill,
                width: "100%"
            }
        }, void 0, false, {
            fileName: "[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/section-scroll-progress-bar.tsx",
            lineNumber: 134,
            columnNumber: 11
        }, this);
        $[14] = fill;
        $[15] = height;
        $[16] = scaleX;
        $[17] = t13;
    } else {
        t13 = $[17];
    }
    let t14;
    if ($[18] !== className || $[19] !== progressForA11y || $[20] !== t12 || $[21] !== t13) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: className,
            role: "progressbar",
            "aria-valuemin": 0,
            "aria-valuemax": 1,
            "aria-valuenow": progressForA11y,
            "aria-label": "Section scroll progress",
            style: t12,
            children: t13
        }, void 0, false, {
            fileName: "[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/section-scroll-progress-bar.tsx",
            lineNumber: 150,
            columnNumber: 11
        }, this);
        $[18] = className;
        $[19] = progressForA11y;
        $[20] = t12;
        $[21] = t13;
        $[22] = t14;
    } else {
        t14 = $[22];
    }
    return t14;
}
_s(SectionScrollProgressBar, "FJ1xp9+rBGXLusK6rhyMhLkn3uA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$section$2f$position$2f$use$2d$scroll$2d$container$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollContainerRef"],
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$reduced$2d$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useShouldReduceMotion"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScroll"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$motion$2d$value$2d$event$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValueEvent"]
    ];
});
_c = SectionScrollProgressBar;
var _c;
__turbopack_context__.k.register(_c, "SectionScrollProgressBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/section-motion-wrapper.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SectionMotionWrapper",
    ()=>SectionMotionWrapper
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$motion$2d$from$2d$json$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/motion-from-json.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$animations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/animations.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$reduced$2d$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/reduced-motion.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const SectionMotionWrapper = /*#__PURE__*/ _s((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = _s(({ sectionRef, motion: motionFromJson, motionTiming, reduceMotion, children, ...sectionProps }, _forwardedRef)=>{
    _s();
    const { ref: _omitRef, ...restSectionProps } = sectionProps;
    // ── motionTiming path (entrance animation, same semantics as ElementEntranceWrapper) ──
    const resolved = motionTiming?.resolvedEntranceMotion;
    // Fix 1: reduceMotion=true (default) → respect OS preference; reduceMotion=false → ignore it.
    // useShouldReduceMotion takes `ignorePreference`, so invert: ignore when reduceMotion is explicitly false.
    const ignorePreference = reduceMotion === false;
    const skip = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$reduced$2d$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useShouldReduceMotion"])(ignorePreference);
    // null = pre-hydration (SSR) | false = hydrated, below fold | true = hydrated, in viewport
    const [viewOnMount, setViewOnMount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Fix 2: window.innerHeight is already inside useLayoutEffect (client-only), so SSR is safe.
    // The existing guard is correct; adding an explicit typeof check for clarity.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "SectionMotionWrapper.useLayoutEffect": ()=>{
            if (!resolved) return;
            const el = sectionRef.current;
            const inView = !!el && ("TURBOPACK compile-time value", "object") !== "undefined" && el.getBoundingClientRect().top < window.innerHeight && el.getBoundingClientRect().bottom > 0;
            queueMicrotask({
                "SectionMotionWrapper.useLayoutEffect": ()=>{
                    setViewOnMount(inView);
                }
            }["SectionMotionWrapper.useLayoutEffect"]);
        }
    }["SectionMotionWrapper.useLayoutEffect"], [
        resolved,
        sectionRef
    ]);
    const onTriggerUnsupportedWarnedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "SectionMotionWrapper.useLayoutEffect": ()=>{
            if (("TURBOPACK compile-time value", "development") !== "development" || !resolved || !motionTiming) return;
            const trigger = motionTiming.trigger ?? "onFirstVisible";
            if (trigger !== "onTrigger" || onTriggerUnsupportedWarnedRef.current) return;
            onTriggerUnsupportedWarnedRef.current = true;
            console.warn('[page-builder] SectionMotionWrapper: triggerMode "onTrigger" is not supported for sections — falling back to "whileInView".');
        }
    }["SectionMotionWrapper.useLayoutEffect"], [
        resolved,
        motionTiming
    ]);
    if (resolved) {
        const { initial, animate, transition, viewportAmount, viewportOnce, whileHover, whileTap } = resolved;
        const trigger = motionTiming?.trigger ?? "onFirstVisible";
        const effectiveInitial = skip || viewOnMount === true ? animate : initial;
        const effectiveTransition = skip || viewOnMount === true ? {
            duration: 0
        } : transition;
        const sharedProps = {
            ...restSectionProps,
            ref: sectionRef
        };
        // SSR + pre-hydration: plain section so content is visible in static HTML.
        if (viewOnMount === null) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                ref: sectionRef,
                ...restSectionProps,
                children: children
            }, void 0, false, {
                fileName: "[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/section-motion-wrapper.tsx",
                lineNumber: 99,
                columnNumber: 11
            }, ("TURBOPACK compile-time value", void 0));
        }
        if (trigger === "onMount") {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].section, {
                ...sharedProps,
                initial: effectiveInitial,
                animate: animate,
                transition: effectiveTransition,
                whileHover: whileHover,
                whileTap: whileTap,
                children: children
            }, void 0, false, {
                fileName: "[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/section-motion-wrapper.tsx",
                lineNumber: 107,
                columnNumber: 11
            }, ("TURBOPACK compile-time value", void 0));
        }
        // Default: onFirstVisible / onEveryVisible — FM native whileInView
        // onTrigger is not applicable to sections (warn once in dev via useLayoutEffect); falls through to whileInView.
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].section, {
            ...sharedProps,
            initial: effectiveInitial,
            whileInView: animate,
            viewport: {
                once: viewportOnce,
                amount: viewportAmount
            },
            transition: effectiveTransition,
            whileHover: whileHover,
            whileTap: whileTap,
            children: children
        }, void 0, false, {
            fileName: "[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/section-motion-wrapper.tsx",
            lineNumber: 124,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0));
    }
    // ── Raw motion props path (existing behaviour) ──
    if (motionFromJson) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$motion$2d$from$2d$json$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MotionFromJson"], {
            as: "section",
            motion: motionFromJson,
            ref: sectionRef,
            ...restSectionProps,
            children: children
        }, void 0, false, {
            fileName: "[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/section-motion-wrapper.tsx",
            lineNumber: 141,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        ref: sectionRef,
        ...restSectionProps,
        children: children
    }, void 0, false, {
        fileName: "[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/section-motion-wrapper.tsx",
        lineNumber: 153,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
}, "6Ij1E75hB7VYO8uuf4tHEbiV1wg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$reduced$2d$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useShouldReduceMotion"]
    ];
})), "6Ij1E75hB7VYO8uuf4tHEbiV1wg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$reduced$2d$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useShouldReduceMotion"]
    ];
});
_c1 = SectionMotionWrapper;
SectionMotionWrapper.displayName = "SectionMotionWrapper";
var _c, _c1;
__turbopack_context__.k.register(_c, "SectionMotionWrapper$forwardRef");
__turbopack_context__.k.register(_c1, "SectionMotionWrapper");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/drag-handle-controls.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useDragHandleControls",
    ()=>useDragHandleControls
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$gestures$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/gestures.tsx [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$gestures$2f$drag$2f$use$2d$drag$2d$controls$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/gestures/drag/use-drag-controls.mjs [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function useDragHandleControls() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(8);
    if ($[0] !== "69020288f249d2a5ae74d66bd3ab6255af135a8f1e0c5338886469883406f43f") {
        for(let $i = 0; $i < 8; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "69020288f249d2a5ae74d66bd3ab6255af135a8f1e0c5338886469883406f43f";
    }
    const dragControls = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$gestures$2f$drag$2f$use$2d$drag$2d$controls$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDragControls"])();
    let t0;
    if ($[1] !== dragControls) {
        t0 = ({
            "useDragHandleControls[onPointerDown]": (event)=>{
                dragControls.start(event);
            }
        })["useDragHandleControls[onPointerDown]"];
        $[1] = dragControls;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    const onPointerDown = t0;
    let t1;
    if ($[3] !== onPointerDown) {
        t1 = {
            onPointerDown
        };
        $[3] = onPointerDown;
        $[4] = t1;
    } else {
        t1 = $[4];
    }
    let t2;
    if ($[5] !== dragControls || $[6] !== t1) {
        t2 = {
            dragControls,
            handleBindings: t1
        };
        $[5] = dragControls;
        $[6] = t1;
        $[7] = t2;
    } else {
        t2 = $[7];
    }
    return t2;
}
_s(useDragHandleControls, "7EAh+g50QNP9Fq5c54QuV6eywWY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$gestures$2f$drag$2f$use$2d$drag$2d$controls$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDragControls"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/scroll-style.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSectionScrollOpacityStyle",
    ()=>useSectionScrollOpacityStyle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$section$2d$scroll$2d$progress$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/section-scroll-progress.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$reduced$2d$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/reduced-motion.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function clamp01(value) {
    if (!Number.isFinite(value)) return 0;
    if (value < 0) return 0;
    if (value > 1) return 1;
    return value;
}
function useSectionScrollOpacityStyle(sectionRef, range, options) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(21);
    if ($[0] !== "19ec1e97830b3e4891eed9cc94779b37a2ddaae55bd6dab058e74069b46bf018") {
        for(let $i = 0; $i < 21; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "19ec1e97830b3e4891eed9cc94779b37a2ddaae55bd6dab058e74069b46bf018";
    }
    const [opacity, setOpacity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const respectReducedMotion = options?.respectReducedMotion !== false;
    const shouldReduceMotion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$reduced$2d$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useShouldReduceMotion"])(!respectReducedMotion);
    let t0;
    if ($[1] !== range || $[2] !== shouldReduceMotion) {
        t0 = ({
            "useSectionScrollOpacityStyle[handleProgress]": (progress)=>{
                if (!range || shouldReduceMotion) {
                    return;
                }
                const [inStart, inEnd] = range.input ?? [
                    0,
                    1
                ];
                const [outStart, outEnd] = range.output ?? [
                    0,
                    1
                ];
                const inputSpan = inEnd - inStart || 1;
                const normalized = clamp01((progress - inStart) / inputSpan);
                const value = outStart + (outEnd - outStart) * normalized;
                setOpacity(value);
            }
        })["useSectionScrollOpacityStyle[handleProgress]"];
        $[1] = range;
        $[2] = shouldReduceMotion;
        $[3] = t0;
    } else {
        t0 = $[3];
    }
    const handleProgress = t0;
    const t1 = range && !shouldReduceMotion ? handleProgress : undefined;
    let t2;
    if ($[4] !== sectionRef || $[5] !== t1) {
        t2 = {
            sectionRef,
            onProgress: t1
        };
        $[4] = sectionRef;
        $[5] = t1;
        $[6] = t2;
    } else {
        t2 = $[6];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$section$2d$scroll$2d$progress$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSectionScrollProgressFM"])(t2);
    if (!range) {
        return;
    }
    if (shouldReduceMotion) {
        let t3;
        if ($[7] !== range.output) {
            t3 = range.output ?? [
                0,
                1
            ];
            $[7] = range.output;
            $[8] = t3;
        } else {
            t3 = $[8];
        }
        const [, outEnd_0] = t3;
        const t4 = outEnd_0 ?? 1;
        let t5;
        if ($[9] !== t4) {
            t5 = clamp01(t4);
            $[9] = t4;
            $[10] = t5;
        } else {
            t5 = $[10];
        }
        const fallbackOpacity = t5;
        let t6;
        if ($[11] !== fallbackOpacity) {
            t6 = {
                opacity: fallbackOpacity
            };
            $[11] = fallbackOpacity;
            $[12] = t6;
        } else {
            t6 = $[12];
        }
        return t6;
    }
    if (opacity === null) {
        let t3;
        if ($[13] !== range.output) {
            t3 = range.output ?? [
                0,
                1
            ];
            $[13] = range.output;
            $[14] = t3;
        } else {
            t3 = $[14];
        }
        const [outStart_0] = t3;
        const t4 = outStart_0 ?? 0;
        let t5;
        if ($[15] !== t4) {
            t5 = clamp01(t4);
            $[15] = t4;
            $[16] = t5;
        } else {
            t5 = $[16];
        }
        let t6;
        if ($[17] !== t5) {
            t6 = {
                opacity: t5
            };
            $[17] = t5;
            $[18] = t6;
        } else {
            t6 = $[18];
        }
        return t6;
    }
    let t3;
    if ($[19] !== opacity) {
        t3 = {
            opacity
        };
        $[19] = opacity;
        $[20] = t3;
    } else {
        t3 = $[20];
    }
    return t3;
}
_s(useSectionScrollOpacityStyle, "SLrdC5RWDz4PVRDuTIlYGE/CerM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$reduced$2d$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useShouldReduceMotion"],
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$section$2d$scroll$2d$progress$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSectionScrollProgressFM"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/use-bg-layer-motion.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useBgLayerMotion",
    ()=>useBgLayerMotion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$triggers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/triggers.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-scroll.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$motion$2d$values$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/motion-values.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-transform.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$motion$2d$value$2d$event$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/use-motion-value-event.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$animations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/animations.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/animation/animate/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$section$2f$position$2f$use$2d$scroll$2d$container$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/section/position/use-scroll-container.tsx [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
// ── Interpolation helpers ─────────────────────────────────────────────────────
/**
 * Map a normalised progress value [0–1] linearly between two arbitrary values.
 *
 * Supported forms (in priority order):
 *   number            42 → 80
 *   number+unit       "0px" → "100px",  "0%" → "50%",  "0deg" → "360deg"
 *   CSS single-arg fn "hue-rotate(0deg)" → "hue-rotate(180deg)",
 *                     "rotate(0deg)"  →  "rotate(90deg)"
 *   fallback          steps at midpoint (0.5)
 */ function interpolateProp(start, end, t, clamp = true) {
    const tc = clamp ? Math.max(0, Math.min(1, t)) : t;
    if (typeof start === "number" && typeof end === "number") {
        return start + (end - start) * tc;
    }
    if (typeof start === "string" && typeof end === "string") {
        // "number+unit"  e.g. "0%", "100px", "360deg"
        const numUnit1 = start.match(/^([-\d.]+)([a-z%]*)$/i);
        const numUnit2 = end.match(/^([-\d.]+)([a-z%]*)$/i);
        if (numUnit1 && numUnit2 && numUnit1[2] === numUnit2[2]) {
            const v = parseFloat(numUnit1[1]) + (parseFloat(numUnit2[1]) - parseFloat(numUnit1[1])) * tc;
            return `${v}${numUnit1[2]}`;
        }
        // CSS single-argument function  e.g. "hue-rotate(0deg)" → "hue-rotate(180deg)"
        const fn1 = start.match(/^([\w-]+)\(([-\d.]+)([a-z%]*)\)$/i);
        const fn2 = end.match(/^([\w-]+)\(([-\d.]+)([a-z%]*)\)$/i);
        if (fn1 && fn2 && fn1[1] === fn2[1] && fn1[3] === fn2[3]) {
            const v = parseFloat(fn1[2]) + (parseFloat(fn2[2]) - parseFloat(fn1[2])) * tc;
            return `${fn1[1]}(${v}${fn1[3]})`;
        }
        return tc < 0.5 ? start : end;
    }
    return tc < 0.5 ? start : end;
}
/**
 * Lerp a single value toward `target` by `factor` (0–1 per frame).
 * Same type support as `interpolateProp`.
 */ function lerpProp(current, target, factor) {
    if (typeof current === "number" && typeof target === "number") {
        return current + (target - current) * factor;
    }
    if (typeof current === "string" && typeof target === "string") {
        const m1 = current.match(/^([-\d.]+)([a-z%]*)$/i);
        const m2 = target.match(/^([-\d.]+)([a-z%]*)$/i);
        if (m1 && m2 && m1[2] === m2[2]) {
            const v = parseFloat(m1[1]) + (parseFloat(m2[1]) - parseFloat(m1[1])) * factor;
            return `${v}${m1[2]}`;
        }
    }
    return target;
}
/** Write a property value to a DOM element's style, supporting CSS custom properties. */ function applyStyleProp(el, prop, value) {
    if (prop.startsWith("--")) {
        el.style.setProperty(prop, String(value));
    } else {
        el.style[prop] = value;
    }
}
function useBgLayerMotion(motions, layerRef) {
    _s();
    const scrollMotions = motions.filter((m)=>m.type === "scroll");
    const pointerMotions = motions.filter((m_0)=>m_0.type === "pointer");
    const parallaxMotion = motions.find((m_1)=>m_1.type === "parallax");
    const triggerMotions = motions.filter((m_2)=>m_2.type === "trigger");
    // Picks up the project's scroll container (overflow-y:auto div from layout).
    // Falls back gracefully to window scroll when no provider is present.
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$section$2f$position$2f$use$2d$scroll$2d$container$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollContainerRef"])();
    // ── Parallax ─────────────────────────────────────────────────────────
    // Always call useScroll + useTransform (hooks must be unconditional).
    // When no parallax is configured, the MotionValues are neutral (0% → 0%) and unused.
    const { scrollYProgress: parallaxProgress } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScroll"])({
        container: containerRef ?? undefined,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        offset: parallaxMotion?.offset ?? [
            "start start",
            "end end"
        ]
    });
    const parallaxAxis = parallaxMotion?.axis ?? "y";
    const parallaxSpeed = parallaxMotion?.speed ?? 0;
    const parallaxX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(parallaxProgress, [
        0,
        1
    ], parallaxAxis === "x" ? [
        "0%",
        `${parallaxSpeed * 100}%`
    ] : [
        "0%",
        "0%"
    ]);
    const parallaxY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(parallaxProgress, [
        0,
        1
    ], parallaxAxis === "y" ? [
        "0%",
        `${parallaxSpeed * 100}%`
    ] : [
        "0%",
        "0%"
    ]);
    // ── Scroll ────────────────────────────────────────────────────────────
    // Drives CSS properties (including custom properties) from page-scroll progress.
    // Direct DOM style writes — no React re-renders.
    const { scrollYProgress: scrollMotionProgress } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScroll"])({
        container: containerRef ?? undefined,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        offset: scrollMotions[0]?.offset ?? [
            "start start",
            "end end"
        ]
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$motion$2d$value$2d$event$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValueEvent"])(scrollMotionProgress, "change", {
        "useBgLayerMotion.useMotionValueEvent": (progress)=>{
            if (!layerRef.current || scrollMotions.length === 0) return;
            for (const sm of scrollMotions){
                const clamp = sm.clamp !== false;
                for (const [prop, [start, end]] of Object.entries(sm.properties)){
                    const value = interpolateProp(start, end, progress, clamp);
                    applyStyleProp(layerRef.current, prop, value);
                }
            }
        }
    }["useBgLayerMotion.useMotionValueEvent"]);
    // ── Pointer ────────────────────────────────────────────────────────────
    // RAF-based lerp toward mouse position. Runs only when pointer motions are present.
    const pointerTargetRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({});
    const pointerCurrentRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({});
    const pointerRafRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useBgLayerMotion.useEffect": ()=>{
            if (pointerMotions.length === 0) return;
            const lerpFactor = pointerMotions[0]?.ease ?? 0.08;
            const onMouseMove = {
                "useBgLayerMotion.useEffect.onMouseMove": (e)=>{
                    const nx = e.clientX / window.innerWidth;
                    const ny = e.clientY / window.innerHeight;
                    for (const pm of pointerMotions){
                        if (pm.x) {
                            for (const [prop_0, [from, to]] of Object.entries(pm.x)){
                                pointerTargetRef.current[prop_0] = interpolateProp(from, to, nx, true);
                            }
                        }
                        if (pm.y) {
                            for (const [prop_1, [from_0, to_0]] of Object.entries(pm.y)){
                                pointerTargetRef.current[prop_1] = interpolateProp(from_0, to_0, ny, true);
                            }
                        }
                    }
                }
            }["useBgLayerMotion.useEffect.onMouseMove"];
            const tick = {
                "useBgLayerMotion.useEffect.tick": ()=>{
                    const el = layerRef.current;
                    if (el) {
                        for (const [prop_2, target] of Object.entries(pointerTargetRef.current)){
                            const current = pointerCurrentRef.current[prop_2];
                            const next = current === undefined ? target : lerpProp(current, target, lerpFactor);
                            pointerCurrentRef.current[prop_2] = next;
                            applyStyleProp(el, prop_2, next);
                        }
                    }
                    pointerRafRef.current = requestAnimationFrame(tick);
                }
            }["useBgLayerMotion.useEffect.tick"];
            window.addEventListener("mousemove", onMouseMove, {
                passive: true
            });
            pointerRafRef.current = requestAnimationFrame(tick);
            return ({
                "useBgLayerMotion.useEffect": ()=>{
                    window.removeEventListener("mousemove", onMouseMove);
                    if (pointerRafRef.current !== null) {
                        cancelAnimationFrame(pointerRafRef.current);
                        pointerRafRef.current = null;
                    }
                }
            })["useBgLayerMotion.useEffect"];
        }
    }["useBgLayerMotion.useEffect"], [
        pointerMotions,
        layerRef
    ]);
    // ── Trigger ─────────────────────────────────────────────────────────────
    // Imperative FM animate() calls in response to custom window events.
    // Each trigger config gets its own event listener; multiple configs coexist.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useBgLayerMotion.useEffect": ()=>{
            if (triggerMotions.length === 0) return;
            const cleanups = [];
            // Track toggle state per trigger id (false = resting at "from")
            const toggleState = {};
            for (const tm of triggerMotions){
                toggleState[tm.id] = false;
                // Auto-play: fire on mount after optional delay
                if (tm.autoPlay) {
                    const delayMs = (tm.autoPlayDelay ?? 0) * 1000;
                    const timer = window.setTimeout({
                        "useBgLayerMotion.useEffect.timer": ()=>{
                            if (!layerRef.current) return;
                            void (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["animate"])(layerRef.current, tm.to, {
                                duration: tm.transition?.duration ?? 0.8,
                                ease: tm.transition?.ease ?? "easeOut",
                                delay: tm.transition?.delay ?? 0
                            });
                            toggleState[tm.id] = true;
                        }
                    }["useBgLayerMotion.useEffect.timer"], delayMs);
                    cleanups.push({
                        "useBgLayerMotion.useEffect": ()=>clearTimeout(timer)
                    }["useBgLayerMotion.useEffect"]);
                }
                // Event listener
                const handler = {
                    "useBgLayerMotion.useEffect.handler": ()=>{
                        if (!layerRef.current) return;
                        const shouldGoToActive = tm.toggle ? !toggleState[tm.id] : true;
                        const target_0 = shouldGoToActive ? tm.to : tm.from;
                        void (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["animate"])(layerRef.current, target_0, {
                            duration: tm.transition?.duration ?? 0.8,
                            ease: tm.transition?.ease ?? "easeOut",
                            delay: tm.transition?.delay ?? 0
                        });
                        if (tm.toggle) toggleState[tm.id] = shouldGoToActive;
                    }
                }["useBgLayerMotion.useEffect.handler"];
                window.addEventListener(tm.id, handler);
                cleanups.push({
                    "useBgLayerMotion.useEffect": ()=>window.removeEventListener(tm.id, handler)
                }["useBgLayerMotion.useEffect"]);
            }
            return ({
                "useBgLayerMotion.useEffect": ()=>{
                    for (const cleanup of cleanups)cleanup();
                }
            })["useBgLayerMotion.useEffect"];
        }
    }["useBgLayerMotion.useEffect"], [
        triggerMotions,
        layerRef
    ]);
    // ── Return ─────────────────────────────────────────────────────────────
    // Only expose parallax MotionValues when parallax is actually configured.
    // This prevents unnecessary MotionValue subscriptions on plain layers.
    const motionStyle = {};
    if (parallaxMotion) {
        if (parallaxAxis === "x") {
            motionStyle.backgroundPositionX = parallaxX;
        } else {
            motionStyle.backgroundPositionY = parallaxY;
        }
    }
    return {
        motionStyle
    };
}
_s(useBgLayerMotion, "gmnalY1Zeru83QlzQzl8/p9u3PQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$section$2f$position$2f$use$2d$scroll$2d$container$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollContainerRef"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScroll"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScroll"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$motion$2d$value$2d$event$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValueEvent"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
/**
 * Framer Motion integration for the page builder.
 * All framer-motion imports go through this folder; no direct "framer-motion" imports elsewhere in page-builder.
 *
 * Data flow: JSON motion/motionTiming → schemas (motion-props-schema) → mergeMotionDefaults (page-builder-motion-defaults)
 * → wrappers (ElementEntranceWrapper, SectionMotionWrapper, ModalAnimationWrapper, etc.) → MotionFromJson → motion.* components.
 * See docs/integrations/framer-motion.md for full architecture and where to add new motion features.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$accessibility$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/accessibility.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$reduced$2d$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/reduced-motion.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$viewport$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/viewport.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$animations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/animations.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$presence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/presence.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$motion$2d$values$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/motion-values.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$triggers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/triggers.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/layout.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$layout$2d$motion$2d$div$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/layout-motion-div.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$gestures$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/gestures.tsx [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$use$2d$video$2d$lazy$2d$load$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/use-video-lazy-load.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$motion$2d$from$2d$json$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/motion-from-json.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$element$2d$exit$2d$wrapper$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/element-exit-wrapper.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$section$2d$scroll$2d$progress$2d$bar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/section-scroll-progress-bar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$section$2d$motion$2d$wrapper$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/section-motion-wrapper.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$drag$2d$handle$2d$controls$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/drag-handle-controls.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$scroll$2d$style$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/scroll-style.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$use$2d$bg$2d$layer$2d$motion$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/use-bg-layer-motion.ts [app-client] (ecmascript)");
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
;
;
;
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
"[project]/packages/runtime-react/src/page-builder/triggers/PageTrigger.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PageTrigger",
    ()=>PageTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$section$2f$position$2f$use$2d$section$2d$base$2d$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/section/position/use-section-base-styles.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$trigger$2d$event$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/triggers/core/trigger-event.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$section$2f$position$2f$use$2d$section$2d$scroll$2d$progress$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/section/position/use-section-scroll-progress.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$use$2d$section$2d$custom$2d$triggers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/triggers/core/use-section-custom-triggers.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$section$2d$motion$2d$wrapper$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/section-motion-wrapper.tsx [app-client] (ecmascript)");
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
function PageTrigger(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(58);
    if ($[0] !== "bd5836d017dad0280b8dff9f81f3747af2b5a0cd39c140618a968e14ddec4f84") {
        for(let $i = 0; $i < 58; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "bd5836d017dad0280b8dff9f81f3747af2b5a0cd39c140618a968e14ddec4f84";
    }
    const { id, onVisible, onInvisible, onProgress, onViewportProgress, threshold: t1, triggerOnce: t2, rootMargin, delay, width, height: t3, align, marginLeft, marginRight, marginTop, marginBottom, initialX, initialY, motion: motionFromJson, keyboardTriggers, timerTriggers, cursorTriggers, scrollDirectionTriggers, idleTriggers } = t0;
    const threshold = t1 === undefined ? 0 : t1;
    const triggerOnce = t2 === undefined ? false : t2;
    const height = t3 === undefined ? "1px" : t3;
    const sentinelRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const hasFiredVisibleOnce = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const pendingTimeout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const lastViewportProgressRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const hasVisibleTrigger = onVisible != null;
    const hasInvisibleTrigger = onInvisible != null;
    const hasViewportProgressTrigger = onViewportProgress != null;
    let t4;
    if ($[1] !== id || $[2] !== onVisible) {
        t4 = ({
            "PageTrigger[useEffectEvent()]": ()=>{
                if (onVisible) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$trigger$2d$event$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["firePageBuilderTrigger"])(true, onVisible, id);
                }
            }
        })["PageTrigger[useEffectEvent()]"];
        $[1] = id;
        $[2] = onVisible;
        $[3] = t4;
    } else {
        t4 = $[3];
    }
    const fireVisibleAction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffectEvent"])(t4);
    let t5;
    if ($[4] !== id || $[5] !== onInvisible) {
        t5 = ({
            "PageTrigger[useEffectEvent()]": ()=>{
                if (onInvisible) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$trigger$2d$event$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["firePageBuilderTrigger"])(false, onInvisible, id);
                }
            }
        })["PageTrigger[useEffectEvent()]"];
        $[4] = id;
        $[5] = onInvisible;
        $[6] = t5;
    } else {
        t5 = $[6];
    }
    const fireInvisibleAction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffectEvent"])(t5);
    let t6;
    if ($[7] !== id || $[8] !== onViewportProgress) {
        t6 = ({
            "PageTrigger[useEffectEvent()]": (ratio)=>{
                if (onViewportProgress) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$trigger$2d$event$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["firePageBuilderProgressTrigger"])(ratio, onViewportProgress, id);
                }
            }
        })["PageTrigger[useEffectEvent()]"];
        $[7] = id;
        $[8] = onViewportProgress;
        $[9] = t6;
    } else {
        t6 = $[9];
    }
    const fireViewportProgressAction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffectEvent"])(t6);
    let t7;
    if ($[10] !== cursorTriggers || $[11] !== idleTriggers || $[12] !== keyboardTriggers || $[13] !== scrollDirectionTriggers || $[14] !== timerTriggers) {
        t7 = {
            keyboardTriggers,
            timerTriggers,
            cursorTriggers,
            scrollDirectionTriggers,
            idleTriggers
        };
        $[10] = cursorTriggers;
        $[11] = idleTriggers;
        $[12] = keyboardTriggers;
        $[13] = scrollDirectionTriggers;
        $[14] = timerTriggers;
        $[15] = t7;
    } else {
        t7 = $[15];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$use$2d$section$2d$custom$2d$triggers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSectionCustomTriggers"])(t7);
    let t8;
    if ($[16] !== id || $[17] !== onProgress) {
        t8 = onProgress ? (progress)=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$trigger$2d$event$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["firePageBuilderProgressTrigger"])(progress, onProgress, id);
        } : undefined;
        $[16] = id;
        $[17] = onProgress;
        $[18] = t8;
    } else {
        t8 = $[18];
    }
    let t9;
    if ($[19] !== t8) {
        t9 = {
            sectionRef: sentinelRef,
            onProgress: t8
        };
        $[19] = t8;
        $[20] = t9;
    } else {
        t9 = $[20];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$section$2f$position$2f$use$2d$section$2d$scroll$2d$progress$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSectionScrollProgress"])(t9);
    let t10;
    if ($[21] !== align || $[22] !== height || $[23] !== initialX || $[24] !== initialY || $[25] !== marginBottom || $[26] !== marginLeft || $[27] !== marginRight || $[28] !== marginTop || $[29] !== width) {
        t10 = {
            fill: undefined,
            layers: undefined,
            effects: undefined,
            width,
            height,
            align,
            marginLeft,
            marginRight,
            marginTop,
            marginBottom,
            borderRadius: undefined,
            border: undefined,
            scrollSpeed: 1,
            initialX,
            initialY,
            sectionRef: sentinelRef,
            usePadding: false
        };
        $[21] = align;
        $[22] = height;
        $[23] = initialX;
        $[24] = initialY;
        $[25] = marginBottom;
        $[26] = marginLeft;
        $[27] = marginRight;
        $[28] = marginTop;
        $[29] = width;
        $[30] = t10;
    } else {
        t10 = $[30];
    }
    const { baseStyle } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$section$2f$position$2f$use$2d$section$2d$base$2d$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSectionBaseStyles"])(t10);
    let t11;
    if ($[31] !== delay || $[32] !== fireInvisibleAction || $[33] !== fireViewportProgressAction || $[34] !== fireVisibleAction || $[35] !== hasInvisibleTrigger || $[36] !== hasViewportProgressTrigger || $[37] !== hasVisibleTrigger || $[38] !== onProgress || $[39] !== rootMargin || $[40] !== threshold || $[41] !== triggerOnce) {
        t11 = ({
            "PageTrigger[useEffect()]": ()=>{
                const el = sentinelRef.current;
                if (!el || !hasVisibleTrigger && !hasInvisibleTrigger && !onProgress && !hasViewportProgressTrigger) {
                    return;
                }
                const observer = new IntersectionObserver((entries)=>{
                    for (const entry of entries){
                        if (hasViewportProgressTrigger) {
                            const ratio_0 = entry.intersectionRatio;
                            if (lastViewportProgressRef.current === null || Math.abs(ratio_0 - lastViewportProgressRef.current) > 0.001) {
                                lastViewportProgressRef.current = ratio_0;
                                fireViewportProgressAction(ratio_0);
                            }
                        }
                        const visible = entry.isIntersecting;
                        if (pendingTimeout.current != null) {
                            clearTimeout(pendingTimeout.current);
                            pendingTimeout.current = null;
                        }
                        if (visible) {
                            if (hasVisibleTrigger) {
                                if (triggerOnce && hasFiredVisibleOnce.current) {
                                    return;
                                }
                                if (triggerOnce) {
                                    hasFiredVisibleOnce.current = true;
                                }
                                const ms = delay ?? 0;
                                if (ms > 0) {
                                    pendingTimeout.current = setTimeout({
                                        "PageTrigger[useEffect() > <anonymous> > setTimeout()]": ()=>{
                                            pendingTimeout.current = null;
                                            fireVisibleAction();
                                        }
                                    }["PageTrigger[useEffect() > <anonymous> > setTimeout()]"], ms);
                                } else {
                                    fireVisibleAction();
                                }
                            }
                        } else {
                            if (hasInvisibleTrigger) {
                                const ms_0 = delay ?? 0;
                                if (ms_0 > 0) {
                                    pendingTimeout.current = setTimeout({
                                        "PageTrigger[useEffect() > <anonymous> > setTimeout()]": ()=>{
                                            pendingTimeout.current = null;
                                            fireInvisibleAction();
                                        }
                                    }["PageTrigger[useEffect() > <anonymous> > setTimeout()]"], ms_0);
                                } else {
                                    fireInvisibleAction();
                                }
                            }
                        }
                    }
                }, {
                    threshold: hasViewportProgressTrigger ? Array.from({
                        length: 101
                    }, _PageTriggerUseEffectArrayFrom) : threshold,
                    rootMargin: rootMargin ?? undefined
                });
                observer.observe(el);
                return ()=>{
                    if (pendingTimeout.current != null) {
                        clearTimeout(pendingTimeout.current);
                    }
                    observer.disconnect();
                    lastViewportProgressRef.current = null;
                };
            }
        })["PageTrigger[useEffect()]"];
        $[31] = delay;
        $[32] = fireInvisibleAction;
        $[33] = fireViewportProgressAction;
        $[34] = fireVisibleAction;
        $[35] = hasInvisibleTrigger;
        $[36] = hasViewportProgressTrigger;
        $[37] = hasVisibleTrigger;
        $[38] = onProgress;
        $[39] = rootMargin;
        $[40] = threshold;
        $[41] = triggerOnce;
        $[42] = t11;
    } else {
        t11 = $[42];
    }
    let t12;
    if ($[43] !== delay || $[44] !== hasInvisibleTrigger || $[45] !== hasViewportProgressTrigger || $[46] !== hasVisibleTrigger || $[47] !== id || $[48] !== onProgress || $[49] !== rootMargin || $[50] !== threshold || $[51] !== triggerOnce) {
        t12 = [
            id,
            onProgress,
            threshold,
            triggerOnce,
            rootMargin,
            delay,
            hasVisibleTrigger,
            hasInvisibleTrigger,
            hasViewportProgressTrigger
        ];
        $[43] = delay;
        $[44] = hasInvisibleTrigger;
        $[45] = hasViewportProgressTrigger;
        $[46] = hasVisibleTrigger;
        $[47] = id;
        $[48] = onProgress;
        $[49] = rootMargin;
        $[50] = threshold;
        $[51] = triggerOnce;
        $[52] = t12;
    } else {
        t12 = $[52];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t11, t12);
    let t13;
    if ($[53] !== baseStyle) {
        t13 = {
            ...baseStyle,
            visibility: "hidden",
            minHeight: 0
        };
        $[53] = baseStyle;
        $[54] = t13;
    } else {
        t13 = $[54];
    }
    let t14;
    if ($[55] !== motionFromJson || $[56] !== t13) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$section$2d$motion$2d$wrapper$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionMotionWrapper"], {
            sectionRef: sentinelRef,
            motion: motionFromJson,
            className: "pointer-events-none invisible shrink-0",
            style: t13,
            "aria-hidden": true,
            children: null
        }, void 0, false, {
            fileName: "[project]/packages/runtime-react/src/page-builder/triggers/PageTrigger.tsx",
            lineNumber: 305,
            columnNumber: 11
        }, this);
        $[55] = motionFromJson;
        $[56] = t13;
        $[57] = t14;
    } else {
        t14 = $[57];
    }
    return t14;
}
_s(PageTrigger, "3d0BalUJtccEJF62lAahV5TW860=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffectEvent"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffectEvent"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffectEvent"],
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$use$2d$section$2d$custom$2d$triggers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSectionCustomTriggers"],
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$section$2f$position$2f$use$2d$section$2d$scroll$2d$progress$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSectionScrollProgress"],
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$section$2f$position$2f$use$2d$section$2d$base$2d$styles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSectionBaseStyles"]
    ];
});
_c = PageTrigger;
function _PageTriggerUseEffectArrayFrom(_, i) {
    return i / 100;
}
var _c;
__turbopack_context__.k.register(_c, "PageTrigger");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/runtime-react/src/page-builder/triggers/core/use-reveal-external-trigger.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useRevealExternalTrigger",
    ()=>useRevealExternalTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$trigger$2d$event$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/triggers/core/trigger-event.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function useRevealExternalTrigger(externalTriggerKey, externalTriggerMode, setRevealed) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(6);
    if ($[0] !== "0c95cf7c56120a4481e091554bc5fee978b06d8211348ec24f8664392ff8011e") {
        for(let $i = 0; $i < 6; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "0c95cf7c56120a4481e091554bc5fee978b06d8211348ec24f8664392ff8011e";
    }
    let t0;
    let t1;
    if ($[1] !== externalTriggerKey || $[2] !== externalTriggerMode || $[3] !== setRevealed) {
        t0 = ({
            "useRevealExternalTrigger[useEffect()]": ()=>{
                if (!externalTriggerKey || !externalTriggerMode) {
                    return;
                }
                const handler = {
                    "useRevealExternalTrigger[useEffect() > handler]": (e)=>{
                        const detail = e.detail;
                        if (!detail?.action || detail.action.type !== "contentOverride") {
                            return;
                        }
                        if (detail.action.payload.key !== externalTriggerKey) {
                            return;
                        }
                        const value = detail.action.payload.value;
                        const boolValue = value === true || value === "true";
                        if (externalTriggerMode === "setTrue") {
                            if (boolValue) {
                                setRevealed(true);
                            }
                        } else {
                            if (externalTriggerMode === "setFalse") {
                                if (!boolValue) {
                                    setRevealed(false);
                                }
                            } else {
                                if (externalTriggerMode === "toggle") {
                                    setRevealed(_useRevealExternalTriggerUseEffectHandlerSetRevealed);
                                }
                            }
                        }
                    }
                }["useRevealExternalTrigger[useEffect() > handler]"];
                window.addEventListener(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$trigger$2d$event$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PAGE_BUILDER_TRIGGER_EVENT"], handler);
                return ()=>window.removeEventListener(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$trigger$2d$event$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PAGE_BUILDER_TRIGGER_EVENT"], handler);
            }
        })["useRevealExternalTrigger[useEffect()]"];
        t1 = [
            externalTriggerKey,
            externalTriggerMode,
            setRevealed
        ];
        $[1] = externalTriggerKey;
        $[2] = externalTriggerMode;
        $[3] = setRevealed;
        $[4] = t0;
        $[5] = t1;
    } else {
        t0 = $[4];
        t1 = $[5];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t0, t1);
}
_s(useRevealExternalTrigger, "OD7bBpZva5O2jO+Puf00hKivP7c=");
function _useRevealExternalTriggerUseEffectHandlerSetRevealed(prev) {
    return !prev;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/runtime-react/src/page-builder/triggers/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$PageTrigger$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/triggers/PageTrigger.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$trigger$2d$event$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/triggers/core/trigger-event.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$use$2d$reveal$2d$external$2d$trigger$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/triggers/core/use-reveal-external-trigger.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$use$2d$keyboard$2d$trigger$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/triggers/core/use-keyboard-trigger.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$use$2d$timer$2d$trigger$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/triggers/core/use-timer-trigger.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$use$2d$cursor$2d$trigger$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/triggers/core/use-cursor-trigger.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$use$2d$scroll$2d$direction$2d$trigger$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/triggers/core/use-scroll-direction-trigger.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$use$2d$idle$2d$trigger$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/triggers/core/use-idle-trigger.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$use$2d$section$2d$custom$2d$triggers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/triggers/core/use-section-custom-triggers.ts [app-client] (ecmascript)");
;
;
;
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
"[project]/packages/contracts/src/page-builder/core/page-builder-condition-evaluator.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Condition evaluator for page-builder conditionalAction.
 * Handles both shorthand (variable/operator/value) and multi-condition arrays.
 * Exported for use by use-page-builder-action-runner and any future evaluators.
 */ __turbopack_context__.s([
    "evaluateConditions",
    ()=>evaluateConditions
]);
function evaluateSingleCondition(variableValue, operator, compareValue) {
    switch(operator){
        case "equals":
            return Object.is(variableValue, compareValue);
        case "notEquals":
            return !Object.is(variableValue, compareValue);
        case "gt":
            return Number(variableValue) > Number(compareValue);
        case "gte":
            return Number(variableValue) >= Number(compareValue);
        case "lt":
            return Number(variableValue) < Number(compareValue);
        case "lte":
            return Number(variableValue) <= Number(compareValue);
        case "contains":
            return String(variableValue).includes(String(compareValue));
        case "startsWith":
            return String(variableValue).startsWith(String(compareValue));
        default:
            return false;
    }
}
function evaluateConditions(config, variables) {
    const logic = config.logic ?? "and";
    // Multi-condition array form
    if (config.conditions && config.conditions.length > 0) {
        const results = config.conditions.map((cond)=>evaluateSingleCondition(variables[cond.variable], cond.operator, cond.value));
        return logic === "or" ? results.some(Boolean) : results.every(Boolean);
    }
    // Shorthand form
    if (config.variable !== undefined && config.operator !== undefined) {
        return evaluateSingleCondition(variables[config.variable], config.operator, config.value);
    }
    // No condition specified — treat as always-true
    return true;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/runtime-react/src/page-builder/hooks/use-page-builder-action-runner.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePageBuilderActionRunner",
    ()=>usePageBuilderActionRunner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/triggers/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$trigger$2d$event$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/triggers/core/trigger-event.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$runtime$2f$page$2d$builder$2d$variable$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/runtime/page-builder-variable-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$page$2d$builder$2f$core$2f$page$2d$builder$2d$condition$2d$evaluator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/contracts/src/page-builder/core/page-builder-condition-evaluator.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function usePageBuilderActionRunner() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(5);
    if ($[0] !== "946c417ac86f44b7466c6c6e408f2e096a5d97c2ba307b84ea08121e2d696baa") {
        for(let $i = 0; $i < 5; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "946c417ac86f44b7466c6c6e408f2e096a5d97c2ba307b84ea08121e2d696baa";
    }
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = new Map();
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    const audioMapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(t0);
    let t1;
    let t2;
    if ($[2] !== router) {
        t1 = ({
            "usePageBuilderActionRunner[useEffect()]": ()=>{
                const handler = {
                    "usePageBuilderActionRunner[useEffect() > handler]": (e)=>{
                        const detail = e.detail;
                        const action = detail?.action;
                        if (!action?.type) {
                            return;
                        }
                        switch(action.type){
                            case "back":
                                {
                                    if ("TURBOPACK compile-time truthy", 1) {
                                        window.history.back();
                                    }
                                    return;
                                }
                            case "navigate":
                                {
                                    const { href, replace } = action.payload;
                                    if (!href) {
                                        return;
                                    }
                                    if (replace) {
                                        router.replace(href);
                                    } else {
                                        router.push(href);
                                    }
                                    return;
                                }
                            case "scrollTo":
                                {
                                    const p_0 = action.payload ?? {};
                                    if (p_0.id) {
                                        const el_0 = document.getElementById(p_0.id);
                                        if (el_0) {
                                            el_0.scrollIntoView({
                                                behavior: p_0.behavior ?? "smooth",
                                                block: p_0.block ?? "start"
                                            });
                                        }
                                    } else {
                                        if (p_0.offset != null) {
                                            window.scrollTo({
                                                top: p_0.offset,
                                                behavior: p_0.behavior ?? "smooth"
                                            });
                                        }
                                    }
                                    return;
                                }
                            case "scrollLock":
                                {
                                    document.body.style.overflow = "hidden";
                                    return;
                                }
                            case "scrollUnlock":
                                {
                                    document.body.style.overflow = "";
                                    return;
                                }
                            case "modalOpen":
                            case "modalClose":
                            case "modalToggle":
                                {
                                    const p = action.payload ?? {};
                                    window.dispatchEvent(new CustomEvent("page-builder-modal", {
                                        detail: {
                                            type: action.type,
                                            id: p.id
                                        }
                                    }));
                                    return;
                                }
                            case "setVariable":
                                {
                                    const { key: key_1, value: value_1 } = action.payload;
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$runtime$2f$page$2d$builder$2d$variable$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setVariable"])(key_1, value_1);
                                    return;
                                }
                            case "fireMultiple":
                                {
                                    const { actions, mode: t3, delayBetween: t4 } = action.payload;
                                    const mode = t3 === undefined ? "parallel" : t3;
                                    const delayBetween = t4 === undefined ? 0 : t4;
                                    if (!Array.isArray(actions)) {
                                        return;
                                    }
                                    if (mode === "sequence") {
                                        actions.reduce({
                                            "usePageBuilderActionRunner[useEffect() > handler > actions.reduce()]": (promise, a_1, i)=>promise.then({
                                                    "usePageBuilderActionRunner[useEffect() > handler > actions.reduce() > promise.then()]": ()=>new Promise((resolve)=>{
                                                            setTimeout({
                                                                "usePageBuilderActionRunner[useEffect() > handler > actions.reduce() > promise.then() > <anonymous> > setTimeout()]": ()=>{
                                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$trigger$2d$event$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["firePageBuilderAction"])(a_1, "system");
                                                                    resolve();
                                                                }
                                                            }["usePageBuilderActionRunner[useEffect() > handler > actions.reduce() > promise.then() > <anonymous> > setTimeout()]"], i === 0 ? 0 : delayBetween);
                                                        })
                                                }["usePageBuilderActionRunner[useEffect() > handler > actions.reduce() > promise.then()]"])
                                        }["usePageBuilderActionRunner[useEffect() > handler > actions.reduce()]"], Promise.resolve());
                                    } else {
                                        actions.forEach(_usePageBuilderActionRunnerUseEffectHandlerActionsForEach);
                                    }
                                    return;
                                }
                            case "conditionalAction":
                                {
                                    const payload = action.payload;
                                    const variables = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$runtime$2f$page$2d$builder$2d$variable$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVariableStore"].getState().variables;
                                    const primaryPasses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$page$2d$builder$2f$core$2f$page$2d$builder$2d$condition$2d$evaluator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["evaluateConditions"])({
                                        variable: payload.variable,
                                        operator: payload.operator,
                                        value: payload.value,
                                        conditions: payload.conditions,
                                        logic: payload.logic
                                    }, variables);
                                    if (primaryPasses) {
                                        if (payload.then) {
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$trigger$2d$event$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["firePageBuilderAction"])(payload.then, "system");
                                        }
                                        return;
                                    }
                                    if (payload.elseIf) {
                                        for (const branch of payload.elseIf){
                                            const branchPasses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$page$2d$builder$2f$core$2f$page$2d$builder$2d$condition$2d$evaluator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["evaluateConditions"])(branch, variables);
                                            if (branchPasses) {
                                                if (branch.then) {
                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$trigger$2d$event$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["firePageBuilderAction"])(branch.then, "system");
                                                }
                                                return;
                                            }
                                        }
                                    }
                                    if (payload.else) {
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$trigger$2d$event$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["firePageBuilderAction"])(payload.else, "system");
                                    }
                                    return;
                                }
                            case "elementShow":
                            case "elementHide":
                            case "elementToggle":
                                {
                                    const { id } = action.payload;
                                    window.dispatchEvent(new CustomEvent("page-builder-element-visibility", {
                                        detail: {
                                            type: action.type,
                                            id
                                        }
                                    }));
                                    return;
                                }
                            case "playSound":
                                {
                                    const { src: src_0, volume: t5, loop: t6 } = action.payload;
                                    const volume_0 = t5 === undefined ? 1 : t5;
                                    const loop = t6 === undefined ? false : t6;
                                    let audio_0 = audioMapRef.current.get(src_0);
                                    if (!audio_0) {
                                        audio_0 = new Audio(src_0);
                                        audioMapRef.current.set(src_0, audio_0);
                                    }
                                    audio_0.volume = Math.max(0, Math.min(1, volume_0));
                                    audio_0.loop = loop;
                                    audio_0.currentTime = 0;
                                    audio_0.play().catch(_usePageBuilderActionRunnerUseEffectHandlerAnonymous);
                                    return;
                                }
                            case "stopSound":
                                {
                                    const { src } = action.payload ?? {};
                                    if (src) {
                                        const audio = audioMapRef.current.get(src);
                                        if (audio) {
                                            audio.pause();
                                            audio.currentTime = 0;
                                        }
                                    } else {
                                        audioMapRef.current.forEach(_usePageBuilderActionRunnerUseEffectHandlerAudioMapRefCurrentForEach);
                                    }
                                    return;
                                }
                            case "setVolume":
                                {
                                    const { volume, id: elementId } = action.payload;
                                    if (elementId) {
                                        const el = document.getElementById(elementId);
                                        if (el && "volume" in el) {
                                            el.volume = Math.max(0, Math.min(1, volume));
                                        }
                                    } else {
                                        audioMapRef.current.forEach({
                                            "usePageBuilderActionRunner[useEffect() > handler > audioMapRef.current.forEach()]": (a)=>{
                                                a.volume = Math.max(0, Math.min(1, volume));
                                            }
                                        }["usePageBuilderActionRunner[useEffect() > handler > audioMapRef.current.forEach()]"]);
                                    }
                                    return;
                                }
                            case "copyToClipboard":
                                {
                                    const { text } = action.payload;
                                    navigator.clipboard?.writeText(text).catch(_usePageBuilderActionRunnerUseEffectHandlerAnonymous2);
                                    return;
                                }
                            case "vibrate":
                                {
                                    const { pattern: t7 } = action.payload ?? {};
                                    const pattern = t7 === undefined ? 50 : t7;
                                    navigator.vibrate?.(pattern);
                                    return;
                                }
                            case "setDocumentTitle":
                                {
                                    const { title } = action.payload;
                                    document.title = title;
                                    return;
                                }
                            case "openExternalUrl":
                                {
                                    const { url, target: t8 } = action.payload;
                                    const target = t8 === undefined ? "_blank" : t8;
                                    window.open(url, target, "noopener,noreferrer");
                                    return;
                                }
                            case "backgroundSwitch":
                            case "contentOverride":
                            case "startTransition":
                            case "stopTransition":
                            case "updateTransitionProgress":
                                {
                                    return;
                                }
                            case "trackEvent":
                                {
                                    const { event, properties } = action.payload;
                                    window.dispatchEvent(new CustomEvent("page-builder-track", {
                                        detail: {
                                            event,
                                            properties
                                        }
                                    }));
                                    const w = window;
                                    if (typeof w.gtag === "function") {
                                        w.gtag("event", event, properties);
                                    }
                                    if (typeof w.plausible === "function") {
                                        w.plausible(event, {
                                            props: properties
                                        });
                                    }
                                    return;
                                }
                            case "setLocalStorage":
                                {
                                    const { key: key_0, value: value_0 } = action.payload;
                                    try {
                                        localStorage.setItem(key_0, JSON.stringify(value_0));
                                    } catch  {}
                                    return;
                                }
                            case "setSessionStorage":
                                {
                                    const { key, value } = action.payload;
                                    try {
                                        sessionStorage.setItem(key, JSON.stringify(value));
                                    } catch  {}
                                    return;
                                }
                            default:
                                {
                                    return;
                                }
                        }
                    }
                }["usePageBuilderActionRunner[useEffect() > handler]"];
                const audioMap = audioMapRef.current;
                window.addEventListener(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$trigger$2d$event$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PAGE_BUILDER_TRIGGER_EVENT"], handler);
                return ()=>{
                    window.removeEventListener(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$trigger$2d$event$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PAGE_BUILDER_TRIGGER_EVENT"], handler);
                    audioMap.forEach(_usePageBuilderActionRunnerUseEffectAnonymousAudioMapForEach);
                };
            }
        })["usePageBuilderActionRunner[useEffect()]"];
        t2 = [
            router
        ];
        $[2] = router;
        $[3] = t1;
        $[4] = t2;
    } else {
        t1 = $[3];
        t2 = $[4];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t1, t2);
}
_s(usePageBuilderActionRunner, "tQu4aFsmJq+u2xzzO8pvDx7WTMQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
function _usePageBuilderActionRunnerUseEffectAnonymousAudioMapForEach(a_3) {
    a_3.pause();
    a_3.currentTime = 0;
}
function _usePageBuilderActionRunnerUseEffectHandlerAnonymous2() {}
function _usePageBuilderActionRunnerUseEffectHandlerAudioMapRefCurrentForEach(a_0) {
    a_0.pause();
    a_0.currentTime = 0;
}
function _usePageBuilderActionRunnerUseEffectHandlerAnonymous() {}
function _usePageBuilderActionRunnerUseEffectHandlerActionsForEach(a_2) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$trigger$2d$event$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["firePageBuilderAction"])(a_2, "system");
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/runtime-react/src/page-builder/runtime/PageBuilderRuntimeEffects.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PageBuilderRuntimeEffects",
    ()=>PageBuilderRuntimeEffects
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$runtime$2f$page$2d$builder$2d$variable$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/runtime/page-builder-variable-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$hooks$2f$use$2d$page$2d$builder$2d$action$2d$runner$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/hooks/use-page-builder-action-runner.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function PageBuilderRuntimeEffects() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "9733a401e0ec3be3a669d7372c63c2c335ff2feb68511f7523786f7a414d4fef") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "9733a401e0ec3be3a669d7372c63c2c335ff2feb68511f7523786f7a414d4fef";
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$hooks$2f$use$2d$page$2d$builder$2d$action$2d$runner$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePageBuilderActionRunner"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    let t0;
    if ($[1] !== pathname) {
        t0 = [
            pathname
        ];
        $[1] = pathname;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(_PageBuilderRuntimeEffectsUseEffect, t0);
    return null;
}
_s(PageBuilderRuntimeEffects, "ZKT72JGm244QbjStxR5tky4Q3Pg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$hooks$2f$use$2d$page$2d$builder$2d$action$2d$runner$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePageBuilderActionRunner"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = PageBuilderRuntimeEffects;
function _PageBuilderRuntimeEffectsUseEffect() {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$runtime$2f$page$2d$builder$2d$variable$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clearVariables"])();
}
var _c;
__turbopack_context__.k.register(_c, "PageBuilderRuntimeEffects");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/runtime-react/src/effects.tsx [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$runtime$2f$PageBuilderRuntimeEffects$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/runtime/PageBuilderRuntimeEffects.tsx [app-client] (ecmascript)");
"use client";
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/runtime-react/src/effects.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PageBuilderRuntimeEffects",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$runtime$2f$PageBuilderRuntimeEffects$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PageBuilderRuntimeEffects"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$effects$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/effects.tsx [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$runtime$2f$PageBuilderRuntimeEffects$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/runtime/PageBuilderRuntimeEffects.tsx [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_d4a362aa._.js.map