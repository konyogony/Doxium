import { DocLink, FiletreeNavigation } from 'client/filetree-navigation';
import { getConfig } from 'server/lib';
import { TreeNode } from 'server/types';

interface SidebarProps {
    tree: TreeNode[];
}

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
