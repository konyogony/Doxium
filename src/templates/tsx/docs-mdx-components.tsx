// @ts-nocheck

import CodeWrapper from '$COMPONENTS-ALIAS/code-wrapper';
import HashtagButton from '$COMPONENTS-ALIAS/hashtag-button';
import { getJsonData } from '$LIB-ALIAS/get-json-data';
import { cn } from '$LIB-ALIAS/utils';
import { preProps, ShikiThemeBackgroundHexDefault } from '$TYPES-ALIAS';
import { BundledTheme } from 'shiki';

const mdxComponents = {
    h1: ({ children }: React.HTMLAttributes<HTMLHeadingElement>) => {
        const id = children
            ?.toString()
            .trim()
            .toLocaleLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\p{L}\p{N}-]/gu, '')
            .replace(/\./g, '');
        return (
            <HashtagButton id={id} variant='h1'>
                {children}
            </HashtagButton>
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
            <HashtagButton id={id} variant='h2'>
                {children}
            </HashtagButton>
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
            <HashtagButton id={id} variant='h3'>
                {children}
            </HashtagButton>
        );
    },
    code: async ({ children }: React.HTMLAttributes<HTMLUnknownElement>) => {
        const { theme } = await getJsonData();
        const currentTheme = theme as BundledTheme;
        const color = ShikiThemeBackgroundHexDefault[currentTheme];
        const long = children ? children.toString().split('').length > 75 : false;
        return (
            <span
                className={cn(
                    'mx-0.5 my-2 rounded-[3.5px] border border-white/5 px-1.5 py-0.5 text-sm font-semibold text-$COLOR-50',
                    long ? 'whitespace-pre-wrap' : 'whitespace-nowrap',
                )}
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
        const twoSlash: boolean = (props as preProps).twoSlash || false;
        const name: string | undefined = (props as preProps).name || undefined;
        return (
            <CodeWrapper
                language={language}
                lineNumbers={lineNumbers}
                noTopBar={noTopBar}
                noCopyButton={noCopyButton}
                twoSlash={twoSlash}
                name={name}
            >
                {codeElement.props.children as string}
            </CodeWrapper>
        );
    },
    blockquote: ({ children }: React.HTMLAttributes<HTMLElement>) => {
        return (
            <span
                className={
                    'my-2 flex border-l-2 border-$COLOR-600 py-2.5 pl-4 text-sm md:text-base font-light italic text-$COLOR-400'
                }
            >
                <span className='not-prose'>{children}</span>
            </span>
        );
    },
};

export default mdxComponents;
