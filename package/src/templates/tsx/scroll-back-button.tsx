// @ts-nocheck

'use client';

import config from 'config';
import { FiArrowUp } from 'icons/fi';
import { cn } from 'lib/utils';
import { useEffect, useMemo, useState } from 'react';

const scrollHeightBreakpoint = config.misc.scollHeightBreakpoint;
const linkUnderline = config.misc.linkUnderline;

const ScrollBackButton = () => {
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
                className={cn(
                    'text-base-500 my-1 flex items-center gap-1 text-sm',
                    linkUnderline ? 'hover:underline' : 'hover:text-base-900 dark:hover:text-base-50',
                )}
            >
                Back to top <FiArrowUp />
            </button>
        );
    }, []);

    return scrollHeight > scrollHeightBreakpoint && backToTopButton;
};

export default ScrollBackButton;
