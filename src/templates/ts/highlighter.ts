// @ts-nocheck

import fs from 'fs';
import path from 'path';
import { DoxiumConfig, HighlighterResult } from '@/types';
import { BundledLanguage, BundledTheme, createHighlighter, HighlighterGeneric } from 'shiki';

let highlighterInstance: HighlighterGeneric<BundledLanguage, BundledTheme> | null = null;
let currentTheme: BundledTheme | null = null;

export const getHighlighterInstance = async (): Promise<HighlighterResult> => {
    if (!highlighterInstance) {
        const doxiumPath = path.join(process.cwd(), 'doxium.json');
        const fileContents = fs.readFileSync(doxiumPath, 'utf8');
        const doxiumConfig: DoxiumConfig = JSON.parse(fileContents);

        currentTheme = doxiumConfig['shiki-theme'] as BundledTheme;

        try {
            highlighterInstance = await createHighlighter({
                themes: [currentTheme, 'github-dark-dimmed'],
                langs: ['ts', 'tsx', 'jsx', 'rs', 'html', 'mdx', 'bash', 'sh', 'js', 'css', 'json'],
            });
        } catch (e) {
            console.error('Error creating highlighter instance:', e);
            throw e;
        }
    }

    return {
        highlighter: highlighterInstance,
        theme: currentTheme || 'github-dark-dimmed',
    };
};
