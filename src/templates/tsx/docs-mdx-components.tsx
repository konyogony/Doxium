// @ts-nocheck

import { preProps } from '@/types';
import { WikiCodeWrapper } from '$COMPONENTS-ALIAS/docs-code-wrapper';
import { WikiHashTag } from '$COMPONENTS-ALIAS/docs-hashtag';

export const mdxComponents = {
    h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
        const id = children
            ?.toString()
            .trim()
            .toLocaleLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\p{L}\p{N}-]/gu, '')
            .replace(/\./g, '');
        return (
            <h1 className={'group text-4xl'} {...props} id={id}>
                {children} <WikiHashTag id={id ?? ''} />
            </h1>
        );
    },
    h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
        const id = children
            ?.toString()
            .trim()
            .toLocaleLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\p{L}\p{N}-]/gu, '')
            .replace(/\./g, '');
        return (
            <h2 className={'group text-2xl'} {...props} id={id}>
                {children} <WikiHashTag id={id ?? ''} variant='h2' />
            </h2>
        );
    },
    h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
        const id = children
            ?.toString()
            .trim()
            .toLocaleLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\p{L}\p{N}-]/gu, '')
            .replace(/\./g, '');
        return (
            <h3 className={'group text-xl'} {...props} id={id}>
                {children} <WikiHashTag id={id ?? ''} variant='h3' />
            </h3>
        );
    },
    code: ({ children, ...props }: React.HTMLAttributes<HTMLUnknownElement>) => {
        return (
            <span
                {...props}
                className='mx-0.5 my-2 rounded-[3.5px] bg-$COLOR-800 px-1.5 py-1 text-sm font-semibold text-$COLOR-50'
            >
                <span className='not-prose font-mono'>{children}</span>
            </span>
        );
    },
    pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => {
        const codeElement = children as React.ReactElement<React.PropsWithChildren<{ className: string }>>;
        const language = codeElement.props.className?.replace('language-', '') || '';
        const lineNumbers: boolean = (props as preProps).lineNumbers || false;
        return (
            <WikiCodeWrapper language={language} lineNumbers={lineNumbers} {...props}>
                {codeElement.props.children as string}
            </WikiCodeWrapper>
        );
    },
    blockquote: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => {
        return (
            <span
                className={
                    'my-2 flex border-l-2 border-$COLOR-600 py-2.5 pl-4 text-base font-semibold italic text-$COLOR-100'
                }
                {...props}
            >
                <span className='not-prose'>{children}</span>
            </span>
        );
    },
};
