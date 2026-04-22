import Link from 'next/link'
import type { Metadata } from 'next'
import Document from '@/components/Document'
import { posts, formatDate } from '@/lib/devlog'
import styles from './index.module.css'

export const metadata: Metadata = {
  title: 'The Devlog',
  description:
    'Weekly notes from the worktable — decisions made, drawings redrawn, rules tried and returned to the shelf.',
}

export default function DevlogIndexPage() {
  return (
    <div className="page">
      <Document>
        <h1>The devlog</h1>

        <p>
          The devlog is the weekly record of what was written, drawn,
          decided, or discarded in the making of Gravenspire. Published
          on Fridays; bi-weekly at worst, if a week has been unkind to
          the work. Never on a schedule so tight that it forces a post
          to be published before it is ready.
        </p>

        <hr />

        <ol className={styles.index} aria-label="All devlog entries">
          {posts.map((post) => (
            <li key={post.slug} className={styles.entry}>
              <Link
                href={`/devlog/${post.slug}`}
                className={styles.entryLink}
              >
                <time
                  dateTime={post.meta.date}
                  className={styles.entryDate}
                >
                  {formatDate(post.meta.date)}
                </time>
                <span className={styles.entryTitle}>{post.meta.title}</span>
              </Link>
              <p className={styles.entryDek}>{post.meta.dek}</p>
            </li>
          ))}
        </ol>
      </Document>
    </div>
  )
}
