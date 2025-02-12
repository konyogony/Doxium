'use client';

import { FiChevronLeft, FiChevronRight } from 'icons/fi';
import { flattenStructure } from 'lib/flatten-structure';
import { prettifyText } from 'lib/prettify-text';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { DocsNode } from 'types';

interface DocsNavProps {
    structure: DocsNode[];
}

const NavButtons = ({ structure }: DocsNavProps) => {
    const pathname = usePathname();

    const paths = useMemo(() => {
        const { result: flatStructure } = flattenStructure(structure);
        const currentIndex = flatStructure.findIndex((item) => item.path === pathname);

        return {
            prev: currentIndex > 0 ? flatStructure[currentIndex - 1] : null,
            next: currentIndex < flatStructure.length - 1 ? flatStructure[currentIndex + 1] : null,
        };
    }, [pathname, structure]);

    return (
        <div className='not-prose mb-4 flex w-full flex-row items-center justify-between space-x-2 py-2'>
            {paths.prev && (
                <Link href={paths.prev.path} className='flex w-fit max-w-[50%] flex-col items-end'>
                    <span className='text-sm text-base-500'>Previous</span>
                    <div className='flex max-w-full flex-row items-center text-base-300 decoration-dotted transition-all duration-200 hover:text-accent-600 hover:underline'>
                        <FiChevronLeft className='shrink-0' size={16} />
                        <span className='truncate' dir='rtl'>
                            {prettifyText(paths.prev.name)}
                        </span>
                    </div>
                </Link>
            )}
            {paths.next && (
                <Link href={paths.next.path} className='ml-auto flex w-fit max-w-[50%] flex-col items-start'>
                    <span className='text-sm text-base-500'>Next</span>
                    <div className='flex max-w-full flex-row items-center text-base-300 decoration-dotted transition-all duration-200 hover:text-accent-600 hover:underline'>
                        <span className='truncate'>{prettifyText(paths.next.name)}</span>
                        <FiChevronRight className='shrink-0' size={16} />
                    </div>
                </Link>
            )}
        </div>
    );
};

export default NavButtons;
