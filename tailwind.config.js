/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#1E3A8A',
          'primary-light': '#2548A8',
          'primary-dark': '#162D6B',
          secondary: '#10B981',
          'secondary-light': '#34D399',
          'secondary-dark': '#059669',
        },
        finance: {
          income: '#22C55E',
          'income-light': '#DCFCE7',
          expense: '#EF4444',
          'expense-light': '#FEE2E2',
          savings: '#3B82F6',
          'savings-light': '#DBEAFE',
          lent: '#F59E0B',
          'lent-light': '#FEF3C7',
          borrow: '#8B5CF6',
          'borrow-light': '#EDE9FE',
        },
        surface: {
          bg: '#F8FAFC',
          card: '#FFFFFF',
          border: '#E2E8F0',
          'border-light': '#F1F5F9',
        },
        text: {
          primary: '#1F2937',
          secondary: '#64748B',
          muted: '#94A3B8',
          inverse: '#FFFFFF',
        },
        // Keep backward compat
        primary: {
          black: '#1F2937',
          white: '#FFFFFF',
          gray: {
            50: '#F8FAFC',
            100: '#F1F5F9',
            200: '#E2E8F0',
            300: '#CBD5E1',
            400: '#94A3B8',
            500: '#64748B',
            600: '#475569',
            700: '#334155',
            800: '#1E293B',
            900: '#0F172A',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 1px 3px 0 rgba(0,0,0,0.08), 0 1px 2px -1px rgba(0,0,0,0.04)',
        'premium-lg': '0 4px 6px -1px rgba(0,0,0,0.08), 0 2px 4px -2px rgba(0,0,0,0.04)',
        'premium-xl': '0 20px 25px -5px rgba(0,0,0,0.08), 0 8px 10px -6px rgba(0,0,0,0.04)',
        'card': '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'card-hover': '0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -4px rgba(0,0,0,0.04)',
        'nav': '0 -4px 20px rgba(0,0,0,0.08)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-down': 'slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'scale-in': 'scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'card-in': 'cardIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'card-in-delay-1': 'cardIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both',
        'card-in-delay-2': 'cardIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        cardIn: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
