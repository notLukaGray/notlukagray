module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/apps/web/src/core/providers/theme-provider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-themes/dist/index.mjs [app-ssr] (ecmascript)");
"use client";
;
;
function ThemeProvider({ children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ThemeProvider"], {
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/apps/web/src/core/providers/theme-provider.tsx",
        lineNumber: 10,
        columnNumber: 10
    }, this);
}
}),
"[project]/apps/web/src/core/ui/app-layout.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppLayout",
    ()=>AppLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
"use client";
;
function AppLayout({ children, afterChildren }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "min-h-dvh w-full min-w-0 flex flex-col",
                children: children
            }, void 0, false, {
                fileName: "[project]/apps/web/src/core/ui/app-layout.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, this),
            afterChildren ?? null
        ]
    }, void 0, true);
}
}),
"[project]/apps/web/src/core/providers/device-type-provider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DeviceTypeProvider",
    ()=>DeviceTypeProvider,
    "ServerBreakpointProvider",
    ()=>ServerBreakpointProvider,
    "useDeviceType",
    ()=>useDeviceType
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const DeviceTypeContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
/** When set (e.g. by PageBuilderRenderer with server-resolved tree), useDeviceType returns this and no resize listener runs. */ const ServerBreakpointContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const MOBILE_BREAKPOINT = 768;
function useDeviceType() {
    const serverBreakpoint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(ServerBreakpointContext);
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(DeviceTypeContext);
    if (serverBreakpoint !== undefined) return serverBreakpoint;
    if (context === undefined) {
        throw new Error("useDeviceType must be used within DeviceTypeProvider or ServerBreakpointProvider");
    }
    return context;
}
function ServerBreakpointProvider({ isMobile, children }) {
    const value = {
        isMobile,
        isDesktop: !isMobile
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ServerBreakpointContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/apps/web/src/core/providers/device-type-provider.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, this);
}
function DeviceTypeProvider({ children }) {
    const [isDesktop, setIsDesktop] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const checkDeviceType = ()=>{
            const isMobileUserAgent = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            const isMobileWidth = window.innerWidth < MOBILE_BREAKPOINT;
            const isMobile = isMobileUserAgent || isMobileWidth;
            setIsDesktop(!isMobile);
        };
        checkDeviceType();
        window.addEventListener("resize", checkDeviceType);
        return ()=>{
            window.removeEventListener("resize", checkDeviceType);
        };
    }, []);
    const value = {
        isDesktop,
        isMobile: !isDesktop
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DeviceTypeContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/apps/web/src/core/providers/device-type-provider.tsx",
        lineNumber: 70,
        columnNumber: 10
    }, this);
}
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/apps/web/src/core/dev/DevPageValidationClient.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DevPageValidationClient",
    ()=>DevPageValidationClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
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
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
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
                for (const error of page.errors){
                    console.error(error);
                }
            } catch (error) {
                if (error.name === "AbortError") return;
                console.error("[page-builder validation] Failed to fetch validation results", error);
            }
        }
        void run();
        return ()=>{
            controller.abort();
        };
    }, [
        pathname
    ]);
    return null;
}
}),
"[project]/apps/web/src/core/dev/DevContentReloadClient.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DevContentReloadClient",
    ()=>DevContentReloadClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
const POLL_INTERVAL_MS = 1200;
function DevContentReloadClient() {
    const lastSeen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    const hasBaseline = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
        const controller = undefined;
        const poll = undefined;
        const id = undefined;
    }, []);
    return null;
}
}),
"[project]/packages/runtime-react/src/page-builder/runtime/page-builder-variable-store.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
/**
 * Runtime variable store for page-builder setVariable / conditionalAction.
 * Zustand singleton with subscribeWithSelector middleware.
 * Cleared on route change — no persistence middleware by design.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/middleware.mjs [app-ssr] (ecmascript)");
;
;
const useActionLogStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])()((set)=>({
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
const useVariableStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeWithSelector"])((set)=>({
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
    return useVariableStore((state)=>state.variables[key]);
}
const setVariable = (key, value)=>useVariableStore.getState().setVariable(key, value);
const getVariable = (key)=>useVariableStore.getState().variables[key];
const hasVariable = (key)=>key in useVariableStore.getState().variables;
const clearVariables = ()=>useVariableStore.getState().clearVariables();
}),
"[project]/packages/runtime-react/src/core/lib/responsive-value.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/packages/core/src/internal/section-constants.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/packages/core/src/internal/section-effects.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sectionEffectsToStyle",
    ()=>sectionEffectsToStyle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$section$2d$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/core/src/internal/section-constants.ts [app-ssr] (ecmascript)");
;
function handleBackdropBlur(effect) {
    const amount = effect.amount ?? __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$section$2d$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_BACKDROP_BLUR_AMOUNT"];
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
}),
"[project]/packages/core/src/internal/section-utils/section-layout-and-scroll.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getDefaultScrollSpeed",
    ()=>getDefaultScrollSpeed,
    "getSectionAlignStyle",
    ()=>getSectionAlignStyle,
    "handleSectionWheel",
    ()=>handleSectionWheel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$section$2d$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/core/src/internal/section-constants.ts [app-ssr] (ecmascript)");
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
    return __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$section$2d$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_SCROLL_SPEED"];
}
;
function handleSectionWheel(e, scrollSpeed = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$section$2d$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_SCROLL_SPEED"]) {
    const el = e.currentTarget;
    if (el.scrollHeight <= el.clientHeight) return;
    if (scrollSpeed === __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$section$2d$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_SCROLL_SPEED"]) {
        e.stopPropagation();
        return;
    }
    e.preventDefault();
    e.stopPropagation();
    const delta = e.deltaY * scrollSpeed;
    el.scrollTop += delta;
}
}),
"[project]/packages/core/src/internal/section-utils/section-effects-and-transforms.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$section$2d$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/core/src/internal/section-constants.ts [app-ssr] (ecmascript)");
;
const DEFAULT_BLEND = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$section$2d$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_BLEND_MODE"];
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
}),
"[project]/packages/core/src/internal/section-utils/css-value-parsing.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
    if ("TURBOPACK compile-time truthy", 1) return null;
    //TURBOPACK unreachable
    ;
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
}),
"[project]/packages/core/src/internal/section-utils.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$section$2d$utils$2f$section$2d$layout$2d$and$2d$scroll$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/core/src/internal/section-utils/section-layout-and-scroll.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$section$2d$utils$2f$section$2d$effects$2d$and$2d$transforms$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/core/src/internal/section-utils/section-effects-and-transforms.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$section$2d$utils$2f$css$2d$value$2d$parsing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/core/src/internal/section-utils/css-value-parsing.ts [app-ssr] (ecmascript)");
;
;
;
}),
"[project]/packages/runtime-react/src/core/providers/device-type-provider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DeviceTypeProvider",
    ()=>DeviceTypeProvider,
    "ServerBreakpointProvider",
    ()=>ServerBreakpointProvider,
    "useDeviceType",
    ()=>useDeviceType
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const DeviceTypeContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
/** When set (e.g. by PageBuilderRenderer with server-resolved tree), useDeviceType returns this and no resize listener runs. */ const ServerBreakpointContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const MOBILE_BREAKPOINT = 768;
function useDeviceType() {
    const serverBreakpoint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(ServerBreakpointContext);
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(DeviceTypeContext);
    if (serverBreakpoint !== undefined) return serverBreakpoint;
    if (context === undefined) {
        throw new Error("useDeviceType must be used within DeviceTypeProvider or ServerBreakpointProvider");
    }
    return context;
}
function ServerBreakpointProvider({ isMobile, children }) {
    const value = {
        isMobile,
        isDesktop: !isMobile
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ServerBreakpointContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/packages/runtime-react/src/core/providers/device-type-provider.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, this);
}
function DeviceTypeProvider({ children }) {
    const [isDesktop, setIsDesktop] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const checkDeviceType = ()=>{
            const isMobileUserAgent = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            const isMobileWidth = window.innerWidth < MOBILE_BREAKPOINT;
            const isMobile = isMobileUserAgent || isMobileWidth;
            setIsDesktop(!isMobile);
        };
        checkDeviceType();
        window.addEventListener("resize", checkDeviceType);
        return ()=>{
            window.removeEventListener("resize", checkDeviceType);
        };
    }, []);
    const value = {
        isDesktop,
        isMobile: !isDesktop
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DeviceTypeContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/packages/runtime-react/src/core/providers/device-type-provider.tsx",
        lineNumber: 70,
        columnNumber: 10
    }, this);
}
}),
"[project]/packages/runtime-react/src/page-builder/section/position/use-scroll-container.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ScrollContainerProvider",
    ()=>ScrollContainerProvider,
    "useScrollContainer",
    ()=>useScrollContainer,
    "useScrollContainerRef",
    ()=>useScrollContainerRef
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const ScrollContainerContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
function ScrollContainerProvider({ children, containerRef }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ScrollContainerContext.Provider, {
        value: {
            containerRef
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/packages/runtime-react/src/page-builder/section/position/use-scroll-container.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
function useScrollContainer() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(ScrollContainerContext);
    return context?.containerRef.current ?? null;
}
function useScrollContainerRef() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(ScrollContainerContext);
    return context?.containerRef ?? null;
}
}),
"[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/triggers.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
"use client";
;
}),
"[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/motion-values.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
"use client";
;
}),
"[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/accessibility.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
"use client";
;
}),
"[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/reduced-motion.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useShouldReduceMotion",
    ()=>useShouldReduceMotion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$accessibility$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/accessibility.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/reduced-motion/use-reduced-motion.mjs [app-ssr] (ecmascript)");
