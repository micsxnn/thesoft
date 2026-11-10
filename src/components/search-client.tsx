"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { formatSwissDate } from "@/lib/format";

export type PostSummary = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  readingTime: number;
  coverImage?: string;
};

export function SearchClient({ posts }: { posts: PostSummary[] }) {
  const [query, setQuery] = useState("");

  const trimmed = query.trim();
  const normalized = trimmed.toLowerCase();

  const results = useMemo(() => {
    if (!normalized) return posts;

    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(normalized) ||
        post.description.toLowerCase().includes(normalized) ||
        post.category.toLowerCase().includes(normalized) ||
        post.tags.some((tag) => tag.toLowerCase().includes(normalized))
    );
  }, [posts, normalized]);

  return (
    <div>
      {/* Campo de busca: caixa aberta, hairline inferior */}
      <div className="relative">
        <Search
          size={18}
          strokeWidth={1.75}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar por título, tema ou tag…"
          aria-label="Buscar posts"
          autoComplete="off"
          className="w-full border-b border-border bg-transparent py-4 pl-8 pr-10 text-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:outline-none [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden focus:border-[#5ce49e]/60 transition-colors"
        />
        {trimmed && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Limpar busca"
            className="absolute right-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-[2px] text-muted-foreground transition-colors hover:text-foreground"
          >
            <X size={16} strokeWidth={1.75} aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Contagem de resultados */}
      <p aria-live="polite" className="mt-6 font-mono text-[13px] tabular text-muted-foreground">
        {results.length} {results.length === 1 ? "resultado" : "resultados"}
        {trimmed && (
          <>
            {" "}
            para <span className="text-[#5ce49e]">&ldquo;{trimmed}&rdquo;</span>
          </>
        )}
      </p>

      {/* Resultados */}
      {results.length > 0 ? (
        <ul className="mt-6 border-t border-border">
          {results.map((post) => (
            <li key={post.slug} className="border-b border-border">
              <article className="group relative flex gap-5 py-7 sm:gap-7">
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
                    <h2 className="text-[1.2rem] font-medium leading-snug tracking-[-0.02em] text-foreground text-balance transition-colors duration-200 group-hover:text-[#5ce49e]">
                      {post.title}
                    </h2>
                    <p className="shrink-0 font-mono text-[13px] tabular text-muted-foreground">
                      {formatSwissDate(post.date)}
                      <span aria-hidden="true"> · </span>
                      {post.readingTime} min
                    </p>
                  </div>

                  <p className="mt-2 max-w-[62ch] text-[15px] leading-relaxed text-muted-foreground text-pretty">
                    {post.description}
                  </p>

                  <p className="mt-3 font-mono text-xs text-[#5ce49e]">
                    {post.category}
                  </p>
                </div>

                <Link href={`/posts/${post.slug}`} className="absolute inset-0">
                  <span className="sr-only">Ler: {post.title}</span>
                </Link>
              </article>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-6 border-t border-border pt-14 pb-8">
          <p className="text-lg font-medium text-foreground">
            Nenhum resultado para &ldquo;{trimmed}&rdquo;.
          </p>
          <p className="mt-2 max-w-[52ch] text-[15px] leading-relaxed text-muted-foreground">
            Tente outro termo ou navegue pelos temas na página inicial — os posts
            estão organizados por tag.
          </p>
        </div>
      )}
    </div>
  );
}
