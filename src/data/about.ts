// About の 2 枚分のデータ。旧サイト(FumiPortfolio の about ページ)と docs/portfolio.md から。後で Prismic に差し替える
export const profile = {
  name: 'Fuminari Ariyoshi',
  nameJa: '有吉 史成',
  photo: { src: '/about/fumi-desk.webp', alt: '自室のデスクでノートパソコンに向かって作業する Fumi', width: 1600, height: 856 },
  // 旧サイトの PHILOSOPHY(日本語)。Figma 427-350 で差し替え
  intro: [
    'Think logically. Build intuitively. 論理的思考を踏まえ、感覚的にアウトプットできることが私の目指していることです。問題特定、ブランドアイデンティティ、コンセプトが決まったらその世界観を構築するために、感覚的に作ることがとても大切だと考えています。ユーザーは感覚的に触り、ブランドを”感じる”ため、感覚と直感もとても大切にしています。',
  ],
};

export interface CareerItem {
  period: string;
  title: string;
  role: string;
  /** experience = 仕事 / workshop = ワークショップ・短期インターン */
  group?: 'experience' | 'workshop';
  /** 何をしていたか */
  description?: string;
}

// 並びと区分は Figma 427-350(Experience / Workshop & short-term intern)
export const experience: CareerItem[] = [
  {
    period: '2026.02 – Present',
    title: 'FumiStudio',
    role: 'Freelance Designer',
    group: 'experience',
    description: 'SNS で集客している発信者が本格的にビジネス展開する際に必要な、Web サイトや投稿などのデザインを提供しています。',
  },
  {
    period: '2026.04 – 2026.06',
    title: 'SoftBank Robotics Intern',
    role: 'UIUX Designer',
    group: 'experience',
    description: 'CTA 増加を狙った SEO 改善・Web 分析・UI 改善提案を担当。Figma でデザインを作りコーダーへ引き継いだほか、ターゲットとペインから Meta 広告のバナーを制作し、一部は配信中です。',
  },
  {
    period: '2025.06 – 2027.03',
    title: 'VoiceCast',
    role: 'UIUX Designer',
    group: 'experience',
    description: 'ホームページをリデザイン・リビルドし、PV 数を 108% 増加。その後、社内 Web アプリの UIUX デザインを先輩デザイナーと制作しました。',
  },
  {
    period: '2024.08 – Present',
    title: 'Awesome Ars Academia',
    role: 'Teaching Assistant',
    group: 'experience',
    description: 'インターナショナルスクールに通う中高生に、オンラインで英語でプログラミング(主に JavaScript)を教えています。',
  },
  {
    period: '2026.08',
    title: 'IBM Japan Designer Intern 5days',
    role: 'Designer',
    group: 'workshop',
    description: 'クライアントの目標設定、優先順位付け、ペルソナ選定から収益設計、UIデザインまでを5日間で行いました。',
  },
  {
    period: '2026.03',
    title: 'CyberAgent 2Days Intern UIDA',
    role: 'UI Design',
    group: 'workshop',
    description: '2日間の UI デザインワークショップで、アイデアからプロトタイプまでを高速で提案。デザインロジックの重要性を改めて実感しました。',
  },
  {
    period: '2026.03',
    title: 'Global Design Initiative in Taipei',
    role: 'Design Workshop',
    group: 'workshop',
    description: '台北で行われた国際デザインワークショップに参加し、世界中のデザイン学生と淡水地区のリブランディング案を提案しました。',
  },
];

export const education: CareerItem[] = [
  { period: '2026.08 – 2027.07', title: 'LASALLE College of the Arts', role: 'Design Communication 交換留学(シンガポール)' },
  { period: '2024.04 – Present', title: '武蔵野美術大学', role: '造形学部 基礎デザイン学科' },
];

