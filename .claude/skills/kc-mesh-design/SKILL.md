---
name: kc-mesh-design
description: >
  Use this skill for any visual, voice, or content decision in the
  kansascitymesh.live repo or a fork of it. Triggers on: adding a
  component or page, writing copy, picking a card / button / banner,
  choosing a color from the palette, deciding between mono and sans,
  reviewing or rewriting copy against the voice rules, or asking
  "what's the right component for X." Also triggers on "design system",
  "KC Mesh design", "InfoCard", "FeatureCard", "Cello", "Terracotta",
  "Sage", "Inconsolata", "General Sans", "rounded SaaS", or
  "anti-perfectionism."
---

# KC Mesh design system

The design + voice rules for [kansascitymesh.live](https://kansascitymesh.live). Single-mode dark, palette-locked, two-card / four-button / two-banner vocabulary. Voice is collective first person, anti-perfectionist, sentence case.

If a contributor is forking for their own city, the voice direction will need a rewrite — but the structural rules (card vocabulary, opacity scale, mono-vs-sans, anti-patterns) transfer cleanly.

## Five principles that always hold

1. **Polish is allowed. Polish without substance is not.** A FeatureCard around prose alone is doing too much. A FeatureCard around real evidence (live numbers, photos, the map) is doing the right job.
2. **Collective first person, sentence case, anti-perfectionist.** "We're building," not "I'm building" or "the network provides." "Become a host," not "Become A Host." Honest about gaps and the learning curve.
3. **Two cards. Four buttons. Two banners. No third of anything.** Restraint is the design choice. When you need a "new" surface, check whether one of the existing six covers it. Almost always, it does.
4. **Data wears mono. Prose wears sans.** Callsigns, frequencies, hop counts, timestamps, version stamps, prices, inline code → Inconsolata (`var(--font-mono)`). Everything narrative → General Sans (the default).
5. **Single-mode dark, single-mode warm.** Page `var(--neutral-950)`. Card `var(--neutral-900)`. No light mode. No theme switcher. The palette is the entire vocabulary.

## Quick reference

| When you're doing                                        | Read                                                     |
| -------------------------------------------------------- | -------------------------------------------------------- |
| Picking between InfoCard / FeatureCard / banner / button | `references/design-system.md` § Decision rules           |
| Writing or reviewing copy                                | `references/voice.md`                                    |
| Composing a new page                                     | `references/design-system.md` § Page composition recipes |
| Wondering if something's on-brand                        | `references/design-system.md` § Anti-patterns            |

## Things to internalize before generating anything

- The site is **single-mode dark**. Page `var(--neutral-950)`, cards `var(--neutral-900)`, section dividers fall through to `#000`. No light mode.
- Components are canonical: `InfoCard` + `FeatureCard` (cards), `PrimaryButton` + `DiscordButton` + `SecondaryButton` + plain text links (buttons), `TipBanner` + `MessageBanner` (banners), plus `Nav`, `Footer`, `PulsingDot`, `HardwareCard`, `NetworkPulse`, `AudienceRow`. Don't invent a third of anything.
- Voice is **collective first person** ("we"), **sentence case**, **anti-perfectionist**. Read `references/voice.md` before writing or editing copy.
- Iconography is **`@lucide/astro`** at 1.5–1.75 stroke. No emoji. No hand-drawn SVG.
- Webfonts: **General Sans** (humanist sans, OFL, self-hosted from `public/fonts/`) for prose; **Inconsolata** (mono, Google Fonts) for data.
- **Radii use Tailwind 4 defaults** (2/4/6/8/12/16 px). We had custom overrides; they're gone. Don't reinstate them.
- Border colors via `border-white/10` (faint) or `border-white/20` (hover/strong). Never raw hex.

## Tech stack at a glance

- **Astro 6** (static) — `src/pages/` for routes, `src/components/` for components, `src/styles/globals.css` for tokens
- **Tailwind CSS 4** via `@tailwindcss/postcss` — theme overrides live in `@theme { }` inside `globals.css`
- **`@lucide/astro`** for icons
- **`astro:assets`** for image optimization
- **No client-side framework runtime** — two small inline `<script>` blocks for analytics delegation + live-stats hydration

## When invoked without specific guidance

Ask what surface is being built or edited (page? component? copy?), what audience, what content. Then act as an expert designer who outputs production-ready Astro code (`.astro` files using the canonical components) or, for throwaway prototypes, static HTML that demos a pattern. Voice + visual decisions should both match the live site unless you're explicitly designing something new.
