import spawn from 'cross-spawn';
import { responseT } from '../utils/types.js';
import { infoText, successText } from '../utils/utils.js';

export const createNewNext = async (response: responseT, pmx: string[]) => {
    if (!pmx[0]) return;

    try {
        console.log('\n' + infoText('Installing Next.js...'));
        spawn.sync(
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
        console.log(successText(`Created a new next.js app`));
        process.chdir(response['app-name']);

        console.log(successText('Next.js installed successfully!'));
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};
