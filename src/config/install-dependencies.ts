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
                'prettier',
                'tailwind-merge',
                'tailwindcss-animate',
                '@tailwindcss/typography',
                '@ianvs/prettier-plugin-sort-imports',
                'prettier-plugin-css-order',
                'prettier-plugin-organize-attributes',
                'prettier-plugin-tailwindcss',
                '@types/mdx',
                '@next/mdx',
                '@mdx-js/loader',
                'autoprefixer',
            ].filter((str) => str !== '' && str !== undefined) as string[],
            { stdio: 'inherit' },
        );
        spawn.sync(
            pmi[0],
            [
                pmi[1],
                'class-variance-authority',
                'clsx',
                '@vertisanpro/react-icons',
                '@radix-ui/react-slot',
                '@radix-ui/react-dialog',
                '@radix-ui/react-icons',
                'copy-to-clipboard',
                'cmdk',
                'sonner',
                'shiki',
                'remark-gfm',
                '@shikijs/transformers',
                'rehype-mdx-code-props',
                '@theguild/remark-mermaid',
                '@shikijs/twoslash',
                'remark-math',
                'rehype-mathjax',
            ].filter((str) => str !== '' && str !== undefined) as string[],
            { stdio: 'inherit' },
        );

        !mute_output && console.log(successText('Dependencies installed successfully!'));
    } catch (error) {
        console.error(errorText(`Error configuring dependencies:`), error);
        process.exit(1);
    }
};
