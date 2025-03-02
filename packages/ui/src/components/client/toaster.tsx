'use client';

import { useMediaQuery } from 'client/useMediaQuery';
import { getConfig } from 'server/lib';
import { Toaster } from 'sonner';

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
