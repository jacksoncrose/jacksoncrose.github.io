/*
  content.ts — the only place collection entries are filtered and labelled.

  Two rules from AGENTS.md are implemented here once so no page template can
  forget them:

  - `published()` drops anything still marked draft, so unfinished entries
    cannot leak into a build.
  - `clientLabel()` is the single gate on client naming. A real client name is
    returned ONLY when clientPermission is "granted". "anonymize" returns null
    (the template describes the client generically in prose), "pending"
    returns a visible TODO so an unconfirmed name is impossible to ship
    silently.
*/

type HasDraft = { data: { draft: boolean } };

/** Entries safe to render, sorted by explicit order then year (newest first). */
export function published<T extends HasDraft & { data: { order: number; year?: number } }>(
  entries: T[],
): T[] {
  return entries
    .filter((entry) => !entry.data.draft)
    .sort(
      (a, b) =>
        a.data.order - b.data.order || (b.data.year ?? 0) - (a.data.year ?? 0),
    );
}

/**
 * Entries that belong on the Projects INDEX.
 *
 * Added 2026-08-01. Separate from `published()` because the two questions
 * are different: `published` asks whether an entry may render at all, and
 * this asks whether it takes a card on the index. Montana Hall answers yes
 * to the first and no to the second — its page still builds, and its card
 * lives on Tools instead. See `listed` in content.config.ts.
 */
export function listed<T extends { data: { listed: boolean } }>(
  entries: T[],
): T[] {
  return entries.filter((entry) => entry.data.listed);
}

/* ---------------------------------------------------------------------
   Gallery groups
   ---------------------------------------------------------------------

   Added 2026-07-31. Jackson: "It needs to be clear that the poster and
   ranch division maps are all the same project/client."

   A gallery entry opts in with `group: "<id>"` in its frontmatter. The
   heading, the note, and the link to the full project page are written
   HERE, once per group, rather than repeated in every entry — four copies
   of the same sentence would drift apart the first time one got edited.
   Adding a group means adding a key here and tagging the entries.
*/

export type GalleryGroupMeta = {
  /** Heading above the group. */
  title: string;
  /** One or two sentences: what the set is, and who it was for. */
  note: string;
  /** Optional link to the project page carrying the full write-up. */
  href?: string;
  /**
   * Render the group's items one at a time in a swipeable, scroll-snapping
   * track instead of as a grid. Added 2026-08-01 for the Rooney set, which
   * is five sheets and was taking half a screen of thumbnails.
   *
   * The track is a plain overflow-x scroller, so touch swipe and keyboard
   * arrows work with JavaScript off; the buttons and the counter are the
   * only enhanced parts.
   */
  carousel?: boolean;
  /**
   * For grid groups with an odd card count: which card spans both
   * columns so none is stranded alone in its row. Added 2026-08-15 when
   * Campus at Night dropped to three cards. 'first' mirrors the lead
   * run's featureFirst; 'last' makes the closing card the full-width one.
   */
  feature?: 'first' | 'last';
};

