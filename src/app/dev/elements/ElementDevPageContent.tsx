import type { ReactNode } from "react";
import { StyleDevClient } from "@/app/dev/style/StyleDevClient";
import type { ElementDevEditor, ElementDevEntry } from "@/app/dev/elements/element-dev-registry";
import { ElementScaffoldEditor } from "@/app/dev/elements/_shared/ElementScaffoldEditor";
import { BodyElementDevClient } from "@/app/dev/elements/body";
import { HeadingElementDevClient } from "@/app/dev/elements/heading";
import { ImageElementDevClient } from "@/app/dev/elements/image";
import { LinkElementDevClient } from "@/app/dev/elements/link";

type Renderer = (entry: ElementDevEntry) => ReactNode;

const EDITOR_RENDERERS: Record<
  Exclude<ElementDevEditor["kind"], "placeholder" | "styleScope">,
  Renderer
> = {
  imageVariants: () => <ImageElementDevClient />,
  headingDev: () => <HeadingElementDevClient />,
  bodyDev: () => <BodyElementDevClient />,
  linkDev: () => <LinkElementDevClient />,
};

function renderStyleScope(entry: ElementDevEntry): ReactNode {
  if (entry.editor.kind !== "styleScope") return null;
  return <StyleDevClient scope={entry.editor.scope} />;
}

export function ElementDevPageContent({ entry }: { entry: ElementDevEntry }) {
  if (entry.editor.kind === "styleScope") {
    return renderStyleScope(entry);
  }

  const renderer = entry.editor.kind === "placeholder" ? null : EDITOR_RENDERERS[entry.editor.kind];
  return renderer ? renderer(entry) : <ElementScaffoldEditor entry={entry} />;
}
