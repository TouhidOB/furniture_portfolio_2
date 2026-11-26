/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: '#101010',
          50: '#2A2A2A',
          100: '#222222',
          200: '#1A1A1A',
          800: '#141414',
          900: '#101010',
          950: '#0A0A0A',
        },
        graphite: {
          DEFAULT: '#242424',
          light: '#333333',
          border: '#3A3A3A',
        },
        champagne: {
          DEFAULT: '#C6A878',
          light: '#DBC39E',
          dark: '#A88C5E',
          muted: '#8A7550',
        },
        ivory: {
          DEFAULT: '#EEE8DD',
          muted: '#C8C2B7',
          dim: '#A39E94',
        },
        walnut: {
          DEFAULT: '#67452F',
          dark: '#4A3121',
          light: '#855C41',
        },
        stone: {
          DEFAULT: '#96918A',
          light: '#B5B0A9',
          dark: '#68645E',
        },
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        sans: ['Manrope', 'sans-serif'],
      },
      spacing: {
        'desktop-x': '6vw',
      },
      transitionTimingFunction: {
        'maison-ease': 'cubic-bezier(0.16, 1, 0.3, 1)',
      }
    },
  },
  plugins: [],
}
