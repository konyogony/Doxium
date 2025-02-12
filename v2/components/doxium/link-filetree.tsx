'use client';

import { prettifyText } from 'lib/prettify-text';
import { cn } from 'lib/utils';
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
                <span className={'flex w-full py-1.5 pt-3 text-sm font-bold text-base-50 transition-all duration-300'}>
                    {prettifyText(name)}
                </span>
            ) : (
                <Link
                    href={path || ''}
                    className={cn(
                        'flex w-full py-1.5 text-sm font-normal text-base-400 decoration-dotted transition-all duration-300 hover:!text-base-100 hover:underline hover:saturate-150',
                        pathname === path && 'font-medium text-accent-500',
                    )}
                >
                    {prettifyText(name)}
                </Link>
            )}
        </>
    );
};

export default LinkFiletree;
