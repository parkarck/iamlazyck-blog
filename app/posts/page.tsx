import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllPosts, formatDate } from '@/lib/mdx';

export const metadata: Metadata = {
  title: 'posts',
  description: '리서치 메모, AI·자동화 실험, 1인 기업 준비 기록.',
};

export default function PostsIndexPage() {
  const posts = getAllPosts('post');
  return (
    <>
      <h1>posts</h1>
      <p style={{ color: 'var(--ink-soft)' }}>
        리서치 메모, AI·자동화 실험, 1인 기업 준비 기록.
      </p>
      <ul className="post-list">
        {posts.map((p) => (
          <li key={p.slug}>
            <div className="meta">
              <span>{formatDate(p.frontmatter.date)}</span>
            </div>
            <h2>
              <Link href={`/posts/${p.slug}`}>{p.frontmatter.title}</Link>
            </h2>
            {p.frontmatter.excerpt ? (
              <p className="excerpt">{p.frontmatter.excerpt}</p>
            ) : null}
          </li>
        ))}
      </ul>
    </>
  );
}
