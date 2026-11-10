import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllCategories,
  getPostsByCategory,
  tagToSlug,
} from "@/lib/posts";
import { PostList } from "@/components/post-list";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllCategories().map(({ tag }) => ({ slug: tagToSlug(tag) }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getAllCategories().find(
    (c) => tagToSlug(c.tag) === slug
  )?.tag;
  if (!category) return {};

  return {
    title: category,
    description: `Todos os tutoriais do thesoft sobre ${category}.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getAllCategories().find(
    (c) => tagToSlug(c.tag) === slug
  )?.tag;
  if (!category) notFound();

  const posts = getPostsByCategory(category);

  return (
    <div className="mx-auto w-full max-w-4xl px-6">
      <header className="pb-12 pt-16 sm:pt-20">
        <p className="font-mono text-[13px] text-muted-foreground">
          {posts.length} {posts.length === 1 ? "post" : "posts"}
        </p>
        <h1 className="mt-3 text-[clamp(2rem,5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-balance">
          {category}
        </h1>
      </header>

      <div className="pb-24">
        <PostList posts={posts} />
      </div>
    </div>
  );
}
