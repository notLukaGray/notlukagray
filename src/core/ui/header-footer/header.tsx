"use client";

import { NavLink } from "./nav-link";
import { Logo } from "./logo";
import { headerFooterData } from "@/core/lib/globals";

export function Header() {
  const { nav } = headerFooterData;

  return (
    <header className="header-frame-bg fixed top-0 left-0 right-0 z-[100] w-full rounded-b-[30px] backdrop-blur-[64px]">
      <div className="frame-bar-inner px-[50px]">
        <nav className="frame-bar-nav" aria-label="Main navigation">
          {nav.map((item, i) =>
            item.type === "logo" ? (
              <Logo key="logo" />
            ) : (
              <NavLink key={item.href + i} href={item.href} size="nav">
                {item.label}
              </NavLink>
            )
          )}
        </nav>
      </div>
    </header>
  );
}
