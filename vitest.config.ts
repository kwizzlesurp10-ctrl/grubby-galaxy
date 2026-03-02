import { defineConfig } from 'vitest/config';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const astrowindConfigMock = {
  name: 'vite-plugin-astrowind-config-mock',
  resolveId(id: string) {
    if (id === 'astrowind:config') return '\0astrowind:config';
  },
  load(id: string) {
    if (id === '\0astrowind:config') {
      return `
        export const SITE = { site: 'https://example.com', base: '/', trailingSlash: false, name: 'Test' };
        export const I18N = { language: 'en', textDirection: 'ltr' };
        export const METADATA = {};
        export const APP_BLOG = {
          isEnabled: true,
          postsPerPage: 6,
          isRelatedPostsEnabled: true,
          post: { isEnabled: true, permalink: '/%slug%', robots: { index: true } },
          list: { isEnabled: true, pathname: 'blog', robots: { index: true } },
          category: { isEnabled: true, pathname: 'category', robots: { index: true } },
          tag: { isEnabled: true, pathname: 'tag', robots: { index: false } },
        };
        export const UI = { theme: 'system' };
        export const ANALYTICS = { vendors: { googleAnalytics: { id: null } } };
      `;
    }
  },
};

export default defineConfig({
  test: {
    environment: 'node',
  },
  plugins: [astrowindConfigMock],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },
});
