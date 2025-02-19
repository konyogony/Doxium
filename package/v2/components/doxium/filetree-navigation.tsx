'use client';

import config from 'config';
import { FiChevronRight } from 'icons/fi';
import { TreeNode } from 'lib/types';
import { cn } from 'lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useState } from 'react';

interface DocLinkProps {
    name: string;
    slug?: string;
    isFirstNode?: boolean;
}

interface DocFolderProps {
    node: TreeNode;
    separate?: boolean;
    isFirstNode?: boolean;
}

interface FiletreeProps {
    tree: TreeNode[];
    separate?: boolean;
}

const toggleFolders = config.misc.toggleFolders;

const getLinkClassName = (isActive: boolean, isFirstNode: boolean) => {
    if (toggleFolders) {
        return cn(
            'flex w-full py-1.5 text-sm font-normal text-base-950 dark:text-base-400 transition-all hover:!border-base-100/80 hover:!text-base-100 hover:underline dark:hover:!border-base-700/80 dark:hover:!text-base-50',
            isActive && '!border-accent-500/80 font-medium !text-accent-500',
            !isFirstNode && 'border-l border-base-700/80 pl-6 dark:border-base-200/20',
        );
    } else {
        return cn(
            'flex w-full py-1.5 text-sm font-normal text-base-500 dark:text-base-400 transition-all hover:!text-base-900 hover:underline dark:hover:!text-base-50',
            isActive && 'font-medium !text-accent-500',
        );
    }
};

export const DocLink = ({ name, slug, isFirstNode = false }: DocLinkProps) => {
    const pathname = usePathname();
    const isActive = (pathname === '/' ? '/index' : pathname) === slug;

    if (!slug) {
        return (
            <span
                className={cn(
                    'flex w-full py-1.5 pt-3 text-sm font-bold text-base-900 dark:text-base-50',
                    toggleFolders && !isFirstNode && 'pl-6',
                )}
            >
                {name}
            </span>
        );
    }

    return (
        <Link href={slug === '/index' ? '/' : slug} className={getLinkClassName(isActive, isFirstNode)}>
            {name}
        </Link>
    );
};

export const DocFolder = ({ node, separate = false, isFirstNode = false }: DocFolderProps) => {
    const [opened, setOpened] = useState(false);

    const renderFolderContent = useCallback(() => {
        return (
            <>
                {separate && <div className='my-2 h-[1px] w-[10em] bg-white/15 dark:bg-base-700/80' />}
                {toggleFolders ? (
                    <div className='flex w-full flex-row items-center justify-center gap-2'>
                        <DocLink name={node.name} isFirstNode={isFirstNode} />
                        <button
                            onClick={() => setOpened((prev) => !prev)}
                            className='ml-auto flex flex-shrink-0 flex-row items-center py-1.5 pt-3'
                        >
                            <FiChevronRight
                                size={16}
                                className={cn(
                                    'text-base-200 transition-all duration-300 dark:text-base-500',
                                    opened && 'rotate-90',
                                )}
                            />
                        </button>
                    </div>
                ) : (
                    <DocLink name={node.name} />
                )}
                <div className={cn('flex flex-col', toggleFolders && ['overflow-hidden pl-1', !isFirstNode && 'pl-6'])}>
                    {node.nodes?.map((childNode) => (
                        <DocFolder key={childNode.name} node={childNode} separate={separate} />
                    ))}
                </div>
            </>
        );
    }, [isFirstNode, node.name, node.nodes, opened, separate]);

    if (!node.nodes) {
        return <DocLink name={node.name} slug={node.slug} isFirstNode={isFirstNode} />;
    }

    if (toggleFolders) {
        return (
            <div
                className={cn(
                    'grid grid-rows-[min-content_0fr] pb-1.5 transition-[grid-template-rows] duration-100',
                    opened && 'grid-rows-[min-content_1fr]',
                    !isFirstNode && 'border-l border-base-700/80 dark:border-base-200/20',
                )}
            >
                {renderFolderContent()}
            </div>
        );
    }

    return <div className='flex flex-col'>{renderFolderContent()}</div>;
};

export const Filetree = ({ tree, separate = false }: FiletreeProps) => (
    <div className='flex flex-col'>
        {tree.map((node) => (
            <DocFolder key={node.name} node={node} separate={separate} isFirstNode={true} />
        ))}
    </div>
);
