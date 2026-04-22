import Link from 'next/link'
import styles from './Header.module.css'

/**
 * Site header. Architectural strip at the top of every page.
 *
 * Design inheritance (Art Bible §7.1):
 *   - Reads as mounted architectural ironwork, not UI chrome.
 *   - 1px hairline rule at bottom edge.
 *   - No logo; the word GRAVENSPIRE, inscribed.
 *   - No hover glow, no pill nav, no active-state fill.
 *
 * The nav is four destinations, matching the site's four doorways.
 * /press is intentionally not linked until a press kit exists.
 */
export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.mark} aria-label="Gravenspire — home">
          Gravenspire
        </Link>
        <nav aria-label="Primary">
          <ul className={styles.nav}>
            <li>
              <Link href="/world/vampire-court">World</Link>
            </li>
            <li>
              <Link href="/design/art">Design</Link>
            </li>
            <li>
              <Link href="/devlog">Devlog</Link>
            </li>
            <li>
              <Link href="/ledger">Ledger</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
