import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Gravenspire — The Archive'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/**
 * Social card for /.
 *
 * Deliberately restrained: Iron Seam background, Bone Pale text, one
 * hairline rule, no decoration. Uses the system serif stack because
 * bundling Cardo into the Edge runtime requires a fetch-and-serve
 * round trip that isn't worth the complexity for a pre-production OG.
 * Upgrade later by fetching Cardo woff2 from /public at render time.
 */
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#2E2B29',
          color: '#D4CCBC',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '80px',
          fontFamily: 'Georgia, "Times New Roman", serif',
        }}
      >
        <div
          style={{
            fontSize: '28px',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'rgba(212, 204, 188, 0.6)',
            marginBottom: '48px',
          }}
        >
          Gravenspire
        </div>

        <div
          style={{
            fontSize: '84px',
            fontStyle: 'italic',
            lineHeight: 1.1,
            textAlign: 'center',
            marginBottom: '40px',
          }}
        >
          An archive, kept by hand.
        </div>

        <div
          style={{
            width: '320px',
            height: '1px',
            background: 'rgba(212, 204, 188, 0.3)',
            marginBottom: '40px',
          }}
        />

        <div
          style={{
            fontSize: '22px',
            color: 'rgba(212, 204, 188, 0.55)',
            textAlign: 'center',
            maxWidth: '700px',
            lineHeight: 1.4,
          }}
        >
          A small gothic MMO, still being written. Working documents
          from the city — faction notices, design notes, and the weekly
          devlog.
        </div>
      </div>
    ),
    size,
  )
}
