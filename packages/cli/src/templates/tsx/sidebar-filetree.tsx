// @ts-nocheck

import config from 'config';
import { DocLink, FiletreeNavigation } from 'doxium/components/filetree-navigation';
import { TreeNode } from 'doxium/types';

interface SidebarProps {
    tree: TreeNode[];
}

const separate = config.misc.separate;
const rootTitle = config.rootTitle;

export const Sidebar = ({ tree }: SidebarProps) => {
    return (
        <div className='sticky top-24 hidden h-full w-fit min-w-[15vh] shrink-0 flex-col items-start lg:flex'>
            <DocLink name={rootTitle} isFirstNode={true} isRootTitle={true} />
            <FiletreeNavigation tree={tree} separate={separate} />
        </div>
    );
};
