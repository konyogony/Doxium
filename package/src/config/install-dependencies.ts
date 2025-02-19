import spawn from 'cross-spawn';
import { errorText, infoText, successText } from '../utils/utils.js';

export const installDependencies = async (pmi: string[], mute_output: boolean) => {
    if (!pmi[0]) return;
    try {
        !mute_output && console.log('\n' + infoText('Installing dependencies...'));
        spawn.sync(
            pmi[0],
            [
                pmi[1],
                '@radix-ui/react-dialog',
                '@radix-ui/react-slot',
                '@vertisanpro/react-icons',
                'class-variance-authority',
                'clsx',
                'cmdk',
                'copy-to-clipboard',
                'gray-matter',
                'next',
                'next-mdx-remote',
                'react',
                'react-dom',
                'sonner',
                'tailwind-merge',
                'tailwindcss-animate',
                '@shikijs/transformers',
                '@shikijs/twoslash',
                '@theguild/remark-mermaid',
                'rehype-mathjax',
                'rehype-mdx-code-props',
                'remark-gfm',
                'remark-math',
                'shiki',
            ].filter((str) => str !== '' && str !== undefined) as string[],
            { stdio: 'ignore' },
        );
        spawn.sync(
            pmi[0],
            [
                pmi[1],
                '-d',
                '@shikijs/transformers',
                '@shikijs/twoslash',
                '@tailwindcss/typography',
                'shiki',
                'rehype-mathjax',
                'rehype-mdx-code-props',
                'remark-gfm',
                'remark-math',
                '@types/tailwindcss',
                'autoprefixer',
                'prettier',
                '@ianvs/prettier-plugin-sort-imports',
                'prettier-plugin-organize-attributes',
                'prettier-plugin-tailwindcss',
                'prettier-plugin-css-order',
                'typescript',
                '@types/node',
                '@types/react',
                '@types/react-dom',
                'postcss',
                'tailwindcss@^3',
                'eslint',
                'eslint-config-next',
                '@eslint/eslintrc',
            ].filter((str) => str !== '' && str !== undefined) as string[],
            { stdio: 'ignore' },
        );

        !mute_output && console.log(successText('Dependencies installed successfully!'));
    } catch (error) {
        console.error(errorText(`Error configuring dependencies:`), error);
        process.exit(1);
    }
};
