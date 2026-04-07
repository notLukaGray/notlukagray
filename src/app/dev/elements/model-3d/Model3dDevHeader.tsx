import { DevWorkbenchPageHeader } from "@/app/dev/_components/DevWorkbenchPageHeader";

export function Model3dDevHeader() {
  return (
    <DevWorkbenchPageHeader
      eyebrow="Dev · Elements"
      title="Model 3D defaults"
      description={
        <>
          Tune <code>elementModel3D</code> variants, configure animation behavior, then copy JSON.
          Schema: <code>element-model3d-schemas.ts</code> + <code>elementLayoutSchema</code>. Deep
          scene/model config is best handled via the Custom JSON panel.
        </>
      }
    />
  );
}
