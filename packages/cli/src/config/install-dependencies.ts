import { errorText, infoText, successText } from '@/lib/utils';
import spawn from 'cross-spawn';

export const installDependencies = async (pmi: string[], mute_output: boolean) => {
    if (!pmi[0]) return;
    try {
        if (!mute_output) infoText('\n' + 'Installing dependencies...');
        spawn.sync(
            pmi[0],
            [
                pmi[1],
                '@radix-ui/react-dialog',
                '@radix-ui/react-slot',
                '@shikijs/transformers',
                '@shikijs/twoslash',
                '@theguild/remark-mermaid',
                '@vertisanpro/react-icons',
                'class-variance-authority',
                'clsx',
                'cmdk',
                'copy-to-clipboard',
                'gray-matter',
                'next-mdx-remote',
                'rehype-mathjax',
                'rehype-mdx-code-props',
                'remark-gfm',
                'remark-math',
                'shiki',
                'sonner',
                'tailwind-merge',
                'tailwindcss-animate',
            ].filter((str) => str !== '' && str !== undefined) as string[],
            {
                stdio: 'ignore',
            },
        );
        spawn.sync(
            pmi[0],
            [
                pmi[1],
                '-d',
                '@tailwindcss/typography',
                '@types/tailwindcss',
                'prettier',
                'prettier-plugin-tailwindcss',
                'typescript',
                '@types/node',
                '@types/react',
                '@types/react-dom',
                'tailwindcss',
                'postcss',
                '@tailwindcss/postcss',
                'eslint',
                'eslint-config-next',
                '@eslint/eslintrc',
            ].filter((str) => str !== '' && str !== undefined) as string[],
            { stdio: 'ignore' },
        );

        if (!mute_output) successText('Dependencies installed successfully!');
    } catch (error) {
        errorText(`Error configuring dependencies:`);
        console.error(error);
        process.exit(1);
    }
};
