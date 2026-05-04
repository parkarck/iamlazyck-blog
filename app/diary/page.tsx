import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllPosts, formatDate } from '@/lib/mdx';

export const metadata: Metadata = {
  title: 'diary',
  description: '산책, 일상, 강아지. 짧은 사진 일기.',
};

export default function DiaryIndexPage() {
  const diary = getAllPosts('diary');
  return (
    <>
      <h1>diary</h1>
      <p style={{ color: 'var(--ink-soft)' }}>
        산책, 일상, 강아지. 짧은 사진 일기.
      </p>
      {diary.length === 0 ? (
        <p style={{ color: 'var(--ink-soft)', marginTop: 40 }}>
          아직 올린 사진이 없다.
        </p>
      ) : (
        <ul className="post-list">
          {diary.map((p) => (
            <li key={p.slug}>
              <div className="meta">
                <span>{formatDate(p.frontmatter.date)}</span>
              </div>
              <h2>
                <Link href={`/diary/${p.slug}`}>{p.frontmatter.title}</Link>
              </h2>
              {p.frontmatter.excerpt ? (
                <p className="excerpt">{p.frontmatter.excerpt}</p>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
