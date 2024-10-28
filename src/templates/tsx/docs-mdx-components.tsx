// @ts-nocheck

import { WikiCodeWrapper } from '$COMPONENTS-ALIAS/docs-code-wrapper';
import { WikiHashTag } from '$COMPONENTS-ALIAS/docs-hashtag';
import { getHightlighterTheme } from '$LIB-ALIAS/get-highlighter-theme';
import { preProps, ShikiThemeBackgroundHexDefault } from '$TYPES-ALIAS';
import { BundledTheme } from 'shiki';

export const mdxComponents = {
    h1: ({ children }: React.HTMLAttributes<HTMLHeadingElement>) => {
        const id = children
            ?.toString()
            .trim()
            .toLocaleLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\p{L}\p{N}-]/gu, '')
            .replace(/\./g, '');
        return (
            <h1 className={'group text-4xl'} id={id}>
                {children} <WikiHashTag id={id ?? ''} />
            </h1>
        );
    },
    h2: ({ children }: React.HTMLAttributes<HTMLHeadingElement>) => {
        const id = children
            ?.toString()
            .trim()
            .toLocaleLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\p{L}\p{N}-]/gu, '')
            .replace(/\./g, '');
        return (
            <h2 className={'group text-2xl'} id={id}>
                {children} <WikiHashTag id={id ?? ''} variant='h2' />
            </h2>
        );
    },
    h3: ({ children }: React.HTMLAttributes<HTMLHeadingElement>) => {
        const id = children
            ?.toString()
            .trim()
            .toLocaleLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\p{L}\p{N}-]/gu, '')
            .replace(/\./g, '');
        return (
            <h3 className={'group text-xl'} id={id}>
                {children} <WikiHashTag id={id ?? ''} variant='h3' />
            </h3>
        );
    },
    code: async ({ children }: React.HTMLAttributes<HTMLUnknownElement>) => {
        const currentTheme = (await getHightlighterTheme()) as BundledTheme;
        const color = ShikiThemeBackgroundHexDefault[currentTheme];
        return (
            <span
                className='mx-0.5 my-2 rounded-[3.5px] border border-white/5 px-1.5 py-0.5 text-sm font-semibold text-$COLOR-50'
                style={{ background: color }}
            >
                <span className='not-prose font-mono'>{children}</span>
            </span>
        );
    },
    pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => {
        const codeElement = children as React.ReactElement<React.PropsWithChildren<{ className: string }>>;
        const language = codeElement.props.className?.replace('language-', '') || '';
        const lineNumbers: boolean = (props as preProps).lineNumbers || false;
        const noTopBar: boolean = (props as preProps).noTopBar || false;
        const noCopyButton: boolean = (props as preProps).noCopyButton || false;
        return (
            <WikiCodeWrapper
                language={language}
                lineNumbers={lineNumbers}
                noTopBar={noTopBar}
                noCopyButton={noCopyButton}
            >
                {codeElement.props.children as string}
            </WikiCodeWrapper>
        );
    },
    blockquote: ({ children }: React.HTMLAttributes<HTMLElement>) => {
        return (
            <span
                className={
                    'my-2 flex border-l-2 border-$COLOR-600 py-2.5 pl-4 text-base font-semibold italic text-$COLOR-100'
                }
            >
                <span className='not-prose'>{children}</span>
            </span>
        );
    },
};
