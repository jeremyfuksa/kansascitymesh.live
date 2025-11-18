import { defineCollection, z } from "astro:content";

const alertSchema = z.object({
  message: z.string(),
  link: z.string().optional(),
  linkText: z.string().optional(),
  variant: z.enum(["info", "warning", "success"]).optional(),
});

const calloutSchema = z.object({
  title: z.string(),
  message: z.string(),
  link: z.string().optional(),
  linkText: z.string().optional(),
});

const actionSchema = z.object({
  href: z.string(),
  label: z.string(),
  variant: z.enum(["primary", "outline"]).optional(),
});

const cardSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  link: z.string().optional(),
  linkText: z.string().optional(),
  status: z.enum(["operational", "gap", "needed", "suggested"]).optional(),
});

const cardsSectionSchema = z.object({
  heading: z.string(),
  description: z.string().optional(),
  cards: z.array(cardSchema),
});

const ctaSchema = z.object({
  title: z.string(),
  description: z.string(),
  link: z.string(),
  linkText: z.string(),
});

const ctaSecondarySchema = z.object({
  title: z.string(),
  description: z.string(),
  link: z.string(),
  linkText: z.string(),
  external: z.boolean().optional(),
});

const heroCtaSchema = z.object({
  label: z.string(),
  href: z.string(),
  variant: z.enum(["primary", "secondary", "outline"]).optional(),
  size: z.enum(["small", "default", "large"]).optional(),
  external: z.boolean().optional(),
  icon: z.enum(["map", "radio", "discord", "message"]).optional(),
});

const heroSchema = z.object({
  heading: z.string(),
  description: z.string(),
  badge: z.string().optional(),
  image: z.string().optional(),
  imageAlt: z.string().optional(),
  primaryCta: heroCtaSchema.optional(),
  secondaryCta: heroCtaSchema.optional(),
});

const textSegmentSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("text"), text: z.string() }),
  z.object({ type: z.literal("link"), label: z.string(), href: z.string(), external: z.boolean().optional() }),
]);

const segmentedParagraphSchema = z.object({
  segments: z.array(textSegmentSchema),
});

const gettingStartedSchema = z.object({
  heading: z.string(),
  items: z.array(segmentedParagraphSchema),
});

const coordinationSchema = z.object({
  title: z.string(),
  body: z.array(textSegmentSchema).default([]),
  tagline: z.string().optional(),
});

const breadcrumbSchema = z.object({
  label: z.string(),
  href: z.string(),
});

const tocItemSchema = z.object({
  id: z.string(),
  label: z.string(),
  level: z.union([z.literal(1), z.literal(2), z.literal(3)]),
});

const metaSchema = z.object({
  author: z.string().optional(),
  lastUpdated: z.string().optional(),
  readTime: z.string().optional(),
  category: z.string().optional(),
});

const relatedLinkSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  href: z.string(),
  external: z.boolean().default(false),
});

const faqSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

const discordSchema = z.object({
  title: z.string().default("Join the Discord"),
  description: z
    .string()
    .default(
      "Hop into the KC Meshtastic Discord to coordinate installs, swap coverage notes, and chat with other builders.",
    ),
  link: z.string().default("https://discord.gg/eP5VSPKU"),
  linkText: z.string().default("Open Discord"),
});

const pages = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    lead: z.string().optional(),
    pageHeading: z.string().optional(),
    heroVariant: z.enum(["default", "compact"]).optional(),
    alerts: z.array(alertSchema).default([]),
    callouts: z.array(calloutSchema).default([]),
    actions: z.array(actionSchema).default([]),
    cardsSections: z.array(cardsSectionSchema).default([]),
    cta: ctaSchema.optional(),
    ctaSecondary: ctaSecondarySchema.optional(),
    faqs: z.array(faqSchema).default([]),
    discordInvite: discordSchema.optional(),
    hero: heroSchema.optional(),
    gettingStarted: gettingStartedSchema.optional(),
    coordination: coordinationSchema.optional(),
    breadcrumbs: z.array(breadcrumbSchema).default([]),
    tableOfContents: z.array(tocItemSchema).default([]),
    meta: metaSchema.optional(),
    relatedLinks: z.array(relatedLinkSchema).default([]),
  }),
});

export const collections = { pages };
