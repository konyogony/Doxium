// @ts-nocheck

import fs from 'fs';
import path from 'path';
import { DoxiumConfig } from '$TYPES-ALIAS';

export const getHightlighterTheme = async (): Promise<string> => {
    const doxiumPath = path.join(process.cwd(), 'doxium.json');
    const fileContents = fs.readFileSync(doxiumPath, 'utf8');
    const doxiumConfig: DoxiumConfig = JSON.parse(fileContents);

    return doxiumConfig['shiki-theme'];
};
