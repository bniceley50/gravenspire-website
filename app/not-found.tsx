import Link from 'next/link'
import type { Metadata } from 'next'
import Document from '@/components/Document'

export const metadata: Metadata = {
  title: 'Not found',
}

export default function NotFound() {
  return (
    <div className="page">
      <Document>
        <h1>This page is not in the archive.</h1>

        <p>
          Either the document was never written, or it was taken down and
          the board still remembers it. The archivist will not, for the
          moment, confirm which.
        </p>

        <p>
          <Link href="/">Return to the front of the archive.</Link>
        </p>
      </Document>
    </div>
  )
}
