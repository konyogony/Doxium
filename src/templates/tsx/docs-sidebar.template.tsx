// @ts-nocheck

import { DocsFolder } from '@/components/doxium/docs-folder';
import { DocsLink } from '@/components/doxium/docs-link';
import { structure } from '@/config';

export const Sidebar = () => {
    return (
        <div className='sticky top-24 hidden h-full w-fit min-w-[15vh] flex-shrink-0 flex-col items-start lg:flex'>
            <DocsLink name='Documentation' path='/docs' title={true} />
            {structure.map((v, i) => (
                <DocsFolder key={i} node={v} />
            ))}
        </div>
    );
};

export default Sidebar;
