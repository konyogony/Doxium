import spawn from 'cross-spawn';
import { responseT } from '../utils/types.js';
import { infoText, successText } from '../utils/utils.js';

export const createNewNext = async (response: responseT, pmx: string[]) => {
    if (!pmx[0]) return;
    try {
        console.log('\n' + infoText('Installing Next.js...'));

        console.log(
            'Debug' +
                [
                    pmx[0],
                    [
                        pmx[1],
                        'create-next-app@latest',
                        response['app-name'],
                        '--ts',
                        '--tailwind',
                        '--app',
                        '--no-src-dir',
                        response['eslint'] ? '--eslint' : '--no-eslint',
                        response['turbopack'] ? '--turbo' : '--no-turbo',
                        '--no-import-alias',
                    ].filter((str) => str !== '' && str !== undefined) as string[],
                ].join(' '),
        );

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
                response['eslint'] ? '--eslint' : '--no-eslint',
                response['turbopack'] ? '--turbo' : '--no-turbo',
                '--no-import-alias',
            ].filter((str) => str !== '' && str !== undefined) as string[],
            { stdio: 'ignore' },
        );
        console.log(successText(`Created a new next.js app`));
        process.chdir(response['app-name']);

        console.log(successText('Next.js installed successfully!'));
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};
