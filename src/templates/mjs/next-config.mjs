import createMDXPlugin from '@next/mdx';
import remarkGfm from 'remark-gfm';

const mdxConfig = {
    extension: /\.mdx?$/,
    options: {
        remarkPlugins: [remarkGfm],
        // rehypePlugins: [],
    },
};

const withMDX = createMDXPlugin(mdxConfig);

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    // Optionally, add any other Next.js config below
    reactStrictMode: true,
};

export default withMDX(nextConfig);
