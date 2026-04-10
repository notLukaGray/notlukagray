"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CSSProperties } from "react";
import { applyPbDefaultTextAlign } from "@pb/core/internal/adapters/host-config";
import type {
  ElementBlock,
  ElementBodyVariant,
} from "@pb/contracts/page-builder/core/page-builder-schemas";
import {
  getElementLayoutStyle,
  getLayoutRotateFlipStyle,
} from "@pb/core/internal/element-layout-utils";
import {
  getBodyTypographyClass,
  getHeadingTypographyClass,
  DEFAULT_BODY_LEVEL,
} from "@pb/core/internal/element-body-typography";
import { resolveFontFamily } from "@pb/core/internal/element-font-slot";

type Props = Extract<ElementBlock, { type: "elementLink" }>;

function getLinkTypographyClass(props: Props): string {
  if (props.copyType === "heading") {
    const level = (Array.isArray(props.level) ? props.level[0] : props.level) ?? 1;
    return getHeadingTypographyClass(level);
  }
  const level = (Array.isArray(props.level) ? props.level[0] : props.level) ?? DEFAULT_BODY_LEVEL;
  return getBodyTypographyClass(level as ElementBodyVariant);
}

function toTransitionValue(value: string | number | undefined): string | undefined {
  if (value == null) return undefined;
  return typeof value === "number" ? `${value}ms` : value;
}

/** Page-builder link element: label, href, optional external; uses heading or body copy type with full layout (align, width, margins, textAlign). */
export function ElementLink({
  label,
  href,
  external = false,
  target,
  rel,
  copyType,
  level,
  fontFamily,
  fontSize,
  fontWeight,
  textShadow,
  textDecoration,
  textTransform,
  whiteSpace,
  align,
  textAlign,
  width,
  height,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  wordWrap = true,
  linkDefault,
  linkHover,
  linkActive,
  linkDisabled,
  linkTransition,
  disabled = false,
  rotate,
  flipHorizontal,
  flipVertical,
  ...rest
}: Props) {
  const pathname = usePathname();
  const isInternal = !external && href.startsWith("/");
  const isActive = isInternal && (pathname === href || (href !== "/" && pathname.startsWith(href)));

  const linkStyle: CSSProperties = {};
  if (linkDefault != null)
    (linkStyle as Record<string, string>)["--element-link-color"] = linkDefault;
  if (linkHover != null) (linkStyle as Record<string, string>)["--element-link-hover"] = linkHover;
  if (linkActive != null)
    (linkStyle as Record<string, string>)["--element-link-active"] = linkActive;
  if (linkDisabled != null)
    (linkStyle as Record<string, string>)["--element-link-disabled"] = linkDisabled;
  const transition = toTransitionValue(linkTransition);
  if (transition != null)
    (linkStyle as Record<string, string>)["--element-link-transition"] = transition;

  const typographyClass = getLinkTypographyClass({
    type: "elementLink",
    label,
    href,
    external,
    copyType,
    ...(copyType === "heading" ? { level } : { level: level ?? DEFAULT_BODY_LEVEL }),
  } as Props);

  const blockStyle: CSSProperties = {
    ...getElementLayoutStyle({
      width,
      height,
      align,
      textAlign,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      ...rest,
    }),
    ...getLayoutRotateFlipStyle({ rotate, flipHorizontal, flipVertical }),
  };
  applyPbDefaultTextAlign(blockStyle, align, textAlign);

  // word wrap / overflow — must be on the text element, not the wrapper, for text-overflow to work
  const textStyle: CSSProperties = {
    ...(resolveFontFamily(fontFamily) !== undefined
      ? { fontFamily: resolveFontFamily(fontFamily) }
      : {}),
    ...(fontSize !== undefined ? { fontSize } : {}),
    ...(fontWeight !== undefined ? { fontWeight: fontWeight as CSSProperties["fontWeight"] } : {}),
    ...(textShadow !== undefined ? { textShadow } : {}),
    ...(textDecoration !== undefined ? { textDecoration } : {}),
    ...(textTransform !== undefined ? { textTransform } : {}),
    whiteSpace: whiteSpace ?? (wordWrap ? "normal" : "nowrap"),
    overflowWrap: wordWrap ? "break-word" : "normal",
    wordBreak: wordWrap ? "break-word" : "normal",
    ...(!wordWrap && whiteSpace == null ? { overflow: "hidden", textOverflow: "ellipsis" } : {}),
  };

  const linkClassName = [
    "element-link m-0 block",
    typographyClass,
    isActive ? "element-link--active" : "",
    disabled ? "element-link--disabled" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="shrink-0 max-w-full" style={blockStyle}>
      {isInternal ? (
        <Link
          href={href}
          className={linkClassName}
          style={{ ...linkStyle, ...textStyle }}
          target={target}
          rel={rel}
        >
          {label}
        </Link>
      ) : (
        <a
          href={href}
          className={linkClassName}
          style={{ ...linkStyle, ...textStyle }}
          target={target ?? (external ? "_blank" : undefined)}
          rel={rel ?? (external ? "noopener noreferrer" : undefined)}
        >
          {label}
        </a>
      )}
    </div>
  );
}
