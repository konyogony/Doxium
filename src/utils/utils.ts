import fs from 'fs';
import path from 'path';

export const blueText = (text: string) => `\x1b[34m${text}\x1b[0m`;
export const boldText = (text: string) => `\x1b[1m${text}\x1b[0m`;

export const errorText = (text: string) => `\x1b[31m✖\x1b[0m ${boldText(text)}`;
export const successText = (text: string) => `\x1b[32m✔\x1b[0m ${boldText(text)}`;
export const infoText = (text: string) => `\x1b[34mℹ\x1b[0m ${boldText(text)}`;

export const isNextJsProject = (directory: string): boolean => {
    return ['app', 'package.json', 'node_modules'].every((item) => fs.existsSync(path.join(directory, item)));
};
