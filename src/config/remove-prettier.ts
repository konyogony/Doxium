import spawn from 'cross-spawn';
import fs from 'fs-extra';
import { responseT } from '../utils/types.js';
import { errorText, infoText, successText } from '../utils/utils.js';

export const removePrettier = async (response: responseT, pm: string, mute_output: boolean) => {
    try {
        if (!response['prettier']) {
            spawn.sync(pm, ['run', 'prettier', './', '-w'], { stdio: 'inherit' });
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
                { stdio: 'inherit' },
            );
            await fs.remove('./.prettierrc.json');
        } else {
            !mute_output && console.log('\n' + infoText('Installing Prettier...'));
            !mute_output && console.log(successText('Prettier installed successfully!'));
        }
    } catch (error) {
        console.error(errorText(`Error removing Prettier:`), error);
        process.exit(1);
    }
};
