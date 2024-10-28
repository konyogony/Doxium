// @ts-nocheck

'use client';

import { useEffect, useMemo, useState } from 'react';
import { FiArrowUp } from 'react-icons/fi';

export const DocsScroll = () => {
    const [scrollHeight, setScrollHeight] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollHeight(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const backToTopButton = useMemo(() => {
        return (
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className='my-1 flex items-center gap-1 text-sm text-$COLOR-400 hover:underline'
            >
                Back to top <FiArrowUp />
            </button>
        );
    }, []);

    return <>{scrollHeight > 300 && backToTopButton}</>;
};
