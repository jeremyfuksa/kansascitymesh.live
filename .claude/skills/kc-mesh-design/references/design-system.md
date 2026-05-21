# KC Mesh design system reference

The decision rules. When to use which card, which button, which banner. What counts as on-brand. What counts as a violation.

If `SKILL.md` is the principles, this file is the operational manual.

---

## Decision rules

### Cards: `InfoCard` vs. `FeatureCard`

| Question                                                            | Use InfoCard | Use FeatureCard |
| ------------------------------------------------------------------- | ------------ | --------------- |
| Is this read-only content the user is absorbing?                    | ✓            |                 |
| Is this a focal element — a CTA, a hero stat, a showcase item?      |              | ✓               |
| Will several of these sit in a grid together at the same hierarchy? | ✓            |                 |
| Is there ONE of these on the page, in a moment of emphasis?         |              | ✓               |
| Does it want to fade into the page rhythm?                          | ✓            |                 |
| Does it want to _lift off_ the page (glass, shadow)?                |              | ✓               |

**Default to `InfoCard`.** `FeatureCard` is the exception, not the rule. The audit found 25 InfoCard instances vs. 9 FeatureCards on the live site — that ratio is correct.

**Anti-pattern:** four FeatureCards in a row. If you have four of anything, they're not focal, they're a list. Use InfoCards.

### Buttons: which one?

| Action                                                                                        | Component                                             |
| --------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| **The single most-important action on the page.** "Become a host." "Email about a host site." | `PrimaryButton` (sage on black)                       |
| **Go to Discord.** Any Discord invite, anywhere.                                              | `DiscordButton` (Discord blurple, three sizes)        |
| **Supporting / external action.** "View Live Map." "Austin Mesh: Similar Networks."           | `SecondaryButton` (outline pill)                      |
| **Nav, footer, "back to home."**                                                              | Plain text link with `text-white/70 hover:text-white` |

**Rule:** one `PrimaryButton` per page, max. If you reach for a second one, you have two competing primary actions and the design is the problem.

### Banners: `TipBanner` vs. `MessageBanner`

| Use                                                                                                                           | Component                                 |
| ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| **Pay attention to this specific tip / pointer.** Channel preset recommendation. Hardware suggestion. Single-paragraph aside. | `TipBanner` (sage gradient + info icon)   |
| **What this looks like in practice.** Multi-paragraph storytelling. Deployment outcomes. Field-log moments.                   | `MessageBanner` (slate gradient, no icon) |

**Rule:** if it's longer than ~3 sentences, it's a `MessageBanner`. If it's a one-shot pointer, it's a `TipBanner`.

### Type: when to reach for mono

| Mono                                     | Sans                 |
| ---------------------------------------- | -------------------- |
| Callsigns: `KCML`, `WESTKC-01`           | Headings, paragraphs |
| Frequency labels: `915 MHz`, `Long Fast` | Section titles       |
| Hop counts: `4 hops`                     | Body prose           |
| Time deltas: `2m ago`, `just now`        | Button labels        |
| SNR readings: `+6.5 dB`                  | Copy in cards        |
| Version stamps: `v2.1.0`                 | Form labels          |
| Inline `<code>` tokens                   |                      |
| Big-stat numbers: `61`, `1,247`, `103`   |                      |
| Hardware prices: `$40`, `$90`            |                      |

**Rule:** if you can read it as "this is something a radio operator would type or read off a screen," it's mono. Otherwise, sans.

### Foreground opacity

Five values, with semantic meaning. Don't introduce a sixth.

| Class           | Use                                                                      |
| --------------- | ------------------------------------------------------------------------ |
| `text-white`    | Headings, strong emphasis                                                |
| `text-white/80` | `TipBanner` body **only** (the exception that brightens up to stand out) |
| `text-white/70` | All body copy. Card bodies. Section ledes.                               |
| `text-white/50` | Footer license, "not sure yet" hints, captions                           |
| `text-white/30` | Version stamp; "fade into background" signal                             |

