import { gsap } from 'gsap';

/**
 * [data-marquee] の中身を無限ループで流す。
 * 中身は 2 回並べてあるので、半分ずらしたら先頭に戻す。
 * 親に [data-marquee-interactive] があれば、押したまま左右にドラッグして動かせる(ドラッグ中は止まる)。
 * ホバーでは止めない(ユーザー指定)。キーボードでフォーカスした時だけ止める(アクセシビリティ)。
 */
export function initMarquees() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.querySelectorAll<HTMLElement>('[data-marquee]').forEach((track) => {
    const reverse = track.dataset.marquee === 'reverse';
    const duration = Number(track.dataset.duration ?? 40);
    const tween = gsap.fromTo(
      track,
      { xPercent: reverse ? -50 : 0 },
      { xPercent: reverse ? 0 : -50, duration, ease: 'none', repeat: -1 },
    );
    const area = track.closest<HTMLElement>('[data-marquee-interactive]');
    if (area) makeInteractive(area, track, tween, reverse);
  });
}

function makeInteractive(area: HTMLElement, track: HTMLElement, tween: gsap.core.Tween, reverse: boolean) {
  const wrap = gsap.utils.wrap(0, 1);
  let focused = false;
  let drag: { x: number; progress: number; id: number } | undefined;

  const update = () => {
    if (focused || drag) tween.pause();
    else tween.play();
  };

  area.addEventListener('focusin', () => {
    focused = true;
    update();
  });
  area.addEventListener('focusout', () => {
    focused = false;
    update();
  });

  // 押したまま左右に動かすと、指の動きに合わせて流れる位置を動かす(ループの継ぎ目はまたいで回り込む)
  area.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    drag = { x: e.clientX, progress: tween.progress(), id: e.pointerId };
    area.setPointerCapture(e.pointerId);
    area.dataset.dragging = '';
    update();
  });
  area.addEventListener('pointermove', (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    const half = track.scrollWidth / 2;
    const delta = (e.clientX - drag.x) / half;
    tween.progress(wrap(drag.progress + (reverse ? delta : -delta)));
  });
  const end = (e: PointerEvent) => {
    if (!drag || e.pointerId !== drag.id) return;
    drag = undefined;
    delete area.dataset.dragging;
    update();
  };
  area.addEventListener('pointerup', end);
  area.addEventListener('pointercancel', end);
}
