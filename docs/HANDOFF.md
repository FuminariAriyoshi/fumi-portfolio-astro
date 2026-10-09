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


## Codex 更新（2026-10-03）

- ユーザーの追加指定: 表紙と既存レイアウトは基本維持。主目的はアニメーション。GSAP の `expo.out`、固定ヘッダー。白黒を基調に、各面の色・グラデーションは可（赤指定ではない）。
- Works の3作品をトップ内のアンカーに変更。ピタとびは既存の紹介・Origin を `CaseStudy.astro` で掲載。他2作品は実データ未提供のため準備中。旧 `/works/pitatobi` は既存リンク互換のため残している。
- `PortfolioMotion.astro`: ScrollTrigger による本文の順次表示、ScrollToPlugin による移動、Flip によるサイドバー開閉、マウス環境のみサムネイル文字の小さな移動。すべて `prefers-reduced-motion` で無効化。
- サムネイルは階層付き7項目。高さを縮め、固定ヘッダーの下に追従。
- 表紙、Statement、About の元コンポーネントは維持。CMS・EN/JP は今回未実装。
- 開発確認 URL: http://127.0.0.1:4399 。バックグラウンド起動は sandbox 内で失敗したため、許可された起動で確認。

### 追加修正
- サイドバーと本体の上余白を26pxで統一し、表紙の上端と揃えた。
- 開閉ボタンもヘッダー直下に sticky 固定。ヘッダー実高を ResizeObserver で追従。
- スマホでは同一のスライドナビを画面下に固定、横スクロール可能にした。現在位置の項目が見えるように追従し、safe-area と本文下余白に対応。
- 表紙の既存の上下文字列に GSAP expo.out の緩い往復、Think Logically にスクロール連動の横移動を追加。既存の文字組み・背景は維持。
- 作品詳細は元の画像＋本文構成と既存 SlideHeading に寄せた。
- ビルド成功。ブラウザで上端座標の一致、スマホでページ横はみ出し無し、下部ナビの横スクロール領域、スクロール後の開閉ボタン固定、コンソールエラー無しを確認。

## Claude 更新（2026-10-03 夜）

- ユーザー指定: **スクロールには反応させない**。**Selected Works は元のデザイン(資料型スライド)のまま**。
- `CaseStudy.astro` と `.case-*` / `.portfolio-case` の CSS を削除。代わりに `SelectedWork.astro` が元の `ProjectSlide` → `StorySlide` を `SlideCanvas.astro`(1280×832 を列幅に scale、ResizeObserver)で縦に並べる。データ未提供の2作品は `WorkPendingSlide.astro`(元の Header / ProgressNav / 見出し位置だけ使用、内容は捏造しない)。
- 元スライドの「→」(data-deck-next)はページ内の次のスライドへスクロール。ProjectSlide の CTA は `#<id>-story-1` へ。
- `PortfolioMotion.astro` から ScrollTrigger を撤去。テキストは:
  - 表紙の上下の単語と Think Logically = `lib/marquee.ts` の等速無限ループ(同じ列を2回並べる。静止時の見た目は元と同じ)。ループに expo.out を使うと周期ごとに跳ねて止まるため使わない
  - 読み込み時の登場 = expo.out(列のスライドイン、アバター、Hi!/I’m/Fumi と Think/Logically の clip-path ワイプ)
  - **グラデーションはアニメーションさせない**(ユーザー指定)
