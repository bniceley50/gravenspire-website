import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // No private routes yet. When the ledger form ships, its
        // success/confirm pages may want exclusion; add them here.
      },
    ],
    sitemap: 'https://gravenspire.com/sitemap.xml',
  }
}
