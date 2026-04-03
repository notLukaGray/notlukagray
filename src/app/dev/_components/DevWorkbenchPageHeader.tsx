import type { ReactNode } from "react";

export type DevWorkbenchPageHeaderProps = {
  /** Top label, mono caps (e.g. `Dev · Elements`). */
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  /** Smaller secondary block (notes, warnings) under the main description. */
  meta?: ReactNode;
};

const DEFAULT_EYEBROW = "Dev · Workbench";

/**
 * Page title stack used across element dev tools (reference: body element).
 * Keep descriptions at `text-sm`; use `meta` for `text-[11px]` auxiliary copy.
 */
export function DevWorkbenchPageHeader({
  eyebrow = DEFAULT_EYEBROW,
  title,
  description,
  meta,
}: DevWorkbenchPageHeaderProps) {
  return (
    <header className="space-y-2 pb-6">
      <p className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
        {eyebrow}
      </p>
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h1>
      {description ? (
        <div className="max-w-3xl text-sm leading-relaxed text-muted-foreground [&_strong]:font-semibold [&_strong]:text-foreground/90 [&_code]:font-mono [&_code]:text-[13px]">
          {description}
        </div>
      ) : null}
      {meta ? (
        <div className="max-w-3xl text-[11px] leading-relaxed text-muted-foreground [&_code]:font-mono [&_code]:text-[0.95em] [&_strong]:font-semibold [&_strong]:text-foreground/90">
          {meta}
        </div>
      ) : null}
    </header>
  );
}
