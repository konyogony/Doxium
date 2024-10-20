import { execa } from 'execa';
import fs from 'fs-extra';
import { responseT } from '../utils/types.js';
import { errorText, infoText, successText } from '../utils/utils.js';

export const configureDep = async (response: responseT, pmi: string[]) => {
    try {
        console.log('\n' + infoText('Installing dependencies...'));
        await execa(
            pmi[0],
            [
                pmi[1],
                '-d',
                'prettier',
                '@ianvs/prettier-plugin-sort-imports',
                'prettier-plugin-css-order',
                'prettier-plugin-organize-attributes',
                'prettier-plugin-tailwindcss',
                '@types/mdx',
                '@next/mdx',
                '@mdx-js/loader',
            ].filter((str) => str !== ''),
            { stdio: 'ignore' },
        );
        await execa(
            pmi[0],
            [
                pmi[1],
                'class-variance-authority',
                'clsx',
                'lucide-react',
                'tailwind-merge',
                'tailwindcss-animate',
                '@tailwindcss/typography',
                'react-icons',
                '@radix-ui/react-slot',
                '@radix-ui/react-dialog',
                '@radix-ui/react-toast',
                '@radix-ui/react-icons',
                'cmdk',
                'sonner',
                'copy-to-clipboard',
                'shiki',
                'remark-gfm',
            ].filter((str) => str !== '' && str !== undefined),
            { stdio: 'ignore' },
        );

        console.log(successText('Dependencies installed successfully!'));
    } catch (error) {
        console.error(errorText(`Error configuring dependencies:`), error);
        process.exit(1);
    }
};

export const finalPrettier = async (response: responseT, pm: string) => {
    try {
        if (!response['prettier']) {
            await execa(pm, ['run', 'prettier', './', '-w'], { stdio: 'ignore' });
            await execa(
                pm,
                [
                    'remove',
                    'prettier',
                    '@ianvs/prettier-plugin-sort-imports',
                    'prettier-plugin-css-order',
                    'prettier-plugin-organize-attributes',
                    'prettier-plugin-tailwindcss',
                ],
                { stdio: 'ignore' },
            );
            await fs.remove('./.prettierrc.json');
        } else {
            console.log('\n' + infoText('Installing Prettier...'));
            console.log(successText('Prettier installed successfully!'));
        }
    } catch (error) {
        console.error(errorText(`Error removing Prettier:`), error);
        process.exit(1);
    }
};
