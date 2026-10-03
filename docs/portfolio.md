# ポートフォリオ設計メモ

新ポートフォリオ（Astro + Sanity）の構成・コピー・実データをまとめたもの。
Figma の構成案とセットで使う。**後から実装する用の手元資料。**

- Figma: `https://www.figma.com/design/W1PpRkPApSQ0xByTCwQjyx/Web` / Page 2
- 現行サイト: https://fumi-studio.com （Next.js / Prismic、`coding/FumiPortfolio`）
- 移行先: このリポジトリ（Astro + Sanity）

---

## 1. 前提

| 項目 | 決定 |
|---|---|
| ページ構成 | **Home / About / Work** の3ページ |
| 今回作るもの | **Home** |
| 主ターゲット | **新卒採用**（デザイナー職） |
| 副次的な用途 | 文面を差し替えてフリーランス版・海外版にも転用したい |
| 言語 | **EN / JP 切り替え**を実装する |
| 一人称 | **「僕」に統一**（現行は `FumiStudio is...`(We) と `As a freelance designer, I...`(I) が混在している） |

---

## 2. Figma 上の成果物（Page 2）

| フレーム | 座標 | 内容 |
|---|---|---|
| `Frame 128` | x2324 | 元のデザイン（ヒーローのみ実装済み、以下は空フレーム） |
| `Home 構成案 v1` | x4226 | ヘッダー〜フッター7セクションのワイヤー。About は案A |
| `About 案B` | x6028 y1438 | 大見出し + 3カラム（Profile / Stack / Career） |
| `About 案C` | x6028 y2560 | 左固定見出し + 右に積む（Voice 内包） |
| `About 案D` | x6028 y4160 | 左スティッキー画像 + 右に経歴/アワード/資格（ダミー） |
| `About 案E` | x6028 y6180 | **実データ版。現時点の本命** |

### Home のセクション構成

```
01 HEADER      80    FumiStudio / Works・About・Contact / EN・JP
02 HERO       900    I'm Fumi. + 既存カーブ（Vector 11）流用
03 INTRO      420    一段落（下記コピー）※既存 Frame 153 を転用
04 WORKS     1000    Selected Works + タイル6枚 + View all works →
05 ABOUT     1000    案A ベース（要約版）→ 詳細は About ページ
06 VOICE      520    証言カード 01〜03
07 CONTACT    420    Let's work together. + メール + SNS + フッター
```

---

## 3. 一段落コピー（INTRO）

サイトで最初に読まれる文章。役割は **3行で「何ができる人か」「なぜこの人か」を掴ませる**こと。
順番は 所属 → 領域 → 範囲 → 思考の型 → 人柄。

**JP**

> 武蔵野美術大学でデザインを学びながら、UI/UX・Web・ブランディングを実務でやっています。
> 課題の定義から画面、実装まで。論理で決めて、直感で作る。
> 京都の日本料理店に生まれ、毎日少しずつ良くしていく仕事を見て育ちました。

**EN**（JPより1段短く刈る）

> Designing UI/UX, web and brand while studying at Musashino Art University.
> From defining the problem to the interface and the build. Think logically, build intuitively.
> Born in Kyoto to parents who run a Japanese restaurant — I grew up watching work that gets a little better every day.

`Think logically. Build intuitively.` は現行サイトの PHILOSOPHY から。抽象的すぎず態度が具体的に分かるので、そのまま軸にする。

### 用途別の差し替え

| 用途 | 冒頭で言うこと |
|---|---|
| 新卒採用 | 所属（武蔵美）→ 領域 → 実装まで |
| フリーランス | 何を解決できるか → 提供範囲 → 実績 |
| 海外 | Education（LASALLE）→ Language → 領域 |

---

## 4. About セクションの構成方針

### 件数ではなく「価値の重み」で組む

現行データは **Experience 7件 / Awards 2件 / Certifications 2件** と量が不均等。
Career / Awards / Certifications を同じ重みの見出しで3等分すると、Awards と資格がスカスカに見える。

| ブロック | 扱い | 理由 |
|---|---|---|
| **Awards** | 最上部・大きく2件だけ | Awwwards と CSSWinner は新卒で持っている人がほぼいない。単価が高いのでリストに埋めない |
| **Experience** | 本体リスト7件 | IBM / SoftBank / CyberAgent は社名で伝わる |
| **VoiceCast の行** | 1行だけ地を敷く | **PV +108%** が全体で唯一の定量的成果。等間隔だと埋もれる |
| **Education** | 通常リスト2件 | |
| **Language + Certifications** | 統合して1ブロック | TOEFL/TOEIC は語学の証明。独立見出しにすると2件で間が持たない |
| **Interests** | チップで最後に流す | 軽い情報なのでリストにしない |

### レイアウト

左に **position: sticky** のポートレート（500×660）、右カラム（幅706）を読み切るまで固定。
右カラムに上記ブロックを縦に積む。

---

## 5. 実データ

現行 fumi-studio.com/about より。

### AWARDS
```
Awwwards       Honorable Mention
CSSWinner      Star            2026.02
```

