import styles from './Footer.module.css'

/**
 * Site footer. Understated architectural terminus.
 *
 * Design inheritance:
 *   - One line of tracked small caps. No logo repeat.
 *   - No social glyphs (if/when added later, as text links, not icons).
 *   - No scroll-to-top. The page ends.
 */
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.line}>
          <span>Gravenspire</span>
          <span className={styles.sep} aria-hidden="true">
            {'\u00b7'}
          </span>
          <span>An archive, kept by hand.</span>
          <span className={styles.sep} aria-hidden="true">
            {'\u00b7'}
          </span>
          <span>MMXXVI</span>
        </p>
      </div>
    </footer>
  )
}
