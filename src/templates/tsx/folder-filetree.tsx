// @ts-nocheck

import LinkFiletree from '$COMPONENTS-ALIAS/link-filetree';
import { DocsNode } from '$TYPES-ALIAS';

interface FolderFiletreeProps {
    node: DocsNode;
    separate: boolean;
}

const FolderFiletree = ({ node, separate }: FolderFiletreeProps) => {
    return (
        <div className='flex flex-col'>
            {node.nodes ? (
                <>
                    {separate && <div className='my-2 w-[10em] h-[1px] bg-white/15' />}
                    <LinkFiletree name={node.name} />
                    <div className='flex flex-col'>
                        {node.nodes.map((node) => (
                            <FolderFiletree node={node} key={node.name} separate={separate} />
                        ))}
                    </div>
                </>
            ) : (
                <LinkFiletree name={node.name} path={node.path || ''} />
            )}
        </div>
    );
};

export default FolderFiletree;
