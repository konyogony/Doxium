'use client';

import copy from 'copy-to-clipboard';
import { FiCheck, FiClipboard } from 'icons/fi';
import { useCallback, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { cn } from 'ts/utils';

interface CopyButtonProps {
    text: string;
}

export const CopyButton = ({ text }: CopyButtonProps) => {
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
                className={cn(
                    'text-base-800 hover:!text-accent-500 dark:text-base-400 absolute top-2.5 right-[28px] w-fit cursor-pointer transition-all duration-150 group-hover:opacity-100 md:opacity-0',
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
