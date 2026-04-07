import { DevWorkbenchPageHeader } from "@/app/dev/_components/DevWorkbenchPageHeader";

export function ButtonDevHeader() {
  return (
    <DevWorkbenchPageHeader
      eyebrow="Dev · Elements"
      title="Button defaults"
      description={
        <>
          Tune <code>elementButton</code> variants, preview them in-page, then copy JSON. Schema:{" "}
          <code>element-button-schemas.ts</code> + <code>elementLayoutSchema</code>.
        </>
      }
    />
  );
}
