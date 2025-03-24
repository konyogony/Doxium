import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
    {
        files: ['src/**/*.ts'],
        ignores: ['src/templates/**', '**/node_modules/**', 'dist/**'],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        plugins: {
            js: js,
        },
        extends: [js.configs.recommended, tseslint.configs.recommended],
    },
]);
