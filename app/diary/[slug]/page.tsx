import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getAllPosts, getPostBySlug, formatDate } from '@/lib/mdx';

type Params = { slug: string };

export function generateStaticParams() {
  return getAllPosts('diary').map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug('diary', slug);
  if (!post) return {};
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
  };
}

export default async function DiaryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPostBySlug('diary', slug);
  if (!post) notFound();

  return (
    <article>
      <header className="post-header">
        <div className="meta">{formatDate(post.frontmatter.date)}</div>
        <h1>{post.frontmatter.title}</h1>
      </header>

      <div className="post-body">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
      </div>

      <footer className="post-footer">
        <p>
          <Link href="/diary">← 모든 일기</Link>
        </p>
      </footer>
    </article>
  );
}
