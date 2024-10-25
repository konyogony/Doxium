import { DocsNode } from '@/types';

// Each node always has a name. If node doesnt have a path and had nodes, it is a folder.
export const structure: DocsNode[] = [
    {
        name: 'official-documentation',
        path: '/docs',
    },
    {
        name: 'about',
        path: '/docs/about',
    },
    {
        name: 'features',
        nodes: [
            {
                name: 'code-block',
                path: '/docs/features/code-block',
            },
            {
                name: 'test',
                path: '/docs/features/test',
            },
        ],
    },
];
