import { DevWorkbenchPageHeader } from "@/app/dev/_components/DevWorkbenchPageHeader";

export function HeadingDevHeader() {
  return (
    <DevWorkbenchPageHeader
      eyebrow="Dev · Elements"
      title="Heading defaults"
      description={
        <>
          Tune <code>elementHeading</code> presets, preview with real typography classes, then copy
          JSON. Schema: <code>element-content-schemas.ts</code> + <code>elementLayoutSchema</code>.
        </>
      }
    />
  );
}
