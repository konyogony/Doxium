import { defineConfig } from 'tsup';

export default defineConfig([
    {
        entry: ['src/components/client/index.ts'],
        format: ['esm', 'cjs'],
        dts: true,
        outDir: 'dist/client',
        outExtension({ format }) {
            return { js: format === 'cjs' ? '.js' : '.mjs' };
        },
    },
    {
        entry: ['src/components/server/index.ts'],
        format: ['esm', 'cjs'],
        dts: true,
        outDir: 'dist/server',
        outExtension({ format }) {
            return { js: format === 'cjs' ? '.js' : '.mjs' };
        },
    },
]);
