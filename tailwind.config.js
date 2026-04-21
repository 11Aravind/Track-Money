/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cyber-bg': 'var(--bg-primary)',
        'cyber-surface': 'var(--surface-card)',
        'cyber-surface-light': 'var(--surface-card)',
        'cyber-accent-green': 'var(--accent-green)',
        'cyber-accent-blue': 'var(--accent-blue)',
        'cyber-border': 'var(--surface-border)',
        
        'brand-primary': 'var(--accent-green)',
        'brand-primary-light': 'var(--accent-green)',
        'brand-primary-dark': 'var(--accent-green)',
        'brand-secondary': 'var(--accent-blue)',
        
        'finance-income': 'var(--accent-green)',
        'finance-expense': 'var(--accent-blue)',
        'finance-savings': 'var(--accent-blue)',
        'finance-lent': 'var(--accent-green)',
        'finance-borrow': 'var(--accent-blue)',
        
        'surface-bg': 'var(--bg-primary)',
        'surface-card': 'var(--surface-card)',
        'surface-border': 'var(--surface-border)',
        'surface-border-light': 'var(--surface-border-subtle)',
        'surface-overlay': 'var(--surface-overlay)',
        
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        'text-muted-70': 'var(--text-muted-70)',
        'text-muted-40': 'var(--text-muted-40)',
        'text-inverse': 'var(--text-inverse)',
        
        // Aliases for cleaner @apply
        'muted': 'var(--text-muted)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        heading: ['Space Grotesk', 'sans-serif'],
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
