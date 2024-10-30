import pc from 'picocolors';
import prompts from 'prompts';
import { configureComp } from '../config/configure-comp.js';
import { configureShadcn } from '../config/configure-shadcn.js';
import { createNewNext } from '../config/create-new-next.js';
import { installDependencies } from '../config/install-dependencies.js';
import { installPrettier } from '../config/install-prettier.js';
import { removePrettier } from '../config/remove-prettier.js';
import { getPmInfo } from '../utils/get-pm-info.js';
import { getFullResponse } from '../utils/get-response.js';
import { errorText, infoText, isDoxiumProject, isNextJsProject, successText, warningText } from '../utils/utils.js';
import { link } from './link.js';
import { update } from './update.js';

export const init = async () => {
    // Get name of the app to immediately check if it is a Next.js project
    const response_name = await prompts(
        [
            {
                type: 'text',
                name: 'app-name',
                message: `Name of your ${pc.blue('app')}:`,
                initial: 'my-app',
                validate: (value) => (value.length < 3 ? 'Name must be at least 3 characters long' : true),
            },
        ],
        {
            onCancel: () => {
                console.error(errorText('Setup cancelled.'));
                process.exit(1);
            },
        },
    );

    if (await isNextJsProject(`./${response_name['app-name']}`)) {
        if (await isDoxiumProject(`./${response_name['app-name']}`)) {
            console.log(
                '\n' +
                    warningText(
                        'Directory already contains a full Doxium project. Running `doxium update` to update components...',
                    ),
            );
            return update();
        } else {
            console.log(
                '\n' +
                    warningText(
                        'Directory already contains a Next.js project. Running `doxium link` to integrate Doxium...',
                    ),
            );
            return link();
        }
    }

    const response_full = await getFullResponse();

    const response = { ...response_name, ...response_full };

    // Get package manager info
    const { pm, pmx, pmi } = await getPmInfo();

    // Configure Next.js
    await createNewNext(response, pmx);

    // Configure Prettier
    await installPrettier();

    // Configure dependencies
    await installDependencies(pmi);

    // Configure shadcn
    await configureShadcn(response, pmx, pm);

    // Configure Components
    await configureComp(response, pm);

    // Remove Prettier (if disabled)
    await removePrettier(response, pm);

    console.log('\n' + successText('Installation of project successful!'));
    console.log(infoText('Run the following commands to start the project:'));
    console.log(pc.bold(`- cd ${pc.blue(response['app-name'])}`));
    console.log(pc.bold(`- ${pm} install`));
    console.log(pc.bold(`- ${pm} run dev / build`));

    console.log('\n' + infoText(`Recommend reading the ${pc.blue('README.md')} file for more information.`));
};
