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
   * Roles, one compressed line (Home, above the fold; also under the About
   * H1).
   *
   * GCF role wording settled 2026-07-25: "Assistant Director and Operations
   * Manager." Use this phrasing everywhere; earlier drafts and the 2025
   * resume variously said "co-leads", "Assistant Director and Manager", and
   * MSU's own team page says "Assistant Director and Geospatial Analyst".
   *
   * Title question settled 2026-07-28 (About line-edit session): the GCF
   * role LEADS, and the Earth Sciences affiliation is "Instructor" — not
   * "Research Faculty", not "Geospatial Research Scientist". Jackson's
   * words: "Lead with GCF then instructor for ESCI comes second."
   */
  roles:
    'Assistant Director and Operations Manager, MSU Geospatial Core Facility · Instructor, Earth Sciences, Montana State University · Bozeman, Montana',

  /**
   * Confirmed by Jackson. MSU address, chosen "for now" — if he later wants a
   * personal or professional address on the public site, changing it here
   * updates the header and footer on every page.
   */
  email: 'jackson.rose1@montana.edu' as string | null,

  /**
   * Consulting address, added 2026-07-30 when Jackson decided the site
   * should say he is for hire. His answer, verbatim: "Can we list two?
   * Jackson@rcrcgroup.org". Capitalization is his — do not "normalize" it.
   *
   * This is the address attached to work inquiries (the consulting line on
   * Home and the Consulting section on About). The MSU address above stays
   * the institutional one and keeps the header.
   *
   * SCOPE DECISION, same day, his words: "This portfolio site is not
   * intended to drive work to the GCF." Nothing here or on any page should
   * route consulting inquiries to the Geospatial Core Facility.
   */
  emailConsulting: 'Jackson@rcrcgroup.org' as string | null,

  /**
   * Identity sentence — SETTLED with Jackson 2026-07-29, written together
   * over several rounds (his calls: first person, high level, love of maps,
   * resources folded into the policy beat). Do not rewrite without him.
   * 2026-08-14, his call: "most of all" removed; he picked "especially"
   * over a two-sentence version and a maps-first version. The share card
   * (public/share-card.png) and its alt in Base.astro carry the same line
   * and moved with it.
   */
  identitySentence:
    'I’m a geographer interested in rural places, energy and natural resource policy, and especially making maps.' as string | null,
} as const;

/**
 * Nav order settled by Jackson 2026-07-30: Projects leads (the case
 * studies are the spine of the site), then Maps, then Tools, About last.
 * Replaces the original Tools-first order.
 */
export const nav = [
  { label: 'Projects', href: '/projects' },
  { label: 'Maps', href: '/maps' },
  { label: 'Tools', href: '/tools' },
  { label: 'About', href: '/about' },
] as const;
