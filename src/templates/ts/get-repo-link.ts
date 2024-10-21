// @ts-nocheck

import fs from 'fs';
import path from 'path';
import { DoxiumConfig } from '@/types';

export const getRepoLink = async (): Promise<string> => {
    const doxiumPath = path.join(process.cwd(), 'doxium.json');
    const fileContents = fs.readFileSync(doxiumPath, 'utf8');
    const doxiumConfig: DoxiumConfig = JSON.parse(fileContents);

    console.log('called getRepoLink');

    return doxiumConfig['github-repo'];
};
