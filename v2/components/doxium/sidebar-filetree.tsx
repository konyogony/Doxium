import { TreeNode } from '@/types';
import config from 'config';
import { DocLink, Filetree } from 'doxium/filetree-navigation';

const separate = config.misc.separate;
const rootTitle = config.rootTitle;

interface SidebarProps {
    tree: TreeNode[];
}

const Sidebar = ({ tree }: SidebarProps) => {
    return (
        <div className='sticky top-24 hidden h-full w-fit min-w-[15vh] flex-shrink-0 flex-col items-start lg:flex'>
            <DocLink name={rootTitle} isFirstNode={true} />
            <Filetree tree={tree} separate={separate} />
        </div>
    );
};

export default Sidebar;
