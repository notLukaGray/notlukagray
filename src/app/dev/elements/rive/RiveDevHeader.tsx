import { DevWorkbenchPageHeader } from "@/app/dev/_components/DevWorkbenchPageHeader";

export function RiveDevHeader() {
  return (
    <DevWorkbenchPageHeader
      eyebrow="Dev · Elements"
      title="Rive defaults"
      description={
        <>
          Tune <code>elementRive</code> variants, configure playback and layout behavior, then copy
          JSON. Schema: <code>element-rive-schemas.ts</code> + <code>elementLayoutSchema</code>.
          Live preview requires a real <code>.riv</code> file reference.
        </>
      }
    />
  );
}
