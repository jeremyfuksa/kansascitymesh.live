# Design system + structural audit — May 2026 (Phase B)

This is the second pass following the voice/content audit. Phase A normalized the writing; this pass normalizes the visual and structural patterns the writing lives inside.

## Decisions already made

1. **Palette stays.** The existing Cello/Terracotta/Black Rock/Sage/Golden Amber/Blue Calx palette in `globals.css` is the source of truth. CLAUDE.md will be updated to document what's actually implemented (current spec lists KC Red/KC Blue/Meshtastic Green which the code never adopted).
2. **No Campfire migration.** This site stays on its own palette, not `@jeremyfuksa/campfire`.
3. **No light mode added.** The site stays single-mode dark. The light-mode tokens in `globals.css` are unused and can be left in place or trimmed later.
4. **Comprehensive refactor.** Where two cards have different padding/radius/border, pick the canonical one and apply everywhere. Where three text-opacity values are used for the same semantic role, consolidate.

---

## Section 1 — What's there now

### Surface patterns (the "card" problem)

There are **three distinct card surface treatments** in active use, plus the two banner styles defined in CSS:

**Pattern A — "Solid card"** (used in most card-grid contexts)

```
bg-[var(--neutral-900)] border border-white/10 rounded-xl p-6
```

Where it appears: GetStartedPage (Step 1 hardware cards, Step 2 source cards, Step 4 setting cards, Step 3 flash steps wrapper); HostANodePage ("What makes a great host site" cards, "What KC Mesh provides in return" cards); StealThisNetworkPage ("What you can use" cards, lineage cards, operationalTips cards).
Count: ~25 instances.

**Pattern B — "Glass card"** (used in feature/showcase contexts)

```
bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl shadow-black/50
```

Where it appears: HeroSection (left card, right card); ResourcesSection (link cards); HostInfrastructureCTA (single card); DroneFlyCTA (single card, but without the shadow); HostANodePage hostTypes grid cards.
Count: ~9 instances.

**Pattern C — "Hover-lift glass card"** (a variant of Pattern B with hover behavior)

```
bg-white/5 border border-white/10 rounded-2xl p-6 transition-all
  hover:bg-white/10 hover:border-white/20 hover:-translate-y-1
```

