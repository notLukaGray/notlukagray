import { setCoreConfig } from "@pb/core";
import { pbBuilderDefaultsV1 } from "@/app/theme/pb-builder-defaults";
import { pbContentGuidelines } from "@/app/theme/pb-content-guidelines-config";
import { getProductionWorkbenchSession } from "@/app/dev/workbench/workbench-defaults";

setCoreConfig({
  builderDefaults: {
    ...pbBuilderDefaultsV1,
    workbenchElements: getProductionWorkbenchSession().elements,
  },
  contentGuidelines: pbContentGuidelines,
});
