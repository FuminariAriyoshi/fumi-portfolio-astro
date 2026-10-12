// About の 2 枚分のデータ。旧サイト(FumiPortfolio の about ページ)と docs/portfolio.md から。後で Prismic に差し替える
// 文言は { ja, en }(トップの日英切り替え。lib/i18n の tr で選ぶ)
import type { L } from '@/lib/i18n';

export const profile = {
  name: 'Fuminari Ariyoshi',
  nameJa: '有吉 史成',
  photo: { src: '/about/fumi-desk.webp', alt: { ja: '自室のデスクでノートパソコンに向かって作業する Fumi', en: 'Fumi working on a laptop at his desk at home' } as L, width: 1600, height: 856 },
  // 信条の一文。自己紹介の上に大きく出す(日英共通)
  tagline: 'Think logically. Build intuitively.',
  // 旧サイトの PHILOSOPHY(日本語)。Figma 427-350 で差し替え
  intro: [
    {
      ja: '論理的思考を踏まえ、感覚的にアウトプットできることが私の目指していることです。問題特定、ブランドアイデンティティ、コンセプトが決まったらその世界観を構築するために、感覚的に作ることがとても大切だと考えています。ユーザーは感覚的に触り、ブランドを”感じる”ため、感覚と直感もとても大切にしています。',
      en: 'Based on logical thinking, I aim to be able to output intuitively. Once the problem is identified, the brand identity is determined, and the concept is decided, I believe that it is very important to create intuitively to build that aesthetic. Users touch intuitively and feel the brand, so I value their senses very much.',
    },
  ] as L[],
};

export interface CareerItem {
  period: L;
  title: L;
  role: L;
  /** experience = 仕事 / workshop = ワークショップ・短期インターン */
  group?: 'experience' | 'workshop';
  /** 何をしていたか */
  description?: L;
}

// 並びと区分は Figma 427-350(Experience / Workshop & short-term intern)
export const experience: CareerItem[] = [
  {
    period: { ja: '2026.02 – 現在', en: '2026.02 – Present' },
    title: 'FumiStudio',
    role: 'Freelance Designer',
    group: 'experience',
    description: {
      ja: 'SNS で集客している発信者が本格的にビジネス展開する際に必要な、Web サイトや投稿などのデザインを提供しています。',
      en: 'I design websites, social posts and more for creators who have built an audience on social media and are ready to grow it into a real business.',
    },
  },
  {
    period: '2026.04 – 2026.06',
    title: 'SoftBank Robotics Intern',
    role: 'UIUX Designer',
    group: 'experience',
    description: {
      ja: 'CTA 増加を狙った SEO 改善・Web 分析・UI 改善提案を担当。Figma でデザインを作りコーダーへ引き継いだほか、ターゲットとペインから Meta 広告のバナーを制作し、一部は配信中です。',
      en: 'Worked on SEO, web analytics and UI improvement proposals to increase CTA. Designed in Figma and handed off to developers, and created Meta ad banners from target users and their pain points, some of which are now live.',
    },
  },
  {
    period: '2025.06 – 2027.03',
    title: 'VoiceCast',
    role: 'UIUX Designer',
    group: 'experience',
    description: {
      ja: 'ホームページをリデザイン・リビルドし、PV 数を 108% 増加。その後、社内 Web アプリの UIUX デザインを先輩デザイナーと制作しました。',
      en: 'Redesigned and rebuilt the homepage, increasing page views by 108%. Then designed the UI/UX of an internal web app with a senior designer.',
    },
  },
  {
    period: { ja: '2024.08 – 現在', en: '2024.08 – Present' },
    title: 'Awesome Ars Academia',
    role: 'Teaching Assistant',
    group: 'experience',
    description: {
      ja: 'インターナショナルスクールに通う中高生に、オンラインで英語でプログラミング(主に JavaScript)を教えています。',
      en: 'Teaching programming (mainly JavaScript) online, in English, to middle and high school students at an international school.',
    },
  },
  {
    period: '2026.08',
    title: 'IBM Japan Designer Intern 5days',
    role: 'Designer',
    group: 'workshop',
    description: {
      ja: 'クライアントの目標設定、優先順位付け、ペルソナ選定から収益設計、UIデザインまでを5日間で行いました。',
      en: 'In five days, worked from client goal setting, prioritization and persona selection all the way to revenue design and UI design.',
    },
  },
  {
    period: '2026.03',
    title: 'CyberAgent 2Days Intern UIDA',
    role: 'UI Design',
    group: 'workshop',
    description: {
      ja: '2日間の UI デザインワークショップで、アイデアからプロトタイプまでを高速で提案。デザインロジックの重要性を改めて実感しました。',
      en: 'In a two-day UI design workshop, moved quickly from idea to prototype and came away convinced of how much design logic matters.',
    },
  },
  {
    period: '2026.03',
    title: 'Global Design Initiative in Taipei',
    role: 'Design Workshop',
    group: 'workshop',
    description: {
      ja: '台北で行われた国際デザインワークショップに参加し、世界中のデザイン学生と淡水地区のリブランディング案を提案しました。',
      en: 'Joined an international design workshop in Taipei and, with design students from around the world, proposed a rebranding of the Tamsui district.',
    },
  },
];

