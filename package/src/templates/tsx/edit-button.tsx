// @ts-nocheck

'use client';

import config from 'config';
import { FiArrowUpRight } from 'icons/fi';
import { cn } from 'lib/utils';
import { usePathname } from 'next/navigation';

const githubRepo = config.socials.githubRepo;
const showEditInGithub = config.misc.showEditInGithub;
const linkUnderline = config.misc.linkUnderline;

const EditButton = () => {
    const pathnameNext = usePathname();
    const pathname = pathnameNext === '/' ? '/index' : pathnameNext;
    return (
        githubRepo &&
        showEditInGithub && (
            <a
                href={`${githubRepo}/edit/main/docs${pathname}/page.mdx`}
                rel='noopener noreferrer'
                target='_blank'
                className={cn(
                    'text-base-500 mb-1 flex flex-row items-center gap-1 text-sm transition-all duration-300',
                    linkUnderline ? 'hover:underline' : 'hover:text-base-900 dark:hover:text-base-50',
                )}
            >
                Edit this page on GitHub <FiArrowUpRight />
            </a>
        )
    );
};

export default EditButton;
