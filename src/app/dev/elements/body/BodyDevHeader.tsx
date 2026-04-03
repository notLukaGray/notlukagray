import { DevWorkbenchPageHeader } from "@/app/dev/_components/DevWorkbenchPageHeader";

export function BodyDevHeader() {
  return (
    <DevWorkbenchPageHeader
      eyebrow="Dev · Elements"
      title="Body defaults"
      description={
        <>
          Tune presets for <code>elementBody</code> and copy JSON. Schema:{" "}
          <code>element-content-schemas.ts</code> + <code>elementLayoutSchema</code>.
        </>
      }
    />
  );
}
