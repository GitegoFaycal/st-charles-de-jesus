import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Calendar } from 'lucide-react'
import { PageHeader, Seo, Paragraphs, EmptyState } from '../components/ui'
import { NewsCard } from '../components/Cards'
import { useContent } from '../context/ContentContext'
import { mediaUrl } from '../lib/api'
import { formatDate, sortByDateDesc } from '../lib/format'
import { NotFound } from './MiscPages'

export function NewsList() {
  const { content } = useContent()
  const posts = sortByDateDesc(content.news)
  return (
    <>
      <Seo title="News" />
      <PageHeader eyebrow="News & Events" title={content.home.newsHeading || 'Happening at Saint Charles de Jesus'} subtitle="Stories, announcements and achievements from our school community." image={posts[0]?.image} />
      <section className="section">
        <div className="container-x grid gap-6 md:grid-cols-2 lg:grid-cols-3">{posts.length ? posts.map((p) => <NewsCard key={p.id} post={p} />) : <EmptyState />}</div>
      </section>
    </>
  )
}

export function NewsDetail() {
  const { slug } = useParams()
  const { content } = useContent()
  const post = content.news.find((p) => p.slug === slug)
  if (!post) return <NotFound />
  const more = sortByDateDesc(content.news).filter((p) => p.id !== post.id).slice(0, 3)
  return (
    <>
      <Seo title={post.title} description={post.excerpt} />
      <PageHeader eyebrow={formatDate(post.date || post.createdAt)} title={post.title} image={post.image} />
      <article className="section">
        <div className="container-x max-w-3xl">
          <Link to="/news" className="mb-6 inline-flex items-center gap-1 text-sm font-semibold text-brand-700"><ArrowLeft size={16} /> All news</Link>
          <p className="flex items-center gap-2 text-sm text-ink-soft"><Calendar size={16} /> {formatDate(post.date || post.createdAt)}</p>
          {post.excerpt && <p className="mt-4 text-lg font-medium text-ink">{post.excerpt}</p>}
          <img src={mediaUrl(post.image)} alt="" className="my-8 w-full rounded-2xl object-cover" />
          <Paragraphs text={post.body} className="text-lg" />
        </div>
      </article>
      {more.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="container-x">
            <h2 className="mb-6 font-heading text-2xl font-bold">More news</h2>
            <div className="grid gap-6 md:grid-cols-3">{more.map((p) => <NewsCard key={p.id} post={p} />)}</div>
          </div>
        </section>
      )}
    </>
  )
}
