import { responseT } from '@/lib/types';
import { errorText, infoText, successText } from '@/lib/utils';
import spawn from 'cross-spawn';
import fs from 'fs-extra';

export const removePrettier = async (response: responseT, pm: string, mute_output: boolean) => {
    try {
        if (!response['prettier']) {
            spawn.sync(pm, ['run', 'prettier', './', '-w', '--ignore-path=.prettierignore'], { stdio: 'ignore' });
            spawn.sync(
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
            if (!mute_output) infoText('\n' + 'Installing Prettier...');
            if (!mute_output) successText('Prettier installed successfully!');
        }
    } catch (error) {
        errorText(`Error removing Prettier:`);
        console.error(error);
        process.exit(1);
    }
};
