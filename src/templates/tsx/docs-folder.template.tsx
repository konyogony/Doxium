// @ts-nocheck

import { DocsLink } from '@/components/doxium/docs-link';
import { DocsNode } from '@/types';

export const DocsFolder = ({ node }: { node: DocsNode }) => {
    return (
        <div className='flex flex-col'>
            {node.nodes ? (
                <>
                    <DocsLink name={node.name} title={true} />
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
