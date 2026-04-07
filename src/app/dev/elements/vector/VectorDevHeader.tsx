import { DevWorkbenchPageHeader } from "@/app/dev/_components/DevWorkbenchPageHeader";

export function VectorDevHeader() {
  return (
    <DevWorkbenchPageHeader
      eyebrow="Dev · Elements"
      title="Vector defaults"
      description={
        <>
          Tune <code>elementVector</code> variants, preview with shape rendering, then copy JSON.
          Schema: <code>element-content-schemas.ts</code> + <code>elementLayoutSchema</code>.
        </>
      }
    />
  );
}
