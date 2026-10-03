import { gsap } from 'gsap';

/**
 * [data-marquee] の中身を無限ループで流す。
 * 中身は Marquee.astro 側で 2 回並べてあるので、半分ずらしたら先頭に戻す。
 */
export function initMarquees() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.querySelectorAll<HTMLElement>('[data-marquee]').forEach((track) => {
    const reverse = track.dataset.marquee === 'reverse';
    const duration = Number(track.dataset.duration ?? 40);
    gsap.fromTo(
      track,
      { xPercent: reverse ? -50 : 0 },
      { xPercent: reverse ? 0 : -50, duration, ease: 'none', repeat: -1 },
    );
  });
}
