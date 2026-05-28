/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary:                    '#7B5EA7',
        'on-primary':               '#FFFFFF',
        'primary-container':        '#EDE1FF',
        'on-primary-container':     '#25005A',
        secondary:                  '#E8D5C4',
        'on-secondary':             '#4A3728',
        'secondary-container':      '#F5EBE0',
        'on-secondary-container':   '#5C4433',
        tertiary:                   '#7A9E7E',
        'on-tertiary':              '#FFFFFF',
        'tertiary-container':       '#C6ECC8',
        'on-tertiary-container':    '#002111',
        surface:                    '#FAF6F1',
        'surface-container-low':    '#F7F3EE',
        'surface-container':        '#F1EDE8',
        'surface-container-high':   '#EBE8E3',
        'on-surface':               '#1C1C19',
        'on-surface-variant':       '#55433D',
        'inverse-surface':          '#31302D',
        'inverse-on-surface':       '#F4F0EB',
        background:                 '#FAF6F1',
        outline:                    '#88726C',
        'outline-variant':          '#DBC1B9',
      },
      fontFamily: {
        display: ['Literata', 'Georgia', 'serif'],
        body:    ['DM Sans', 'sans-serif'],
        sans:    ['DM Sans', 'sans-serif'],
      },
      boxShadow: {
        card:  '0 8px 30px rgba(123,94,167,0.05)',
        phone: '0 32px 64px rgba(0,0,0,0.30), 0 8px 24px rgba(123,94,167,0.12)',
        nav:   '0 1px 0 rgba(0,0,0,0.06)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
    },
  },
  plugins: [],
}
