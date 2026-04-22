import type { Metadata } from 'next'
import Document from '@/components/Document'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'The Art of Gravenspire — §4.1 The Master Palette',
  description:
    'An excerpt from the art bible — the seven colours of Gravenspire, the city, independent of the factions that occupy it.',
}

interface PaletteEntry {
  name: string
  hex: string
  role: string
  forbids: string
}

const palette: readonly PaletteEntry[] = [
  {
    name: 'Quarry Stone',
    hex: '#8A8478',
    role:
      'Dominant building material. Exterior stone walls, paving, architectural mass. The default read of the city at distance.',
    forbids:
      'Not for fabric or character materials. Not for UI fills. Not for sky or ambient fill colour.',
  },
  {
    name: 'Wick Gray',
    hex: '#5C5650',
    role:
      'Aged timber, weathered iron, old lacquer, shadow-register architectural surfaces. The colour of things that were once other colours.',
    forbids:
      'Not for skin. Not for UI background. Not for state or condition signaling.',
  },
  {
    name: 'Candlefall Amber',
    hex: '#C48B3A',
    role:
      'Practical light sources only — candle, lantern, hearth. Present only where a physical source exists.',
    forbids:
      'Not as a tint over ambient surfaces. Not for UI. Not for magic VFX. Not for gold-as-reward.',
  },
  {
    name: 'Pewter Rain',
    hex: '#9EA4A8',
    role:
      'Overcast sky ambient, wet stone reflection, slate rooftiles, cool diffuse daylight when no practical source competes.',
    forbids:
      'Not as a tonal grade over scenes. Not for water or fluid effects. Not as a faction colour.',
  },
  {
    name: 'Iron Seam',
    hex: '#3D3A38',
    role:
      'Deep shadow, unlit corridor depth, sub-threshold darkness that retains material identity. Shadow on stone that still has surface information.',
    forbids:
      'Not as true black. Not as silhouette fill. Not for UI. Pure #000000 is forbidden in every ambient context.',
  },
  {
    name: 'Render Umber',
    hex: '#7A6248',
    role:
      'Interior plaster, worn timber flooring, old ceiling beams, smoke-absorbed fabric. The warm-neutral of everything interior and old.',
    forbids:
      'Not as skin tone. Not as substitute for faction colour. Not for surfaces newer than thirty in-world years.',
  },
  {
    name: 'Bone Pale',
    hex: '#D4CCBC',
    role:
      'Aged paper, bleached linen, very old plaster past cream. Lightest the city gets without direct practical light on a surface.',
    forbids:
      'Not for purity symbolism. Not for healing or safety association. Not as true white. Always yellowed, stained, specific.',
  },
]

export default function DesignArtPage() {
  return (
    <div className="page">
      <Document>
        <p className={styles.eyebrow}>§4.1 — An excerpt from the art bible</p>

        <h1>The master palette</h1>

        <p>
          Seven colours. These are the colours of Gravenspire as a city,
          independent of the factions that occupy it. They are the base
          against which every faction reads. Each has a role, and each
          has a list of things it is not permitted to do.
        </p>

        <p>
          The palette is not a mood. It is a set of constraints derived
          from how stone, timber, plaster, and candlelight behave at age.
          Working inside it is the point; substituting is not.
        </p>

        <hr />

        <ol className={styles.plate} aria-label="Seven colours of the city">
          {palette.map((entry) => (
            <li key={entry.hex} className={styles.entry}>
              <span
                className={styles.swatch}
                style={{ backgroundColor: entry.hex }}
                aria-hidden="true"
              />
              <div className={styles.detail}>
                <header className={styles.entryHeader}>
                  <h3 className={styles.name}>{entry.name}</h3>
                  <code className={styles.hex}>{entry.hex}</code>
                </header>
                <p className={styles.role}>{entry.role}</p>
                <p className={styles.forbids}>{entry.forbids}</p>
              </div>
            </li>
          ))}
        </ol>

        <hr />

        <p className={styles.footnote}>
          Two anchors define the bracket. <strong>Iron Seam</strong> is
          the shadow anchor; nothing darker is permitted in an ambient
          surface, and true black is never used. <strong>Bone Pale</strong>{' '}
          is the lightness ceiling; nothing brighter appears without a
          direct practical light source illuminating it, and true white
          is never used. The city lives between these two points, and
          every faction, every material, every surface is calibrated
          inside that range.
        </p>

        <p>
          <em>
            The full art bible continues through faction colour systems,
            semantic vocabulary, UI palette, zone temperature rules, and
            colour-blind accessibility. Excerpts from those sections will
            be published here in future.
          </em>
        </p>
      </Document>
    </div>
  )
}
