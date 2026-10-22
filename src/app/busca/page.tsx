import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { SearchClient, type PostSummary } from "@/components/search-client";

export const metadata: Metadata = {
  title: "Busca",
  description: "Busque tutoriais do thesoft por título, tema ou tag.",
};

export default function SearchPage() {
  const posts: PostSummary[] = getAllPosts().map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    tags: post.tags,
    readingTime: post.readingTime,
  }));

  return (
    <div className="mx-auto w-full max-w-4xl px-6">
      <header className="pb-12 pt-16 sm:pt-20">
        <h1 className="text-[clamp(2rem,5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
          Busca
        </h1>
        <p className="mt-4 max-w-[54ch] text-lg leading-relaxed text-muted-foreground">
          Filtre os tutoriais em tempo real — por título, tema ou tag.
        </p>
      </header>

      <div className="pb-24">
        <SearchClient posts={posts} />
      </div>
    </div>
  );
}
