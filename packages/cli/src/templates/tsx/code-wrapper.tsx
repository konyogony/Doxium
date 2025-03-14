// @ts-nocheck

import {
    transformerNotationDiff,
    transformerNotationErrorLevel,
    transformerNotationFocus,
    transformerNotationHighlight,
    transformerNotationWordHighlight,
    transformerRemoveLineBreak,
    transformerRemoveNotationEscape,
} from '@shikijs/transformers';
import { transformerTwoslash } from '@shikijs/twoslash';
import config from 'config';
import WikiCodeWrapperIcon from 'doxium/components/code-wrapper-icon';
import CopyButton from 'doxium/components/copy-button';
import { getHighlighterInstance, isLightColor } from 'doxium/lib';
import { ShikiThemeBackgroundHexDimmed } from 'doxium/types';
import { cn } from 'doxium/utils';
import { BundledTheme, ShikiTransformer } from 'shiki';

interface WikiCodeWrapperProps {
    language?: string;
    children: string;
    lineNumbers: boolean;
    noTopBar: boolean;
    noCopyButton: boolean;
    twoSlash: boolean;
    name: string | undefined;
}

const CodeWrapper = async ({
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
                    <WikiCodeWrapperIcon language={language} name={name} />
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

export default CodeWrapper;
