import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getAllPosts, getPostBySlug, formatDate } from '@/lib/mdx';

type Params = { slug: string };

export function generateStaticParams() {
  return getAllPosts('post').map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug('post', slug);
  if (!post) return {};
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPostBySlug('post', slug);
  if (!post) notFound();

  return (
    <article>
      <header className="post-header">
        <div className="meta">{formatDate(post.frontmatter.date)}</div>
        <h1>{post.frontmatter.title}</h1>
        {post.frontmatter.tags?.length ? (
          <div className="tags">
            {post.frontmatter.tags.map((t) => (
              <span key={t} className="tag">
                #{t}
              </span>
            ))}
          </div>
        ) : null}
      </header>

      <div className="post-body">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
      </div>

      <footer className="post-footer">
        {post.frontmatter.source?.url ? (
          <p>
            이 글의 시작점 →{' '}
            <a
              href={post.frontmatter.source.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {post.frontmatter.source.author ?? post.frontmatter.source.url}
            </a>
          </p>
        ) : null}
        <p>
          <Link href="/posts">← 모든 글</Link>
        </p>
      </footer>
    </article>
  );
}
