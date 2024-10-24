// @ts-nocheck

'use client';

import copy from 'copy-to-clipboard';
import { HiOutlineHashtag } from 'react-icons/hi';
import { toast } from 'sonner';

interface WikiHashTagProps {
    id: string;
    variant?: 'h1' | 'h2' | 'h3';
}

export const WikiHashTag = ({ id, variant = 'h1' }: WikiHashTagProps) => {
    const strippedId = id
        .trim()
        .toLocaleLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\p{L}\p{N}-]/gu, '')
        .replace(/\./g, '');

    const path = typeof window !== 'undefined' ? window.location.href.replace(/#.*$/, '') + '#' + strippedId : '';

    const clickCopy = () => {
        if (typeof window !== 'undefined') {
            copy(path);
            window.location.href = path;
            toast.success('URL copied to clipboard');
        }
    };
    return (
        <button onClick={() => clickCopy()} id={'hashtag'} className='hidden cursor-copy lg:inline'>
            <HiOutlineHashtag
                size={variant === 'h1' ? 26 : variant === 'h2' ? 20 : 18}
                className='hover:!text-$ACCENT-COLOR-200 group-hover:text-$COLOR-200/60 text-transparent transition-all duration-300 focus:outline-none focus:ring-0'
            />
        </button>
    );
};
