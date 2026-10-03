// トップのスライド構成。サイドバーのサムネイルもここから作る。後で Prismic に差し替える
export interface SlideMeta {
  id: string;
  label: string;
}

export const slides: SlideMeta[] = [
  { id: 'top', label: 'Fumi' },
  { id: 'about', label: 'About' },
  { id: 'works', label: 'Works' },
  { id: 'contact', label: 'Contact' },
];

export const intro = [
  '武蔵野美術大学でデザインを学びながら、UI/UX・Web・ブランディングを実務でやっています。',
  '課題の定義から画面、実装まで。論理で決めて、直感で作る。',
  '京都の日本料理店に生まれ、毎日少しずつ良くしていく仕事を見て育ちました。',
];

export const awards = [
  { name: 'Awwwards', prize: 'Honorable Mention' },
  { name: 'CSSWinner', prize: 'Star' },
];

export const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com/fuminari___a/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/fumiaa/' },
];
