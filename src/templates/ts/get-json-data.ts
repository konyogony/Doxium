// @ts-nocheck

import fs from 'fs';
import path from 'path';
import { DoxiumConfig } from '$TYPES-ALIAS';

interface jsonDataReturn {
    socials: {
        github: string;
        twitter: string;
        discord: string;
    };
    theme: string;
    baseUrl: string;
}

export const getJsonData = async (): Promise<jsonDataReturn> => {
    const doxiumPath = path.join(process.cwd(), 'doxium.json');
    const fileContents = fs.readFileSync(doxiumPath, 'utf8');
    const doxiumConfig: DoxiumConfig = JSON.parse(fileContents);

    const socials = doxiumConfig['socials'];

    const theme = doxiumConfig['shiki-theme'];

    const baseUrl = doxiumConfig['base-url'];

    return { socials, theme, baseUrl };
};
