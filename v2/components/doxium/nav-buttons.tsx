'use client';

import { FiChevronLeft, FiChevronRight } from 'icons/fi';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { TreeNode } from 'types';

interface DocsNavProps {
    tree: TreeNode[];
}

const NavButtons = ({ tree }: DocsNavProps) => {
    const pathname = usePathname();

    const flattenTree = useCallback((nodes: TreeNode[]): { path: string; name: string }[] => {
        return nodes.flatMap((node) => {
            if (node.type === 'file' && node.slug) {
                return [{ path: node.slug, name: node.name }];
            } else if (node.type === 'folder' && node.nodes) {
                return flattenTree(node.nodes);
            }
            return [];
        });
    }, []);

    const paths = useMemo(() => {
        const flatStructure = flattenTree(tree);
        const currentIndex = flatStructure.findIndex(
            (item: { path: string | undefined; name: string }) => item.path === pathname,
        );

        return {
            prev: currentIndex > 0 ? flatStructure[currentIndex - 1] : null,
            next: currentIndex < flatStructure.length - 1 ? flatStructure[currentIndex + 1] : null,
        };
    }, [pathname, tree, flattenTree]);

    return (
        <div className='not-prose mb-4 flex w-full flex-row items-center justify-between space-x-2 py-2'>
            {paths.prev && (
                <Link href={paths.prev.path || ''} className='flex w-fit max-w-[50%] flex-col items-end'>
                    <span className='text-sm text-base-500'>Previous</span>
                    <div className='flex max-w-full flex-row items-center text-base-300 transition-all duration-200 hover:text-accent-600 hover:underline'>
                        <FiChevronLeft className='shrink-0' size={16} />
                        <span className='truncate' dir='rtl'>
                            {paths.prev.name}
                        </span>
                    </div>
                </Link>
            )}
            {paths.next && (
                <Link href={paths.next.path || ''} className='ml-auto flex w-fit max-w-[50%] flex-col items-start'>
                    <span className='text-sm text-base-500'>Next</span>
                    <div className='flex max-w-full flex-row items-center text-base-300 transition-all duration-200 hover:text-accent-600 hover:underline'>
                        <span className='truncate'>{paths.next.name}</span>
                        <FiChevronRight className='shrink-0' size={16} />
                    </div>
                </Link>
            )}
        </div>
    );
};

export default NavButtons;
