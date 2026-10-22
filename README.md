# thesoft

Blog de engenharia de software. Tutoriais de Next.js, React, TypeScript, Git e deploy — direto ao ponto, com código que funciona.

**Publicado em:** https://thesoft-phi.vercel.app

## Stack

- [Next.js 16](https://nextjs.org) (App Router, SSG) + TypeScript
- Tailwind CSS 4
- Posts em Markdown (`content/posts`) com frontmatter — processados com `gray-matter` + `react-markdown`
- Syntax highlight com `rehype-highlight`

## Funcionalidades

- Home editorial com lista de posts e temas
- Posts estáticos (SSG) com SEO completo (Open Graph, sitemap, robots)
- Categorias em `/tag/[slug]`
- Busca client-side em tempo real em `/busca`
- RSS em `/feed.xml`

## Escrevendo um post

Crie um arquivo em `content/posts/meu-post.md`:

```markdown
---
title: "Título do post"
description: "Uma descrição clara do que o post entrega."
date: "2026-01-15"
tags: ["Next.js", "React"]
---

## Primeira seção

Conteúdo em Markdown.
```

O post entra automaticamente na home, na busca, no RSS e no sitemap. Deploy automático na Vercel a cada push em `main`.

## Rodando localmente

```bash
bun install
bun run dev
```

## Autor

**micaelsan** — [github.com/micsxnn](https://github.com/micsxnn)
