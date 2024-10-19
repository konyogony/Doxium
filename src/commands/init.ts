import process from 'process';
import { configureDep, finalPrettier } from '../config/configure-dep.js';
import { configureNextjs } from '../config/configure-nextjs.js';
import { configurePrettier } from '../config/configure-prettier.js';
import { configureShadcn } from '../config/configure-shadcn.js';
import { getPmInfo } from '../utils/get-pm-info.js';
import { getResponse } from '../utils/get-response.js';
import { errorText, isNextJsProject, successText } from '../utils/utils.js';

export const init = async () => {
    // Get user response
    const response = await getResponse();

    // Check if the directory is already a Next.js project
    if (isNextJsProject(`./${response['app-name']}`)) {
        console.error(errorText('This directory is already a Next.js project.'));
        process.exit(1);
    }

    // Get package manager info
    const { pm, pmx, pmi } = await getPmInfo();

    // Configure Next.js
    await configureNextjs(response, pmx);

    // Configure Prettier
    await configurePrettier(response, pmi, pm);

    // Configure dependencies
    await configureDep(response, pmi);

    // Configure shadcn
    await configureShadcn(response, pmx, pm);

    // Remove Prettier (if disabled)
    finalPrettier(response, pm);

    console.log('\n' + successText('Installation of project successful!'));
};
