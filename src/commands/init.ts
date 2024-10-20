import process from 'process';
import { configureComp } from '../config/configure-comp.js';
import { configureDep, finalPrettier } from '../config/configure-dep.js';
import { configureNextjs } from '../config/configure-nextjs.js';
import { configurePrettier } from '../config/configure-prettier.js';
import { configureShadcn } from '../config/configure-shadcn.js';
import { getPmInfo } from '../utils/get-pm-info.js';
import { getResponse } from '../utils/get-response.js';
import { blueText, boldText, errorText, infoText, isNextJsProject, successText } from '../utils/utils.js';

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

    // Configure Components
    await configureComp(response, pm);

    // Remove Prettier (if disabled)
    await finalPrettier(response, pm);

    console.log('\n' + successText('Installation of project successful!'));
    console.log(infoText('Run the following commands to start the project:'));
    console.log(boldText(`- cd ${blueText(response['app-name'])}`));
    console.log(boldText(`- ${pm} install`));
    console.log(boldText(`- ${pm} run dev`));

    console.log('\n' + infoText(`Recommend reading the ${blueText('README.md')} file for more information.`));
};
