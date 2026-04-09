/* eslint-disable max-lines */
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  pbContentGuidelinesConfigFileExport,
  type PbContentGuidelines,
} from "@/app/theme/pb-content-guidelines-config";
import {
  emptyLocks,
  mergeGuidelinesWithLocks,
  PB_GUIDELINE_KEYS,
  proposePbContentGuidelines,
  resolveSpacingScaleFromSeeds,
  type StyleToolSeeds,
} from "@/app/theme/pb-style-suggest";
import { deriveSectionMarginScale, type SectionMarginScale } from "@/app/theme/pb-spacing-tokens";
import { DEV_NEUTRAL_STYLE_SEEDS } from "@/app/dev/style/style-tool-baseline";
import {
  coerceStyleToolPersisted,
  getDefaultStyleToolPersistedV3,
  type StyleToolPersistedV3,
} from "@/app/dev/style/style-tool-persistence";
import { DevWorkbenchNav } from "@/app/dev/_components/DevWorkbenchNav";
import { DevWorkbenchPageHeader } from "@/app/dev/_components/DevWorkbenchPageHeader";
import { DevWorkbenchPageShell } from "@/app/dev/_components/DevWorkbenchPageShell";
import {
  clearWorkbenchStyle,
  getWorkbenchSession,
  patchWorkbenchStyle,
  WORKBENCH_SESSION_CHANGED_EVENT,
  WORKBENCH_SESSION_STORAGE_KEY,
} from "@/app/dev/workbench/workbench-session";
import type { PageDensity } from "@pb/contracts";
import {
  guidelinesToPreviewStyle,
  parseFieldInput,
  SCOPE_CONFIG,
  SECTIONS,
  type StyleDevScope,
} from "./style-dev-config";
import { StyleGlobalSeedsPanel } from "./style-global-seeds-panel";
import { StyleGuidelineSections } from "./style-guideline-sections";
import { StyleHandoffPanel } from "./style-handoff-panel";
import { renderStyleScopeDescription } from "./style-scope-description";

function mergeSectionMarginsWithLocks(
  previous: Pick<StyleToolPersistedV3, "sectionMarginScale" | "sectionMarginScaleLocks">,
  spacingScale: StyleToolPersistedV3["spacingScale"]
): SectionMarginScale {
  const derived = deriveSectionMarginScale(spacingScale);
  for (const key of Object.keys(derived) as (keyof SectionMarginScale)[]) {
    if (previous.sectionMarginScaleLocks[key]) {
      derived[key] = previous.sectionMarginScale[key];
    }
  }
  return derived;
}

function toSpacingLocks(seedLocks: StyleToolSeeds["spacingScaleLocks"]): StyleToolPersistedV3["spacingScaleLocks"] {
  const out: StyleToolPersistedV3["spacingScaleLocks"] = {
    none: false,
    xs: false,
    sm: false,
    md: false,
    lg: false,
    xl: false,
    "2xl": false,
    "3xl": false,
    "4xl": false,
  };
  for (const key of ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"] as const) {
    out[key] = seedLocks?.[key] === true;
  }
  return out;
}

