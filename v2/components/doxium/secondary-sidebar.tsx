import { Heading } from '@/types';
import config from 'config';
import EditButton from 'doxium/edit-button';
import ScrollBackButton from 'doxium/scroll-back-button';
import TOC from 'doxium/toc';
import { FiArrowUpRight } from 'icons/fi';

interface SecondarySidebarProps {
    headings: Heading[] | null;
}

const SecondarySidebar = ({ headings }: SecondarySidebarProps) => {
    return (
        <div className='sticky top-24 hidden h-fit w-fit min-w-[20vh] flex-shrink-0 flex-col items-start xl:flex'>
            <span className='py-2 text-sm font-bold text-base-950 dark:text-base-50'>On this page</span>
            {headings && (
                <>
                    <TOC headings={headings} />
                    <div className='dakr:bg-white/10 my-2 h-[1px] w-3/4 bg-black/10 dark:bg-white/15' />
                    <EditButton />
                    {Object.keys(config.sidebarLinks).map((v, i) => (
                        <a
                            key={i}
                            href={Object.values(config.sidebarLinks)[i]}
                            rel='noopener noreferrer'
                            target='_blank'
                            className='flex flex-row items-center gap-1 text-sm text-base-400 transition-all duration-300 hover:underline'
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
