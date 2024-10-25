'use client';

import { useEffect, useState } from 'react';
import { FiArrowUp } from 'react-icons/fi';

export const DocsScroll = () => {
    const [scrollHeight, setScrollHeight] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollHeight(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrollHeight]);

    return (
        <>
            {scrollHeight > 300 && (
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className='my-1 flex items-center gap-1 text-sm text-zinc-400 hover:text-blue-200'
                >
                    Back to top <FiArrowUp />
                </button>
            )}
        </>
    );
};
