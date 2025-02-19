import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';
import tailwindcssColors from 'tailwindcss/colors';
import config from './doxium.config'; // Cant make this an alias, due to https://github.com/tailwindlabs/tailwindcss/issues/11097

const baseColor = config.style.baseColor;
const accentColor = config.style.accentColor;

export default {
    darkMode: ['class'],
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
                base: tailwindcssColors[baseColor],
                accent: tailwindcssColors[accentColor],
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
        },
    },
    plugins: [tailwindcssAnimate, typography],
} as Config;
