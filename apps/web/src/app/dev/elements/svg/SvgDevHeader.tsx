import { DevWorkbenchPageHeader } from "@/app/dev/_components/DevWorkbenchPageHeader";

export function SvgDevHeader() {
  return (
    <DevWorkbenchPageHeader
      eyebrow="Dev · Elements"
      title="SVG defaults"
      description={
        <>
          Tune <code>elementSVG</code> variants, preview with raw markup rendering, then copy JSON.
          Schema: <code>element-content-schemas.ts</code> + <code>elementLayoutSchema</code>.
        </>
      }
    />
  );
}
