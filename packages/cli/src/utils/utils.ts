import path from 'path';
import fg from 'fast-glob';
import pc from 'picocolors';
import { responseT } from './types.js';

export const errorText = (text: string) => pc.red('✖ ') + pc.bold(text);
export const successText = (text: string) => pc.green('✔ ') + pc.bold(text);
export const infoText = (text: string) => pc.blue('ℹ ') + pc.bold(text);
export const warningText = (text: string) => pc.yellow('⚠ ') + pc.bold(pc.yellow(text));

export const templatesDir = path.resolve(__dirname, '../templates');

export const isNextJsProject = async (folderPath: string) => {
    const patterns = [`${folderPath}/{app,package.json,node_modules}`];
    const matches = await fg(patterns);
    return matches.length > 0;
};

export const isDoxiumProject = async (folderPath: string) => {
    const patterns = [`${folderPath}/{doxium.config.ts,lib,next.config.mjs}`];
    const matches = await fg(patterns);
    return matches.length > 0;
};

export const replacePlaceholders = (content: string, response: responseT) => {
    return content
        .replaceAll(/\/\/ @ts-nocheck/g, '')
        .replaceAll(/\/\/@ts-nocheck/g, '')
        .replaceAll(/\$APP-NAME/g, response['app-name'])
        .replaceAll(/\$GITHUB-REPO/g, response['github-repo'])
        .replaceAll(/\$SHIKI-THEME/g, response['shiki-theme'])
        .replaceAll(/\$COLOR/g, response['base-color'])
        .replaceAll(/\$ACCENT-COLOR/g, response['accent-color'])
        .replaceAll(/\$USEDOCS/g, response['use-docs'])
        .replaceAll(/\$BASE-URL/g, response['use-docs'] ? 'app/docs' : 'app')
        .replaceAll(/\$SCHEME/g, response['color-scheme']);
};

export const getPmInfo = async (mute_output: boolean) => {
    const userAgent = process.env.npm_config_user_agent;

    if (!userAgent) {
        console.error(errorText('Error detecting package manager:'));
        process.exit(1);
    }

    const pm = (() => {
        if (userAgent.startsWith('npm/')) {
            return 'npm';
        } else if (userAgent.startsWith('yarn/')) {
            return 'yarn';
        } else if (userAgent.startsWith('pnpm/')) {
            return 'pnpm';
        } else if (userAgent.startsWith('bun/')) {
            return 'bun';
        }
        return 'npm';
    })();

    !mute_output && console.log('\n' + successText(`Detected package manager: ${pc.blue(pm)}.`));

    let pmx: string[];
    let pmi: string[];

    switch (pm) {
        case 'yarn':
            pmx = ['yarn', 'dlx'];
            pmi = ['yarn', 'add'];
            break;
        case 'bun':
            pmx = ['bunx'];
            pmi = ['bun', 'add'];
            break;
        case 'pnpm':
            pmx = ['pnpm', 'dlx'];
            pmi = ['pnpm', 'add'];
            break;
        default:
            pmx = ['npx'];
            pmi = ['npm', 'install'];
    }

    return { pm, pmx, pmi };
};
