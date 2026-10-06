> 最新状態は [HANDOFF_CLAUDE.md](HANDOFF_CLAUDE.md)（2026-10-06）を参照。このファイルは2026-10-03の履歴です。

# Opus 向け引き継ぎ — 2026-10-03

## 最初に読むこと

このファイル → `AGENTS.md` → `docs/HANDOFF.md` → 関連コンポーネントと `git diff`。
`docs/HANDOFF.md` の前半は作業前の状態。末尾に今回の変更が追記されている。競合する方針は、このファイルの最新ユーザー指定を優先する。

## ユーザーが本当に求めていること

**既存デザインを尊重した、質の高い GSAP テキストアニメーションと細部の調整。全面的な再デザインではない。**

最新指定（原文）:

> 白黒メインで、表紙みたいにそれぞれで色+グラデって感じ 赤にこだわりはない
> てか表紙は変えんなよ
> その他も組んだデザインを尊重して基本変えるな
> あとheaderは固定な
> 僕が基本やって欲しかったのはアニメーション部分
> gsapでexpooutでいい感じに色々細かいところやっといて

追加指定:
- 別ページへ行かず、Fumi / About / Works / 各作品 / Contact を1ページで完結させる。
- サイドバーの階層は Works の下に「ピタとび」「Reikikkawa Graduation works」「星紡ぎ」。
- 左のサムネイルと右の表紙の上端を揃える。
- スマホでは左ナビを画面下に置き、横スクロールさせる。
- Selected Work の各作品も元デザインを基本尊重。
- 表紙などの「text打ち抜き」をアニメーションさせる。現在の動きでは満足していない。完成扱いにしない。
- サイドバー開閉ボタンもスクロール時に固定する。
- **閉じたサイドバーでは文字を非表示。** 文字が狭い枠に切れて見える状態は不可。

## 現在の実装

技術: Astro 7 / Tailwind v4 / GSAP。Cloudflare Pages 方針。依存追加なし。

- `src/pages/index.astro`: 元の Intro / Statement / About / Works に、3作品の `CaseStudy` と Motion を追加。
- `src/data/home.ts`: サイドバー7項目。各作品に `nested: true`。
- `src/components/layout/SiteHeader.astro`: sticky 固定。ホームリンクは `#top`。
- `src/components/layout/Workspace.astro`: 開閉状態を localStorage に保存。開閉ボタンのコンテナを sticky にした。ResizeObserver でヘッダー実高を CSS 変数に反映。nav と main の上余白を26pxに統一。IntersectionObserver で現在項目を更新。スマホの現在項目を横スクロール領域内へ移動。
- `src/components/ui/SlideThumb.astro`: 通常64px / 現在128pxの高さ、子作品を19pxインデント。閉じた幅55pxは従来どおり。最新修正で desktop closed 時の文字を CSS で非表示（aria-label は残す）。
- `src/components/sections/WorksSlide.astro`: 元の黒い一覧デザインを保持、作品リンクをトップ内アンカーに変更。
- `src/components/sections/CaseStudy.astro`: 新規。既存 SlideHeading を使用、画像＋本文・メタデータ、Origin。元の ProjectSlide / StorySlide をそのまま移植したものではなく、レスポンシブに組み直している。**元デザインとの一致はユーザー承認を得ていない。**
- `src/components/animations/PortfolioMotion.astro`: 新規。すべて GSAP / expo.out、reduced-motion guard あり。
  - 表紙の既存2行の装飾文字を x=-20〜20 で7秒往復。
  - Think Logically の p を x=24→-48、ScrollTrigger scrub=1。
  - その他の本文・見出し・画像を y=20 / opacity=0 から順次表示。
  - アンカーは ScrollToPlugin、1.15秒、offsetY=104。
  - マウス環境のサムネイル文字を5px移動。
  - 開閉は Flip、0.8秒。
- `src/styles/global.css`: 既存トークンに追記。mobile nav fixed / 横 overflow、safe-area、開閉ボタン sticky、新規作品の CSS。追記による上書きが増えているので整理候補。
- `src/layouts/BaseLayout.astro`: skip link を追加。
- `ContactSlide.astro`: 小さい footer / Back to top を追加。

## 元デザインについて

当初 Codex が表紙などを全面変更したが、ユーザーの指摘で復元済み。
`IntroSlide.astro` / `StatementSlide.astro` / `AboutSlide.astro` は HEAD と同じソース。
ただし親のレイアウトと JS の transform は変わっている。`git diff` で比較すること。

既存の旧作品デザインは `ProjectSlide.astro` / `StorySlide.astro` / `SlideLayout.astro` / `Deck.astro` にある。
`/works/pitatobi` は残っている。トップからはリンクしないが、URL を直接開くと旧ページになる。

## 作品データと未完成範囲

`src/data/projects.ts` にあるのはピタとびの概要と Origin のみ。
Reikikkawa / 星紡ぎは静的データのタイトルだけで、新規枠は「作品紹介を準備しています」。実績・画像・成果を捏造しない。
CMS 接続、EN/JP、残りのピタとび chapters は未実装。
既存 Prismic 情報は元 HANDOFF にある。今回 CMS の取得・編集はしていない。

## 次に重点的に確認・改善する点

1. **テキストアニメーションの品質。** 現在は文章単位のフェードと小さい横移動で、文字単位のマスク／打ち抜き演出ではない。ユーザーの期待との差が残っている。元の形・配置・書体を崩さず演出すること。
2. 閉じたナビの文字非表示、再度開いた時の復帰。スマホでは localStorage=closed でも文字が表示されること。
3. Flip 開閉を連打した場合の中断・整合性。現在は requestAnimationFrame ごとに Flip.from を発火するので、連打時の競合を要確認。
4. current の更新は画面中央の狭い IntersectionObserver 判定。スクロール位置・末尾・高さ変更で正しく追従するか再確認。
5. ScrollToPlugin offsetY=104 は固定値。ヘッダー実高＋固定トグルとの重なりを確認。
6. ResizeObserver の teardown は未実装。現状はページ遷移なしだが、将来 lifecycle を足すなら処理する。
7. mobile horizontal nav に browser のスクロールバーが表示される。必要なら見た目を整える。ページ全体の横はみ出しは発生させない。
8. 新規 CaseStudy の外観を、ユーザーが組んだ既存作品デザインにさらに合わせる。

## 検証と起動

- 毎回 `npm run build`。スタイル修正後も必須。
- 開発サーバーは `npx astro dev --background --port 4399 --host 127.0.0.1`。
- http://127.0.0.1:4399 。4321は他プロジェクトが利用しているので停止しない。
- 起動が sandbox 内で失敗したため、許可された実行で4399を起動した。
- browser で確認済み: desktop 上端一致、スマホの下部 fixed / 横 overflow、ページ横はみ出し無し、スクロール後に toggle が header 直下、console error/warn 無し。
- reduced-motion はコードの guard を確認、OS設定を変えた実動作試験は未実施。
- これらの検証は視覚品質のユーザー承認を意味しない。

## Git / 制約

作業は未コミット。`git status --short` に変更と新規2コンポーネントがある。commit / push / deploy はしていない。
既存ファイルや旧サイトを勝手に削除しない。git push はユーザー確認が必要。
font-size は rem の token、色は token。:root に font-weight を設定しない。
新たなデザインの方向確認を繰り返すより、上記の明示指定に従って調整する。
