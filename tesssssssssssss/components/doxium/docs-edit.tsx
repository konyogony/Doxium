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
                    className='flex flex-row items-center gap-1 text-sm text-zinc-400 hover:text-blue-200'
                >
                    Edit this page on GitHub <FiArrowUpRight />
                </a>
            )}
        </>
    );
};