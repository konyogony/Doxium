import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            ts: path.resolve(__dirname, 'src', 'ts'),
            tsx: path.resolve(__dirname, 'src', 'tsx'),
            icons: path.resolve(__dirname, 'node_modules', '@vertisanpro', 'react-icons'),
        },
    },
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'DoxiumUI',
            fileName: 'index',
        },
        rollupOptions: {
            external: ['react', 'react-dom'],
            output: {
                globals: {
                    react: 'react',
                },
            },
        },
    },
});
