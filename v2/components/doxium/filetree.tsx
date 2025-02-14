'use client';

import { cn } from '@/lib/utils';
import { TreeNode } from '@/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const DocLink = ({ name, slug }: { name: string; slug?: string }) => {
    const pathname = usePathname();

    if (!slug) {
        return <span className='flex w-full py-1.5 pt-3 text-sm font-bold text-base-50'>{name}</span>;
    }
    console.log('slug', slug, pathname);
    return (
        <Link
            href={slug}
            className={cn(
                'flex w-full py-1 text-sm font-normal text-base-400 transition-all hover:!text-base-100 hover:underline',
                pathname === slug && 'font-medium text-accent-500',
            )}
        >
            {name}
        </Link>
    );
};

export const DocFolder = ({ node, separate = false }: { node: TreeNode; separate?: boolean }) => {
    if (!node.nodes) {
        return <DocLink name={node.name} slug={node.slug} />;
    }

    return (
        <div className='flex flex-col'>
            {separate && <div className='my-2 h-[1px] w-[10em] bg-white/15' />}
            <DocLink name={node.name} />
            <div className='flex flex-col'>
                {node.nodes.map((childNode) => (
                    <DocFolder key={childNode.name} node={childNode} separate={separate} />
                ))}
            </div>
        </div>
    );
};

interface FiletreeProps {
    tree: TreeNode[];
    separate?: boolean;
}

export const Filetree = ({ tree, separate = false }: FiletreeProps) => {
    return (
        <div className='flex flex-col gap-1'>
            {tree.map((node) => (
                <DocFolder key={node.name} node={node} separate={separate} />
            ))}
        </div>
    );
};
