/**
 * Faction metadata — the executable spec from Art Bible §4.2 and §7.7.
 *
 * Used by the `Document` component to apply per-faction paper stock,
 * handwriting register, and ink color. Also used by world-page routing
 * and the journal-style faction listings on the homepage.
 *
 * Only the three day-one factions (Court / Syndicate / Resistance) are
 * fully authored. The remaining three are declared with placeholder
 * narrative content so routes can be added later without schema churn.
 */

export type FactionSlug =
  | 'vampire-court'
  | 'ghoul-syndicate'
  | 'necromancer-academy'
  | 'cult-of-the-pale-king'
  | 'haunt-collective'
  | 'living-resistance'

/** The seven paper-register treatments, including neutral (no faction). */
export type DocumentRegister = FactionSlug | 'neutral'

export interface FactionMeta {
  /** URL slug, e.g. 'vampire-court' */
  slug: FactionSlug
  /** Full in-world name */
  name: string
  /** Common short form ('Court', 'Syndicate', 'Resistance') */
  shortName: string
  /** One-line register/tone summary for nav and meta tags */
  register: string
  /** Primary & secondary palette (Art Bible §4.2) */
  primary: string
  secondary: string
  /** Paper stock hex (Art Bible §7.7) */
  paper: string
  /** Ink hex for body text on this faction's paper */
  ink: string
  /** Which typeface family to use for display on this faction's pages */
  displayFont: 'formal' | 'academy' | 'archaic' | 'body'
  /** Day-one ship status — only the three listed in the brief are 'shipping' */
  status: 'shipping' | 'stub'
}

export const factions: readonly FactionMeta[] = [
  {
    slug: 'vampire-court',
    name: 'The Vampire Court',
    shortName: 'The Court',
    register:
      'Formal power sustained past the conditions that created it. Tarnished silver-blue over slate violet. Cancellaresca chancery hand.',
    primary: '#8A9BA8',
    secondary: '#4A4058',
    paper: '#B7C0C6',
    ink: '#2A3040',
    displayFont: 'formal',
    status: 'shipping',
  },
  {
    slug: 'ghoul-syndicate',
    name: 'The Ghoul Syndicate',
    shortName: 'The Syndicate',
    register:
      'Working material kept functional rather than maintained beautifully. Old-wax ochre and rust iron. Cramped operational cipher.',
    primary: '#9A7B42',
    secondary: '#7A4A38',
    paper: '#BFA070',
    ink: '#3E2A1C',
    displayFont: 'body',
    status: 'shipping',
  },
  {
    slug: 'living-resistance',
    name: 'The Living Resistance',
    shortName: 'The Resistance',
    register:
      'The city\u2019s pre-undead working-class substratum. Trade-district ochre over undyed linen. Practical working hand.',
    primary: '#A08058',
    secondary: '#C8B898',
    paper: '#C8B898',
    ink: '#3D3A38',
    displayFont: 'body',
    status: 'shipping',
  },
  {
    slug: 'necromancer-academy',
    name: 'The Necromancer Academy',
    shortName: 'The Academy',
    register:
      'Warmth that is intellectual rather than occupational. Aged parchment and iron-gall precision.',
    primary: '#C4B48A',
    secondary: '#2A3040',
    paper: '#D4C69A',
    ink: '#2A3040',
    displayFont: 'academy',
    status: 'stub',
  },
  {
    slug: 'cult-of-the-pale-king',
    name: 'The Cult of the Pale King',
    shortName: 'The Cult',
    register:
      'Stone predating the city. Mortared chalk, devotional gray-purple. Backward-leaning devotional script.',
    primary: '#C8C4B8',
    secondary: '#7A7488',
    paper: '#CCC6B8',
    ink: '#4A4058',
    displayFont: 'archaic',
    status: 'stub',
  },
  {
    slug: 'haunt-collective',
    name: 'The Haunt Collective',
    shortName: 'The Collective',
    register:
      'The residue of contested occupation. Visual identity defined by the absence of singular identity.',
    primary: '#687058',
    secondary: '#A4A898',
    paper: '#BFA070', // default; varies per document
    ink: '#3D3A38',
    displayFont: 'body',
    status: 'stub',
  },
] as const

export function getFaction(slug: string): FactionMeta | undefined {
  return factions.find((f) => f.slug === slug)
}

export const shippingFactions: readonly FactionMeta[] = factions.filter(
  (f) => f.status === 'shipping',
)
