// @ts-nocheck

import { CopyButton } from '@/components/ui/copy-button';
import { wikiCodeWrapperIcon } from '@/components/ui/docs-code-wrapper-icon';
import { CodeWrapperSingleton } from '@/lib/code-wrapper-singleton';

interface WikiCodeWrapperProps {
    language?: string;
    children: string;
}

export const WikiCodeWrapper = async ({ language = '', children }: WikiCodeWrapperProps) => {
    const instance = await CodeWrapperSingleton.getInstance();
    if (!instance) throw new Error('CodeWrapperSingleton instance is null');
    const highlightedCode = instance.codeToHtml(children, {
        lang: language,
        theme: 'github-dark-dimmed',
    });

    const { icon: IconComponent, lang } = wikiCodeWrapperIcon({ language });

    return (
        <div className='group relative w-full overflow-clip rounded-lg border border-white/15'>
            <div className='flex min-h-10 w-full flex-row items-center gap-2 border-b border-white/15 bg-[#1a1e24] px-4 py-2.5 text-sm font-normal text-zinc-200'>
                {IconComponent}
                {lang} <CopyButton text={children} />
            </div>
            <article
                dangerouslySetInnerHTML={{ __html: highlightedCode }}
                className='codeBlock customScrollbar bg-zinc-950 text-sm lg:text-base'
            />
        </div>
    );
};
