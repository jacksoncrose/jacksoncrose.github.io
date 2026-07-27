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