"use client";
;
function useShouldReduceMotion(ignorePreference) {
    const prefersReduced = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    if (ignorePreference) return false;
    return Boolean(prefersReduced);
}
}),
"[project]/packages/runtime-react/src/page-builder/section/position/use-section-parallax.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSectionParallax",
    ()=>useSectionParallax
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$section$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/core/src/internal/section-utils.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$section$2d$utils$2f$section$2d$layout$2d$and$2d$scroll$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/core/src/internal/section-utils/section-layout-and-scroll.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$section$2d$utils$2f$css$2d$value$2d$parsing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/core/src/internal/section-utils/css-value-parsing.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$section$2d$utils$2f$section$2d$effects$2d$and$2d$transforms$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/core/src/internal/section-utils/section-effects-and-transforms.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$section$2f$position$2f$use$2d$scroll$2d$container$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/section/position/use-scroll-container.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$triggers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/triggers.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-scroll.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$motion$2d$values$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/motion-values.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-motion-value.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$motion$2d$value$2d$event$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/use-motion-value-event.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-transform.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$reduced$2d$motion$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/reduced-motion.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
function useSectionParallax(scrollSpeed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$section$2d$utils$2f$section$2d$layout$2d$and$2d$scroll$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getDefaultScrollSpeed"])(), initialY, sectionRef, options) {
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$section$2f$position$2f$use$2d$scroll$2d$container$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useScrollContainerRef"])();
    const defaultSpeed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$section$2d$utils$2f$section$2d$layout$2d$and$2d$scroll$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getDefaultScrollSpeed"])();
    const basePosition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$section$2d$utils$2f$css$2d$value$2d$parsing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseCssValueToPixels"])(initialY, true);
    const respectReducedMotion = options?.respectReducedMotion !== false;
    const shouldReduceMotion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$reduced$2d$motion$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useShouldReduceMotion"])(!respectReducedMotion);
    const { scrollY } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useScroll"])({
        container: containerRef ?? undefined
    });
    const sectionTopMotion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMotionValue"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLayoutEffect"])(()=>{
        const container = containerRef?.current ?? null;
        const section = sectionRef?.current ?? null;
        if (!container || !section || scrollSpeed === defaultSpeed || shouldReduceMotion) return;
        const updateSectionTop = ()=>{
            const containerRect = container.getBoundingClientRect();
            const sectionRect = section.getBoundingClientRect();
            const sectionTop = sectionRect.top - containerRect.top + container.scrollTop;
            sectionTopMotion.set(sectionTop);
        };
        updateSectionTop();
        const ro = new ResizeObserver(updateSectionTop);
        ro.observe(container);
        return ()=>ro.disconnect();
    }, [
        containerRef,
        sectionRef,
        scrollSpeed,
        defaultSpeed,
        sectionTopMotion,
        shouldReduceMotion
    ]);
    const parallaxY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])([
        scrollY,
        sectionTopMotion
    ], ([scrollTop, sectionTop])=>{
        if (scrollSpeed === defaultSpeed || shouldReduceMotion) return 0;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$section$2d$utils$2f$section$2d$effects$2d$and$2d$transforms$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["computeParallaxOffset"])(typeof scrollTop === "number" ? scrollTop : 0, {
            scrollSpeed,
            defaultScrollSpeed: defaultSpeed,
            basePosition,
            sectionTop: typeof sectionTop === "number" ? sectionTop : 0
        });
    });
    const [transformY, setTransformY] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>parallaxY.get());
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$motion$2d$value$2d$event$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMotionValueEvent"])(parallaxY, "change", (v)=>setTransformY(v));
    if (!containerRef || scrollSpeed === defaultSpeed || shouldReduceMotion) {
        return 0;
    }
    return transformY;
}
}),
"[project]/packages/runtime-react/src/page-builder/section/position/use-section-positioning.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSectionPositioning",
    ()=>useSectionPositioning
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$section$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/core/src/internal/section-utils.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$section$2d$utils$2f$section$2d$layout$2d$and$2d$scroll$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/core/src/internal/section-utils/section-layout-and-scroll.ts [app-ssr] (ecmascript) <locals>");
"use client";
;
;
function useSectionPositioning({ align, width, initialX, initialY }) {
    const alignStyle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$section$2d$utils$2f$section$2d$layout$2d$and$2d$scroll$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getSectionAlignStyle"])(align, width), [
        align,
        width
    ]);
    const hasInitialPosition = initialX !== undefined || initialY !== undefined;
    const positioningStyle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!hasInitialPosition) return {};
        const style = {
            position: "absolute"
        };
        if (initialX !== undefined) {
            style.left = initialX;
        } else {
            if (align === "center") {
                style.left = "50%";
                style.transform = "translateX(-50%)";
            } else if (align === "right") {
                style.right = "0";
            } else {
                style.left = "0";
            }
        }
        if (initialY !== undefined) {
            style.top = initialY;
        } else {
            style.top = "0";
        }
        return style;
    }, [
        hasInitialPosition,
        initialX,
        initialY,
        align
    ]);
    return {
        alignStyle,
        positioningStyle,
        hasInitialPosition,
        shouldApplyAlignStyle: !hasInitialPosition || initialX === undefined
    };
}
}),
"[project]/packages/runtime-react/src/page-builder/section/position/use-section-base-styles.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSectionBaseStyles",
    ()=>useSectionBaseStyles
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$core$2f$lib$2f$responsive$2d$value$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/core/lib/responsive-value.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$section$2d$effects$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/core/src/internal/section-effects.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$section$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/core/src/internal/section-utils.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$section$2d$utils$2f$section$2d$layout$2d$and$2d$scroll$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/core/src/internal/section-utils/section-layout-and-scroll.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$section$2d$utils$2f$section$2d$effects$2d$and$2d$transforms$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/core/src/internal/section-utils/section-effects-and-transforms.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$core$2f$providers$2f$device$2d$type$2d$provider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/core/providers/device-type-provider.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$section$2f$position$2f$use$2d$section$2d$parallax$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/section/position/use-section-parallax.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$section$2f$position$2f$use$2d$section$2d$positioning$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/section/position/use-section-positioning.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
function useSectionBaseStyles({ width, height, minWidth, maxWidth, minHeight, maxHeight, align, marginLeft, marginRight, marginTop, marginBottom, borderRadius, border, boxShadow, filter, backdropFilter, scrollSpeed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$section$2d$utils$2f$section$2d$layout$2d$and$2d$scroll$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getDefaultScrollSpeed"])(), initialX, initialY, zIndex, effects, sectionRef, usePadding = false, reduceMotion }) {
    const { isMobile } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$core$2f$providers$2f$device$2d$type$2d$provider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDeviceType"])();
    const resolvedLayout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            width: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$core$2f$lib$2f$responsive$2d$value$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveResponsiveValue"])(width, isMobile),
            height: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$core$2f$lib$2f$responsive$2d$value$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveResponsiveValue"])(height, isMobile),
            minWidth: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$core$2f$lib$2f$responsive$2d$value$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveResponsiveValue"])(minWidth, isMobile),
            maxWidth: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$core$2f$lib$2f$responsive$2d$value$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveResponsiveValue"])(maxWidth, isMobile),
            minHeight: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$core$2f$lib$2f$responsive$2d$value$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveResponsiveValue"])(minHeight, isMobile),
            maxHeight: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$core$2f$lib$2f$responsive$2d$value$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveResponsiveValue"])(maxHeight, isMobile),
            align: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$core$2f$lib$2f$responsive$2d$value$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveResponsiveValue"])(align, isMobile),
            marginLeft: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$core$2f$lib$2f$responsive$2d$value$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveResponsiveValue"])(marginLeft, isMobile),
            marginRight: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$core$2f$lib$2f$responsive$2d$value$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveResponsiveValue"])(marginRight, isMobile),
            marginTop: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$core$2f$lib$2f$responsive$2d$value$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveResponsiveValue"])(marginTop, isMobile),
            marginBottom: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$core$2f$lib$2f$responsive$2d$value$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveResponsiveValue"])(marginBottom, isMobile),
            initialX: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$core$2f$lib$2f$responsive$2d$value$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveResponsiveValue"])(initialX, isMobile),
            initialY: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$core$2f$lib$2f$responsive$2d$value$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveResponsiveValue"])(initialY, isMobile)
        }), [
        width,
        height,
        minWidth,
        maxWidth,
        minHeight,
        maxHeight,
        align,
        marginLeft,
        marginRight,
        marginTop,
        marginBottom,
        initialX,
        initialY,
        isMobile
    ]);
    const transformY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$section$2f$position$2f$use$2d$section$2d$parallax$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSectionParallax"])(scrollSpeed, resolvedLayout.initialY, sectionRef, {
        respectReducedMotion: reduceMotion !== false
    });
    const { alignStyle, positioningStyle, shouldApplyAlignStyle, hasInitialPosition } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$section$2f$position$2f$use$2d$section$2d$positioning$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSectionPositioning"])({
        align: resolvedLayout.align,
        width: resolvedLayout.width,
        initialX: resolvedLayout.initialX,
        initialY: resolvedLayout.initialY
    });
    const resolvedBorderRadius = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$core$2f$lib$2f$responsive$2d$value$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveResponsiveValue"])(borderRadius, isMobile);
    const baseStyle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const effectStyle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$section$2d$effects$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sectionEffectsToStyle"])(effects);
        const mergedBoxShadow = [
            effectStyle.boxShadow,
            boxShadow
        ].filter((value)=>typeof value === "string" && value.length > 0).join(", ");
        const mergedFilter = [
            effectStyle.filter,
            filter
        ].filter((value)=>typeof value === "string" && value.length > 0).join(" ");
        const mergedBackdropFilter = [
            effectStyle.backdropFilter,
            backdropFilter
        ].filter((value)=>typeof value === "string" && value.length > 0).join(" ");
        const w = resolvedLayout.width;
        const h = resolvedLayout.height;
        const style = {
            width: w === "hug" ? "fit-content" : w,
            height: h === "hug" ? "fit-content" : h,
            ...resolvedLayout.minWidth != null ? {
                minWidth: resolvedLayout.minWidth
            } : {},
            ...resolvedLayout.maxWidth != null ? {
                maxWidth: resolvedLayout.maxWidth
            } : {},
            ...resolvedLayout.minHeight != null ? {
                minHeight: resolvedLayout.minHeight
            } : {},
            ...resolvedLayout.maxHeight != null ? {
                maxHeight: resolvedLayout.maxHeight
            } : {},
            borderRadius: resolvedBorderRadius,
            border: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$section$2d$utils$2f$section$2d$effects$2d$and$2d$transforms$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["borderToCss"])(border),
            overflowX: "hidden",
            overflowY: "hidden",
            scrollBehavior: "smooth",
            ...zIndex != null ? {
                zIndex
            } : {},
            ...shouldApplyAlignStyle ? alignStyle : {},
            ...positioningStyle,
            ...effectStyle,
            ...mergedBoxShadow ? {
                boxShadow: mergedBoxShadow
            } : {},
            ...mergedFilter ? {
                filter: mergedFilter
            } : {},
            ...mergedBackdropFilter ? {
                backdropFilter: mergedBackdropFilter,
                WebkitBackdropFilter: mergedBackdropFilter
            } : {}
        };
        if (usePadding) {
            style.paddingLeft = resolvedLayout.marginLeft;
            style.paddingRight = resolvedLayout.marginRight;
            style.paddingTop = resolvedLayout.marginTop;
            style.paddingBottom = resolvedLayout.marginBottom;
        // When using padding, don't set margins (padding handles spacing internally)
        } else {
            style.marginLeft = resolvedLayout.marginLeft;
            style.marginRight = resolvedLayout.marginRight;
            style.marginTop = resolvedLayout.marginTop;
            style.marginBottom = resolvedLayout.marginBottom;
            // Explicit marginLeft/marginRight from section JSON override align-derived values (e.g. center → margin auto)
            if (resolvedLayout.marginLeft != null) style.marginLeft = resolvedLayout.marginLeft;
            if (resolvedLayout.marginRight != null) style.marginRight = resolvedLayout.marginRight;
        }
        const existingTransform = positioningStyle.transform;
        const transform = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$core$2f$src$2f$internal$2f$section$2d$utils$2f$section$2d$effects$2d$and$2d$transforms$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildTransformString"])(existingTransform, transformY);
        if (transform) {
            style.transform = transform;
        }
        return style;
    }, [
        resolvedLayout,
        resolvedBorderRadius,
        border,
        zIndex,
        transformY,
        alignStyle,
        positioningStyle,
        shouldApplyAlignStyle,
        effects,
        boxShadow,
        filter,
        backdropFilter,
        usePadding
    ]);
    return {
        baseStyle,
        transformY,
        alignStyle,
        positioningStyle,
        shouldApplyAlignStyle,
        resolvedLayout,
        hasInitialPosition
    };
}
}),
"[project]/packages/runtime-react/src/page-builder/triggers/core/trigger-event.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$runtime$2f$page$2d$builder$2d$variable$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/runtime/page-builder-variable-store.ts [app-ssr] (ecmascript)");
"use client";
;
const PAGE_BUILDER_TRIGGER_EVENT = "page-builder-trigger";
function firePageBuilderTrigger(visible, action, triggerId) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
}
function firePageBuilderProgressTrigger(progress, action, triggerId) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
}
function firePageBuilderAction(action, source = "system") {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
}
}),
"[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/section-scroll-progress.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSectionScrollProgressFM",
    ()=>useSectionScrollProgressFM
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$triggers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/triggers.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-scroll.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$motion$2d$values$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/motion-values.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$motion$2d$value$2d$event$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/use-motion-value-event.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$section$2f$position$2f$use$2d$scroll$2d$container$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/section/position/use-scroll-container.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
function useSectionScrollProgressFM({ sectionRef, onProgress, startOffset = 0, endOffset = 0 }) {
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$section$2f$position$2f$use$2d$scroll$2d$container$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useScrollContainerRef"])();
    const { scrollYProgress } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useScroll"])({
        target: sectionRef,
        container: containerRef ?? undefined,
        offset: [
            "start end",
            "end start"
        ]
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$motion$2d$value$2d$event$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMotionValueEvent"])(scrollYProgress, "change", (latest)=>{
        if (!onProgress) return;
        const clamped = Math.max(0, Math.min(1, latest));
        if (startOffset === 0 && endOffset === 0) {
            onProgress(clamped);
            return;
        }
        const start = startOffset;
        const end = 1 - endOffset;
        const mapped = end <= start ? clamped : (clamped - start) / (end - start);
        onProgress(Math.max(0, Math.min(1, mapped)));
    });
}
}),
"[project]/packages/runtime-react/src/page-builder/section/position/use-section-scroll-progress.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSectionScrollProgress",
    ()=>useSectionScrollProgress
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$section$2d$scroll$2d$progress$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/section-scroll-progress.ts [app-ssr] (ecmascript)");
"use client";
;
function useSectionScrollProgress({ sectionRef, onProgress, startOffset = 0, endOffset = 0 }) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$section$2d$scroll$2d$progress$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSectionScrollProgressFM"])({
        sectionRef,
        onProgress,
        startOffset,
        endOffset
    });
}
}),
"[project]/packages/runtime-react/src/page-builder/triggers/core/use-keyboard-trigger.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useKeyboardTrigger",
    ()=>useKeyboardTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/triggers/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$trigger$2d$event$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/triggers/core/trigger-event.ts [app-ssr] (ecmascript)");
