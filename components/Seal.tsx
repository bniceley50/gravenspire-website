import type { FactionSlug } from '@/lib/factions'
import styles from './Seal.module.css'

/**
 * Faction seal primitive.
 *
 * Each seal is an inline SVG, authored from the executable spec in
 * Art Bible §7.7. Scale with the `scale` prop (default 1 = ~64px
 * square). Positioned by the parent — the Seal itself is a block
 * element; the parent decides where on the document it lives.
 *
 * One seal per faction, except Living Resistance which has no seal
 * (authentication by recognition) — we render a small pen-mark
 * instead, per spec.
 */

interface SealProps {
  faction: FactionSlug
  scale?: number
  className?: string
}

export default function Seal({ faction, scale = 1, className }: SealProps) {
  const size = Math.round(64 * scale)

  switch (faction) {
    case 'vampire-court':
      return <CourtSeal size={size} className={className} />
    case 'ghoul-syndicate':
      return <SyndicateSeal size={size} className={className} />
    case 'necromancer-academy':
      return <AcademySeal size={size} className={className} />
    case 'cult-of-the-pale-king':
      return <CultSeal size={size} className={className} />
    case 'haunt-collective':
      return <CollectiveSeal size={size} className={className} />
    case 'living-resistance':
      return <ResistanceMark size={size} className={className} />
  }
}

/* ------------------------------------------------------------------
 * Vampire Court — square wax impression, arch-and-lintel motif.
 * "Gray-blue wax, oxidized at edges. Age in wax craze-cracking,
 * not motif degradation."
 * ---------------------------------------------------------------- */

function CourtSeal({ size, className }: { size: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={`${styles.seal} ${className ?? ''}`}
      aria-label="Seal of the Vampire Court"
      role="img"
    >
      <defs>
        <filter id="court-craze" x="-10%" y="-10%" width="120%" height="120%">
          {/* Subtle surface noise simulating craze-cracking in aged wax */}
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" />
          <feColorMatrix values="0 0 0 0 0.22
                                 0 0 0 0 0.25
                                 0 0 0 0 0.32
                                 0 0 0 0.2 0" />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>
      </defs>
      {/* Wax base — slightly soft edges, off-square to suggest pressed wax */}
      <rect
        x="6" y="6" width="52" height="52"
        fill="#8A9BA8"
        stroke="#5A6570"
        strokeWidth="0.5"
        rx="1"
      />
      {/* Subtle oxidation darkening at edges */}
      <rect
        x="6" y="6" width="52" height="52"
        fill="none"
        stroke="#4A5560"
        strokeWidth="1"
        strokeOpacity="0.4"
        rx="1"
      />
      {/* Arch-and-lintel motif, compressed */}
      <g stroke="#2A3040" strokeWidth="1.2" fill="none">
        {/* Left pillar */}
        <line x1="18" y1="48" x2="18" y2="28" />
        {/* Right pillar */}
        <line x1="46" y1="48" x2="46" y2="28" />
        {/* Lintel */}
        <line x1="16" y1="28" x2="48" y2="28" />
        {/* Compressed pointed arch */}
        <path d="M 20 28 L 20 22 L 32 14 L 44 22 L 44 28" />
      </g>
      {/* Craze surface overlay */}
      <rect x="6" y="6" width="52" height="52" filter="url(#court-craze)" opacity="0.5" />
    </svg>
  )
}

/* ------------------------------------------------------------------
 * Ghoul Syndicate — iron die blind stamp, horizontal rule over tally.
 * "Never quite level — tool shows use wear. Placed at lower-left."
 * ---------------------------------------------------------------- */

function SyndicateSeal({ size, className }: { size: number; className?: string }) {
  return (
    <svg
      width={size * 1.1}
      height={size * 0.7}
      viewBox="0 0 80 50"
      className={`${styles.seal} ${className ?? ''}`}
      aria-label="Tally mark of the Ghoul Syndicate"
      role="img"
      style={{ transform: 'rotate(-1.5deg)' }}
    >
      {/* Iron-die blind stamp — no fill, just indented lines with depth shadow */}
      <g stroke="#3E2A1C" strokeWidth="2" strokeLinecap="square" fill="none">
        {/* Horizontal ruled line */}
        <line x1="8" y1="16" x2="72" y2="16" />
        {/* Four tally marks — slight spacing variation for hand-made feel */}
        <line x1="18" y1="24" x2="18" y2="42" />
        <line x1="30" y1="24" x2="30" y2="42" strokeWidth="2.2" />
        <line x1="42" y1="24" x2="42" y2="42" />
        <line x1="55" y1="24" x2="55" y2="42" strokeWidth="1.8" />
      </g>
      {/* Subtle indentation shadow — mimics physical impression */}
      <g stroke="#1A0E06" strokeWidth="0.5" strokeLinecap="square" fill="none" opacity="0.5">
        <line x1="8.5" y1="16.8" x2="72.5" y2="16.8" />
        <line x1="18.5" y1="24.8" x2="18.5" y2="42.5" />
        <line x1="30.5" y1="24.8" x2="30.5" y2="42.5" />
        <line x1="42.5" y1="24.8" x2="42.5" y2="42.5" />
        <line x1="55.5" y1="24.8" x2="55.5" y2="42.5" />
      </g>
    </svg>
  )
}

/* ------------------------------------------------------------------
 * Necromancer Academy — double-rule ink stamp on raised paper wafer.
 * "Stamp level and precisely placed. Ink oxidizes blue-gray over time."
 * ---------------------------------------------------------------- */