export const education: CareerItem[] = [
  {
    period: '2026.08 – 2027.07',
    title: 'LASALLE College of the Arts',
    role: { ja: 'Design Communication 交換留学(シンガポール)', en: 'Design Communication, Exchange Program (Singapore)' },
  },
  {
    period: { ja: '2024.04 – 現在', en: '2024.04 – Present' },
    title: { ja: '武蔵野美術大学', en: 'Musashino Art University' },
    role: { ja: '造形学部 基礎デザイン学科', en: 'College of Art and Design, Department of Science of Design' },
  },
];

export interface Credential {
  date: string;
  name: string;
  detail: L;
  /** 証明書の PDF(現在は未使用。画像はオーバーレイで拡大表示する) */
  href?: string;
  /** 証明書・スコアの画像 */
  image?: { src: string; alt: L; width: number; height: number };
}

export const awards: Credential[] = [
  {
    date: '2026.03',
    name: 'Awwwards',
    detail: 'Honorable Mention',
    image: { src: '/awards/awwwards-honors.png', alt: { ja: 'Awwwards Honors の証明書(FUMILIFE. By Fumi, 2026年3月11日)', en: 'Awwwards Honors certificate (FUMILIFE. By Fumi, March 11, 2026)' }, width: 599, height: 800 },
  },
  {
    date: '2026.02',
    name: 'CSSWinner',
    detail: 'Star',
    image: { src: '/awards/csswinner-star.jpg', alt: { ja: 'CSSWinner STAR の証明書(Trimming by Fuminari Ariyoshi, 2026年2月11日)', en: 'CSSWinner STAR certificate (Trimming by Fuminari Ariyoshi, February 11, 2026)' }, width: 565, height: 800 },
  },
];

export const languages = [
  { label: 'Native', value: { ja: '日本語', en: 'Japanese' } as L },
  { label: 'Business', value: { ja: '英語', en: 'English' } as L },
];

// スコアレポートは住所・生年月日などを含むため PDF にはリンクせず、スコアだけの画像(ユーザー提供のスクリーンショット)を使う
export const certifications: Credential[] = [
  {
    date: '2025.01',
    name: 'TOEFL iBT 86',
    detail: '',
    image: { src: '/certifications/toefl-score.png', alt: { ja: 'TOEFL iBT のスコア 86 / 120', en: 'TOEFL iBT score: 86 / 120' }, width: 476, height: 274 },
  },
  {
    date: '2026.07',
    name: 'TOEIC L&R 935',
    detail: '',
    image: { src: '/certifications/toeic-score.png', alt: { ja: 'TOEIC L&R のテスト結果: トータル 935(Listening 485 / Reading 450)、試験日 2026年7月12日', en: 'TOEIC L&R result: total 935 (Listening 485 / Reading 450), test date July 12, 2026' }, width: 680, height: 1104 },
  },
];

export interface Testimonial {
  /** 段落ごと。原文の全文(英語は旧サイトの英訳。中嶋さんの分は新たに英訳) */
  quote: L<string[]>;
  /** 日本語名(部品から名前で探す時の目印にも使う) */
  name: string;
  nameEn: string;
  role: L;
  avatar: string;
}

