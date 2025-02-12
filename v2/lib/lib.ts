import path from "path";
import fs from "fs/promises";
import matter from "gray-matter";
import { Heading } from "@/types";

const MDX_DIR = path.join(process.cwd(), "docs");

export const getMdxData = async (slug: string) => {
    const filePath = path.join(MDX_DIR, `${slug}/page.mdx`);
    try {
        const fileContent = await fs.readFile(filePath, "utf-8");
        const { content: source, data: frontmatter } = matter(fileContent);

        const headings: Heading[] = source.split('\n')
            .filter(line => /^#{1,3}\s/.test(line))
            .map(line => {
                const level = (line.match(/^#{1,3}/)![0].length);
                const text = line.replace(/^#{1,3}\s/, '').trim();
                const id = text.toLowerCase().replace(/\s+/g, '-');
                return { id, level, text };
            });

        return { frontmatter, source, headings };
    } catch (error) {
        console.error(`Error reading file: ${error}`);
        return null;
    }
};

// export const getAllMdxSlugs = async () => {
//     try {
//         const dirs = await fs.readdir(MDX_DIR);
//         return dirs.filter((dir) => dir !== ".gitkeep");
//     } catch (error) {
//         console.error("Error fetching slugs:", error);
//         return [];
//     }
// };


export const getAllMdxSlugs = async (dir: string = MDX_DIR): Promise<string[]> => {
    let slugs: string[] = [];
    try {
        const entries = await fs.readdir(dir, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                const mdxFilePath = path.join(fullPath, "page.mdx");
                try {
                    await fs.access(mdxFilePath);
                    slugs.push(fullPath.replace(`${MDX_DIR}/`, ""));
                } catch {
                    const subDirSlugs = await getAllMdxSlugs(fullPath);
                    slugs = slugs.concat(subDirSlugs);
                }
            }
        }
    } catch (error) {
        console.error("Error fetching slugs recursively:", error);
    }
    return slugs;
};

export interface DocsNode {
    name: string;
    type: 'file' | 'folder';
    path?: string;
    nodes?: DocsNode[];
}