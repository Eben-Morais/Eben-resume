/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dark mode surface colors
        zinc: {
          950: '#09090b',
          900: '#18181b',
          800: '#27272a',
          700: '#3f3f46',
          400: '#a1a1aa',
          300: '#d4d4d8',
          200: '#e4e4e7',
          100: '#f4f4f5',
        },
        // Premium dark base
        slate: {
          950: '#020617',
          900: '#0f172a',
        },
        // Accent palette — indigo/violet
        indigo: {
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
        },
        violet: {
          400: '#a78bfa',
          500: '#8b5cf6',
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'SFMono-Regular', 'Consolas', 'monospace'],
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease forwards',
        'pulse-ring': 'pulseRing 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseRing: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(1.4)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      boxShadow: {
        'glass': '0 4px 24px -4px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
        'glass-hover': '0 8px 40px -8px rgba(99,102,241,0.25), inset 0 1px 0 rgba(255,255,255,0.08)',
        'indigo-glow': '0 0 24px rgba(99,102,241,0.25)',
        'card': '0 2px 16px rgba(0,0,0,0.25)',
        'card-hover': '0 8px 32px rgba(0,0,0,0.35)',
      },
    },
  },
  plugins: [],
};
