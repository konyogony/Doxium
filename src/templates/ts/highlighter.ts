// @ts-nocheck

import { getJsonData } from 'lib/get-json-data';
import { BundledLanguage, BundledTheme, createHighlighter, HighlighterGeneric } from 'shiki';
import { HighlighterResult } from 'types';

const highlighterCache = new Map<string, Promise<HighlighterGeneric<BundledLanguage, BundledTheme>>>();

export const getHighlighterInstance = async (themeKey: string = 'github-dark-dimmed'): Promise<HighlighterResult> => {
    const key = themeKey;

    // Check if there's already a cached instance for the given theme
    if (highlighterCache.has(key)) {
        const highlighterInstance = await highlighterCache.get(key);
        return {
            highlighter: highlighterInstance!,
            theme: (key as BundledTheme) || ('github-dark-dimmed' as BundledTheme),
        };
    }

    // If an instance doesn't exist, create it and store it in the cache
    const highlighterPromise = (async () => {
        const { theme } = await getJsonData();
        const currentTheme = theme as BundledTheme;

        try {
            const highlighterInstance = await createHighlighter({
                themes: [currentTheme, 'github-dark-dimmed'],
                langs: ['ts', 'tsx', 'jsx', 'rs', 'html', 'mdx', 'bash', 'sh', 'js', 'css', 'json'],
            });
            return highlighterInstance;
        } catch (e) {
            console.error('Error creating highlighter instance:', e);
            throw e;
        }
    })();

    // Store the created highlighter promise in the cache
    highlighterCache.set(key, highlighterPromise);

    // Wait for the highlighter instance and return it
    const highlighterInstance = await highlighterPromise;
    return {
        highlighter: highlighterInstance,
        theme: 'github-dark-dimmed', // Default fallback theme if theme isn't found
    };
};

// https://dev.to/iamhectorsosa/caching-shiki-for-faster-build-times-4llb
