// @ts-nocheck

'use client';

import { Heading } from '@/types';
import { cn } from '$LIB-ALIAS/utils';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';

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
            { rootMargin: '0px 0px -80% 0px', threshold: 0.1 },
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
                    'py-1 text-sm transition-all duration-300 hover:underline max-w-48 decoration-dotted',
                    activeHeading === heading.id ? 'text-$ACCENT-COLOR-500 font-medium' : 'text-$COLOR-400 font-normal',
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
