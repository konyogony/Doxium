// @ts-nocheck

import DocsBreadcrumbs from '$COMPONENTS-ALIAS/docs-breadcrumbs';
import DocsNav from '$COMPONENTS-ALIAS/docs-nav';
import SecondarySidebar from '$COMPONENTS-ALIAS/docs-secondary-sidebar';
import Sidebar from '$COMPONENTS-ALIAS/docs-sidebar';
import { getJsonData } from '$LIB-ALIAS/get-json-data';
import { getStructureInstance } from '$LIB-ALIAS/structure';

const DocsLayout = async ({ children }: React.PropsWithChildren) => {
    const { socials } = await getJsonData();
    const structure = await getStructureInstance();
    return (
        <div className='relative flex flex-row justify-center gap-8 py-16 md:py-24'>
            <Sidebar structure={structure} />
            <div className='prose prose-$COLOR px-6 prose-li:my-0.5 prose-ul:my-0 prose-ol:my-0 prose-invert prose-headings:border-white/15 prose-ul:mb-4 prose-ol:mb-4 prose-p:my-2 prose-headings:my-2 prose-headings:mt-8 prose-headings:w-full prose-headings:border-b prose-h1:border-white/20 prose-h2:border-white/10 prose-h3:border-white/5 prose-headings:pb-1.5 prose-a:decoration-dotted hover:prose-a:text-$ACCENT-COLOR-600 prose-ol:my-0 prose-ul:my-0 prose-hr:border-white/20 flex h-fit w-screen flex-shrink-0 flex-col items-start lg:max-w-[40%] lg:px-0'>
                <DocsBreadcrumbs />
                {children}
                <div className='mb-4 mt-8 h-[1px] w-full bg-white/15' />
                <DocsNav structure={structure} />
            </div>
            <SecondarySidebar socials={socials} />
        </div>
    );
};

export default DocsLayout;
