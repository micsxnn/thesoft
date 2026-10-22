---
title: "TypeScript na prática: os tipos que resolvem bugs antes do deploy"
description: "Guia prático dos recursos de TypeScript que geram valor real: inferência, narrowing, generics utilitários, narrowing de API responses e tipagem de dados externos."
date: "2026-10-09"
tags: ["TypeScript", "JavaScript"]
---

TypeScript não é burocracia extra — é o compilador apontando o bug enquanto você escreve, em vez do usuário apontar depois do deploy. Este guia cobre os recursos que geram valor no dia a dia real: inferência, narrowing, utilitários nativos e a tipagem honesta de dados que vêm de fora.

## O que muda na prática

Ao final, você vai saber:

- Deixar o compilador trabalhar a seu favor (inferência e narrowing)
- Usar os utilitários nativos (`Pick`, `Omit`, `Partial`, `Record`) para derivar tipos em vez de repeti-los
- Tipar respostas de API e validar dados externos sem confiar neles
- Reconhecer os padrões de tipagem que viram dívida técnica

## 1. Inferência: menos anotações, mais garantias

Escrever o tipo explícito em toda linha é trabalho desperdiçado. O TypeScript infere tipos com precisão a partir dos valores:

```typescript
const tags = ["Next.js", "React"];        // string[]
const slug = "meu-post";                   // string

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR");
} // retorno inferido: string — não precisa anotar
```

Onde a anotação é obrigatória:

- **Parâmetros de função** — o compilador não tem de onde inferir
- **Retornos de funções exportadas** por uma decisão de arquitetura: o erro aparece na sua função, não em quem consome
- **Objetos inicializados vazios** e constantes de módulo

```typescript
// ❌ inferência falha: o objeto começa vazio
const config = {};
config.timeout = 5000; // erro aqui seria tarde

// ✅ anote o shape desde o início
type Config = { timeout: number; retries: number };
const config: Config = { timeout: 5000, retries: 3 };
```

## 2. Narrowing: o compilador entende suas checagens

O recurso que mais elimina bugs em runtime. Cada checagem no código refina o tipo dentro do bloco:

```typescript
function renderPost(post: Post | undefined) {
  if (!post) return null;         // a partir daqui, post é Post — não undefined

  return <h1>{post.title}</h1>;   // ✅ sem erro, sem "!"
}
```

Para uniões mais ricas, a propriedade discriminante é a ferramenta certa:

```typescript
type RequestState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: Post[] }
  | { status: "error"; message: string };

function render(state: RequestState) {
  switch (state.status) {
    case "success":
      return state.data.map((p) => p.title);  // ✅ data só existe aqui
    case "error":
      return state.message;                    // ✅ message só existe aqui
    default:
      return null;
  }
}
```

Sem discriminação, você escreveria `if (state.data && ...)` o dia inteiro. Com ela, o switch é exaustivo — e adicionar um estado novo na união faz o compilador apontar **todos os lugares** que precisam tratá-lo. Isso é refatoração com rede.

## 3. Utilitários nativos: derive, não repita

Os utilitários embutidos cobrem as transformações de tipo mais comuns. A mentalidade correta: o tipo fonte é único, os demais são derivados.

```typescript
type Post = {
  id: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
};

type PostSummary = Pick<Post, "id" | "title" | "date">;        // para listas
type NewPost = Omit<Post, "id">;                               // para criar
type DraftPost = Partial<NewPost>;                             // para editar

type TagCounts = Record<string, number>;                       // dicionário
const counts: TagCounts = { TypeScript: 12, React: 8 };
```

Três que valem uso diário:

- **`Pick`** quando uma tela só precisa de parte do shape (listas, cards)
- **`Omit`** quando o derivado é "o mesmo, menos X"
- **`Partial`** para formulários de edição e payloads de update

E o mais esquecido e mais útil para constantes de domínio:

```typescript
const ROUTES = {
  home: "/",
  posts: "/posts",
  search: "/busca",
} as const;

type Route = (typeof ROUTES)[keyof typeof ROUTES];  // "/" | "/posts" | "/busca"

function navigate(route: Route) { ... }             // imissível digitar errado
```

## 4. Dados externos: o tipo não é garantia

O ponto mais importante deste guia. Um cast `as` diz ao compilador que **você** tem certeza — e o runtime não checa nada:

```typescript
// ❌ mentira tipada: se a API mudar, quebra em runtime
const post = (await response.json()) as Post;

// ✅ valida o shape antes de usar
import { z } from "zod";

const PostSchema = z.object({
  id: z.string(),
  title: z.string(),
  date: z.string(),
  tags: z.array(z.string()),
});

const post = PostSchema.parse(await response.json());  // Post, de verdade
```

A regra de ouro: **dados que atravessam uma fronteira** (API, localStorage, formulário, URL) não têm tipo até você validar. O `zod` gera o tipo a partir do schema (`z.infer<typeof PostSchema>`), eliminando a duplicação entre schema e interface.

## 5. Os antipadrões que cobram juros

**`any` em vez de `unknown`.** `any` desliga o compilador; `unknown` exige checagem antes do uso. Para dados desconhecidos, `unknown` é sempre a escolha honesta.

**Retornar `Promise<any>` de funções de API.** Espalha `any` para todo consumidor. Tipar o retorno uma vez protege a cadeia inteira.

**Union types de strings soltas no lugar de const arrays.** `"admin" | "editor" | "leitor"` escrito à mão se desatualiza. Derive do valor-fonte com `as const`, como no exemplo de `ROUTES`.

**Enum para tudo.** Na maioria dos casos, um objeto `as const` + tipo derivado faz o mesmo trabalho com menos sintaxe e sem surpresas de emissão de código.

## O ganho real

O compilador de TypeScript não substitui testes — ele move uma camada inteira de bugs para o momento em que custam zero: **antes de salvar o arquivo**. Tipar as fronteiras (props, respostas, parâmetros) com honestidade e deixar a inferência cuidar do resto é o equilíbrio que mantém a produtividade alta e o runtime previsível.
