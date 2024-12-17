// @ts-nocheck

import LinkFiletree from '$COMPONENTS-ALIAS/link-filetree';
import { DocsNode } from '$TYPES-ALIAS';

const FolderFiletree = ({ node }: { node: DocsNode }) => {
    return (
        <div className='flex flex-col'>
            {node.nodes ? (
                <>
                    <LinkFiletree name={node.name} />
                    <div className='flex flex-col'>
                        {node.nodes.map((node) => (
                            <FolderFiletree node={node} key={node.name} />
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
