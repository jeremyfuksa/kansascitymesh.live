/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,ts,tsx,js,jsx,html,md,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['General Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['Inconsolata', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      borderRadius: {
        'xs': '0.25rem',   // 4px  — inline chips, code spans
        'sm': '0.375rem',  // 6px  — small DiscordButton, logo, inputs
        'md': '0.625rem',  // 10px — InfoCard, default buttons, status pill icon container
        'lg': '0.75rem',   // 12px — FeatureCard, HardwareCard, TipBanner, MessageBanner
      },
    },
  },
  plugins: [],
};
