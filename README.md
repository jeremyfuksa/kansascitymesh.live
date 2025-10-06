# Kansas City Meshtastic Network

Astro + Bootstrap site documenting the Kansas City Meshtastic build-out and coordinating regional deployments. Content lives in Markdown with YAML front matter so writers can focus on copy while layouts handle presentation.

## Tech Stack
- [Astro](https://astro.build/) for static generation
- [Bootstrap 5](https://getbootstrap.com/) via CDN for UI components
- Minimal client-side JavaScript (Bootstrap bundle for nav/collapses)

## Content Authoring
All page content lives under `src/content/pages/`. Each Markdown file describes a route and is rendered by one of the content layouts.

### Layout matrix
| Layout | File | When to use | YAML fields consumed |
| --- | --- | --- | --- |
| **BasePage** | `src/layouts/content/BasePage.astro` | Landing pages with alerts/callouts/cards/CTAs (e.g., Home, Get Started index, Community index) | `title`, `description`, `pageHeading`, `heroVariant`, `alerts`, `callouts`, `cardsSections`, `cta`, `discordInvite` |
| **ArticlePage** | `src/layouts/content/ArticlePage.astro` | Narrative pages or guides that may include CTA buttons | `title`, `description`, `pageHeading`, `heroVariant`, `actions`, `discordInvite` |
| **FaqPage** | `src/layouts/content/FaqPage.astro` | FAQ lists rendered as accordions | `title`, `description`, `pageHeading`, `heroVariant`, `faqs`, `discordInvite` |

Routes simply select the layout, e.g.:

```astro
---
import { getEntry } from "astro:content";
import BasePage from "../../layouts/content/BasePage.astro";

const entry = await getEntry("pages", "get-started/index");
---

<BasePage entry={entry} />
```

### Front matter quick reference
```yaml
---
title: Page title (defaults to empty string)
description: Meta description / hero paragraph
pageHeading: Optional hero heading override
heroVariant: default | compact
  alerts: # array of alert banners
  - message: Text
    link: Optional URL
    linkText: Optional label
    variant: info | warning | success
callouts: # array of amber callout banners
  - title: Heading
    message: Body text
    link: Optional URL
    linkText: Optional label
cardsSections: # array of card grids
  - heading: Section title
    description: Optional text shown under heading
    cards:
      - title: Card heading
        description: Body copy
        link: Optional URL
        linkText: Optional label
        status: operational | gap | needed | suggested
cta: # optional closing CTA pill
  title: Heading
  description: Supporting copy
  link: URL
  linkText: Button label
actions: # for ArticlePage – renders button row
  - href: URL
    label: Button label
    variant: primary | outline (default primary)
  faqs: # for FaqPage – question/answer pairs
  - question: Prompt
    answer: Plain text (newline separated) shown inside accordion
discordInvite: # renders reusable Discord CTA card
  title: Optional override (defaults provided)
  description: Custom copy
  link: Override invite URL (defaults to https://discord.gg/eP5VSPKU)
  linkText: Button label
---
```

Any field you omit simply collapses in the layout.

## Geofence Focus
The immediate build objective is a robust mesh within this bounding box:
1. 39.561616° N, -93.948472° W
2. 39.561616° N, -95.148729° W
3. 38.649439° N, -95.148729° W
4. 38.649439° N, -93.948472° W

Copy on home, network, and community pages references that geofence so we stay focused before expanding outward.

## Development
```bash
npm install
npm run dev   # local development
npm run build # production build
```

> Note: `npm` is not available in the hosted CLI environment, so run commands locally.

## Navigation & Performance Notes
- Header menu is the only interactive script; keep additional JS lean.
- Font Awesome loads via kit script; `preconnect` & `dns-prefetch` hints are in place to reduce first render cost.
- Main column width is capped at `max-w-3xl` for readability across breakpoints.

## Discord Coordination
The shared server lives at `https://discord.gg/eP5VSPKU`. Layouts expose a reusable CTA card so you can surface the invite by dropping a `discordInvite` block into front matter.
