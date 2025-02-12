'use client';

import { useMediaQuery } from 'lib/use-media-query';
import { Toaster } from 'sonner';

const DocsToaster = () => {
    return (
        <Toaster
            richColors
            theme='dark'
            position={useMediaQuery('(min-width: 1024px)') ? 'bottom-right' : 'top-center'}
        />
    );
};

export default DocsToaster;
