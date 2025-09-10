import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import lineClamp from '@tailwindcss/line-clamp';

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
        // Design System Colors
        primary: {
          DEFAULT: 'rgb(var(--color-primary))',
          light: 'rgb(var(--color-primary-light))',
          dark: 'rgb(var(--color-primary-dark))',
        },
        bg: 'rgb(var(--color-bg))',
        surface: {
          DEFAULT: 'rgb(var(--color-surface))',
          hover: 'rgb(var(--color-surface-hover))',
        },
        border: {
          DEFAULT: 'rgb(var(--color-border))',
          light: 'rgb(var(--color-border-light))',
        },
        text: {
          DEFAULT: 'rgb(var(--color-text))',
          secondary: 'rgb(var(--color-text-secondary))',
        },
        muted: {
          DEFAULT: 'rgb(var(--color-muted))',
          light: 'rgb(var(--color-muted-light))',
        },
        success: {
          DEFAULT: 'rgb(var(--color-success))',
          light: 'rgb(var(--color-success-light))',
        },
        warning: {
          DEFAULT: 'rgb(var(--color-warning))',
          light: 'rgb(var(--color-warning-light))',
        },
        danger: {
          DEFAULT: 'rgb(var(--color-danger))',
          light: 'rgb(var(--color-danger-light))',
        },
      },
      boxShadow: {
        soft: 'var(--shadow-soft)',
        DEFAULT: 'var(--shadow)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
        sm: 'var(--radius-sm)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 200ms ease-out',
        'slide-in-bottom': 'slideInBottom 300ms ease-out',
        'slide-in-top': 'slideInTop 300ms ease-out',
        'zoom-in': 'zoomIn 200ms ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInBottom: {
          '0%': { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInTop: {
          '0%': { transform: 'translateY(-16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        zoomIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      transitionTimingFunction: {
        'bounce-subtle': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [
    forms,
    typography,
    lineClamp,
  ],
}
