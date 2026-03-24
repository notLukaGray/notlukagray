import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Typography style guide",
  description: "Test page for headings, body, and font weight styles",
};

const LOREM_HEADING = "LOREM IPSUM";
const LOREM_SUB = "lorem ipsum";
const BODY_NORMAL = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ";
const BODY_ITALIC =
  "Donec sit amet fermentum mi, nec mollis risus. Mauris lobortis quam odio, a porttitor pharetra interdum est.";

type TypographySpec = {
  font: string;
  size: string;
  letterSpacing: string;
  lineHeight: string;
  weight?: string;
};

function SpecList({ spec }: { spec: TypographySpec }) {
  return (
    <dl className="typography-body-legal-light mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5 text-muted-foreground">
      <dt className="font-mono text-[11px]">Font:</dt>
      <dd className="font-mono text-[11px]">{spec.font}</dd>
      {spec.weight !== undefined && (
        <>
          <dt className="font-mono text-[11px]">Weight:</dt>
          <dd className="font-mono text-[11px]">{spec.weight}</dd>
        </>
      )}
      <dt className="font-mono text-[11px]">Size:</dt>
      <dd className="font-mono text-[11px]">{spec.size}</dd>
      <dt className="font-mono text-[11px]">Letter Spacing:</dt>
      <dd className="font-mono text-[11px]">{spec.letterSpacing}</dd>
      <dt className="font-mono text-[11px]">Line Height:</dt>
      <dd className="font-mono text-[11px]">{spec.lineHeight}</dd>
    </dl>
  );
}

const FONT_WEIGHTS: Array<{
  id: string;
  label: string;
  className: string;
  spec: TypographySpec;
}> = [
  {
    id: "bold",
    label: "Exo Bold",
    className: "typography-font-bold",
    spec: {
      font: "typography-font-bold",
      weight: "900",
      size: "16px (sample)",
      letterSpacing: "0",
      lineHeight: "24px (1.5)",
    },
  },
  {
    id: "regular",
    label: "Exo Regular",
    className: "typography-font-regular",
    spec: {
      font: "typography-font-regular",
      weight: "700",
      size: "16px (sample)",
      letterSpacing: "0",
      lineHeight: "24px (1.5)",
    },
  },
  {
    id: "book",
    label: "Exo Book",
    className: "typography-font-book",
    spec: {
      font: "typography-font-book",
      weight: "500",
      size: "16px (sample)",
      letterSpacing: "0",
      lineHeight: "24px (1.5)",
    },
  },
  {
    id: "light",
    label: "Exo Light",
    className: "typography-font-light",
    spec: {
      font: "typography-font-light",
      weight: "300",
      size: "16px (sample)",
      letterSpacing: "0",
      lineHeight: "24px (1.5)",
    },
  },
  {
    id: "thin",
    label: "Exo Thin",
    className: "typography-font-thin",
    spec: {
      font: "typography-font-thin",
      weight: "100",
      size: "16px (sample)",
      letterSpacing: "0",
      lineHeight: "24px (1.5)",
    },
  },
];

const HEADINGS: Array<{
  id: string;
  label: string;
  className: string;
  spec: TypographySpec;
  sample: React.ReactNode;
}> = [
  {
    id: "h1",
    label: "H1 — Heading Primary Bold",
    className: "typography-heading-primary-bold",
    spec: {
      font: "typography-font-bold",
      size: "44px (mobile) / 76px (md+)",
      letterSpacing: "0",
      lineHeight: "48px (1.1) / 84px (1.1)",
    },
    sample: (
      <>
        {LOREM_HEADING}
        <br />
        {LOREM_SUB}
      </>
    ),
  },
  {
    id: "h2",
    label: "H2 — Heading Secondary Bold",
    className: "typography-heading-secondary-bold",
    spec: {
      font: "typography-font-bold",
      size: "30px (mobile) / 50px (md+)",
      letterSpacing: "0",
      lineHeight: "33px (1.1) / 55px (1.1)",
    },
    sample: (
      <>
        {LOREM_HEADING}
        <br />
        {LOREM_SUB}
      </>
    ),
  },
  {
    id: "h3",
    label: "H3 — Heading Tertiary Bold",
    className: "typography-heading-tertiary-bold",
    spec: {
      font: "typography-font-bold",
      size: "26px (mobile) / 30px (md+)",
      letterSpacing: "0",
      lineHeight: "29px (1.1) / 33px (1.1)",
    },
    sample: (
      <>
        {LOREM_HEADING}
        <br />
        {LOREM_SUB}
      </>
    ),
  },
  {
    id: "h4",
    label: "H4 — Heading Tertiary Light",
    className: "typography-heading-tertiary-light",
    spec: {
      font: "typography-font-light",
      size: "24px (mobile) / 30px (md+)",
      letterSpacing: "0",
      lineHeight: "26px (1.1) / 33px (1.1)",
    },
    sample: (
      <>
        {LOREM_HEADING}
        <br />
        {LOREM_SUB}
      </>
    ),
  },
  {
    id: "h5",
    label: "H5 — Heading Card Bold",
    className: "typography-heading-card-bold",
    spec: {
      font: "typography-font-bold",
      size: "18px (mobile) / 22px (md+)",
      letterSpacing: "0",
      lineHeight: "20px (1.1) / 24px (1.1)",
    },
    sample: (
      <>
        {LOREM_HEADING}
        <br />
        {LOREM_SUB}
      </>
    ),
  },
];

