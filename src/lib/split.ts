import gsap from 'gsap';
import type { SplitText } from 'gsap/SplitText';

/**
 * SplitText の分割設定(行ごとに切り抜く mask: 'lines')。
 * 日本語はスペースが無く、そのままだと文全体が1つの「単語」になって行に分かれない。
 * 和文を含む文だけ、和文の文字の前後に幅ゼロの区切りを入れ、それで単語を分ける(区切り自体は出さない)。
 * 英語だけの文は、いつも通りスペースで単語を分ける(幅ゼロの区切りだけで分けると、英文全体が1語になって一度に出てしまう)。
 */
const CJK = '\\u3000-\\u30ff\\u3400-\\u9fff\\uff00-\\uffef';
const ZWSP = '\u200B'; // 幅ゼロのスペース(1文字)
const hasCJK = new RegExp(`[${CJK}]`);
const prepareText = (text: string) =>
  text
    .replace(new RegExp(`([${CJK}])`, 'g'), `$1${ZWSP}`)
    .replace(new RegExp(`([^${ZWSP}${CJK}])(?=[${CJK}])`, 'g'), `$1${ZWSP}`);

export function splitVars(el: Element, type: 'lines' | 'lines,chars') {
  if (!hasCJK.test(el.textContent ?? '')) return { type, mask: 'lines' as const };
  return { type, mask: 'lines' as const, prepareText, wordDelimiter: { delimiter: new RegExp(ZWSP), replaceWith: '' } };
}

/**
 * 出し終えた分割を、元に戻さずそのまま残す。
 * 戻すと分割中と本来の文章とで折り返しや字詰めが少し違い、出た直後に改行が変わったり文字が動いたりするため。
 * 行の切り抜きだけ外して文字の下端が切れないようにし、画面の幅が変わった時だけ元に戻して折り返しをブラウザに任せる。
 */
const settled = new Set<SplitText>();
let watching = false;
export function settle(split: SplitText) {
  gsap.set(split.masks, { overflow: 'visible' });
  settled.add(split);
  if (watching) return;
  watching = true;
  let width = innerWidth;
  addEventListener('resize', () => {
    if (innerWidth === width) return;
    width = innerWidth;
    settled.forEach((s) => s.revert());
    settled.clear();
  });
}
