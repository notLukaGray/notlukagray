import { DevPlaceholderPage } from "@/app/dev/_components/DevPlaceholderPage";
import type { ElementDevEntry } from "@/app/dev/elements/element-dev-registry";
import { BodyElementDevClient } from "@/app/dev/elements/body/BodyElementDevClient";
import { HeadingElementDevClient } from "@/app/dev/elements/heading/HeadingElementDevClient";
import { ImageElementDevClient } from "@/app/dev/elements/image/ImageElementDevClient";
import { LinkElementDevClient } from "@/app/dev/elements/link/LinkElementDevClient";
import { StyleDevClient } from "@/app/dev/style/StyleDevClient";

type Props = {
  entry: ElementDevEntry;
};

export function ElementDevPageContent({ entry }: Props) {
  if (entry.editor.kind === "styleScope") {
    return <StyleDevClient scope={entry.editor.scope} />;
  }
  if (entry.editor.kind === "imageVariants") {
    return <ImageElementDevClient />;
  }
  if (entry.editor.kind === "headingDev") {
    return <HeadingElementDevClient />;
  }
  if (entry.editor.kind === "bodyDev") {
    return <BodyElementDevClient />;
  }
  if (entry.editor.kind === "linkDev") {
    return <LinkElementDevClient />;
  }

  return (
    <DevPlaceholderPage
      title={entry.title}
      description={entry.description}
      note={entry.note ?? "Defaults for this element are scaffolded and ready for implementation."}
    />
  );
}
