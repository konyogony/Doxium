// @ts-nocheck

import {
    transformerNotationDiff,
    transformerNotationErrorLevel,
    transformerNotationFocus,
    transformerNotationHighlight,
    transformerNotationWordHighlight,
    transformerRemoveNotationEscape,
} from '@shikijs/transformers';
import { CopyButton } from '$COMPONENTS-ALIAS/copy-button';
import { wikiCodeWrapperIcon } from '$COMPONENTS-ALIAS/docs-code-wrapper-icon';
import { getHighlighterInstance } from '$LIB-ALIAS/highlighter';
import { isLightColor } from '$LIB-ALIAS/is-light-color';
import { cn } from '$LIB-ALIAS/utils';
import { ShikiThemeBackgroundHexDimmed } from '$TYPES-ALIAS';

interface WikiCodeWrapperProps {
    language?: string;
    children: string;
    lineNumbers?: boolean;
}

export const WikiCodeWrapper = async ({ language = '', children, lineNumbers = false }: WikiCodeWrapperProps) => {
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
        ],
    });

    const { icon: IconComponent, lang } = wikiCodeWrapperIcon({ language });
    const backgroundColor = ShikiThemeBackgroundHexDimmed[theme];
    const textColor = isLightColor(backgroundColor) ? '#393A34' : '';

    return (
        <div className='group relative w-full overflow-clip rounded-lg border border-white/15'>
            <div
                className={
                    'flex min-h-10 w-full flex-row items-center gap-2 border-b border-white/15 px-4 py-2.5 text-sm font-normal'
                }
                style={{ backgroundColor, color: textColor }}
            >
                {IconComponent}
                {lang} <CopyButton text={children} />
            </div>
            <article
                dangerouslySetInnerHTML={{ __html: highlightedCode }}
                className={cn('codeBlock customScrollbar text-sm lg:text-base', lineNumbers && 'lineNumbers')}
            />
        </div>
    );
};
