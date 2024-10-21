// @ts-nocheck

import { DocsNode } from '@/types';

// Each node always has a name. If node doesnt have a path and had nodes, it is a folder.
export const structure: DocsNode[] = [
    {
        name: 'official-documentation',
        path: '/',
    },
    {
        name: 'about',
        path: '/about',
    },
    {
        name: 'features',
        nodes: [
            {
                name: 'code-block',
                path: '/features/code-block',
            },
            {
                name: 'test',
                path: '/features/test',
            },
        ],
    },
];
