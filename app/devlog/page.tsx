import type { Metadata } from 'next'
import Document from '@/components/Document'

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
          decided, or discarded in the making of Gravenspire. It is
          published on Fridays — bi-weekly at worst, if a week has been
          unkind to the work — and never on a schedule so tight that it
          forces a post to be published before it is ready.
        </p>

        <p>
          The first entry is in drafts. It will be titled
          <em> {'\u201c'}A Notice Posted in the Trade District{'\u201d'} </em>
          and it concerns what it means to begin a world by writing down
          a single sheet of paper that nobody will read.
        </p>

        <hr />

        <p>
          <em>
            This page will become the index of all devlog entries. Each
            entry will appear here as a dated title and a one-line gloss.
          </em>
        </p>
      </Document>
    </div>
  )
}