**Anti-pattern:** body copy at `white/60`. The audit found 41 instances; we consolidated to `white/70`.

### Backgrounds & decoration

| Treatment                                     | Where                         | When to add                                    |
| --------------------------------------------- | ----------------------------- | ---------------------------------------------- |
| Three blurred orbs (sage / calx / terracotta) | Hero, CTAs, FinalCTA          | Top-of-page or section-of-arrival moments only |
| Solid `bg-black`                              | Section dividers              | Default for content sections                   |
| `bg-(--neutral-950)`                          | Page background, all subpages | Default                                        |
| `bg-(--neutral-900)`                          | InfoCard, Footer              | Component-internal                             |
| Grid-pattern overlay (5% opacity)             | FinalCTA                      | Reserved for closing moments                   |

**Anti-pattern:** orbs on every section. They stop reading as atmosphere and start reading as decoration. One orb stack per page (the hero) is plenty.

### Radii

We use **Tailwind 4 defaults**. We had custom overrides (4/6/10/12) earlier; we dropped them when migrating to TW4 because the defaults are tighter and read better.

| Class         | Pixels |
| ------------- | ------ |
| `rounded-xs`  | 2      |
| `rounded-sm`  | 4      |
| `rounded-md`  | 6      |
| `rounded-lg`  | 8      |
| `rounded-xl`  | 12     |
| `rounded-2xl` | 16     |

Component defaults:

| Component                                                                                                                                          | Radius class        |
| -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `InfoCard`, `AudienceRow`, `PrimaryButton`, `SecondaryButton`, `DiscordButton` (default), Hero icon medallion, Hardware badge, Resources medallion | `rounded-md` (6 px) |
| `FeatureCard`, `HardwareCard`, `TipBanner`, `MessageBanner`, Host/Drone/Final CTA medallions, Hardware accent stripe                               | `rounded-lg` (8 px) |
| `DiscordButton` (small), `Nav` logo, `AudienceRow` inner icon, status pill outer                                                                   | `rounded-sm` (4 px) |
| Status pills, getting-started step circles, `PulsingDot`                                                                                           | `rounded-full`      |

Never override radii inline.

---

## Page composition recipes

### Homepage

```
Nav (transparent, becomes dark on scroll)
↓
Hero
  · Title with gradient-text on the noun
  · Two-up: FeatureCard (intro) + FeatureCard (map preview)
↓
NetworkPulse  ← the "this is actually happening" moment
  · 3 stat tiles (Inconsolata)
  · 6-cell activity grid (callsigns + status dots)
↓
HardwareSection
  · 4-up HardwareCard grid (glass + gradient accent + photo)
↓
ResourcesSection
  · 3-up FeatureCard grid (interactive)
↓
HostInfrastructureCTA
  · Single large FeatureCard
↓
DroneFlyCTA
  · Single large FeatureCard
↓
FinalCTASection
  · Hero-style closer with medallion
↓
Footer
```

### Subpage / article (Get Started, Host a Node, Steal, FAQ, Field Log)

```
Nav (always dark — never transparent on subpages)
↓
SubpageHeader
  · "Back to home" text link
  · Optional kicker pill ("KC Backbone Initiative")
  · H1 with optional gradient-accent span
  · Lede paragraph at text-xl, white/70
↓
Article body — max-w-3xl (768 px)
  · One H2 per section
  · Body prose at text-base / white/70 / leading-relaxed
  · InfoCards for lists of similar items
  · TipBanner for the one pointer per section
  · MessageBanner for the storytelling moment
↓
Closing CTA section
  · padding-top: 32; border-top: 1px solid white/10
  · One PrimaryButton + one DiscordButton, max
↓
Footer
```

### Dashboard / data page (`/status`)

```
Nav (dark)
↓
SubpageHeader — narrower top padding, no orbs, with PulsingDot eyebrow
↓
Stat tile grid — max-w-6xl, multiple rows by section (Active / Totals / Discord)
↓
Data table inside a FeatureCard (the table is the focal element)
↓
"Right now" MessageBanner — narrative around the data
↓
Footer
```