Where it appears: HardwareCard, HostANodePage hostTypes cards. (Note: hostTypes cards exist in both B and C variants depending on file — actually it's just C in HostANodePage, but B-shaped in ResourcesSection.)
Count: ~6 instances.

**Banner D — "Tip banner"** (defined in `globals.css` as `.tip-banner`)

- Sage-green gradient, sage border, large padding (`p-8`), large radius (`rounded-[1.25rem]`)
- Used 3x: HostANodePage (in "Why hosted infrastructure matters"), GetStartedPage (Step 1 lede tip, Step 4 channel preset tip).

**Banner E — "Message banner"** (also in `globals.css` as `.message-banner`)

- Slate gradient, neutral border, same large padding/radius
- Used 2x: HostANodePage ("What this looks like in practice" callout), GetStartedPage (Step 5 hello block).

### The actual divergence

The inconsistency isn't _that_ there are multiple card styles — it's that **the same semantic content uses different visual styles in different places**:

- **HostANodePage hostTypes cards use Pattern C** (hover-lift glass), but **StealThisNetworkPage "What you can use" cards use Pattern A** (solid). Both are "list of clickable-feeling card descriptions" with the same semantic role. They should look the same.
- **HardwareCard uses Pattern C** with a gradient accent bar on top. The hardware-related cards on GetStartedPage Step 1 use **Pattern A** (no image, no accent). Two different presentations for the same data.
- **DroneFlyCTA and HostInfrastructureCTA are both single-card homepage CTAs** but DroneFlyCTA lacks the `shadow-xl shadow-black/50` that HostInfrastructureCTA has.
- **HostANodePage has both styles of card on the same page** — Pattern A for the "what makes a great host site" and "what KC Mesh provides" lists, Pattern C for the hostTypes grid. There's no clear rule distinguishing when to use which.

### Button patterns

**Button 1 — "Primary green CTA"** (lime green, black text)

```
inline-flex items-center justify-center gap-2 px-6 py-3.5
  bg-[var(--success-500)] text-black rounded-xl font-medium text-[15px]
  transition-all hover:bg-[var(--success-600)] hover:text-white
  hover:scale-105 hover:shadow-2xl active:scale-100
```

Used: HostInfrastructureCTA ("Become a host"), HostANodePage ("Email about a host site"), StealThisNetworkPage ("Email us about your city").

**Button 2 — DiscordButton component** (Discord brand color)

```
inline-flex items-center justify-center gap-2 bg-[#5865F2] text-white rounded-xl
  font-medium transition-all hover:bg-[#4752C4] hover:scale-105 hover:shadow-2xl
  hover:shadow-[#5865F2]/25 active:scale-100
  // + size variants px-6 py-3.5 text-[15px] OR px-8 py-5 text-[17px]
```

Used: everywhere a Discord invite is offered.

**Button 3 — "White on dark map button"** (one-off on hero)

```
inline-flex items-center gap-2 px-5 py-3 bg-white text-black rounded-xl
  transition-all hover:scale-105 hover:shadow-2xl active:scale-100 group/btn
  text-sm font-medium
```

Used: HeroSection right card ("View Live Map") — one place.

**Button 4 — "Outline pill"** (StealThisNetworkPage partner-list link)

```
inline-flex items-center gap-2 px-5 py-3 bg-white/5 border border-white/10
  text-white rounded-xl hover:bg-white/10 hover:border-white/20 transition-all
```

Used: StealThisNetworkPage (one place).

**Button 5 — "Nav-style Discord link"** (Discord button in Nav, smaller)

```
px-3 md:px-4 py-2 bg-[#5865F2] text-white rounded-lg text-sm font-medium
  hover:bg-[#4752C4] transition-colors
```

Used: Nav only.

**Button 6 — "Text link / nav button"** (e.g. footer nav, page nav)

```
text-white/60 hover:text-white transition-colors text-sm
```

Used: Footer nav, Nav text links, "Back to home" buttons.

### The button divergence

- The Discord nav button (Button 5) and the standard DiscordButton (Button 2) are visually different — different padding, different border-radius (rounded-lg vs rounded-xl), different hover effect — but they're both "go to Discord." Pick one and use it everywhere, or formalize a `size="small"` variant.
- The HeroSection "View Live Map" button (Button 3) is a one-off white-on-dark variant. It works visually but it's the only place this style exists. Decide: promote it to a reusable secondary-action style, or replace it with something else.
- The StealThisNetworkPage partner-list button (Button 4) is the only "outline pill" on the site. Same call: promote or replace.

### Text-opacity usage

7 different opacity values for `text-white` are in active use:
| Class | Count | Where it appears |
|-------|-------|------------------|
| `text-white/70` | 44 | Body prose on dark surfaces |
| `text-white/60` | 41 | Card body prose, slightly muted body |
| `text-white/50` | 7 | Footer license line; "Not sure yet?" hint |
| `text-white/80` | 5 | Tip-banner body |
| `text-white/40` | 3 | Footer copyright |
| `text-white/90` | 2 | Map button price text |
| `text-white/30` | 1 | Version number |

The `white/60` vs `white/70` divergence is the most consequential — it's used for the same content type (body prose inside cards vs. body prose at section level) with no semantic difference. **Pick one.** The other muted variants (`white/50`, `white/40`, `white/30`) are appropriate for their roles (small print, copyright, version stamp) but should be normalized to one micro-print value.

### Section-wrapper patterns

Homepage sections use slightly different wrappers:

- HardwareSection: `px-4 py-10 bg-black border-t border-white/10`
- ResourcesSection: `px-4 py-10 bg-black border-t border-white/10` ✓
- HostInfrastructureCTA: `px-4 py-16 bg-black border-t border-white/10 relative overflow-hidden`
- DroneFlyCTA: `px-4 py-16 bg-[var(--neutral-950)] border-t border-white/10 relative overflow-hidden`
- FinalCTASection: `px-4 py-24 md:py-16 relative overflow-hidden border-t border-white/10` (no bg!)

Note: HardwareSection and ResourcesSection use `py-10`. The CTAs use `py-16`. FinalCTA uses `py-24 md:py-16`. There's a real reason for the variation (CTAs need more breathing room), but DroneFlyCTA's `bg-[var(--neutral-950)]` vs the others' `bg-black` is arbitrary — it makes the drone CTA _slightly_ lighter than the host CTA above it, which looks unintentional.

### Misc inconsistencies

- **DroneFlyCTA's card lacks `shadow-xl shadow-black/50`** while HostInfrastructureCTA's card has it. They're adjacent on the homepage. The drone card sits visibly flatter.
- **HardwareCard uses `rounded-2xl`** for the card but `rounded-t-2xl` for the gradient accent — fine. The `rounded-lg` for the badge is inconsistent with everything else, which uses `rounded-xl` / `rounded-2xl`.
- **The PulsingDot uses `bg-emerald-500`** — that's raw Tailwind, not a CSS variable. Everywhere else uses `var(--success-500)`. The emerald-500 hex (#10b981) is close but not identical to the sage `#8fb14b`. **This is a real bug** — the pulsing dot's green doesn't match anything else green on the site.
- **All buttons have `hover:scale-105`** except the small ones (Nav Discord button, Back to home buttons, text links). Inconsistent — either the scale is the convention or it isn't.

---

## Section 2 — The proposed canonical set

### Canonical card styles (2, not 3)

Reduce three patterns to two. Rule: **what** the card is for determines the style.

**`InfoCard` — for dense reference content (the most-used card)**

```
bg-[var(--neutral-900)] border border-white/10 rounded-xl p-6
+ hover:border-white/20 transition-colors  // when card is clickable/grouped
```

Replaces Pattern A. Used for all in-content lists: hardware specs, step instructions, FAQs, host-type descriptions, operational tips, lineage cards. The "solid" treatment signals "read this; it's information."

**`FeatureCard` — for showcase/CTA content**

```
bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl shadow-black/50
+ hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 transition-all  // when interactive
```

Replaces Patterns B and C. Used for hero cards, the home-page CTAs (HostInfrastructureCTA, DroneFlyCTA), the resource link cards, the HardwareCard. The "glass" treatment signals "this is a focal element."

The `hover:-translate-y-1` is only added when the card is itself a link or button (HardwareCard, Resource cards). Static feature cards (Hero stat card, the CTA section cards) get hover-color-only or no hover at all.

### Canonical button hierarchy

**`PrimaryButton` — single most-important action on a page**

- Uses `bg-[var(--success-500)] text-black` + the existing hover-state recipe.
- Used: "Become a host" CTA, "Email about a host site," "Email us about your city."
- Same visual everywhere it appears.

**`SecondaryButton` — secondary or supporting actions**

- Replaces Buttons 3 and 4 with one style.
- `bg-white/5 border border-white/10 text-white px-5 py-3 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all`
- Used: "View Live Map" on HeroSection, "Austin Mesh: Similar Networks" partner-list link.

**`DiscordButton` (existing component)** — keep as-is, but standardize on it.

- Remove the manual Discord button in Nav.tsx; replace with `<DiscordButton size="small">`.
- Add a `size="small"` variant: `px-3 md:px-4 py-2 rounded-lg text-sm`.

**`TextButton`** — for nav links, footer links, "back to home" buttons.

- `text-white/70 hover:text-white transition-colors text-sm`
- Note: this also resolves the text-opacity question for the nav/footer text style.

### Canonical text-opacity scale

| Use                          | Class                          | Hex equivalent (over neutral-950 #1c1f26)     |
| ---------------------------- | ------------------------------ | --------------------------------------------- |
| Heading text on dark         | `text-white`                   | full white                                    |
| Body prose                   | `text-white/70`                | (one canonical body color, drop white/60)     |
| Muted/secondary prose        | `text-white/50`                | (drop white/40 and white/30 in favor of this) |
| Card-internal body           | `text-white/70` (matches body) |                                               |
| Hover/active state for muted | `hover:text-white`             |                                               |

**Migration:**

- All `text-white/60` → `text-white/70` (44 instances merge into 41+44 = canonical body).
- All `text-white/80` (used in tip-banner body) → can stay if you want tip-banner content slightly brighter than card content, or merge to `/70`. I'd argue tip-banner is meant to _stand out_ so `/80` is correct. Keep as the exception.
- `text-white/40` (copyright) → `text-white/50` (matches footer license line).
- `text-white/30` (version) → `text-white/50` or keep as the smallest type signal. Probably keep `/30` if you want version to literally fade into the background.
- `text-white/90` (price label on map button) → just `text-white` if it's a label; reconsider what it's doing.

The simplified scale: **white / white/70 / white/50 / white/30** (4 values), with `white/80` reserved for the tip-banner emphasis.

### Canonical section wrappers

Homepage sections:

- **Content sections** (Hardware, Resources): `px-4 py-10 bg-black border-t border-white/10`
- **CTA sections** (HostInfrastructureCTA, DroneFlyCTA): `px-4 py-16 bg-black border-t border-white/10 relative overflow-hidden`
- **Final hero-style section** (FinalCTASection): `px-4 py-24 md:py-16 bg-black border-t border-white/10 relative overflow-hidden`

The fix: DroneFlyCTA changes `bg-[var(--neutral-950)]` → `bg-black` so the two homepage CTAs share the same background tone.

Subpages:

- Standard `min-h-screen bg-[var(--neutral-950)]` shell. Already consistent.

### Canonical hover/transition

Decide once:

- **Cards**: when clickable, `hover:border-white/20 hover:-translate-y-1 transition-all`. When static, no hover or `hover:border-white/20` only.
- **Buttons**: `hover:scale-105 hover:shadow-2xl active:scale-100 transition-all` for primary buttons. `hover:bg-white/10` (no scale) for secondary/text buttons.
- **Text links**: `hover:text-white transition-colors` only. No scale, no shadow.

### PulsingDot color fix

```diff
- <div className="absolute w-3 h-3 bg-emerald-500 rounded-full animate-ping opacity-75"></div>
- <div className="relative w-2 h-2 bg-emerald-500 rounded-full"></div>
+ <div className="absolute w-3 h-3 rounded-full animate-ping opacity-75" style={{ backgroundColor: 'var(--success-500)' }}></div>
+ <div className="relative w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--success-500)' }}></div>
```

Or, if you prefer keeping the dot a distinctly brighter green than the success/sage color (which is `#8fb14b` — somewhat muted), keep emerald but call it out in the palette as an intentional accent. My recommendation is to align it with the rest of the system.

---

## Section 3 — Structural cleanup

### 3A. Hardware data deduplication

Currently the same four devices are described in two places with slightly different copy and structure:

- `HardwareSection.tsx` defines an inline `hardware = [...]` array with name/price/badge/description/color/image fields.
- `GetStartedPage.tsx` Step 1 has four hand-rolled `<div>` cards with name/price/description embedded in JSX (no badge, no image, slightly different prose).

**Proposed structure:**

1. Create `src/data/hardware.ts` exporting a typed `hardware` array as the single source.
2. Define two presentation modes for the same data: **showcase** (image + badge + price + short description — for the homepage hero/grid) and **detail** (longer description + use case — for Get Started).
3. The detail-mode descriptions become a `detailDescription` field on each item:
   ```ts
   {
     name: 'Heltec V3/V4',
     priceLow: 35, priceHigh: 40,
     badge: 'Beginner',
     shortDescription: "Most popular starter node. Compact and easy to set up.",
     detailDescription: "Most popular starter unit. Small screen, built-in LoRa antenna. Works with your phone via Bluetooth. Perfect for testing coverage while you drive around.",
     color: 'from-[var(--primary-500)] to-[var(--primary-700)]',
     image: heltecV4,
   }
   ```
4. Both `HardwareSection` and `GetStartedPage` import from this single source.

Side effect: the four devices are no longer drifting. Adding/removing/renaming a device is a one-line change.

### 3B. Email constant consolidation

Currently:

- `HostANodePage.tsx` line 13: `const HOST_EMAIL = 'hello@orangefla.me';`
- `StealThisNetworkPage.tsx` line 12: `const STEAL_EMAIL = 'hello@orangefla.me';`

Both identical. Proposal:

1. Add `src/constants/contact.ts` exporting `CONTACT_EMAIL`.
2. Replace both usages.
3. While there, document in CLAUDE.md that this is plumbing — it's still Jeremy's address, but it's framed as the community contact.

### 3C. Copyright year

Currently hardcoded `© 2026` in Footer.tsx. Will be wrong on Jan 1.

Two options:

- **Dynamic year**: `{new Date().getFullYear()}`. Simple, always correct.
- **Year range**: `© 2025–{new Date().getFullYear()}` — also valid. The project started in 2025.

Recommendation: year range. Captures the project's actual lifetime.

---

## Section 4 — Estimated blast radius

If everything in Sections 2 and 3 ships:

**Files modified:** ~10 components, 1 new file (`src/data/hardware.ts`), 1 new file (`src/constants/contact.ts`), Footer year update.

**Lines changed:** maybe 200 lines total. Most are className swaps (Pattern A → InfoCard, text-white/60 → text-white/70). The hardware dedup is the largest single change — maybe 60 lines of restructuring.

**Visual change:** noticeable but not disorienting.

- HostANodePage hostTypes grid loses the glass treatment, gains the solid treatment (or vice versa — see decision question below).
- Card body prose color uniformly shifts to `text-white/70` (some text gets very slightly brighter).
- DroneFlyCTA gains the shadow that HostInfrastructureCTA already has.
- PulsingDot becomes sage-green instead of emerald — visible color shift on the live-status indicators.
- View Live Map and Austin Mesh partner-list buttons unify visually.

**Bundle size:** should slightly _decrease_ because there's less inline JSX repetition.

**Risk:** low. No behavioral changes. All edits are presentational.

---

## Section 5 — Open decisions before applying

Three questions where I want your call before the refactor:

### Q1: Which card style for hostTypes (the 5-card grid on HostANodePage)?

The "Who should consider hosting" section currently uses Pattern C (hover-lift glass cards). Under the proposed canonical set, **Pattern A (solid InfoCard)** matches its semantic role (read-only list of categories) — but the glass treatment makes the grid feel more like a showcase, which arguably fits since this is the "this is where you fit" emotional moment.

- **Option 1**: Convert to InfoCard (solid). More consistent with the lists below it. Calmer visual.
- **Option 2**: Keep as FeatureCard (glass). Currently emphasizes the section as a "moment." But then we should consider whether `What KC Mesh provides in return` cards (currently InfoCard/solid) should also be FeatureCard for parallelism.

### Q2: PulsingDot — sage or emerald?

The current emerald is brighter than sage. Live-status indicators have a tradition of being _vivid_ green (#10b981-ish). The sage `#8fb14b` is more olive than mint.

- **Option 1**: Convert to `var(--success-500)` for system consistency. Slightly more olive look.
- **Option 2**: Keep emerald, document it as an intentional "alive" indicator that deliberately pops brighter than the rest of the system.

### Q3: Should we keep the `.tip-banner` and `.message-banner` CSS classes, or rebuild them as React components?

They're defined in `globals.css` and applied via className. Functional but a bit weird — every other surface treatment lives in components. Migrating them to components (`<TipBanner>`, `<MessageBanner>`) would give them props (icon, title, etc) but adds churn.

- **Option 1**: Keep as CSS classes. Minor refactor only — fix the AP-CL-2 issues in the prose inside, not the structure.
- **Option 2**: Migrate to React components. Cleaner, but ~30 lines of new code for two banners used 5 places total.

---

## Section 6 — Next steps

Answer Q1–Q3 above, then I'll:

1. Update CLAUDE.md design system docs to match the actual implemented palette + the canonical patterns from this audit.
2. Create `src/data/hardware.ts` and `src/constants/contact.ts`.
3. Apply the canonical patterns across all components in one pass.
4. Run typecheck + build.
5. Spot-check the diff in the browser (you may want to do this yourself given the visual nature of the changes).

This is one session's worth of work, contingent on the answers to Q1–Q3.
