'use client';

import { cn } from '@/lib/utils';
import { TreeNode } from '@/types';
import config from 'config';
import { FiChevronRight } from 'icons/fi';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export const DocLink = ({
    name,
    slug,
    isFirstNode = false,
}: {
    name: string;
    slug?: string;
    isFirstNode?: boolean;
}) => {
    const pathname = usePathname();

    if (!slug) {
        if (config.misc.toggleFolders) {
            return (
                <span className={cn('flex w-full py-1.5 pt-3 text-sm font-bold text-base-50', !isFirstNode && 'pl-6')}>
                    {name}
                </span>
            );
        } else {
            return <span className='flex w-full py-1.5 pt-3 text-sm font-bold text-base-50'>{name}</span>;
        }
    }
    if (config.misc.toggleFolders) {
        console.log(pathname, slug);
        return (
            <Link
                href={slug}
                className={cn(
                    'flex w-full py-1.5 text-sm font-normal text-base-400 transition-all hover:!border-base-100/80 hover:!text-base-100 hover:underline',
                    pathname === slug && '!border-accent-500/80 font-medium text-accent-500',
                    !isFirstNode && 'border-l border-base-700/80 pl-6',
                )}
            >
                {name}
            </Link>
        );
    } else {
        return (
            <Link
                href={slug}
                className={cn(
                    'flex w-full py-1.5 text-sm font-normal text-base-400 transition-all hover:!text-base-100 hover:underline',
                    pathname === slug && 'font-medium text-accent-500',
                )}
            >
                {name}
            </Link>
        );
    }
};

export const DocFolder = ({
    node,
    separate = false,
    isFirstNode = false,
}: {
    node: TreeNode;
    separate?: boolean;
    isFirstNode?: boolean;
}) => {
    const [opened, setOpened] = useState(false);

    if (!node.nodes) {
        return <DocLink name={node.name} slug={node.slug} isFirstNode={isFirstNode} />;
    }

    return (
        <div>
            {config.misc.toggleFolders ? (
                <div
                    className={cn(
                        'grid grid-rows-[min-content_0fr] pb-1.5 transition-[grid-template-rows] duration-100',
                        opened ? 'grid-rows-[min-content_1fr]' : '',
                        !isFirstNode && 'border-l border-base-700/80',
                    )}
                >
                    {separate && <div className='my-2 h-[1px] w-[10em] bg-white/15' />}
                    <div className='flex w-full flex-row items-center justify-center gap-2'>
                        <DocLink name={node.name} isFirstNode={isFirstNode} />
                        <button
                            onClick={() => setOpened((prev) => !prev)}
                            className='ml-auto flex flex-shrink-0 flex-row items-center py-1.5 pt-3'
                        >
                            <FiChevronRight
                                size={16}
                                className={cn('text-base-200 transition-all duration-300', opened && 'rotate-90')}
                            />
                        </button>
                    </div>
                    <div className={cn('flex flex-col overflow-hidden pl-1', !isFirstNode && 'pl-6')}>
                        {node.nodes.map((childNode) => (
                            <DocFolder key={childNode.name} node={childNode} separate={separate} />
                        ))}
                    </div>
                </div>
            ) : (
                <div className='flex flex-col'>
                    {separate && <div className='my-2 h-[1px] w-[10em] bg-white/15' />}
                    <DocLink name={node.name} />
                    <div className='flex flex-col'>
                        {node.nodes.map((childNode) => (
                            <DocFolder key={childNode.name} node={childNode} separate={separate} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

interface FiletreeProps {
    tree: TreeNode[];
    separate?: boolean;
}

export const Filetree = ({ tree, separate = false }: FiletreeProps) => {
    return (
        <div className='flex flex-col'>
            {tree.map((node) => (
                <DocFolder key={node.name} node={node} separate={separate} isFirstNode={true} />
            ))}
        </div>
    );
};
