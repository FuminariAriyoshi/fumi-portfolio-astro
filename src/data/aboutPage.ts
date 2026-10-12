// /about ページ(旧サイト FumiPortfolio の About と同じ内容)。en / ja の両方を持つ
export type Lang = 'en' | 'ja';
type Text = Record<Lang, string>;

export const aboutPage = {
  name: 'Fuminari Ariyoshi',
  nameJa: '有吉 史成',
  // PHILOSOPHY の一文。本文の上に大きく出す(日英共通)
  tagline: 'Think logically. Build intuitively.',
  philosophy: {
    en: 'Based on logical thinking, I aim to be able to output intuitively. Once the problem is identified, the brand identity is determined, and the concept is decided, I believe that it is very important to create intuitively to build that aesthetic. Users touch intuitively and feel the brand, so I value their senses very much.',
    ja: '論理的思考を踏まえ、感覚的にアウトプットできることが私の目指していることです。問題特定、ブランドアイデンティティ、コンセプトが決まったらその世界観を構築するために、感覚的に作ることがとても大切だと考えています。ユーザーは感覚的に触り、ブランドを”感じる”ため、感覚と直感もとても大切にしています。',
  } as Text,
  introduction: {
    en: 'Born and raised in Kyoto, I grew up with parents who run their own Japanese restaurant. From UI/UX design to 3D projects in tools like Cinema 4D, I don’t limit myself. I use any medium necessary to deliver the best design.',
    ja: '京都で生まれ育ち、日本料理店を営む両親の元で育ちました。UI/UXデザインからCinema 4Dを用いた3Dプロジェクトまで、手法を問わず、プロジェクトのニーズに応じた最適なデザインを提供することを信条としています。',
  } as Text,
  socials: [
    { label: 'Instagram', href: 'https://www.instagram.com/fuminari___a/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/fumiaa/' },
    { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61566817187111' },
    { label: 'Youtube', href: 'https://www.youtube.com/@Fumi_design99' },
  ],
  education: [
    {
      period: { en: '2026.8 - 2027.7', ja: '2026.8 - 2027.7' },
      title: { en: 'LASALLE College of the Arts (Singapore)', ja: 'LASALLE College of the Arts (シンガポール)' },
      sub: { en: 'Design Communication Exchange Program', ja: 'Design Communication 交換留学' },
    },
    {
      period: { en: '2024.4 - PRESENT', ja: '2024.4 - 現在' },
      title: { en: 'Musashino Art University', ja: '武蔵野美術大学' },
      sub: { en: 'College of Art and Design / Science of Design', ja: '造形学部 基礎デザイン学科' },
    },
  ] as { period: Text; title: Text; sub: Text }[],
  experience: [
    {
      period: { en: '2026.08', ja: '2026.08' },
      title: { en: 'IBM Japan Designer Intern 5days', ja: 'IBM Japan Intern 5days' },
      role: { en: 'Designer', ja: 'デザイナー' },
      desc: {
        en: 'Over five days, I worked through client goal setting, prioritization, and persona selection, all the way to revenue design and UI design.',
        ja: 'クライアントの目標設定、優先順位付け、ペルソナ選定から収益設計、UIデザインまでを5日間で行いました。',
      },
    },
    {
      period: { en: '2026.02 - PRESENT', ja: '2026.02 - 現在' },
      title: { en: 'FumiStudio', ja: 'FumiStudio' },
      role: { en: 'Freelance Designer', ja: 'フリーランスデザイナー' },
      desc: {
        en: 'As a freelance designer, I flexibly provide design services (such as websites and social media posts) essential for creators leveraging social media to expand their businesses.',
        ja: 'フリーランスとして、SNSで集客しておられる発信者が本格的にビジネス展開する際に必要なデザインサービスを柔軟に提供しています。(WEBサイトや投稿など)',
      },
    },
    {
      period: { en: '2026.04 - 2026.06', ja: '2026.04 - 2026.06' },
      title: { en: 'SoftBank Robotics Intern', ja: 'ソフトバンク・ロボティクス インターン' },
      role: { en: 'UIUX Designer', ja: 'UIUXデザイナー' },
      desc: {
        en: 'I conducted SEO improvements, web analytics, web optimization, and created UI improvement proposals to increase CTA. I also proposed designs using Figma and handed them over to the developers. Additionally, I created Meta Ad creative banners based on targets and pain points, some of which are already live.',
        ja: 'CTA増加を狙うためのSEO改善、web分析、web改善、UI改善提案書の制作を行いました。またFigmaでデザイン案を提出し、コーダーへ引き継ぎを行いました。メタ広告としてターゲットやペインからクリエイティブバナーを制作し、すでに一部配信が始まっています。',
      },
    },
    {
      period: { en: '2026.03', ja: '2026.03' },
      title: { en: 'CyberAgent 2Days Intern UIDA', ja: 'サイバーエージェント 2Daysインターン UIDA' },
      role: { en: 'UI Design', ja: 'UIデザイン' },
      desc: {
        en: 'Participated in a 2-day intensive UI design workshop, where I gained practical experience in problem-solving processes based on design thinking and prototyping skills.',
        ja: '2日間のUIデザインワークショップで、アイデアからプロトタイプまでを高速で提案しました。“Move fast and break things.”を体現できた一方、デザインロジックの弱さを反省し、その重要性を改めて実感しました。',
      },
    },
    {
      period: { en: '2026.03', ja: '2026.03' },
      title: { en: 'Global Design Initiative in Taipei 2026', ja: 'Global Design Initiative in Taipei 2026' },
      role: { en: 'Design workshop', ja: 'Design workshop' },
      desc: {
        en: 'Participated in the Global Design Initiative in Taipei 2026, an international design workshop held in Taipei, Taiwan, in March 2026, where I proposed a rebranding plan for the Tamsui district in collaboration with design students from around the world.',
        ja: '2026年3月に台湾の台北で行われたグローバルデザインワークショップに参加し、世界中のデザイン学生と淡水地区のリブランディング案を提案しました。',
      },
    },
    {
      period: { en: '2025.06 - 2027.03', ja: '2025.06 - 2027.03' },
      title: { en: 'VoiceCast', ja: 'VoiceCast' },
      role: { en: 'UIUX Designer', ja: 'UIUXデザイナー' },
      desc: {
        en: 'I redesigned and rebuilt the homepage for VoiceCast Co., Ltd., increasing its page views by 108%. Subsequently, I collaborated with senior designers to create the UI/UX design for an internal web application.',
        ja: '株式会社VoiceCast様のHomePageをリデザインおよび、リビルドさせていただいたのち、PV数を108%増加させました。その後、社内webAppのUIUXデザインを先輩デザイナーの方と共に制作しました。',
      },
    },
    {
      period: { en: '2024.08 - PRESENT', ja: '2024.08 - 現在' },
      title: { en: 'Awesome Ars Academia', ja: 'Awesome Ars Academia' },
      role: { en: 'Teaching Assistant', ja: 'Teaching Assistant' },
      desc: {
        en: 'I teach programming online in English to junior and senior high school students attending an international school.',
        ja: 'インターナショナルスクールに通う中高生にオンラインで英語でプログラミング(主にJavaScript)を教える講師をしています。',
      },
    },
  ] as { period: Text; title: Text; role: Text; desc: Text }[],
  languages: [
    { label: { en: 'First', ja: '第一言語' }, value: { en: 'Japanese', ja: '日本語' } },
    { label: { en: 'Second', ja: '第二言語' }, value: { en: 'English', ja: '英語' } },
  ] as { label: Text; value: Text }[],
  certifications: [
    { date: '2025.01', name: 'TOEFL iBT 86', doc: '/TOEFL_Score.pdf' },
    { date: '2026.07', name: 'TOEIC 935', doc: '/TOEIC.pdf' },
  ],
  awards: [
    { date: '2026.03', name: 'AWWWARDS HONORABLE MENTION', doc: '/awwwards.pdf' },
    { date: '2026.02', name: 'CSSWINNER STAR', doc: '/csswinner.pdf' },
  ],
};

export interface TickerTestimonial {
  quote: Text;
  /** 全文(「more」で開く)。無ければ quote を出す */
  fullQuote?: Text;
  author: Text;
  role: Text;
  avatar: string;
}

// 上の帯で流す推薦文(旧サイト testimonials-ticker と同じ)
export const tickerTestimonials: TickerTestimonial[] = [
  {
    quote: {
      en: 'He can design by considering the value of the product on their own, rather than just staying as an implementer.',
      ja: '実装者に留まるだけではなく、自身でプロダクトの本質的価値を考えて機能設計を行うことができる。',
    },
    author: { en: 'Kai Hosoya', ja: '細谷 海' },
    role: { en: 'Founder & CEO, VoiceCast Co., Ltd.', ja: '株式会社VoiceCast 代表取締役' },
    avatar: '/testimonials/opt-82dfb123.webp',
  },
  {
    quote: {
      en: 'Thank you so much for the wonderful creation. To visualize what was inside my head, we held countless meetings and worked through fine adjustments, and the final output is of a quality that far exceeded my expectations.',
      ja: '制作ありがとうございました。\n僕の脳内をビジュアライズする為に、\n何度もMTGを重ね、細かい調整をしてくださり、\n想像を遥かに越えるクオリティのものが出来上がりました。',
    },
    fullQuote: {
      en: "Thank you so much for the wonderful creation. To visualize what was inside my head, we held countless meetings and worked through fine adjustments, and the final output is of a quality that far exceeded my expectations.\n\nI believe this is clear proof that Fumi's attitude of fully committing to everything is reflected in his work. Let's both keep growing and work together again when our paths cross.\n\nIt was an incredibly fun time.\nLet's do it again today.",
      ja: '制作ありがとうございました。\n僕の脳内をビジュアライズする為に、\n何度もMTGを重ね、細かい調整をしてくださり、\n想像を遥かに越えるクオリティのものが出来上がりました。\n\nこれは、Fumiくんのあらゆる事に向き合うマインドが、\n仕事にも現れている証拠だと思います。\nお互い成長して、どこかの交差点で\nまた一緒に仕事をしましょう。\n\n最高に楽しい時間でした。\n今日もやろう。',
    },
    author: { en: 'Masayuki Kazawa', ja: '加澤 雅之' },
    role: { en: 'Entrepreneur', ja: '起業家' },
    avatar: '/testimonials/masayuki-kazawa.jpg',
  },
  {
    quote: {
      en: "Thank you so much for making it!😭 I never imagined the website would actually come to life, so I'm thrilled you made it look this amazing!",
      ja: '作ってくれてありがとう😭\nWebサイトが実現するなんて思っていなかったので、\nこんなにかっこよく作ってもらえて嬉しかったです！',
    },
    author: { en: 'Rei Kikkawa', ja: '吉川 伶' },
    role: { en: 'Designer & Photographer', ja: 'デザイナー&写真家' },
    avatar: '/testimonials/opt-b26aecb0.webp',
  },
];
