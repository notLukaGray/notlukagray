import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { StyleDevClient } from "./StyleDevClient";

export const metadata: Metadata = {
  title: "Spacing / Style (dev)",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function StyleDevPage() {
  if (process.env.NODE_ENV !== "development") notFound();

  return <StyleDevClient scope="foundations" />;
}
