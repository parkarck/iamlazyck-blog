import Link from 'next/link';
import { getAllPostsMixed, formatDate } from '@/lib/mdx';

export default function HomePage() {
  const items = getAllPostsMixed().slice(0, 20);

  return (
    <>
      <section className="hero">
        <img
          src="/images/rocky.gif"
          alt="rocky"
          className="hero-rocky"
          width={140}
          height={140}
        />
        <p className="hero-intro">
          리서치 회사에서 일하는 nerd 의 공개 노트. Machine Learning, GenAI,
          VLM, automation, vibe coder - movie, music, ani, book(fantasy, mystery
          novel), shihtzu, gecko and plant lover
        </p>
      </section>

      <ul className="post-list">
        {items.map((p) => (
          <li key={`${p.frontmatter.kind}-${p.slug}`}>
            <div className="meta">
              <span className="kind-badge">{p.frontmatter.kind}</span>
              <span>{formatDate(p.frontmatter.date)}</span>
            </div>
            <h2>
              <Link
                href={`/${p.frontmatter.kind === 'diary' ? 'diary' : 'posts'}/${p.slug}`}
              >
                {p.frontmatter.title}
              </Link>
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
