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
import { rendererRich, transformerTwoslash } from '@shikijs/twoslash';
import CodeWrapperIcon from '$COMPONENTS-ALIAS/code-wrapper-icon';
import CopyButton from '$COMPONENTS-ALIAS/copy-button';
import { getHighlighterInstance } from '$LIB-ALIAS/highlighter';
import { isLightColor } from '$LIB-ALIAS/is-light-color';
import { cn } from '$LIB-ALIAS/utils';
import { ShikiThemeBackgroundHexDimmed } from '$TYPES-ALIAS';

interface WikiCodeWrapperProps {
    language?: string;
    children: string;
    lineNumbers: boolean;
    noTopBar: boolean;
    noCopyButton: boolean;
    twoSlash: boolean;
}

const CodeWrapper = async ({
    language = '',
    children,
    lineNumbers,
    noTopBar,
    noCopyButton,
    twoSlash,
}: WikiCodeWrapperProps) => {
    const { highlighter, theme } = await getHighlighterInstance();
    const highlightedCode = highlighter.codeToHtml(children, {
        lang: language,
        theme: theme,
        transformers: [
            transformerNotationDiff(),
            transformerNotationHighlight(),
            transformerRemoveNotationEscape(),
            transformerNotationErrorLevel(),
            transformerNotationFocus(),
            transformerNotationWordHighlight(),
            transformerRemoveLineBreak(),
            twoSlash &&
                transformerTwoslash({
                    renderer: rendererRich(),
                }),
        ].filter((v) => v !== false),
    });

    const { icon: IconComponent, lang } = CodeWrapperIcon({ language });
    const backgroundColor = ShikiThemeBackgroundHexDimmed[theme];
    const textColor = isLightColor(backgroundColor) ? '#393A34' : '';
    const singleLine = children.split('\n').length === 2;

    const text = children.replace(/\/\/ \[!code [^\]]+\]/g, '');

    return (
        <div className='codeWrapper group relative my-4 w-full overflow-clip rounded-lg border border-white/15'>
            {!noTopBar && (
                <div
                    className={
                        'flex min-h-10 w-full flex-row items-center gap-2 border-b border-white/15 px-4 py-2.5 text-sm font-normal'
                    }
                    style={{ backgroundColor, color: textColor }}
                >
                    {IconComponent}
                    {lang} {!noCopyButton && <CopyButton text={text} />}
                </div>
            )}
            {noTopBar && !noCopyButton && <CopyButton singleLine={singleLine} text={text} />}
            <article
                dangerouslySetInnerHTML={{ __html: highlightedCode }}
                className={cn('codeBlock text-sm lg:text-base', lineNumbers && 'lineNumbers')}
            />
        </div>
    );
};

export default CodeWrapper;
