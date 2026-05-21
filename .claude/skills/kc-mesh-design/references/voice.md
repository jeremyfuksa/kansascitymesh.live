# KC Mesh voice

Read this before writing or editing any copy on the site.

The whole site reads like a **field log**, not marketing copy. The originator (Jeremy) deployed the first router and documented the process, but the public voice is collective — _we_, the community of 200+.

For forkers: this voice is opinionated to KC Mesh. If you're standing up your own city's mesh site, plan to rewrite the voice direction before touching pages. See `FORK-FOR-YOUR-CITY.md` in the repo root for the conversation about that.

## Pronouns

- **"We"** for the KC Mesh community. Always.
- **"You"** for the reader (welcoming, never lecturing).
- Never **"the network" / "the team" / "KC Mesh Inc."** — third-person formal voice betrays the brand.

## Tone

- **Welcoming, hobbyist, anti-perfectionist.** "Deployed imperfect beats theoretical perfect."
- **Honest about gaps.** "Most won't see the message live — but they'll see it next time they power back up."
- **Practical specifics over hype.** Dollar amounts, hop counts, building heights, highway names.
- **Anti-dogma posture.** Push back on "must have a 40-foot tower / horizontal antennas don't work / indoor never works" mesh folklore.

## Casing

- **Sentence case for everything.** Headings, buttons, nav items. No Title Case On Buttons. (e.g. "Become a host", "Steal this network", "Email about a host site".)
- Product/place proper nouns stay capitalized: _Kansas City_, _Meshtastic_, _Heltec V4_, _Bonner Springs_, _I-35_, _Discord_.

## Recurring copy patterns

- **Page H1 with a gradient span on the noun.** "Kansas City has a _Mesh Network_." / "Got a rooftop, a tower, or a high spot? _We need you._" / "Steal this _network._" The colored span uses the sage→calx gradient.
- **Parenthetical sub-headlines.** "(And we want to say, "Hi!")" / "(it's weirdly fun)". The site is unafraid of small voice asides.
- **Live numbers as proof.** The homepage hero quotes live mesh + Discord counts via `data-live-stat` spans hydrated from `/api/stats.json`. Don't hardcode counts in copy that's meant to feel current — the data layer is set up to keep numbers honest.
- **CTA copy is action-oriented and self-aware.** "Become a host" / "I've got a drone — let's coordinate" / "Or come say hi in Discord" / "See you out there".
- **Anti-dogma framing** ("15 feet is fine," "indoor sometimes works," "horizontal antennas have trade-offs but work") explicitly named, not implied.

## Things to **avoid** (from the voice audit)

These are real patterns that have been removed from the site. The audit doc is `docs/VOICE-AUDIT-2026-05.md`; the catalog below is the operational summary.

- **No wrap-up codas.** Don't end a section with "And that's the magic of community mesh networking." Just stop.
- **No "X, not Y" rhythm tics.** "Welcoming, not corporate. Hobbyist, not professional." Over-used, smells like AI ghostwriting.
- **No "actually / genuinely / absolutely" as superiority markers.** Cut on sight.
- **No graduation-speech sentences.** "We're not just building a network. We're building a community."
- **No corporate vocabulary.** "leverage," "solutions," "ecosystem," "stakeholders," "empower."
- **No exclamation-point landing pages.** One "Hi!" in a parenthetical lede is the budget for the whole site.

## Examples lifted from the live site (do this)

> "Power up a Meshtastic node and say hello. Someone in the mesh will hear you."

> "Start with one. Most of us end up with three or four (it's weirdly fun)."

> "We're talking about a $60–$200 device the size of a paperback, plus a small antenna. Not commercial telecom gear. Weekend-project scale."

> "Cascadia's first big host was a billboard owner outside Mayfield, WA. The model works."

> "Resist the urge to centralize. No bylaws. No officers. No membership tiers. The minute it starts feeling like a club is the minute the most interesting people stop showing up."

## Emoji

**Almost never.** The site uses zero emoji in body copy. The single Heart icon (lucide) on the Steal This Network "Say hi" header is the closest thing — and it's a stroked icon, not an emoji. If you reach for 🎉 or 🚀, you're off-brand.

## When in doubt

Two questions to ask:

1. **Would a Discord regular write this?** Or does it read like a press release? If press-release-y, rewrite.
2. **Is there a specific number, place, or detail I could swap in for an abstract claim?** "60+ active nodes" beats "a thriving network." Specifics earn trust; abstractions don't.

For deep diagnostic work on long-form copy, the `jeremy-voice` skill at `~/.claude/skills/jeremy-voice/` is the authoritative anti-pattern catalog. This file is the shorter operational version for in-site copy. They agree on principles; `jeremy-voice` has more examples and case-study mode.
