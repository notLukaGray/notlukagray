import { DevWorkbenchPageHeader } from "@/app/dev/_components/DevWorkbenchPageHeader";

export function SpacerDevHeader() {
  return (
    <DevWorkbenchPageHeader
      eyebrow="Dev · Elements"
      title="Spacer defaults"
      description={
        <>
          Tune <code>elementSpacer</code> variants, preview spacing at different size variants, then
          copy JSON. Schema: <code>element-content-schemas.ts</code> +{" "}
          <code>elementLayoutSchema</code>. Spacer renders as an empty div — dashed guides are added
          in preview to make the height visible.
        </>
      }
    />
  );
}
