import { DevWorkbenchPageHeader } from "@/app/dev/_components/DevWorkbenchPageHeader";

export function RangeDevHeader() {
  return (
    <DevWorkbenchPageHeader
      eyebrow="Dev · Elements"
      title="Range defaults"
      description={
        <>
          Tune <code>elementRange</code> variants, preview with real layout, then copy JSON. Schema:{" "}
          <code>element-range-schemas.ts</code> + <code>elementLayoutSchema</code>.
        </>
      }
    />
  );
}