// 旧サイト(FumiPortfolio / studio-fumi)の推薦文。原文の全文を段落ごとに(改行位置だけ詰めている)
export const testimonials: Testimonial[] = [
  {
    quote: {
      ja: [
        'ピタとびのWebサイト制作、本当にありがとう！こちらの要望にも根気強く向き合ってくれて、何度もすり合わせを重ねながら形にしてくれました。',
        'Webサイトの UI/UX はもちろん、サービス名の検討からキャラクター制作、ブランドカラーの策定まで、ピタとびのブランディング全体に幅広く携わってくれました。',
        'スピード感と柔軟さを兼ね備えたFumiくんだからこそ、ここまで良いサイトに仕上げられたと思います。また一緒にものづくりしましょう！',
      ],
      en: [
        'Thank you so much for building the Pitatobi website! You patiently worked through every request we had and shaped it with us over many rounds of discussion.',
        'Beyond the website’s UI/UX, you were involved in the whole Pitatobi brand, from exploring the service name to creating the character and defining the brand colors.',
        'It’s because of your speed and flexibility, Fumi, that the site turned out this well. Let’s make something together again!',
      ],
    },
    name: '中嶋 来門',
    nameEn: 'Raimon Nakajima',
    role: { ja: '株式会社Raigate 代表取締役', en: 'CEO, Raigate Inc.' },
    avatar: '/testimonials/raimon-nakajima.jpg',
  },
  {
    quote: {
      ja: ['実装者に留まるだけではなく、自身でプロダクトの本質的価値を考えて機能設計を行うことができる。'],
      en: ['He can design by considering the value of the product on their own, rather than just staying as an implementer.'],
    },
    name: '細谷 海',
    nameEn: 'Kai Hosoya',
    role: { ja: '株式会社VoiceCast 代表取締役', en: 'Founder & CEO, VoiceCast Co., Ltd.' },
    avatar: '/testimonials/opt-82dfb123.webp',
  },
  {
    quote: {
      ja: [
        '制作ありがとうございました。僕の脳内をビジュアライズする為に、何度もMTGを重ね、細かい調整をしてくださり、想像を遥かに越えるクオリティのものが出来上がりました。',
        'これは、Fumiくんのあらゆる事に向き合うマインドが、仕事にも現れている証拠だと思います。お互い成長して、どこかの交差点でまた一緒に仕事をしましょう。',
        '最高に楽しい時間でした。今日もやろう。',
      ],
      en: [
        'Thank you so much for the wonderful creation. To visualize what was inside my head, we held countless meetings and worked through fine adjustments, and the final output is of a quality that far exceeded my expectations.',
        "I believe this is clear proof that Fumi's attitude of fully committing to everything is reflected in his work. Let's both keep growing and work together again when our paths cross.",
        "It was an incredibly fun time. Let's do it again today.",
      ],
    },
    name: '加澤 雅之',
    nameEn: 'Masayuki Kazawa',
    role: { ja: '起業家', en: 'Entrepreneur' },
    avatar: '/testimonials/masayuki-kazawa.jpg',
  },
  {
    quote: {
      ja: ['作ってくれてありがとう😭 Webサイトが実現するなんて思っていなかったので、こんなにかっこよく作ってもらえて嬉しかったです！'],
      en: ["Thank you so much for making it!😭 I never imagined the website would actually come to life, so I'm thrilled you made it look this amazing!"],
    },
    name: '吉川 伶',
    nameEn: 'Rei Kikkawa',
    role: { ja: 'デザイナー & 写真家', en: 'Designer & Photographer' },
    avatar: '/testimonials/opt-b26aecb0.webp',
  },
];

// ticker の並び。短い推薦文(細谷さん・吉川さん)は 1 列に縦に積む
const byName = (name: string) => testimonials.find((t) => t.name === name)!;
export const testimonialColumns: Testimonial[][] = [
  [byName('中嶋 来門')],
  [byName('細谷 海'), byName('吉川 伶')],
  [byName('加澤 雅之')],
];
