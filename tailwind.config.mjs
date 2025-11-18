/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  safelist: [
    'bg-[#67ea94]',
    'hover:bg-[#52d67f]',
    'bg-[#f5f7f9]',
    'text-[#2b303b]',
    'text-[#5e6371]',
    'text-[#f7f8f9]',
    'border-[#d8dbe0]',
    'rounded-[28px]',
    'rounded-[10px]',
    'rounded-[6.8px]',
    'text-[14px]',
    'text-[16px]',
    'text-[17px]',
    'text-[20px]',
    'text-[26px]',
    'text-[32px]',
    'text-[40px]',
    'text-[48px]',
    'text-[64px]',
    'h-[22px]',
    'h-[32px]',
    'h-[40px]',
    'h-[48px]',
    'leading-[1.7]',
    'leading-[16px]',
    'leading-[20px]',
    'max-w-[1320px]',
    'max-w-[800px]',
    'max-w-[700px]',
    'max-w-[80ch]',
  ],
  theme: {
    extend: {
      spacing: {
        'section-xs': '3rem',    // 48px - tight section spacing
        'section-sm': '4rem',    // 64px - small section spacing
        'section-md': '6rem',    // 96px - medium section spacing
        'section-lg': '8rem',    // 128px - large section spacing
        'section-xl': '10rem',   // 160px - extra large section spacing
      },
      maxWidth: {
        'site': '1320px',        // Outer boundary for all content
        'content': '1024px',     // Multi-column layouts, card grids
        'prose': '80ch',         // Long-form reading (article body)
        'narrow': '65ch',        // Compact reading (forms, short content)
        'heading': '60ch',       // Page titles, hero headings
        'description': '70ch',   // Subtitles, lead paragraphs
      },
      colors: {
        /* Campfire Design System - Primary Scale (Cello - Slate Blue-Gray) */
        primary: {
          50: '#f5f7f9',
          100: '#ebeef2',
          200: '#d2dae3',
          300: '#acbbcc',
          400: '#8098b0',
          500: '#607a97',
          600: '#4c627d',
          700: '#3e4f66',
          800: '#364456',
          900: '#303a49',
          950: '#1f2530',
        },
        /* Campfire Design System - Secondary Scale (Terracotta - Earthy Red-Brown) */
        secondary: {
          50: '#faf6f5',
          100: '#f5ebe8',
          200: '#ead8d2',
          300: '#dbbdb3',
          400: '#c9998a',
          500: '#b87b6a',
          600: '#ad6f5d',
          700: '#8d5443',
          800: '#75473a',
          900: '#623e34',
          950: '#341f19',
        },
        /* Campfire Design System - Neutral Scale (Black Rock - Deep Earth Tones) */
        neutral: {
          50: '#f7f8f9',
          100: '#edeef1',
          200: '#d8dbe0',
          300: '#b8bcc5',
          400: '#9299a5',
          500: '#747b8a',
          600: '#5e6371',
          700: '#4d515c',
          800: '#42454e',
          900: '#2b303b',
          950: '#1c1f26',
        },
        /* Meshtastic Accent */
        meshtastic: '#67ea94',
        /* Campfire Signature Colors - Ember Palette */
        signature: {
          clay: '#d4a89a',
          flamingo: '#e76663',
          terracotta: '#c8755e',
          ember: '#e89635',
          'golden-amber': '#f5a838',
          hay: '#e8c872',
          sage: '#8fae5a',
          moss: '#6b8540',
          pine: '#5a9194',
          cello: '#6284a0',
          'blue-calx': '#a8b8d0',
          dusk: '#9d87b3',
          'mauve-earth': '#b37e94',
          stone: '#8a909e',
        },
        /* Semantic Colors - Success (Sage - Natural Green) */
        success: {
          50: '#f0f7e8',
          500: '#8fb14b',
          600: '#739038',
          700: '#5a6f2d',
        },
        /* Semantic Colors - Warning (Golden Amber - Warm Glow) */
        warning: {
          50: '#fef9ed',
          500: '#f9c574',
          600: '#ef991f',
          700: '#d97706',
        },
        /* Semantic Colors - Danger (Flamingo - Earthy Red) */
        danger: {
          500: '#e75351',
          600: '#dc3a38',
          700: '#be2b29',
        },
        /* Semantic Colors - Info (Blue Calx - Muted Blue) */
        info: {
          500: '#b8c5d9',
          600: '#a3b2c9',
          700: '#8899b3',
        },
        /* UI Mappings */
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: 'var(--card)',
        'card-foreground': 'var(--card-foreground)',
        border: 'var(--border)',
      },
      fontFamily: {
        sans: ['Manrope', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
      },
      borderRadius: {
        lg: '1.75rem',
        md: '0.75rem',
        sm: '0.5rem',
      },
      fontSize: {
        base: '16px',
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
    },
  },
  plugins: [],
}
