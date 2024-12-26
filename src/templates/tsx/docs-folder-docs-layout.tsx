// @ts-nocheck

import Breadcrumbs from 'doxium/breadcrumbs';
import NavButtons from 'doxium/nav-buttons';
import SecondarySidebar from 'doxium/secondary-sidebar';
import Sidebar from 'doxium/sidebar-filetree';
import { getJsonData } from 'lib/get-json-data';
import { getStructureInstance } from 'lib/structure';

const DocsLayout = async ({ children }: React.PropsWithChildren) => {
    const { socials, separate } = await getJsonData();
    const structure = await getStructureInstance();
    return (
        <div className='min-h-screen relative flex flex-row justify-center gap-8 pt-16 pb-2 lg:pt-24'>
            <Sidebar structure={structure} separate={separate} />
            <div className='prose prose-base prose-invert flex h-fit w-screen flex-shrink-0 flex-col items-start px-6 marker:text-base-200 prose-headings:my-2 prose-headings:w-full prose-headings:border-white/15 prose-h1:my-4 prose-h1:mt-4 prose-h1:border-b prose-h1:pb-2 prose-p:my-2 prose-a:decoration-dotted hover:prose-a:text-accent-600 prose-ol:my-0 prose-ol:mb-4 prose-ul:my-0 prose-ul:mb-4 prose-ul:list-inside prose-li:my-0.5 prose-hr:border-white/20 lg:max-w-[40%] lg:px-0'>
                <Breadcrumbs />
                {children}
                <div className='mb-4 mt-8 h-[1px] w-full bg-white/15' />
                <NavButtons structure={structure} />
            </div>
            <SecondarySidebar socials={socials} />
        </div>
    );
};

export default DocsLayout;
