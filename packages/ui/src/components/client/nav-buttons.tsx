'use client';

import { FiChevronLeft, FiChevronRight } from '@vertisanpro/react-icons/fi';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { getConfig } from 'server/lib';
import { TreeNode } from 'server/types';
import { cn } from 'server/utils';

interface DocsNavProps {
    tree: TreeNode[];
}

export const NavButtons = async ({ tree }: DocsNavProps) => {
    const config = await getConfig();
    const linkUnderline = config.misc.linkUnderline;
    const pathnameNext = usePathname();
    const pathname = pathnameNext === '/' ? '/index' : pathnameNext;

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
                    <span className='text-base-800 dark:text-base-500 text-sm'>Previous</span>
                    <div
                        className={cn(
                            'text-base-950 hover:text-accent-600 dark:text-base-300 flex max-w-full flex-row items-center transition-all duration-200',
                            linkUnderline && 'hover:underline',
                        )}
                    >
                        <FiChevronLeft className='shrink-0' size={16} />
                        <span className='truncate' dir='rtl'>
                            {paths.prev.name}
                        </span>
                    </div>
                </Link>
            )}
            {paths.next && (
                <Link href={paths.next.path || ''} className='ml-auto flex w-fit max-w-[50%] flex-col items-start'>
                    <span className='text-base-800 dark:text-base-500 text-sm'>Next</span>
                    <div
                        className={cn(
                            'text-base-950 hover:text-accent-600 dark:text-base-300 flex max-w-full flex-row items-center transition-all duration-200',
                            linkUnderline && 'hover:underline',
                        )}
                    >
                        <span className='truncate'>{paths.next.name}</span>
                        <FiChevronRight className='shrink-0' size={16} />
                    </div>
                </Link>
            )}
        </div>
    );
};
