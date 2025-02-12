'use client';

import { FiArrowUpRight } from 'icons/fi';
import { usePathname } from 'next/navigation';

interface DocsEditProps {
    repoString: string;
}

const EditButton = ({ repoString }: DocsEditProps) => {
    const pathname = usePathname();
    return (
        <>
            {repoString && (
                <a
                    href={`${repoString}/edit/main/src/app${pathname}/page.mdx`}
                    rel='noopener noreferrer'
                    target='_blank'
                    className='flex flex-row items-center gap-1 text-sm text-base-400 transition-all duration-300 hover:underline'
                >
                    Edit this page on GitHub <FiArrowUpRight />
                </a>
            )}
        </>
    );
};

export default EditButton;
