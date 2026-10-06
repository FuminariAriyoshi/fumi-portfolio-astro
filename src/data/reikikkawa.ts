// Source: https://www.fumi-studio.com/works/1/jp (2026-10-05)
export const reikikkawaSections = [
  {
    id: 'reikikkawa-values', chapter: 'Core Value', title: '写真の美しさを、そのまま伝える。',
    paragraphs: [
      'シンプルさ。写真の美しさを伝えるため、複雑な機能は加えず、シンプルに閲覧できるカルーセルを目指した。',
      '好奇心。作品を邪魔しないことと、退屈にしないこと。その両方を満たすため、Three.jsのカルーセルを選んだ。',
      '高速読み込み。70ページの本を扱うため、SSGで画像を管理した。写真の色味を維持することも重視した。',
    ],
    images: [],
  },
  {
    id: 'reikikkawa-prototype', chapter: 'Prototype', title: 'コアバリューから、カルーセルを選ぶ。',
    paragraphs: [
      'コアバリューを定義した後、Figmaで下書きを作成した。この段階で、Three.jsによるカルーセルという手段を考えた。',
      '複数のカルーセルをプロトタイプとして制作。視認性とコアバリューを考慮し、最も適切なNo.3を選んだ。',
    ],
    images: [
      { src: '/works/reikikkawa/prototype.png', alt: 'Figmaで作成した卒業制作サイトの画面構成と下書き' },
      { src: '/works/reikikkawa/carousel-options.png', alt: 'Three.jsで比較した4種類のカルーセルのプロトタイプ。採用したのはNo.3' },
    ],
  },
  {
    id: 'reikikkawa-development', chapter: 'Development', title: 'デザインから、3日間で開発。',
    paragraphs: ['デザインが決まった後、開発は3日間で終えた。Google Antigravityを使いながら、Three.jsのカルーセルをWebサイトとして実装した。'],
    images: [{ src: '/works/reikikkawa/development.png', alt: 'Three.jsのカルーセルの実装画面とGoogle Antigravity' }],
  },
  {
    id: 'reikikkawa-text', chapter: 'Text Animation', title: '写真に刻まれた、年月を際立たせる。',
    paragraphs: ['この本には、写真だけでなく吉川さんの思い出も詰まっている。写真に記載された年代にも価値を感じ、年月を際立たせるテキストアニメーションを加えた。'],
    images: [], videoId: '1188936532',
  },
  {
    id: 'reikikkawa-mobile', chapter: 'Mobile', title: 'デバイスに合わせて、閲覧体験を調整。',
    paragraphs: [
      'モバイルでは、横型のカルーセルを縦型に変更した。操作の発火条件もデバイスに合わせて変更し、一部は省略した。',
      '「次へ」「前へ」のヒットエリアもデバイスごとに大きく調整し、モバイルでも快適に使えるインターフェイスにした。',
    ],
    images: [
      { src: '/works/reikikkawa/mobile.png', alt: '縦型カルーセルを採用したスマートフォン版の画面' },
      { src: '/works/reikikkawa/mobile-navigation.png', alt: 'PCとスマートフォンの「前へ」「次へ」のヒットエリアの比較' },
    ],
  },
];
