import type { Project } from '@/components/sections/ProjectSlide.astro';
import type { Story } from '@/components/sections/StorySlide.astro';

// とりあえずの静的データ。後で Prismic(portfolio)に差し替える
export const projectTitles = ['ピタとび', 'Reikikkawa Graduation works', 'StarWeaving'];

export const projects: Project[] = [
  {
    title: 'ピタとび',
    image: { src: '/slides/pitatobi-logo.png', alt: 'ピタとびのロゴ' },
    intro:
      '留学メディア「留学NEXT」は、InstagramとTikTokでの継続的な発信で2000人のフォロワーを集めていた。だが問い合わせの受け皿となる公式サイトが無く、集まった関心はそこで止まっていた。公式サイトの制作として始まったこのプロジェクトは、進めるうちにサービス名から作り直すリブランディングになった。',
    client: '株式会社Raigate',
    year: '2026.04-ongoing',
    role: 'Business / Brand Strategy / UIUX / Development',
    href: '/works/pitatobi',
    keywords: ['UCLA', 'SNS', 'Rebranding'],
  },
];

export const pitatobiChapters = [
  'Introduction',
  'Origin',
  'Strategy&ICP',
  'BrandSystem',
  'TheUIUX',
  'TheBETA',
  'Improvement',
  'Results',
];

export const pitatobiStories: Story[] = [
  {
    heading: '留学は人生を変える。',
    paragraphs: [
      'クライアントの中嶋来門さんは、UCLAへの留学で世界観と人生の選択肢が大きく広がる経験をしている。多様な価値観、人脈、キャリアの可能性。留学は人生を変えると、実感として持っている。',
      '',
      '一方で、留学を考えている学生や親には、その実感が届いていない。リアルな情報が無いまま、漠然とした不安で踏み出せずに終わる。',
      'その距離を埋めるために始まったのが、SNSから始まった留学メディア「留学NEXT」だった。',
    ],
    image: { src: '/slides/pitatobi-origin.png', alt: '株式会社タイミーの上場セレモニーで鐘を鳴らす中嶋来門さん' },
    note: {
      title: '中嶋来門さんの経歴',
      body: '高校卒業後、アメリカへ渡航。UCLAへ進学、卒業後、サービスローンチ2年目の株式会社Timeeへ入社。2024年のIPOを初期メンバーとして経験したのち、株式会社Raigateを創業。留学事業と外国人人材事業を行う。',
    },
  },
];