function AcademySeal({ size, className }: { size: number; className?: string }) {
  return (
    <svg
      width={size * 1.8}
      height={size * 0.45}
      viewBox="0 0 120 30"
      className={`${styles.seal} ${className ?? ''}`}
      aria-label="Academy archival reference"
      role="img"
    >
      {/* Raised paper wafer — very subtle warm-cream, barely distinguishable */}
      <rect x="1" y="1" width="118" height="28" fill="#D4C69A" stroke="#B9A77A" strokeWidth="0.4" />
      {/* Double-rule frame */}
      <g stroke="#2A3040" strokeWidth="0.8" fill="none">
        <line x1="8" y1="10" x2="112" y2="10" />
        <line x1="8" y1="12" x2="112" y2="12" />
        <line x1="8" y1="18" x2="112" y2="18" />
        <line x1="8" y1="20" x2="112" y2="20" />
      </g>
      {/* Roman-numeral citation, centered between rules */}
      <text
        x="60"
        y="17"
        fontFamily="var(--font-garamond), Georgia, serif"
        fontSize="9"
        fill="#2A3040"
        textAnchor="middle"
        letterSpacing="1.2"
      >
        IX · ccxlvii
      </text>
    </svg>
  )
}

/* ------------------------------------------------------------------
 * Cult of the Pale King — stone stamp, circle-bisected-vertical,
 * pressed multiple times at varying pressure. No ink.
 * ---------------------------------------------------------------- */

function CultSeal({ size, className }: { size: number; className?: string }) {
  return (
    <svg
      width={size * 1.2}
      height={size}
      viewBox="0 0 80 64"
      className={`${styles.seal} ${className ?? ''}`}
      aria-label="Stone impression of the Cult"
      role="img"
    >
      {/* Multiple impressions of the same stamp at different pressures and positions.
           The stamp is a circle bisected by a vertical line — pre-writing symbol. */}
      <g fill="none" stroke="#7A7488" strokeWidth="1.5">
        {/* First impression — pale, offset left, low pressure */}
        <g opacity="0.35" transform="translate(22 28) rotate(-3)">
          <circle r="14" />
          <line x1="0" y1="-14" x2="0" y2="14" />
        </g>
        {/* Second — slightly darker, offset */}
        <g opacity="0.55" transform="translate(40 30) rotate(2)">
          <circle r="14" />
          <line x1="0" y1="-14" x2="0" y2="14" />
        </g>
        {/* Third — darkest, registered */}
        <g opacity="0.8" transform="translate(44 34) rotate(-1)">
          <circle r="14" strokeWidth="1.8" />
          <line x1="0" y1="-14" x2="0" y2="14" strokeWidth="1.8" />
        </g>
      </g>
    </svg>
  )
}

/* ------------------------------------------------------------------
 * Haunt Collective — defaced. Prior seal broken but present; prior
 * stamp over-stamped with a second different impression.
 * ---------------------------------------------------------------- */

function CollectiveSeal({ size, className }: { size: number; className?: string }) {
  return (
    <svg
      width={size * 1.2}
      height={size}
      viewBox="0 0 80 64"
      className={`${styles.seal} ${className ?? ''}`}
      aria-label="Defaced seal on a Collective document"
      role="img"
    >
      {/* Prior seal — a Court-like wax square, partially destroyed */}
      <g transform="translate(20 16)">
        <rect x="0" y="0" width="32" height="32" fill="#8A9BA8" opacity="0.6" stroke="#5A6570" strokeWidth="0.5" />
        {/* Original arch-lintel motif, faded */}
        <g stroke="#2A3040" strokeWidth="0.8" fill="none" opacity="0.5">
          <line x1="8" y1="24" x2="8" y2="14" />
          <line x1="24" y1="24" x2="24" y2="14" />
          <line x1="7" y1="14" x2="25" y2="14" />
          <path d="M 9 14 L 9 10 L 16 6 L 23 10 L 23 14" />
        </g>
        {/* Destruction: a diagonal gouge, and a torn corner */}
        <path
          d="M -2 34 L 34 -2"
          stroke="#3D3A38"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.9"
        />
        <path
          d="M 24 0 L 32 0 L 32 8 Z"
          fill="var(--doc-paper, #BFA070)"
          stroke="#5A6570"
          strokeWidth="0.3"
        />
      </g>
      {/* Over-stamp — a rougher, different impression, off-register */}
      <g transform="translate(36 30) rotate(8)" fill="none" stroke="#3D3A38" strokeWidth="1.5" opacity="0.85">
        <circle r="14" />
        <path d="M -14 0 L 14 0" />
        <path d="M -8 -10 L 8 10" />
      </g>
    </svg>
  )
}

/* ------------------------------------------------------------------
 * Living Resistance — no seal. A personal pen-mark; small, simple,
 * meaningless to outsiders.
 * ---------------------------------------------------------------- */

function ResistanceMark({ size, className }: { size: number; className?: string }) {
  return (
    <svg
      width={size * 0.6}
      height={size * 0.5}
      viewBox="0 0 40 32"
      className={`${styles.seal} ${className ?? ''}`}
      aria-label="Personal mark"
      role="img"
    >
      {/* Two crossed pen strokes — a specific individual's identifying mark.
           Variable pressure; slightly scratchy edges. */}
      <g stroke="#3D3A38" strokeLinecap="round" fill="none">
        <path d="M 6 24 Q 14 8, 24 22" strokeWidth="1.6" />
        <path d="M 12 10 L 30 26" strokeWidth="1.2" />
      </g>
    </svg>
  )
}
