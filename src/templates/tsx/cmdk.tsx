// @ts-nocheck

'use client';

import { Button } from '@/components/ui/button';
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import { DialogDescription, DialogTitle, type DialogProps } from '@radix-ui/react-dialog';
import { FileIcon } from '@radix-ui/react-icons';
import { RxMagnifyingGlass } from '@vertisanpro/react-icons/rx';
import { flattenStructure } from '$LIB-ALIAS/flatten-structure';
import { prettifyText } from '$LIB-ALIAS/prettify-text';
import { DocsNode } from '$TYPES-ALIAS';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

interface CmdkProps extends DialogProps {
    structure: DocsNode[];
}

const Cmdk = ({ structure, ...props }: CmdkProps) => {
    const [open, setOpen] = useState(false);
    const fileStructure = flattenStructure(structure);
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
                className='bg-$COLOR-900/50 text-$COLOR-400 hover:bg-$COLOR-800/60 hover:text-$COLOR-200 group ml-auto hidden w-32 cursor-pointer flex-row items-center overflow-clip rounded-md border border-white/5 px-2 py-1 text-sm font-normal backdrop-blur-md transition-all duration-300 lg:flex xl:w-fit xl:gap-10'
            >
                <span className='hidden xl:flex'>Search documentation...</span>
                <span className='flex text-xs xl:hidden'>Search</span>
                <kbd className='bg-$COLOR-700/50 ml-auto flex flex-row items-center -space-x-0.5 rounded-sm px-2 py-0.5 text-[10px] backdrop-blur-sm'>
                    ⌘ K
                </kbd>
            </Button>
            <Button
                variant='outline'
                onClick={() => setOpen(true)}
                {...props}
                className='group ml-auto cursor-pointer flex-row items-center overflow-clip rounded-md border border-white/5 bg-$COLOR-900/50 px-2 py-1 text-sm font-normal text-$COLOR-400 backdrop-blur-md transition-all duration-300 hover:bg-$COLOR-800/60 hover:text-$COLOR-200 lg:hidden xl:w-fit xl:gap-10'
            >
                <RxMagnifyingGlass />
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <DialogTitle className='sr-only' />
                <DialogDescription className='sr-only' />
                <CommandInput placeholder='Search documentation...' />
                <CommandList className='border-white/5'>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading='Documentation'>
                        {fileStructure.result.map((v, i) => (
                            <CommandItem
                                key={i}
                                value={v.name}
                                onSelect={() => runCommand(() => navigator.push(v.path))}
                                className='flex flex-row items-center gap-1'
                            >
                                <FileIcon className='size-4' />
                                {prettifyText(v.name)}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    );
};

export default Cmdk;
