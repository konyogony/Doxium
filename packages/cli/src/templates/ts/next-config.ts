import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    pageExtensions: ['ts', 'tsx'],
    reactStrictMode: true,
    serverExternalPackages: ['@shikijs/twoslash'],
};

export default nextConfig;
