// @ts-nocheck

import fs from 'fs';
import path from 'path';
import { DocsNode } from 'types';

let instance: DocsNode[] | null = null;

const baseUrl = config['base-url'];

const createDocsStructure = async (rootName: string = 'getting-started'): Promise<DocsNode[]> => {
    const baseDir = path.resolve(process.cwd(), baseUrl);

    const getDocsTree = (currentDir: string): DocsNode[] => {
        const files = fs.readdirSync(currentDir);
        const nodes: DocsNode[] = [];

        let sortOrder: string[] = [];
        const sortFilePath = path.join(currentDir, '_sort.json');
        if (fs.existsSync(sortFilePath)) {
            const sortFileContent = fs.readFileSync(sortFilePath, 'utf-8');
            const sortData = JSON.parse(sortFileContent);
            sortOrder = sortData.sort || [];
        }

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

        const sorted = nodes.sort((a, b) => {
            const aIndex = sortOrder.indexOf(a.name);
            const bIndex = sortOrder.indexOf(b.name);

            if (a.path && !b.path) return -1;
            if (!a.path && b.path) return 1;

            if (aIndex !== -1 && bIndex !== -1) {
                return aIndex - bIndex;
            } else if (aIndex !== -1) {
                return -1;
            } else if (bIndex !== -1) {
                return 1;
            }

            return (a.path || '').localeCompare(b.path || '');
        });

        return sorted;
    };

    return getDocsTree(baseDir);
};

export const getStructureInstance = async (): Promise<DocsNode[]> => {
    if (!instance) {
        instance = await createDocsStructure();
    }
    return instance;
};

// NGL, I dont really like this approach, but I think this is the simplest way out.
// Im open to suggestions on how to improve this.
