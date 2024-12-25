// @ts-nocheck

import fs from 'fs';
import path from 'path';
import { DoxiumConfig } from 'types';

interface jsonDataReturn {
    socials: {
        'github-repo': string;
        twitter: string;
        discord: string;
    };
    theme: string;
    baseUrl: string;
    separate: boolean;
}

export const getJsonData = async (): Promise<jsonDataReturn> => {
    const doxiumPath = path.join(process.cwd(), 'doxium.json');
    const fileContents = fs.readFileSync(doxiumPath, 'utf8');
    const doxiumConfig: DoxiumConfig = JSON.parse(fileContents);

    const socials = doxiumConfig['socials'];

    const separate = doxiumConfig['misc']['separate'];

    const theme = doxiumConfig['style']['shiki-theme'];

    const baseUrl = doxiumConfig['base-url'];

    return { socials, theme, baseUrl, separate };
};
