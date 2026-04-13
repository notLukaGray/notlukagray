import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LayoutDevIndexClient } from "./LayoutDevIndexClient";

export const metadata: Metadata = {
  title: "Layout Workbench (dev)",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function LayoutDevIndexPage() {
  if (process.env.NODE_ENV !== "development") notFound();
  return <LayoutDevIndexClient />;
}
