// @ts-nocheck

import DocsLink from '$COMPONENTS-ALIAS/docs-link';
import { DocsNode } from '$TYPES-ALIAS';

const DocsFolder = ({ node }: { node: DocsNode }) => {
    return (
        <div className='flex flex-col'>
            {node.nodes ? (
                <>
                    <DocsLink name={node.name} />
                    <div className='flex flex-col'>
                        {node.nodes.map((node) => (
                            <DocsFolder node={node} key={node.name} />
                        ))}
                    </div>
                </>
            ) : (
                <DocsLink name={node.name} path={node.path || ''} />
            )}
        </div>
    );
};

export default DocsFolder;
