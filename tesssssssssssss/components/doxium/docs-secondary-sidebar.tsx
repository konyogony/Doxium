import { DocsEdit } from '@/components/doxium/docs-edit';
import { DocsHeadings } from '@/components/doxium/docs-headings';
import { DocsScroll } from '@/components/doxium/docs-scroll';
import { getRepoLink } from '@/lib/get-repo-link';

export const SecondarySidebar = async () => {
    const repoLink = await getRepoLink();
    return (
        <div className='sticky top-24 hidden h-fit w-fit min-w-[20vh] flex-shrink-0 flex-col items-start lg:flex'>
            <span className='py-2 text-sm font-bold text-zinc-50'>On this page</span>
            <DocsHeadings />
            <div className='my-2 h-[1px] w-3/4 bg-white/10' />
            <DocsEdit repoLink={repoLink} />
            <DocsScroll />
        </div>
    );
};