export const galleryGroups: Record<string, GalleryGroupMeta> = {
  'rural-school-access': {
    title: 'Montana rural school access',
    /* 2026-08-15 second de-AI pass, his "implement all recommendations":
       "a bounding case" -> "a case" (jargon rule). The next sentence is
       the sourcing constraint (no closure proposed; the scenario measures
       coverage) and is unchanged word for word. */
    note: "Distance to the nearest school across Montana, in hexagons of about 16 square miles, for the MSU Center for Research on Rural Education. The pair sets current access against a case in which all 129 of the state's small rural schools close at once. No such closure has been proposed; the scenario is there to measure what those schools cover.",
    /* No `href`: this project is a card-only entry on the Projects index
       (hasPage: false), so there is no page to send a reader to. Do not
       point this at /projects as a consolation link. */
  },
  'campus-at-night': {
    title: 'Campus at Night',
    /* 2026-08-15: the sodium-district and south-block insets were
       WITHDRAWN (his call), leaving three cards. Both feature ends were
       rendered at delivered width and shown to him; 'first' chosen on
       recommendation: the section crop is the one image whose labels read
       at card size, and a full-width lead matches the page's opening run
       ("All federal land" over a pair). This supersedes the 08-13
       "two engine documents side by side" order for this block; the
       reconstruction still follows immediately, paired with the 2023 map.
       Reversal is one word: 'last' puts the 2023 map full-width at the end. */
    feature: 'first',
    /* 2026-08-15 alignment with the v20/fa4 sheets, his call: "neither
       result ... the other" (two) -> "none of the three results ... the
       others", matching the roof panel's "none of them can serve as the
       reference". */
    note: "One overnight survey of the MSU campus, rebuilt through three photogrammetry programs. Drone2Map produced the cleaner mosaic but never solved the south block; Metashape covered both flown blocks, reaching 149 of the 236 hectares flown. No surveyed markers were placed on the ground, so none of the three results is the reference for the others.",
    href: '/projects/msu-campus-at-night',
  },
  'rooney-ranch-atlas': {
    title: 'Rooney Angus Ranch Atlas',
    note: 'Division maps and a ranch-wide poster for Rooney Angus, in central Montana. Each division was drawn on two basemaps from one dataset, so the same tenure, fence, and pasture information reads either against terrain or against aerial imagery.',
    href: '/projects/rooney-ranch-atlas',
    carousel: true,
  },
};

type GalleryLike = {
  id: string;
  data: { group?: string; groupOrder: number; pair?: string };
};

/*
  Blocks and items
  ----------------

  The Maps page is a vertical stack of BLOCKS: runs of ungrouped entries,
  and grouped sets. Block order follows the order entries arrive in, so
  `published()` stays the single sort authority; `groupOrder` only sorts
  within a group.

  Inside a block are ITEMS, added 2026-08-01. An item is one card, or a
  PAIR of entries that render as a single wipe comparison. Pairing at this
  layer rather than in the template is what lets the "exactly two, same
  block" rule be enforced in one place and fail the build when it is
  broken.

  LAYOUT RULE THAT FALLS OUT OF THIS, and it is deliberate: a block whose
  items are all singles renders as the two-column grid it always did. A
  block containing a pair renders as a full-width vertical stack instead,
  because a comparison at half column width is too small to read and the
  handle too short to drag. Templates read `hasPair` rather than deciding
  this for themselves.
*/

export type GalleryItem<T> =
  | { kind: 'single'; entry: T }
  | { kind: 'pair'; id: string; a: T; b: T };

export type GalleryBlock<T> =
  | { kind: 'run'; items: GalleryItem<T>[]; hasPair: boolean }
  | {
      kind: 'group';
      id: string;
      meta: GalleryGroupMeta;
      items: GalleryItem<T>[];
      hasPair: boolean;
    };

/**
 * Collapse paired entries into pair items, preserving order.
 *
 * The pair takes the position of its FIRST member, so a pair sorts where
 * its base image sorted. `groupOrder` has already run, so `a` is the base
 * image and `b` is the overlay the handle reveals.
 */
function collapsePairs<T extends GalleryLike>(
  entries: T[],
  where: string,
): { items: GalleryItem<T>[]; hasPair: boolean } {
  const members = new Map<string, T[]>();
  for (const entry of entries) {
    const id = entry.data.pair;
    if (!id) continue;
    const list = members.get(id);
    if (list) list.push(entry);
    else members.set(id, [entry]);
  }

  for (const [id, list] of members) {
    if (list.length !== 2) {
      /* Fail loudly at build time. A pair with one member would render as
         a comparison of a map against itself, which looks like it works.
         A pair split across two groups lands here too, because each block
         is collapsed separately and each side sees a count of one. */
      throw new Error(
        `Gallery pair "${id}" has ${list.length} member(s) in ${where} ` +
          `(${list.map((e) => e.id).join(', ') || 'none'}). A pair needs ` +
          `exactly two entries, and both must sit in the same block — same ` +
          `\`group\`, or both ungrouped.`,
      );
    }
  }

  const used = new Set<string>();
  const items: GalleryItem<T>[] = [];
  let hasPair = false;

  for (const entry of entries) {
    const id = entry.data.pair;
    if (!id) {
      items.push({ kind: 'single', entry });
      continue;
    }
    if (used.has(id)) continue;
    used.add(id);
    const [a, b] = members.get(id)!;
    items.push({ kind: 'pair', id, a, b });
    hasPair = true;
  }

  return { items, hasPair };
}

