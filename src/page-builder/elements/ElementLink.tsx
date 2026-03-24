"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CSSProperties } from "react";
import type { ElementBlock, ElementBodyVariant } from "@/page-builder/core/page-builder-schemas";
import { getElementLayoutStyle } from "@/page-builder/core/element-layout-utils";
import {
  getBodyTypographyClass,
  getHeadingTypographyClass,
  DEFAULT_BODY_LEVEL,
} from "@/page-builder/core/element-body-typography";

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
  copyType,
  level,
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
  };
  const multilineAlign = textAlign ?? align;
  if (multilineAlign)
    blockStyle.textAlign = multilineAlign as "left" | "right" | "center" | "justify";
  blockStyle.whiteSpace = wordWrap ? "normal" : "nowrap";
  if (!wordWrap) {
    blockStyle.overflow = "hidden";
    blockStyle.textOverflow = "ellipsis";
  }

  const linkClassName = [
    "element-link m-0 block",
    typographyClass,
    isActive ? "element-link--active" : "",
    disabled ? "element-link--disabled" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="shrink-0" style={blockStyle}>
      {isInternal ? (
        <Link href={href} className={linkClassName} style={linkStyle}>
          {label}
        </Link>
      ) : (
        <a
          href={href}
          className={linkClassName}
          style={linkStyle}
          {...(external && {
            target: "_blank",
            rel: "noopener noreferrer",
          })}
        >
          {label}
        </a>
      )}
    </div>
  );
}
