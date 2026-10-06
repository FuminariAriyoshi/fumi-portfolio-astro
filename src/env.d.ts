/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_PRISMIC_ENVIRONMENT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  /** PortfolioMotion が作る Lenis(reduced-motion では無い) */
  portfolioLenis?: import('lenis').default;
  /** 揃え線に合わせて要素までスクロールする(Lenis があれば滑らかに) */
  portfolioScrollTo?: (target: HTMLElement) => void;
}
