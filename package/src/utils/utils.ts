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
    const patterns = [`${folderPath}/{components.json,doxium.json,lib}`];
    const matches = await fg(patterns);
    return matches.length > 0;
};

export const replacePlaceholders = (
    content: string,
    response: responseT,
    componentAlias: string,
    libAlias: string,
    typesAlias: string,
) => {
    return content
        .replaceAll(/\/\/ @ts-nocheck\n/g, '')
        .replaceAll(/\$APP-NAME/g, response['app-name'])
        .replaceAll(/\$GITHUB-REPO/g, response['github-repo'])
        .replaceAll(/\$SHIKI-THEME/g, response['shiki-theme'])
        .replaceAll(/\$SHADCN-STYLE/g, response['shadcn-style'])
        .replaceAll(/\$COLOR/g, response['base-color'])
        .replaceAll(/\$ACCENT-COLOR/g, response['accent-color'])
        .replaceAll(/\$USEDOCS/g, response['use-docs'])
        .replaceAll(/\$COMPONENTS-ALIAS/g, componentAlias)
        .replaceAll(/\$LIB-ALIAS/g, libAlias)
        .replaceAll(/\$TYPES-ALIAS/g, typesAlias)
        .replaceAll(/\$TSCONFIG-COMPONENTS-ALIAS/g, componentAlias.replaceAll('@/', ''))
        .replaceAll(/\$TSCONFIG-TYPES-ALIAS/g, typesAlias.replaceAll('@/', ''))
        .replaceAll(/\$TSCONFIG-LIB-ALIAS/g, libAlias.replaceAll('@/', ''))
        .replaceAll(/\$BASE-URL/g, 'app/docs');
};

export const replaceFilePlaceholders = (
    content: string,
    componentAlias: string,
    libAlias: string,
    typesAlias: string,
) => {
    return content
        .replaceAll(/\$COMPONENTS-ALIAS/g, './' + componentAlias.replaceAll('@/', ''))
        .replaceAll(/\$LIB-ALIAS/g, './' + libAlias.replaceAll('@/', ''))
        .replaceAll(/\$TYPES-ALIAS/g, './' + typesAlias.replaceAll('@/', ''));
};