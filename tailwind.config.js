/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nexora: {
          950: '#040406',
          900: '#08080C',
          850: '#0E0F15',
          800: '#141620',
          700: '#1F2232',
          600: '#2E3349',
          500: '#525975',
          400: '#868EA8',
          300: '#B4BBD0',
          200: '#DDE2EE',
          100: '#F1F4F9',
          accent: '#38BDF8',
          titanium: '#8E94A5',
          platinum: '#E5E7EB',
          gold: '#C5A880'
        }
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'Cabinet Grotesk', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      letterSpacing: {
        'widest-plus': '0.3em',
        'super-wide': '0.45em',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      backgroundImage: {
        'radial-radial-fade': 'radial-gradient(circle at center, rgba(56, 189, 248, 0.08) 0%, transparent 70%)',
        'metallic-shine': 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.05) 100%)',
      }
    },
  },
  plugins: [],
}

