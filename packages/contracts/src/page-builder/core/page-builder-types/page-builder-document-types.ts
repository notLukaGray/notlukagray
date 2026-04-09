import type { bgBlock } from "./background-block-types";
import type { ElementBlock } from "./element-block-types";
import type { SectionBlock } from "./section-block-types";
import type { TriggerAction } from "./trigger-action-types";

export type BackgroundTransitionEffect =
  | {
      type: "TIME";
      id: string;
      from: string;
      to: string;
      duration: number;
      easing?: string;
    }
  | {
      type: "TRIGGER";
      id: string;
      from: string;
      to: string;
      duration: number;
      easing?: string;
    }
  | {
      type: "SCROLL";
      id: string;
      from: string;
      to: string;
      source?: "page" | "trigger";
      progress?: number;
      progressRange?: { start: number; end: number };
    };

export type ResolvedPage = {
  slug: string;
  title: string;
  description?: string;
  ogImage?: string;
  bg?: bgBlock;
  sections?: SectionBlock[];
  passwordProtected?: boolean;
  assetBaseUrl?: string;
  onPageProgress?: TriggerAction;
  transitions?: BackgroundTransitionEffect | BackgroundTransitionEffect[];
};

export type SectionBlockWithElementOrder = Omit<
  Extract<SectionBlock, { elements: ElementBlock[] }>,
  "elements"
> & { elementOrder: string[] };

export type PageBuilderDefinitionBlock =
  | bgBlock
  | SectionBlock
  | SectionBlockWithElementOrder
  | ElementBlock;

export type PageBuilder = {
  slug: string;
  title: string;
  definitions: Record<string, PageBuilderDefinitionBlock>;
  sectionOrder: string[];
  preset?: Record<string, PageBuilderDefinitionBlock>;
  presets?: string[];
  triggers?: string[];
  bgKey?: string;
  passwordProtected?: boolean;
  assetBaseUrl?: string;
  onPageProgress?: TriggerAction;
  description?: string;
  ogImage?: string;
  transitions?: BackgroundTransitionEffect | BackgroundTransitionEffect[];
};
