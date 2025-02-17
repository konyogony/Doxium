// @ts-nocheck

'use client';

import { cn } from 'lib/utils';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Heading } from 'types';

const TOC = () => {
    const [headings, setHeadings] = useState<Heading[]>([]);
    const [activeHeading, setActiveHeading] = useState<string>('');
    const pathname = usePathname();

    const updateHeadings = useCallback(() => {
        const headingElements = Array.from(document.querySelectorAll('h1, h2, h3')) as HTMLHeadingElement[];
        const newHeadings: Heading[] = headingElements.map((heading, index) => {
            if (!heading.id) {
                heading.id = `heading-${index}`;
            }
            return {
                id: heading.id,
                level: parseInt(heading.tagName.replace('H', ''), 10),
                text: heading.innerText,
            };
        });
        setHeadings(newHeadings);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveHeading(entry.target.id);
                    }
                });
            },
            { rootMargin: '0px 0px -50% 0px', threshold: [0.1, 0.5, 1.0] },
        );

        headingElements.forEach((heading) => {
            observer.observe(heading);
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        updateHeadings();
    }, [pathname, updateHeadings]);

    const memoizedHeadings = useMemo(() => {
        return headings.map((heading, i) => (
            <a
                href={`#${heading.id}`}
                className={cn(
                    'py-[4.5px] text-sm transition-all duration-200 hover:underline max-w-48 decoration-dotted',
                    activeHeading === heading.id ? 'text-accent-500 font-semibold' : 'text-base-400 font-normal',
                    heading.level === 1 && 'font-semibold',
                )}
                style={{
                    paddingLeft: `${(heading.level - 1) * 10}px`,
                }}
                key={i}
            >
                {heading.text}
            </a>
        ));
    }, [headings, activeHeading]);

    return <>{memoizedHeadings}</>;
};

export default TOC;
