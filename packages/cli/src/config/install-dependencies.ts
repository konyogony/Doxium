import spawn from 'cross-spawn';
import { errorText, infoText, successText } from '../utils/utils.js';

export const installDependencies = async (pmi: string[], mute_output: boolean) => {
    if (!pmi[0]) return;
    try {
        !mute_output && console.log('\n' + infoText('Installing dependencies...'));
        spawn.sync(pmi[0], [pmi[1], '@doxium/ui'].filter((str) => str !== '' && str !== undefined) as string[], {
            stdio: 'ignore',
        });
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

        !mute_output && console.log(successText('Dependencies installed successfully!'));
    } catch (error) {
        console.error(errorText(`Error configuring dependencies:`), error);
        process.exit(1);
    }
};
