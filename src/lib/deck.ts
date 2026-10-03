import { gsap } from 'gsap';

const DURATION = 0.9;
const SWIPE_THRESHOLD = 40;

/**
 * スライド送りの制御。1 回の入力で 1 枚だけ進み、
 * 遷移中の入力は捨てる(PDF のページ送りに近い挙動)。
 */
export function initDeck() {
  const deck = document.querySelector<HTMLElement>('[data-deck]');
  if (!deck) return;

  const slides = Array.from(deck.querySelectorAll<HTMLElement>('[data-slide]'));
  if (!slides.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // #2 のようなハッシュで指定ページから開ける(1 始まり)
  const fromHash = Number(location.hash.slice(1)) - 1;
  let current = fromHash > 0 && fromHash < slides.length ? fromHash : 0;
  let animating = false;

  const setActive = (index: number) => {
    slides.forEach((slide, i) => {
      const active = i === index;
      slide.inert = !active;
      slide.setAttribute('aria-hidden', String(!active));
    });
  };

  const reveal = (slide: HTMLElement) => {
    const items = slide.querySelectorAll('[data-reveal]');
    if (!items.length || reduceMotion) return;
    gsap.fromTo(
      items,
      { autoAlpha: 0, y: 24 },
      { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.08, delay: 0.25 },
    );
  };

  gsap.set(slides, { yPercent: (i) => (i === current ? 0 : i < current ? -100 : 100) });
  setActive(current);
  reveal(slides[current]);

  const goTo = (next: number) => {
    if (animating || next === current || next < 0 || next >= slides.length) return;

    const from = slides[current];
    const to = slides[next];
    const dir = next > current ? 1 : -1;
    current = next;
    setActive(next);
    history.replaceState(null, '', next === 0 ? location.pathname : `#${next + 1}`);

    if (reduceMotion) {
      gsap.set(from, { yPercent: -100 * dir });
      gsap.set(to, { yPercent: 0 });
      return;
    }

    animating = true;
    gsap
      .timeline({ defaults: { duration: DURATION, ease: 'power3.inOut' }, onComplete: () => { animating = false; } })
      .to(from, { yPercent: -100 * dir }, 0)
      .fromTo(to, { yPercent: 100 * dir }, { yPercent: 0 }, 0);
    reveal(to);
  };

  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  // トラックパッドの慣性スクロールで 2 枚送られないよう、ホイールが静まるまでロックする
  let wheelLocked = false;
  let wheelTimer: number | undefined;
  window.addEventListener(
    'wheel',
    (e) => {
      window.clearTimeout(wheelTimer);
      wheelTimer = window.setTimeout(() => { wheelLocked = false; }, 200);
      if (wheelLocked) return;
      if (Math.abs(e.deltaY) < 10 && Math.abs(e.deltaX) < 10) return;
      wheelLocked = true;
      const delta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (delta > 0) next();
      else prev();
    },
    { passive: true },
  );

  window.addEventListener('keydown', (e) => {
    if (['ArrowDown', 'ArrowRight', 'PageDown', ' '].includes(e.key)) {
      e.preventDefault();
      next();
    } else if (['ArrowUp', 'ArrowLeft', 'PageUp'].includes(e.key)) {
      e.preventDefault();
      prev();
    }
  });

  let touchY = 0;
  window.addEventListener('touchstart', (e) => { touchY = e.touches[0].clientY; }, { passive: true });
  window.addEventListener(
    'touchend',
    (e) => {
      const dy = touchY - e.changedTouches[0].clientY;
      if (Math.abs(dy) < SWIPE_THRESHOLD) return;
      if (dy > 0) next();
      else prev();
    },
    { passive: true },
  );

  deck.querySelectorAll('[data-deck-next]').forEach((el) => el.addEventListener('click', next));
  deck.querySelectorAll('[data-deck-prev]').forEach((el) => el.addEventListener('click', prev));
}
