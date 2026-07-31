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
      /**
       * Optional since 2026-07-29 (Jackson's call): a negotiation case study
       * like the MCSC CBA has no tool stack to credit. When present it must
       * still be non-empty. Templates guard for its absence.
       */
      tools: z.array(z.string()).min(1).optional(),
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
      /**
       * Card/hero image through Astro's asset pipeline; alt is mandatory.
       *
       * `caption` and `photoCredit` added 2026-07-30. Until then a cover
       * rendered with no caption at all, which was fine while every cover
       * was Jackson's own map or screenshot. The moment a cover is someone
       * else's photograph — the Brickhouse Creative aerial on the MCSC
       * entry — an uncaptioned cover silently strips the credit that the
       * permission was granted on. This makes attribution expressible
       * where the image is declared, so it cannot be lost by moving an
       * image from the body to the cover.
       */
      cover: z
        .object({
          src: image(),
          alt: z
            .string()
            .min(15, 'Describe what the image shows, never "map of Montana"'),
          /** Plain lead sentence, e.g. "White Sulphur Springs." */
          caption: z.string().optional(),
          /** Rendered as "Photo courtesy of <name>", linked when a url is given. */
          photoCredit: z
            .object({ name: z.string(), url: z.string().url().optional() })
            .optional(),
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
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** Exactly the "2-sentence description" from the sitemap. */
      blurb: z.string().max(300),
      /** Live URL. Omit until confirmed — the Tools page shows a TODO state. */
      url: z.string().url().optional(),
      /**
       * Card screenshot for the Home tools strip (added 2026-07-30, Jackson's
       * cards decision). Optional — a tool without one renders a text-only
       * card. Same enforced-alt pattern as project covers.
       */
      cover: z
        .object({
          src: image(),
          alt: z
            .string()
            .min(15, 'Describe what the screenshot shows, never just the tool name'),
        })
        .optional(),
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
      /**
       * Optional grouping, added 2026-07-31 from Jackson's ask: "It needs to
       * be clear that the poster and ranch division maps are all the same
       * project/client."
       *
       * Entries sharing a `group` id render together under one heading in
       * their own sub-grid, so a multi-sheet project reads as one job for
       * one client instead of as unrelated maps that happen to sit near each
       * other. Ungrouped entries are unaffected.
       *
       * The id must exist in `galleryGroups` (src/lib/content.ts), which is
       * the ONLY place the heading, the note, and the project link are
       * written. Keeping them there rather than repeating them in each
       * entry's frontmatter is what stops four copies of the same sentence
       * from drifting apart. An unknown id fails the build on purpose.
       */
      group: z.string().optional(),
      /** Order WITHIN a group. Ignored when `group` is unset. */
      groupOrder: z.number().default(0),
      /**
       * Which basemap this sheet is drawn on, e.g. "Hillshade" or
       * "Imagery". Rendered as a small label above the title so a
       * side-by-side pair reads as one comparison rather than as two
       * near-duplicate maps with the same name.
       */
      basemap: z.string().optional(),
      order: z.number().default(0),
      draft: z.boolean().default(false),
    }),
});

export const collections = { projects, tools, gallery };
