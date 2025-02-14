import fs from 'fs/promises';
import path from 'path';
import { DoxiumFile, Heading, TreeNode } from '@/types';
import config from 'config';
import matter from 'gray-matter';
import { BundledLanguage, BundledTheme, createHighlighter, HighlighterGeneric } from 'shiki';

const MDX_DIR = path.join(process.cwd(), 'docs');
const extensions = config.misc.extensions;

export const cleanHeadingId = (id: string): string => {
    return id
        .toLowerCase()
        .replace(/`([^`]+)`/g, '$1')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
        .replace(/[*_~]/g, '')
        .replace(/<[^>]+>/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
};

export const cleanHeadingText = (text: string): string => {
    return text
        .replace(/`([^`]+)`/g, '$1')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
        .replace(/[*_~]/g, '')
        .replace(/<[^>]+>/g, '');
};

export const getMdxData = async (slug: string) => {
    const filePath = path.join(MDX_DIR, `${slug}/page.mdx`);
    try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const { content: source, data: frontmatter } = matter(fileContent);

        const headings: Heading[] = source
            .split('\n')
            .filter((line) => /^#{1,3}\s/.test(line))
            .map((line) => {
                const level = line.match(/^#{1,3}/)![0].length;
                const text = cleanHeadingText(line.replace(/^#{1,3}\s/, '').trim());
                const id = cleanHeadingId(text);
                return { id, level, text };
            });

        return { frontmatter, source, headings };
    } catch (error) {
        console.error(`Error reading file: ${error}`);
        return null;
    }
};

export const getAllMdxSlugs = async (dir: string = MDX_DIR): Promise<string[]> => {
    let slugs: string[] = [];
    try {
        const entries = await fs.readdir(dir, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                const mdxFilePath = path.join(fullPath, 'page.mdx');
                try {
                    await fs.readFile(mdxFilePath, 'utf-8');
                    slugs.push(fullPath.replace(`${MDX_DIR}/`, ''));
                } catch {
                    const subDirSlugs = await getAllMdxSlugs(fullPath);
                    slugs = slugs.concat(subDirSlugs);
                }
            }
        }
    } catch (error) {
        console.error('Error fetching slugs recursively:', error);
    }
    return slugs;
};

export const getAllMdxFiles = async (dir: string = MDX_DIR): Promise<DoxiumFile[]> => {
    let files: DoxiumFile[] = [];
    try {
        const entries = await fs.readdir(dir, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                const mdxFilePath = path.join(fullPath, 'page.mdx');
                try {
                    const fileContent = await fs.readFile(mdxFilePath, 'utf-8');
                    const { data: frontmatter } = matter(fileContent);
                    files.push({
                        title: frontmatter.title,
                        slug: fullPath.replace(`${MDX_DIR}/`, ''),
                        sort: frontmatter.sort,
                        groupTitle: frontmatter.groupTitle,
                        groupSort: frontmatter.groupSort,
                    });
                } catch {
                    const subDirFiles = await getAllMdxFiles(fullPath);
                    files = files.concat(subDirFiles);
                }
            }
        }
    } catch (error) {
        console.error('Error fetching files recursively:', error);
    }
    return files;
};

export const getDocsTree = async (dir: string = MDX_DIR): Promise<TreeNode[]> => {
    const files = await getAllMdxFiles(dir);
    const groupedByDir: { [key: string]: DoxiumFile[] } = {};

    // Group files by their directory
    files.forEach((file) => {
        const dir = path.dirname(file.slug);
        if (!groupedByDir[dir]) groupedByDir[dir] = [];
        groupedByDir[dir].push(file);
    });

    const buildTree = (currentDir: string): TreeNode[] => {
        const nodes: TreeNode[] = [];

        // Add files in the current directory
        const currentDirFiles = groupedByDir[currentDir] || [];
        currentDirFiles.forEach((file) => {
            nodes.push({
                name: file.title,
                type: 'file',
                sort: file.sort || 999,
                slug: '/' + file.slug,
            });
        });

        // Find all subdirectories at any depth
        const allPaths = Object.keys(groupedByDir);
        const directSubDirs = new Set(
            allPaths
                .filter((p) => p.startsWith(currentDir === '.' ? '' : currentDir + '/'))
                .map((p) => {
                    const relPath = p.slice(currentDir === '.' ? 0 : currentDir.length + 1);
                    const firstSegment = relPath.split('/')[0];
                    return firstSegment ? path.join(currentDir === '.' ? '' : currentDir, firstSegment) : null;
                })
                .filter(Boolean),
        );

        // Process subdirectories
        directSubDirs.forEach((subDir) => {
            if (subDir === currentDir || !subDir) return;

            // Get all files in this directory and its subdirectories
            const subDirFiles = groupedByDir[subDir] || [];
            const folderMetaFile = subDirFiles.find((f: DoxiumFile) => f.groupTitle) || subDirFiles[0];

            const folderNode: TreeNode = {
                name: folderMetaFile?.groupTitle || path.basename(subDir!),
                type: 'folder',
                sort: folderMetaFile?.groupSort || 999,
                nodes: buildTree(subDir!),
            };
            nodes.push(folderNode);
        });

        // Sort nodes
        return nodes.sort((a, b) => a.sort - b.sort);
    };

    return buildTree('.');
};

class HighlighterSingleton {
    private static instance: HighlighterGeneric<BundledLanguage, BundledTheme> | null = null;
    private static initializing: boolean = false;

    private constructor() {}

    public static async getHighlighter(
        theme: BundledTheme,
    ): Promise<HighlighterGeneric<BundledLanguage, BundledTheme>> {
        if (!HighlighterSingleton.instance && !HighlighterSingleton.initializing) {
            HighlighterSingleton.initializing = true;
            try {
                HighlighterSingleton.instance = await createHighlighter({
                    themes: [theme, 'github-dark-dimmed'],
                    langs: extensions,
                });
            } catch (error) {
                console.error('Error creating highlighter:', error);
                HighlighterSingleton.initializing = false;
                throw error;
            } finally {
                HighlighterSingleton.initializing = false;
            }
        }

        while (HighlighterSingleton.initializing) {
            await new Promise((resolve) => setTimeout(resolve, 50));
        }

        return HighlighterSingleton.instance!;
    }
}

export const getHighlighterInstance = async (
    theme: BundledTheme,
): Promise<HighlighterGeneric<BundledLanguage, BundledTheme>> => {
    try {
        const highlighter = await HighlighterSingleton.getHighlighter(theme);
        return highlighter;
    } catch (error) {
        console.error('Error creating or retrieving the highlighter instance:', error);
        throw error;
    }
};

// Highlighter:
// https://dev.to/iamhectorsosa/caching-shiki-for-faster-build-times-4llb
// Explain the docs tree:
// https://haste.padow.ru/efalahegum.yaml
