/*
  content.config.ts — schemas for the three content collections.

  Entries live as Markdown/MDX files under src/content/{projects,tools,gallery}.
  The build FAILS if an entry violates its schema, which is how two rules from
  AGENTS.md are enforced as data rather than habit:

  1. Client naming: `clientPermission` defaults to "pending". Page templates
     (step 4) must only print a client name when it is "granted"; "anonymize"
     means describe the client generically ("national nonprofit").
  2. Alt text: gallery images require an `alt` of at least 15 characters, so
     placeholder alt text like "map" cannot ship.

  Dates, URLs, match rates, etc. are on the unconfirmed list in AGENTS.md, so
  `year` and `url` are optional: an entry simply omits them until Jackson
  confirms the real value. Nothing is ever guessed. `order` is the manual
  sort fallback while years are missing. `draft: true` keeps an entry out of
  every rendered page while it waits on confirmation.
*/

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** 1–2 sentence card text. Written with Jackson; TODO until then. */
      summary: z.string().max(320),
      /** Omit until the date is confirmed — never guess. */
      year: z.number().int().min(2000).max(2100).optional(),
      /** For multi-year work, e.g. 2021 + 2023 night-lighting flights. */
      yearEnd: z.number().int().min(2000).max(2100).optional(),
      /** 1 = spine case study, 2 = full project page, 3 = card/gallery only. */
      tier: z.union([z.literal(1), z.literal(2), z.literal(3)]),
      role: z.string(),
      tools: z.array(z.string()).min(1),
      /** Real client name. Only ever rendered when clientPermission is "granted". */
      client: z.string().optional(),
      clientPermission: z
        .enum(['granted', 'pending', 'anonymize', 'not-applicable'])
        .default('pending'),
      /** true = gets its own project page; false = card on the index only. */
      hasPage: z.boolean().default(false),
      /** Live tool / webinar links. Only confirmed URLs — omit otherwise. */
      links: z
        .array(z.object({ label: z.string(), url: z.string().url() }))
        .default([]),
      /** Card/hero image through Astro's asset pipeline; alt is mandatory. */
      cover: z
        .object({
          src: image(),
          alt: z
            .string()
            .min(15, 'Describe what the image shows, never "map of Montana"'),
        })
        .optional(),
      /** Manual ordering within a tier (lower first). */
      order: z.number().default(0),
      /** Drafts never render anywhere. */
      draft: z.boolean().default(false),
    }),
});

const tools = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/tools' }),
  schema: z.object({
    title: z.string(),
    /** Exactly the "2-sentence description" from the sitemap. */
    blurb: z.string().max(300),
    /** Live URL. Omit until confirmed — the Tools page shows a TODO state. */
    url: z.string().url().optional(),
    order: z.number().default(0),
    draft: z.boolean().default(false),
  }),
});

const gallery = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/gallery' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** 1–2 sentences, no case-study prose (sitemap rule). */
      blurb: z.string().max(240),
      year: z.number().int().min(2000).max(2100).optional(),
      tools: z.array(z.string()).min(1),
      image: image(),
      alt: z
        .string()
        .min(15, 'Describe what the map shows, never "map of Montana"'),
      order: z.number().default(0),
      draft: z.boolean().default(false),
    }),
});

export const collections = { projects, tools, gallery };
