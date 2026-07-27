/*
  site.ts — sitewide constants in one place.

  Anything that appears on every page (name, contact email, nav) is defined
  here so it is changed once, not in five templates. Values still awaiting
  Jackson's confirmation are marked TODO and rendered as a visible
  placeholder, never guessed.
*/

export const site = {
  name: 'Jackson Rose',

  /**
   * Roles, one compressed line (Home, above the fold).
   *
   * GCF role wording settled 2026-07-25: "Assistant Director and Operations
   * Manager." Use this phrasing everywhere; earlier drafts and the 2025
   * resume variously said "co-leads", "Assistant Director and Manager", and
   * MSU's own team page says "Assistant Director and Geospatial Analyst".
   *
   * TODO (Jackson): the first half still says "Research Faculty", but the
   * resume's position title is "Geospatial Research Scientist and
   * Instructor". Pick one. Also worth checking this line is not too long
   * once both halves are final — the sitemap calls for ONE compressed line.
   */
  roles:
    'Research Faculty, Earth Sciences, Montana State University · Assistant Director and Operations Manager, MSU Geospatial Core Facility · Bozeman, Montana',

  /**
   * Confirmed by Jackson. MSU address, chosen "for now" — if he later wants a
   * personal or professional address on the public site, changing it here
   * updates the header and footer on every page.
   */
  email: 'jackson.rose1@montana.edu' as string | null,

  /** Identity sentence is written WITH Jackson (AGENTS.md). Never autogenerate. */
  identitySentence: null as string | null,
} as const;

export const nav = [
  { label: 'Tools', href: '/tools' },
  { label: 'Projects', href: '/projects' },
  { label: 'Maps', href: '/maps' },
  { label: 'About', href: '/about' },
] as const;
