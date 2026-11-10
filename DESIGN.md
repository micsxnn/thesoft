# DESIGN.md — thesoft

## Mundo visual: Minimal Swiss dark
Suíço minimalista em polaridade escura: tipografia é a protagonista, o espaço em branco (espaço vazio) é o recurso de luxo, hairlines substituem sombras, um único acento discreto. Referências de espírito: Vercel blog, rauno.me, gráfica suíça moderna.

## Tokens
- Canvas: `#0A0A0A` (fundo), `#111111` (superfícies inset: código)
- Texto: `#FAFAFA` primário, `#A1A1AA` secundário/muted
- Hairline: `rgba(255,255,255,0.08)` (bordas 1px, sem sombras)
- Acento único: `#5CE49E` (verde menta) — tags, estados ativos, seleção de texto, hover preciso. Nunca em grandes áreas.
- Raio: 2px (quase reto — Swiss; nada de cantos médios arredondados)
- Tipografia: **Geist Sans** (títulos + corpo), **Geist Mono** (código, datas e dados numéricos)
- Tracking: display -0.04em/-0.05em; títulos de post -0.02em

## Tipografia
- Wordmark/hero: até 6rem, peso 600, tracking apertado
- Títulos de post na lista: 1.25–1.5rem, peso 500-600
- Corpo: 1rem–1.0625rem, leading 1.7–1.75, medida 65–72ch
- Meta (data, leitura, tags): 0.8125–0.875rem, mono para datas
- Hierarquia por peso e tamanho, nunca por cor ou gradiente

## Estrutura
- Listas editoriais com hairlines horizontais (1px), NÃO cards uniformes com ícone+heading+texto
- Proibido: kickers/eyebrows, gradient text, border-left colorida, seções numeradas decorativas, glass decorativo
- Sem cards flutuantes: elevação por hairline, nunca drop-shadow
- Botões: retos (2px), texto com estado hover preciso (underline offset, mudança de cor)
- Capa do post: imagem real em 16/9, hairline no contorno, sem sombra, sem padding — o post abre com a foto, não com um placeholder
- Thumbnail na lista: 128×80 (mobile) / 160×96 (desktop), alinhada à esquerda do texto, opacidade 80% → 100% no hover

## Hierarquia de navegação
- **Categoria** é o eixo principal: aparece na lista (mono, acento), na página do post (chip com borda de acento) e tem rota própria em `/categoria/[slug]`
- **Tags** são o eixo secundário: ficam na página do post e em `/tag/[slug]`, mas não poluem a lista — a lista mostra categoria, não uma parede de tags
- Meta (data, tempo de leitura) sempre em mono tabular

## Motion
- Um momento autoral: reveal do hero (fade + rise com stagger curto, ease-out exponencial)
- Hover nos títulos da lista: transição de cor para acento + deslocamento sutil
- Nada de animações espalhadas por seção

## Tipografia em fluxo
- Títulos multi-linha: `text-wrap: balance` (evita a última linha com uma palavra solta)
- Corpo de texto: `text-wrap: pretty` (evita o buraco no fim do parágrafo)

## Superfícies do browser (obrigatório)
- Seleção de texto: bg acento `#5CE49E`, fg `#0A0A0A`
- Scrollbar fina customizada (thumb `rgba(255,255,255,0.15)`)
- Focus ring visível (acento) em todos os interativos
- Links de texto: underline offset 3-4px, decoração hairline
- Código: fundo `#111111`, hairline, mono Geist, highlight dark próprio (keywords verde menta, strings âmbar suave, comentários cinza)

## Layout
- Container: max-w-4xl posts / max-w-6xl home, padding lateral generoso
- Footer sticky (min-h-screen flex col, mt-auto), hairline top
- Header sticky: fundo canvas/85 + blur funcional (legibilidade), hairline bottom, altura 56-64px
- Mobile-first; breakpoints sm/md/lg; toque ≥44px
