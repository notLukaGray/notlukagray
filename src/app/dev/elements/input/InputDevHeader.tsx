import { DevWorkbenchPageHeader } from "@/app/dev/_components/DevWorkbenchPageHeader";

export function InputDevHeader() {
  return (
    <DevWorkbenchPageHeader
      eyebrow="Dev · Elements"
      title="Input defaults"
      description={
        <>
          Tune <code>elementInput</code> variants, preview with real layout, then copy JSON. Schema:{" "}
          <code>element-input-schemas.ts</code> + <code>elementLayoutSchema</code>.
        </>
      }
    />
  );
}
