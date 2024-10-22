// @ts-nocheck

import { CopyButton } from '@/components/doxium/copy-button';
import { wikiCodeWrapperIcon } from '@/components/doxium/docs-code-wrapper-icon';
import { getHighlighterInstance } from '@/lib/highlighter';
import { isLightColor } from '@/lib/is-light-color';
import { ShikiThemeBackgroundHexDimmed } from '@/types';

interface WikiCodeWrapperProps {
    language?: string;
    children: string;
}

export const WikiCodeWrapper = async ({ language = '', children }: WikiCodeWrapperProps) => {
    const { highlighter, theme } = await getHighlighterInstance();
    const highlightedCode = highlighter.codeToHtml(children, {
        lang: language,
        theme: theme,
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
                className='codeBlock customScrollbar text-sm lg:text-base'
            />
        </div>
    );
};
