import { DevWorkbenchPageHeader } from "@/app/dev/_components/DevWorkbenchPageHeader";

export function ImageDevHeader() {
  return (
    <DevWorkbenchPageHeader
      eyebrow="Dev · Elements"
      title="Image defaults"
      description={
        <>
          Tune <code>elementImage</code> variants — layout, traits, motion (preset / hybrid /
          custom), and runtime metadata. Schema: image fields in{" "}
          <code>element-content-schemas.ts</code> plus shared layout.
        </>
      }
      meta={
        <>
          Seeds: Hero, Inline, Full Cover, and Feature from{" "}
          <code>pbBuilderDefaultsV1.elements.image</code>.
        </>
      }
    />
  );
}