"use client";
;
;
function useKeyboardTrigger(triggers) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!triggers || triggers.length === 0) return;
        const matchModifiers = (def, e)=>{
            if (def.shift !== undefined && e.shiftKey !== def.shift) return false;
            if (def.ctrl !== undefined && e.ctrlKey !== def.ctrl) return false;
            if (def.alt !== undefined && e.altKey !== def.alt) return false;
            if (def.meta !== undefined && e.metaKey !== def.meta) return false;
            return true;
        };
        const onKeyDown = (e)=>{
            // Don't fire when typing in inputs
            const target = e.target;
            if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) return;
            for (const def of triggers){
                if (e.key === def.key && matchModifiers(def, e)) {
                    if (def.preventDefault) e.preventDefault();
                    if (def.onKeyDown) (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$trigger$2d$event$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["firePageBuilderAction"])(def.onKeyDown, "trigger");
                }
            }
        };
        const onKeyUp = (e)=>{
            const target = e.target;
            if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) return;
            for (const def of triggers){
                if (e.key === def.key && matchModifiers(def, e)) {
                    if (def.onKeyUp) (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$trigger$2d$event$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["firePageBuilderAction"])(def.onKeyUp, "trigger");
                }
            }
        };
        window.addEventListener("keydown", onKeyDown);
        window.addEventListener("keyup", onKeyUp);
        return ()=>{
            window.removeEventListener("keydown", onKeyDown);
            window.removeEventListener("keyup", onKeyUp);
        };
    }, [
        triggers
    ]);
}
}),
"[project]/packages/runtime-react/src/page-builder/triggers/core/use-timer-trigger.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useTimerTrigger",
    ()=>useTimerTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/triggers/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$trigger$2d$event$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/triggers/core/trigger-event.ts [app-ssr] (ecmascript)");
"use client";
;
;
function useTimerTrigger(triggers) {
    const countRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(new Map());
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!triggers || triggers.length === 0) return;
        const timeoutIds = [];
        const intervalIds = [];
        countRef.current.clear();
        triggers.forEach((def, i)=>{
            if (def.delay != null && def.interval == null) {
                // One-shot delay
                const id = setTimeout(()=>{
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$trigger$2d$event$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["firePageBuilderAction"])(def.action, "trigger");
                }, def.delay);
                timeoutIds.push(id);
            } else if (def.interval != null) {
                // Repeating interval (optionally after an initial delay)
                const start = ()=>{
                    const id = setInterval(()=>{
                        const count = (countRef.current.get(i) ?? 0) + 1;
                        countRef.current.set(i, count);
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$trigger$2d$event$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["firePageBuilderAction"])(def.action, "trigger");
                        if (def.maxFires != null && count >= def.maxFires) {
                            clearInterval(id);
                        }
                    }, def.interval);
                    intervalIds.push(id);
                };
                if (def.delay != null) {
                    const delayId = setTimeout(start, def.delay);
                    timeoutIds.push(delayId);
                } else {
                    start();
                }
            }
        });
        return ()=>{
            timeoutIds.forEach(clearTimeout);
            intervalIds.forEach(clearInterval);
        };
    }, [
        triggers
    ]);
}
}),
"[project]/packages/runtime-react/src/page-builder/triggers/core/use-cursor-trigger.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCursorTrigger",
    ()=>useCursorTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/triggers/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$trigger$2d$event$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/triggers/core/trigger-event.ts [app-ssr] (ecmascript)");
"use client";
;
;
function useCursorTrigger(triggers) {
    const lastFireRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(new Map());
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!triggers || triggers.length === 0) return;
        const onMouseMove = (e)=>{
            const now = performance.now();
            const xProgress = e.clientX / window.innerWidth;
            const yProgress = e.clientY / window.innerHeight;
            triggers.forEach((def, i)=>{
                const throttle = def.throttleMs ?? 16;
                const last = lastFireRef.current.get(i) ?? 0;
                if (now - last < throttle) return;
                lastFireRef.current.set(i, now);
                const progress = def.axis === "x" ? xProgress : yProgress;
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$trigger$2d$event$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["firePageBuilderProgressTrigger"])(progress, def.action);
            });
        };
        window.addEventListener("mousemove", onMouseMove, {
            passive: true
        });
        return ()=>window.removeEventListener("mousemove", onMouseMove);
    }, [
        triggers
    ]);
}
}),
"[project]/packages/runtime-react/src/page-builder/triggers/core/use-scroll-direction-trigger.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useScrollDirectionTrigger",
    ()=>useScrollDirectionTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/triggers/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$trigger$2d$event$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/triggers/core/trigger-event.ts [app-ssr] (ecmascript)");
"use client";
;
;
function useScrollDirectionTrigger(triggers) {
    const lastScrollY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : 0);
    const lastDirection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!triggers || triggers.length === 0) return;
        const onScroll = ()=>{
            const current = window.scrollY;
            const delta = current - lastScrollY.current;
            const threshold = Math.max(...triggers.map((t)=>t.threshold ?? 5));
            if (Math.abs(delta) < threshold) return;
            const direction = delta > 0 ? "down" : "up";
            if (direction === lastDirection.current) {
                lastScrollY.current = current;
                return;
            }
            lastDirection.current = direction;
            lastScrollY.current = current;
            triggers.forEach((def)=>{
                if (direction === "down" && def.onScrollDown) (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$trigger$2d$event$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["firePageBuilderAction"])(def.onScrollDown, "trigger");
                if (direction === "up" && def.onScrollUp) (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$trigger$2d$event$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["firePageBuilderAction"])(def.onScrollUp, "trigger");
            });
        };
        window.addEventListener("scroll", onScroll, {
            passive: true
        });
        return ()=>window.removeEventListener("scroll", onScroll);
    }, [
        triggers
    ]);
}
}),
"[project]/packages/runtime-react/src/page-builder/triggers/core/use-idle-trigger.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useIdleTrigger",
    ()=>useIdleTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/triggers/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$trigger$2d$event$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/triggers/core/trigger-event.ts [app-ssr] (ecmascript)");
"use client";
;
;
function useIdleTrigger(triggers) {
    const isIdleRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const timeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!triggers || triggers.length === 0) return;
        const resetTimer = ()=>{
            if (isIdleRef.current) {
                isIdleRef.current = false;
                triggers.forEach((def)=>{
                    if (def.onActive) (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$trigger$2d$event$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["firePageBuilderAction"])(def.onActive, "trigger");
                });
            }
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            const minIdleMs = Math.min(...triggers.map((t)=>t.idleAfterMs ?? 5000));
            timeoutRef.current = setTimeout(()=>{
                isIdleRef.current = true;
                triggers.forEach((def)=>{
                    if (def.onIdle) (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$trigger$2d$event$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["firePageBuilderAction"])(def.onIdle, "trigger");
                });
            }, minIdleMs);
        };
        const events = [
            "mousemove",
            "keydown",
            "pointerdown",
            "scroll",
            "touchstart"
        ];
        events.forEach((e)=>window.addEventListener(e, resetTimer, {
                passive: true
            }));
        resetTimer();
        return ()=>{
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            events.forEach((e)=>window.removeEventListener(e, resetTimer));
        };
    }, [
        triggers
    ]);
}
}),
"[project]/packages/runtime-react/src/page-builder/triggers/core/use-section-custom-triggers.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSectionCustomTriggers",
    ()=>useSectionCustomTriggers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/triggers/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$use$2d$keyboard$2d$trigger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/triggers/core/use-keyboard-trigger.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$use$2d$timer$2d$trigger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/triggers/core/use-timer-trigger.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$use$2d$cursor$2d$trigger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/triggers/core/use-cursor-trigger.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$use$2d$scroll$2d$direction$2d$trigger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/triggers/core/use-scroll-direction-trigger.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$use$2d$idle$2d$trigger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/triggers/core/use-idle-trigger.ts [app-ssr] (ecmascript)");
