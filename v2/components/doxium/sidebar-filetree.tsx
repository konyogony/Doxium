import FolderFiletree from 'doxium/folder-filetree';
import LinkFiletree from 'doxium/link-filetree';
import { DocsNode } from 'types';

interface SidebarProps {
    structure: DocsNode[];
    separate: boolean;
}

const Sidebar = ({ structure, separate }: SidebarProps) => {
    return (
        <div className='sticky top-24 hidden h-full w-fit min-w-[15vh] flex-shrink-0 flex-col items-start lg:flex'>
            <LinkFiletree name='Documentation' />
            {structure.map((v, i) => (
                <FolderFiletree key={i} node={v} separate={separate} />
            ))}
        </div>
    );
};

export default Sidebar;
