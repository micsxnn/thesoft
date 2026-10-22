import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, tagToSlug } from "@/lib/posts";
import { formatSwissDate } from "@/lib/format";
import { Markdown } from "@/components/markdown";
import { AuthorCard } from "@/components/author-card";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="mx-auto w-full max-w-3xl px-6">
      <article className="pt-14 sm:pt-20">
        <header>
          <p className="hero-rise hero-rise-1 font-mono text-[13px] tabular text-muted-foreground">
            {formatSwissDate(post.date)}
            <span aria-hidden="true"> · </span>
            {post.readingTime} min de leitura
          </p>

          <h1 className="hero-rise hero-rise-2 mt-5 max-w-[24ch] text-[clamp(2rem,5.5vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
            {post.title}
          </h1>

          <p className="hero-rise hero-rise-3 mt-6 max-w-[62ch] text-lg leading-relaxed text-muted-foreground">
            {post.description}
          </p>

          <ul className="hero-rise hero-rise-4 mt-7 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <li key={tag}>
                <Link
                  href={`/tag/${tagToSlug(tag)}`}
                  className="inline-block rounded-[2px] border border-border px-2.5 py-1 font-mono text-xs text-muted-foreground transition-colors hover:border-[#5ce49e]/50 hover:text-[#5ce49e]"
                >
                  {tag}
                </Link>
              </li>
            ))}
          </ul>
        </header>

        <hr className="hero-rise hero-rise-4 my-12 border-border" />

        <div className="post-content">
          <Markdown content={post.content} />
        </div>

        <AuthorCard />
      </article>

      <div className="pb-24 pt-14">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <span
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:-translate-x-0.5"
          >
            ←
          </span>
          Todos os posts
        </Link>
      </div>
    </div>
  );
}
