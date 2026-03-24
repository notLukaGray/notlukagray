import type { PersonSchema } from "@/core/lib/globals";

type Props = { person: PersonSchema };

/** Injects Person JSON-LD for the root/about page so Google can surface a knowledge panel. */
export function PersonJsonLd({ person }: Props) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    jobTitle: person.jobTitle,
    url: person.url,
    ...(person.sameAs?.length > 0 && { sameAs: person.sameAs }),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
