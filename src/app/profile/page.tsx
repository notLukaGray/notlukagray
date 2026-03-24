import { headers } from "next/headers";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getPageBuilderPropsAsync,
  isMobileFromUserAgent,
  PageBuilderPage,
} from "@/page-builder/core/page-builder";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Profile",
    description: "About and contact — placeholder.",
  };
}

export default async function ProfilePage() {
  const headersList = await headers();
  const isMobile = isMobileFromUserAgent(headersList.get("user-agent") ?? "");
  const props = await getPageBuilderPropsAsync("profile", { isMobile });
  if (!props) notFound();
  return <PageBuilderPage {...props} />;
}
