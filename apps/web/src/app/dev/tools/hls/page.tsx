import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HlsToolsClient } from "./HlsToolsClient";

export const metadata: Metadata = {
  title: "HLS Converter (dev)",
};

export default function DevHlsToolsPage() {
  if (process.env.NODE_ENV !== "development") notFound();

  return <HlsToolsClient />;
}
