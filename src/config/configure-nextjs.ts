import { execa } from 'execa';
import { responseT } from '../utils/types.js';
import { blueText, infoText, successText } from '../utils/utils.js';

export const configureNextjs = async (response: responseT, pmx: string[]) => {
    try {
        console.log('\n' + infoText('Installing Next.js...'));

        await execa(
            pmx[0],
            [
                pmx[1],
                'create-next-app@canary',
                response['app-name'],
                '--ts',
                '--tailwind',
                '--app',
                '--no-src-dir',
                response['eslint'] ? '--eslint' : '--no-eslint',
                response['turbopack'] ? '--turbo' : '--no-turbo',
                '--no-import-alias',
            ].filter((str) => str !== '' && str !== undefined),
            { stdio: 'ignore' },
        );
        console.log(successText(`Created app with the following options:`));
        console.log(`- Name: ${blueText(response['app-name'])}`);
        console.log(`- ESLint: ${response['eslint'] ? blueText('Enabled') : blueText('Disabled')}`);
        console.log(`- Turbopack: ${response['turbopack'] ? blueText('Enabled') : blueText('Disabled')}`);
        console.log(`- Prettier: ${response['prettier'] ? blueText('Enabled') : blueText('Disabled')}`);
        console.log(`- Shadcn style: ${blueText(response['shadcn-style'])}`);
        console.log(`- Base color: ${blueText(response['base-color'])}`);
        console.log(`- Additional options: ${blueText('Typescript, Tailwind, App Router, no Source Directory')}`);
        process.chdir(response['app-name']);

        console.log(successText('Next.js installed successfully!'));
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};
