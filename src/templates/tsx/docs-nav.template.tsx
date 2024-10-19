// @ts-nocheck

'use client';

import { structure } from '@/config';
import { flattenStructure } from '@/lib/flatten-structure';
import { prettifyText } from '@/lib/prettify-text';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export const DocsNav = () => {
    const [paths, setPaths] = useState<{
        prev: { path: string; name: string } | null;
        next: { path: string; name: string } | null;
    }>({ prev: null, next: null });
    const pathname = usePathname();

    useEffect(() => {
        const { result: flatStructure } = flattenStructure(structure);
        const currentIndex = flatStructure.findIndex((item) => item.path === pathname);

        setPaths({
            prev: currentIndex > 0 ? flatStructure[currentIndex - 1] : null,
            next: currentIndex < flatStructure.length - 1 ? flatStructure[currentIndex + 1] : null,
        });
    }, [pathname]);

    return (
        <div className='not-prose flex w-full flex-row items-center'>
            {paths.prev && (
                <Link href={paths.prev.path} className='flex w-fit flex-col items-end'>
                    <span className='text-sm text-zinc-500'>Previous</span>
                    <div className='flex flex-row items-center text-zinc-300 decoration-dotted transition-all duration-200 hover:text-blue-600 hover:underline'>
                        <FiChevronLeft size={16} />
                        {prettifyText(paths.prev.name)}
                    </div>
                </Link>
            )}
            {paths.next && (
                <Link href={paths.next.path} className='ml-auto flex w-fit flex-col items-start'>
                    <span className='text-sm text-zinc-500'>Next</span>
                    <div className='flex flex-row items-center text-zinc-300 decoration-dotted transition-all duration-200 hover:text-blue-600 hover:underline'>
                        {prettifyText(paths.next.name)}
                        <FiChevronRight size={16} />
                    </div>
                </Link>
            )}
        </div>
    );
};
