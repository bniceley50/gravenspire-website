import type { ComponentType } from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Document from '@/components/Document'
import { factions, getFaction, type FactionSlug } from '@/lib/factions'

import VampireCourt from '@/content/factions/vampire-court.mdx'
import GhoulSyndicate from '@/content/factions/ghoul-syndicate.mdx'
import LivingResistance from '@/content/factions/living-resistance.mdx'

/**
 * Dynamic faction page.
 *
 * Shipping factions (Court, Syndicate, Resistance) render authored MDX
 * from `content/factions/`. Stub factions (Academy, Cult, Collective)
 * render placeholder in-voice copy until their MDX is authored.
 */

type MDXContent = ComponentType<Record<string, never>>

const shippingContent: Partial<Record<FactionSlug, MDXContent>> = {
  'vampire-court': VampireCourt as MDXContent,
  'ghoul-syndicate': GhoulSyndicate as MDXContent,
  'living-resistance': LivingResistance as MDXContent,
}

export function generateStaticParams() {
  return factions.map((f) => ({ faction: f.slug }))
}

interface PageProps {
  params: Promise<{ faction: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { faction: slug } = await params
  const faction = getFaction(slug)
  if (!faction) return {}
  return {
    title: faction.name,
    description: faction.register,
  }
}

export default async function FactionPage({ params }: PageProps) {
  const { faction: slug } = await params
  const faction = getFaction(slug)
  if (!faction) notFound()

  const Authored = shippingContent[faction.slug]
  const mounted = faction.slug === 'vampire-court' || faction.slug === 'necromancer-academy'

  return (
    <div className="page">
      <Document register={faction.slug} mounted={mounted}>
        {Authored ? <Authored /> : renderStub(faction.slug)}
      </Document>
    </div>
  )
}

/**
 * Stubs for not-yet-authored factions. Removed when each faction's
 * MDX ships.
 */
function renderStub(slug: FactionSlug) {
  switch (slug) {
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
          <p>— the old notice, half-obscured, concerning a meeting that did not occur</p>
          <p>— a second hand, underneath, correcting the date</p>
          <p>— a third, written across both, apologising for none of it</p>
          <p>This page is in the process of being left incomplete.</p>
        </>
      )

    default:
      return null
  }
}
