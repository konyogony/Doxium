#!/usr/bin/env node
import { program } from 'commander';
import * as packageJson from '../package.json';
import { init } from './commands/init.js';
import { link } from './commands/link.js';
import { update } from './commands/update.js';
import { accentColors, baseColors, shikiThemes } from './utils/types.js';

program
    .name(packageJson.default.name)
    .description(packageJson.default.description)
    .version(packageJson.default.version, '-v, --version');

program
    .command('init [name]')
    .description('create new Doxium app')
    .option('-e, --empty', 'include no wiki pages')
    .option('-s, --silent', 'mute output / silent output (uses defaults, unless specified)')
    .option('-y, --yes', 'skip all prompts and use defaults')
    .option('-l, --eslint <boolean>', 'enable eslint')
    .option('-p, --prettier <boolean>', 'enable prettier')
    .option('-d, --use-docs <boolean>', 'enable docs')
    .option('-c, --shadcn-style <string>', 'shadcn style')
    .option('-b, --base-color <string>', 'base color')
    .option('-a, --accent-color <string>', 'accent color')
    .option('-t, --shiki-theme <string>', 'shiki theme')
    .option('-g, --github-repo <string>', 'github repo')
    .action((name, options) => {
        if (options.shadcnStyle && options.shadcnStyle !== 'default' && options.shadcnStyle !== 'new-york') {
            console.error("Invalid value for --shadcn-style. Allowed values are 'default' or 'new-york'.");
            process.exit(1);
        }
        if (
            options.baseColor &&
            !baseColors.map((color) => color.toLowerCase()).includes(options.baseColor.toLowerCase())
        ) {
            console.error(`Invalid value for --base-color. Allowed values are ${baseColors.join(', ')}.`);
            process.exit(1);
        }
        if (
            options.accentColor &&
            !accentColors.map((color) => color.toLowerCase()).includes(options.accentColor.toLowerCase())
        ) {
            console.error(`Invalid value for --accent-color. Allowed values are ${accentColors.join(', ')}.`);
            process.exit(1);
        }
        if (
            options.shikiTheme &&
            !shikiThemes
                .map((color) => color.toLowerCase().replaceAll(' ', '-').replaceAll("'", '').replaceAll('é', 'e'))
                .includes(options.shikiTheme.toLowerCase())
        ) {
            console.error(
                'Invalid value for --shiki-theme. Please provide a valid theme. Refer to https://shiki.matsu.io/themes.',
            );
            process.exit(1);
        }
        if (options.githubRepo && options.githubRepo !== '' && !options.githubRepo.includes('/')) {
            console.error('Invalid value for --github-repo. Please provide a valid GitHub repository.');
            process.exit(1);
        }
        init(
            name,
            options.empty,
            options.silent,
            options.yes,
            options.eslint,
            options.prettier,
            options.useDocs,
            options.shadcnStyle,
            options.baseColor,
            options.accentColor,
            options.shikiTheme,
            options.githubRepo,
        );
    });

program.command('update').description('update Doxium using current configuration').action(update);
program.command('link').description('link Doxium to an existing project').action(link);
program
    .command('add')
    .description('add a new component')
    .action(() => console.log('add'));

program.parse(process.argv);