export function galleryBlocks<T extends GalleryLike>(
  entries: T[],
): GalleryBlock<T>[] {
  type Draft =
    | { kind: 'run'; entries: T[] }
    | { kind: 'group'; id: string; meta: GalleryGroupMeta; entries: T[] };

  const drafts: Draft[] = [];
  const groups = new Map<string, Extract<Draft, { kind: 'group' }>>();

  for (const entry of entries) {
    const id = entry.data.group;

    if (!id) {
      const last = drafts.at(-1);
      if (last?.kind === 'run') last.entries.push(entry);
      else drafts.push({ kind: 'run', entries: [entry] });
      continue;
    }

    let block = groups.get(id);
    if (!block) {
      const meta = galleryGroups[id];
      /* Fail loudly at build time. A typo'd id would otherwise drop an
         entry silently out of its group and back into the ungrouped flow,
         which is exactly the "reads as unrelated maps" problem the group
         exists to fix. */
      if (!meta) {
        throw new Error(
          `Gallery group "${id}" is not defined in galleryGroups (src/lib/content.ts).`,
        );
      }
      block = { kind: 'group', id, meta, entries: [] };
      groups.set(id, block);
      drafts.push(block);
    }
    block.entries.push(entry);
  }

  return drafts.map((draft) => {
    if (draft.kind === 'group') {
      draft.entries.sort((a, b) => a.data.groupOrder - b.data.groupOrder);
      const { items, hasPair } = collapsePairs(
        draft.entries,
        `group "${draft.id}"`,
      );
      return {
        kind: 'group',
        id: draft.id,
        meta: draft.meta,
        items,
        hasPair,
      };
    }
    const { items, hasPair } = collapsePairs(draft.entries, 'the ungrouped run');
    return { kind: 'run', items, hasPair };
  });
}

/**
 * The year a card or page should print: "2023–2026" when an entry spans
 * years, "2023" when it does not, null when the year is unconfirmed.
 *
 * Added 2026-08-02 with Campus at Night's `yearEnd`. It is the FIRST entry
 * to use that field, and until now only the detail-page template rendered
 * it — the Projects index and the Home cards printed `year` alone, so the
 * same entry would have read "2023" on its card and "2023–2026" on its
 * page. Three call sites, one implementation, so they cannot drift.
 */
export function yearLabel(data: { year?: number; yearEnd?: number }): string | null {
  if (!data.year) return null;
  return data.yearEnd ? `${data.year}–${data.yearEnd}` : String(data.year);
}

export type ClientFields = {
  client?: string;
  clientPermission: 'granted' | 'pending' | 'anonymize' | 'not-applicable';
};

type CardLinkFields = {
  hasPage: boolean;
  links: { label: string; url: string }[];
};

/**
 * Where a project card should point, and whether that leaves the site.
 *
 * Added 2026-07-30. Cards used to link only to internal project pages, so
 * a card-only entry (hasPage: false) was never clickable. The renewable
 * energy estimator is card-only but does have a live tool behind it, and
 * Jackson's call was to link it. Rather than special-case that one entry
 * in two templates, the rule is general: a card points at its own page
 * when it has one, otherwise at its first link, otherwise nowhere.
 *
 * `external` is what lets the templates warn a reader that the click
 * leaves the site — the same underlined title otherwise gives no hint.
 */
export function cardTarget(
  data: CardLinkFields,
  id: string,
): { href: string; external: boolean } | null {
  if (data.hasPage) return { href: `/projects/${id}`, external: false };
  const first = data.links[0];
  return first ? { href: first.url, external: true } : null;
}

/**
 * What may be printed for this entry's client.
 * Returns null when nothing should be printed at all.
 */
export function clientLabel(data: ClientFields): string | null {
  switch (data.clientPermission) {
    case 'granted':
      return data.client ?? null;
    case 'pending':
      return data.client
        ? 'TODO: confirm client naming permission'
        : null;
    case 'anonymize':
    case 'not-applicable':
      return null;
  }
}
