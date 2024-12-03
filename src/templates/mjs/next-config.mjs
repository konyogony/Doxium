// @ts-nocheck

import createMDXPlugin from '@next/mdx';
import { remarkMermaid } from '@theguild/remark-mermaid';
import rehypeMdxCodeProps from 'rehype-mdx-code-props';
import remarkGfm from 'remark-gfm';

const mdxConfig = {
    extension: /\.mdx?$/,
    options: {
        remarkPlugins: [remarkGfm, remarkMermaid],
        rehypePlugins: [rehypeMdxCodeProps],
    },
};

const withMDX = createMDXPlugin(mdxConfig);

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    // Optionally, add any other Next.js config below
    reactStrictMode: true,
    serverExternalPackages: ['@shikijs/twoslash'],
};

export default withMDX(nextConfig);
// turbo will be enabled by default, for because of createMDXPlugin. Dont know how to fix :-/
