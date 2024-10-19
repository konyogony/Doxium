// @ts-nocheck

import { mdxComponents } from '@/components/ui/docs-mdx-components';
import type { MDXComponents } from 'mdx/types';

export const useMDXComponents = (components: MDXComponents): MDXComponents => {
    return {
        ...mdxComponents,
        ...components,
    };
};
