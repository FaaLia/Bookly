/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FCF9F3',
          100: '#F6F3ED',
          200: '#F0EEE8',
          300: '#EBE8E2',
        },
        forest: {
          DEFAULT: '#192F23',
          hover: '#13241b',
          light: '#234231',
          dark: '#151D1A',
        },
        sage: {
          DEFAULT: '#DCE5DF',
          border: 'rgba(25, 47, 35, 0.2)',
        },
        charcoal: {
          900: '#1C1C18',
          800: '#151D1A',
          600: '#424844',
          400: '#737973',
        },
        bookly: {
          border: 'rgba(194, 200, 194, 0.3)',
          borderSubtle: 'rgba(194, 200, 194, 0.2)',
          brown: '#695C56',
        }
      },
      fontFamily: {
        serif: ['"EB Garamond"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        nimbus: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'book': '0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 8px 10px -6px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}
