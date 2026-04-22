import type { ComponentType } from 'react'

import NoticeInTradeDistrict, {
  meta as noticeMeta,
} from '@/content/devlog/a-notice-posted-in-the-trade-district.mdx'
import ChamberlainAndButcher, {
  meta as chamberlainMeta,
} from '@/content/devlog/the-chamberlain-and-the-butcher.mdx'

/**
 * Devlog post registry. Adding a new post requires two steps:
 *   1. Create `content/devlog/[slug].mdx` with an `export const meta`
 *   2. Add an entry to the `posts` array below (newest first)
 */

export interface DevlogMeta {
  title: string
  /** ISO 8601 date (YYYY-MM-DD) */
  date: string
  /** One-line summary for the index page */
  dek: string
}

export interface DevlogPost {
  slug: string
  meta: DevlogMeta
  Content: ComponentType<Record<string, never>>
}

export const posts: readonly DevlogPost[] = [
  {
    slug: 'the-chamberlain-and-the-butcher',
    meta: chamberlainMeta as DevlogMeta,
    Content: ChamberlainAndButcher,
  },
  {
    slug: 'a-notice-posted-in-the-trade-district',
    meta: noticeMeta as DevlogMeta,
    Content: NoticeInTradeDistrict,
  },
] as const

export function getPost(slug: string): DevlogPost | undefined {
  return posts.find((p) => p.slug === slug)
}

export function formatDate(iso: string): string {
  const d = new Date(iso + 'T00:00:00Z')
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}
