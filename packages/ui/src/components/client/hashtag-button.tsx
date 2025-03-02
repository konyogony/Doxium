'use client';

import { HiOutlineHashtag } from '@vertisanpro/react-icons/hi';
import copy from 'copy-to-clipboard';
import React, { useCallback, useMemo } from 'react';
import { toast } from 'sonner';

interface HashtagButtonProps {
    id: string | undefined;
    variant?: 'h1' | 'h2' | 'h3';
}

export const HashtagButton = ({ id, variant: Var = 'h1', children }: React.PropsWithChildren<HashtagButtonProps>) => {
    const clickCopy = useCallback(() => {
        if (typeof window !== 'undefined') {
            const path = window.location.href.replace(/#.*$/, '') + '#' + id;
            copy(path);
            window.location.href = path;
            toast.success('URL copied to clipboard');
        }
    }, [id]);

    return useMemo(
        () => (
            <Var
                onClick={() => clickCopy()}
                id={id}
                className='headings group flex w-full cursor-copy flex-wrap items-center justify-start gap-2'
            >
                {children}
                <HiOutlineHashtag
                    size={Var === 'h1' ? 24 : Var === 'h2' ? 20 : 16}
                    className='hover:!text-accent-600 group-hover:text-accent-500 hidden text-transparent transition-all duration-300 focus:ring-0 focus:outline-hidden lg:inline-block'
                />
            </Var>
        ),
        [id, Var, children, clickCopy],
    );
};
