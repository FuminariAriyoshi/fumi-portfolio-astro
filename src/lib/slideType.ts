/**
 * 作品の章スライド(1280×832 の資料型)の文字・カードの型。全スライドでこれを使い、階層をそろえる。
 * 章ラベル(左上) / 見出し 36px / リード 20px / 本文 16px / 注釈 14px / キャプション 12px
 */
export const slideType = {
  /** スマホでは 24px(章スライドは縮めずに表示するため) */
  title: 'text-nav font-semibold leading-[1.35] tracking-[-0.02em] md:text-subtitle',
  lead: 'text-body leading-body',
  body: 'text-meta leading-body',
  note: 'text-small leading-body opacity-60',
  caption: 'text-kicker leading-body opacity-50',
  /** コラム(小見出し + 本文)。枠には透明度を付けず、タイトル 100%・本文 60% に分ける(枠に付けると子の透明度が上がらない) */
  column: 'text-small leading-body',
  columnTitle: 'opacity-100',
  columnBody: 'opacity-60',
  /** ビジュアルを包む白いカード */
  card: 'overflow-clip rounded-card bg-paper text-ink',
};

/** 文字だけの章スライド(ReiKikkawa / StarWeaving)のキャンバスの高さ。ChapterSlide の compact と組み合わせる */
export const chapterTextHeight = 440;