export function StyleDevClient({ scope = "foundations" }: { scope?: StyleDevScope }) {
  const view = SCOPE_CONFIG[scope];
  const [initialStyle] = useState(
    () => coerceStyleToolPersisted(getWorkbenchSession().style) ?? getDefaultStyleToolPersistedV3()
  );
  const [seeds, setSeeds] = useState<StyleToolSeeds>(
    () => initialStyle?.seeds ?? { ...DEV_NEUTRAL_STYLE_SEEDS }
  );
  const [locks, setLocks] = useState<Record<keyof PbContentGuidelines, boolean>>(
    () => initialStyle?.locks ?? emptyLocks()
  );
  const [guidelines, setGuidelines] = useState<PbContentGuidelines>(() => {
    return mergeGuidelinesWithLocks(
      proposePbContentGuidelines(initialStyle.seeds),
      initialStyle.guidelines,
      initialStyle.locks
    );
  });
  const [foundationSlices, setFoundationSlices] = useState<
    Pick<
      StyleToolPersistedV3,
      | "shadowScale"
      | "shadowScaleDark"
      | "borderWidthScale"
      | "motion"
      | "breakpoints"
      | "contentWidths"
      | "sectionMarginScale"
      | "sectionMarginScaleLocks"
    >
  >(() => ({
    shadowScale: initialStyle.shadowScale,
    shadowScaleDark: initialStyle.shadowScaleDark,
    borderWidthScale: initialStyle.borderWidthScale,
    motion: initialStyle.motion,
    breakpoints: initialStyle.breakpoints,
    contentWidths: initialStyle.contentWidths,
    sectionMarginScale: initialStyle.sectionMarginScale,
    sectionMarginScaleLocks: initialStyle.sectionMarginScaleLocks,
  }));
  const [previewDensity, setPreviewDensity] = useState<PageDensity>("balanced");
  const [exportCopied, setExportCopied] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const syncStyleFromSession = () => {
      const saved = coerceStyleToolPersisted(getWorkbenchSession().style);
      if (!saved) {
        const nextSeeds = { ...DEV_NEUTRAL_STYLE_SEEDS };
        setSeeds(nextSeeds);
        setLocks(emptyLocks());
        setGuidelines(proposePbContentGuidelines(nextSeeds));
        const defaults = getDefaultStyleToolPersistedV3();
        setFoundationSlices({
          shadowScale: defaults.shadowScale,
          shadowScaleDark: defaults.shadowScaleDark,
          borderWidthScale: defaults.borderWidthScale,
          motion: defaults.motion,
          breakpoints: defaults.breakpoints,
          contentWidths: defaults.contentWidths,
          sectionMarginScale: defaults.sectionMarginScale,
          sectionMarginScaleLocks: defaults.sectionMarginScaleLocks,
        });
        return;
      }
      setSeeds(saved.seeds);
      setLocks(saved.locks);
      setGuidelines(
        mergeGuidelinesWithLocks(
          proposePbContentGuidelines(saved.seeds),
          saved.guidelines,
          saved.locks
        )
      );
      setFoundationSlices({
        shadowScale: saved.shadowScale,
        shadowScaleDark: saved.shadowScaleDark,
        borderWidthScale: saved.borderWidthScale,
        motion: saved.motion,
        breakpoints: saved.breakpoints,
        contentWidths: saved.contentWidths,
        sectionMarginScale: saved.sectionMarginScale,
        sectionMarginScaleLocks: saved.sectionMarginScaleLocks,
      });
    };
    const onStorage = (event: StorageEvent) => {
      if (event.key === WORKBENCH_SESSION_STORAGE_KEY) syncStyleFromSession();
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener(WORKBENCH_SESSION_CHANGED_EVENT, syncStyleFromSession);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(WORKBENCH_SESSION_CHANGED_EVENT, syncStyleFromSession);
    };
  }, []);

  useEffect(() => {
    const spacingScale = resolveSpacingScaleFromSeeds(seeds);
    const spacingScaleLocks = toSpacingLocks(seeds.spacingScaleLocks);
    const sectionMarginScale = mergeSectionMarginsWithLocks(
      {
        sectionMarginScale: foundationSlices.sectionMarginScale,
        sectionMarginScaleLocks: foundationSlices.sectionMarginScaleLocks,
      },
      spacingScale
    );
    const payload: StyleToolPersistedV3 = {
      v: 3,
      seeds,
      locks,
      guidelines,
      spacingScale,
      spacingScaleLocks,
      shadowScale: foundationSlices.shadowScale,
      shadowScaleDark: foundationSlices.shadowScaleDark,
      borderWidthScale: foundationSlices.borderWidthScale,
      motion: foundationSlices.motion,
      breakpoints: foundationSlices.breakpoints,
      contentWidths: foundationSlices.contentWidths,
      sectionMarginScale,
      sectionMarginScaleLocks: foundationSlices.sectionMarginScaleLocks,
    };
    patchWorkbenchStyle(payload);
  }, [foundationSlices, guidelines, locks, seeds]);

  const onSeedsChange = useCallback(
    (patch: Partial<StyleToolSeeds>) => {
      setSeeds((prevSeeds) => {
        const nextSeeds = { ...prevSeeds, ...patch };
        setGuidelines((prevGuidelines) =>
          mergeGuidelinesWithLocks(proposePbContentGuidelines(nextSeeds), prevGuidelines, locks)
        );
        return nextSeeds;
      });
    },
    [locks]
  );

  const toggleLock = useCallback(
    (key: keyof PbContentGuidelines) => {
      setLocks((prevLocks) => {
        const nextLocks = { ...prevLocks, [key]: !prevLocks[key] };
        setGuidelines((prevGuidelines) =>
          mergeGuidelinesWithLocks(proposePbContentGuidelines(seeds), prevGuidelines, nextLocks)
        );
        return nextLocks;
      });
    },
    [seeds]
  );

  const onFieldEdit = useCallback((key: keyof PbContentGuidelines, raw: string) => {
    setLocks((prevLocks) => ({ ...prevLocks, [key]: true }));
    setGuidelines((prev) => ({ ...prev, [key]: parseFieldInput(key, raw) }));
  }, []);

  const resetStyleTool = () => {
    clearWorkbenchStyle();
    const nextSeeds = { ...DEV_NEUTRAL_STYLE_SEEDS };
    setSeeds(nextSeeds);
    setLocks(emptyLocks());
    setGuidelines(proposePbContentGuidelines(nextSeeds));
    setExportCopied(false);
  };

  const visibleSections = useMemo(
    () => SECTIONS.filter((section) => view.sectionTitles.includes(section.title)),
    [view.sectionTitles]
  );
  const visibleKeys = useMemo(
    () => visibleSections.flatMap((section) => section.keys),
    [visibleSections]
  );
  const allUnlocked = visibleKeys.every((key) => !locks[key]);
  const previewVars = useMemo(() => guidelinesToPreviewStyle(guidelines), [guidelines]);
  const proposed = useMemo(() => proposePbContentGuidelines(seeds), [seeds]);
  const exportText = useMemo(() => pbContentGuidelinesConfigFileExport(guidelines), [guidelines]);

  const resetVisibleSection = useCallback(() => {
    const targetKeys = scope === "all" ? PB_GUIDELINE_KEYS : visibleKeys;
    const shouldResetSeeds = scope === "all" || view.showGlobalSeeds;
    const seedSource = shouldResetSeeds ? { ...DEV_NEUTRAL_STYLE_SEEDS } : seeds;
    if (shouldResetSeeds) setSeeds(seedSource);
    setLocks((prevLocks) => {
      const nextLocks = { ...prevLocks };
      for (const key of targetKeys) nextLocks[key] = false;
      setGuidelines((prevGuidelines) =>
        mergeGuidelinesWithLocks(proposePbContentGuidelines(seedSource), prevGuidelines, nextLocks)
      );
      return nextLocks;
    });
    setExportCopied(false);
  }, [scope, seeds, view.showGlobalSeeds, visibleKeys]);

  const copyExport = async () => {
    try {
      await navigator.clipboard.writeText(exportText);
      setExportCopied(true);
      setTimeout(() => setExportCopied(false), 2000);
    } catch {
      // Ignore clipboard failures.
    }
  };

  return (
    <DevWorkbenchPageShell
      nav={<DevWorkbenchNav onResetSection={resetVisibleSection} onTotalReset={resetStyleTool} />}
    >
      <DevWorkbenchPageHeader
        eyebrow="Dev · Style"
        title={view.title}
        description={renderStyleScopeDescription(scope)}
        meta={
          <>
            <p className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
              {view.kicker}
            </p>
            {visibleKeys.length > 0 && allUnlocked ? (
              <p className="mt-2 text-amber-700 dark:text-amber-400">
                Full-fluid: every row follows seeds. Lock any token to pin it.
              </p>
            ) : null}
          </>
        }
      />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,1fr)_minmax(17.5rem,26.25rem)] md:items-start">
        <div className="space-y-6">
          {view.showGlobalSeeds ? (
            <StyleGlobalSeedsPanel
              seeds={seeds}
              previewDensity={previewDensity}
              onSeedsChange={onSeedsChange}
              onPreviewDensityChange={setPreviewDensity}
            />
          ) : null}
          <StyleGuidelineSections
            visibleSections={visibleSections}
            locks={locks}
            guidelines={guidelines}
            proposed={proposed}
            onFieldEdit={onFieldEdit}
            toggleLock={toggleLock}
            previewVars={previewVars}
            previewDensity={previewDensity}
          />
        </div>

        <div className="md:sticky md:top-8">
          <StyleHandoffPanel
            exportText={exportText}
            exportCopied={exportCopied}
            onCopy={() => void copyExport()}
          />
        </div>
      </div>
    </DevWorkbenchPageShell>
  );
}
