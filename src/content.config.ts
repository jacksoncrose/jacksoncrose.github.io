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
      /**
       * Whether this entry takes a card on the Projects INDEX. Added
       * 2026-08-01, from Jackson: "Tools (MT Hall and FFD) are showing up
       * in projects. That's redundant."
       *
       * `hasPage` and `listed` are independent, and both are needed.
       * Montana Hall keeps its case study at /projects/montana-hall but no
       * longer takes an index slot, because the same work already has a
       * card on Tools. Its Tools entry carries `caseStudy`, which is what
       * keeps that page reachable — an unlisted page with no inbound link
       * is an orphan, and that is the failure mode to watch for here.
       *
       * THIS IS NOT `draft`. A draft is unfinished and unpublishable.
       * These entries are finished and deliberately indexed elsewhere.
       */
      listed: z.boolean().default(true),
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
          /*
            How the CARD should fit this cover. Added 2026-07-31.

            Cards crop with object-cover, which is right for a photograph or
            a screenshot: it fills the frame and losing the edges costs
            nothing. It is wrong for a self-contained FIGURE that carries its
            own title, legend, and caption, because a card box taller than
            the figure is wide slices straight through that text. The land
            ownership map is the case: at 256x286 the title read "...al land"
            and the source line was cut mid-sentence.

            "contain" shows the whole figure instead. The letterboxing is
            invisible when the figure's own background is white, because the
            card is white too. Only set this for figures; a photograph set to
            contain floats in a white band and looks broken.
          */
          fit: z.enum(['cover', 'contain']).default('cover'),
          /*
            Let the card CROP this cover to its full height instead of
            letterboxing it (added 2026-08-13, from Jackson: "I don't like
            the gaps on top and bottom of some of the cards"). The aspect
            box centres a cover in a taller card, which leaves paper above
            and below it — invisible when the cover's ground is white,
            obvious when it is not (the estimator's beige, a photograph).
            fill: true absolutely fills the wrapper with object-cover, so
            the crop depth follows the card's own height. ONLY for imagery
            that survives arbitrary cropping: photographs and clean panel
            crops. Never for figures or map sheets with furniture — that
            is the slicing bug CardCover exists to prevent.
          */
          fill: z.boolean().default(false),
        })
        .optional(),
      /** Manual ordering within a tier (lower first). */
      order: z.number().default(0),
      /*
        Key figures for the case-study page, rendered by StatBand as a
        band of large numerals under the summary. Added 2026-08-03 for the
        skimming reader the brief names: the pages buried their most
        quotable numbers in paragraph three.

        EVERY VALUE MUST ALREADY APPEAR IN THE ENTRY'S OWN BODY COPY. The
        band restates the page; it is not a place to introduce a figure,
        and the no-revenue-figures rule for the estimator applies here
        exactly as it does to prose. Three or four entries; more reads as
        a dashboard, which this site is not.
      */
      stats: z
        .array(
          z.object({
            /** The numeral, kept short: "1,366", "2.3B", "1:17k–1:53k". */
            value: z.string().max(12),
            /** Lowercase label under it, e.g. "frames, one overnight flight". */
            label: z.string().max(48),
          }),
        )
        .min(2)
        .max(4)
        .optional(),
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
       * Project id of a case study for this tool, e.g. "montana-hall".
       * Added 2026-08-01 with the de-duplication decision: once the Tools
       * card became the only index entry for tool-backed work, it has to
       * carry the route to the write-up, or that page is unreachable from
       * every index on the site.
       *
       * Stored as the id, not a URL, so it cannot drift from the route,
       * which is always /projects/<id>. The referenced project must have
       * `hasPage: true`; `listed` may be either.
       */
      caseStudy: z.string().optional(),
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
      /**
       * Comparison pairing, added 2026-08-01, from Jackson: "a swipe
       * gallery for Rooney Ranch and a swipe tool to compare closure
       * scenarios for schools."
       *
       * EXACTLY TWO entries share a `pair` id, and both must sit in the
       * same block — same `group`, or both ungrouped. They render as one
       * wipe comparison instead of two cards, and `groupOrder` decides
       * which is the base image and which is the overlay the handle
       * reveals.
       *
       * One member, three members, or a pair split across two groups all
       * fail the build on purpose. A half-built comparison would show one
       * map on both sides of the handle, which reads as working.
       *
       * The two images must be REGISTERED — same extent, same size, same
       * layout — or the static furniture jumps as the handle moves.
       */
      pair: z.string().optional(),
      /**
       * Label for this entry's side of a comparison. Falls back to
       * `basemap`, which already carries "Hillshade" / "Imagery" on the
       * Rooney sheets, so only a pair that is not a basemap swap needs it.
       */
      pairLabel: z.string().optional(),
      order: z.number().default(0),
      draft: z.boolean().default(false),
    }),
});

export const collections = { projects, tools, gallery };
