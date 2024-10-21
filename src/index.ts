#!/usr/bin/env node
import { program } from 'commander';
import pc from 'picocolors';
import * as packageJson from '../package.json';
import { configureComp } from './config/configure-comp.js';
import { configureShadcn } from './config/configure-shadcn.js';
import { createNewNext } from './config/create-new-next.js';
import { installDependencies } from './config/install-dependencies.js';
import { installPrettier } from './config/install-prettier.js';
import { removePrettier } from './config/remove-prettier.js';
import { getPmInfo } from './utils/get-pm-info.js';
import { getResponse } from './utils/get-response.js';
import { errorText, infoText, isNextJsProject, successText } from './utils/utils.js';

program
    .name(packageJson.default.name)
    .description(packageJson.default.description)
    .version(packageJson.default.version);

program
    .command('init')
    .description('create new Doxium app')
    .action(async () => {
        // Get user response
        const response = await getResponse();

        // Check if the directory is already a Next.js project
        if (await isNextJsProject(`./${response['app-name']}`)) {
            console.error(errorText('This directory is already a Next.js project.'));
            process.exit(1);
        }

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
        console.log(pc.bold(`- ${pm} run dev`));

        console.log('\n' + infoText(`Recommend reading the ${pc.blue('README.md')} file for more information.`));
    })
    .alias('i');

program.parse(process.argv);
