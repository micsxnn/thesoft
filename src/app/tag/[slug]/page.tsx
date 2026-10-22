import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllTags, getPostsByTag, tagToSlug } from "@/lib/posts";
import { PostList } from "@/components/post-list";

type TagPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllTags().map(({ tag }) => ({ slug: tagToSlug(tag) }));
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = getAllTags().find((t) => tagToSlug(t.tag) === slug)?.tag;
  if (!tag) return {};

  return {
    title: `Posts sobre ${tag}`,
    description: `Todos os tutoriais do thesoft sobre ${tag}.`,
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { slug } = await params;
  const tag = getAllTags().find((t) => tagToSlug(t.tag) === slug)?.tag;
  if (!tag) notFound();

  const posts = getPostsByTag(tag);

  return (
    <div className="mx-auto w-full max-w-4xl px-6">
      <header className="pb-12 pt-16 sm:pt-20">
        <p className="font-mono text-[13px] text-muted-foreground">
          {posts.length} {posts.length === 1 ? "post" : "posts"}
        </p>
        <h1 className="mt-3 text-[clamp(2rem,5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
          Posts sobre{" "}
          <span className="text-[#5ce49e]">{tag}</span>
        </h1>
      </header>

      <div className="pb-24">
        <PostList posts={posts} />
      </div>
    </div>
  );
}
