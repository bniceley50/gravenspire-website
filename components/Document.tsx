import type { ReactNode } from 'react'
import type { DocumentRegister } from '@/lib/factions'
import styles from './Document.module.css'

/**
 * Layer 2 document primitive.
 *
 * The Archive's content lives on paper, not on screen-space panels.
 * A `<Document>` is a rectangular sheet of faction-appropriate stock
 * with appropriate ink color and display font. Long-form MDX content
 * composes inside it.
 *
 * Design inheritance (Art Bible §7.2, §7.7):
 *   - Paper color per faction; never white.
 *   - No UI frame, no "click to read" affordance.
 *   - No rounded corners. A sheet of paper has corners.
 *   - No drop shadow. If we want shadow-depth later we use a real
 *     sibling element offset underneath, not a CSS shadow.
 *   - No hover transforms. The document is not interactive chrome.
 *
 * Props:
 *   register   — which faction's paper stock to apply (default 'neutral')
 *   mounted    — visually "pinned" upper corners (Court + Academy)
 *   variant    — 'notice' (tight body) | 'document' (full prose measure)
 */

interface DocumentProps {
  register?: DocumentRegister
  mounted?: boolean
  variant?: 'notice' | 'document'
  children: ReactNode
}

export default function Document({
  register = 'neutral',
  mounted = false,
  variant = 'document',
  children,
}: DocumentProps) {
  return (
    <article
      className={styles.document}
      data-register={register}
      data-variant={variant}
      data-mounted={mounted ? 'true' : undefined}
    >
      {mounted ? (
        <>
          <span className={styles.pin} data-pin="left" aria-hidden="true" />
          <span className={styles.pin} data-pin="right" aria-hidden="true" />
        </>
      ) : null}
      <div className={styles.body}>{children}</div>
    </article>
  )
}