- 初回のチラつき防止: `BaseLayout` が `html.motion` を付け、`[data-enter]` を GSAP が出すまで隠す(3秒で自動解除)。reduced-motion では何もしない。
- サイドバーを Figma 420-14 の寸法に(通常 299×168 / 現在 356 高 / 作品 276×155 右寄せ / gap 12 / 文字は Regular の `text-body`)。色は、普段は白に近い `-soft`(ユーザー指定: 目立たせない)、**現在のスライドは表紙と同じ作り = 黒 + `bg-tint-*` のグラデーション + 白文字**(ユーザー指定)。`bg-tint-*` は `global.css` の `@utility`。`bg-tint-slide-fumi` が表紙そのもの。
- サイドバーは画面より長いので内部スクロール。スクロールバーは非表示(開閉 Flip 中に出ていた問題も解消)。現在項目は表示範囲へ自動で入る。
- サイドバーの文字は SemiBold の `text-body`(ユーザー指定)。
- **揃え線**: サイドバー sticky top + 上余白 26px(約137px)。`Workspace` が計算して `--align-line` に出す。ページ内リンクの着地点(scroll-margin / ScrollToPlugin の offsetY)、現在項目の判定(IntersectionObserver をこの線に置く)、サイドバー内で現在項目を寄せる位置をすべてこの線に揃える。末尾の Contact スライドも届くよう main の下余白を ResizeObserver で計算(サイドバー側には余白を足さない)。
- 現在項目の切り替えは `Workspace` が `slidelist:beforechange` / `slidelist:afterchange` を出し、`PortfolioMotion` が Flip(高さ+背景色、1.15s expo.out = ページ内スクロールと同じ)でアニメーションする。ページ内リンクのクリック時は、クリックした瞬間に current を切り替えてスクロールと同時に動かし、スクロールが止まるまで IntersectionObserver の判定を止める(止まったら揃え線で再判定)。
- **サイドバーを閉じている(小さい)時は、現在項目を上に寄せない**(ユーザー指定)。サイドバーは scrollTop 0 のまま。開き直すと再び揃え線へ寄せる。
- 開閉で本体幅が変わっても、見ていたスライドが揃え線に留まるよう、開閉中(1秒)ページのスクロールを毎フレーム追従させる。
- 現在項目の切り替えで **色はグラデーション(トゥイーン)させない**。Flip は大きさのみ。Flip が書き込んだ width/height/transform は終了時に clearProps する(残すと次の位置計算が狂う)。
- サイドバーは `overflow-anchor: none`(Flip 中にブラウザがスクロール位置を補正してずれるため)。
- モバイルの現在項目は枠線ではなく横に広げる(144 → 240px、Flip でアニメーション)。モバイル CSS の `!important` は Flip の inline 値を潰すので外した。
- トップに埋め込んだ作品スライドは上部バー(番号 / EN/JP / About Fumi)を出さない(`header={false}`)。`/works/pitatobi` の旧ページは従来どおり表示。
- サイドバーの現在項目のグラデーションは表紙より濃い `bg-tint-strong-*`(55%)。表紙は `bg-tint-*`(20%)のまま。
- **About を2枚に**(`AboutProfileSlide` = 写真・名前・自己紹介・Interests・SNS / `AboutCareerSlide` = Experience・Awards・Education・Language & Certifications)。データは `src/data/about.ts`(旧 FumiPortfolio の about ページ + docs/portfolio.md)。写真は旧サイトの `about-profile.jpg` を 750px にした `public/about/profile.jpg`。資格・受賞は public の PDF にリンク。色は表紙と同じ作り(`SlideFrame tone="about"` = 黒 + `bg-tint-slide-about`)。
- 学科名は旧サイトのコード「造形学部 基礎デザイン学科」を採用。docs/portfolio.md は「デザイン情報学科」で食い違っている → **ユーザーに要確認**。
- `SlideFrame` は `@container`。About は画面幅 1280px 以上(サイドバー開閉どちらも)で 16:9 に収まる。それより狭いと縦に伸びる(切らない)。スライド幅 52rem 未満では Interests を省く。
- **番号はサイドバーのサムネイルにだけ付ける**(ユーザー指定)。`SlideHeading` から番号を削除、Works 一覧の番号も削除。サムネイル左上に 01〜07 の通し番号(閉じた状態でも表示、ラベルだけ隠す)。
- **About は4枚 + 帯**: `AboutProfileSlide`(写真 `public/about/fumi-desk.webp` = studio-fumi の about-fumi.webp / 名前 / 自己紹介 / SNS。Interests は削除) → `AboutExperienceSlide`(7件、何をしていたか付き、2列) → `AboutCredentialsSlide`(Awards・Education・Language & Certifications、受賞と資格は画像付き `CredentialCard`) → `TestimonialsSlide`(枠なしの帯 + 「Testimonials」見出し、4件の全文カードを marquee で流す)。学科は **基礎デザイン学科で確定**(docs/portfolio.md も修正済み)。
- 受賞画像: Awwwards = studio-fumi の証明書スクショ、CSSWinner = `csswinner.pdf` 1ページ目(縦長)。資格画像: **TOEFL/TOEIC はユーザー提供のスコアだけのスクリーンショット**(`public/certifications/*.png`)。スコアレポート PDF は住所・生年月日等を含むためリンクしない。`public/TOEFL_Score.pdf` `public/TOEIC.pdf` を公開フォルダから消すかはユーザーに確認中。
- 推薦文は studio-fumi の中嶋来門さん(写真は crop 指定どおり切り抜いた `public/testimonials/raimon-nakajima.jpg`)を含む4件。
- **角丸トークン**(`--radius-slide 24 / frame 12 / card 12 / thumb 8 / media 6`)。要素の大きさで段階を選ぶ。小さい要素に slide を使わない。
- 文字トークン追加: `--text-micro 0.625rem` / `--text-kicker 0.75rem`(@theme に統合) / `--text-small 0.875rem`。
- **閉じたサイドバーでホバー**: `PortfolioMotion` が `data-peek` を付け、高さをラベルに合わせて expo.out で広げ、10px のラベルを出す(番号の下)。reduced-motion は CSS の :hover で同じ見た目。
- 現在項目の判定は IntersectionObserver をやめ、**スクロールのたびに揃え線より上にある最後のスライドを選ぶ**方式(一気に飛んだ時の取りこぼし対策)。
- ページ内移動の ScrollToPlugin は **autoKill: false**(表示倍率が 100% でない時に端数で誤作動して途中停止していた)。ホイール・タッチ・キー操作で自前で kill する。
- Testimonials の並びは `testimonialColumns`(about.ts): 中嶋 | 細谷+吉川(短いので縦に積む) | 加澤。
- Testimonials カード: 角丸は `rounded-media`(6px)、余白 16px、本文 `text-meta`・人物は小さく薄く(言葉を目立たせる)。
- **サイドバーのホバー**: 各サムネイルに `[data-thumb-hover]` 層(現在項目と同じ `bg-tint-strong-*` + `bg-ink/75`)。PortfolioMotion がホバーで層を opacity 1、文字を白、ラベルを下から持ち上げる(0.6s expo.out)。閉じている時はさらに項目を広げてラベルを出す。現在項目には層を出さない。reduced-motion は CSS :hover で同じ見た目。
- 閉じたサイドバーでも **現在の項目はラベルを常に表示**(10px)。
- **Testimonials は枠のない帯をやめ、通常の 16:9 スライド**(`SlideFrame tone="about"`)に戻した。カードは `bg-paper/10`・幅 480px・写真と名前は不透明度 100%。
- `lib/marquee.ts`: 親に `[data-marquee-interactive]` があると、押したまま左右ドラッグで流れる位置を動かせる(ドラッグ中だけ停止。ホバーでは止めない=ユーザー指定。キーボードのフォーカス時は停止)(ループの継ぎ目は回り込む。タッチは `touch-pan-y` で縦スクロールを妨げない)。reduced-motion では流さず横スクロール可能。
- 作品ごとの推薦文は、ユーザーが各作品の後に置く予定(未実装)。
- About 2枚目は **Experience + Education**(左 Experience 4件 / 右 Experience 3件 + Education)。3枚目は **Awards + Language & Certifications** の2列で、証明書・スコア画像を大きく(縦長 176px・横長 120px、スライド幅 64rem 以上で 240/160px)。`CredentialCard` は `imageClass` で画像枠の高さを指定。
- 受賞・資格のカードはクリックで **`ImageLightbox`(`<dialog>` の showModal)** に拡大表示。別ページ(PDF)には飛ばない。閉じるボタン / 背景クリック / Esc で閉じ、開閉は expo.out。フォーカスは閉じると元のカードに戻る。Awards の PDF リンクは削除。
- サイドバーのホバー: **現在の項目には何もしない**。開いている時は色の層と白文字だけで **文字のアニメーションはなし**(ラベルの持ち上げは閉じている時だけ)。
- サイドバー(開)のスクロールは **最後の項目 Contact の下(上余白と同じ 26px)で止める**。現在項目を揃え線へ寄せるのは下に空白ができない範囲だけで、末尾近くの項目はスクロールの限界で止まる(ユーザー指定)。
- 現在項目の切り替えアニメーションは **Flip をやめ、各サムネイルの寸法(width/height)とサイドバーのスクロール位置を同じ 1.15s expo.out で同時にトゥイーン**。transform で位置を動かすと、上の項目の高さ変化による押し下げと二重になって重なっていたため。位置は流れに任せる。終了時に寸法の inline を消す。
- **閉じたサイドバーは縦をちょうど埋める**: サイドバーを縦いっぱいにし、Workspace の measure() が (高さ − 上下余白 − 隙間) を「現在の項目 = 3 : 他 = 1」で割って `--thumb-h` / `--thumb-current-h` に出す(リサイズ・開閉で再計算、最小 24px)。ホバーで広げるのはラベルが入らない時だけ(min-height: max(64px, --thumb-h))。
- サイドバーのラベルは **単語の途中で改行しない**(`overflow-wrap: normal; word-break: keep-all`)。開いた状態の作品(入れ子)ラベルは `text-meta`(16px)で正式名でも1行。閉じた状態は左右余白 6px(ホバー中も同じ。現在項目と揃える)。「Graduation」など幅 47px に入らない長い単語は数 px 切れる(ユーザー了承済み)。
- **サイドバーの既定は閉じた状態**(`data-sidebar="closed"`)。localStorage が 'open' の人だけ開いて復元。
- 現在項目の切り替え: 開閉どちらでも **全項目同時**(1.15s expo.out)。時間差を付ける案は試したが不採用(ユーザー判断)。開閉ボタンの帯は下に 12px 空け、サイドバーはその下から(揃え線 ≒ 149px)。ボタンの縦線(22/13px)も開閉時に expo.out で動く。
- **Lenis 導入**(PortfolioMotion。`lerp: 0.09`、GSAP ticker で raf)。ホイールにもトラックパッドのような慣性。reduced-motion では使わない。ページ内リンク・資料型スライドの「→」は `window.portfolioScrollTo`(= `lenis.scrollTo`、1.15s expo.out)。**揃え線は CSS の scroll-margin-top を Lenis が考慮するので offset を付けない**(付けると二重になる)。GSAP ScrollToPlugin は撤去。サイドバーは `data-lenis-prevent`、画像拡大中は `lenis.stop()`。
- **サイドバーの現在項目の判定は画面の中央**(スライドの上端が中央より上に来たら切り替え。ユーザー指定)。クリック時は即時切り替えのまま。着地点(揃え線)は変えていない。

