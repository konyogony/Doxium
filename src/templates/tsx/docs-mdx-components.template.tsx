// @ts-nocheck

import { WikiCodeWrapper } from '@/components/doxium/docs-code-wrapper';
import { WikiHashTag } from '@/components/doxium/docs-hashtag';

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
    code: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
        return (
            <span
                {...props}
                className='bg-$COLOR-800 text-$COLOR-50 mx-0.5 my-2 rounded-[3.5px] px-1.5 py-1 font-[Consolas] text-sm font-semibold'
            >
                <span className='not-prose'>{children}</span>
            </span>
        );
    },
    pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => {
        const codeElement = children as React.ReactElement<React.PropsWithChildren<{ className: string }>>;
        const language = codeElement.props.className?.replace('language-', '') || '';
        return (
            <WikiCodeWrapper language={language} {...props}>
                {codeElement.props.children as string}
            </WikiCodeWrapper>
        );
    },
    blockquote: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => {
        return (
            <span
                className={
                    'border-$COLOR-600 text-$COLOR-100 my-2 flex border-l-2 py-2.5 pl-4 text-base font-semibold italic'
                }
                {...props}
            >
                <span className='not-prose'>{children}</span>
            </span>
        );
    },
};