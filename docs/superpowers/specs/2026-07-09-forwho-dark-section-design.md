# ForWho — tratamento de fundo escuro ("Pausa Dramática")

## Problema

`src/components/sections/for-who.tsx` ("Este lugar é seu / Para quem é o programa") usa `bg-neutral-light` (#F7F5F3), quase idêntico ao branco puro das seções vizinhas. Sequência atual: SocialProof (branco) → ForWho (quase-branco) → NotForWho (branco). Três seções claras seguidas fazem a seção sumir no scroll — zero destaque visual.

## Decisão

Reaproveitar o tratamento dark já estabelecido em `about-nil.tsx` (gradiente radial vinho sobre `neutral-dark`) e `results.tsx`. Sem tokens novos — só reuso de padrão existente. Quebra a sequência de 3 seções claras com uma pausa escura antes do `NotForWho`.

## Mudanças em `for-who.tsx`

| Elemento | Antes | Depois |
|---|---|---|
| `<section>` className | `bg-neutral-light` | `relative overflow-hidden bg-neutral-dark`, mesmo `id`/`py` |
| `<section>` style | — | `background: radial-gradient(ellipse at 30% 40%, color-mix(in srgb, var(--color-secondary) 40%, transparent) 0%, var(--color-neutral-dark) 60%, var(--color-neutral-dark) 100%)` (idêntico ao `about-nil.tsx`) |
| eyebrow | `text-primary/70` | `text-gold/80` |
| `h2` | `text-neutral-dark` | `text-white` |
| subtítulo `p` | `text-neutral-dark/70` | `text-white/70` |
| `TiltCard` className | `border-gold/25 bg-white ... hover:shadow-gold/10` | `border-gold/25 bg-white/[0.04] ... hover:shadow-gold/20` |
| ícone (`item.icon`) | `text-gold-deep` | `text-gold` |
| label `span` | `text-neutral-dark` | `text-white` |
| descrição `p` | `text-neutral-dark/55` | `text-white/55` |

Círculo do ícone (`border-gold/40 bg-gold/10`, hover `group-hover:bg-gold group-hover:shadow-gold/30`) permanece igual — já funciona sobre fundo escuro.

## Fora de escopo

- Não mexe em `not-for-who.tsx` nem em outras seções.
- Não introduz novo token de cor/gradiente — reuso exato de `about-nil.tsx`.
- Sem mudança de copy, ícones ou estrutura do grid.

## Validação

Rodar `npm run dev`, conferir visualmente contraste texto/fundo e transição com `SocialProof` (acima) e `NotForWho` (abaixo).
