// Source: https://www.fumi-studio.com/works/4/jp (2026-10-05)
export const starweavingSections = [
  {
    id: 'starweaving-team', chapter: 'Team & Role', title: '5人で、1か月かけて制作。',
    paragraphs: ['コンセプト立案からプログラミング、展示デザイン、最終編集まで、5人のチームで制作した。', '私は主にコーディング、編集、プロジェクト全体の調整を担当し、チームメンバー同士の円滑な連携に努めた。'],
    images: [],
  },
  {
    id: 'starweaving-values', chapter: 'Core Value', title: '遊び心、好奇心、インパクト。',
    paragraphs: [
      '遊び心。本来コントロールできない星を操る体験を、楽しいインタラクションにする。展示期間中も毎日、スムーズな操作性を確認した。',
      '好奇心。直感的に「面白そう」と感じてもらえるよう、非日常的な体験を設計した。',
      'インパクト。同じ空間に並ぶ作品の中で足を止めてもらうため、天井にビジュアルを投影した。多くの来場者が興味を持ち、体験してくれた。',
    ],
    images: [],
  },
  {
    id: 'starweaving-timeline', chapter: 'Timeline', title: '締切から、制作の流れを組み立てる。',
    paragraphs: ['最初に、締切までにデザインを完了させるためのタイムラインを設定した。アイデア出し、実装、設営、編集へと制作を進めた。'],
    images: [{ src: '/works/starweaving/timeline.png', alt: 'アイデア出し、実装、設営、編集の制作タイムライン' }],
  },
  {
    id: 'starweaving-ideas', chapter: 'Ideas', title: '手法から、体験の設計へ。',
    paragraphs: [
      '2回のアイデア出しで、有力な3案に絞り込んだ。最終的な作品はIdea Cを基にしている。',
      '初めは「AIを使いたい」という手法に縛られ、本質的な体験設計を見失っていた。5時間以上の議論を経て教授に相談し、方向を見直した。',
      '当時は、コンセプトから一貫してデザインを展開する方法が、自分の中でまだ体系化されていなかった。',
    ],
    images: [{ src: '/works/starweaving/ideas.png', alt: '比較したIdea A、Idea B、Idea Cのコンセプト案' }],
  },
  {
    id: 'starweaving-development', chapter: 'Development', title: '2週間、試作と改良を繰り返す。',
    paragraphs: [
      'チームで何度も失敗しながら、プロトタイピングと改良を重ねた。私はAIも活用し、Processingのエラーを解決しながら実装を進めた。',
      '他のメンバーはロゴ、ポスター、演出、設営方法のデザインなどを担当した。',
    ],
    images: [{ src: '/works/starweaving/implementation.png', alt: '星紡ぎの試作、ロゴ、投影面、Processingの実装画面' }],
  },
  {
    id: 'starweaving-installation', chapter: 'Installation', title: '現場の課題を、その場で解決する。',
    paragraphs: [
      '設営は1日で完了した。予期せぬトラブルにも、その場で案を出して対応した。',
      '美しいビジュアル体験を損なわないよう、メンバーの1人が機器の一部に布カバーを手作りして装着した。',
    ],
    images: [{ src: '/works/starweaving/installation.png', alt: '展示機器、配線、投影面を組み立てる設営の様子' }],
  },
  {
    id: 'starweaving-exhibition', chapter: 'Exhibition', title: '1週間の展示を、毎日支える。',
    paragraphs: ['展示期間中は毎日インタラクションの管理を行った。毎朝、チームのメンバーが設営を担当し、来場者が体験できる状態を維持した。'],
    images: [{ src: '/works/starweaving/exhibition.png', alt: '来場者が星を操作し、天井に星座が投影される展示の様子' }],
  },
  {
    id: 'starweaving-editing', chapter: 'Color Grading', title: '映像にも、作品の世界観を。',
    paragraphs: ['最終提出に向けて、作品を動画にまとめた。撮影素材にカラーグレーディングと簡易的な映像編集を行い、作品の世界観を合わせた。'],
    images: [], videoId: '1188936045',
  },
  {
    id: 'starweaving-recognition', chapter: 'Recognition', title: '2026年の学科紹介パンフレットに掲載。',
    /** 画像をスライドの左に入れて1枚にまとめる */
    imageInSlide: true,
    paragraphs: ['武蔵野美術大学の2026年学科紹介パンフレットに、StarWeavingが掲載された。'],
    images: [{ src: '/works/starweaving/recognition.png', alt: 'StarWeavingが掲載された武蔵野美術大学の2026年学科紹介パンフレット' }],
    href: 'https://www.musabi.ac.jp/pdf/catalog_scd/8-9/',
  },
];

