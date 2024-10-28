// @ts-nocheck

'use client';

import { cn } from '$LIB-ALIAS/utils';
import copy from 'copy-to-clipboard';
import { useState } from 'react';
import { FiCheck, FiClipboard } from 'react-icons/fi';
import { toast } from 'sonner';

interface CopyButtonProps {
    text: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({ text }) => {
    const [clicked, setClicked] = useState(false);
    const clickCopy = () => {
        copy(text);
        toast.success('Code copied to clipboard');
        setClicked(true);
        setTimeout(() => setClicked(false), 2000);
    };

    return (
        <div
            className={cn(
                'absolute right-[28px] top-2.5 w-fit opacity-0 transition-all duration-300 hover:!text-blue-500 group-hover:text-zinc-400 group-hover:opacity-100',
            )}
            onClick={clickCopy}
        >
            <FiCheck
                size={18}
                className={cn(
                    'absolute inset-0 transition-all duration-150',
                    clicked ? 'text-emerald-500 opacity-100' : 'opacity-0',
                )}
            />
            <FiClipboard
                size={18}
                className={cn('absolute inset-0 transition-all duration-150', !clicked ? 'opacity-100' : 'opacity-0')}
            />
        </div>
    );
};
