import { responseT } from '@/lib/types';
import { infoText, successText } from '@/lib/utils';
import spawn from 'cross-spawn';
import fs from 'fs-extra';

export const createNewNext = async (response: responseT, pmx: string[], mute_output: boolean, directory: string) => {
    if (!pmx[0]) return;

    try {
        if (!mute_output) console.log();
        if (!mute_output) infoText('Installing Next.js...');
        if (directory) console.log(directory);
        if (directory) await fs.mkdir(directory, { recursive: true });
        if (directory) process.chdir(directory);
        const result = spawn.sync(
            pmx[0],
            [
                pmx[1],
                'create-next-app@latest',
                response['app-name'],
                '--ts',
                '--tailwind',
                '--app',
                '--no-src-dir',
                '--no-import-alias',
                '--skip-install',
                '--no-turbopack',
                response['eslint'] ? '--eslint' : '--no-eslint',
            ].filter((str) => str !== '' && str !== undefined) as string[],
            {
                stdio: 'ignore',
            },
        );

        if (result.error) {
            throw result.error;
        }

        if (!mute_output) successText(`Created a new next.js app`);
        process.chdir(response['app-name']);

        if (!mute_output) successText('Next.js installed successfully!');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};
