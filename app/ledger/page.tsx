import type { Metadata } from 'next'
import Document from '@/components/Document'

export const metadata: Metadata = {
  title: 'The Ledger',
  description:
    'A standing list of readers who want word when the city opens its gates.',
}

export default function LedgerPage() {
  return (
    <div className="page">
      <Document>
        <h1>The ledger</h1>

        <p>
          This is a standing list of readers who want word when the city
          opens its gates, or when the devlog has something substantial
          to say. There is no other correspondence. You may strike your
          name at any time.
        </p>

        <p>
          The sign-in form has not yet been installed. When it is, it
          will ask for your email and nothing else, and the confirmation
          will say that it has been received. That is all.
        </p>

        <hr />

        <p>
          <em>
            Expected by the end of the month. Return and try the door
            again; if it opens, you will know.
          </em>
        </p>
      </Document>
    </div>
  )
}
