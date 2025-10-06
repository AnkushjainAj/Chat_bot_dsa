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
          50: '#e0f2fe',
          100: '#bae6fd',
          400: '#4facfe',
          500: '#4facfe',
          600: '#00f2fe',
          700: '#0ea5e9',
          800: '#0284c7',
          900: '#0c4a6e'
        },
        secondary: {
          50: '#ecfdf5',
          400: '#43e97b',
          500: '#38f9d7',
          600: '#22d3ee'
        },
        accent: {
          cyan: '#4facfe',
          teal: '#00f2fe',
          green: '#43e97b',
          mint: '#38f9d7',
          blue: '#0ea5e9'
        },
        dark: {
          900: '#0f0f23',
          800: '#1a1a2e',
          700: '#16213e',
          600: '#0f3460',
          500: '#533483'
        }
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'Monaco', 'Consolas', 'monospace']
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out'
      }
    },
  },
  plugins: [],
}
