// @ts-nocheck

'use client';

import { usePathname } from 'next/navigation';
import { FiArrowUpRight } from 'react-icons/fi';

interface DocsEditProps {
    repoLink: string;
}

export const DocsEdit = ({ repoLink }: DocsEditProps) => {
    const pathname = usePathname();
    return (
        <>
            {repoLink !== undefined && (
                <a
                    href={`${repoLink}/edit/main/src/app${pathname}/page.mdx`}
                    rel='noopener noreferrer'
                    target='_blank'
                    className='hover:saturation-150 hover:text-$ACCENT-COLOR-400 text-$COLOR-400 flex flex-row items-center gap-1 text-sm transition-all duration-300'
                >
                    Edit this page on GitHub <FiArrowUpRight />
                </a>
            )}
        </>
    );
};
