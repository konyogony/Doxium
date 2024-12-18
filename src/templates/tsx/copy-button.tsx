// @ts-nocheck

'use client';

import { FiCheck, FiClipboard } from '@vertisanpro/react-icons/fi';
import { cn } from '$LIB-ALIAS/utils';
import copy from 'copy-to-clipboard';
import { useState } from 'react';
import { toast } from 'sonner';

interface CopyButtonProps {
    text: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ text }) => {
    const [clicked, setClicked] = useState(false);
    const clickCopy = () => {
        copy(text);
        toast.success('Code copied to clipboard');
        setClicked(true);
        setTimeout(() => setClicked(false), 2000);
    };

    return (
        <button
            className={cn(
                'top-2.5 absolute right-[28px] w-fit opacity-0 transition-all cursor-pointer duration-150 hover:!text-$ACCENT-COLOR-500 text-$COLOR-400 group-hover:opacity-100',
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
        </button>
    );
};

export default CopyButton;
