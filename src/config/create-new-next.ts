import spawn from 'cross-spawn';
import fs from 'fs-extra';
import { responseT } from '../utils/types.js';
import { infoText, successText } from '../utils/utils.js';

export const createNewNext = async (response: responseT, pmx: string[], mute_output: boolean, directory: string) => {
    if (!pmx[0]) return;

    try {
        !mute_output && console.log('\n' + infoText('Installing Next.js...'));
        directory && (await fs.mkdir(directory, { recursive: true }));
        directory && process.chdir(directory);
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

        !mute_output && console.log(successText(`Created a new next.js app`));
        process.chdir(response['app-name']);

        !mute_output && console.log(successText('Next.js installed successfully!'));
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};
