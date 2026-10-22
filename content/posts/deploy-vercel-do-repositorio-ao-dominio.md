---
title: "Deploy na Vercel: do repositório ao domínio em produção"
description: "O fluxo completo de deploy na Vercel: importar repositório, entender build previews e produção, variáveis de ambiente, domínios e as armadilhas mais comuns."
date: "2026-10-18"
tags: ["Deploy", "DevOps"]
---

Publicar um site moderno não deveria exigir um dia de configuração de servidor. Com a Vercel, o caminho do repositório ao domínio em produção tem quatro passos — e este guia documenta cada um deles, incluindo os detalhes que causam 90% dos erros de deploy.

## O que você vai dominar

- O fluxo de deploy: repositório → build → produção
- A diferença entre preview deployments e production deployments
- Variáveis de ambiente em cada ambiente (desenvolvimento, preview, produção)
- Domínios: como o `seuprojeto.vercel.app` funciona e quando trocar
- Diagnóstico dos erros de build mais comuns

## 1. Importar o repositório

Com o repositório no GitHub, o caminho é: **vercel.com → Add New → Project → selecionar o repo**. A Vercel pede autorização ao GitHub na primeira vez e passa a listar seus repositórios.

Para cada projeto, a Vercel infere o framework pelo `package.json`. Um projeto Next.js recebe automaticamente:

- Build command: `next build`
- Output directory: `.next`
- Install command: `npm install`

Se o seu projeto usa bun, pnpm ou yarn, a Vercel detecta pelo lockfile (`bun.lockb`, `pnpm-lock.yaml`, `yarn.lock`). Não precisa configurar nada à mão — só se você tiver um requisito fora do padrão.

## 2. Preview vs produção: dois tipos de deploy

Toda branch ganha um **preview deployment** — uma URL temporária, única por commit, do tipo `meu-projeto-git-feature.vercel.app`. O merge na branch principal gera o **production deployment**, que ocupa o domínio principal do projeto.

```
push em branch qualquer  →  preview URL (testa sem medo)
merge na main            →  production URL (o site de verdade)
```

Esse fluxo muda a forma de trabalhar: você revisa cada mudança em um ambiente real, com build real, antes de publicar. O preview é o lugar de quebrar as coisas; a produção é o lugar que nunca deve surpreender ninguém.

## 3. Variáveis de ambiente

A regra da Vercel é explícita: **nada que comece com `NEXT_PUBLIC_` deve carregar segredo**. Tudo que vai para o bundle do navegador é público por definição.

| Prefixo | Onde existe | Uso correto |
|---|---|---|
| `NEXT_PUBLIC_*` | Servidor e cliente | URLs públicas, chaves de analytics |
| sem prefixo | Só servidor | Chaves de API, strings de conexão, tokens |

No painel, cada variável pode ser atribuída a ambientes específicos — Development, Preview, Production. O padrão profissional é ter valores diferentes por ambiente desde o primeiro dia, porque trocar uma chave vazada depois é sempre mais caro do que separar agora.

No código, o acesso em build time é direto:

```typescript
// acessível em qualquer lugar
const analyticsKey = process.env.NEXT_PUBLIC_ANALYTICS_KEY;

// acessível SÓ em server components, route handlers e APIs
const dbUrl = process.env.DATABASE_URL;
```

## 4. Domínios: o que é o .vercel.app

Todo projeto recebe um domínio gratuito no formato `nomedoprojeto.vercel.app`. O nome vem do projeto na Vercel, não do repositório — renomear o projeto em *Settings → General* muda o domínio (com redirect automático do antigo).

Caminhos possíveis conforme o projeto cresce:

1. **`projeto.vercel.app`** — suficiente para portfolios e blogs pessoais
2. **Domínio próprio** — *Settings → Domains → Add*, aponte o DNS conforme as instruções (um `CNAME` para `cname.vercel-dns.com` na maioria dos casos)
3. **Domínio por projeto + redirecionamentos** — configure redirects em `vercel.json`:

```json
{
  "redirects": [
    { "source": "/blog", "destination": "/", "permanent": true }
  ]
}
```

## 5. Erros comuns e o diagnóstico rápido

**"Build failed" com módulo não encontrado.** Quase sempre é um import com case diferente do arquivo real (`./Componente` vs `./componente`). No macOS e Windows passa despercebido; no build da Vercel (Linux) falha.

**Funciona local, quebra no deploy.** Causas típicas: variável de ambiente definida só no `.env.local` (que não sobe para o Git), ou código que lê o filesystem em caminho absoluto (`C:/...` ou `/Users/...`). No servidor, caminhos sempre relativos a `process.cwd()`.

**Hydration mismatch.** O servidor renderizou um HTML e o cliente hidratou outro — geralmente `Date.now()`, `Math.random()` ou `window` direto no render. Solução: mova para `useEffect` ou use um campo estável (a data do post, não o relógio do visitante).

**Página em branco após deploy.** Abra o console do navegador. Se aparecer erro de chunk 404, provavelmente um deploy novo sobrescreveu os assets de uma aba aberta antiga — basta recarregar. Se o erro persiste, é import circular ou dependência incompatível com SSR; marque o componente com `'use client'`.

## 6. O deploy via CLI (alternativa ao Git)

Para projetos locais sem repositório ou pipelines automatizados, a CLI cobre o mesmo fluxo:

```bash
npm i -g vercel
vercel          # preview deployment
vercel --prod   # production deployment
```

O primeiro comando pede login e cria o projeto; os seguintes empacotam o diretório e publicam. Em CI, use `vercel --prod --token=$VERCEL_TOKEN --yes`.

## Fechando o ciclo

O fluxo completo que vale memorizar: **commit → push → preview → merge → produção**. Quando esse ciclo está instaurado, publicar deixa de ser evento e passa a ser rotina — e é exatamente assim que times sérios tratam deploy.
