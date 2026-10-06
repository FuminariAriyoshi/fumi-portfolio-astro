# Claude 向け引き継ぎ — 2026-10-06

## 作業場所と現在の状態

- プロジェクト: `/Users/ariyoshifumisei/Downloads/03_Code/coding/fumiportfolio-astro`
- ローカル確認URL: http://localhost:4322/
- Astro + Tailwind v4。トップページ内に3作品の紹介を掲載。
- 今回の変更はローカルのみ。デプロイ・git pushはしていない。
- 多数の既存変更・未追跡ファイルがある。作業前に `git status` と関連ファイルを確認し、他の変更を上書きしないこと。
- 最初に `AGENTS.md` → このファイル → `docs/HANDOFF.md` を読む。`HANDOFF_OPUS.md` は2026-10-03の履歴で、最新状態はこのファイルとHANDOFF.md末尾を優先。

## ユーザー指定と実装済みの変更

### ピタとび

- 「一人一人にピッタリな留学」の青色指定を削除。`StrategySlide.astro`。
- Origin / BrandSystem等の章ラベルを、右半分の見出し・本文と同じブロックの先頭に移動。共通の `layout/ChapterSlide.astro` を変更。全幅レイアウトでも本文ブロック内に配置。
- 「*リッチメニューは制作していません。」をLINE画像・Lineラベルの下に移動。`ResultsShowcase.astro`。
- 診断画面を診断操作の動画へ変更。`WebShowcase.astro` と `ResultsShowcase.astro` で `ui/ScreenVideo.astro` を使用。
- WebShowcase右下はスマホメニュー操作動画へ変更。既存のBefore/Afterの診断動画は維持。
- ローカル素材の動画: `public/works/pitatobi-case/pitatobi-sp-diagnosis.mp4` / `pitatobi-sp-menu.mp4`。自動再生・ミュート・ループ。

### 2026-10-06の画像差し替え（最新）

ユーザーが添付したスクリーンショットをWebPへ変換し、同じファイル名で更新。

| 配信先 | 元画像 | 寸法 |
| --- | --- | --- |
| `/works/pitatobi-story/web-home-lg.webp` | Desktopの「ピタとび _ 海外への挑戦をもっと身近な選択肢に.png」 | 1255 × 5892 |
| `/works/pitatobi-story/web-blog-lg.webp` | Desktopの「留学体験記 _ ピタとび.png」 | 1143 × 1891 |

- 実ファイルは `public/works/pitatobi-story/` 配下。sharpでWebP quality 95に変換。
- `web-home-lg.webp` を使うWebShowcaseとResultsShowcaseのwidth/heightを更新。
- **web-blog-lg.webpという名前だが、現在の内容はブログではなく留学体験記の一覧**。ユーザーがこのURLへの差し替えを明示指定したため、名前は維持しaltを「留学体験記の一覧ページ」へ更新。
- WebShowcaseの配置・表示枠は維持。体験記一覧は元より縦長で、既存枠では上側をクロップ表示する。
- 上記2つの画像URLをブラウザで開き、配信と寸法を確認済み。

### ReiKikkawa Graduation Work

- 参照ページ: https://www.fumi-studio.com/works/1/jp
- 準備中表示を実際の作品紹介へ変更。概要・Core Value・Prototype・Development・Text Animation・Mobileと吉川伶さんの推薦文を掲載。
- `src/data/reikikkawa.ts` と `sections/reikikkawa/ReikikkawaChapters.astro`。
- PNG 7点: `public/works/reikikkawa/`。写真の色味を維持するためPNGのまま。
- Vimeo: `1188937366`（サイト操作）/ `1188936532`（テキストアニメーション）。
- 公開作品リンク: https://trimming.vercel.app/
- サイドバーの6章と各アンカーを追加。正式タイトルは `ReiKikkawa Graduation Work`。

### StarWeaving（星紡ぎ）

- 参照ページ: https://www.fumi-studio.com/works/4/jp
- 概要・Team & Role・Core Value・Timeline・Ideas・Development・Installation・Exhibition・Color Grading・Recognitionを掲載。
- `src/data/starweaving.ts` と `sections/starweaving/StarWeavingChapters.astro`。
- PNG 7点: `public/works/starweaving/`。
- Vimeo: `1188937811`（展示記録）/ `1188936045`（映像編集）。
- 2026年の学科紹介パンフレット掲載画像とリンクを追加。
- 5人チーム / 1か月、担当は Coding / Editing / Project Coordination。
- 参照にクライアントがないため、Projectのclientを任意にしteamを追加。WorkTitle・WorksSlideで空のClientを出さない。
- タイトルはモバイル36px、md以上80px。モバイルで切れないことを確認。

### 最新の作品表示: 重ねたデッキ

ユーザー指定: 「starweavingとReiKikkawa Graduation Workはスライドが重なってるようなデザインにして、押したら開いて見れる」

- 両作品を `sections/StackedWorkDeck.astro` で折りたたむ。
- native `details` / `summary`。初期は閉じた状態。表紙の後ろに2枚のプレビューを静的にずらし・傾けて重ねる。
- クリックまたはEnterで展開・折りたたみ。末尾にも閉じるボタン。末尾から閉じると作品先頭へ戻りsummaryへフォーカス復帰。
- 開くと既存の章スライド・画像・動画が縦に表示される。ピタとびは折りたたまない。
- サイドバーの章リンク、直接の章URLからは対象デッキを自動展開。
- 閉じるとVimeo iframeのsrcを外し、開くと復元。閉じたまま動画を再生しない。
- `Workspace.astro` の章判定は、閉じて非表示になった章を除外する。
- 新しい開閉アニメーションやhover効果は追加していない。

## 主な共通コンポーネント

- `SelectedWork.astro`: 作品を組み立て、2作品だけStackedWorkDeckへ渡す。
- `WorkTitle.astro`: 作品名・Client（任意）・Year・Role・Team（任意）。
- `ui/WorkGalleryImage.astro`: 1920×1080の掲載画像。
- `ui/VimeoVideo.astro`: ミュート・手動再生・lazy iframe。titleを付与。
- `ui/ProjectSiteLink.astro`: 外部サイト・資料リンク。表示テキストを任意指定可能。
- `data/projects.ts`: 3作品の実データ。
- `data/home.ts`: サイドバーと作品の章アンカー。

## 検証と作業ルール

- 最後の `npm run build` は2026-10-06の画像差し替え後に成功。
- デッキ実装時にデスクトップ・390pxで開閉、Enter、末尾の閉じる、フォーカス復帰、章リンク、直接URL、SlideCanvas縮尺、横はみ出しなし、コンソールエラーなしを確認。
- ReiKikkawa / StarWeaving追加時に画像alt、iframe title、本文のキャンバス内収まりとVimeoプレイヤー読み込みを確認。
- 画像差し替え後は画像単体の配信確認とビルドを実施。全インタラクションの再確認は行っていない。
- UIはcomponent単位。新規アニメーションはユーザー指定がある場合だけ。
- font-sizeはremと既存トークン。`:root` にfont-weightを設定しない。
- 変更後はビルドと必要な動作確認。
- デプロイ先はCloudflare Pages。imageServiceはpassthrough。Vercelアダプターを追加しない。
- デプロイ・pushは今回の依頼には含まれない。

## 次の作業

このセッションで明示された依頼は反映済み。次はユーザーの追加指定を待つ。
昔のHANDOFFの「Reikikkawa / StarWeavingは準備中」という記述は現在は該当しない。