## Claude 更新(Figma 427-350 反映)
- About 1枚目: 自己紹介を旧サイトの PHILOSOPHY(JA)に差し替え、文章ブロックを縦中央に。
- About 2枚目(`AboutExperienceSlide`)に資格・受賞を統合: 左 = Education / Language & Certifications & Awards(Native 日本語・Business 英語 + 画像4枚 `CredentialCard` を枠比率どおりの grid、クリックで拡大) / 右 = Experience(FumiStudio・SoftBank・VoiceCast・Awesome Ars)/ Workshop & short-term intern(IBM・CyberAgent・GDI)。`AboutCredentialsSlide` と `CredentialRow` は削除。VoiceCast の「PV +108%」はデザインから消えたので削除。
- Testimonials: 見出しは白地に出し、カードは角丸の箱(About と同じ黒+緑グラデ)の中で流す。
- ピタとび(`SelectedWork`): ロゴ(1182:451 で切り抜き)→ `KeywordBand`(UCLA / SNS / Rebranding、200px、黒 → `--color-work-pitatobi-deep`)→ `ProjectIntroSlide`(資料型 1280×832、タイトル・Client/Year/Role・Introduction のみ)→ Origin。サイドバーの #pitatobi はロゴの上端に着地。Introduction の文章は Figma の修正版に更新。
- Figma の取り込み(html-to-design)では color-mix のグラデが落ちて黒になっていたため、About の緑グラデはそのまま残している(ユーザーに確認中)。
- **ピタとびの章スライド 10 枚**(Figma 154-1627 / 172-3 / 193-35 / 178-52 / 193-3 / 283-7 / 193-260 / 316-415 / 193-293 / 307-271)を Origin の後に追加。`components/sections/pitatobi/*Slide.astro`(各スライド)+ `PitatobiChapters.astro`(並び)。共通枠は `layout/ChapterSlide.astro`(進捗バー + 章ナビ + 「→」。arrow='lg'|'md'|'none')。座標は 1280×832 のキャンバスそのまま。画像は `public/works/pitatobi-story/`(表示サイズの約2倍に縮小した webp と SVG)。
- 章ナビは Figma で順番やラベルが揺れていた(TheUIUX が2回、Results/Improvement の入れ替わり)ので、`pitatobiChapters` の正規の並びにし、各スライドの章だけを強調。デザインの「01/11」ページ番号は、番号はサイドバーだけ(ユーザー指定)なので出していない。キャラクター2枚はデザインどおり「→」なし。
- 追加トークン: `--color-pitatobi-blue`(#00AFFE)/ `--text-stat`(180px)/ `--text-tiny`(11px)/ `--tracking-slide`(-0.05em)。
- **ピタとびの章スライドを型で統一**(ユーザー指定「整えて」): `layout/ChapterSlide.astro` は左上に章ラベル、`layout='split'` = 左ビジュアル(x40〜616、上端 y120)/ 右文章(x672〜1240、見出し y120)、`layout='full'` = 全幅。文字の階層とカードは `src/lib/slideType.ts`(見出し 36 / リード 20 / 本文 16 / 注釈 14 / キャプション 12、白カード rounded-card)。**進捗バー・章ナビ・「→」はスライドから撤去**(ユーザー指定)。Origin も `pitatobi/OriginSlide.astro` で同じ型に(ホームでは StorySlide を使わない。/works/pitatobi は従来どおり)。文言は原文のまま。成果スライドの見出し「成果」のみ追加。CMS の左は本文にある計測の流れ(入口 → 流入 → 診断 → LINE登録、GA4/Clarity/GTM/UTM)の図。
- **章の一覧はサイドバー**: `data/home.ts` の pitatobi に `chapters`(Introduction / Origin / Strategy&ICP / BrandSystem / TheUIUX / Results / Improvement。ページ順、TheBETA はスライドが無いので除外)。`ui/ChapterList.astro` は作品のサムネイルと一緒に `data-thumb-group` で包み、**サムネイルが current(大きく黒い)の時だけ、その右下に白文字・右寄せで重ねる**(線なし。ユーザー指定。開いている時・md 以上のみ)。`Workspace` が画面中央より上の最後の章に `aria-current="step"`。章リンクのクリックは親作品も即座に current に。章の id は各章の最初の SlideCanvas(pitatobi-intro / -origin / -strategy / -brand / -uiux / -results / -improvement)。
- 章の一覧を持つ作品(ピタとび)は、current の時に **サイドバーの下まで伸びる**(`--thumb-fill-h` = サイドバーの高さ − 上下 26px、Workspace の measure で計算)。章の一覧は右側に **space-between** で上下いっぱいに並べる。
- **成果の数字は `StatBand`**(KeywordBand と同じ枠なしの帯。大きな打ち抜き文字で流し、各数字の前に小さな見出し、帯の下に期間・母数の注記。読み上げ用に sr-only の一覧)。成果スライドの直後に置き、スライド側は見出し「成果」とビジュアルだけ。
- 閉じたサイドバーでも章が分かるよう、current の作品サムネイルの右側に **章の数だけ点**を縦に並べる(すべて 5px。今の章だけ不透明度 100%、他は 55%)。章名は sr-only と title(ホバーで表示)に残す。点もそのまま章リンク。
- **資料型スライドは 16:9(1280×720)**(`SlideCanvas`。ページ内のほかのスライドと同じ比率に。ユーザー指定)。章スライドは章ラベル y40、見出し・ビジュアル上端 y96、ビジュアル高さ 560(〜y656)。概要(ProjectIntroSlide)は縦中央。旧 /works/pitatobi は別の仕組み(SlideLayout の 1280×832)のまま。
- **Think Logically の帯は About(プロフィール)と Experience の間**に移動(ユーザー指定)。
- **表紙(IntroSlide)も 1280×720 の SlideCanvas に組み、丸ごと拡大縮小**(固定 rem のままだと画面幅で構図が崩れていたため)。座標は Figma 420-199(幅 1142)を 1280 に拡大: 単語 220px(top -49 / 503)、アバター 118px、Hi・I'm 48px、Fumi 96px、グループ left 377 / top 271。サイドバー開閉・md の出し分けは撤去。

## Claude 更新(Figma 428-2313 反映: 黒=説明 / 白=見せ場 の交互)
- ピタとびの並び: `WorkTitle`(白地の作品名 + Client/Year/Role)→ ロゴ → KeywordBand → **`PitatobiBeforeAfter`** → 概要(Introduction だけ)→ Origin → 強み(文字だけ、canvas 高 584)→ **`DeckViewer`(白地)** → サービス名/ロゴ/キャラクター×2/カラーリング → **`ColorBand`** → 本番WEB(文字だけ、canvas 高 407)→ **`WebShowcase`** → CMS → **`ResultsShowcase`(白地の「成果」+ 画面 + StatBand、id=pitatobi-results)** → 課題点 → **`WorkTestimonial`(中嶋さん。About の testimonials から名前で引く)**。
- `SlideCanvas` に `height`(既定 720)。`ChapterSlide` に `layout='text'`(右の文章だけ)。
- **Before/After** は studio-fumi の before-after-showcase / pitatobi-case / case-study-parts を Astro に移植(`sections/BeforeAfter.astro` + `ui/case/*`)。切り替えは GSAP expo.out の横スライド + 高さ。切り替えボタンはヘッダー下に sticky。画像は `public/works/pitatobi-case/`。
- **DeckViewer**(`ui/DeckViewer.astro`): ページ画像の切り替え(左右クリック・ボタン・←→キー・ループ・先読み)。`theme='light'|'dark'`。ページは `pitatobiDeck`(studio-fumi の deck 21枚)。白地と AFTER ボードの2か所で使用。
- 色トークン追加: `--color-pitatobi-glow`(#1184ff)/ `--color-board-from`(#1a1a1a)。
- 章スライドのビジュアルと文章は **それぞれ縦中央**(上下 80px の間。Figma 428-2313 でユーザーが中央揃えにしていた)。`layout='full'`(課題点)だけ上から y=96。

## Codex 更新（2026-10-05: ReiKikkawa Graduation Work）
- 参照: https://www.fumi-studio.com/works/1/jp。準備中だった卒業制作紹介を実装。既存の黒い説明スライド・画面ギャラリー・推薦文の構成に合わせた。
- `src/data/reikikkawa.ts` にコアバリュー・プロトタイプ・開発・テキストアニメーション・モバイルの文章と画像を定義。`sections/reikikkawa/ReikikkawaChapters.astro` が章を組み立てる。
- PNG 7点は参照ページの元画像を `public/works/reikikkawa/` に保存。写真の色味を維持するためPNGのまま。Vimeo 2点は `ui/VimeoVideo.astro` で手動再生。
- `projects.ts` に作品情報と公開サイトリンクを追加。`home.ts` に6章のナビ。吉川伶さんの既存の推薦文を作品末尾に表示。
- ビルド、デスクトップ・390px幅の横はみ出し、章リンク先、画像・Vimeoプレイヤーの読み込み、コンソールエラーなしを確認。

## Codex 更新（2026-10-05: StarWeaving）
- 参照: https://www.fumi-studio.com/works/4/jp。準備中だったStarWeaving（星紡ぎ）を既存の作品紹介と同じ構成で追加。
- `data/starweaving.ts` にTeam & Role / Core Value / Timeline / Ideas / Development / Installation / Exhibition / Color Grading / Recognitionを定義。`sections/starweaving/StarWeavingChapters.astro` が章とギャラリーを表示。
- PNG 7点を `public/works/starweaving/` に保存。Vimeo 2点は既存の `VimeoVideo` で手動再生。学科紹介パンフレットへのリンクも掲載。
- `Project` の client を任意にし、team を追加。StarWeavingには参照元にないクライアントを補わず、5人チーム・1か月の制作情報を表示。
- StarWeavingのタイトルのみモバイル36px / md以上80pxへ調整。
- ビルド成功。章リンク先、本文のキャンバス内収まり、画像alt・動画title、Vimeoプレイヤー読み込み、390px幅でタイトル切れ・横はみ出しなし、コンソールエラーなしを確認。

## Codex 更新（2026-10-05: 重ねた作品デッキ）
- ReiKikkawa / StarWeavingを `sections/StackedWorkDeck.astro`（native details / summary）で折りたたむ構成へ変更。初期状態は閉じ、表紙の後ろに2枚を静的に重ねる。クリック・Enterで開閉、末尾のボタンでも閉じられる。新規のアニメーションは追加していない。
- 章リンク・直接の章URLで該当デッキを自動展開。閉じた時はVimeo iframeのsrcを外して再生を停止、開いた時に復元。
- Workspaceの章判定は、閉じて非表示になっている要素を除外。
- ビルド成功。デスクトップ・390pxでの開閉、キーボード、末尾から閉じた時のフォーカス復帰、章リンクと直接URL、展開後のSlideCanvasの縮尺、横はみ出しなし、コンソールエラーなしを確認。

## 最新引き継ぎ（2026-10-06）
今回の作品追加・重ねたデッキ・ピタとび画像差し替えの現状は `docs/HANDOFF_CLAUDE.md` に集約。Claudeはこのファイルも必ず読むこと。
- web-home-lg.webp: ユーザー添付の最新ホーム画像、1255×5892。
- web-blog-lg.webp: ユーザー添付の留学体験記一覧、1143×1891。ファイル名は指定どおり維持。
- 画像参照の寸法とaltを更新。画像単体の配信確認・npm run build成功。

## Claude 更新(2026-10-07)
- 成果の数字(`StatBand`): 1行に1つ。左に見出し・注記(母数 basis / 期間 period)、右に `text-stat`(180px)の数字。`from` があれば「0 → 87」で変化前を薄く、矢印は SVG。帯幅 48rem 未満は縦積み・`text-title`。
- 閉じたサイドバーのホバー時の左右余白 4px を廃止し、現在項目と同じ 6px に統一。
- ReiKikkawa / StarWeaving の成果はデッキ(`StackedWorkDeck`)の外に出し、閉じていても見せる(ReiKikkawa = 吉川さんの推薦文のみ。CSSWinner の画像はデッキの中の最後 / StarWeaving = Recognition のパンフレット掲載。`StarWeavingChapters part="outcome"`。画像と文章を1枚の split スライドにまとめる = data の `imageInSlide`)。StarWeaving の推薦文は無い。
- 両作品の作品名は PP Migra(font-serif)。表紙に重ねる作品名は `text-greeting-lg`(64px)、モバイル/開いた後の WorkTitle は `text-subtitle md:text-title`。
- ReiKikkawa / StarWeaving の文字だけの章スライドは高さ 440(`chapterTextHeight`、旧 584)+ `ChapterSlide compact`(上下 48px)。最長の文章で 325/344px に収まることを確認済み。ピタとびの Strategy(584)は変更なし。
- 閉じたデッキの表紙はほかのスライドと同じ幅(横の余白 0)、傾けない(ユーザー指定)。後ろの紙は scale 0.96 / 0.92・ずらし(+10,-10 / -12,-20)・傾き(1.5° / -2.5°)で上にのぞかせる(小さくしてあるので角は表紙の幅の内側。ユーザー指定)。束の上余白 32px・下余白 0(表紙と推薦文は関連があるので詰める = 14px)。作品と作品の間は mt 48px(+ main の gap 14px)。
- デッキを開くモーションは「束が広がる」(ユーザー指定「もう少しつながって」): 中の先頭4枚が、少し傾いて縮んだ状態で表紙の上端(表紙の真下に隠れた位置)から本来の位置へ順に下りてくる(1.3s expo.out、0.07s ずらし)。開く間は表紙が最前面(z 10)、表紙に近いスライドほど手前。のぞいていた紙は表紙の後ろへ戻って消える。終了時は付けた inline の値だけ消す(`dealtProps`。'all' にすると SlideCanvas の aspect-ratio まで消えて高さ 0 になる)。
- 閉じたデッキにホバー(マウス環境のみ)/キーボードのフォーカスで「開くそぶり」: 後ろの紙が少し持ち上がり扇状に開く(傾き -4° / 2.5°)、表紙が 4px 浮く。0.6s expo.out。reduced-motion では動かない。開くモーションはそぶりの位置からそのまま続く。
- ReiKikkawa / StarWeaving の Client / Year / Role は表紙(`CoverCaption`)に入れた。モバイルは表紙の上の WorkTitle に。開いた中の WorkTitle は削除。ReiKikkawa の「Visit Site」は表紙の右下: summary(ボタン)の中にリンクは置けず、閉じた details の中身は描画されないので、details の外(`.work-deck-wrap` の中)に表紙と同じ位置・大きさの枠を重ねて置く。表紙の上余白は `--deck-top`(wrap に置き、枠と共有)。モバイルは開いた中の先頭に Visit Site。
- デッキの後ろの紙は画像をやめ、作品のテーマカラーのグラデーション(bg-ink + bg-(image:--work-tint)。推薦文の箱と同じ)。previews prop は削除。表紙の動画は scale-[1.02](縁に下地の黒が 1px 透けて線に見えたため)。
- 後ろの紙は半透明をやめて黒地(不透明)+ グラデーション(ユーザー指定)。
- Contact スライドも黒 + Contact の色(slide-contact)のグラデーション(SlideFrame tone="contact"。ユーザー指定)。
