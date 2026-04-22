import type { MetadataRoute } from 'next'
import { factions } from '@/lib/factions'
import { posts } from '@/lib/devlog'

const SITE = 'https://gravenspire.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, lastModified, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE}/design/art`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/devlog`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE}/ledger`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
  ]

  const factionRoutes: MetadataRoute.Sitemap = factions.map((f) => ({
    url: `${SITE}/world/${f.slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: f.status === 'shipping' ? 0.8 : 0.3,
  }))

  const devlogRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE}/devlog/${p.slug}`,
    lastModified: new Date(p.meta.date),
    changeFrequency: 'yearly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...factionRoutes, ...devlogRoutes]
}
