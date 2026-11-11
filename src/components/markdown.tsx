import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { Github } from "lucide-react";

/** URL de repositório do GitHub — o único link do blog que usa o atalho. */
const GITHUB_REPO = /^https?:\/\/(www\.)?github\.com(\/|\?|#|$)/i;

const components: Components = {
  a: ({ node, href, children, ...props }) => {
    void node;
    const external = href?.startsWith("http");
    const text = typeof children === "string" ? children.trim() : "";

    // Link com a URL colada no texto (ex.: "github.com/massgravel/...") vira
    // atalho: "github.com" + ícone, na mesma cor do link (herda currentColor).
    const isGithubLabel = !!href && GITHUB_REPO.test(href) && /^github\.com(\/\S*)?$/i.test(text);

    if (isGithubLabel) {
      return (
        <a
          href={href}
          {...props}
          {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        >
          github.com
          <Github
            size={13}
            strokeWidth={1.75}
            aria-hidden="true"
            className="ml-1 inline-block align-[-1px]"
          />
        </a>
      );
    }

    return (
      <a
        href={href}
        {...props}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {children}
      </a>
    );
  },
};

export function Markdown({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
      components={components}
    >
      {content}
    </ReactMarkdown>
  );
}
