#!/usr/bin/env node
import { readFileSync } from 'fs';
import { join } from 'path';
import { init } from '@/commands/init';
import { link } from '@/commands/link';
import { update } from '@/commands/update';
import { accentColors, baseColors, colorSchemes, shikiThemes } from '@/lib/types';
import { program } from 'commander';
import pc from 'picocolors';

const packageJson = JSON.parse(readFileSync(join(import.meta.dirname, '../package.json'), 'utf8'));

console.log(pc.bold(pc.italic(pc.gray(`@doxium/cli v${packageJson.version} \n`))));

program.name(packageJson.name).description(packageJson.description).version(packageJson.version, '-v, --version');

program
    .command('init [name]')
    .description('create new Doxium app')
    .option('-e, --empty', 'include no pre-built wiki pages')
    .option('-s, --silent', 'mute output / silent output (uses defaults, unless specified)')
    .option('-y, --yes', 'skip all prompts and use default values')
    .option('-l, --eslint <boolean>', 'enable eslint')
    .option('-p, --prettier <boolean>', 'enable prettier')
    .option('-u, --use-docs <boolean>', 'use the /docs folder')
    .option('-b, --base-color <string>', 'base color')
    .option('-a, --accent-color <string>', 'accent color')
    .option('-t, --shiki-theme <string>', 'shiki theme')
    .option('-g, --github-repo <string>', 'github repo')
    .option('-d, --directory <string>', 'change the working directory')
    .option('-h, --color-scheme <string>', 'color scheme')
    .action((name, options) => {
        // TODO: Make this look better
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
            options.colorScheme &&
            !colorSchemes.map((color) => color.toLowerCase()).includes(options.colorScheme.toLowerCase())
        ) {
            console.error(`Invalid value for --color-scheme. Allowed values are ${accentColors.join(', ')}.`);
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
        const directoryPattern = /^\.\.?(\/?[^/]+)*\/?$/;
        if (options.directory) {
            if (!directoryPattern.test(options.directory)) {
                console.error(
                    'Invalid value for --directory. It should be a relative path starting with "./" and ending without the "/".',
                );
                process.exit(1);
            }
        }

        init(
            name,
            options.empty,
            options.silent,
            options.yes,
            options.eslint,
            options.prettier,
            options.useDocs,
            options.baseColor,
            options.accentColor,
            options.shikiTheme,
            options.githubRepo,
            options.directory,
            options.colorScheme,
        );
    });

program
    .command('update')
    .description('update Doxium using current configuration')
    .option('-s, --silent', 'mute output / silent output (uses defaults, unless specified)')
    .action((options) => {
        update(options.silent);
    });

program.command('link').description('link Doxium to an existing project').action(link);

program
    .command('add')
    .description('add a new component')
    .action(() => console.log('add'));

program.parse(process.argv);
