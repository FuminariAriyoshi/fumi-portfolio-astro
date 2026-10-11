// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  // 公開 URL。canonical / OGP / sitemap の絶対 URL に使う
  site: 'https://studio-fumi.com',

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react()],

  // トップの日英切り替え。日本語は /、英語は /en/(部品は Astro.currentLocale で言語を知る)
  i18n: {
    locales: ['ja', 'en'],
    defaultLocale: 'ja',
    routing: { prefixDefaultLocale: false },
  },
});
