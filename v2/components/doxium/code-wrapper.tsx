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
import { isLightColor } from 'lib/is-light-color';
import { getHighlighterInstance } from 'lib/lib';
import { cn } from 'lib/utils';
import { BundledTheme } from 'shiki';
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
    const highlighter = await getHighlighterInstance(theme as BundledTheme);
    const highlightedCode = highlighter.codeToHtml(children, {
        lang: language,
        theme: 'github-dark-dimmed',
        transformers: [
            transformerNotationDiff({
                matchAlgorithm: 'v3',
            }),
            transformerNotationHighlight({
                matchAlgorithm: 'v3',
            }),
            transformerRemoveNotationEscape(),
            transformerNotationErrorLevel({
                matchAlgorithm: 'v3',
            }),
            transformerNotationFocus({
                matchAlgorithm: 'v3',
            }),
            transformerNotationWordHighlight({
                matchAlgorithm: 'v3',
            }),
            transformerRemoveLineBreak(),
            twoSlash &&
                transformerTwoslash({
                    renderer: rendererRich(),
                }),
        ].filter((v) => v !== false),
    });

    const { icon: IconComponent, lang } = CodeWrapperIcon({ language });
    const backgroundColor = ShikiThemeBackgroundHexDimmed[theme as keyof typeof ShikiThemeBackgroundHexDimmed];
    const textColor = isLightColor(backgroundColor) ? '#393A34' : '';

    const text = children.replace(/\/\/\s*\[!code.*?\]/g, '').trim();

    // TODO: Control roundes
    return (
        <div className='codeWrapper group relative my-4 w-full overflow-clip rounded-md border border-white/15'>
            {!noTopBar && (
                <div
                    className={
                        'flex min-h-10 w-full flex-row items-center gap-2 border-b border-white/15 px-4 py-2.5 text-sm font-normal'
                    }
                    style={{ backgroundColor, color: textColor }}
                >
                    {IconComponent}
                    {name ? <span className='text-xs text-gray-300/80'>{name}</span> : lang}{' '}
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
