import { promises as fs } from 'fs';
import path from 'path';
import { remarkMermaid } from '@theguild/remark-mermaid';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeMathjax from 'rehype-mathjax';
import rehypeMdxCodeProps from 'rehype-mdx-code-props';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

const MDX_DIR = path.join(process.cwd(), 'docs');

export const getMdxSlugs = async () => {
    try {
        console.log(`Reading directory: ${MDX_DIR}`);
        const files = await fs.readdir(MDX_DIR);
        console.log(`Files found: ${files}`);
        return files.map((file) => file.replace(/\.mdx?$/, ''));
    } catch (error) {
        console.error(`Error reading directory: ${error}`);
        throw error;
    }
};

export const getMdxBySlug = async (slug: string) => {
    const filePath = path.join(MDX_DIR, `${slug}/page.mdx`);
    console.log(`Reading file: ${filePath}`);
    try {
        await fs.access(filePath);
    } catch {
        console.log(`File does not exist: ${filePath}`);
        return null;
    }

    try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const { content: source, data: frontmatter } = matter(fileContent);
        const Content = serialize(source, {
            scope: {},
            mdxOptions: {
                remarkPlugins: [remarkGfm, remarkMermaid, remarkMath],
                rehypePlugins: [rehypeMdxCodeProps, rehypeMathjax],
                format: 'mdx',
            },
            parseFrontmatter: false,
        });
        console.log(Content);
        return { frontmatter, Content };
    } catch (error) {
        console.error(`Error reading file: ${error}`);
        throw error;
    }
};
