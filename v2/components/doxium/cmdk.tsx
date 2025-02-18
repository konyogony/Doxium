'use client';

import { DialogDescription, DialogTitle, type DialogProps } from '@radix-ui/react-dialog';
import { FileIcon } from '@radix-ui/react-icons';
import { RxMagnifyingGlass } from 'icons/rx';
import { TreeNode } from 'lib/types';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { Button } from 'ui/button';
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from 'ui/command';

interface CmdkProps extends DialogProps {
    tree: TreeNode[];
}

const Cmdk = ({ tree, ...props }: CmdkProps) => {
    const [open, setOpen] = useState(false);
    const navigator = useRouter();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
                if (
                    (e.target instanceof HTMLElement && e.target.isContentEditable) ||
                    e.target instanceof HTMLInputElement ||
                    e.target instanceof HTMLTextAreaElement ||
                    e.target instanceof HTMLSelectElement
                ) {
                    return;
                }

                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    const runCommand = useCallback((command: () => unknown) => {
        setOpen(false);
        command();
    }, []);

    return (
        <>
            <Button
                variant='outline'
                onClick={() => setOpen(true)}
                {...props}
                aria-label='Search documentation'
                className='group ml-auto hidden w-32 cursor-pointer flex-row items-center overflow-clip rounded-md border border-black/5 bg-base-200/50 px-2 py-1 text-sm font-normal text-base-800 backdrop-blur-md transition-all duration-300 hover:bg-base-300/60 hover:text-base-900 dark:border-white/5 dark:bg-base-900/50 dark:text-base-400 dark:hover:bg-base-800/60 dark:hover:text-base-200 lg:flex xl:w-fit xl:gap-10'
            >
                <span className='hidden xl:flex'>Search documentation...</span>
                <span className='flex text-xs xl:hidden'>Search</span>
                <kbd className='ml-auto flex flex-row items-center -space-x-0.5 rounded-sm bg-base-200/50 px-2 py-0.5 text-[10px] backdrop-blur-sm dark:bg-base-700/50'>
                    ⌘ K
                </kbd>
            </Button>
            <Button
                variant='outline'
                onClick={() => setOpen(true)}
                {...props}
                aria-label='Search documentation'
                className='group ml-auto cursor-pointer flex-row items-center overflow-clip rounded-md border border-white/5 bg-base-900/50 px-2 py-1 text-sm font-normal text-base-800 backdrop-blur-md transition-all duration-300 hover:bg-base-700/60 hover:text-base-900 dark:text-base-400 dark:hover:bg-base-800/60 dark:hover:text-base-200 lg:hidden xl:w-fit xl:gap-10'
            >
                <RxMagnifyingGlass />
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <DialogTitle className='sr-only' />
                <DialogDescription className='sr-only' />
                <CommandInput placeholder='Search documentation...' />
                <CommandList className='customScrollbar border-white/5'>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading='Documentation'>
                        {tree
                            .flatMap((v: TreeNode) => {
                                const files: TreeNode[] = [];

                                const traverse: (value: TreeNode, index: number, array: TreeNode[]) => void = (
                                    node: TreeNode,
                                ) => {
                                    if (node.type === 'file') {
                                        files.push(node);
                                    } else if (node.nodes) {
                                        node.nodes.forEach(traverse);
                                    }
                                };

                                traverse(v, 0, []);
                                return files;
                            })
                            .map((v: TreeNode, i: number) => (
                                <CommandItem
                                    key={i}
                                    value={v.name}
                                    onSelect={() => runCommand(() => navigator.push(v.slug || ''))}
                                    className='flex flex-row items-center gap-1'
                                >
                                    <FileIcon className='size-4' />
                                    {v.name}
                                </CommandItem>
                            ))}
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    );
};

export default Cmdk;
