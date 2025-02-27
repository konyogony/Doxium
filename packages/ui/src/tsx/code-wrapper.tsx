import {
    transformerNotationDiff,
    transformerNotationErrorLevel,
    transformerNotationFocus,
    transformerNotationHighlight,
    transformerNotationWordHighlight,
    transformerRemoveLineBreak,
    transformerRemoveNotationEscape,
} from '@shikijs/transformers';
import { rendererRich, transformerTwoslash } from '@shikijs/twoslash';
import { BundledTheme, ShikiTransformer } from 'shiki';
import { getConfig, getHighlighterInstance, isLightColor } from 'ts/lib';
import { ShikiThemeBackgroundHexDimmed } from 'ts/types';
import { cn } from 'ts/utils';
import { wikiCodeWrapperIcon } from 'tsx/code-wrapper-icon';
import { CopyButton } from 'tsx/copy-button';

interface WikiCodeWrapperProps {
    language?: string;
    children: string;
    lineNumbers: boolean;
    noTopBar: boolean;
    noCopyButton: boolean;
    twoSlash: boolean;
    name: string | undefined;
}

export const CodeWrapper = async ({
    language = 'txt',
    children,
    lineNumbers,
    noTopBar,
    noCopyButton,
    twoSlash,
    name,
}: WikiCodeWrapperProps) => {
    if (!children || typeof children !== 'string') {
        console.error('Invalid code input for syntax highlighting.');
        return null;
    }

    const config = await getConfig();
    const theme = config.style.shikiTheme;

    const highlighter = await getHighlighterInstance(theme as BundledTheme);
    const highlightedCode = highlighter.codeToHtml(children, {
        lang: language,
        theme: theme,
        transformers: [
            transformerNotationDiff({ matchAlgorithm: 'v3' }),
            transformerNotationHighlight({ matchAlgorithm: 'v3' }),
            transformerRemoveNotationEscape(),
            transformerNotationErrorLevel({ matchAlgorithm: 'v3' }),
            transformerNotationFocus({ matchAlgorithm: 'v3' }),
            transformerNotationWordHighlight({ matchAlgorithm: 'v3' }),
            transformerRemoveLineBreak(),
            twoSlash && transformerTwoslash(),
        ].filter((v) => v !== undefined) as ShikiTransformer[],
    });

    const { icon: IconComponent, lang } = wikiCodeWrapperIcon({ language });
    const backgroundColor = ShikiThemeBackgroundHexDimmed[theme as keyof typeof ShikiThemeBackgroundHexDimmed];
    const textColor = isLightColor(backgroundColor) ? '#1e1e1e' : ''; // for icon

    const text = children.replace(/\/\/\s*\[!code.*?\]/g, '').trim(); // for copy button

    return (
        <div className='codeWrapper group relative my-2 w-full overflow-clip rounded-md border border-black/15 dark:border-white/10 dark:bg-none'>
            {!noTopBar && (
                <div
                    className='flex min-h-10 w-full flex-row items-center gap-2 border-b border-black/15 px-4 py-2.5 text-sm font-normal dark:border-white/15'
                    style={{ backgroundColor, color: textColor }}
                >
                    {IconComponent}
                    {name ? <span className='text-xs text-gray-950 dark:text-gray-300/80'>{name}</span> : lang}
                    {!noCopyButton && <CopyButton text={text} />}
                </div>
            )}
            {noTopBar && !noCopyButton && <CopyButton text={text} />}
            <article
                dangerouslySetInnerHTML={{ __html: highlightedCode }}
                className={cn('codeBlock text-base lg:text-lg', lineNumbers && 'lineNumbers')}
            />
        </div>
    );
};
