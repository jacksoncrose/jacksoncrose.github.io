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
};

export const galleryGroups: Record<string, GalleryGroupMeta> = {
  'rooney-ranch-atlas': {
    title: 'Rooney Angus Ranch Atlas',
    note: 'Division maps and a ranch-wide poster for Rooney Angus, in central Montana. Each division was drawn on two basemaps from one dataset, so the same tenure, fence, and pasture information reads either against terrain or against aerial imagery.',
    href: '/projects/rooney-ranch-atlas',
  },
};

type GalleryLike = { data: { group?: string; groupOrder: number } };

/**
 * The Maps page as a vertical stack of blocks: runs of ungrouped entries,
 * and grouped sets. Block order follows the order entries arrive in, so
 * `published()` stays the single sort authority; `groupOrder` only sorts
 * within a group.
 */
export type GalleryBlock<T> =
  | { kind: 'run'; entries: T[] }
  | { kind: 'group'; id: string; meta: GalleryGroupMeta; entries: T[] };

export function galleryBlocks<T extends GalleryLike>(
  entries: T[],
): GalleryBlock<T>[] {
  const blocks: GalleryBlock<T>[] = [];
  const groups = new Map<string, Extract<GalleryBlock<T>, { kind: 'group' }>>();

  for (const entry of entries) {
    const id = entry.data.group;

    if (!id) {
      const last = blocks.at(-1);
      if (last?.kind === 'run') last.entries.push(entry);
      else blocks.push({ kind: 'run', entries: [entry] });
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
      blocks.push(block);
    }
    block.entries.push(entry);
  }

  for (const block of blocks) {
    if (block.kind === 'group') {
      block.entries.sort((a, b) => a.data.groupOrder - b.data.groupOrder);
    }
  }

  return blocks;
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
