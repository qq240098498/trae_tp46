/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {
      colors: {
        primary: {
          50: '#F0F4FA',
          100: '#DCE5F3',
          200: '#B9CAE7',
          300: '#8FA9D6',
          400: '#5C81BE',
          500: '#3A60A0',
          600: '#2A4A82',
          700: '#1F3864',
          800: '#0F2B5B',
          900: '#0A1D3E',
          950: '#061126',
        },
        accent: {
          50: '#FBF6EB',
          100: '#F4E9CC',
          200: '#E8D299',
          300: '#DBBA66',
          400: '#C9A962',
          500: '#B89555',
          600: '#9A7A45',
          700: '#7A6036',
          800: '#5A4628',
          900: '#3D2F1B',
        },
        risk: {
          high: '#C0392B',
          highLight: '#F5E6E3',
          medium: '#E67E22',
          mediumLight: '#FCF0E3',
          low: '#27AE60',
          lowLight: '#E3F5EB',
        },
        ivory: {
          50: '#FDFCFA',
          100: '#F8F6F1',
          200: '#F0ECE3',
          300: '#E5DFD2',
          400: '#D5CDC0',
        },
        ink: {
          50: '#F5F7FA',
          100: '#E4E8ED',
          200: '#CBD2D9',
          300: '#9AA5B1',
          400: '#7B8794',
          500: '#616E7C',
          600: '#52606D',
          700: '#3E4C59',
          800: '#323F4B',
          900: '#2C3E50',
          950: '#1F2933',
        },
      },
      fontFamily: {
        serif: ['"Noto Serif SC"', 'Georgia', 'Cambria', '"Times New Roman"', 'serif'],
        sans: ['"Noto Sans SC"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(15, 43, 91, 0.06)',
        'card': '0 4px 16px rgba(15, 43, 91, 0.08)',
        'elevated': '0 8px 32px rgba(15, 43, 91, 0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'scan': 'scan 2s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scan: {
          '0%, 100%': { opacity: '0.3', transform: 'translateY(-100%)' },
          '50%': { opacity: '0.8', transform: 'translateY(100%)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
};
