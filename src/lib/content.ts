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
