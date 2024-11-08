// @ts-nocheck

import fs from 'fs';
import path from 'path';
import { DoxiumConfig } from '$TYPES-ALIAS';

interface jsonDataReturn {
    repo: string;
    theme: string;
    baseUrl: string;
}

export const getJsonData = async (): Promise<jsonDataReturn> => {
    const doxiumPath = path.join(process.cwd(), 'doxium.json');
    const fileContents = fs.readFileSync(doxiumPath, 'utf8');
    const doxiumConfig: DoxiumConfig = JSON.parse(fileContents);

    const githubRepoRegex = /^https:\/\/github\.com\/[\w-]+\/[\w-]+$/;

    const rawRepo = doxiumConfig['github-repo'];
    const cleanRepo = rawRepo.replace(/\s+/g, '');
    const repo = githubRepoRegex.test(cleanRepo) ? cleanRepo : '';

    const theme = doxiumConfig['shiki-theme'];

    const baseUrl = doxiumConfig['base-url'];

    return { repo, theme, baseUrl };
};
