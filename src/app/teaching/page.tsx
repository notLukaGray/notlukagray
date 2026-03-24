import Link from "next/link";
import { getPageSlugsByBase } from "@/page-builder/core/page-builder";
import { loadPageBuilder } from "@/page-builder/core/page-builder-load";

export default function TeachingIndexPage() {
  const slugs = getPageSlugsByBase("/teaching");
  const items = slugs.map((slug) => {
    const page = loadPageBuilder(slug);
    return { slug, title: page?.title ?? slug };
  });

  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-24 md:py-32">
      <h1 className="typography-heading-primary-bold mb-12 text-center">Teaching</h1>
      {items.length === 0 ? (
        <p className="typography-body-large-regular text-center text-white/70">Coming soon.</p>
      ) : (
        <ul className="flex flex-col gap-1" role="list">
          {items.map(({ slug, title }) => (
            <li key={slug}>
              <Link
                href={`/teaching/${slug}`}
                className="typography-body-medium-regular frame-link block py-2 transition-colors"
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
