# thesoft

Blog de tecnologia do **micaelsan** — tutoriais de engenharia de software, Linux, Windows e gaming. Direto ao ponto, com passo a passo que funciona.

**Publicado em:** https://thesoft-phi.vercel.app

## Stack

- [Next.js 16](https://nextjs.org) (App Router, SSG) + TypeScript
- Tailwind CSS 4
- Posts em Markdown (`content/posts`) com frontmatter — processados com `gray-matter` + `react-markdown`
- Syntax highlight com `rehype-highlight`
- Covers em `public/posts` (via `next/image`)

## Funcionalidades

- Home editorial com lista de posts, thumbnail e categorias
- Posts estáticos (SSG) com SEO completo (Open Graph, sitemap, robots)
- Categorias em `/categoria/[slug]` — eixo principal de navegação
- Tags em `/tag/[slug]` — eixo secundário, ligado a partir da página do post
- Busca client-side em tempo real em `/busca`
- RSS em `/feed.xml`
- Redirect permanente de `/blog/[slug]` → `/posts/[slug]` (URLs do antigo TechMate)

## Escrevendo um post

Crie um arquivo em `content/posts/meu-post.md`:

```markdown
---
title: "Título do post"
description: "Uma descrição clara do que o post entrega."
date: "2026-01-15"
category: "Linux"
tags: ["ubuntu", "terminal"]
coverImage: "/posts/minha-capa.jpg"
featured: false
---

## Primeira seção

Conteúdo em Markdown.
```

| Campo | Obrigatório | O que faz |
| --- | --- | --- |
| `title` | sim | Título do post |
| `description` | sim | Resumo — aparece na lista, no RSS e nos metadados |
| `date` | sim | Data ISO (`YYYY-MM-DD`) |
| `category` | sim | Categoria principal — vira página em `/categoria/[slug]` |
| `tags` | não | Tags — viram páginas em `/tag/[slug]` |
| `coverImage` | não | Imagem em `public/posts` — aparece na lista e no topo do post |
| `featured` | não | Marca o post como destaque |

O post entra automaticamente na home, nas categorias, na busca, no RSS e no sitemap. Deploy automático na Vercel a cada push em `main`.

## Rodando localmente

```bash
bun install
bun run dev
```

## Autor

**micaelsan** — [github.com/micsxnn](https://github.com/micsxnn)
