import { DevWorkbenchPageHeader } from "@/app/dev/_components/DevWorkbenchPageHeader";

export function RichTextDevHeader() {
  return (
    <DevWorkbenchPageHeader
      eyebrow="Dev · Elements"
      title="Rich text defaults"
      description={
        <>
          Tune <code>elementRichText</code> variants, preview markdown/HTML output, then copy JSON.
          Schema: <code>element-content-schemas.ts</code> + <code>elementLayoutSchema</code>.
        </>
      }
    />
  );
}