const BODY_STYLES: Array<{
  id: string;
  label: string;
  className: string;
  spec: TypographySpec;
}> = [
  {
    id: "p1",
    label: "P1 — Body large book",
    className: "typography-body-large-regular",
    spec: {
      font: "typography-font-book",
      size: "16px",
      letterSpacing: "0",
      lineHeight: "24px (1.5)",
    },
  },
  {
    id: "p2",
    label: "P2 — Body large thin",
    className: "typography-body-large-thin",
    spec: {
      font: "typography-font-thin",
      size: "16px",
      letterSpacing: "0",
      lineHeight: "24px (1.5)",
    },
  },
  {
    id: "p3",
    label: "P3 — Body medium book",
    className: "typography-body-medium-regular",
    spec: {
      font: "typography-font-book",
      size: "12px",
      letterSpacing: "0",
      lineHeight: "18px (1.5)",
    },
  },
  {
    id: "p4",
    label: "P4 — Body medium thin",
    className: "typography-body-medium-thin",
    spec: {
      font: "typography-font-thin",
      size: "12px",
      letterSpacing: "0",
      lineHeight: "18px (1.5)",
    },
  },
  {
    id: "p5",
    label: "P5 — Body legal regular",
    className: "typography-body-legal-book",
    spec: {
      font: "typography-font-regular",
      size: "8px",
      letterSpacing: "0",
      lineHeight: "12px",
    },
  },
  {
    id: "p6",
    label: "P6 — Body legal light",
    className: "typography-body-legal-light",
    spec: {
      font: "typography-font-light",
      size: "8px",
      letterSpacing: "0",
      lineHeight: "12px",
    },
  },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-b border-border pb-8 md:pb-12 last:border-0">
      <h2 className="typography-heading-tertiary-bold mb-6 md:mb-8">{title}</h2>
      <div className="flex flex-col gap-6 md:gap-10">{children}</div>
    </section>
  );
}

function SampleRow({
  label,
  className,
  spec,
  children,
}: {
  label: string;
  className: string;
  spec?: TypographySpec;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-start md:gap-8 border-b border-border/50 pb-6 last:border-0 last:pb-0">
      <div className="md:min-w-[220px] md:shrink-0 md:max-w-[280px]">
        <p className="typography-body-legal-book text-muted-foreground font-mono text-xs md:text-[12px]">
          .{className}
        </p>
        <p className="typography-body-legal-light mt-0.5 text-muted-foreground text-xs md:text-[12px]">
          {label}
        </p>
        {spec && <SpecList spec={spec} />}
      </div>
      <div className="flex-1 min-w-0 md:pt-0">{children}</div>
    </div>
  );
}

export default function StyleGuidePage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 md:max-w-[90%] md:px-10 md:py-12 lg:max-w-7xl lg:px-12 lg:py-16">
        <header className="mb-10 md:mb-14">
          <h1 className="typography-heading-primary-bold mb-3 md:mb-4">Typography style guide</h1>
          <p className="typography-body-large-regular text-muted-foreground">
            Exo 2 — headings, body styles, and font weights.{" "}
          </p>
        </header>

        <div className="flex flex-col gap-10 md:gap-14">
          <Section title="Font weights">
            {FONT_WEIGHTS.map(({ id, label, className, spec }) => (
              <SampleRow key={id} label={label} className={className} spec={spec}>
                <p className={`${className} text-[16px] leading-[24px] text-foreground`}>
                  <span className="typography-normal">{BODY_NORMAL}</span>
                  <span className="typography-italic">{BODY_ITALIC}</span>
                </p>
              </SampleRow>
            ))}
          </Section>

          <Section title="Headings & subheadings (H1–H5)">
            {HEADINGS.map(({ id, label, className, spec, sample }) => (
              <SampleRow key={id} label={label} className={className} spec={spec}>
                <p className={className}>{sample}</p>
              </SampleRow>
            ))}
          </Section>

          <Section title="Body styles (P1–P6)">
            {BODY_STYLES.map(({ id, label, className, spec }) => (
              <SampleRow key={id} label={label} className={className} spec={spec}>
                <p className={className}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet fermentum
                  mi, nec mollis risus. Mauris lobortis quam odio, a porttitor{" "}
                  <span className="underline decoration-current underline-offset-2">
                    pharetra interdum est
                  </span>
                  .
                </p>
              </SampleRow>
            ))}
          </Section>
        </div>
      </div>
    </main>
  );
}
