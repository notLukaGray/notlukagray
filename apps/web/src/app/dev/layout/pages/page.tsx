import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { DevPlaceholderPage } from "@/app/dev/_components/DevPlaceholderPage";

export const metadata: Metadata = {
  title: "Layout · Pages (dev)",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function LayoutPagesDevPage() {
  if (process.env.NODE_ENV !== "development") notFound();

  return (
    <DevPlaceholderPage
      title="Layout · Pages"
      description="Page-level layout defaults will live here (grid, content width policies, page wrappers, and route-level chrome)."
      note="Module and modal builders are intentionally backburnered for now."
    />
  );
}
