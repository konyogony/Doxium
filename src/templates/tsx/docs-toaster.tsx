// @ts-nocheck

'use client';

import { useMediaQuery } from '$LIB-ALIAS/use-media-query';
import { Toaster } from 'sonner';

export const DocsToaster = () => {
    return (
        <Toaster
            richColors
            theme='dark'
            position={useMediaQuery('(min-width: 1024px)') ? 'bottom-right' : 'top-center'}
        />
    );
};