---

## Anti-patterns (don't do these)

Each of these is a real pattern that has been removed from the site.

### Visual anti-patterns

- **A third card style.** If the design seems to need one, it needs simplification, not a new component.
- **Two `PrimaryButton`s on one page.** If you have two important actions, you have one important and one supporting.
- **Hover on every text link.** Plain links don't need `translate-y`. Save it for buttons and cards.
- **A new color outside the palette.** Including: pure black `#000` on a card surface (use `var(--neutral-900)`), pure white `#fff` on body text (use `text-white` only on headings and strong).
- **Emoji.** Anywhere. Including 📡 and 🌐.
- **Illustration.** No hand-drawn iconography. No isometric "future of comms" graphics. No people in stock photography.
- **Light mode tokens or alternates.** The system is dark-only.
- **Raw `#000000` borders.** Use `border-white/10` (faint) or `border-white/20` (hover/strong).
- **Custom `--radius-*` overrides.** TW4 defaults are correct; the override block from the design-system migration was dropped on purpose.

### Iconography anti-patterns

- **Drawing a new SVG icon.** Use `@lucide/astro`. If lucide doesn't have it, choose a closer existing icon — don't invent.
- **Filled icons mixed with stroked icons.** Lucide is stroke-only at 1.5–1.75 weight; the only filled glyph is the Discord brand mark.
- **Icons sized inconsistently within a row.** Pick one size per context: 14 in nav, 16 in buttons, 20 in card headers, 24 in resource medallions, 28 in CTA medallions.

---

## Component cheatsheet

One-line summary of every canonical component. Full source in `src/components/`.

| Component         | One-line                                                                                              |
| ----------------- | ----------------------------------------------------------------------------------------------------- |
| `Nav`             | Fixed top nav. Transparent on home above the fold; dark on scroll/subpages. Logo + badge link to `/`. |
| `Footer`          | Dark `var(--neutral-900)`. Nav links + copyright + license + version stamp (mono).                    |
| `PulsingDot`      | 12-px live indicator in Meshtastic-green. Ping animation.                                             |
| `PrimaryButton`   | Sage on black. The page's one most-important action.                                                  |
| `SecondaryButton` | `white/5` outline pill. Supporting / external action.                                                 |
| `DiscordButton`   | Discord blurple. Three sizes (small / default / large).                                               |
| `InfoCard`        | Solid `var(--neutral-900)` surface. Default card. In-content lists.                                   |
| `FeatureCard`     | Glass `white/5 backdrop-blur-xl`. Focal / showcase only.                                              |
| `TipBanner`       | Sage gradient + info icon. "Pay attention."                                                           |
| `MessageBanner`   | Slate gradient. Multi-paragraph narrative moments.                                                    |
| `AudienceRow`     | Horizontal row with left-edge gradient stripe. "This is you, specifically."                           |
| `HardwareCard`    | Glass + gradient accent + product photo. Hardware showcase only.                                      |
| `NetworkPulse`    | Live-status block: stat tiles + activity grid. Homepage above-fold.                                   |

Plus page-level section components: `HeroSection`, `HardwareSection`, `ResourcesSection`, `HostInfrastructureCTA`, `DroneFlyCTA`, `FinalCTASection`. These are composed of the canonical primitives above.

---

## When in doubt

Ask which of these reads most true for the surface you're building:

- **"This is a field log."** Lean toward sans body + mono data + `InfoCard` surfaces + restrained color.
- **"This is a focal moment."** Lean toward `FeatureCard` + gradient accent + slightly more breathing room.
- **"This is reference material."** Plain prose at `text-white/70` inside a `max-w-3xl` article. No cards.

The vocabulary is small enough that two-or-three of these almost always cover the design problem. If none feel right, the design problem may need to be rethought — not a new component.
