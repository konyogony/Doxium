import { getAllMdxSlugs, getDocsTree, getMdxData } from '@/lib/lib';
import { remarkMermaid } from '@theguild/remark-mermaid';
import Breadcrumbs from 'doxium/breadcrumbs';
import mdxComponents from 'doxium/docs-mdx-components';
import NavButtons from 'doxium/nav-buttons';
import SecondarySidebar from 'doxium/secondary-sidebar';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import rehypeMathjax from 'rehype-mathjax';
import rehypeMdxCodeProps from 'rehype-mdx-code-props';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

export const generateStaticParams = async () => {
    const files = await getAllMdxSlugs();
    return files.map((slug: string) => ({
        slug: slug.split('/'),
    }));
};

const Page = async ({
    params,
}: {
    params: Promise<{
        slug?: string[];
    }>;
}) => {
    const slug = (await params).slug?.join('/') || 'index';
    const data = await getMdxData(slug);
    if (!data) return notFound();
    const tree = await getDocsTree();
    const { source, frontmatter, headings } = data;
    console.log('frontmatter', frontmatter);
    console.log('tree', tree);
    console.log('headings', headings);

    try {
        const result = await MDXRemote({
            source: source,
            options: {
                mdxOptions: {
                    remarkPlugins: [remarkGfm, remarkMermaid, remarkMath],
                    rehypePlugins: [rehypeMdxCodeProps, rehypeMathjax],
                    format: 'mdx',
                },
                parseFrontmatter: false,
            },
            components: mdxComponents,
        });
        return (
            <>
                <div className='prose prose-base prose-invert flex h-fit w-screen flex-shrink-0 flex-col items-start px-6 marker:text-base-200 prose-headings:my-2 prose-headings:w-full prose-headings:border-white/15 prose-h1:my-4 prose-h1:mt-4 prose-h1:border-b prose-h1:pb-2 prose-p:my-2 hover:prose-a:text-accent-600 prose-ol:my-0 prose-ol:mb-4 prose-ul:my-0 prose-ul:mb-4 prose-ul:list-inside prose-ul:pl-0 prose-li:my-0.5 prose-hr:border-white/20 lg:px-0 xl:max-w-[40%]'>
                    <Breadcrumbs />
                    {result}
                    <div className='mb-4 mt-8 h-[1px] w-full bg-white/15' />
                    <NavButtons tree={tree} />
                </div>
                <SecondarySidebar headings={headings} />
            </>
        );
    } catch (error) {
        console.error('Error rendering MDX:', error);
        notFound();
    }
};

export default Page;
