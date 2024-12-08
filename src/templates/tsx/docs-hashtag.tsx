// @ts-nocheck

'use client';

import { FiLink } from '@vertisanpro/react-icons/fi';
import copy from 'copy-to-clipboard';
import { toast } from 'sonner';

interface WikiHashTagProps {
    id: string | undefined;
    variant?: 'h1' | 'h2' | 'h3';
}

const WikiHashTag = ({ id, variant: Var = 'h1', children }: React.PropsWithChildren<WikiHashTagProps>) => {
    const clickCopy = () => {
        if (typeof window !== 'undefined') {
            const path = window.location.href.replace(/#.*$/, '') + '#' + id;
            copy(path);
            window.location.href = path;
            toast.success('URL copied to clipboard');
        }
    };

    return (
        <Var
            onClick={() => clickCopy()}
            id={id}
            className='group inline-block w-full cursor-copy items-center justify-start gap-2'
        >
            {children}
            <FiLink
                size={Var === 'h1' ? 24 : Var === 'h2' ? 18 : 16}
                className='ml-2 hidden text-transparent transition-all duration-300 hover:!text-$ACCENT-COLOR-500 focus:outline-none focus:ring-0 group-hover:text-$ACCENT-COLOR-400 lg:inline-block'
            />
        </Var>
    );
};

export default WikiHashTag;
