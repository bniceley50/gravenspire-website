import Link from 'next/link'
import styles from './page.module.css'

/**
 * Homepage.
 *
 * Brief (Art Bible \u00a71, user direction):
 *   - Text-first. No hero media, no parallax, no CTAs.
 *   - The site IS Layer 2; the homepage is the first page of the archive.
 *   - Four doorways: the World, the Design, the Devlog, the Ledger.
 *   - Pre-Raphaelite compositional restraint: vertical rhythm,
 *     generous whitespace, one thing at a time.
 */

export default function HomePage() {
  return (
    <div className={styles.home}>
      <section className={styles.invocation} aria-labelledby="home-opening">
        <p className={styles.epigraph}>
          <span aria-hidden="true" className={styles.quote}>
            {'\u201c'}
          </span>
          The city is not open. It is being drawn.
          <span aria-hidden="true" className={styles.quote}>
            {'\u201d'}
          </span>
        </p>

        <h1 id="home-opening" className={styles.lede}>
          An archive, kept by hand.
        </h1>

        <p className={styles.body}>
          <strong>Gravenspire</strong> is a small gothic MMO, still being
          written. In the city there are six factions and five of them are
          undead. They are not stage-dressing; they are playing the
          political game with each other, whether or not you are logged in.
        </p>

        <p className={styles.body}>
          This website is the archive — notices, dispatches, and working
          documents pinned to the board as the world is built. It is
          updated each week. New leaves accumulate. Return when you can.
        </p>
      </section>

      <hr className={styles.divider} aria-hidden="true" />

      <section className={styles.doorways} aria-labelledby="home-doorways">
        <h2 id="home-doorways" className={styles.sectionHeading}>
          Four ways in
        </h2>

        <ol className={styles.list}>
          <li className={styles.doorway}>
            <Link href="/world/vampire-court" className={styles.doorLink}>
              <span className={styles.doorName}>The World</span>
              <span className={styles.doorMeta}>i.</span>
            </Link>
            <p className={styles.doorBody}>
              Six factions, five of them undead. Each with its own paper,
              its own hand, and its own relationship to time. Three pages
              written so far — the Court, the Syndicate, the Resistance.
            </p>
          </li>

          <li className={styles.doorway}>
            <Link href="/design/art" className={styles.doorLink}>
              <span className={styles.doorName}>The Design</span>
              <span className={styles.doorMeta}>ii.</span>
            </Link>
            <p className={styles.doorBody}>
              How the city is drawn, lit, and composed. An excerpt from
              the art bible, which is the document that governs every
              surface in Gravenspire before it is allowed to be built.
            </p>
          </li>

          <li className={styles.doorway}>
            <Link href="/devlog" className={styles.doorLink}>
              <span className={styles.doorName}>The Devlog</span>
              <span className={styles.doorMeta}>iii.</span>
            </Link>
            <p className={styles.doorBody}>
              Weekly notes from the worktable — decisions made, drawings
              redrawn, rules tried and returned to the shelf. Published
              when the week has something in it worth keeping.
            </p>
          </li>

          <li className={styles.doorway}>
            <Link href="/ledger" className={styles.doorLink}>
              <span className={styles.doorName}>The Ledger</span>
              <span className={styles.doorMeta}>iv.</span>
            </Link>
            <p className={styles.doorBody}>
              A standing list of readers who want word when the city opens
              its gates, or when the devlog has something substantial to
              say. No other correspondence. Unsubscribe at will.
            </p>
          </li>
        </ol>
      </section>

      <hr className={styles.divider} aria-hidden="true" />

      <section className={styles.colophon} aria-label="Colophon">
        <p className={styles.colophonLine}>
          This archive is in pre-production. Expect the typography to
          change. Expect documents to be revised, dated, and replaced.
          Nothing here is final.
        </p>
      </section>
    </div>
  )
}
