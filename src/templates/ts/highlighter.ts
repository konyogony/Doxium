// @ts-nocheck

import { getHightlighterTheme } from '$LIB-ALIAS/get-highlighter-theme';
import { HighlighterResult } from '$TYPES-ALIAS';
import { BundledLanguage, BundledTheme, createHighlighter, HighlighterGeneric } from 'shiki';

let highlighterInstance: HighlighterGeneric<BundledLanguage, BundledTheme> | null = null;
let currentTheme: BundledTheme | null = null;

export const getHighlighterInstance = async (): Promise<HighlighterResult> => {
    if (!highlighterInstance) {
        currentTheme = (await getHightlighterTheme()) as BundledTheme;

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
