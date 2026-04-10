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
                '2xl': '1600px'
            }
        },
        fontFamily: {
            sans: ['Jost', 'var(--font-main)', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
            serif: ['Cormorant', 'serif'],
            display: ['Cormorant', 'serif'],
            body: ['Jost', 'sans-serif'],
            primary: 'var(--font-main)',
        },
        extend: {
            colors: {
                nr: {
                    primary: '#263D30',
                    'primary-hover': '#1a2d22',
                    text: '#1f1f1f',
                    'text-light': '#747474',
                    'bg-warm': '#f8f2ea',
                    'bg-footer': '#f1eee4',
                    border: '#e3e3e3',
                    sale: '#702424',
                    dark: '#1f1f1f',
                },
                'dark': '#1D1F1F',
                'darker': '#0E0F0F',
                'danger': '#AE0A0A',
                'primary-dark': 'var(--color-primary-dark)',
            },
            maxWidth: {
                page: '1600px',
            },
            borderRadius: {
                DEFAULT: '0',
            },
            transitionDuration: {
                DEFAULT: '400ms',
                slow: '500ms',
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
