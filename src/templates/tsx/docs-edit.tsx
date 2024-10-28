// @ts-nocheck

'use client';

import { usePathname } from 'next/navigation';
import { FiArrowUpRight } from 'react-icons/fi';

interface DocsEditProps {
    repoString: string;
}

export const DocsEdit = ({ repoString }: DocsEditProps) => {
    const pathname = usePathname();
    return (
        <>
            {repoString !== undefined && (
                <a
                    href={`${repoString}/edit/main/src/app${pathname}/page.mdx`}
                    rel='noopener noreferrer'
                    target='_blank'
                    className='hover:underline text-$COLOR-400 flex flex-row items-center gap-1 text-sm transition-all duration-300'
                >
                    Edit this page on GitHub <FiArrowUpRight />
                </a>
            )}
        </>
    );
};
