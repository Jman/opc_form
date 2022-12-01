// import { resolve } from 'path';
import { defineConfig } from 'vite';
import { crx } from '@crxjs/vite-plugin';
import vue from '@vitejs/plugin-vue';
import { minify } from 'html-minifier-terser';
import manifest from './src/manifest.config';

// const root = resolve(__dirname, './src');

const imports = `@import '../scss/var';
@import '../scss/mixins';`;

function additionalData(content) {
  // If there are @use statements, insert the import after the last one,
  // otherwise insert it before all content.
  const match = content.match(/@use '[^']+';/g);
  if (match) {
    const last = match[match.length - 1];
    return content.replace(last, `${last}\n${imports}`);
  } else {
    return `${imports}\n${content}`;
  }
}

function htmlMinifyPlugin() {
  return {
    name: 'html-minify-plugin',
    enforce: 'post',
    apply: 'build',
    transformIndexHtml(html) {
      return minify(html, {
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
      });
    },
  };
}

export default defineConfig({
  plugins: [vue(), crx({ manifest }), htmlMinifyPlugin()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData,
      },
    },
  },
});
