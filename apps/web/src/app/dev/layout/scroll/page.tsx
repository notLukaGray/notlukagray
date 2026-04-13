import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LayoutScrollDevClient } from "./LayoutScrollDevClient";

export const metadata: Metadata = {
  title: "Layout · Scroll (dev)",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function LayoutScrollDevPage() {
  if (process.env.NODE_ENV !== "development") notFound();

  return <LayoutScrollDevClient />;
}
