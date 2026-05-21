# Contributing

Most of what's worth fixing on this site is small: a node count that's out of date, a typo in the FAQ, a hardware price that drifted, a Discord regular's favorite tip we should add. None of it requires being a developer.

This file is for everyone who might want to change something — Discord regulars, ham operators, designers, devs. It's also the start of [FORK-FOR-YOUR-CITY](FORK-FOR-YOUR-CITY.md) if you're standing up your own city's mesh site.

## The two-minute path: fix a typo or a fact

Spot something wrong and don't want to clone the repo? Two options:

1. **Open an issue** — pick the most fitting template at [the issues page](https://github.com/jeremyfuksa/kansascitymesh.live/issues/new/choose). The "Typo or copy fix" template takes about 30 seconds.
2. **Edit on GitHub directly** — every page on the site corresponds to one `.astro` file under [`src/pages/`](src/pages/). Open the file, hit the pencil icon, make your edit, "Propose changes." GitHub turns it into a pull request automatically.

If you'd rather ping us in the [Discord](https://discord.gg/yr2QTFSvzN), that works too. Mention what page and what's wrong; we'll handle the PR.

## The longer path: clone and edit

If you want to make more than a typo fix:

```bash
git clone https://github.com/jeremyfuksa/kansascitymesh.live
cd kansascitymesh.live
npm install
npm run dev      # http://localhost:4321 — live-reloads on save
```

Before opening a PR:

```bash
npm run format   # Prettier — keeps the diff small
npm run check    # astro check (TypeScript + Astro type validation)
npm run build    # production build to dist/
```

CI runs the last two on every PR. Run them locally first if you can; it shortens the feedback loop.

## What lives where

| Folder                   | What's in it                                                                                                                                |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/pages/`             | One `.astro` file per route. Astro turns the file path into the URL.                                                                        |
| `src/components/`        | Reusable Astro components — `InfoCard`, `FeatureCard`, `PrimaryButton`, `TipBanner`, etc.                                                   |
| `src/data/`              | Editable data — `hardware.ts` is the hardware list, `networkStatus.ts` is the live-status block.                                            |
| `src/constants/`         | Discord invite, contact email, GA measurement ID.                                                                                           |
| `src/styles/globals.css` | Color palette + font tokens + a few base styles.                                                                                            |
| `src/assets/`            | Product photos + logo. Astro's image pipeline auto-converts to WebP.                                                                        |
| `docs/`                  | Voice and design audits. The diagnostic catalogs the copy is held to.                                                                       |
| `CLAUDE.md`              | Project-level instructions for the AI assistants that work in this repo. Worth a skim if you want to know how the site thinks about itself. |

## Common changes — concrete examples

### Update a node count or stat

Edit [`src/components/HeroSection.astro`](src/components/HeroSection.astro) for the homepage "60+ active nodes" claim. Edit [`src/data/networkStatus.ts`](src/data/networkStatus.ts) for the NetworkPulse and `/status` page numbers.

### Add or fix a hardware item

Edit [`src/data/hardware.ts`](src/data/hardware.ts). Every device on the site is rendered from this one file. To add a new device, add an entry; to fix a price, change one field; to add specs to a detail page, populate the `specs`, `whatWeLike`, and `caveats` fields.

### Drop in a hardware photo

Put the image in [`src/assets/`](src/assets/), then import it in `src/data/hardware.ts`. Astro will optimize it at build time.

### Fix copy

Find the page under `src/pages/`. Edit the prose. The site uses sentence case for headings and buttons — "Become a host," not "Become A Host."

### Add an FAQ entry

Edit the `faqs` array at the top of [`src/pages/faq.astro`](src/pages/faq.astro). Order matters — most common first.

### Add a field-log post

Copy [`src/pages/log/bonner-tower.astro`](src/pages/log/bonner-tower.astro), rename it (the filename becomes the URL), edit the front matter and prose. Add the post to the `entries` array in [`src/pages/log/index.astro`](src/pages/log/index.astro).

## Voice notes

The site speaks as "we" — the KC Mesh community of 200+, not as one person. Honest about gaps and the learning curve. Welcoming to everyday people. Anti-perfectionist: "deployed imperfect beats theoretical perfect."

If you want the full diagnostic catalog, [`docs/VOICE-AUDIT-2026-05.md`](docs/VOICE-AUDIT-2026-05.md) has it. The shorter version:

- **Sentence case for everything.** "Get started," not "Get Started."
- **No corporate vocabulary.** Avoid "leverage," "solutions," "ecosystem," "stakeholders," "empower."
- **No graduation-speech sentences.** "We're not just building a network. We're building a community." — cut it.
- **No wrap-up codas.** Don't end a section with "And that's the magic of community mesh networking." Just stop.
- **Specific over vague.** "60+ active nodes" beats "a thriving network."
- **Anti-dogma posture.** "15 feet is fine," "indoor sometimes works," "horizontal antennas have trade-offs but work" — explicit, not implied.
- **Use Inconsolata (`font-mono`) for data**, not prose: callsigns, frequencies, hop counts, version stamps. Use General Sans (the default) for everything else.

## Design notes

The design system is documented in [`docs/DESIGN-AUDIT-2026-05.md`](docs/DESIGN-AUDIT-2026-05.md). Short version:

- **Two card styles, no third.** `InfoCard` (solid, "absorb this") and `FeatureCard` (glass, "notice this"). Don't add a third.
- **Four button styles, no fifth.** `PrimaryButton` (sage, single most important action per page), `DiscordButton` (three sizes), `SecondaryButton` (outline pill), text links.
- **Single-mode dark.** Page = `var(--neutral-950)`. Card = `var(--neutral-900)`. No light mode.
- **Tailwind 4 defaults.** Use semantic tokens (`bg-(--success-500)`, `text-white/70`). Avoid raw palette classes like `bg-blue-600`.

If you're introducing a visual pattern that doesn't fit, ask in Discord or open an issue before sinking time into it.

## Commit conventions

We use [Conventional Commits](https://www.conventionalcommits.org/) — `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `style:`. The history is part of how this project explains itself to future contributors. A typical commit:

```
fix(hardware): correct Heltec V4 price to $40

The detailPrice was showing $50; current AliExpress/Amazon listings
are $35–$40. Spotted by @jdoe in Discord.
```

Not enforced by tooling, just convention.

## Pull requests

1. **Branch from `main`** with a descriptive name: `fix/heltec-price`, `docs/faq-clarify-licensing`, `feat/log-add-blue-springs-post`.
2. **Make the change, run the verify loop** (`npm run format && npm run check && npm run build`).
3. **Open the PR.** The template will ask you for a one-line summary and a checkbox-style test plan. Fill it in honestly — if you didn't viewport-test the change, say so.
4. **CI runs typecheck + build** on every PR. Both have to pass before merge.
5. **A maintainer reviews.** Small fixes typically merge same-day; larger changes might come with feedback.

### Branch protection

`main` is protected. Specifically:

- **Direct pushes are blocked.** All changes land via PR.
- **CI must pass.** The `Typecheck + build` check (from `.github/workflows/ci.yml`) is a required status check. Format + typecheck + build all have to be green.
- **Force-pushes are disabled.** History on `main` can't be rewritten.
- **Branch deletion is disabled.** Nobody can accidentally `git push --delete origin main`.
- **Reviews are not required.** Solo-maintainer project; the maintainer can self-merge their own PRs once CI is green. If multiple maintainers come on board, this is worth revisiting.
- **Admins aren't separately enforced.** The maintainer can bypass these rules in a genuine emergency (e.g. CI broken by an upstream change and the site needs a fix shipped). Not used for routine work.

If something here ever seems wrong — for example a "Typecheck + build" required check that doesn't exist on the actual workflow — open an issue. These settings are checked in via this section, not via a `branch-protection.yml` config file, so they can drift if changed via the web UI without updating this doc.

## Issue templates

Pick the one that fits at [Issues → New issue](https://github.com/jeremyfuksa/kansascitymesh.live/issues/new/choose):

- **Typo or copy fix** — fastest path. Page + what's wrong + what it should say.
- **Update a hardware item or data point** — for stats, prices, devices, FAQ corrections.
- **Bug report** — something on the live site is broken or rendering wrong.
- **Feature or content idea** — something we could add. Use this loosely; not every idea needs a long writeup.

Choose "Open a blank issue" if none of those fit.

## Forking for your own city?

[FORK-FOR-YOUR-CITY.md](FORK-FOR-YOUR-CITY.md) is the concrete checklist. The TL;DR: change four constants, swap the hardware list to your community's favorites, rewrite the copy to your voice, and you're 80% there.

## Code of conduct

[CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md). Be kind, assume good faith, no harassment. Standard stuff.

## Questions

The [Discord](https://discord.gg/yr2QTFSvzN) is the fastest way to get an answer. The maintainers all hang out there.
