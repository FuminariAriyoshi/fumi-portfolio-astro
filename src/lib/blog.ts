// ブログ記事の取得(新しい順)。下書き(draft: true)はローカルの dev でだけ見え、本番のビルドには出さない
import { getCollection } from 'astro:content';

export const getPosts = async () =>
  (await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft)).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  );

export const postPath = (id: string) => `/blog/${id}/`;
