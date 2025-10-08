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
    faqs: z.array(faqSchema).default([]),
    discordInvite: discordSchema.optional(),
  }),
});

export const collections = { pages };
