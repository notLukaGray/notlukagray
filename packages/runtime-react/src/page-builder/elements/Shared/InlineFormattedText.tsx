import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function normalizeInlineText(text: string): string {
  return text.replace(/\r\n?/g, "\n").replace(/\\n/g, "\n");
}

function isExternalUrl(href: string | undefined): boolean {
  if (!href) return false;
  return href.startsWith("http") || href.startsWith("//");
}

export function InlineFormattedText({ text }: { text: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      allowedElements={["p", "br", "strong", "em", "del", "code", "a"]}
      unwrapDisallowed
      skipHtml
      components={{
        p: ({ children }) => <>{children}</>,
        a: ({ href, children, ...props }) => (
          <a
            href={href}
            className="underline hover:no-underline"
            target={isExternalUrl(href) ? "_blank" : undefined}
            rel={isExternalUrl(href) ? "noopener noreferrer" : undefined}
            {...props}
          >
            {children}
          </a>
        ),
        strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
        del: ({ children }) => <del className="opacity-80">{children}</del>,
        code: ({ children, ...props }) => (
          <code className="rounded bg-black/15 px-1 py-0.5 font-mono text-[0.9em]" {...props}>
            {children}
          </code>
        ),
      }}
    >
      {normalizeInlineText(text)}
    </ReactMarkdown>
  );
}
