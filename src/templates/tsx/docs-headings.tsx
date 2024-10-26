// @ts-nocheck

'use client';

import { cn } from '$LIB-ALIAS/utils';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export const DocsHeadings = () => {
    const [headings, setHeadings] = useState<HTMLHeadingElement[]>([]);
    const [activeHeading, setActiveHeading] = useState<string>('');
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
        updateHeadings();
    }, [pathname]);

    return (
        <>
            {headings.map((heading, i) => (
                <a
                    href={`#${heading.id}`}
                    className={cn(
                        'py-1 text-sm font-normal hover:saturate-150 transition-all duration-300 hover:text-$ACCENT-COLOR-400',
                        activeHeading === heading.id ? 'text-$ACCENT-COLOR-500' : 'text-$COLOR-400',
                    )}
                    key={i}
                >
                    {heading.innerText.length > 30 ? `${heading.innerText.slice(0, 30)}...` : heading.innerText}
                </a>
            ))}
        </>
    );
};
