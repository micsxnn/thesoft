import Link from "next/link";
import { formatSwissDate } from "@/lib/format";
import { type Post } from "@/lib/posts";

export function PostList({ posts }: { posts: Post[] }) {
  return (
    <ul className="border-t border-border">
      {posts.map((post) => (
        <li key={post.slug} className="border-b border-border">
          <article className="group relative py-8">
            <div className="flex items-baseline justify-between gap-x-8 gap-y-2 max-sm:flex-col">
              <h3 className="text-[1.35rem] font-medium leading-snug tracking-[-0.02em] text-foreground transition-colors duration-200 group-hover:text-[#5ce49e]">
                {post.title}
              </h3>
              <p className="shrink-0 font-mono text-[13px] tabular text-muted-foreground">
                {formatSwissDate(post.date)}
                <span aria-hidden="true"> · </span>
                {post.readingTime} min
              </p>
            </div>

            <p className="mt-2.5 max-w-[62ch] text-[15px] leading-relaxed text-muted-foreground">
              {post.description}
            </p>

            <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-muted-foreground">
              {post.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </p>

            {/* Link estendido: a linha inteira é clicável */}
            <Link href={`/posts/${post.slug}`} className="absolute inset-0">
              <span className="sr-only">Ler: {post.title}</span>
            </Link>
          </article>
        </li>
      ))}
    </ul>
  );
}
