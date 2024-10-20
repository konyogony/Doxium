// @ts-nocheck

'use client';

import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FiArrowUp, FiArrowUpRight } from 'react-icons/fi';

export const SecondarySidebar = () => {
    const [headings, setHeadings] = useState<HTMLHeadingElement[]>([]);
    const [activeHeading, setActiveHeading] = useState<string>('');
    const [scrollHeight, setScrollHeight] = useState(0);
    const pathname = usePathname();

    const updateHeadings = () => {
        const headingElements = Array.from(document.querySelectorAll('h1, h2, h3')) as HTMLHeadingElement[];
        headingElements.forEach((heading, index) => {
            if (!heading.id) {
                heading.id = `heading-${index}`;
            }
        });
        setHeadings(headingElements);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveHeading(entry.target.id);
                    }
                });
            },
            { rootMargin: '0px 0px -80% 0px', threshold: 0.1 },
        );

        headingElements.forEach((heading) => {
            observer.observe(heading);
        });

        return () => {
            observer.disconnect();
        };
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrollHeight(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrollHeight]);

    useEffect(() => {
        updateHeadings();
    }, [pathname]);

    return (
        <div className='sticky top-24 hidden h-fit w-fit min-w-[20vh] flex-shrink-0 flex-col items-start lg:flex'>
            <span className='text-$COLOR-50 py-2 text-sm font-bold'>On this page</span>
            {headings.map((heading, i) => (
                <a
                    href={`#${heading.id}`}
                    className={cn(
                        'hover:text-$COLOR-200 py-1 text-sm font-normal transition-all duration-300',
                        activeHeading === heading.id ? 'text-$COLOR-50' : 'text-$COLOR-400',
                    )}
                    key={i}
                >
                    {heading.innerText.length > 30 ? `${heading.innerText.slice(0, 30)}...` : heading.innerText}
                </a>
            ))}
            <div className='my-2 h-[1px] w-3/4 bg-white/10' />
            <a
                href={`https://github.com/konyogony/konyogony.dev/tree/main/frontend/src/app/${pathname}/page.mdx`}
                rel='noopener noreferrer'
                target='_blank'
                className='text-$COLOR-400 hover:text-$COLOR-200 flex flex-row items-center gap-1 text-sm'
            >
                Edit this page on GitHub <FiArrowUpRight />
            </a>
            {scrollHeight > 300 && (
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className='text-$COLOR-400 hover:text-$COLOR-200 my-1 flex items-center gap-1 text-sm'
                >
                    Back to top <FiArrowUp />
                </button>
            )}
        </div>
    );
};
