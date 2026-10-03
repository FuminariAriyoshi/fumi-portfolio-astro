import * as prismic from '@prismicio/client';
import config from '../prismic.config.json';

export const repositoryName =
  import.meta.env.PUBLIC_PRISMIC_ENVIRONMENT || config.repositoryName;

const routes: prismic.Route[] = [
  { type: 'portfolio', path: '/works/:uid' },
  { type: 'page', path: '/pages/:uid' },
];

/**
 * プロジェクトの Prismic リポジトリ用クライアント。
 * Next.js 版から移植。enableAutoPreviews と next 固有の fetchOptions は
 * Astro では使えないため除いてある。
 */
export function createClient(clientConfig: prismic.ClientConfig = {}) {
  return prismic.createClient(repositoryName, {
    routes,
    ...clientConfig,
  });
}

/** URL セグメント → Prismic の言語コード */
export const PRISMIC_LANG: Record<string, string> = {
  en: 'en-us',
  jp: 'ja-jp',
};

/**
 * Works セクション用に en / ja 両方のポートフォリオを取得する。
 * Next.js 版 src/app/[lang]/page.tsx と同じクエリ。
 */
export async function getPortfolios() {
  const client = createClient();

  const query = (lang: string) =>
    client
      .getAllByType('portfolio', {
        lang,
        filters: [prismic.filter.at('my.portfolio.on_off', true)],
        orderings: [{ field: 'my.portfolio.date', direction: 'desc' }],
      })
      .catch(() => []);

  const [en, ja] = await Promise.all([query(PRISMIC_LANG.en), query(PRISMIC_LANG.jp)]);

  return { en, ja };
}
