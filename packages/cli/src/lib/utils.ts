import { existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { responseT } from '@/lib/types';
import fg from 'fast-glob';
import pc from 'picocolors';

const debugTemplatesPath = (paths: string[]) => {
    console.error('Templates directory not found!');
    console.error('Attempted paths:');
    paths.forEach((path: string) => console.error(`- ${path} (exists: ${existsSync(path)})`));
};

const findTemplatesDir = () => {
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);

        const possiblePaths = [
            join(__dirname, 'templates'),
            join(__dirname, '../templates'),
            join(dirname(__dirname), 'templates'),
            join(process.cwd(), 'templates'),
            join(process.cwd(), 'node_modules/@doxium/cli/dist/templates'),
        ];

        for (const path of possiblePaths) {
            if (existsSync(path)) {
                console.log(`Found templates at: ${path}`);
                return path;
            }
        }

        debugTemplatesPath(possiblePaths);

        return join(__dirname, 'templates');
    } catch (error) {
        console.error('Error finding templates directory:', error);
        process.exit(1);
    }
};

export const templatesDir = findTemplatesDir();

const logMessage = (type: 'error' | 'success' | 'info' | 'warning', text: string) => {
    const icons = {
        error: '✖ ',
        success: '✔ ',
        info: 'ℹ ',
        warning: '⚠ ',
    };

    const colors = {
        error: pc.red,
        success: pc.green,
        info: pc.blue,
        warning: pc.yellow,
    };

    const colorText = colors[type](text);
    const icon = colors[type](icons[type]);

    const message = `${icon}${colorText}`;

    const logFunctions: Record<string, (msg: string) => void> = {
        error: console.error,
        success: console.log,
        info: console.log,
        warning: console.warn,
    };

    logFunctions[type](message);
};

export const errorText = (text: string) => logMessage('error', text);
export const successText = (text: string) => logMessage('success', text);
export const infoText = (text: string) => logMessage('info', text);
export const warningText = (text: string) => logMessage('warning', text);

export const boldText = (text: string) => console.log(pc.bold(text));

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
        errorText('Error detecting package manager:');
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

    if (!mute_output) console.log();
    if (!mute_output) successText(`Detected package manager: ${pc.blue(pm)}`);

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
