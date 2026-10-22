---
title: "Git essencial: os comandos que você realmente usa no dia a dia"
description: "Referência prática dos comandos Git que resolvem o trabalho real: fluxo diário de commits, branches, correção de erros, stash, rebase e as saídas de emergência."
date: "2026-10-14"
tags: ["Git", "Ferramentas"]
---

A maioria dos tutoriais de Git ensina 40 comandos. Na prática, o trabalho real gira em torno de uma dúzia — e de três ou quatro manobras de resgate que salvam o dia. Este guia organiza exatamente isso: o fluxo diário, as situações que aparecem toda semana e a saída certa para cada uma.

## O fluxo diário, completo

Oitenta por cento do seu dia caberá nestes comandos:

```bash
git status                     # o que mudou (use antes de qualquer coisa)
git pull --rebase              # atualiza da main sem commits de merge
git add arquivo.ts             # escolhe o que entra no commit
git commit -m "msg clara"      # registra com contexto
git push                       # envia para o remoto
```

Dois hábitos que separam quem usa Git de quem entende Git:

1. **`git status` antes de qualquer operação.** A maioria dos "desastres" é `git add` de arquivo errado que um `git status` teria mostrado.
2. **Commits pequenos e nomeados pela mudança, não pelo dia.** "corrige validação do formulário de cadastro" é um histórico; "ajustes" não é.

## Branches sem drama

```bash
git switch -c feature/login-social    # cria e entra na branch
git switch main                        # volta para a main
git branch -d feature/login-social     # apaga branch já mesclada
git branch                             # lista branches locais
```

A convenção que funciona: uma branch por tarefa, nome prefixado pelo tipo (`feature/`, `fix/`, `chore/`), vida curta. Branch que vive semanas acumula conflito — e conflito acumulado é o que torna o merge assustador.

## Corrigindo erros antes do push

Esta é a zona onde o Git brilha. Todos os comandos abaixo são seguros enquanto o commit ainda é local:

```bash
git commit --amend -m "mensagem corrigida"   # corrigiu a mensagem
git add arquivo-esquecido.ts
git commit --amend --no-edit                  # esqueceu arquivo no commit
git reset --soft HEAD~1                       # desfaz o commit, mantém as mudanças staged
git restore arquivo.ts                        # descartou mudança NÃO commitada
```

A hierarquia mental é simples:

- **Mudança não commitada** → `git restore <arquivo>` (cuidado: descarta de verdade)
- **Commit errado, ainda local** → `git reset --soft HEAD~1` (o `--soft` preserva o trabalho)
- **Commit errado, já no remoto** → nunca reescreva histórico compartilhado; faça um commit novo corrigindo

## stash: guardando o trabalho sem commit

Cenário clássico: você está no meio de algo e precisa trocar de branch, mas o código não compila para virar commit.

```bash
git stash                      # guarda as mudanças e limpa a árvore
git stash pop                  # devolve as mudanças mais recentes
git stash list                 # lista o que está guardado
git stash pop stash@{2}        # devolve um stash específico
```

O stash é uma pilha temporária, não um cofre. O que fica mais de um dia no stash tende a se perder — se o trabalho precisa sobreviver, vire branch com commit (com `git switch -c` e commit mesmo incompleto).

## rebase vs merge: quando usar cada um

```bash
git pull --rebase              # seu trabalho fica POR CIMA do que veio do remoto
git rebase main                # na sua branch: rebaseia na main atualizada
git merge main                 # alternativa: traz a main com um commit de merge
```

Regra prática aceita pela maioria dos times:

- **Rebase na sua branch local** antes de abrir o PR: histórico linear, sem "Merge branch 'main'" repetido 14 vezes.
- **Merge (ou squash) no merge do PR**: histórico da main preserva o que aconteceu, nunca é reescrito.

O `--rebase` no pull merece virar default no seu fluxo — evita a poluição de commits de merge triviais no dia a dia.

## As saídas de emergência

As três manobras de resgate, na ordem em que você provavelmente vai precisar:

**1. "Commitei no lugar errado."**

```bash
git reset --soft HEAD~1        # desfaz o commit local
git switch branch-correta
git add -A && git commit -m "no lugar certo"
```

**2. "Quero ver o que tinha naquele commit antigo."**

```bash
git log --oneline              # histórico compacto
git show abc1234               # conteúdo completo do commit
git checkout abc1234 -- arquivo.ts   # recupera só um arquivo
```

**3. "Fiz um desastre no meu repositório local."**

```bash
git reflog                     # lista TUDO que a HEAD já apontou
git reset --hard abc1234       # volta para o estado de qualquer ponto do reflog
```

O `reflog` é o motivo pelo qual quase nada está realmente perdido no Git: toda referência que sua HEAD já teve fica registrada por cerca de 90 dias. A exceção real são mudanças nunca adicionadas (`git add`) — essas o Git não conhece.

## Configuração mínima profissional

```bash
git config --global user.name "Seu Nome"
git config --global user.email "voce@email.com"
git config --global init.defaultBranch main
git config --global pull.rebase true
git config --global alias.st "status -sb"
git config --global alias.lg "log --oneline --graph --decorate -15"
```

Os aliases `git st` e `git lg` pagam a configuração no primeiro dia. O `pull.rebase true` aplica a regra da seção anterior de forma permanente.

## O resumo que vale fixar

- `status` antes de tudo; commits pequenos com mensagem descritiva
- Erro local? `reset --soft` e `--amend` resolvem com segurança
- `stash` é temporário; trabalho que precisa sobreviver vira branch
- Rebase na sua branch, merge na main
- O `reflog` existe: quase nada está perdido de verdade
