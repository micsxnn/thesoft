import type { MetadataRoute } from "next";
import {
  getAllPosts,
  getAllTags,
  getAllCategories,
  tagToSlug,
} from "@/lib/posts";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().map((post) => ({
    url: `${SITE_URL}/posts/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const categories = getAllCategories().map(({ tag }) => ({
    url: `${SITE_URL}/categoria/${tagToSlug(tag)}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const tags = getAllTags().map(({ tag }) => ({
    url: `${SITE_URL}/tag/${tagToSlug(tag)}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.4,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/busca`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    ...categories,
    ...posts,
    ...tags,
  ];
}
