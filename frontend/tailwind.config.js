/** @type {import('tailwindcss').Config} */
// Palette taken from rivierahighschool.org (live site): deep blue sections,
// yellow accents, blue headings/links, red hero button, dark grey text.
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef4fb',
          100: '#d9e6f7',
          200: '#b7d8ef',
          300: '#8fb8e6',
          400: '#629cff',
          500: '#416fb6',
          600: '#2257aa',
          700: '#064187',
          800: '#053a78',
          900: '#042551',
        },
        accent: {
          DEFAULT: '#ffc53a',
          dark: '#f4b819',
          deep: '#b98027',
          light: '#ffe08a',
          band: '#ffbd33',
        },
        ink: {
          DEFAULT: '#292929',
          soft: '#545454',
          mid: '#4a4a4a',
          light: '#797979',
        },
        link: '#4981c2',
        heading: '#3e6fa8',
        danger: '#ff0606',
        quote: '#a6bae0',
        field: '#629cff',
        sky: {
          soft: '#b7d8ef',
        },
      },
      fontFamily: {
        heading: ['"Work Sans"', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        footer: ['Poppins', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0 10px 30px -12px rgba(4, 37, 81, 0.25)',
      },
      backgroundImage: {
        dots: 'radial-gradient(rgba(255,255,255,0.22) 1.5px, transparent 1.5px)',
        'dots-dark': 'radial-gradient(rgba(6,65,135,0.14) 1.5px, transparent 1.5px)',
      },
    },
  },
  plugins: [],
}
