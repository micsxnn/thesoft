---
title: "Componentes React: como estruturar UI reutilizável de verdade"
description: "Os critérios práticos de componentização React: quando extrair, composição vs configuração, props que escalam, server vs client components e os erros que geram rework."
date: "2026-10-05"
tags: ["React", "Front-end"]
---

Componentizar não é dividir a tela em muitos arquivos — é dividir nos pontos certos. Um componente mal cortado gera props infinitas e rework; um bem cortado some do seu campo de preocupação. Este guia apresenta os critérios que decidem cada corte, com os padrões que escalam de um protótipo a uma base grande.

## Os critérios, na ordem em que devem ser aplicados

Ao final você terá um checklist claro para decidir: extrair, compor ou deixar como está.

## 1. Quando extrair (e quando não extrair)

Os dois gatilhos legítimos de extração:

1. **Reuso real** — o mesmo bloco aparece em 2+ lugares, com risco de divergir
2. **Fronteira de estado** — o re-render de um bloco precisa ficar isolado dos vizinhos

E o gatilho falso mais comum: **"o arquivo está grande"**. Tamanho não é critério. Um arquivo de 300 linhas coeso é melhor que dez arquivos de 30 linhas com acoplamento implícito entre eles.

```tsx
// ❌ extração cosmética: só move código de lugar
function PostTitle({ text }: { text: string }) {
  return <h1 className="text-2xl font-semibold">{text}</h1>;
}

// ✅ extração com fronteira real: estado isolado, reuso de verdade
function SearchInput({ onSearch }: { onSearch: (q: string) => void }) {
  const [query, setQuery] = useState("");
  // debounce, estado, handlers — tudo encapsulado aqui
  return <input value={query} onChange={(e) => setQuery(e.target.value)} />;
}
```

## 2. Composição vence configuração

O erro clássico de componentização é o **componente-configurável**: um único componente que recebe uma prop booleana para cada variação visual. Ele cresce até ninguém conseguir alterar com segurança.

```tsx
// ❌ configuração: cada variação nova adiciona uma prop
<Card hasImage isFeatured showFooter isCompact shouldHighlight />

// ✅ composição: as variações são combinações de partes
<Card>
  <Card.Media src={post.cover} />
  <Card.Body>
    <Card.Title>{post.title}</Card.Title>
    <Card.Meta>{post.date}</Card.Meta>
  </Card.Body>
</Card>
```

O sinal de alerta prático: **props booleanas de visual**. Quando você percebe que está passando `compact`, `featured` e `highlight` para o mesmo componente, a extração certa não é uma prop nova — são componentes compostos de partes menores.

Children e slots resolvem a maioria desses casos:

```tsx
type LayoutProps = {
  sidebar: React.ReactNode;
  content: React.ReactNode;
};

function Layout({ sidebar, content }: LayoutProps) {
  return (
    <div className="grid grid-cols-[240px_1fr]">
      <aside>{sidebar}</aside>
      <main>{content}</main>
    </div>
  );
}
```

## 3. Props que escalam

Convenções que mantêm a interface de um componente previsível:

**Estende os props nativos** em vez de recriar o que o HTML já oferece:

```tsx
type ButtonProps = React.ComponentProps<"button"> & {
  variant?: "primary" | "ghost";
};

function Button({ variant = "primary", ...rest }: ButtonProps) {
  return <button className={styles(variant)} {...rest} />;
}
```

Quem usa o componente ganha `onClick`, `disabled`, `type`, `aria-*` — de graça e tipados.

**Dados entram, eventos saem.** Um componente recebe dados por props e comunica mudanças por callbacks. Componente que busca dados próprio é legítimo, mas é uma decisão de fronteira — não um acidente.

**Sem props espelho.** `value` + `onValueChange` com estado duplicado dentro do componente gera duas fontes de verdade. Se o pai precisa controlar, ele é o dono do estado (controlled); se não, o filho é (uncontrolled). Escolha um.

## 4. Server vs Client components: a divisão correta

No App Router, a pergunta não é "onde componenteizar" — é "onde cada componente roda". A regra:

- **Server component por padrão**: conteúdo estático, acesso a dados no servidor, zero JavaScript no bundle do cliente
- **`'use client'` só quando precisa**: estado (`useState`), efeitos (`useEffect`), eventos (`onClick`), APIs do navegador

```tsx
// server component: busca os dados, renderiza HTML
export default async function PostsPage() {
  const posts = await getAllPosts();

  return (
    <PostList posts={posts} />
  ); // PostList pode ser server também
}

// client component: só o que interage
"use client";
function SearchInput({ onSearch }: { onSearch: (q: string) => void }) {
  // estado e eventos vivem aqui
}
```

O padrão que evita desperdício: **empurre `'use client'` para as folhas da árvore**. A página busca dados no servidor e desce a árvore; só os nós interativos (input de busca, dropdown, modal) viram client. Uma `'use client'` no topo da página transforma todos os filhos em client — bundle maior sem necessidade.

## 5. Os erros que geram rework

**Prematuro.** Extrair no primeiro uso, "para reusar depois". O segundo uso quase nunca é igual ao primeiro — e a abstração errada custa mais que a duplicação temporária. Regra de ouro: extraia no segundo uso, não no primeiro.

**Abstração com furo.** O componente precisa receber 7 props porque cada consumidor quer "só uma coisinha" diferente. É sinal de que as partes não foram separadas — volte à composição.

**Container genérico demais.** `List`, `Grid`, `Wrapper` que não sabem nada de nada e viram uma camada de indireção. Se não tem comportamento nem fronteira de estado, é um `<div>` com nome.

**Estado elevado além do necessário.** Estado do formulário de comentário mora no formulário de comentário. Elevá-lo para a página força re-renders em cascata e props atravessando cinco níveis.

## O checklist que fica

Antes de extrair ou aceitar um componente na base, cinco perguntas:

1. Este bloco reaparece ou tem fronteira de estado legítima? (senão, não extraia)
2. As variações são composição de partes ou uma pilha de booleans? (composição)
3. Os props estendem os nativos e seguem dados-para-dentro/eventos-para-fora?
4. A marca `'use client'` está na folha mais profunda possível?
5. O componente some da sua preocupação quando você fecha o arquivo? (o teste final)

Componentização boa é invisível: você abre, altera, fecha — e nada mais em volta precisa saber.
