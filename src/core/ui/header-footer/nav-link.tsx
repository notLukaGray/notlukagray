"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  size?: "nav" | "footer";
};

const linkStyles = {
  active: "frame-link--active",
  sizeNav:
    "typography-body-medium-regular inline-flex items-center justify-center w-[52px] min-h-[18px] shrink-0",
  sizeFooter: "typography-body-legal-light",
};

export function NavLink({ href, children, className, size = "nav" }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));

  const classNames = [
    "frame-link",
    isActive ? linkStyles.active : "",
    size === "nav" ? linkStyles.sizeNav : linkStyles.sizeFooter,
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Link href={href} className={classNames}>
      {children}
    </Link>
  );
}
