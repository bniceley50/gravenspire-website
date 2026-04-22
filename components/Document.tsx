import type { ReactNode } from 'react'
import type { DocumentRegister, FactionSlug } from '@/lib/factions'
import Seal from './Seal'
import styles from './Document.module.css'

/**
 * Layer 2 document primitive.
 *
 * Props:
 *   register — which faction's paper stock to apply (default 'neutral')
 *   mounted  — visually "pinned" upper corners (Court + Academy)
 *   variant  — 'notice' (tight body) | 'document' (full prose measure)
 *   seal     — render the faction seal at the foot of the document
 *              (defaults to true for faction registers, false for neutral)
 */

interface DocumentProps {
  register?: DocumentRegister
  mounted?: boolean
  variant?: 'notice' | 'document'
  seal?: boolean
  children: ReactNode
}

const FACTION_REGISTERS: readonly DocumentRegister[] = [
  'vampire-court',
  'ghoul-syndicate',
  'necromancer-academy',
  'cult-of-the-pale-king',
  'haunt-collective',
  'living-resistance',
]

function isFaction(r: DocumentRegister): r is FactionSlug {
  return FACTION_REGISTERS.includes(r) && r !== 'neutral'
}

export default function Document({
  register = 'neutral',
  mounted = false,
  variant = 'document',
  seal,
  children,
}: DocumentProps) {
  const showSeal = seal ?? isFaction(register)

  return (
    <article
      className={styles.document}
      data-register={register}
      data-variant={variant}
      data-mounted={mounted ? 'true' : undefined}
    >
      {/* Paper grain overlay — §7.2 "a textured physical object" */}
      <span className={styles.grain} aria-hidden="true" />
      {/* Single horizontal fold-mark at mid-document — §7.7 */}
      <span className={styles.fold} aria-hidden="true" />

      {mounted ? (
        <>
          <span className={styles.pin} data-pin="left" aria-hidden="true" />
          <span className={styles.pin} data-pin="right" aria-hidden="true" />
        </>
      ) : null}

      <div className={styles.body}>{children}</div>

      {showSeal && isFaction(register) ? (
        <footer className={styles.sealFoot} data-register={register}>
          <Seal faction={register} />
        </footer>
      ) : null}
    </article>
  )
}
