import type { Metadata } from 'next'
import Document from '@/components/Document'

export const metadata: Metadata = {
  title: 'The Art of Gravenspire',
  description:
    'An excerpt from the art bible — the document that governs every surface in Gravenspire before it is allowed to be built.',
}

export default function DesignArtPage() {
  return (
    <div className="page">
      <Document>
        <h1>The art of Gravenspire</h1>

        <p>
          Gravenspire has an art bible. It is fifty-odd pages of specific
          rules about paint, stone, cloth, light, and letters. The bible
          is not a mood board. It is an argument, section by section, for
          why the city has to look the way it does and could not plausibly
          look any other way. A wall of the Court is cold because black
          marble that has been polished for a century returns ambient
          light as a pool instead of absorbing it. A notice from the
          Syndicate is yellow because it has been handled by people whose
          hands are not clean. The bible is where those two sentences
          become the law of the world.
        </p>

        <p>
          This page will, in time, publish excerpts: the master palette,
          the faction paper stocks, the two-layer interface rule, the
          prohibitions (there are many), and the productive tensions
          (there are several). For now, the bible itself is a working
          document and this page is a placeholder. The prohibitions
          include, in advance of everything else, that nothing here may
          read as decoration.
        </p>

        <hr />

        <p>
          <em>
            Return soon. The first excerpt to be published will be
            §4.1 — The Master Palette, the seven colours of the city.
          </em>
        </p>
      </Document>
    </div>
  )
}
