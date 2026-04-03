"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { confirmAndClearAllDevToolStorage } from "@/app/dev/_components/dev-reset";
import { ELEMENT_DEV_ENTRIES } from "@/app/dev/elements/element-dev-registry";

type NavItem = {
  label: string;
  href?: string;
  disabled?: boolean;
};

type NavGroup = {
  title: string;
  wip?: boolean;
  items: NavItem[];
};

type Props = {
  onResetSection?: () => void;
  onTotalReset?: () => void;
};

const GROUPS: NavGroup[] = [
  {
    title: "Foundations",
    items: [
      { label: "Color", href: "/dev/colors" },
      { label: "Fonts", href: "/dev/fonts" },
      { label: "Style", href: "/dev/style" },
    ],
  },
  {
    title: "Layout",
    items: [
      { label: "Pages", href: "/dev/layout/pages" },
      { label: "Sections", href: "/dev/layout/sections" },
      { label: "Frames", href: "/dev/layout/frames" },
    ],
  },
  {
    title: "Elements",
    items: [
      { label: "All Elements", href: "/dev/elements" },
      ...ELEMENT_DEV_ENTRIES.map((entry) => ({
        label: entry.navLabel,
        href: `/dev/elements/${entry.slug}`,
      })),
    ],
  },
  {
    title: "Preview",
    items: [
      { label: "Test Page", href: "/dev/test" },
      { label: "Style Guide", href: "/style-guide" },
    ],
  },
  {
    title: "Builder",
    wip: true,
    items: [
      { label: "Modules (WIP)", disabled: true },
      { label: "Modals (WIP)", disabled: true },
    ],
  },
];

function isActivePath(pathname: string, href: string): boolean {
  if (pathname === href) return true;
  return href !== "/" && pathname.startsWith(`${href}/`);
}

function DropdownGroup({ group, pathname }: { group: NavGroup; pathname: string }) {
  const groupIsActive = group.items.some(
    (item) => !!item.href && isActivePath(pathname, item.href)
  );
  return (
    <details className="relative">
      <summary
        className={`list-none cursor-pointer rounded border px-3 py-1.5 text-[11px] font-mono transition-colors ${
          groupIsActive
            ? "border-foreground/40 bg-foreground/10 text-foreground"
            : "border-border bg-background text-foreground hover:bg-muted/60"
        }`}
      >
        {group.title}
        {group.wip ? " (WIP)" : ""}
      </summary>
      <div className="absolute left-0 top-full z-40 mt-1 min-w-44 rounded-md border border-border bg-background/95 p-1.5 shadow-lg backdrop-blur">
        <div className="flex flex-col gap-1">
          {group.items.map((item) => {
            if (!item.href || item.disabled) {
              return (
                <span
                  key={item.label}
                  className="inline-flex items-center rounded border border-border/60 px-2.5 py-1.5 text-[11px] font-mono text-muted-foreground"
                >
                  {item.label}
                </span>
              );
            }
            const active = isActivePath(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`inline-flex items-center rounded border px-2.5 py-1.5 text-[11px] font-mono transition-colors ${
                  active
                    ? "border-foreground/40 bg-foreground/10 text-foreground"
                    : "border-border text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </details>
  );
}

export function DevWorkbenchNav({ onResetSection, onTotalReset }: Props) {
  const pathname = usePathname() ?? "";

  return (
    <nav className="mb-6 w-full rounded-lg border border-border/80 bg-card/20 p-3">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {GROUPS.map((group) => (
            <DropdownGroup key={group.title} group={group} pathname={pathname} />
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onResetSection}
            disabled={!onResetSection}
            className={`inline-flex items-center rounded border px-3 py-1.5 text-[11px] font-mono transition-colors ${
              onResetSection
                ? "border-border text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                : "cursor-not-allowed border-border/50 text-muted-foreground/50"
            }`}
            title={
              onResetSection ? "Reset this section only" : "No local state in this section yet"
            }
          >
            Reset Section
          </button>
          <button
            type="button"
            onClick={() => {
              if (!confirmAndClearAllDevToolStorage()) return;
              onTotalReset?.();
            }}
            className="inline-flex items-center rounded border border-destructive/40 bg-background px-3 py-1.5 text-[11px] font-mono text-destructive transition-colors hover:bg-destructive/10 hover:text-destructive"
            title="Reset all dev setup state (colors, fonts, style/layout, and element defaults)"
          >
            Total reset
          </button>
        </div>
      </div>
    </nav>
  );
}
