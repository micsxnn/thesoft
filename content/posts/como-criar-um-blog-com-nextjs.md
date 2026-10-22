---
title: "Como criar um blog com Next.js: do setup ao deploy"
description: "Guia direto para montar um blog técnico com Next.js App Router: estrutura de pastas, leitura de Markdown com frontmatter, geração de rotas estáticas e SEO técnico."
date: "2026-10-22"
tags: ["Next.js", "React", "Deploy"]
---

Um blog técnico precisa de três coisas: rotas rápidas, escrita em Markdown e bom SEO. O Next.js com App Router entrega as três sem dependências exóticas. Este guia mostra cada passo, do `create-next-app` ao primeiro post publicado — com o código exato que você precisa em cada etapa.

## O que você vai construir

Ao final deste guia, você terá:

- Um blog com home, página de post individual e páginas por categoria
- Posts escritos em arquivos `.md` com frontmatter (título, descrição, data, tags)
- Geração estática das páginas no build, com SEO e metadata completos
- Um projeto pronto para deploy na Vercel

## 1. Setup do projeto

Comece criando o projeto com TypeScript e App Router:

```bash
npx create-next-app@latest my-blog --typescript --app --tailwind --eslint
cd my-blog
```

A estrutura essencial de um blog fica assim:

```
my-blog/
├── content/posts/        # seus posts em Markdown
├── src/app/              # rotas do App Router
│   ├── page.tsx          # home
│   ├── posts/[slug]/     # página do post
│   └── tag/[slug]/       # posts por categoria
└── src/lib/posts.ts      # leitura e parsing dos posts
```

O princípio é simples: **conteúdo em `content/`, código em `src/`**. Essa separação deixa claro o que é dado e o que é aplicação, e facilita migrar o conteúdo depois se você quiser trocar de stack.

## 2. Lendo posts em Markdown

Instale as duas bibliotecas que fazem o trabalho pesado:

```bash
npm install gray-matter react-markdown remark-gfm rehype-highlight
```

O `gray-matter` separa o frontmatter do corpo do Markdown. O `react-markdown` renderiza o corpo como React. Crie `src/lib/posts.ts`:

```typescript
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/posts");

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  content: string;
};

export function getAllPosts(): Post[] {
  const files = fs.readdirSync(postsDirectory);

  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(postsDirectory, file), "utf8");
      const { data, content } = matter(raw);

      return {
        slug,
        title: data.title,
        description: data.description,
        date: data.date,
        tags: data.tags ?? [],
        content,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}
```

Duas decisões importantes aqui:

1. **`getAllPosts()` lê o diretório a cada chamada.** Em build estático isso roda uma vez, no servidor. Não há custo em runtime.
2. **A ordenação por data fica na camada de dados**, não na UI. Toda página recebe os posts já ordenados.

## 3. Escrevendo um post

Crie `content/posts/primeiro-post.md`:

```markdown
---
title: "Primeiro post do blog"
description: "Uma descrição clara do que este post entrega."
date: "2026-01-15"
tags: ["Next.js"]
---

## Primeiro título

Aqui vai o conteúdo. Markdown puro: títulos, listas, código com fences.
```

O frontmatter é o contrato entre o conteúdo e a aplicação. Mantenha só os campos que a UI realmente usa — título, descrição, data e tags são suficientes para a maioria dos blogs.

## 4. Rota do post individual

O App Router resolve rotas dinâmicas com segmentos entre colchetes. Crie `src/app/posts/[slug]/page.tsx`:

```tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.description}</p>
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
        {post.content}
      </ReactMarkdown>
      <Link href="/">Voltar para a home</Link>
    </article>
  );
}
```

Três detalhes que separam um blog amador de um profissional:

- **`generateStaticParams`** gera todas as páginas no build. O leitor recebe HTML estático, não uma página renderizada na hora.
- **`notFound()`** devolve 404 real para slugs inexistentes, em vez de uma tela quebrada.
- **`generateMetadata`** coloca título e descrição no `<head>`, que é o que aparece no Google e em previews de link.

## 5. Home com lista de posts

A home é uma lista editorial. Crie `src/app/page.tsx`:

```tsx
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <main>
      <h1>Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`}>{post.title}</Link>
            <p>{post.description}</p>
            <time>{post.date}</time>
          </li>
        ))}
      </ul>
    </main>
  );
}
```

## 6. SEO técnico em 10 linhas

Em `src/app/layout.tsx`, configure a metadata global:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://seudominio.vercel.app"),
  title: {
    default: "Seu Blog",
    template: "%s — Seu Blog",
  },
  description: "O que este blog entrega, em uma frase.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://seudominio.vercel.app",
    siteName: "Seu Blog",
  },
};
```

O `template` economiza trabalho: cada página que define `title` herda o sufixo do blog automaticamente.

## 7. Deploy

Suba o projeto para o GitHub e importe na Vercel, ou use a CLI:

```bash
npm i -g vercel
vercel --prod
```

A Vercel detecta Next.js, roda o build e publica. Zero configuração de servidor, cache de CDN incluído.

## Próximos passos

Com a base pronta, as evoluções naturais são: RSS (um route handler que serializa os posts), sitemap (que o Next gera com `sitemap.ts`) e busca client-side (um filtro sobre a lista de posts). Cada uma é pequena o suficiente para caber em uma tarde — e este blog as cobre nos próximos posts.