"use client";
;
function useSectionCustomTriggers({ keyboardTriggers, timerTriggers, cursorTriggers, scrollDirectionTriggers, idleTriggers }) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$use$2d$keyboard$2d$trigger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useKeyboardTrigger"])(keyboardTriggers ?? []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$use$2d$timer$2d$trigger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTimerTrigger"])(timerTriggers ?? []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$use$2d$cursor$2d$trigger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCursorTrigger"])(cursorTriggers ?? []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$use$2d$scroll$2d$direction$2d$trigger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useScrollDirectionTrigger"])(scrollDirectionTriggers ?? []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$use$2d$idle$2d$trigger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIdleTrigger"])(idleTriggers ?? []);
}
}),
"[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/viewport.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
"use client";
;
}),
"[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/animations.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
"use client";
;
}),
"[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/presence.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
"use client";
;
}),
"[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/layout.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
"use client";
;
}),
"[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/layout-motion-div.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LayoutMotionDiv",
    ()=>LayoutMotionDiv
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
"use client";
;
;
function LayoutMotionDiv({ children, className, style }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
        layout: true,
        className: className,
        style: {
            overflow: "visible",
            ...style
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/layout-motion-div.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
}),
"[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/gestures.tsx [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReorderGroup",
    ()=>ReorderGroup,
    "ReorderItem",
    ()=>ReorderItem
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$Reorder$2f$namespace$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Reorder$3e$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/Reorder/namespace.mjs [app-ssr] (ecmascript) <export * as Reorder>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$gestures$2f$drag$2f$use$2d$drag$2d$controls$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/gestures/drag/use-drag-controls.mjs [app-ssr] (ecmascript)");
"use client";
;
;
;
function ReorderGroup({ axis = "y", values, onReorder, style, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$Reorder$2f$namespace$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Reorder$3e$__["Reorder"].Group, {
        as: "div",
        axis: axis,
        values: values,
        onReorder: onReorder,
        style: style,
        children: children
    }, void 0, false, {
        fileName: "[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/gestures.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
function ReorderItem({ value, drag = true, dragBehavior = "elasticSnap", style, children }) {
    const elastic = dragBehavior === "elasticSnap" ? 0.2 : undefined;
    const momentum = dragBehavior === "elasticSnap" ? false : undefined;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$Reorder$2f$namespace$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__Reorder$3e$__["Reorder"].Item, {
        as: "div",
        value: value,
        drag: drag,
        dragElastic: elastic,
        dragMomentum: momentum,
        style: style,
        children: children
    }, void 0, false, {
        fileName: "[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/gestures.tsx",
        lineNumber: 48,
        columnNumber: 5
    }, this);
}
}),
"[project]/packages/contracts/src/content/framer-motion/motion-defaults.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"motionComponent":{"animate":{"opacity":1,"x":0,"y":0,"z":0,"rotate":0,"rotateX":0,"rotateY":0,"rotateZ":0,"scale":1,"scaleX":1,"scaleY":1,"skew":0,"skewX":0,"skewY":0,"originX":"50%","originY":"50%","originZ":0,"perspective":null,"translateX":0,"translateY":0,"translateZ":0,"width":null,"height":null,"top":null,"left":null,"bottom":null,"right":null,"borderRadius":null,"borderTopLeftRadius":null,"borderTopRightRadius":null,"borderBottomLeftRadius":null,"borderBottomRightRadius":null,"backgroundColor":null,"color":null,"boxShadow":null,"textShadow":null,"filter":null,"backdropFilter":null,"clipPath":null,"pathLength":null,"pathOffset":null,"pathSpacing":null,"strokeDasharray":null,"strokeDashoffset":null,"fill":null,"stroke":null,"strokeWidth":null,"strokeOpacity":null,"fillOpacity":null},"initial":{"opacity":0,"x":0,"y":0,"scale":1,"rotate":0},"exit":{"opacity":0,"x":0,"y":0,"scale":1,"rotate":0,"transition":null},"transition":{"type":"tween","tween":{"type":"tween","duration":0.3,"ease":"easeOut","easeCubicBezier":[0.25,0.46,0.45,0.94],"delay":0,"repeat":0,"repeatType":"loop","repeatDelay":0,"from":null,"times":null},"spring":{"type":"spring","stiffness":100,"damping":10,"mass":1,"velocity":0,"restSpeed":0.01,"restDelta":0.01,"bounce":0.25,"duration":null,"delay":0,"repeat":0,"repeatType":"loop","repeatDelay":0},"inertia":{"type":"inertia","velocity":0,"power":0.8,"timeConstant":750,"bounceStiffness":500,"bounceDamping":10,"min":null,"max":null,"restSpeed":10,"restDelta":0.01},"keyframes":{"type":"keyframes","duration":0.8,"ease":"easeInOut","times":null,"delay":0,"repeat":0,"repeatType":"loop","repeatDelay":0},"layout":{"duration":0.3,"delay":0,"ease":"easeOut","type":"tween"},"enterDuration":0.2,"exitDuration":0.15,"staggerDelay":0.05,"staggerChildren":0.05,"delayChildren":0,"staggerDirection":1,"when":false,"perProperty":{"opacity":{"duration":0.2,"ease":"easeInOut"},"x":{"type":"spring","stiffness":300,"damping":30},"backgroundColor":{"type":"tween","duration":0.3}}},"variants":{"hidden":{"opacity":0,"y":20,"scale":0.95,"transition":{"type":"tween","duration":0.2}},"visible":{"opacity":1,"y":0,"scale":1,"transition":{"type":"spring","stiffness":300,"damping":30,"staggerChildren":0,"delayChildren":0,"staggerDirection":1,"when":false}},"exit":{"opacity":0,"y":-20,"scale":0.95}},"custom":null,"inherit":true,"onAnimationStart":null,"onAnimationComplete":null,"style":{"x":null,"y":null,"rotate":null,"scale":null,"opacity":null,"scaleX":null,"scaleY":null}},"gestures":{"whileHover":{"scale":1,"opacity":1,"transition":{"type":"spring","stiffness":400,"damping":25}},"whileTap":{"scale":1,"opacity":1},"whileFocus":{"scale":1,"outline":"2px solid currentColor"},"whileDrag":{"scale":1.05,"cursor":"grabbing","zIndex":100},"whileInView":{"opacity":1,"y":0,"transition":{"type":"spring","stiffness":200,"damping":30}},"viewport":{"once":true,"root":null,"margin":"0px","amount":0.1},"propagate":{"tap":true},"hoverCallbacks":{"onHoverStart":null,"onHoverEnd":null},"tapCallbacks":{"onTap":null,"onTapStart":null,"onTapCancel":null},"panCallbacks":{"onPan":null,"onPanStart":null,"onPanEnd":null}},"drag":{"drag":false,"dragDirectionLock":false,"dragPropagation":false,"dragConstraints":null,"dragElastic":0.5,"dragMomentum":true,"dragTransition":{"type":"inertia","power":0.8,"timeConstant":750,"bounceStiffness":500,"bounceDamping":10,"min":null,"max":null},"dragSnapToOrigin":false,"dragControls":null,"onDragStart":null,"onDrag":null,"onDragEnd":null,"onDirectionLock":null},"layout":{"layout":false,"layoutId":null,"layoutDependency":null,"layoutScroll":false,"layoutRoot":false,"onLayoutAnimationStart":null,"onLayoutAnimationComplete":null},"animatePresence":{"initial":true,"mode":"sync","onExitComplete":null,"presenceAffectsLayout":true},"layoutGroup":{"id":null,"inherit":true},"reorder":{"group":{"axis":"y","values":[],"onReorder":null,"as":"ul"},"item":{"value":null,"as":"li","drag":"y","dragListener":true,"layout":true}},"motionConfig":{"transition":{"type":"spring","stiffness":100,"damping":10},"reducedMotion":"user","nonce":null,"isStatic":false},"lazyMotion":{"features":null,"strict":false},"hooks":{"useAnimate":{"scope":null,"animateArgs":{"selector_or_element":null,"keyframes":{},"options":{"duration":0.3,"delay":0,"ease":"easeInOut","type":"tween","repeat":0,"repeatType":"loop","repeatDelay":0,"at":null}},"sequenceFormat":[["selector",{"opacity":1},{"duration":0.3}],["selector2",{"x":100},{"at":0.2}]],"controls":{"play":null,"pause":null,"stop":null,"complete":null,"cancel":null,"speed":1,"time":0,"duration":null,"state":"idle"}},"useMotionValue":{"initialValue":0,"methods":{"get":null,"set":null,"jump":null,"getPrevious":null,"getVelocity":null,"on":null,"destroy":null}},"useTransform":{"input":null,"inputRange":[0,1],"outputRange":[0,100],"options":{"clamp":true,"ease":null}},"useSpring":{"source":null,"config":{"stiffness":100,"damping":10,"mass":1,"velocity":0,"restSpeed":0.01,"restDelta":0.01}},"useScroll":{"returns":{"scrollX":"MotionValue<number>","scrollY":"MotionValue<number>","scrollXProgress":"MotionValue<number> 0-1","scrollYProgress":"MotionValue<number> 0-1"},"options":{"container":null,"target":null,"axis":"y","offset":["start end","end start"]}},"useVelocity":{"source":null},"useMotionTemplate":{},"useMotionValueEvent":{"value":null,"event":"change","callback":null},"useAnimation":{"methods":{"start":null,"stop":null,"set":null}},"useCycle":{"values":[]},"useInView":{"options":{"root":null,"margin":"0px","amount":"some","once":false}},"useReducedMotion":{},"useDragControls":{"methods":{"start":null}},"useWillChange":{}},"svgMotionValues":{"pathLength":{"range":"0 to 1"},"pathOffset":{"range":"0 to 1"},"pathSpacing":{"range":"0 to 1"}},"animate_standalone":{"element":null,"keyframes":{},"options":{"duration":0.3,"delay":0,"ease":"easeInOut","repeat":0,"repeatType":"loop","repeatDelay":0,"onComplete":null,"onUpdate":null}},"scroll_standalone":{"callback":null,"options":{"source":null,"target":null,"offset":["start end","end start"],"axis":"y"}},"inView_standalone":{"element":null,"callback":null,"options":{"root":null,"margin":"0px","amount":"some"}},"stagger_standalone":{"duration":0.05,"options":{"startDelay":0,"from":"first","ease":null}},"animatableProperties":{"transforms":["x","y","z","rotate","rotateX","rotateY","rotateZ","scale","scaleX","scaleY","skew","skewX","skewY","translateX","translateY","translateZ","perspective"],"origin":["originX","originY","originZ"],"visual":["opacity","backgroundColor","color","fill","stroke","strokeWidth","strokeOpacity","fillOpacity","borderRadius","borderTopLeftRadius","borderTopRightRadius","borderBottomLeftRadius","borderBottomRightRadius","boxShadow","textShadow","filter","backdropFilter","clipPath","background","backgroundImage"],"layout":["width","height","top","left","right","bottom","margin","padding"],"svg":["pathLength","pathOffset","pathSpacing","strokeDasharray","strokeDashoffset","d"]},"easings":{"named":["linear","easeIn","easeOut","easeInOut","circIn","circOut","circInOut","backIn","backOut","backInOut","anticipate"],"cubicBezier":[0.25,0.46,0.45,0.94],"steps":[4,"end"],"customFunction":null},"progressBar":{"height":"4px","fill":"rgba(255,255,255,0.4)","trackBackground":"rgba(255,255,255,0.1)"},"defaultSlideDistancePx":24,"defaultFeedbackDurationMs":400});}),
"[project]/packages/contracts/src/content/framer-motion/framer-motion-presets.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"entrancePresets":{"fade":{"initial":{"opacity":0},"animate":{"opacity":1}},"slideUp":{"initial":{"y":24},"animate":{"y":0}},"slideDown":{"initial":{"y":-24},"animate":{"y":0}},"slideLeft":{"initial":{"x":24},"animate":{"x":0}},"slideRight":{"initial":{"x":-24},"animate":{"x":0}},"zoomIn":{"initial":{"scale":0.92},"animate":{"scale":1}},"zoomOut":{"initial":{"scale":1.08},"animate":{"scale":1}},"popIn":{"initial":{"opacity":0,"scale":0.86,"y":10},"animate":{"opacity":1,"scale":1,"y":0}},"blurIn":{"initial":{"opacity":0,"filter":"blur(8px)"},"animate":{"opacity":1,"filter":"blur(0px)"}},"tiltIn":{"initial":{"rotate":-4},"animate":{"rotate":0}}},"exitPresets":{"fade":{"exit":{"opacity":0}},"slideUp":{"exit":{"y":-24}},"slideDown":{"exit":{"y":24}},"slideLeft":{"exit":{"x":-24}},"slideRight":{"exit":{"x":24}},"zoomIn":{"exit":{"scale":1.08}},"zoomOut":{"exit":{"scale":0.92}},"popIn":{"exit":{"opacity":0,"scale":0.92,"y":8}},"blurIn":{"exit":{"opacity":0,"filter":"blur(8px)"}},"tiltIn":{"exit":{"rotate":4}}}});}),
"[project]/packages/contracts/src/page-builder/core/page-builder-motion-defaults.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/use-video-lazy-load.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useVideoLazyLoad",
    ()=>useVideoLazyLoad
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$viewport$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/viewport.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/use-in-view.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$page$2d$builder$2f$core$2f$page$2d$builder$2d$motion$2d$defaults$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/contracts/src/page-builder/core/page-builder-motion-defaults.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
function useVideoLazyLoad({ autoplay, hasSource, priority = false, containerRef }) {
    const [userArmed, setUserArmed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const isInView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useInView"])(containerRef, {
        amount: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$page$2d$builder$2f$core$2f$page$2d$builder$2d$motion$2d$defaults$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MOTION_DEFAULTS"].viewport.amount,
        once: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$page$2d$builder$2f$core$2f$page$2d$builder$2d$motion$2d$defaults$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MOTION_DEFAULTS"].viewport.once
    });
    const shouldLoadVideo = priority || autoplay || hasSource && (isInView || userArmed);
    const armVideoLoad = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setUserArmed(true);
    }, []);
    return {
        shouldLoadVideo,
        armVideoLoad
    };
}
}),
"[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/motion-from-json.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MotionFromJson",
    ()=>MotionFromJson
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$page$2d$builder$2f$core$2f$page$2d$builder$2d$motion$2d$defaults$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/contracts/src/page-builder/core/page-builder-motion-defaults.ts [app-ssr] (ecmascript)");
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
const MotionFromJson = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ motion: motionConfig, animateOverride, useMotionAsIs, as: tag = "div", children, style, className, ...rest }, ref)=>{
    if (!motionConfig || typeof motionConfig !== "object") {
        const Tag = MOTION_TAGS.includes(tag) ? tag : "div";
        const setRef = (el)=>{
            if (typeof ref === "function") ref(el);
            else if (ref && "current" in ref) ref.current = el;
        };
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tag, {
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
    const merged = useMotionAsIs ? motionConfig : (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$page$2d$builder$2f$core$2f$page$2d$builder$2d$motion$2d$defaults$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeMotionDefaults"])(motionConfig);
    if (!merged || typeof merged !== "object") {
        const Tag = MOTION_TAGS.includes(tag) ? tag : "div";
        const setRef = (el)=>{
            if (typeof ref === "function") ref(el);
            else if (ref && "current" in ref) ref.current = el;
        };
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Tag, {
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
    const MotionComponent = MOTION_TAGS.includes(tag) && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"][tag] ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"][tag] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MotionComponent, {
        ...motionProps,
        children: children
    }, void 0, false, {
        fileName: "[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/motion-from-json.tsx",
        lineNumber: 113,
        columnNumber: 12
    }, ("TURBOPACK compile-time value", void 0));
});
MotionFromJson.displayName = "MotionFromJson";
}),
"[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/element-exit-wrapper.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ElementExitWrapper",
    ()=>ElementExitWrapper
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$motion$2d$from$2d$json$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/motion-from-json.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$viewport$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/viewport.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/use-in-view.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$page$2d$builder$2f$core$2f$page$2d$builder$2d$motion$2d$defaults$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/contracts/src/page-builder/core/page-builder-motion-defaults.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function ElementExitWrapper({ show, motion: motionFromJson, motionTiming, exitPreset, exitDuration = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$page$2d$builder$2f$core$2f$page$2d$builder$2d$motion$2d$defaults$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MOTION_DEFAULTS"].transition.exitDuration ?? __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$page$2d$builder$2f$core$2f$page$2d$builder$2d$motion$2d$defaults$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MOTION_DEFAULTS"].transition.duration, exitEasing = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$page$2d$builder$2f$core$2f$page$2d$builder$2d$motion$2d$defaults$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MOTION_DEFAULTS"].transition.ease, exitKey = "element-exit", presenceMode = "sync", onExitComplete, className, style, children }) {
    const exitTrigger = motionTiming?.exitTrigger ?? "manual";
    const exitVp = motionTiming?.exitViewport;
    const effectiveExitPreset = motionTiming?.exitPreset ?? exitPreset;
    const effectiveExitMotion = motionTiming?.exitMotion ?? motionFromJson;
    const exitTransitionOverrides = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!effectiveExitMotion || typeof effectiveExitMotion !== "object") return undefined;
        const transition = effectiveExitMotion.transition;
        if (!transition || typeof transition !== "object") return undefined;
        return transition;
    }, [
        effectiveExitMotion
    ]);
    const resolvedExitDuration = exitTransitionOverrides?.duration ?? exitDuration;
    const resolvedExitDelay = exitTransitionOverrides?.delay ?? 0;
    const resolvedExitEasing = exitTransitionOverrides?.ease ?? exitEasing;
    const motionConfig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const hasMotionExit = effectiveExitMotion != null && typeof effectiveExitMotion === "object" && effectiveExitMotion?.exit != null;
        if (hasMotionExit && effectiveExitMotion != null) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$page$2d$builder$2f$core$2f$page$2d$builder$2d$motion$2d$defaults$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeMotionDefaults"])(effectiveExitMotion) ?? {};
        }
        if (effectiveExitPreset && typeof effectiveExitPreset === "string") {
            const { exit, transition } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$page$2d$builder$2f$core$2f$page$2d$builder$2d$motion$2d$defaults$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getExitMotionFromPreset"])(effectiveExitPreset, {
                duration: resolvedExitDuration,
                delay: resolvedExitDelay,
                ease: resolvedExitEasing
            });
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$page$2d$builder$2f$core$2f$page$2d$builder$2d$motion$2d$defaults$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeMotionDefaults"])({
                initial: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$page$2d$builder$2f$core$2f$page$2d$builder$2d$motion$2d$defaults$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MOTION_DEFAULTS"].motionComponent.animate ?? {
                    opacity: 1
                },
                animate: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$page$2d$builder$2f$core$2f$page$2d$builder$2d$motion$2d$defaults$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MOTION_DEFAULTS"].motionComponent.animate,
                exit: exit,
                transition
            }) ?? {};
        }
        const mc = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$page$2d$builder$2f$core$2f$page$2d$builder$2d$motion$2d$defaults$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MOTION_DEFAULTS"].motionComponent;
        const exitTransition = {
            type: "tween",
            duration: resolvedExitDuration,
            delay: resolvedExitDelay,
            ease: resolvedExitEasing
        };
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$page$2d$builder$2f$core$2f$page$2d$builder$2d$motion$2d$defaults$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeMotionDefaults"])({
            initial: mc.animate,
            animate: mc.animate,
            exit: mc.exit ?? {
                opacity: 0
            },
            transition: exitTransition
        }) ?? {};
    }, [
        effectiveExitMotion,
        effectiveExitPreset,
        resolvedExitDuration,
        resolvedExitDelay,
        resolvedExitEasing
    ]);
    if (exitTrigger !== "leaveViewport") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
            mode: presenceMode,
            onExitComplete: onExitComplete,
            children: show && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$motion$2d$from$2d$json$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MotionFromJson"], {
                motion: motionConfig,
                className: className,
                style: style,
                children: children
            }, exitKey, false, {
                fileName: "[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/element-exit-wrapper.tsx",
                lineNumber: 142,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/element-exit-wrapper.tsx",
            lineNumber: 140,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LeaveViewportExitPresence, {
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
        lineNumber: 151,
        columnNumber: 5
    }, this);
}
function LeaveViewportExitPresence({ show, exitVp, exitKey, motionConfig, presenceMode, onExitComplete, className, style, children }) {
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isInView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useInView"])(containerRef, {
        once: exitVp?.once ?? false,
        margin: exitVp?.margin,
        amount: exitVp?.amount
    });
    const [wasEverInView, setWasEverInView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    if (isInView && !wasEverInView) setWasEverInView(true);
    const presenceShow = show && (!wasEverInView || isInView);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
            mode: presenceMode,
            onExitComplete: onExitComplete,
            children: presenceShow && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$motion$2d$from$2d$json$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MotionFromJson"], {
                motion: motionConfig,
                className: className,
                style: style,
                children: children
            }, exitKey, false, {
                fileName: "[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/element-exit-wrapper.tsx",
                lineNumber: 201,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/element-exit-wrapper.tsx",
            lineNumber: 199,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/element-exit-wrapper.tsx",
        lineNumber: 198,
        columnNumber: 5
    }, this);
}
}),
"[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/section-scroll-progress-bar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SectionScrollProgressBar",
    ()=>SectionScrollProgressBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-scroll.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-transform.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$motion$2d$value$2d$event$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/use-motion-value-event.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$section$2f$position$2f$use$2d$scroll$2d$container$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/section/position/use-scroll-container.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$page$2d$builder$2f$core$2f$page$2d$builder$2d$motion$2d$defaults$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/contracts/src/page-builder/core/page-builder-motion-defaults.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$reduced$2d$motion$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/reduced-motion.ts [app-ssr] (ecmascript)");
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
function SectionScrollProgressBar({ sectionRef, height = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$page$2d$builder$2f$core$2f$page$2d$builder$2d$motion$2d$defaults$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MOTION_DEFAULTS"].progressBar.height, fill = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$page$2d$builder$2f$core$2f$page$2d$builder$2d$motion$2d$defaults$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MOTION_DEFAULTS"].progressBar.fill, trackBackground = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$page$2d$builder$2f$core$2f$page$2d$builder$2d$motion$2d$defaults$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MOTION_DEFAULTS"].progressBar.trackBackground, offset = DEFAULT_OFFSET, className, respectReducedMotion = true }) {
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$section$2f$position$2f$use$2d$scroll$2d$container$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useScrollContainerRef"])();
    const shouldReduceMotion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$reduced$2d$motion$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useShouldReduceMotion"])(!respectReducedMotion);
    const scrollOptions = {
        target: sectionRef,
        container: containerRef ?? undefined,
        offset
    };
    const { scrollYProgress } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useScroll"])(scrollOptions);
    const scaleX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(scrollYProgress, [
        0,
        1
    ], shouldReduceMotion ? [
        0,
        0
    ] : [
        0,
        1
    ]);
    const [progressForA11y, setProgressForA11y] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>Math.round(Math.max(0, Math.min(1, scrollYProgress.get())) * 100) / 100);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$motion$2d$value$2d$event$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMotionValueEvent"])(scrollYProgress, "change", (latest)=>{
        const clamped = Math.max(0, Math.min(1, latest));
        setProgressForA11y(Math.round(clamped * 100) / 100);
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: className,
        role: "progressbar",
        "aria-valuemin": 0,
        "aria-valuemax": 1,
        "aria-valuenow": progressForA11y,
        "aria-label": "Section scroll progress",
        style: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height,
            background: trackBackground,
            transformOrigin: "0 0",
            zIndex: 5
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
            style: {
                scaleX,
                originX: 0,
                height,
                background: fill,
                width: "100%"
            }
        }, void 0, false, {
            fileName: "[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/section-scroll-progress-bar.tsx",
            lineNumber: 85,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/section-scroll-progress-bar.tsx",
        lineNumber: 67,
        columnNumber: 5
    }, this);
}
}),
"[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/section-motion-wrapper.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SectionMotionWrapper",
    ()=>SectionMotionWrapper
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$motion$2d$from$2d$json$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/motion-from-json.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$animations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/animations.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$reduced$2d$motion$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/reduced-motion.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
const SectionMotionWrapper = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ sectionRef, motion: motionFromJson, motionTiming, reduceMotion, children, ...sectionProps }, _forwardedRef)=>{
    const { ref: _omitRef, ...restSectionProps } = sectionProps;
    // ── motionTiming path (entrance animation, same semantics as ElementEntranceWrapper) ──
    const resolved = motionTiming?.resolvedEntranceMotion;
    // Fix 1: reduceMotion=true (default) → respect OS preference; reduceMotion=false → ignore it.
    // useShouldReduceMotion takes `ignorePreference`, so invert: ignore when reduceMotion is explicitly false.
    const ignorePreference = reduceMotion === false;
    const skip = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$reduced$2d$motion$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useShouldReduceMotion"])(ignorePreference);
    // null = pre-hydration (SSR) | false = hydrated, below fold | true = hydrated, in viewport
    const [viewOnMount, setViewOnMount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // Fix 2: window.innerHeight is already inside useLayoutEffect (client-only), so SSR is safe.
    // The existing guard is correct; adding an explicit typeof check for clarity.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLayoutEffect"])(()=>{
        if (!resolved) return;
        const el = sectionRef.current;
        const inView = !!el && ("TURBOPACK compile-time value", "undefined") !== "undefined" && el.getBoundingClientRect().top < window.innerHeight && el.getBoundingClientRect().bottom > 0;
        queueMicrotask(()=>{
            setViewOnMount(inView);
        });
    }, [
        resolved,
        sectionRef
    ]);
    const onTriggerUnsupportedWarnedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLayoutEffect"])(()=>{
        if (("TURBOPACK compile-time value", "development") !== "development" || !resolved || !motionTiming) return;
        const trigger = motionTiming.trigger ?? "onFirstVisible";
        if (trigger !== "onTrigger" || onTriggerUnsupportedWarnedRef.current) return;
        onTriggerUnsupportedWarnedRef.current = true;
        console.warn('[page-builder] SectionMotionWrapper: triggerMode "onTrigger" is not supported for sections — falling back to "whileInView".');
    }, [
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
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
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
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].section, {
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
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].section, {
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
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$motion$2d$from$2d$json$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MotionFromJson"], {
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        ref: sectionRef,
        ...restSectionProps,
        children: children
    }, void 0, false, {
        fileName: "[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/section-motion-wrapper.tsx",
        lineNumber: 153,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
SectionMotionWrapper.displayName = "SectionMotionWrapper";
}),
"[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/drag-handle-controls.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useDragHandleControls",
    ()=>useDragHandleControls
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$gestures$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/gestures.tsx [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$gestures$2f$drag$2f$use$2d$drag$2d$controls$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/gestures/drag/use-drag-controls.mjs [app-ssr] (ecmascript)");
"use client";
;
;
function useDragHandleControls() {
    const dragControls = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$gestures$2f$drag$2f$use$2d$drag$2d$controls$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDragControls"])();
    const onPointerDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((event)=>{
        // Framer Motion will read the underlying native event from the synthetic event.
        dragControls.start(event);
    }, [
        dragControls
    ]);
    return {
        dragControls,
        handleBindings: {
            onPointerDown
        }
    };
}
}),
"[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/scroll-style.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSectionScrollOpacityStyle",
    ()=>useSectionScrollOpacityStyle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$section$2d$scroll$2d$progress$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/section-scroll-progress.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$reduced$2d$motion$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/reduced-motion.ts [app-ssr] (ecmascript)");
