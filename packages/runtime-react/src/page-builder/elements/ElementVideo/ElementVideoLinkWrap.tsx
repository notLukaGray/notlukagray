"use client";

import Link from "next/link";
import type { ReactNode } from "react";

export type ElementVideoLinkWrapProps = {
  isLinkable: boolean;
  resolvedHref: string | null;
  isInternal: boolean;
  children: ReactNode;
};

/** Wraps content in Link, external <a>, or fragment based on link resolution. */
export function ElementVideoLinkWrap({
  isLinkable,
  resolvedHref,
  isInternal,
  children,
}: ElementVideoLinkWrapProps) {
  if (!isLinkable || !resolvedHref) return <>{children}</>;
  if (isInternal) {
    return (
      <Link href={resolvedHref} className="block w-full h-full">
        {children}
      </Link>
    );
  }
  return (
    <a
      href={resolvedHref}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full h-full"
    >
      {children}
    </a>
  );
}
