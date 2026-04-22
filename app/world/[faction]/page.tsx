import type { ComponentType } from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Document from '@/components/Document'
import { factions, getFaction, type FactionSlug } from '@/lib/factions'

import VampireCourt from '@/content/factions/vampire-court.mdx'
import GhoulSyndicate from '@/content/factions/ghoul-syndicate.mdx'
import LivingResistance from '@/content/factions/living-resistance.mdx'
import NecromancerAcademy from '@/content/factions/necromancer-academy.mdx'
import CultOfThePaleKing from '@/content/factions/cult-of-the-pale-king.mdx'
import HauntCollective from '@/content/factions/haunt-collective.mdx'

type MDXContent = ComponentType<Record<string, never>>

const contentBySlug: Record<FactionSlug, MDXContent> = {
  'vampire-court': VampireCourt as MDXContent,
  'ghoul-syndicate': GhoulSyndicate as MDXContent,
  'living-resistance': LivingResistance as MDXContent,
  'necromancer-academy': NecromancerAcademy as MDXContent,
  'cult-of-the-pale-king': CultOfThePaleKing as MDXContent,
  'haunt-collective': HauntCollective as MDXContent,
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

  const Authored = contentBySlug[faction.slug]
  // Per §7.7: Court and Academy mount with pins at upper corners.
  const mounted =
    faction.slug === 'vampire-court' || faction.slug === 'necromancer-academy'

  return (
    <div className="page">
      <Document register={faction.slug} mounted={mounted}>
        <Authored />
      </Document>
    </div>
  )
}
