// @ts-nocheck

import fs from 'fs';
import path from 'path';
import { DocsNode } from '$TYPES-ALIAS';

let instance: DocsNode[] | null = null;

const createDocsStructure = (rootName: string = 'getting-started'): DocsNode[] => {
    const baseUrl = 'app/docs';
    const baseDir = path.resolve(process.cwd(), baseUrl);

    const getDocsTree = (currentDir: string): DocsNode[] => {
        const files = fs.readdirSync(currentDir);
        const nodes: DocsNode[] = [];

        files.forEach((file) => {
            const filePath = path.join(currentDir, file);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
                const subNodes = getDocsTree(filePath);
                if (subNodes.length === 1 && subNodes[0].path) {
                    nodes.push({
                        name: path.basename(file),
                        path: subNodes[0].path,
                    });
                } else if (subNodes.length > 0) {
                    nodes.push({
                        name: path.basename(file),
                        nodes: subNodes,
                    });
                }
            } else if (file === 'page.mdx') {
                const relativePath = path.relative(baseDir, path.dirname(filePath)).replace(/\\/g, '/');
                const formattedPath =
                    relativePath === '' ? baseUrl.replace('app', '') : `${baseUrl.replace('app', '')}/${relativePath}`;

                nodes.push({
                    name: relativePath === '' ? rootName : path.basename(relativePath),
                    path: formattedPath,
                });
            }
        });

        return nodes.sort((a, b) => {
            if (a.nodes && !b.nodes) return 1;
            if (!a.nodes && b.nodes) return -1;
            return (a.path || '').localeCompare(b.path || '');
        });
    };

    return getDocsTree(baseDir);
};

export const getStructureInstance = (): DocsNode[] => {
    if (!instance) {
        instance = createDocsStructure();
    }
    return instance;
};
