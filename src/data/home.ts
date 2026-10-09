// トップのスライド構成。サイドバーのサムネイルもここから作る。後で Prismic に差し替える
export type SlideColor = 'fumi' | 'about' | 'works' | 'other' | 'contact' | 'pitatobi' | 'reikikkawa' | 'starweaving';

export interface SlideMeta {
  id: string;
  label: string;
  color: SlideColor;
  nested?: boolean;
  /** 作品の章。サイドバーでこの項目の下に小さく並べる(開いている時だけ) */
  chapters?: { id: string; label: string }[];
}

export const slides: SlideMeta[] = [
  { id: 'top', label: 'Fumi', color: 'fumi' },
  { id: 'about', label: 'About', color: 'about' },
  { id: 'works', label: 'Works', color: 'works' },
  {
    id: 'pitatobi',
    label: 'ピタとび',
    color: 'pitatobi',
    nested: true,
    // ページの並び順(TheBETA はスライドが無いので出さない)
    chapters: [
      { id: 'pitatobi-intro', label: 'Introduction' },
      { id: 'pitatobi-origin', label: 'Origin' },
      { id: 'pitatobi-strategy', label: 'Strategy&ICP' },
      { id: 'pitatobi-brand', label: 'BrandSystem' },
      { id: 'pitatobi-uiux', label: 'TheUIUX' },
      { id: 'pitatobi-results', label: 'Outcome' },
      { id: 'pitatobi-improvement', label: 'Improvement' },
    ],
  },
  {
    id: 'reikikkawa', label: 'ReiKikkawa Graduation Work', color: 'reikikkawa', nested: true,
    chapters: [
      { id: 'reikikkawa-intro', label: 'Introduction' },
      { id: 'reikikkawa-values', label: 'Core Value' },
      { id: 'reikikkawa-prototype', label: 'Prototype' },
      { id: 'reikikkawa-development', label: 'Development' },
      { id: 'reikikkawa-text', label: 'Text Animation' },
      { id: 'reikikkawa-mobile', label: 'Mobile' },
    ],
  },
  {
    id: 'starweaving', label: '星紡ぎ', color: 'starweaving', nested: true,
    chapters: [
      { id: 'starweaving-intro', label: 'Introduction' },
      { id: 'starweaving-team', label: 'Team & Role' },
      { id: 'starweaving-values', label: 'Core Value' },
      { id: 'starweaving-timeline', label: 'Timeline' },
      { id: 'starweaving-ideas', label: 'Ideas' },
      { id: 'starweaving-development', label: 'Development' },
      { id: 'starweaving-installation', label: 'Installation' },
      { id: 'starweaving-exhibition', label: 'Exhibition' },
      { id: 'starweaving-editing', label: 'Color Grading' },
      { id: 'starweaving-recognition', label: 'Recognition' },
    ],
  },
  { id: 'other-works', label: 'Other Works', color: 'other' },
  { id: 'contact', label: 'Contact', color: 'contact' },
];

export const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com/fuminari___a/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/fumiaa/' },
];