### EXPERIENCE
```
2026.08            IBM Japan Designer Intern 5days      Designer
2026.02 – PRESENT  FumiStudio                           Freelance Designer
2026.04 – 2026.06  SoftBank Robotics Intern             UIUX Designer
2026.03            CyberAgent 2Days Intern UIDA         UI Design
2026.03            Global Design Initiative in Taipei    Design Workshop
2025.06 – 2027.03  VoiceCast                            homepage 再設計 — PV +108%
2024.08 – PRESENT  Awesome Ars Academia                 Teaching Assistant
```

### EDUCATION
```
2026.08 – 2027.07  LASALLE College of the Arts (Singapore)  Design Communication Exchange Program
2024.04 – PRESENT  武蔵野美術大学                            造形学部 デザイン情報学科
```

### LANGUAGE & CERTIFICATIONS
```
Japanese  —  Native
English   —  TOEFL iBT 86 (2025.01) / TOEIC 935 (2026.07)
```

### INTERESTS
```
UI/UX Design · Web Dev · Branding · Design Thinking · UX5Layers
```

### PHILOSOPHY（現行サイト原文）
> Think logically. Build intuitively. Based on logical thinking, I aim to be able to output intuitively.
> Once the problem is identified, the brand identity is determined, and the concept is decided,
> I believe that it is very important to create intuitively to build that aesthetic.
> Users touch intuitively and feel the brand, so I value their senses very much.

### INTRODUCTION（現行サイト原文）
> Born and raised in Kyoto, I grew up with parents who run their own Japanese restaurant.
> From UI/UX design to 3D projects in tools like Cinema 4D, I don't limit myself.
> I use any medium necessary to deliver the best design.

---

## 6. Sanity のデータ設計

**About を「ブロックの配列」にする。** 各ブロックに `type` と `order` を持たせれば、
同じデータのまま順序違いで3用途に転用できる。コードを触らずに切り替えられるのが狙い。

```
block.type = 'awards' | 'experience' | 'education' | 'langCert' | 'interests' | 'stack'
block.order = number
```

```
新卒採用      Intro → Awards → Experience → Education → Lang/Cert → Interests
海外          Intro(EN) → Education → Language → Awards → Experience
フリーランス   Intro → Awards → Works実績 → Stack → Contact
```

EN/JP も Sanity の i18n に乗せて同じ仕組みで切り替える。

---

## 7. 技術ロゴ（Stack セクション用）

公式ソースから取得済み。`~/Desktop/tech-logos/`（README.md に取得元一覧あり）

React / Next.js / Vite / Astro / Tailwind CSS / shadcn-ui / Supabase / Three.js /
Node.js / GitHub / Framer / Webflow / p5.js / TouchDesigner

**色の改変は7件でNG**（Astro, Supabase, Node.js, GitHub, Next.js, Framer, Webflow）。
統一感を出すなら公式配布のモノクロ版に揃える。自由に色を変えられるのは shadcn/ui のみ（`currentColor`）。
Home に14個は多いので6〜8個に絞り、全部は About ページで見せる。

---

## 8. 要修正・未決事項

### 修正が必要

- [ ] **`Swiming` → `Swimming`**（Figma の Frame 128 内、2箇所ともスペルミス）
- [ ] **サイドナビ3つ目を `About` → `Contact` に**（現状 About が重複）
- [ ] **見出しの重複解消** — 「Swimming In Digital World」が2箇所。Works 側を `Selected Works` にして、この文言は About の見出しに回す
- [ ] **人称の統一**（We / I が混在）

### 未決

- [ ] **ポートレート画像**をどうするか（顔写真 / 作業風景 / 画像なし）。案E は左500×660前提
- [ ] **案E は About ページ本体か、Home の About セクションか**
      → 実データで縦1900pxになったので Home には重い。
      Home は「Intro + Awards 2件 + Stack + More about me →」に絞り、案E は About ページに回すのが素直
- [ ] Home の Works と Work ページの出し分け（Home はハイライト6件のみ、一覧は Work ページ）
- [ ] Testimonial を Home に置くか（現状 Frame 128 に「01」が1枚だけある）

### 注意

- Figma の構成案は **PP Migra / PP Telegraf が環境に未インストール**のため、
  Instrument Serif / Archivo Bold で代替表示している。実装時は元のフォントに戻す
- 現行サイトの `components/ui/` にある `pricing-1` `hero-premium` `design-philosophy` などは
  **未使用コンポーネント**。ここのコピー（`drives business outcomes` 等）は公開されていないので参照しない

---

## 9. デザイントークン（Frame 128 実測）

```
色
  #000000              テキスト主
  #1C2325              ヒーロー "Fumi."（rgb 0.111, 0.138, 0.144）
  #A1A1A1              補足テキスト
  #C4C4C4              罫線
  #FFFFFF              背景

Paint Styles（登録済み）
  white/30% · white/50% · white/100%
  Black/30% · Black/50% · Black/100% · Black/trans/half

タイポ
  PP Migra Regular     見出し・ナビ（24 / 32 / 64）
  PP Telegraf Bold     ヒーロー 128 / letter-spacing -1%
  Inter Medium         セクション見出し 64 / letter-spacing -9%
  Inter Regular        キャプション 10–13
  Noto Sans JP Regular 日本語本文 13 / line-height 21.125
```
