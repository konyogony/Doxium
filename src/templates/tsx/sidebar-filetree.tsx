// @ts-nocheck

import FolderFiletree from '$COMPONENTS-ALIAS/folder-filetree';
import LinkFiletree from '$COMPONENTS-ALIAS/link-filetree';
import { DocsNode } from '$TYPES-ALIAS';

interface SidebarProps {
    structure: DocsNode[];
}

const Sidebar = ({ structure }: SidebarProps) => {
    return (
        <div className='sticky top-24 hidden h-full w-fit min-w-[15vh] flex-shrink-0 flex-col items-start lg:flex'>
            <LinkFiletree name='Documentation' />
            {structure.map((v, i) => (
                <FolderFiletree key={i} node={v} />
            ))}
        </div>
    );
};

export default Sidebar;
