// @ts-nocheck

import fs from 'fs';
import path from 'path';
import { DoxiumConfig } from '$TYPES-ALIAS';

export const getRepoLink = async (): Promise<string> => {
    const doxiumPath = path.join(process.cwd(), 'doxium.json');
    const fileContents = fs.readFileSync(doxiumPath, 'utf8');
    const doxiumConfig: DoxiumConfig = JSON.parse(fileContents);

    console.log('called getRepoLink');

    const githubRepoRegex = /^https:\/\/github\.com\/[\w-]+\/[\w-]+$/;

    const rawRepo = doxiumConfig['github-repo'];
    const cleanRepo = rawRepo.replace(/\s+/g, '');

    return githubRepoRegex.test(cleanRepo) ? cleanRepo : '';
};
