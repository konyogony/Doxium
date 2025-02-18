import { remarkMermaid } from '@theguild/remark-mermaid';
import config from 'config';
import Breadcrumbs from 'doxium/breadcrumbs';
import mdxComponents from 'doxium/mdx-components';
import NavButtons from 'doxium/nav-buttons';
import SecondarySidebar from 'doxium/secondary-sidebar';
import { getAllMdxSlugs, getDocsTree, getMdxData } from 'lib/lib';
import { params } from 'lib/types';
import { cn } from 'lib/utils';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import rehypeMathjax from 'rehype-mathjax';
import rehypeMdxCodeProps from 'rehype-mdx-code-props';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

export const generateStaticParams = async () => {
    try {
        const files = await getAllMdxSlugs();
        return files.map((slug: string) => ({
            slug: slug.split('/'),
        }));
    } catch (error) {
        console.error('Error generating static params:', error);
        throw error;
    }
};

export const generateMetadata = async ({ params }: { params: params }) => {
    const slug = (await params).slug?.join('/') || 'index';
    const data = await getMdxData(slug);
    if (!data) return notFound();

    const { frontmatter } = data;
    return {
        title: config.misc.showAppNameInTitle ? `${config.misc.appName} | ${frontmatter.title}` : frontmatter.title,
        description: frontmatter.description,
        generator: 'Doxium',
        applicationName: frontmatter.applicationName ?? config.misc.appName,
        keywords: frontmatter.keywords,
        authors: frontmatter.authors,
        creator: frontmatter.creator,
        publisher: frontmatter.publisher,
    };
};

const Page = async ({ params }: { params: params }) => {
    try {
        const slug = (await params).slug?.join('/') || 'index';
        const data = await getMdxData(slug);
        if (!data) return notFound();

        const tree = await getDocsTree();
        const { source, headings } = data;

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
                    <div
                        className={cn(
                            'prose prose-base flex h-fit w-screen flex-shrink-0 flex-col items-start px-6 marker:text-base-800 prose-headings:my-2 prose-headings:w-full prose-headings:border-black/15 prose-h1:my-4 prose-h1:mt-4 prose-h1:border-b prose-h1:pb-2 prose-p:my-2 hover:prose-a:text-accent-600 prose-ol:my-0 prose-ol:mb-4 prose-ul:my-0 prose-ul:mb-4 prose-ul:list-inside prose-ul:pl-0 prose-li:my-0.5 prose-hr:border-black/20 dark:marker:text-base-200 dark:prose-headings:border-white/15 dark:prose-hr:border-white/20 lg:px-0 xl:max-w-[40%]',
                            config.style.colorScheme === 'dark' && 'prose-invert',
                        )}
                    >
                        <Breadcrumbs tree={tree} />
                        {result}
                        <div className='mb-4 mt-8 h-[1px] w-full bg-black/15 dark:bg-white/15' />
                        <NavButtons tree={tree} />
                    </div>
                    <SecondarySidebar headings={headings} />
                </>
            );
        } catch (error) {
            console.error('Error rendering MDX:', error);
            return notFound();
        }
    } catch (error) {
        console.error('Error loading page data:', error);
        return notFound();
    }
};

export default Page;
