// @ts-nocheck

'use client';

import { FiChevronLeft, FiChevronRight } from '@vertisanpro/react-icons/fi';
import { flattenStructure } from '$LIB-ALIAS/flatten-structure';
import { prettifyText } from '$LIB-ALIAS/prettify-text';
import { getStructureInstance } from '$LIB-ALIAS/structure';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

interface DocsNavProps {
    structure: ReturnType<typeof getStructureInstance>;
}

const DocsNav = ({ structure }: DocsNavProps) => {
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
        <div className='not-prose flex w-full flex-row items-center'>
            {paths.prev && (
                <Link href={paths.prev.path} className='flex w-fit flex-col items-end'>
                    <span className='text-sm text-$COLOR-500'>Previous</span>
                    <div className='flex flex-row items-center text-$COLOR-300 decoration-dotted transition-all duration-200 hover:text-$ACCENT-COLOR-600 hover:underline'>
                        <FiChevronLeft size={16} />
                        {prettifyText(paths.prev.name)}
                    </div>
                </Link>
            )}
            {paths.next && (
                <Link href={paths.next.path} className='ml-auto flex w-fit flex-col items-start'>
                    <span className='text-sm text-$COLOR-500'>Next</span>
                    <div className='flex flex-row items-center text-$COLOR-300 decoration-dotted transition-all duration-200 hover:text-$ACCENT-COLOR-600 hover:underline'>
                        {prettifyText(paths.next.name)}
                        <FiChevronRight size={16} />
                    </div>
                </Link>
            )}
        </div>
    );
};

export default DocsNav;
