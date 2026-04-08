export function readInteropExport<T>(moduleValue: unknown, exportName: string): T {
  const moduleObj = moduleValue as Record<string, unknown>;
  const direct = moduleObj[exportName];
  if (direct !== undefined) return direct as T;

  const defaultObj = moduleObj.default as Record<string, unknown> | undefined;
  if (defaultObj && defaultObj[exportName] !== undefined) return defaultObj[exportName] as T;

  const cjsObj = moduleObj["module.exports"] as Record<string, unknown> | undefined;
  if (cjsObj && cjsObj[exportName] !== undefined) return cjsObj[exportName] as T;

  throw new Error(`@pb/core could not resolve export "${exportName}" from interop module.`);
}
