import dynamic from 'next/dynamic';
import { getConfig } from 'server/lib';
import { TreeNode } from 'server/types';

interface SidebarProps {
    tree: TreeNode[];
}

const DocLink = dynamic(() => import('client/filetree-navigation').then((mod) => mod.DocLink));
const FiletreeNavigation = dynamic(() => import('client/filetree-navigation').then((mod) => mod.FiletreeNavigation));

export const Sidebar = async ({ tree }: SidebarProps) => {
    const config = await getConfig();
    const separate = config.misc.separate;
    const rootTitle = config.rootTitle;
    return (
        <div className='sticky top-24 hidden h-full w-fit min-w-[15vh] shrink-0 flex-col items-start lg:flex'>
            <DocLink name={rootTitle} isFirstNode={true} isRootTitle={true} />
            <FiletreeNavigation tree={tree} separate={separate} />
        </div>
    );
};
