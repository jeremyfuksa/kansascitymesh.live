const config = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.5rem',
        sm: '2rem',
        lg: '3rem',
        xl: '4rem'
      },
      screens: {
        sm: '36rem',
        md: '48rem',
        lg: '64rem',
        xl: '72rem',
        '2xl': '80rem'
      }
    },
    extend: {
      colors: {
        kc: {
          red: '#E31837',
          blue: '#004687',
          sky: '#5DADE2'
        },
        mesh: {
          green: '#67C98F'
        },
        sunset: {
          amber: '#F59E42'
        },
        clay: {
          base: '#D4825C'
        },
        prairie: {
          gold: '#E8B547'
        },
        surface: {
          100: '#FDFBF7',
          200: '#F5EFE6',
          300: '#EBE3D5'
        },
        sand: {
          900: '#1A1512',
          800: '#2B2420',
          700: '#3C352F'
        },
        ink: {
          900: '#2B2420',
          700: '#5A4F47',
          500: '#8B7F76'
        },
        cream: {
          50: '#F4E8D8',
          100: '#D9C7B3',
          200: '#B3A090'
        },
        border: {
          light: '#D9D1C7',
          medium: '#C4B8AB',
          dark: '#9B8D80'
        }
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif'
        ]
      },
      boxShadow: {
        card: '0 16px 40px -24px rgba(43, 36, 32, 0.4)'
      },
      maxWidth: {
        'screen-3xl': '96rem'
      }
    }
  }
};

export default config;
