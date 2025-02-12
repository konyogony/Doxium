import { DocsNode } from 'types';

export const flattenStructure = (
    structure: DocsNode[],
    parentIndex = -1,
    result: { path: string; index: number; name: string }[] = [],
) => {
    let currentIndex = parentIndex;
    structure.forEach((node) => {
        if (node.path) {
            currentIndex += 1;
            result.push({ path: node.path, index: currentIndex, name: node.name });
        }
        if (node.nodes) {
            ({ currentIndex } = flattenStructure(node.nodes, currentIndex, result));
        }
    });
    return { result, currentIndex };
};
