// @ts-nocheck
import config from 'config';
import EditButton from 'doxium/edit-button';
import ScrollBackButton from 'doxium/scroll-back-button';
import TOC from 'doxium/toc';
import { FiArrowUpRight } from 'icons/fi';
import { Heading } from 'lib/types';

interface SecondarySidebarProps {
    headings: Heading[] | null;
}

const sidebarLinks = config.sidebarLinks;

const SecondarySidebar = ({ headings }: SecondarySidebarProps) => {
    return (
        <div className='sticky top-24 hidden h-fit w-fit min-w-[20vh] flex-shrink-0 flex-col items-start xl:flex'>
            <span className='py-2 text-sm font-bold text-base-950 dark:text-base-50'>On this page</span>
            {headings && (
                <>
                    <TOC headings={headings} />
                    <div className='my-2 h-[1px] w-3/4 bg-black/10 dark:bg-white/15' />
                    <EditButton />
                    {Object.keys(sidebarLinks).map((v, i) => (
                        <a
                            key={i}
                            href={Object.values(sidebarLinks)[i]}
                            rel='noopener noreferrer'
                            target='_blank'
                            className='flex flex-row items-center gap-1 text-sm text-base-500 transition-all duration-300 hover:underline'
                        >
                            {v} <FiArrowUpRight />
                        </a>
                    ))}
                    <ScrollBackButton />
                </>
            )}
        </div>
    );
};

export default SecondarySidebar;
