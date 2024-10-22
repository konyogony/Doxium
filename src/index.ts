#!/usr/bin/env node
import { program } from 'commander';
import * as packageJson from '../package.json';
import { init } from './commands/init.js';

program
    .name(packageJson.default.name)
    .description(packageJson.default.description)
    .version(packageJson.default.version);

program.command('init').description('create new Doxium app').action(init).alias('i');

program.parse(process.argv);
