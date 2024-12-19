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

export const init = async (
    name: string,
    empty: boolean,
    mute_output: boolean,
    skip_prompt: boolean,
    eslint: boolean,
    prettier: boolean,
    useDocs: boolean,
    shadcnStyle: 'default' | 'new-york',
    baseColor: string,
    accentColor: string,
    shikiTheme: string,
    githubRepo: string,
    typesAlias: string,
    libAlias: string,
    componentsAlias: string,
    directory: string,
) => {
    let response_name: prompts.Answers<'app-name'>;
    let response_full: prompts.Answers<
        | 'eslint'
        | 'prettier'
        | 'use-docs'
        | 'shadcn-style'
        | 'base-color'
        | 'accent-color'
        | 'shiki-theme'
        | 'github-repo'
        | 'proceed'
    >;

    if (name) {
        if (/[A-Z]/.test(name)) {
            console.error(errorText('Name must not contain uppercase letters, due to NPM rules'));
            process.exit(1);
        }
        response_name = { 'app-name': name };
    } else if (skip_prompt || mute_output) {
        response_name = { 'app-name': 'my-app' };
    } else {
        response_name = await prompts(
            [
                {
                    type: 'text',
                    name: 'app-name',
                    message: `Name of your ${pc.blue('app')}:`,
                    initial: 'my-app',
                    validate: (value) => {
                        if (/[A-Z]/.test(value)) {
                            return 'Name must not contain uppercase letters, due to NPM rules';
                        }
                        return true;
                    },
                },
            ],
            {
                onCancel: () => {
                    console.error(errorText('Setup cancelled.'));
                    process.exit(1);
                },
            },
        );
    }

    if (await isNextJsProject(`./${directory && directory.replaceAll('./', '') + '/'}${response_name['app-name']}`)) {
        if (
            await isDoxiumProject(`./${directory && directory.replaceAll('./', '') + '/'}${response_name['app-name']}`)
        ) {
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

    if (skip_prompt || mute_output) {
        response_full = {
            eslint: eslint ?? true,
            prettier: prettier ?? true,
            'use-docs': useDocs ?? true,
            'shadcn-style': shadcnStyle ?? 'new-york',
            'base-color': baseColor ?? 'zinc',
            'accent-color': accentColor ?? 'blue',
            'shiki-theme': shikiTheme ?? 'github-dark-dimmed',
            'github-repo': githubRepo ?? '',
            proceed: true,
        };
    } else {
        response_full = await getFullResponse(
            eslint,
            prettier,
            useDocs,
            shadcnStyle,
            baseColor,
            accentColor,
            shikiTheme,
            githubRepo,
        );
    }

    const response = { ...response_name, ...response_full };

    // Get package manager info
    const { pm, pmx, pmi } = await getPmInfo(mute_output);

    // Configure Next.js
    await createNewNext(response, pmx, mute_output, directory);

    // Configure Prettier
    await installPrettier();

    // Configure dependencies
    await installDependencies(pmi, mute_output);

    // Configure shadcn
    await configureShadcn(response, pmx, pm, mute_output, typesAlias, libAlias, componentsAlias);

    // Configure Components
    await configureComp(response, pm, empty, mute_output, typesAlias, libAlias, componentsAlias);

    // Remove Prettier (if disabled)
    await removePrettier(response, pm, mute_output);

    !mute_output && console.log('\n' + successText('Installation of project successful!'));
    !mute_output && console.log(infoText('Run the following commands to start the project:'));
    !mute_output && console.log(pc.bold(`- cd ${pc.blue(response['app-name'])}`));
    !mute_output && console.log(pc.bold(`- ${pm} install`));
    !mute_output && console.log(pc.bold(`- ${pm} run dev / build`));

    !mute_output &&
        console.log('\n' + infoText(`Recommend reading the ${pc.blue('README.md')} file for more information.`));
};
