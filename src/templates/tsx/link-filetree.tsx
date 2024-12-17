// @ts-nocheck

'use client';

import { prettifyText } from '$LIB-ALIAS/prettify-text';
import { cn } from '$LIB-ALIAS/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface WikiLinkProps {
    name: string;
    path?: string;
}

const LinkFiletree = ({ name, path }: WikiLinkProps) => {
    const pathname = usePathname();

    return (
        <>
            {!path ? (
                <span
                    className={'flex w-full py-1.5 pt-3 text-sm font-bold text-$COLOR-50 transition-all duration-300'}
                >
                    {prettifyText(name)}
                </span>
            ) : (
                <Link
                    href={path || ''}
                    className={cn(
                        'flex w-full py-1.5 text-sm font-normal text-$COLOR-400 decoration-dotted hover:saturate-150 transition-all duration-300 hover:!text-$COLOR-100 hover:underline',
                        pathname === path && 'font-medium text-$ACCENT-COLOR-500',
                    )}
                >
                    {prettifyText(name)}
                </Link>
            )}
        </>
    );
};

export default LinkFiletree;
