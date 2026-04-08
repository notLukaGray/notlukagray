import { DevWorkbenchPageHeader } from "@/app/dev/_components/DevWorkbenchPageHeader";

export function ScrollProgressBarDevHeader() {
  return (
    <DevWorkbenchPageHeader
      eyebrow="Dev · Elements"
      title="Scroll progress bar defaults"
      description={
        <>
          Tune <code>elementScrollProgressBar</code> variants — height, fill, and track background —
          then copy JSON. Schema: <code>element-content-schemas.ts</code> +{" "}
          <code>elementLayoutSchema</code>. In the dev preview the bar tracks scroll of its
          container; it may show at 0% fill in the workbench.
        </>
      }
    />
  );
}
