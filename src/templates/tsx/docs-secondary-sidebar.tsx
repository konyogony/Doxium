// @ts-nocheck

import { getRepoLink } from '@/lib/get-repo-link';
import { DocsEdit } from './docs-edit';
import { DocsHeadings } from './docs-headings';
import { DocsScroll } from './docs-scroll';

export const SecondarySidebar = async () => {
    const repoLink = await getRepoLink();
    return (
        <div className='sticky top-24 hidden h-fit w-fit min-w-[20vh] flex-shrink-0 flex-col items-start lg:flex'>
            <span className='py-2 text-sm font-bold text-$COLOR-50'>On this page</span>
            <DocsHeadings />
            <div className='my-2 h-[1px] w-3/4 bg-white/10' />
            <DocsEdit repoLink={repoLink} />
            <DocsScroll />
        </div>
    );
};