export interface Credential {
  date: string;
  name: string;
  detail: string;
  /** 証明書の PDF(現在は未使用。画像はオーバーレイで拡大表示する) */
  href?: string;
  /** 証明書・スコアの画像 */
  image?: { src: string; alt: string; width: number; height: number };
}

export const awards: Credential[] = [
  {
    date: '2026.03',
    name: 'Awwwards',
    detail: 'Honorable Mention',
    image: { src: '/awards/awwwards-honors.png', alt: 'Awwwards Honors の証明書(FUMILIFE. By Fumi, 2026年3月11日)', width: 599, height: 800 },
  },
  {
    date: '2026.02',
    name: 'CSSWinner',
    detail: 'Star',
    image: { src: '/awards/csswinner-star.jpg', alt: 'CSSWinner STAR の証明書(Trimming by Fuminari Ariyoshi, 2026年2月11日)', width: 565, height: 800 },
  },
];

export const languages = [
  { label: 'Native', value: '日本語' },
  { label: 'Business', value: '英語' },
];

// スコアレポートは住所・生年月日などを含むため PDF にはリンクせず、スコアだけの画像(ユーザー提供のスクリーンショット)を使う
export const certifications: Credential[] = [
  {
    date: '2025.01',
    name: 'TOEFL iBT 86',
    detail: '',
    image: { src: '/certifications/toefl-score.png', alt: 'TOEFL iBT のスコア 86 / 120', width: 476, height: 274 },
  },
  {
    date: '2026.07',
    name: 'TOEIC L&R 935',
    detail: '',
    image: { src: '/certifications/toeic-score.png', alt: 'TOEIC L&R のテスト結果: トータル 935(Listening 485 / Reading 450)、試験日 2026年7月12日', width: 680, height: 1104 },
  },
];

export interface Testimonial {
  /** 段落ごと。原文の全文 */
  quote: string[];
  name: string;
  role: string;
  avatar: string;
}

// 旧サイト(FumiPortfolio / studio-fumi)の推薦文。原文の全文を段落ごとに(改行位置だけ詰めている)
export const testimonials: Testimonial[] = [
  {
    quote: [
      'ピタとびのWebサイト制作、本当にありがとう！こちらの要望にも根気強く向き合ってくれて、何度もすり合わせを重ねながら形にしてくれました。',
      'Webサイトの UI/UX はもちろん、サービス名の検討からキャラクター制作、ブランドカラーの策定まで、ピタとびのブランディング全体に幅広く携わってくれました。',
      'スピード感と柔軟さを兼ね備えたFumiくんだからこそ、ここまで良いサイトに仕上げられたと思います。また一緒にものづくりしましょう！',
    ],
    name: '中嶋 来門',
    role: '株式会社Raigate 代表取締役',
    avatar: '/testimonials/raimon-nakajima.jpg',
  },
  {
    quote: ['実装者に留まるだけではなく、自身でプロダクトの本質的価値を考えて機能設計を行うことができる。'],
    name: '細谷 海',
    role: '株式会社VoiceCast 代表取締役',
    avatar: '/testimonials/opt-82dfb123.webp',
  },
  {
    quote: [
      '制作ありがとうございました。僕の脳内をビジュアライズする為に、何度もMTGを重ね、細かい調整をしてくださり、想像を遥かに越えるクオリティのものが出来上がりました。',
      'これは、Fumiくんのあらゆる事に向き合うマインドが、仕事にも現れている証拠だと思います。お互い成長して、どこかの交差点でまた一緒に仕事をしましょう。',
      '最高に楽しい時間でした。今日もやろう。',
    ],
    name: '加澤 雅之',
    role: '起業家',
    avatar: '/testimonials/masayuki-kazawa.jpg',
  },
  {
    quote: ['作ってくれてありがとう😭 Webサイトが実現するなんて思っていなかったので、こんなにかっこよく作ってもらえて嬉しかったです！'],
    name: '吉川 伶',
    role: 'デザイナー & 写真家',
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
