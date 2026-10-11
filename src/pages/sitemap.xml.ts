// 検索エンジン向けのサイトマップ(/sitemap.xml)。トップ(日英)・ブログ一覧・各記事
import type { APIRoute } from 'astro';
import { getPosts, postPath } from '@/lib/blog';

export const GET: APIRoute = async ({ site }) => {
  const posts = await getPosts();
  const entries = [
    { path: '/' },
    { path: '/en/' },
    ...(posts.length ? [{ path: '/blog/' }] : []),
    ...posts.map((post) => ({ path: postPath(post.id), lastmod: (post.data.updated ?? post.data.date).toISOString().slice(0, 10) })),
  ];
  const urls = entries
    .map(({ path, lastmod }: { path: string; lastmod?: string }) =>
      `  <url><loc>${new URL(path, site)}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`)
    .join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
