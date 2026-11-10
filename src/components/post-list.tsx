import Image from "next/image";
import Link from "next/link";
import { formatSwissDate } from "@/lib/format";
import { type Post } from "@/lib/posts";

export function PostList({ posts }: { posts: Post[] }) {
  return (
    <ul className="border-t border-border">
      {posts.map((post) => (
        <li key={post.slug} className="border-b border-border">
          <article className="group relative flex gap-5 py-8 sm:gap-7">
            {post.coverImage ? (
              <div className="relative order-first h-20 w-32 shrink-0 overflow-hidden rounded-[2px] border border-border bg-[#111111] sm:h-24 sm:w-40">
                <Image
                  src={post.coverImage}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 128px, 160px"
                  className="object-cover opacity-80 transition-opacity duration-200 group-hover:opacity-100"
                />
              </div>
            ) : null}

            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-x-8 gap-y-2 max-sm:flex-col">
                <h2 className="text-[1.35rem] font-medium leading-snug tracking-[-0.02em] text-foreground text-balance transition-colors duration-200 group-hover:text-[#5ce49e]">
                  {post.title}
                </h2>
                <p className="shrink-0 font-mono text-[13px] tabular text-muted-foreground">
                  {formatSwissDate(post.date)}
                  <span aria-hidden="true"> · </span>
                  {post.readingTime} min
                </p>
              </div>

              <p className="mt-2.5 max-w-[62ch] text-[15px] leading-relaxed text-muted-foreground text-pretty">
                {post.description}
              </p>

              <p className="mt-4 font-mono text-xs text-[#5ce49e]">
                {post.category}
              </p>
            </div>

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
