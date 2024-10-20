#!/usr/bin/env bun
import { help } from '../src/commands/help.js';
import { init } from '../src/commands/init.js';
import { version } from '../src/commands/version.js';

const command = process.argv[2];

switch (command) {
    case 'init':
        init();
        break;
    case '--help':
    case '-h':
        help();
        break;
    case '--version':
    case '-v':
        version();
        break;
    default:
        console.error('Unknown command. Use "init" or "--help"');
        process.exit(1);
}
