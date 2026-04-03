import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { StyleDevClient } from "@/app/dev/style/StyleDevClient";

export const metadata: Metadata = {
  title: "Layout · Frames (dev)",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function LayoutFramesDevPage() {
  if (process.env.NODE_ENV !== "development") notFound();

  return <StyleDevClient scope="layout-frames" />;
}
