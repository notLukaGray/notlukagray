/** Logo config shape (matches globals.json logo). */
export type LogoConfig = {
  viewBox: string;
  size: number;
  fillPaths: string[];
  gradient: {
    angleDeg: number;
    stops: Array<{ offset: string; opacity: number }>;
    hoverStops?: Array<{ offset: string; opacity: number }>;
    activeStops?: Array<{ offset: string; opacity: number }>;
    defaultColor: string;
    hoverColor: string;
    activeColor: string;
  };
  stroke: {
    width: number;
    miterLimit: number;
    lineJoin: string;
    opacity: number;
    blendMode: string;
    colors: { default: string; hover: string; active: string };
  };
};

export type ResolvedLogoProps = {
  viewBox: string;
  size: number;
  fillPaths: string[];
  gradient: LogoConfig["gradient"];
  stroke: LogoConfig["stroke"];
  defaultId: string;
  hoverId: string;
  activeId: string;
  strokeColor: string;
  fillUrl: string;
};

/** Pure: resolve logo config + state into props for the dumb view. */
export function resolveLogoProps(
  config: LogoConfig,
  idPrefix: string,
  state: { hover: boolean; isActive: boolean }
): ResolvedLogoProps {
  const { viewBox, size, fillPaths, gradient, stroke } = config;
  const defaultId = `fill-default-${idPrefix}`;
  const hoverId = `fill-hover-${idPrefix}`;
  const activeId = `fill-active-${idPrefix}`;
  const strokeColor = state.hover
    ? stroke.colors.hover
    : state.isActive
      ? stroke.colors.active
      : stroke.colors.default;
  const fillUrl = state.hover
    ? `url(#${hoverId})`
    : state.isActive
      ? `url(#${activeId})`
      : `url(#${defaultId})`;
  return {
    viewBox,
    size,
    fillPaths,
    gradient,
    stroke,
    defaultId,
    hoverId,
    activeId,
    strokeColor,
    fillUrl,
  };
}
