// @ts-nocheck

import { BundledLanguage, BundledTheme, createHighlighter, HighlighterGeneric } from 'shiki';

export class CodeWrapperSingleton {
    private static instancePromise: Promise<HighlighterGeneric<BundledLanguage, BundledTheme>> | null = null;

    private static createInstance = () => {
        CodeWrapperSingleton.instancePromise = createHighlighter({
            themes: ['github-dark-dimmed'],
            langs: ['ts', 'tsx', 'jsx', 'rs', 'html', 'mdx', 'bash', 'sh', 'js', 'css'],
        })
            .then((instance) => {
                return instance;
            })
            .catch((e) => {
                console.error('Error creating highlighter instance:', e);
                CodeWrapperSingleton.instancePromise = null;
                throw e;
            });

        return CodeWrapperSingleton.instancePromise;
    };

    private constructor() {}

    public static getInstance = async () => {
        if (!CodeWrapperSingleton.instancePromise) {
            await CodeWrapperSingleton.createInstance();
        }
        return CodeWrapperSingleton.instancePromise;
    };
}

// I can change this later, but for now it's fine
