import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/mdx';
import { SITE_URL } from '@/lib/persona';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/posts',
    '/diary',
    '/about',
    '/privacy',
    '/terms',
  ].map((p) => ({
    url: `${SITE_URL}${p}`,
    lastModified: now,
    changeFrequency: p === '' ? 'daily' : 'weekly',
    priority: p === '' ? 1 : 0.7,
  }));

  const posts = getAllPosts('post').map((p) => ({
    url: `${SITE_URL}/posts/${p.slug}`,
    lastModified: new Date(p.frontmatter.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const diary = getAllPosts('diary').map((p) => ({
    url: `${SITE_URL}/diary/${p.slug}`,
    lastModified: new Date(p.frontmatter.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...posts, ...diary];
}
