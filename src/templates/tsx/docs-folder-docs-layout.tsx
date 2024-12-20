// @ts-nocheck

import Breadcrumbs from '$COMPONENTS-ALIAS/breadcrumbs';
import NavButtons from '$COMPONENTS-ALIAS/nav-buttons';
import SecondarySidebar from '$COMPONENTS-ALIAS/secondary-sidebar';
import Sidebar from '$COMPONENTS-ALIAS/sidebar-filetree';
import { getJsonData } from '$LIB-ALIAS/get-json-data';
import { getStructureInstance } from '$LIB-ALIAS/structure';

const DocsLayout = async ({ children }: React.PropsWithChildren) => {
    const { socials, separate } = await getJsonData();
    const structure = await getStructureInstance();
    return (
        <div className='min-h-screen relative flex flex-row justify-center gap-8 pt-16 pb-2 lg:pt-24'>
            <Sidebar structure={structure} separate={separate} />
            <div className='prose prose-$COLOR prose-invert flex h-fit w-screen flex-shrink-0 flex-col items-start px-6 prose-headings:my-2 prose-headings:w-full prose-headings:border-white/15 prose-h1:border-white/20 prose-h2:border-white/10 prose-h3:border-white/5 prose-p:my-2 prose-a:decoration-dotted hover:prose-a:text-$ACCENT-COLOR-600 prose-ol:my-0 prose-ol:mb-4 prose-ul:my-0 prose-ul:mb-4 prose-li:my-0.5 prose-hr:border-white/20 lg:max-w-[40%] lg:px-0'>
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
