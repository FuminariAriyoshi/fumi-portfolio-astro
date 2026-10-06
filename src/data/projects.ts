import type { Project } from '@/components/sections/ProjectSlide.astro';
import type { Story } from '@/components/sections/StorySlide.astro';

// とりあえずの静的データ。後で Prismic(portfolio)に差し替える
export const projectTitles = ['ピタとび', 'ReiKikkawa Graduation Work', 'StarWeaving'];

export const projects: Project[] = [
  {
    title: 'StarWeaving',
    image: { src: '/works/starweaving/cover.png', alt: '星紡ぎ StarWeavingの展示空間と天井に投影した星座' },
    intro: 'StarWeaving（星紡ぎ）は、武蔵野美術大学で発表したインタラクティブな展示作品。参加者は星を並べて操作し、自分の星座を創り出すことができる。古代から人が憧れてきた宇宙や星を操る非日常体験を通じて、人の手の届かないものへの好奇心を刺激することを目指した。',
    year: '2025', role: 'Coding / Editing / Project Coordination', team: '5 members / 1 month',
    href: '#starweaving', keywords: ['Interactive', 'Constellation', 'Processing'],
  },
  {
    title: 'ReiKikkawa Graduation Work',
    image: { src: '/works/reikikkawa/cover.png', alt: '吉川伶の蝶の写真を並べた卒業制作Webサイト' },
    intro: '先輩である吉川伶は、手作りの蝶の写真を70ページの本にまとめ、卒業制作を作った。Google Driveでも公開されたが、そのUIでは閲覧しづらく、紙の蝶の美しさも感じにくかった。彼女の作品が大好きだった私は、Webサイト化を提案した。',
    client: 'Rei Kikkawa', year: '2026', role: 'Designer / Developer',
    href: 'https://trimming.vercel.app/', keywords: ['Photography', 'Three.js', 'Graduation Work'],
  },
  {
    title: 'ピタとび',
    image: { src: '/slides/pitatobi-logo.png', alt: 'ピタとびのロゴ' },
    intro:
      '留学メディア「留学NEXT」は、InstagramとTikTokでの継続的な発信で2000人のフォロワーを集めていた。だが、SNSから繋がるチャネルがなく、集まった関心がそこで止まっていた。公式サイトの制作として始まったこのプロジェクトは、進めるうちにサービス名から作り直すリブランディングになった。',
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
  'Outcome',
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

// 「留学NEXT 新規デザイン案」PDF の各ページ(21枚)。資料ビューア(DeckViewer)で見せる
export const pitatobiDeck = Array.from({ length: 21 }, (_, i) => `/works/pitatobi-case/deck/${String(i + 1).padStart(2, '0')}.webp`);
