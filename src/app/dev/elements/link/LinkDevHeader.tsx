import { DevWorkbenchPageHeader } from "@/app/dev/_components/DevWorkbenchPageHeader";

export function LinkDevHeader() {
  return (
    <DevWorkbenchPageHeader
      eyebrow="Dev · Elements"
      title="Link defaults"
      description={
        <>
          Tune <code>elementLink</code> presets (body vs heading copy, link tokens, layout). Schema:{" "}
          <code>element-content-schemas.ts</code> + <code>elementLayoutSchema</code>.
        </>
      }
    />
  );
}
