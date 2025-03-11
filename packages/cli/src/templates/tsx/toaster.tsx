// @ts-nocheck
'use client';

import config from 'config';
import { useMediaQuery } from 'doxium/useMediaQuery';
import { Toaster } from 'sonner';

const colorScheme = config.style.colorScheme;

// Should stop using MeidaQuery at some point.
const DocsToaster = () => {
    return (
        <Toaster
            richColors
            theme={colorScheme}
            position={useMediaQuery('(min-width: 1024px)') ? 'bottom-right' : 'top-center'}
        />
    );
};

export { DocsToaster as Toaster };
