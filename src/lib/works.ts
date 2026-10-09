import * as prismic from '@prismicio/client';
import { createClient, PRISMIC_LANG } from '@/prismicio';

/**
 * 旧サイト(FumiPortfolio)の /works と作品詳細ページをそのまま再現するためのデータ。
 * Prismic の portfolio をビルド時に en / ja 両方取る。
 */
export type Lang = 'en' | 'ja';
export type UrlLang = 'en' | 'jp';
export const toUrlLang = (lang: Lang): UrlLang => (lang === 'ja' ? 'jp' : 'en');
export const fromUrlLang = (lang: UrlLang): Lang => (lang === 'jp' ? 'ja' : 'en');

/** 絞り込みボタン(ALL = 何も選んでいない状態。旧サイトの SELECTED WORKS の代わり) */
export const specialties = ['ALL', 'BRANDING', 'WEB/UIUX', 'ClientWork', 'GRAPHIC', 'DRAWING', 'TYPEFACES', 'Experimental Work'];

/** トップでケーススタディにしている作品。Other Works(一覧・詳細・More Work)からは外す */
export const CASE_STUDY_UIDS = new Set(['1', '4']); // ReiKikkawa Graduation Work / StarWeaving
export const otherWorksOf = (works: Portfolio[]) => works.filter((work) => !CASE_STUDY_UIDS.has(work.uid ?? ''));

/** Prismic のジャンル名を、トップの Works と同じ表記にする */
const GENRE_LABELS: Record<string, string> = {
  BRANDING: 'Branding', 'WEB/UIUX': 'Web / UIUX', ClientWork: 'Client Work', GRAPHIC: 'Graphic',
  DRAWING: 'Drawing', TYPEFACES: 'Typeface', 'Experimental Work': 'Experimental',
};
export const genreLabel = (genre: string) => GENRE_LABELS[genre] ?? genre;

export type Portfolio = prismic.PrismicDocument<Record<string, any>, 'portfolio'>;

let cache: Promise<Record<Lang, Portfolio[]>> | null = null;

/** 公開中(on_off)の作品を日付の新しい順で。ビルド中は1回だけ取る */
export function getAllPortfolios() {
  cache ??= (async () => {
    const client = createClient();
    const query = (lang: string) =>
      client
        .getAllByType('portfolio', {
          lang,
          filters: [prismic.filter.at('my.portfolio.on_off', true)],
          orderings: [{ field: 'my.portfolio.date', direction: 'desc' }],
        })
        .catch(() => []) as Promise<Portfolio[]>;
    const [en, ja] = await Promise.all([query(PRISMIC_LANG.en), query(PRISMIC_LANG.jp)]);
    return { en, ja };
  })();
  return cache;
}

export const titleOf = (doc: Portfolio): string =>
  typeof doc.data.title === 'string' ? doc.data.title : prismic.asText(doc.data.title) ?? '';

export const genresOf = (doc: Portfolio): string[] => [
  ...(doc.tags ?? []),
  ...((doc.data.genre ?? []) as { genre: string | null }[]).flatMap((g) => (g.genre ? [g.genre] : [])),
];

export const hasJapanese = (text?: string) => /[぀-ヿ㐀-鿿]/.test(text ?? '');

/** Prismic(imgix) の画像を幅違いで出す */
export function imageAttrs(field: any, sizes: string) {
  if (!field?.url) return null;
  const { src, srcset } = prismic.asImageWidthSrcSet(field, { widths: [640, 828, 1200, 1920, 2400] }) as { src: string; srcset: string };
  return { src, srcset, sizes, width: field.dimensions?.width, height: field.dimensions?.height, alt: field.alt ?? '' };
}

/** 一覧のカード用：Vimeo / YouTube をミュート・ループの背景再生にする(旧 WorksGrid の buildMutedEmbedSrc) */
export function buildMutedEmbedSrc(html: string): string | null {
  const raw = html.match(/src=["']([^"']+)["']/)?.[1]?.replace(/&amp;/g, '&');
  if (!raw) return null;
  try {
    const url = new URL(raw.startsWith('//') ? `https:${raw}` : raw);
    if (url.hostname.includes('youtube.com') || url.hostname.includes('youtu.be')) {
      const videoId = url.pathname.match(/\/embed\/([^/?]+)/)?.[1] ?? '';
      const fast = new URL(`https://www.youtube-nocookie.com/embed/${videoId}`);
      for (const [k, v] of Object.entries({ autoplay: '1', mute: '1', loop: '1', playlist: videoId, controls: '0', playsinline: '1' })) fast.searchParams.set(k, v);
      return fast.toString();
    }
    if (url.hostname.includes('vimeo.com')) {
      const videoId = url.pathname.match(/\/video\/(\d+)/)?.[1] ?? url.pathname.split('/').pop();
      const fast = new URL(`https://player.vimeo.com/video/${videoId}`);
      for (const [k, v] of Object.entries({ background: '1', autoplay: '1', loop: '1' })) fast.searchParams.set(k, v);
      return fast.toString();
    }
    return url.toString();
  } catch {
    return null;
  }
}

/** 詳細ページ用：音声ありで自動再生(旧 ProjectClient の buildNormalizedEmbedSrc) */
export function buildNormalizedEmbedSrc(html: string): string | null {
  let src = html.match(/src=["']([^"']+)["']/)?.[1]?.replace(/&amp;/g, '&') ?? null;
  if (!src) {
    try { src = new URL(html).toString(); } catch { return null; }
  }
  try {
    const url = new URL(src.startsWith('//') ? `https:${src}` : src);
    if (url.hostname.includes('youtube.com') || url.hostname.includes('youtu.be')) {
      const videoId = url.pathname.match(/\/embed\/([^/?]+)/)?.[1] ?? '';
      for (const [k, v] of Object.entries({ autoplay: '1', loop: '1', mute: '0', playsinline: '1', enablejsapi: '1' })) url.searchParams.set(k, v);
      if (videoId) url.searchParams.set('playlist', videoId);
      return url.toString();
    }
    if (url.hostname.includes('vimeo.com')) {
      for (const [k, v] of Object.entries({ autoplay: '1', loop: '1', muted: '0', api: '1', autopause: '0', controls: '0', title: '0', byline: '0', portrait: '0', playsinline: '1' })) url.searchParams.set(k, v);
      url.searchParams.delete('background');
      return url.toString();
    }
    return url.toString();
  } catch {
    return null;
  }
}

/** 本文のリッチテキストを HTML に(旧 richTextComponents と同じ見た目) */
export function richTextHTML(field: any): string {
  if (!Array.isArray(field) || field.length === 0) return '';
  return prismic.asHTML(field, {
    serializer: {
      hyperlink: ({ node, children }) =>
        `<a href="${(node.data as { url?: string }).url ?? '#'}" target="_blank" rel="noopener noreferrer" class="underline hover:opacity-70 transition-opacity">${children}</a>`,
      heading4: ({ children }) => `<h4 class="text-[1.375rem] font-normal mb-5 mt-1 text-white first:mt-0">${children}</h4>`,
      heading5: ({ children }) => `<h5 class="text-[1.375rem] font-normal mt-1 text-white first:mt-0">${children}</h5>`,
    },
  });
}

/** ギャラリーの des：先頭の h3 を章タイトルに、残りを本文にする */
export function parseDesField(des: any[] | undefined) {
  if (!des?.length) return { title: null as string | null, bodyNodes: [] as any[] };
  const title = des[0]?.type === 'heading3' ? (des[0].text as string) : null;
  return { title, bodyNodes: title ? des.slice(1) : des };
}
