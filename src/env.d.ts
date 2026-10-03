/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_PRISMIC_ENVIRONMENT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
