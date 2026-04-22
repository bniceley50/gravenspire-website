import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import Document from '@/components/Document'
import { posts, getPost, formatDate } from '@/lib/devlog'
import styles from './post.module.css'

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return {
    title: post.meta.title,
    description: post.meta.dek,
  }
}

export default async function DevlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const { Content, meta } = post

  return (
    <div className="page">
      <Document>
        <header className={styles.header}>
          <time dateTime={meta.date} className={styles.date}>
            {formatDate(meta.date)}
          </time>
        </header>
        <Content />
        <footer className={styles.footer}>
          <Link href="/devlog" className={styles.back}>
            ← Back to the devlog
          </Link>
        </footer>
      </Document>
    </div>
  )
}
