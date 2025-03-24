import { exit } from 'process';
import { configureComp } from '@/config/configure-comp';
import { installDependencies } from '@/config/install-dependencies';
import { installPrettier } from '@/config/install-prettier';
import { readConfig } from '@/config/read-config';
import { responseT } from '@/lib/types';
import { getPmInfo, infoText, isDoxiumProject, successText, warningText } from '@/lib/utils';

export const update = async (mute_output: boolean) => {
    if (!(await isDoxiumProject('./'))) exit(1);

    infoText('Updating Doxium');
    infoText('Beware! This command will:');
    infoText('1. Replace /components, /lib and /app directories');
    infoText('2. Re-Install dependencies');
    infoText('3. Not alter /docs, /public and doxium.config.ts');

    // TODO: Add confirmation prompt

    const { pm, pmi } = await getPmInfo(mute_output);

    await installPrettier();

    const config = await readConfig();
    if (config.useDocs === true) exit(1); // TODO: Add useDocs support
    const response: responseT = {
        eslint: undefined,
        prettier: undefined,
        'use-docs': config.useDocs,
        'base-color': config.style.baseColor,
        'accent-color': config.style.accentColor,
        'shiki-theme': config.style.shikiTheme,
        'github-repo': config.socials?.githubRepo ?? '',
        'color-scheme': config.style.colorScheme,
        proceed: true,
    } as responseT;

    await configureComp(response, pm, false, mute_output, true);
    await installDependencies(pmi, mute_output);

    successText('Update complete');
    warningText('Please make sure to update your doxium.config.ts file to match the new structure');
};
