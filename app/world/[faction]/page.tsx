import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Document from '@/components/Document'
import { factions, getFaction, type FactionSlug } from '@/lib/factions'

/**
 * Dynamic faction page. Day-one: the three shipping factions (Court,
 * Syndicate, Resistance) render an in-voice notice inline; the three
 * stubs render a placeholder note of the same register. When MDX
 * content files are authored in `content/factions/`, this file will
 * import them directly and this inline copy will retire.
 */

export function generateStaticParams() {
  return factions.map((f) => ({ faction: f.slug }))
}

interface PageProps {
  params: { faction: string }
}

export function generateMetadata({ params }: PageProps): Metadata {
  const faction = getFaction(params.faction)
  if (!faction) return {}
  return {
    title: faction.name,
    description: faction.register,
  }
}

export default function FactionPage({ params }: PageProps) {
  const faction = getFaction(params.faction)
  if (!faction) notFound()

  const mounted =
    faction.slug === 'vampire-court' || faction.slug === 'necromancer-academy'

  return (
    <div className="page">
      <Document register={faction.slug as FactionSlug} mounted={mounted}>
        {renderStubContent(faction.slug)}
      </Document>
    </div>
  )
}

/**
 * Placeholder in-voice copy per faction. Every line here will be
 * replaced by authored content in the next checkpoint. The value of
 * the stubs is proving that the Document primitive correctly applies
 * each faction's paper stock, ink color, and display font.
 */
function renderStubContent(slug: FactionSlug) {
  switch (slug) {
    case 'vampire-court':
      return (
        <>
          <h1>The Court, in its own words</h1>
          <p>
            Let it be recorded, in the third month of the twelfth year, that
            the Chamberlain has received report of a new arrival in the
            city, and has authorised the standard courtesies to be offered
            upon first presentation. No further comment is required at this
            juncture.
          </p>
          <p>
            This page is not yet finished. The full dispatch will be posted
            when the Court sees fit to publish it.
          </p>
        </>
      )

    case 'ghoul-syndicate':
      return (
        <>
          <h1>A note from the Syndicate</h1>
          <p>
            Business as usual. Tally marks at the foot, as always. If you
            are reading this and the ink is still wet you are standing
            somewhere you should not be; step back from the board.
          </p>
          <p>
            Longer writing is coming. We do not waste paper until the
            matter is resolved.
          </p>
        </>
      )

    case 'living-resistance':
      return (
        <>
          <h1>A notice, posted in the Trade District</h1>
          <p>
            We do not have the luxury of calligraphy. This is to say what
            must be said and to leave it where it must be left. The city
            was here before the dead arrived, and those of us who remain
            alive remain here too.
          </p>
          <p>
            More to follow. Watch the board.
          </p>
        </>
      )

    case 'necromancer-academy':
      return (
        <>
          <h1>A preliminary entry</h1>
          <p>
            On the matter of the aforementioned subject, further study is
            required before any formal position may be advanced. See cross-
            reference &c. in the margin; the stacks are not yet catalogued.
          </p>
          <p>This page has not yet been drafted.</p>
        </>
      )

    case 'cult-of-the-pale-king':
      return (
        <>
          <h1>A prayer, laid down</h1>
          <p>
            The stone remembers what the city has forgotten. That is all
            that need be said today. We leave this here. It will be here
            tomorrow, or it will have fallen; either outcome is correct.
          </p>
          <p>This page has not yet been written.</p>
        </>
      )

    case 'haunt-collective':
      return (
        <>
          <h1>(a page bearing multiple hands)</h1>
          <p>
            — the old notice, half-obscured, concerning a meeting that
            did not occur
          </p>
          <p>
            — a second hand, underneath, correcting the date
          </p>
          <p>
            — a third, written across both, apologising for none of it
          </p>
          <p>This page is in the process of being left incomplete.</p>
        </>
      )
  }
}
