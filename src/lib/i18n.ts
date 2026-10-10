/**
 * トップの日英切り替え。日本語は /、英語は /en/(astro.config の i18n)。
 * 部品は getLang(Astro) で今のページの言語を知り、tr(lang, { ja, en }) で文言を選ぶ。
 */
export type Lang = 'ja' | 'en';
/** 日英どちらも持つ値。片方しか無いものは文字列のままでよい */
export type L<T = string> = T | { ja: T; en: T };

export const getLang = (astro: { currentLocale?: string }): Lang => (astro.currentLocale === 'en' ? 'en' : 'ja');

export function tr<T>(lang: Lang, value: L<T>): T {
  if (value && typeof value === 'object' && 'ja' in (value as object) && 'en' in (value as object)) {
    return (value as { ja: T; en: T })[lang];
  }
  return value as T;
}

/** トップのパス(言語ごと) */
export const homePath = (lang: Lang) => (lang === 'en' ? '/en/' : '/');
