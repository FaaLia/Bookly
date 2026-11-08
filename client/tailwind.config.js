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
          DEFAULT: '#483E37',
          hover: '#3D342E',
          light: '#5A4F46',
          dark: '#2E2722',
        },
        sage: {
          DEFAULT: '#EAE2DC',
          border: 'rgba(72, 62, 55, 0.2)',
        },
        charcoal: {
          900: '#1C1C18',
          800: '#2E2722',
          600: '#424844',
          400: '#737973',
        },
        bookly: {
          border: 'rgba(194, 200, 194, 0.3)',
          borderSubtle: 'rgba(194, 200, 194, 0.2)',
          brown: '#695C56',
        },
        taupe: {
          DEFAULT: '#483E37',
          50: '#F7F4F1',
          100: '#EAE2DC',
          200: '#D6C8BE',
          300: '#BAA798',
          400: '#8C7767',
          500: '#68574B',
          600: '#54463C',
          700: '#483E37',
          800: '#3D342E',
          900: '#2E2722',
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
