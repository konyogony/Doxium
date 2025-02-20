import { exit } from 'process';
import { configureComp } from '../config/configure-comp.js';
import { installDependencies } from '../config/install-dependencies.js';
import { installPrettier } from '../config/install-prettier.js';
import { readConfig } from '../config/read-config.js';
import { getPmInfo } from '../utils/get-pm-info.js';
import { responseT } from '../utils/types.js';
import { infoText, isDoxiumProject, successText } from '../utils/utils.js';

export const update = async (mute_output: boolean) => {
    if (!(await isDoxiumProject('./'))) exit(1);
    infoText('Updating Doxium');
    infoText('Beware! This command will:');
    infoText('1. Replace /components, /lib and /app directories');
    infoText('2. Re-Install dependencies');

    const { pm, pmx, pmi } = await getPmInfo(mute_output);

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

    await configureComp(response, pm, false, mute_output, config.alias.lib, config.alias.components, true);

    successText('Update complete');
};
