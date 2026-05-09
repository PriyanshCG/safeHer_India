/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                hero: ['Noto Serif', 'serif'],
                body: ['Noto Serif', 'serif'],
                label: ['Manrope', 'sans-serif'],
            },
            colors: {
                primary: '#8a2b57',
                'primary-container': '#a84370',
                secondary: '#b5005d',
                'secondary-container': '#da2676',
                background: '#fff7fa',
                surface: '#fff7fa',
                'surface-low': '#ffeffa',
                'surface-lowest': '#ffffff',
                'surface-highest': '#ffd6fa',
                'on-surface': '#37003c',
                'outline-variant': '#d9c0c7',
                error: '#ba1a1a',
            }
        }
    }
}