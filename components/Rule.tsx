import styles from './Rule.module.css'

/**
 * Hairline rule with a compressed pointed-arch terminus at the right.
 *
 * Art Bible §7.1: "Panel frames use the compressed pointed-arch
 * terminus at the right end of horizontal bars only. The left end is
 * a clean vertical cut." Translating that Layer-1 vocabulary to web
 * dividers — section rules get an architectural finial instead of
 * just ending in space.
 *
 * Variants:
 *   default — full-width rule suited to `.prose`-width contexts
 *   short   — narrower rule for tighter blocks
 */

interface RuleProps {
  variant?: 'default' | 'short'
  className?: string
}

export default function Rule({ variant = 'default', className }: RuleProps) {
  return (
    <div
      className={`${styles.wrap} ${className ?? ''}`}
      data-variant={variant}
      aria-hidden="true"
      role="presentation"
    >
      <svg
        className={styles.svg}
        viewBox="0 0 400 16"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Flat hairline from the left edge to just before the finial */}
        <line
          x1="0" y1="12" x2="376" y2="12"
          stroke="currentColor"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
        {/*
         * Compressed pointed-arch finial. Two short quadratic curves
         * meeting at a point above the baseline, returning to it at
         * the outer edge. Deliberately compact — this is a finial, not
         * an ornament.
         */}
        <path
          d="M 376 12 Q 384 12 388 6 Q 392 2 396 6 Q 400 12 400 12"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  )
}
