// @ts-nocheck

import DocsEdit from '$COMPONENTS-ALIAS/docs-edit';
import DocsHeadings from '$COMPONENTS-ALIAS/docs-headings';
import DocsScroll from '$COMPONENTS-ALIAS/docs-scroll';

interface SecondarySidebarProps {
    repoString: string;
}

const SecondarySidebar = ({ repoString }: SecondarySidebarProps) => {
    return (
        <div className='sticky top-24 hidden h-fit w-fit min-w-[20vh] flex-shrink-0 flex-col items-start lg:flex'>
            <span className='py-2 text-sm font-bold text-$COLOR-50'>On this page</span>
            <DocsHeadings />
            <div className='my-2 h-[1px] w-3/4 bg-white/10' />
            <DocsEdit repoString={repoString} />
            <DocsScroll />
        </div>
    );
};

export default SecondarySidebar;
