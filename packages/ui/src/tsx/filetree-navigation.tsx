'use client';

import { FiChevronRight } from 'icons/fi';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { getConfig } from 'ts/lib';
import { TreeNode } from 'ts/types';
import { cn } from 'ts/utils';

interface DocLinkProps {
    name: string;
    slug?: string;
    isFirstNode?: boolean;
    isRootTitle?: boolean;
    isActive?: boolean;
}

interface DocFolderProps {
    node: TreeNode;
    separate?: boolean;
    isFirstNode?: boolean;
    isRootTitle?: boolean;
}

interface FiletreeProps {
    tree: TreeNode[];
    separate?: boolean;
}

const getLinkClassName = (toggleFolders: boolean, linkUnderline: boolean, isActive: boolean, isFirstNode: boolean) => {
    if (toggleFolders) {
        return cn(
            'flex w-full py-1.5 text-sm font-medium text-base-500 dark:text-base-400 transition-all duration-300 hover:!border-base-600/80 hover:!text-base-900 dark:hover:!border-base-50/80 dark:hover:!text-base-50',
            isActive && '!border-accent-500/80 font-medium !text-accent-500',
            !isFirstNode && 'border-l-[1.5px] dark:border-l border-base-300/80 pl-6 dark:border-base-400/40',
            linkUnderline && 'hover:underline',
        );
    } else {
        return cn(
            'flex w-full py-1.5 text-sm font-normal text-base-500 dark:text-base-400 transition-all hover:!text-base-900 dark:hover:!text-base-50',
            isActive && 'font-medium !text-accent-500',
            linkUnderline && 'hover:underline',
        );
    }
};

export const DocLink = async ({
    name,
    slug,
    isFirstNode = false,
    isRootTitle = false,
    isActive = false,
}: DocLinkProps) => {
    const config = await getConfig();
    const toggleFolders = config.misc.toggleFolders;
    const linkUnderline = config.misc.linkUnderline;
    const pathname = usePathname();
    const isActiveLink = isActive || (pathname === '/' ? '/index' : pathname) === slug;

    if (!slug) {
        if (!toggleFolders) {
            return (
                <span className={cn('text-base-900 dark:text-base-50 flex w-full py-1.5 pt-3 text-sm font-bold')}>
                    {name}
                </span>
            );
        }
        return (
            <span
                className={cn(
                    'flex w-full py-1.5 pt-3 text-sm font-bold transition-all duration-300',
                    isRootTitle && 'text-base-900 dark:text-base-50',
                    toggleFolders &&
                        !isRootTitle &&
                        'text-base-600 hover:text-base-950 dark:text-base-400 dark:hover:text-base-100',
                    !isFirstNode && 'pl-6',
                    isActiveLink && '!text-accent-500',
                )}
            >
                {name}
            </span>
        );
    }

    return (
        <Link
            href={slug === '/index' ? '/' : slug}
            className={getLinkClassName(toggleFolders, linkUnderline, isActiveLink, isFirstNode)}
        >
            {name}
        </Link>
    );
};

export const DocFolder = async ({
    node,
    separate = false,
    isFirstNode = false,
    isRootTitle = false,
}: DocFolderProps) => {
    const config = await getConfig();
    const toggleFolders = config.misc.toggleFolders;
    const pathname = usePathname();
    const isActive =
        node.nodes?.some((childNode) => (pathname === '/' ? '/index' : pathname) === childNode.slug) ?? false;
    const [opened, setOpened] = useState(isActive);

    useEffect(() => {
        if (isActive) {
            setOpened(true);
        }
    }, [isActive]);

    const renderFolderContent = useCallback(() => {
        return (
            <>
                {/* {separate && <div className='my-2 h-[1px] w-[10em] bg-black/20 dark:bg-base-700/80' />} */}
                {toggleFolders ? (
                    <button
                        onClick={() => setOpened((prev) => !prev)}
                        className={cn('group flex w-full flex-row items-center justify-center gap-2')}
                    >
                        <DocLink name={node.name} isFirstNode={isFirstNode} isActive={isActive} />
                        <FiChevronRight
                            size={20}
                            className={cn(
                                isActive && '!text-accent-500',
                                'my-1.5 mt-3 ml-auto block transition-all duration-150',
                                opened && 'rotate-90',
                                !isRootTitle &&
                                    'text-base-600 group-hover:!text-base-900 dark:text-base-400 dark:group-hover:!text-base-50',
                            )}
                        />
                    </button>
                ) : (
                    <DocLink name={node.name} />
                )}
                <div className={cn('flex flex-col', toggleFolders && ['overflow-hidden pl-1', !isFirstNode && 'pl-6'])}>
                    {node.nodes?.map((childNode) => (
                        <DocFolder key={childNode.name} node={childNode} separate={separate} />
                    ))}
                </div>
                {separate && <div className='dark:bg-base-700/80 my-2 h-[1px] w-full bg-black/20' />}
            </>
        );
    }, [isFirstNode, node.name, node.nodes, opened, separate, isRootTitle, isActive]);

    if (!node.nodes) {
        return <DocLink name={node.name} slug={node.slug} isFirstNode={isFirstNode} />;
    }

    if (toggleFolders) {
        return (
            <div
                className={cn(
                    'grid grid-rows-[min-content_0fr] pb-1.5 transition-[grid-template-rows] duration-100',
                    opened && 'grid-rows-[min-content_1fr]',
                    !isFirstNode && 'border-base-300/80 dark:border-base-400/40 border-l-[1.5px] dark:border-l',
                )}
            >
                {renderFolderContent()}
            </div>
        );
    }

    return <div className='flex flex-col'>{renderFolderContent()}</div>;
};

export const FiletreeNavigation = ({ tree, separate = false }: FiletreeProps) => (
    <div className='flex w-full flex-col'>
        {tree.map((node) => (
            <DocFolder key={node.name} node={node} separate={separate} isFirstNode={true} />
        ))}
    </div>
);
