// @ts-nocheck

import { DocsNode } from './types';

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
        name: 'folder',
        nodes: [
            {
                name: 'some-file',
                path: '/docs/folder/some-file',
            },
            {
                name: 'test',
                path: '/docs/folder/test',
            },
        ],
    },
];
