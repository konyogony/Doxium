import { exit } from 'process';
import { configureComp } from '../config/configure-comp.js';
import { installDependencies } from '../config/install-dependencies.js';
import { installPrettier } from '../config/install-prettier.js';
import { readConfig } from '../config/read-config.js';
import { responseT } from '../utils/types.js';
import { getPmInfo, infoText, isDoxiumProject, successText, warningText } from '../utils/utils.js';

export const update = async (mute_output: boolean) => {
    if (!(await isDoxiumProject('./'))) exit(1);
    console.log(infoText('Updating Doxium'));
    console.log(infoText('Beware! This command will:'));
    console.log(infoText('1. Replace /components, /lib and /app directories'));
    console.log(infoText('2. Re-Install dependencies'));
    console.log(infoText('3. Not alter /docs, /public and doxiun.config.ts'));

    // TODO: Add confirmation prompt

    const { pm, pmi } = await getPmInfo(mute_output);

    installDependencies(pmi, mute_output);
    installPrettier();

    const config = await readConfig();
    if (config.useDocs === true) exit(1);
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

    console.log(successText('Update complete'));
    console.log(warningText('Please make sure to update your doxium.config.ts file to match the new structure'));
};
