import { BundledLanguage, BundledTheme, createHighlighter, HighlighterGeneric } from 'shiki';

class HighlighterSingleton {
    private static instance: Promise<HighlighterGeneric<BundledLanguage, BundledTheme>> | null = null;

    private constructor() {} // Prevent instantiation

    public static async getHighlighter(
        theme: BundledTheme,
    ): Promise<HighlighterGeneric<BundledLanguage, BundledTheme>> {
        if (!HighlighterSingleton.instance) {
            HighlighterSingleton.instance = createHighlighter({
                themes: [theme, 'github-dark-dimmed'],
                langs: ['ts', 'tsx', 'jsx', 'rs', 'html', 'mdx', 'bash', 'sh', 'js', 'css', 'json'],
            });
        }

        return HighlighterSingleton.instance;
    }
}

export const getHighlighterInstance = async (
    theme: BundledTheme,
): Promise<HighlighterGeneric<BundledLanguage, BundledTheme>> => {
    try {
        const highlighter = await HighlighterSingleton.getHighlighter(theme);
        return highlighter;
    } catch (error) {
        console.error('Error creating or retrieving the highlighter instance:', error);
        throw error;
    }
};

// https://dev.to/iamhectorsosa/caching-shiki-for-faster-build-times-4llb
