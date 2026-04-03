import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ElementDevPageContent } from "@/app/dev/elements/ElementDevPageContent";
import { getElementDevEntryBySlug } from "@/app/dev/elements/element-dev-registry";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = getElementDevEntryBySlug(slug);

  return {
    title: entry ? `${entry.title} (dev)` : "Elements (dev)",
    robots: { index: false, follow: false },
  };
}

export const dynamic = "force-dynamic";

export default async function ElementScaffoldDevPage({ params }: Props) {
  if (process.env.NODE_ENV !== "development") notFound();

  const { slug } = await params;
  const entry = getElementDevEntryBySlug(slug);
  if (!entry) notFound();

  return <ElementDevPageContent entry={entry} />;
}
