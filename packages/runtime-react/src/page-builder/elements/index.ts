import type { ComponentType } from "react";
import type { ElementBlock } from "@pb/contracts/page-builder/core/page-builder-schemas";
import { ElementHeading } from "./ElementHeading";
import { ElementBody } from "./ElementBody";
import { ElementLink } from "./ElementLink";
import { ElementImage } from "./ElementImage";
import { ElementVideo } from "./ElementVideo";
import { ElementRichText } from "./ElementRichText";
import { ElementVector } from "./ElementVector";
import { ElementSVG } from "./ElementSVG";
import { ElementRange } from "./ElementRange";
import { ElementInput } from "./ElementInput";
import { ElementVideoTime } from "./ElementVideoTime";
import { ElementSpacer } from "./ElementSpacer";
import { ElementDivider } from "./ElementDivider";
import { ElementButton } from "./ElementButton";
import { ElementScrollProgressBar } from "./ElementScrollProgressBar";
import dynamic from "next/dynamic";

const ElementModuleGroup = dynamic(
  () => import("./ElementModule").then((mod) => mod.ElementModuleGroup),
  {
    loading: () => null,
  }
) as unknown as ComponentType<ElementBlock>;

const ElementModel3D = dynamic(() => import("./Element3D").then((mod) => mod.ElementModel3D), {
  loading: () => null,
}) as unknown as ComponentType<ElementBlock>;

const ElementRive = dynamic(() => import("./ElementRive").then((mod) => mod.ElementRive), {
  loading: () => null,
}) as unknown as ComponentType<ElementBlock>;

export {
  ElementHeading,
  ElementBody,
  ElementLink,
  ElementImage,
  ElementVector,
  ElementSVG,
  ElementRange,
  ElementInput,
  ElementVideoTime,
  ElementSpacer,
  ElementDivider,
  ElementButton,
  ElementScrollProgressBar,
};

export const ELEMENT_COMPONENTS: Record<string, ComponentType<ElementBlock>> = {
  elementHeading: ElementHeading as ComponentType<ElementBlock>,
  elementBody: ElementBody as ComponentType<ElementBlock>,
  elementLink: ElementLink as ComponentType<ElementBlock>,
  elementImage: ElementImage as ComponentType<ElementBlock>,
  elementVideo: ElementVideo as ComponentType<ElementBlock>,
  elementVector: ElementVector as ComponentType<ElementBlock>,
  elementSVG: ElementSVG as ComponentType<ElementBlock>,
  elementRichText: ElementRichText as ComponentType<ElementBlock>,
  elementRange: ElementRange as ComponentType<ElementBlock>,
  elementInput: ElementInput as ComponentType<ElementBlock>,
  elementVideoTime: ElementVideoTime as ComponentType<ElementBlock>,
  elementSpacer: ElementSpacer as ComponentType<ElementBlock>,
  elementDivider: ElementDivider as ComponentType<ElementBlock>,
  elementScrollProgressBar: ElementScrollProgressBar as ComponentType<ElementBlock>,
  elementButton: ElementButton as ComponentType<ElementBlock>,
  elementModel3D: ElementModel3D as ComponentType<ElementBlock>,
  elementRive: ElementRive as ComponentType<ElementBlock>,
  elementGroup: ElementModuleGroup as ComponentType<ElementBlock>,
};