"use client";
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
    const [opacity, setOpacity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const respectReducedMotion = options?.respectReducedMotion !== false;
    const shouldReduceMotion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$reduced$2d$motion$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useShouldReduceMotion"])(!respectReducedMotion);
    const handleProgress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((progress)=>{
        if (!range || shouldReduceMotion) return;
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
    }, [
        range,
        shouldReduceMotion
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$section$2d$scroll$2d$progress$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSectionScrollProgressFM"])({
        sectionRef,
        onProgress: range && !shouldReduceMotion ? handleProgress : undefined
    });
    if (!range) return undefined;
    if (shouldReduceMotion) {
        const [, outEnd] = range.output ?? [
            0,
            1
        ];
        const fallbackOpacity = clamp01(outEnd ?? 1);
        return {
            opacity: fallbackOpacity
        };
    }
    // Before first progress event, use output range start to avoid flash
    if (opacity === null) {
        const [outStart] = range.output ?? [
            0,
            1
        ];
        return {
            opacity: clamp01(outStart ?? 0)
        };
    }
    return {
        opacity
    };
}
}),
"[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/use-bg-layer-motion.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useBgLayerMotion",
    ()=>useBgLayerMotion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$triggers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/triggers.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-scroll.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$motion$2d$values$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/motion-values.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-transform.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$motion$2d$value$2d$event$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/use-motion-value-event.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$animations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/animations.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/animation/animate/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$section$2f$position$2f$use$2d$scroll$2d$container$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/section/position/use-scroll-container.tsx [app-ssr] (ecmascript)");
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
    const scrollMotions = motions.filter((m)=>m.type === "scroll");
    const pointerMotions = motions.filter((m)=>m.type === "pointer");
    const parallaxMotion = motions.find((m)=>m.type === "parallax");
    const triggerMotions = motions.filter((m)=>m.type === "trigger");
    // Picks up the project's scroll container (overflow-y:auto div from layout).
    // Falls back gracefully to window scroll when no provider is present.
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$section$2f$position$2f$use$2d$scroll$2d$container$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useScrollContainerRef"])();
    // ── Parallax ─────────────────────────────────────────────────────────
    // Always call useScroll + useTransform (hooks must be unconditional).
    // When no parallax is configured, the MotionValues are neutral (0% → 0%) and unused.
    const { scrollYProgress: parallaxProgress } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useScroll"])({
        container: containerRef ?? undefined,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        offset: parallaxMotion?.offset ?? [
            "start start",
            "end end"
        ]
    });
    const parallaxAxis = parallaxMotion?.axis ?? "y";
    const parallaxSpeed = parallaxMotion?.speed ?? 0;
    const parallaxX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(parallaxProgress, [
        0,
        1
    ], parallaxAxis === "x" ? [
        "0%",
        `${parallaxSpeed * 100}%`
    ] : [
        "0%",
        "0%"
    ]);
    const parallaxY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(parallaxProgress, [
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
    const { scrollYProgress: scrollMotionProgress } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useScroll"])({
        container: containerRef ?? undefined,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        offset: scrollMotions[0]?.offset ?? [
            "start start",
            "end end"
        ]
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$motion$2d$value$2d$event$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMotionValueEvent"])(scrollMotionProgress, "change", (progress)=>{
        if (!layerRef.current || scrollMotions.length === 0) return;
        for (const sm of scrollMotions){
            const clamp = sm.clamp !== false;
            for (const [prop, [start, end]] of Object.entries(sm.properties)){
                const value = interpolateProp(start, end, progress, clamp);
                applyStyleProp(layerRef.current, prop, value);
            }
        }
    });
    // ── Pointer ────────────────────────────────────────────────────────────
    // RAF-based lerp toward mouse position. Runs only when pointer motions are present.
    const pointerTargetRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])({});
    const pointerCurrentRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])({});
    const pointerRafRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (pointerMotions.length === 0) return;
        const lerpFactor = pointerMotions[0]?.ease ?? 0.08;
        const onMouseMove = (e)=>{
            const nx = e.clientX / window.innerWidth;
            const ny = e.clientY / window.innerHeight;
            for (const pm of pointerMotions){
                if (pm.x) {
                    for (const [prop, [from, to]] of Object.entries(pm.x)){
                        pointerTargetRef.current[prop] = interpolateProp(from, to, nx, true);
                    }
                }
                if (pm.y) {
                    for (const [prop, [from, to]] of Object.entries(pm.y)){
                        pointerTargetRef.current[prop] = interpolateProp(from, to, ny, true);
                    }
                }
            }
        };
        const tick = ()=>{
            const el = layerRef.current;
            if (el) {
                for (const [prop, target] of Object.entries(pointerTargetRef.current)){
                    const current = pointerCurrentRef.current[prop];
                    const next = current === undefined ? target : lerpProp(current, target, lerpFactor);
                    pointerCurrentRef.current[prop] = next;
                    applyStyleProp(el, prop, next);
                }
            }
            pointerRafRef.current = requestAnimationFrame(tick);
        };
        window.addEventListener("mousemove", onMouseMove, {
            passive: true
        });
        pointerRafRef.current = requestAnimationFrame(tick);
        return ()=>{
            window.removeEventListener("mousemove", onMouseMove);
            if (pointerRafRef.current !== null) {
                cancelAnimationFrame(pointerRafRef.current);
                pointerRafRef.current = null;
            }
        };
    }, [
        pointerMotions,
        layerRef
    ]);
    // ── Trigger ─────────────────────────────────────────────────────────────
    // Imperative FM animate() calls in response to custom window events.
    // Each trigger config gets its own event listener; multiple configs coexist.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (triggerMotions.length === 0) return;
        const cleanups = [];
        // Track toggle state per trigger id (false = resting at "from")
        const toggleState = {};
        for (const tm of triggerMotions){
            toggleState[tm.id] = false;
            // Auto-play: fire on mount after optional delay
            if (tm.autoPlay) {
                const delayMs = (tm.autoPlayDelay ?? 0) * 1000;
                const timer = window.setTimeout(()=>{
                    if (!layerRef.current) return;
                    void (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["animate"])(layerRef.current, tm.to, {
                        duration: tm.transition?.duration ?? 0.8,
                        ease: tm.transition?.ease ?? "easeOut",
                        delay: tm.transition?.delay ?? 0
                    });
                    toggleState[tm.id] = true;
                }, delayMs);
                cleanups.push(()=>clearTimeout(timer));
            }
            // Event listener
            const handler = ()=>{
                if (!layerRef.current) return;
                const shouldGoToActive = tm.toggle ? !toggleState[tm.id] : true;
                const target = shouldGoToActive ? tm.to : tm.from;
                void (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["animate"])(layerRef.current, target, {
                    duration: tm.transition?.duration ?? 0.8,
                    ease: tm.transition?.ease ?? "easeOut",
                    delay: tm.transition?.delay ?? 0
                });
                if (tm.toggle) toggleState[tm.id] = shouldGoToActive;
            };
            window.addEventListener(tm.id, handler);
            cleanups.push(()=>window.removeEventListener(tm.id, handler));
        }
        return ()=>{
            for (const cleanup of cleanups)cleanup();
        };
    }, [
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
}),
"[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/index.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
/**
 * Framer Motion integration for the page builder.
 * All framer-motion imports go through this folder; no direct "framer-motion" imports elsewhere in page-builder.
 *
 * Data flow: JSON motion/motionTiming → schemas (motion-props-schema) → mergeMotionDefaults (page-builder-motion-defaults)
 * → wrappers (ElementEntranceWrapper, SectionMotionWrapper, ModalAnimationWrapper, etc.) → MotionFromJson → motion.* components.
 * See docs/integrations/framer-motion.md for full architecture and where to add new motion features.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$accessibility$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/accessibility.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$reduced$2d$motion$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/reduced-motion.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$viewport$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/viewport.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$animations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/animations.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$presence$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/presence.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$motion$2d$values$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/motion-values.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$triggers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/triggers.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$layout$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/layout.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$layout$2d$motion$2d$div$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/layout-motion-div.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$gestures$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/gestures.tsx [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$use$2d$video$2d$lazy$2d$load$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/use-video-lazy-load.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$motion$2d$from$2d$json$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/motion-from-json.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$element$2d$exit$2d$wrapper$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/element-exit-wrapper.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$section$2d$scroll$2d$progress$2d$bar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/section-scroll-progress-bar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$section$2d$motion$2d$wrapper$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/section-motion-wrapper.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$drag$2d$handle$2d$controls$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/drag-handle-controls.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$scroll$2d$style$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/scroll-style.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$use$2d$bg$2d$layer$2d$motion$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/use-bg-layer-motion.ts [app-ssr] (ecmascript)");
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
}),
"[project]/packages/runtime-react/src/page-builder/triggers/PageTrigger.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PageTrigger",
    ()=>PageTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$section$2f$position$2f$use$2d$section$2d$base$2d$styles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/section/position/use-section-base-styles.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$trigger$2d$event$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/triggers/core/trigger-event.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$section$2f$position$2f$use$2d$section$2d$scroll$2d$progress$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/section/position/use-section-scroll-progress.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$use$2d$section$2d$custom$2d$triggers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/triggers/core/use-section-custom-triggers.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$section$2d$motion$2d$wrapper$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/integrations/framer-motion/section-motion-wrapper.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
function PageTrigger({ id, onVisible, onInvisible, onProgress, onViewportProgress, threshold = 0, triggerOnce = false, rootMargin, delay, width, height = "1px", align, marginLeft, marginRight, marginTop, marginBottom, initialX, initialY, motion: motionFromJson, keyboardTriggers, timerTriggers, cursorTriggers, scrollDirectionTriggers, idleTriggers }) {
    const sentinelRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const hasFiredVisibleOnce = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const pendingTimeout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const lastViewportProgressRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const hasVisibleTrigger = onVisible != null;
    const hasInvisibleTrigger = onInvisible != null;
    const hasViewportProgressTrigger = onViewportProgress != null;
    const fireVisibleAction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffectEvent"])(()=>{
        if (onVisible) (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$trigger$2d$event$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["firePageBuilderTrigger"])(true, onVisible, id);
    });
    const fireInvisibleAction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffectEvent"])(()=>{
        if (onInvisible) (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$trigger$2d$event$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["firePageBuilderTrigger"])(false, onInvisible, id);
    });
    const fireViewportProgressAction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffectEvent"])((ratio)=>{
        if (onViewportProgress) (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$trigger$2d$event$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["firePageBuilderProgressTrigger"])(ratio, onViewportProgress, id);
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$use$2d$section$2d$custom$2d$triggers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSectionCustomTriggers"])({
        keyboardTriggers,
        timerTriggers,
        cursorTriggers,
        scrollDirectionTriggers,
        idleTriggers
    });
    // Handle scroll progress tracking
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$section$2f$position$2f$use$2d$section$2d$scroll$2d$progress$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSectionScrollProgress"])({
        sectionRef: sentinelRef,
        onProgress: onProgress ? (progress)=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$trigger$2d$event$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["firePageBuilderProgressTrigger"])(progress, onProgress, id);
        } : undefined
    });
    const { baseStyle } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$section$2f$position$2f$use$2d$section$2d$base$2d$styles$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSectionBaseStyles"])({
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
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const el = sentinelRef.current;
        if (!el || !hasVisibleTrigger && !hasInvisibleTrigger && !onProgress && !hasViewportProgressTrigger) {
            return;
        }
        const observer = new IntersectionObserver((entries)=>{
            for (const entry of entries){
                if (hasViewportProgressTrigger) {
                    const ratio = entry.intersectionRatio;
                    if (lastViewportProgressRef.current === null || Math.abs(ratio - lastViewportProgressRef.current) > 0.001) {
                        lastViewportProgressRef.current = ratio;
                        fireViewportProgressAction(ratio);
                    }
                }
                const visible = entry.isIntersecting;
                if (pendingTimeout.current != null) {
                    clearTimeout(pendingTimeout.current);
                    pendingTimeout.current = null;
                }
                if (visible) {
                    if (hasVisibleTrigger) {
                        if (triggerOnce && hasFiredVisibleOnce.current) return;
                        if (triggerOnce) hasFiredVisibleOnce.current = true;
                        const ms = delay ?? 0;
                        if (ms > 0) {
                            pendingTimeout.current = setTimeout(()=>{
                                pendingTimeout.current = null;
                                fireVisibleAction();
                            }, ms);
                        } else {
                            fireVisibleAction();
                        }
                    }
                } else {
                    if (hasInvisibleTrigger) {
                        const ms = delay ?? 0;
                        if (ms > 0) {
                            pendingTimeout.current = setTimeout(()=>{
                                pendingTimeout.current = null;
                                fireInvisibleAction();
                            }, ms);
                        } else {
                            fireInvisibleAction();
                        }
                    }
                }
            }
        }, {
            threshold: hasViewportProgressTrigger ? Array.from({
                length: 101
            }, (_, i)=>i / 100) : threshold,
            rootMargin: rootMargin ?? undefined
        });
        observer.observe(el);
        return ()=>{
            if (pendingTimeout.current != null) clearTimeout(pendingTimeout.current);
            observer.disconnect();
            lastViewportProgressRef.current = null;
        };
    }, [
        id,
        onProgress,
        threshold,
        triggerOnce,
        rootMargin,
        delay,
        hasVisibleTrigger,
        hasInvisibleTrigger,
        hasViewportProgressTrigger
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$integrations$2f$framer$2d$motion$2f$section$2d$motion$2d$wrapper$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SectionMotionWrapper"], {
        sectionRef: sentinelRef,
        motion: motionFromJson,
        className: "pointer-events-none invisible shrink-0",
        style: {
            ...baseStyle,
            visibility: "hidden",
            minHeight: 0
        },
        "aria-hidden": true,
        children: null
    }, void 0, false, {
        fileName: "[project]/packages/runtime-react/src/page-builder/triggers/PageTrigger.tsx",
        lineNumber: 180,
        columnNumber: 5
    }, this);
}
}),
"[project]/packages/runtime-react/src/page-builder/triggers/core/use-reveal-external-trigger.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useRevealExternalTrigger",
    ()=>useRevealExternalTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$trigger$2d$event$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/triggers/core/trigger-event.ts [app-ssr] (ecmascript)");
"use client";
;
;
function useRevealExternalTrigger(externalTriggerKey, externalTriggerMode, setRevealed) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!externalTriggerKey || !externalTriggerMode) return;
        const handler = (e)=>{
            const detail = e.detail;
            if (!detail?.action || detail.action.type !== "contentOverride") return;
            if (detail.action.payload.key !== externalTriggerKey) return;
            const value = detail.action.payload.value;
            const boolValue = value === true || value === "true";
            if (externalTriggerMode === "setTrue") {
                if (boolValue) setRevealed(true);
            } else if (externalTriggerMode === "setFalse") {
                if (!boolValue) setRevealed(false);
            } else if (externalTriggerMode === "toggle") {
                setRevealed((prev)=>!prev);
            }
        };
        window.addEventListener(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$trigger$2d$event$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PAGE_BUILDER_TRIGGER_EVENT"], handler);
        return ()=>window.removeEventListener(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$trigger$2d$event$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PAGE_BUILDER_TRIGGER_EVENT"], handler);
    }, [
        externalTriggerKey,
        externalTriggerMode,
        setRevealed
    ]);
}
}),
"[project]/packages/runtime-react/src/page-builder/triggers/index.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$PageTrigger$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/triggers/PageTrigger.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$trigger$2d$event$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/triggers/core/trigger-event.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$use$2d$reveal$2d$external$2d$trigger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/triggers/core/use-reveal-external-trigger.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$use$2d$keyboard$2d$trigger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/triggers/core/use-keyboard-trigger.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$use$2d$timer$2d$trigger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/triggers/core/use-timer-trigger.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$use$2d$cursor$2d$trigger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/triggers/core/use-cursor-trigger.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$use$2d$scroll$2d$direction$2d$trigger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/triggers/core/use-scroll-direction-trigger.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$use$2d$idle$2d$trigger$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/triggers/core/use-idle-trigger.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$use$2d$section$2d$custom$2d$triggers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/triggers/core/use-section-custom-triggers.ts [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
}),
"[project]/packages/contracts/src/page-builder/core/page-builder-condition-evaluator.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/packages/runtime-react/src/page-builder/hooks/use-page-builder-action-runner.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePageBuilderActionRunner",
    ()=>usePageBuilderActionRunner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/triggers/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$trigger$2d$event$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/triggers/core/trigger-event.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$runtime$2f$page$2d$builder$2d$variable$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/runtime/page-builder-variable-store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$page$2d$builder$2f$core$2f$page$2d$builder$2d$condition$2d$evaluator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/contracts/src/page-builder/core/page-builder-condition-evaluator.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function usePageBuilderActionRunner() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const audioMapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(new Map());
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handler = (e)=>{
            const detail = e.detail;
            const action = detail?.action;
            if (!action?.type) return;
            switch(action.type){
                // --- Navigation ---
                case "back":
                    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                    ;
                    return;
                case "navigate":
                    {
                        const { href, replace } = action.payload;
                        if (!href) return;
                        if (replace) router.replace(href);
                        else router.push(href);
                        return;
                    }
                case "scrollTo":
                    {
                        const p = action.payload ?? {};
                        if (p.id) {
                            const el = document.getElementById(p.id);
                            if (el) el.scrollIntoView({
                                behavior: p.behavior ?? "smooth",
                                block: p.block ?? "start"
                            });
                        } else if (p.offset != null) {
                            window.scrollTo({
                                top: p.offset,
                                behavior: p.behavior ?? "smooth"
                            });
                        }
                        return;
                    }
                case "scrollLock":
                    document.body.style.overflow = "hidden";
                    return;
                case "scrollUnlock":
                    document.body.style.overflow = "";
                    return;
                // --- Modal (fires a secondary custom event; modal renderer listens) ---
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
                // --- State & Logic ---
                case "setVariable":
                    {
                        const { key, value } = action.payload;
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$runtime$2f$page$2d$builder$2d$variable$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setVariable"])(key, value);
                        return;
                    }
                case "fireMultiple":
                    {
                        const { actions, mode = "parallel", delayBetween = 0 } = action.payload;
                        if (!Array.isArray(actions)) return;
                        if (mode === "sequence") {
                            void actions.reduce((promise, a, i)=>{
                                return promise.then(()=>new Promise((resolve)=>{
                                        setTimeout(()=>{
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$trigger$2d$event$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["firePageBuilderAction"])(a, "system");
                                            resolve();
                                        }, i === 0 ? 0 : delayBetween);
                                    }));
                            }, Promise.resolve());
                        } else {
                            actions.forEach((a)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$trigger$2d$event$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["firePageBuilderAction"])(a, "system"));
                        }
                        return;
                    }
                case "conditionalAction":
                    {
                        const payload = action.payload;
                        const variables = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$runtime$2f$page$2d$builder$2d$variable$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useVariableStore"].getState().variables;
                        // Evaluate primary condition
                        const primaryPasses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$page$2d$builder$2f$core$2f$page$2d$builder$2d$condition$2d$evaluator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["evaluateConditions"])({
                            variable: payload.variable,
                            operator: payload.operator,
                            value: payload.value,
                            conditions: payload.conditions,
                            logic: payload.logic
                        }, variables);
                        if (primaryPasses) {
                            if (payload.then) (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$trigger$2d$event$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["firePageBuilderAction"])(payload.then, "system");
                            return;
                        }
                        // Evaluate elseIf chain
                        if (payload.elseIf) {
                            for (const branch of payload.elseIf){
                                const branchPasses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$contracts$2f$src$2f$page$2d$builder$2f$core$2f$page$2d$builder$2d$condition$2d$evaluator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["evaluateConditions"])(branch, variables);
                                if (branchPasses) {
                                    if (branch.then) (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$trigger$2d$event$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["firePageBuilderAction"])(branch.then, "system");
                                    return;
                                }
                            }
                        }
                        // Else fallback
                        if (payload.else) {
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$trigger$2d$event$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["firePageBuilderAction"])(payload.else, "system");
                        }
                        return;
                    }
                // --- Element Visibility (fires secondary event; element renderers listen) ---
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
                // --- Media ---
                case "playSound":
                    {
                        const { src, volume = 1, loop = false } = action.payload;
                        let audio = audioMapRef.current.get(src);
                        if (!audio) {
                            audio = new Audio(src);
                            audioMapRef.current.set(src, audio);
                        }
                        audio.volume = Math.max(0, Math.min(1, volume));
                        audio.loop = loop;
                        audio.currentTime = 0;
                        audio.play().catch(()=>{});
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
                            audioMapRef.current.forEach((a)=>{
                                a.pause();
                                a.currentTime = 0;
                            });
                        }
                        return;
                    }
                case "setVolume":
                    {
                        const { volume, id: elementId } = action.payload;
                        if (elementId) {
                            const el = document.getElementById(elementId);
                            if (el && "volume" in el) el.volume = Math.max(0, Math.min(1, volume));
                        } else {
                            audioMapRef.current.forEach((a)=>{
                                a.volume = Math.max(0, Math.min(1, volume));
                            });
                        }
                        return;
                    }
                // --- Browser / Device ---
                case "copyToClipboard":
                    {
                        const { text } = action.payload;
                        navigator.clipboard?.writeText(text).catch(()=>{});
                        return;
                    }
                case "vibrate":
                    {
                        const { pattern = 50 } = action.payload ?? {};
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
                        const { url, target = "_blank" } = action.payload;
                        window.open(url, target, "noopener,noreferrer");
                        return;
                    }
                // --- Section-context actions ---
                // These are handled by usePageBuilderTriggerListener (section-level), which also
                // listens to PAGE_BUILDER_TRIGGER_EVENT on window. Both listeners receive every
                // PAGE_BUILDER_TRIGGER_EVENT dispatch — including ones fired from buttons via
                // firePageBuilderAction. The section listener applies these to section-local state
                // (background overrides, transition state). Explicit no-ops here prevent silent
                // default fall-through while preserving the section listener's handling.
                case "backgroundSwitch":
                case "contentOverride":
                case "startTransition":
                case "stopTransition":
                case "updateTransitionProgress":
                    return;
                // --- Analytics ---
                case "trackEvent":
                    {
                        const { event, properties } = action.payload;
                        // Fire to window for any analytics integration to pick up
                        window.dispatchEvent(new CustomEvent("page-builder-track", {
                            detail: {
                                event,
                                properties
                            }
                        }));
                        // Also call gtag / plausible if available (typed loosely — third-party globals)
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
                // --- Storage ---
                case "setLocalStorage":
                    {
                        const { key, value } = action.payload;
                        try {
                            localStorage.setItem(key, JSON.stringify(value));
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
                    return;
            }
        };
        const audioMap = audioMapRef.current;
        window.addEventListener(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$trigger$2d$event$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PAGE_BUILDER_TRIGGER_EVENT"], handler);
        return ()=>{
            window.removeEventListener(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$triggers$2f$core$2f$trigger$2d$event$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PAGE_BUILDER_TRIGGER_EVENT"], handler);
            audioMap.forEach((a)=>{
                a.pause();
                a.currentTime = 0;
            });
        };
    }, [
        router
    ]);
}
}),
"[project]/packages/runtime-react/src/page-builder/runtime/PageBuilderRuntimeEffects.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PageBuilderRuntimeEffects",
    ()=>PageBuilderRuntimeEffects
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$runtime$2f$page$2d$builder$2d$variable$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/runtime/page-builder-variable-store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$hooks$2f$use$2d$page$2d$builder$2d$action$2d$runner$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/hooks/use-page-builder-action-runner.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function PageBuilderRuntimeEffects() {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$hooks$2f$use$2d$page$2d$builder$2d$action$2d$runner$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePageBuilderActionRunner"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$runtime$2f$page$2d$builder$2d$variable$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clearVariables"])();
    }, [
        pathname
    ]);
    return null;
}
}),
"[project]/packages/runtime-react/src/effects.tsx [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$runtime$2f$PageBuilderRuntimeEffects$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/runtime/PageBuilderRuntimeEffects.tsx [app-ssr] (ecmascript)");
"use client";
;
}),
"[project]/packages/runtime-react/src/effects.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PageBuilderRuntimeEffects",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$runtime$2f$PageBuilderRuntimeEffects$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PageBuilderRuntimeEffects"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$effects$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/effects.tsx [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$runtime$2d$react$2f$src$2f$page$2d$builder$2f$runtime$2f$PageBuilderRuntimeEffects$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/runtime-react/src/page-builder/runtime/PageBuilderRuntimeEffects.tsx [app-ssr] (ecmascript)");
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__155d1c98._.js.map