// 英語版(トップの /en/)。旧サイトの英語版(Prismic en-us)をもとに、日本語版と同じ構成・画像で
export const starweavingSectionsEn: typeof starweavingSections = [
  {
    id: 'starweaving-team', chapter: 'Team & Role', title: 'Five people, one month.',
    paragraphs: ['A team of five built the project, from concept planning to programming, exhibition design and final editing.', 'I was mainly responsible for coding, editing and coordinating the whole project, keeping the team working together smoothly.'],
    images: [],
  },
  {
    id: 'starweaving-values', chapter: 'Core Value', title: 'Playfulness, curiosity, impact.',
    paragraphs: [
      'Playfulness. Turning the experience of controlling stars, something we can never really control, into a joyful interaction. We checked how smoothly it worked every day during the exhibition.',
      'Curiosity. We designed an unusual experience that makes people instinctively feel, “that looks interesting.”',
      'Impact. To make visitors stop among the other works in the same space, we projected the visuals onto the ceiling. Many visitors took an interest and tried it.',
    ],
    images: [],
  },
  {
    id: 'starweaving-timeline', chapter: 'Timeline', title: 'Planning the work back from the deadline.',
    paragraphs: ['First, we set a timeline to finish the design by the deadline, then moved through ideation, implementation, installation and editing.'],
    images: [{ src: '/works/starweaving/timeline.png', alt: 'Production timeline: ideas, implementation, installation and editing' }],
  },
  {
    id: 'starweaving-ideas', chapter: 'Ideas', title: 'From methods to experience design.',
    paragraphs: [
      'Through two ideation meetings, we narrowed it down to three promising ideas. The final work is based on Idea C.',
      'At first we were tied to a method (“we want to use AI”) and lost sight of the experience itself. After more than five hours of discussion, we consulted our professors and changed direction.',
      'Back then, I hadn’t yet built my own way of developing a design consistently from a concept.',
    ],
    images: [{ src: '/works/starweaving/ideas.png', alt: 'The concepts compared: Idea A, Idea B and Idea C' }],
  },
  {
    id: 'starweaving-development', chapter: 'Development', title: 'Two weeks of prototyping and iterating.',
    paragraphs: [
      'We prototyped and improved again and again, failing many times as a team. I used AI as well, working through Processing errors as I built it.',
      'The other members designed the logo, the poster, the effects and how to set everything up.',
    ],
    images: [{ src: '/works/starweaving/implementation.png', alt: 'StarWeaving prototypes, logo, projection surface and the Processing code' }],
  },
  {
    id: 'starweaving-installation', chapter: 'Installation', title: 'Solving problems on site.',
    paragraphs: [
      'We finished the installation in one day, coming up with fixes on the spot for unexpected issues.',
      'To keep the visual experience clean, one member hand-sewed fabric covers for some of the devices.',
    ],
    images: [{ src: '/works/starweaving/installation.png', alt: 'Setting up the devices, cables and projection surface' }],
  },
  {
    id: 'starweaving-exhibition', chapter: 'Exhibition', title: 'Keeping it running, every day for a week.',
    paragraphs: ['We managed the interaction every day of the exhibition. Each morning, a team member set it up so visitors could always try it.'],
    images: [{ src: '/works/starweaving/exhibition.png', alt: 'Visitors controlling the stars while constellations are projected on the ceiling' }],
  },
  {
    id: 'starweaving-editing', chapter: 'Color Grading', title: 'Carrying the world of the work into film.',
    paragraphs: ['For the final submission, we put the work together as a video, color grading the footage and doing light editing to match its atmosphere.'],
    images: [], videoId: '1188936045',
  },
  {
    id: 'starweaving-recognition', chapter: 'Recognition', title: 'Featured in the 2026 department brochure.',
    /** 画像をスライドの左に入れて1枚にまとめる */
    imageInSlide: true,
    paragraphs: ['StarWeaving was featured in Musashino Art University’s 2026 department introduction brochure.'],
    images: [{ src: '/works/starweaving/recognition.png', alt: 'Musashino Art University’s 2026 department brochure featuring StarWeaving' }],
    href: 'https://www.musabi.ac.jp/pdf/catalog_scd/8-9/',
  },
];
