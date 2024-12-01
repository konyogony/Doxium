// @ts-nocheck

'use client';

import { FiCheck, FiClipboard } from '@vertisanpro/react-icons/fi';
import { cn } from '$LIB-ALIAS/utils';
import { useState } from 'react';
import { toast } from 'sonner';

interface CopyButtonProps {
    text: string;
    singleLine?: boolean;
}

const CopyButton: React.FC<CopyButtonProps> = ({ text, singleLine }) => {
    const [clicked, setClicked] = useState(false);
    const clickCopy = () => {
        navigator?.clipboard.writeText(text);
        toast.success('Code copied to clipboard');
        setClicked(true);
        setTimeout(() => setClicked(false), 2000);
    };

    return (
        <div
            className={cn(
                'absolute right-[28px] w-fit opacity-0 transition-all cursor-pointer duration-300 hover:!text-$ACCENT-COLOR-500 group-hover:text-$COLOR-400 group-hover:opacity-100',
                singleLine ? 'top-3.5' : 'top-2.5',
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

export default CopyButton;
