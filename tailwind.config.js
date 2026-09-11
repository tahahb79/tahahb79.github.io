/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./js/**/*.js", "./config/**/*.json"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'page-bg': 'var(--page-bg)',
        'text-color': 'var(--text-color)',
        'header-text': 'var(--header-text)',
        'subtext-color': 'var(--subtext-color)',
        'accent-color': 'var(--accent-color)',
        'border-color': 'var(--border-color)',
        'resume-btn': 'var(--resume-btn-bg)',
        'resume-btn-text': 'var(--resume-btn-text)',
        'resume-btn-hover': 'var(--resume-btn-hover)',
        'cv-btn': 'var(--cv-btn-bg)',
        'cv-btn-text': 'var(--cv-btn-text)',
        'cv-btn-hover': 'var(--cv-btn-hover)',
        'projects-btn': 'var(--projects-btn-bg)',
        'projects-btn-text': 'var(--projects-btn-text)',
        'projects-btn-hover': 'var(--projects-btn-hover)',
        'contact-btn': 'var(--contact-btn-bg)',
        'contact-btn-text': 'var(--contact-btn-text)',
        'contact-btn-hover': 'var(--contact-btn-hover)',
      },
      fontFamily: {
        'primary': ['Poppins', 'sans-serif'],
        'secondary': ['Merriweather', 'serif'],
      },
    },
  },
  plugins: [],
} 