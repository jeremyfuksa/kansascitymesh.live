// postcss.config.mjs
import autoprefixer from 'autoprefixer';
import { purgeCSSPlugin } from '@fullhuman/postcss-purgecss'; // Changed to named import

export default {
  plugins: [
    autoprefixer, // This seems to be correct as per docs
    process.env.NODE_ENV === 'production' &&
      purgeCSSPlugin({
        content: ['./src/**/*.astro', './src/**/*.html', './src/**/*.js', './src/**/*.ts'],
        safelist: {
          standard: [
            'html',
            'body',
          ],
          deep: [
            /^navbar-/,
            /^nav-/,
            /^btn-/,
            /^form-/,
            /^input-/,
            /^col-/,
            /^row-/,
            /^container-/,
            /^d-/,
            /^flex-/,
            /^justify-/,
            /^align-/,
            /^gap-/,
            /^text-/,
            /^bg-/,
            /^border-/,
            /^shadow-/,
            /^sticky-/,
            /^min-vh-/,
            /^fw-/,
            /^small/,
            /^lead-/,
            /^display-/,
            /^mb-/,
            /^mt-/,
            /^py-/,
            /^px-/,
            /^ms-/,
            /^me-/,
            /^p-/,
            /^m-/,
            /^rounded-/,
            /^active/,
            /^page/,
            /^fa-/, // Font Awesome icons
          ],
        },
        defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
      }),
  ].filter(Boolean),
};