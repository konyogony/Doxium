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
import config from 'config';
import CodeWrapperIcon from 'doxium/code-wrapper-icon';
import CopyButton from 'doxium/copy-button';
import { getHighlighterInstance, isLightColor } from 'lib/lib';
import { cn } from 'lib/utils';
import { BundledTheme, ShikiTransformer } from 'shiki';
import { ShikiThemeBackgroundHexDimmed } from 'types';

interface WikiCodeWrapperProps {
    language?: string;
    children: string;
    lineNumbers: boolean;
    noTopBar: boolean;
    noCopyButton: boolean;
    twoSlash: boolean;
    name: string | undefined;
}

const theme = config.style.shikiTheme;

const CodeWrapper = async ({
    language = '',
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

    const highlighter = await getHighlighterInstance(theme as BundledTheme);
    const highlightedCode = highlighter.codeToHtml(children, {
        lang: language,
        theme: config.style.shikiTheme,
        transformers: [
            transformerNotationDiff({ matchAlgorithm: 'v3' }),
            transformerNotationHighlight({ matchAlgorithm: 'v3' }),
            transformerRemoveNotationEscape(),
            transformerNotationErrorLevel({ matchAlgorithm: 'v3' }),
            transformerNotationFocus({ matchAlgorithm: 'v3' }),
            transformerNotationWordHighlight({ matchAlgorithm: 'v3' }),
            transformerRemoveLineBreak(),
            twoSlash &&
                transformerTwoslash({
                    renderer: rendererRich(),
                }),
        ].filter((v) => v !== undefined) as ShikiTransformer[],
    });

    const { icon: IconComponent, lang } = CodeWrapperIcon({ language });
    const backgroundColor = ShikiThemeBackgroundHexDimmed[theme as keyof typeof ShikiThemeBackgroundHexDimmed];
    const textColor = isLightColor(backgroundColor) ? '#1e1e1e' : ''; // for icon

    const text = children.replace(/\/\/\s*\[!code.*?\]/g, '').trim();

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

export default CodeWrapper;
