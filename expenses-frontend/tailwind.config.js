/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf2f4',
          100: '#fce7eb',
          200: '#f8d2db',
          300: '#f2adbd',
          400: '#e87995',
          500: '#8C0B23', // Diseño-gráfico-1 - Rojo vino principal
          600: '#7a0a1f',
          700: '#66081a',
          800: '#520715',
          900: '#3d0510',
        },
        neutral: {
          50: '#f8f9fa',
          100: '#f1f3f4',
          200: '#e8eaed',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#516673', // Diseño-gráfico-3 - Gris azulado medio
          600: '#475569',
          700: '#0F1926', // Diseño-gráfico-2 - Azul oscuro casi negro
          800: '#0a1421',
          900: '#050f1c',
        },
        accent: {
          100: '#e6f2f5',
          200: '#cce6ec',
          300: '#b3d9e2',
          400: '#99cdd9',
          500: '#8FB2BF', // Diseño-gráfico-4 - Azul grisáceo claro
          600: '#7fa0ac',
          700: '#6f8e99',
        },
        light: {
          100: '#f5f9fa',
          200: '#ebf3f5',
          300: '#e1edef',
          400: '#d7e7e9',
          500: '#BAD6D9', // Diseño-gráfico-5 - Verde azulado muy claro
          600: '#a8c1c4',
        },
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'lg': '8px',
        'xl': '12px',
        '2xl': '16px',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(14, 24, 38, 0.1), 0 10px 20px -5px rgba(14, 24, 38, 0.04)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}