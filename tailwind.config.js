export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: '#84CC16',
        surface: '#111111',
        panel: '#161616',
        muted: '#A1A1AA'
      },
      boxShadow: {
        glow: '0 25px 80px rgba(132, 204, 22, 0.15)',
        panel: '0 20px 50px rgba(0,0,0,0.35)'
      },
      backgroundImage: {
        'hero-grid': 'radial-gradient(circle at top, rgba(132,204,22,0.18), transparent 35%), radial-gradient(circle at 20% 80%, rgba(255,255,255,0.08), transparent 30%)'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};
