
/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    fontFamily: {
      sans: ['Sarabun', 'serif',]
    },
    container: {
      padding: {
        DEFAULT: '1.5rem'
      }
    },
    borderRadius: {
      'none': '0',
      'sm': '0.125rem',
      DEFAULT: '0.25rem',
      DEFAULT: '4px',
      'md': '0.375rem',
      'lg': '0.5rem',
      'xl': '10px',
      'full': '9999px',
      'large': '12px',
    },
    extend: {
      screens: { 
        'xs': '480px', 
      },
      colors: {
        navy: {
          50: '#F4F4F5',
          100: '#EDEEF1',
          200: '#E9EBEE',
          300: '#ACB5C7',
          400: '#4F678E',
          500: '#405580',
          600: '#1F386B',
          700: '#16366B',
          800: '#102952',
          900: '#091730',
          950: '#091730'
        },
        ivory: {
          50: '#F5E4D7',
          700: '#D2C1B4',
          900: '#B9AFA1'
        },
        grayscale: {
          100: '#F8F8F8',
          200: '#EAE9E9',
          300: '#E0E0E0',
          400: '#BDBDBD',
          500: '#9E9E9E',
          600: '#808080',
          700: '#747474',
          800: '#333333'
        },
        success: {
          400: '#36B97E'
        }
      },
      fontFamily: {
        noto: ['Noto Serif Thai', 'serif',]
      },
      transitionDelay: {
        '400': '400ms',
        '600': '600ms'
      }
    },
  },
  plugins: [],
}

