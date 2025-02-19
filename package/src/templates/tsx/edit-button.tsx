// @ts-nocheck

'use client';

import config from 'config';
import { FiArrowUpRight } from 'icons/fi';
import { usePathname } from 'next/navigation';

const githubRepo = config.socials.githubRepo;

const EditButton = () => {
    const pathnameNext = usePathname();
    const pathname = pathnameNext === '/' ? '/index' : pathnameNext;
    return (
        githubRepo && (
            <a
                href={`${githubRepo}/edit/main/docs${pathname}/page.mdx`}
                rel='noopener noreferrer'
                target='_blank'
                className='mb-1 flex flex-row items-center gap-1 text-sm text-base-500 transition-all duration-300 hover:underline'
            >
                Edit this page on GitHub <FiArrowUpRight />
            </a>
        )
    );
};

export default EditButton;
