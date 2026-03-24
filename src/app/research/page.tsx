import Link from "next/link";
import { getPageSlugsByBase } from "@/page-builder/core/page-builder";
import { loadPageBuilder } from "@/page-builder/core/page-builder-load";

export default function ResearchPage() {
  const slugs = getPageSlugsByBase("/research");
  const titles = slugs.map((slug) => {
    const page = loadPageBuilder(slug);
    return { slug, title: page?.title ?? slug };
  });

  return (
    <main className="flex min-h-[60dvh] flex-col items-center px-4 py-12">
      <h1 className="typography-heading-primary-bold text-center">Research</h1>
      {titles.length === 0 ? (
        <p className="typography-body-large-regular mt-4 text-center text-white/70">Coming soon.</p>
      ) : (
        <ul className="mt-8 flex flex-col gap-4">
          {titles.map(({ slug, title }) => (
            <li key={slug}>
              <Link
                href={`/research/${slug}`}
                className="typography-body-large-regular text-white underline hover:no-underline"
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
