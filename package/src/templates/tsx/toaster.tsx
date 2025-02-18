// @ts-nocheck

'use client';

import config from 'config';
import { useMediaQuery } from 'lib/useMediaQuery';
import { Toaster } from 'sonner';

const DocsToaster = () => {
    return (
        <Toaster
            richColors
            theme={config.style.colorScheme}
            position={useMediaQuery('(min-width: 1024px)') ? 'bottom-right' : 'top-center'}
        />
    );
};

export default DocsToaster;
