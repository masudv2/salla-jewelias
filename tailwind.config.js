module.exports = {
    important: false,
    content: [
        "src/views/**/*.twig",
        "src/assets/js/**/*.js",
        'node_modules/@salla.sa/twilight-tailwind-theme/safe-list-css.txt',
    ],
    darkMode: 'class',
    theme: {
        container: {
            center: true,
            padding: '10px',
            screens: {
                '2xl': '1280px'
            }
        },
        fontFamily: {
            sans: ['Outfit', 'var(--font-main)', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
            serif: ['DM Serif Display', 'serif'],
            primary: 'var(--font-main)',
            /* Glow design system — nav / UI accent */
            nav: ['"Space Grotesk"', 'Outfit', 'var(--font-main)', 'sans-serif'],
        },
        extend: {
            colors: {
                'jw-ink': '#0D0D0D',
                'jw-graphite': '#2A2A2A',
                'jw-steel': '#6B6B6B',
                'jw-mist': '#A0A0A0',
                'jw-fog': '#E8E8E8',
                'jw-snow': '#F6F6F6',
                'jw-amber': '#C6975B',
                'jw-amber-soft': '#DDB87E',
                'jw-blush': '#E8D5C4',
                'dark': '#1D1F1F',
                'darker': '#0E0F0F',
                'danger': '#AE0A0A',
                'primary-dark': 'var(--color-primary-dark)',
            },
            borderRadius: {
                DEFAULT: '.75rem',
            },
            screens: {
                'xs': '480px',
            },
        },
    },
    corePlugins: {
        outline: false,
    },
    plugins: [
        require('@salla.sa/twilight-tailwind-theme'),
        require('@tailwindcss/forms'),
        require('@tailwindcss/line-clamp'),
    ],
};
