// @ts-nocheck

'use client';

import { prettifyText } from '@/lib/prettify-text';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface WikiLinkProps {
    name: string;
    path?: string;
    title?: boolean;
}

export const DocsLink = ({ name, path, title = false }: WikiLinkProps) => {
    const pathname = usePathname();

    return (
        <>
            {title ? (
                <span
                    className={'text-$COLOR-50 flex w-full py-1.5 pt-3 text-sm font-bold transition-all duration-300'}
                >
                    {prettifyText(name)}
                </span>
            ) : (
                <Link
                    href={path || ''}
                    className={cn(
                        'text-$COLOR-400 flex w-full py-1.5 text-sm decoration-dotted font-normal transition-all duration-300 hover:underline',
                        pathname === path && 'text-$COLOR-300 font-medium',
                    )}
                >
                    {prettifyText(name)}
                </Link>
            )}
        </>
    );
};
