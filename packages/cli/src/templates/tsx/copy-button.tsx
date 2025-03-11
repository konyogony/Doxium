// @ts-nocheck

'use client';

import copy from 'copy-to-clipboard';
import { cn } from 'doxium/utils';
import { FiCheck, FiClipboard } from 'icons/fi';
import { useCallback, useMemo, useState } from 'react';
import { toast } from 'sonner';

interface CopyButtonProps {
    text: string;
}

const CopyButton = ({ text }: CopyButtonProps) => {
    const [clicked, setClicked] = useState(false);

    const clickCopy = useCallback(() => {
        copy(text);
        toast.success('Code copied to clipboard');
        setClicked(true);
        setTimeout(() => setClicked(false), 2000);
    }, [text]);

    return useMemo(
        () => (
            <button
                className='text-base-800 hover:!text-accent-500 dark:text-base-400 absolute right-[28px] top-2.5 w-fit cursor-pointer transition-all duration-150 group-hover:opacity-100 md:opacity-0'
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
                    className={cn(
                        'absolute inset-0 transition-all duration-150',
                        !clicked ? 'opacity-100' : 'opacity-0',
                    )}
                />
            </button>
        ),
        [clickCopy, clicked],
    );
};

export default CopyButton;
