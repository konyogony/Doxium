// import config from 'config';
// import Breadcrumbs from 'doxium/breadcrumbs';
// import mdxComponents from 'doxium/docs-mdx-components';
// import Footer from 'doxium/footer';
// import NavButtons from 'doxium/nav-buttons';
// import Navbar from 'doxium/navbar';
// import SecondarySidebar from 'doxium/secondary-sidebar';
// import Sidebar from 'doxium/sidebar-filetree';
// import Toaster from 'doxium/toaster';
// import { getMdxBySlug } from 'lib/mdx';
// import { getStructureInstance } from 'lib/structure';
// import { MDXRemote } from 'next-mdx-remote/rsc';

// const socials = config.socials;
// const separate = config.misc.separate;

// const Layout = async ({ params }: { params: Promise<{ slug: string[] }> }) => {
//     const slug = (await params).slug.join('/');
//     const mdxData = await getMdxBySlug(slug);
//     const structure = await getStructureInstance();

//     if (!mdxData) {
//         return <div>Not Found</div>;
//     }

//     const { frontmatter, Content } = mdxData;

//     console.log(frontmatter);
//     return (
//         <div>
//             <Navbar socials={socials} structure={structure} />
//             <div className='relative flex min-h-screen flex-row justify-center gap-8 pb-2 pt-16 lg:pt-24'>
//                 <Sidebar structure={structure} separate={separate} />
//                 <div className='prose prose-base prose-invert flex h-fit w-screen flex-shrink-0 flex-col items-start px-6 marker:text-base-200 prose-headings:my-2 prose-headings:w-full prose-headings:border-white/15 prose-h1:my-4 prose-h1:mt-4 prose-h1:border-b prose-h1:pb-2 prose-p:my-2 prose-a:decoration-dotted hover:prose-a:text-accent-600 prose-ol:my-0 prose-ol:mb-4 prose-ul:my-0 prose-ul:mb-4 prose-ul:list-inside prose-ul:pl-0 prose-li:my-0.5 prose-hr:border-white/20 lg:px-0 xl:max-w-[40%]'>
//                     <Breadcrumbs />
//                     {/* <Content /> */}
//                     <MDXRemote source={Content} components={mdxComponents} />
//                     <div className='mb-4 mt-8 h-[1px] w-full bg-white/15' />
//                     <NavButtons structure={structure} />
//                 </div>
//                 <SecondarySidebar socials={socials} />
//             </div>
//             <Footer />
//             <Toaster />
//         </div>
//     );
// };

// export default Layout;
