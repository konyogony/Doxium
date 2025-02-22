'use client';

import { Toaster } from 'sonner';
import { getConfig } from 'ts/lib';
import { useMediaQuery } from 'ts/useMediaQuery';

// Should stop using MeidaQuery at some point.
export const DocsToaster = async () => {
    const config = await getConfig();
    const colorScheme = config.style.colorScheme;
    return (
        <Toaster
            richColors
            theme={colorScheme}
            position={useMediaQuery('(min-width: 1024px)') ? 'bottom-right' : 'top-center'}
        />
    );
};
