import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { DevPlaceholderPage } from "@/app/dev/_components/DevPlaceholderPage";

export const metadata: Metadata = {
  title: "Layout · Sections (dev)",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function LayoutSectionsDevPage() {
  if (process.env.NODE_ENV !== "development") notFound();

  return (
    <DevPlaceholderPage
      title="Layout · Sections"
      description="Section-level defaults will land here (content width/height, spacing rails, and section-level baseline behavior)."
      note="For now, frame/layout tuning still runs in Layout → Frames."
    />
  );
}
