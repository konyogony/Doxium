import fg from 'fast-glob';
import pc from 'picocolors';

export const errorText = (text: string) => pc.red('✖ ') + pc.bold(text);
export const successText = (text: string) => pc.green('✔ ') + pc.bold(text);
export const infoText = (text: string) => pc.blue('ℹ ') + pc.bold(text);

export const isNextJsProject = async (folderPath: string) => {
    const patterns = [`${folderPath}/{app,package.json,node_modules}`];
    const matches = await fg(patterns);
    return matches.length > 0;
};
