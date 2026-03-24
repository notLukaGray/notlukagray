"use client";

import Link from "next/link";
import { headerFooterData, isFooterLink } from "@/core/lib/globals";

const footerLinkClass =
  "frame-link typography-body-legal-light inline-flex items-center justify-center w-[46px] min-h-[12px] shrink-0 rounded";
const copyrightClass = "frame-link typography-body-legal-light";

export function Footer() {
  const { footer } = headerFooterData;

  return (
    <footer className="footer-frame-bg fixed bottom-0 left-0 right-0 z-[100] w-full rounded-t-[30px] backdrop-blur-[16px]">
      <div className="frame-bar-inner px-4 sm:px-8 md:px-[50px]">
        <nav className="frame-bar-nav flex-wrap" aria-label="Footer and social links">
          {footer.map((item, i) =>
            isFooterLink(item) ? (
              <Link
                key={item.href + i}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={footerLinkClass}
              >
                {item.label}
              </Link>
            ) : (
              <Link key="copyright" href="/profile" className={copyrightClass}>
                {item.text}
              </Link>
            )
          )}
        </nav>
      </div>
    </footer>
  );
}
