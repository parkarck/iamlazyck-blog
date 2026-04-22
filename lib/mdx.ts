import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export type PostKind = 'post' | 'diary';

export type PostSource = {
  type?: 'youtube' | 'article' | 'paper' | 'thought';
  url?: string;
  author?: string;
};

export type PostFrontmatter = {
  title: string;
  date: string;
  kind: PostKind;
  tags?: string[];
  excerpt?: string;
  source?: PostSource;
  cover?: string;
};

export type Post = {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
};

const CONTENT_ROOT = path.join(process.cwd(), 'content');

function readDirOrEmpty(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));
}

function readPostFile(filePath: string, kind: PostKind): Post | null {
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  const slug = path.basename(filePath).replace(/\.(md|mdx)$/, '');

  const fm = data as Partial<PostFrontmatter>;
  if (!fm.title || !fm.date) return null;

  return {
    slug,
    frontmatter: {
      title: fm.title,
      date: fm.date,
      kind: (fm.kind ?? kind) as PostKind,
      tags: fm.tags,
      excerpt: fm.excerpt,
      source: fm.source,
      cover: fm.cover,
    },
    content: content.trim(),
  };
}

export function getAllPosts(kind: PostKind): Post[] {
  const dir = path.join(CONTENT_ROOT, kind === 'post' ? 'posts' : 'diary');
  const files = readDirOrEmpty(dir);
  const posts = files
    .map((f) => readPostFile(path.join(dir, f), kind))
    .filter((p): p is Post => p !== null);
  return posts.sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));
}

export function getAllPostsMixed(): Post[] {
  return [...getAllPosts('post'), ...getAllPosts('diary')].sort((a, b) =>
    a.frontmatter.date < b.frontmatter.date ? 1 : -1,
  );
}

export function getPostBySlug(kind: PostKind, slug: string): Post | null {
  const dir = path.join(CONTENT_ROOT, kind === 'post' ? 'posts' : 'diary');
  for (const ext of ['md', 'mdx'] as const) {
    const p = path.join(dir, `${slug}.${ext}`);
    if (fs.existsSync(p)) return readPostFile(p, kind);
  }
  return null;
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return `${d.getFullYear()}. ${String(d.getMonth() + 1).padStart(2, '0')}. ${String(d.getDate()).padStart(2, '0')}.`;
}
