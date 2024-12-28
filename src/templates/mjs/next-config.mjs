// @ts-nocheck

import createMDXPlugin from '@next/mdx';
import { remarkMermaid } from '@theguild/remark-mermaid';
import rehypeMathjax from 'rehype-mathjax';
import rehypeMdxCodeProps from 'rehype-mdx-code-props';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

const mdxConfig = {
    extension: /\.mdx?$/,
    options: {
        remarkPlugins: [remarkGfm, remarkMermaid, remarkMath],
        rehypePlugins: [rehypeMdxCodeProps, rehypeMathjax],
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
