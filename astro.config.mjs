import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://pokerplaybook.pro',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => !/\/bio\/?$/.test(new URL(page).pathname),
    }),
  ],
});
