// @ts-nocheck

import DocsFolder from '$COMPONENTS-ALIAS/docs-folder';
import DocsLink from '$COMPONENTS-ALIAS/docs-link';
import { DocsNode } from '$TYPES-ALIAS';

interface SidebarProps {
    structure: DocsNode[];
}

const Sidebar = ({ structure }: SidebarProps) => {
    return (
        <div className='sticky top-24 hidden h-full w-fit min-w-[15vh] flex-shrink-0 flex-col items-start lg:flex'>
            <DocsLink name='Documentation' />
            {structure.map((v, i) => (
                <DocsFolder key={i} node={v} />
            ))}
        </div>
    );
};

export default Sidebar;
