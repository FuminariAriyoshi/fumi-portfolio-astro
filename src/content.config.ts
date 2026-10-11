// ブログ記事(src/content/blog/*.md)。ファイル名がそのまま URL(/blog/<ファイル名>/)になる
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    /** 検索結果・リンクのプレビュー用のタイトル(無ければ title)。記事の見出しはそのまま */
    seoTitle: z.string().optional(),
    /** 一覧・検索結果・リンクのプレビューに出す説明(120 字前後) */
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    /** カバー画像(public からのパス)。1200×630 推奨。リンクのプレビューにも使う */
    cover: z.string(),
    coverAlt: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
