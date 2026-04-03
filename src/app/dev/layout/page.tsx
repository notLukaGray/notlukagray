import { notFound, redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default function LayoutDevIndexPage() {
  if (process.env.NODE_ENV !== "development") notFound();
  redirect("/dev/layout/frames");
}
