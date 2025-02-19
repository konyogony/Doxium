'use client';

import copy from 'copy-to-clipboard';
import { HiOutlineHashtag } from 'icons/hi';
import React, { useCallback, useMemo } from 'react';
import { toast } from 'sonner';

interface HashtagButtonProps {
    id: string | undefined;
    variant?: 'h1' | 'h2' | 'h3';
}

const HashtagButton = ({ id, variant: Var = 'h1', children }: React.PropsWithChildren<HashtagButtonProps>) => {
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
                    className='hidden text-transparent transition-all duration-300 hover:!text-accent-600 focus:outline-none focus:ring-0 group-hover:text-accent-500 lg:inline-block'
                />
            </Var>
        ),
        [id, Var, children, clickCopy],
    );
};

export default HashtagButton;
