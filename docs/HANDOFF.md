# 引き継ぎメモ（2026-10-03 時点）

Fumi の個人ポートフォリオ。Claude Code から Codex に引き継ぐためのメモ。
**作業を始める前にこのファイルを最後まで読むこと。**

---

## 1. いまの状態

- 技術: Astro 7 + Tailwind CSS v4（`@tailwindcss/vite`）+ React（島は最小限）
- トップ（`/`）は **Keynote 風の縦スクロール** に作り直したばかり
  - 左: スライドのサムネイル一覧（サイドバー）。開閉トグルあり
  - 右: スライド本体を縦に並べる
- Figma: `webconcept`（fileKey `NZOJERpLXIbZL1ZvWV4SOu`）
  - `420-13` … サイドバーを開いた状態
  - `420-199` … サイドバーを閉じた状態
- ビルド OK（`npm run build`）。ブラウザでデスクトップ / 390px 幅とも確認済み、コンソールエラーなし

### 方針の変遷（同じことを繰り返さないため）

1. 旧サイト（`../FumiPortfolio`、Next.js + Prismic）の移植 → 却下。**ゼロから作る**
2. 1枚＝1画面の「PDF型」スライド（1280×832 固定キャンバス）→ 2026-10-03 に Keynote 風へ変更
3. 2 の部品（`SlideLayout` / `Deck` / `HeroSlide` / `ProjectSlide` / `StorySlide` など）は
   `/works/pitatobi` がまだ使っているので **残してある**。トップでは使っていない

---

## 2. ファイル構成（トップ関連）

```
src/
  pages/index.astro                 トップ。下のコンポーネントを並べるだけ
  layouts/BaseLayout.astro          縦スクロールの白背景ページ（トップ用）
  layouts/SlideLayout.astro         旧スライド型（/works/pitatobi 用）
  data/home.ts                      スライド構成 slides / 自己紹介 intro / awards / socials
  data/projects.ts                  作品データ（暫定。後で Prismic に差し替え）
  components/
    layout/SiteHeader.astro         上のナビ（Fumi / About / Works / Contact → 各スライドへのアンカー）
    layout/Workspace.astro          サイドバー + 本体。開閉・状態保存・現在スライド追従の script
    layout/SlideFrame.astro         16:9 のスライド枠（tone: accent / ink / light）
    ui/SidebarToggle.astro          開閉ボタン（aria-expanded / aria-controls）
    ui/SlideThumb.astro             サムネイル。aria-current="true" で大きく明るく
    ui/SlideHeading.astro           スライドの「番号 + 見出し」
    sections/IntroSlide.astro       1枚目「Hi! I'm Fumi」（背景に単語2列）
    sections/StatementSlide.astro   「Think Logically」の大きなグラデーション文字
    sections/AboutSlide.astro       01 About（赤）
    sections/WorksSlide.astro       02 Works（黒）。個別ページがある作品だけリンク
    sections/ContactSlide.astro     03 Contact（グレー）
  styles/global.css                 デザイントークン（@theme）と sidebar-closed variant
```

### 仕組みのポイント

- **サイドバー開閉**: `Workspace` のルートに `data-sidebar="open" | "closed"`。
  `global.css` の `@custom-variant sidebar-closed` で、子孫に `sidebar-closed:w-[55px]` のように書ける。
  閉じた状態の寸法は Figma 420-199 に合わせてある（サイドバー 55px、文字や画像が大きくなる）
- **状態保存**: `localStorage('sidebar')`。初回描画前に inline script で復元（チラつき防止）。try/catch 済み
- **現在スライド追従**: IntersectionObserver で画面中央付近のスライドを検出し、サムネイルの `aria-current` を付け替える
- **サムネイルはスライドと同じデータ（`data/home.ts` の `slides`）から生成**。スライドを足すときは
  `slides` に `{ id, label }` を追加し、同じ `id` を持つ section を `index.astro` に置く
- md（768px）未満ではサイドバーとトグルを隠し、文字を小さくしている（デザイン無し・独自判断）

---

## 3. 守るルール（ユーザー指定・必須）

- **UI は component 単位**で作る。`layout/` `sections/` `ui/` に分ける。ページに直書きしない
- **アニメーションを勝手に足さない**（GSAP / CSS transition / hover・scroll エフェクト全部）。
  頼まれたら GSAP を使う（依存は入っている）。reduced-motion に配慮する
- **font-size は rem**（1rem = 16px）。それ以外の寸法（width / height / padding / margin / gap）は px か Tailwind スケール。
  font-size は `global.css` の `--text-*` トークン経由で使う（`text-nav` `text-greeting` など）
- 色も `--color-*` トークン経由（`bg-thumb` `bg-accent` `text-ink` など）。新しい色はトークンを足してから使う
- `:root` に `font-weight` を設定しない
- **アクセシビリティ（見た目は変えずにマークアップだけで）**
  - アイコンだけのボタン/リンクには `aria-label`
  - 文脈が読めないリンクには文脈入りの `aria-label`
  - 画像には必ず `alt`（装飾は `alt=""`）
  - フォーム入力には `<label>`（`sr-only` 可）か `aria-label`
- 日本語テキストのマッチングは trim + 正規化 + 部分一致（全角記号に注意）
- **変更後は必ず `npm run build`** し、副作用がないか確認してから完了とする
- dev サーバーは `astro dev --background`（このプロジェクトの AGENTS.md の指示）
- **デプロイ先は Cloudflare Pages**。`imageService: 'passthrough'` のみ。`imageService: 'compile'` 禁止、`@astrojs/vercel` は入れない
- **git push はしない**（毎回ユーザーに確認する）

---

## 4. CMS（Prismic）

- リポジトリ名 `fumiportfolio`（`prismic.config.json`）。Sanity は 2026-09-18 に廃止済み。Sanity 前提の記述は無視
- `src/prismicio.ts` に `createClient` と `getPortfolios()`（`on_off == true`、`date` 降順）
- 主コンテンツタイプ `portfolio`。言語 `en-us` / `ja-jp`
- フィールド: `title` `initial`(本文) `portfolio`(カバー) `portfoliophotos`(`photos` / `photos_before` / `des` / `video`) `video` `genre` `year` `role` `client` `tools` `team` `link`
- **トップはまだ Prismic に繋いでいない**（`data/home.ts` / `data/projects.ts` の静的データ）

---

## 5. 未完了・次にやること

- [ ] サイドバーを開いた状態だと、ノートPCの高さにサムネイル4枚が収まらずサイドバー内にスクロールバーが出る（現在サムネイルを縮めれば解決）
- [ ] EN / JP 切り替え（`docs/portfolio.md` に両方のコピーあり）
- [ ] Works / About を Prismic のデータに差し替え
- [ ] Works の「Reikikkawa Graduation works」「StarWeaving」の個別ページ（いまは Coming soon）
- [ ] Contact にメールアドレスを載せるか（ユーザーに確認）
- [ ] `/works/pitatobi` を新しい Keynote 風レイアウトに揃えるか（ユーザーに確認）。揃えたら旧スライド型の部品は削除できる
- [ ] スマホ表示のデザインは Figma に無い。ちゃんと作るならユーザーに確認
- [ ] Cloudflare Pages のアダプター設定（`astro.config.mjs` にはまだ無い。静的出力なので現状不要の可能性あり）

---

## 6. 参考資料

- `docs/portfolio.md` … サイト構成・コピー（JP/EN）・経歴などの実データ・トークンの設計メモ
- 旧サイト `../FumiPortfolio`（Next.js）… 参照のみ。消さない・移植しない
