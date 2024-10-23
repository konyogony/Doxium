#!/usr/bin/env node
import { program } from 'commander';
import * as packageJson from '../package.json';
import { init } from './commands/init.js';
import { link } from './commands/link.js';
import { update } from './commands/update.js';

program
    .name(packageJson.default.name)
    .description(packageJson.default.description)
    .version(packageJson.default.version);

program.command('init').description('create new Doxium app').action(init).alias('i');
program.command('update').description('update Doxium for current config').action(update).alias('u');
program.command('link').description('link Doxium to current project').action(link).alias('l');

program.parse(process.argv);
