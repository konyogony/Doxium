// @ts-nocheck

'use client';

import { cn } from '$LIB-ALIAS/utils';
import copy from 'copy-to-clipboard';
import { useState } from 'react';
import { FiCheck, FiClipboard } from 'react-icons/fi';
import { toast } from 'sonner';

interface CopyButtonProps {
    text: string;
    floating?: boolean;
}

export const CopyButton: React.FC<CopyButtonProps> = ({ text, floating = false }) => {
    const [clicked, setClicked] = useState(false);
    const clickCopy = () => {
        copy(text);
        toast.success('Code copied to clipboard');
        setClicked(true);
        setTimeout(() => setClicked(false), 2000);
    };

    return (
        <button
            onClick={clickCopy}
            className={cn(
                'text-$COLOR-400 transition-all duration-150 hover:!text-$ACCENT-COLOR-200 lg:opacity-0 lg:group-hover:opacity-100',
                floating && 'absolute -inset-0.5',
            )}
        >
            <FiCheck
                size={18}
                className={cn(
                    'absolute right-2.5 top-2.5 transition-all duration-150',
                    clicked ? 'text-emerald-500 opacity-100' : 'opacity-0',
                )}
            />
            <FiClipboard
                size={18}
                className={cn(
                    'absolute right-2.5 top-2.5 transition-all duration-150',
                    !clicked ? 'opacity-100' : 'opacity-0',
                )}
            />
        </button>
    );
};
