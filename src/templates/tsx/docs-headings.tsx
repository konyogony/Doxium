// @ts-nocheck

'use client';

import { cn } from '$LIB-ALIAS/utils';
import { Heading } from '$TYPES-ALIAS/heading';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export const DocsHeadings = () => {
    const [headings, setHeadings] = useState<Heading[]>([]);
    const [activeHeading, setActiveHeading] = useState<string>('');
    const pathname = usePathname();

    const updateHeadings = () => {
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
    };

    useEffect(() => {
        updateHeadings();
    }, [pathname]);

    return (
        <>
            {headings.map((heading, i) => {
                console.log(heading);
                return (
                    <a
                        href={`#${heading.id}`}
                        className={cn(
                            'py-1 text-sm font-normal transition-all duration-300 hover:text-$ACCENT-COLOR-400 hover:saturate-150',
                            activeHeading === heading.id ? 'text-$ACCENT-COLOR-500' : 'text-$COLOR-400',
                            `pl-${heading.level * 2}`,
                        )}
                        key={i}
                    >
                        {heading.text.length > 30 ? `${heading.text.slice(0, 30)}...` : heading.text}
                    </a>
                );
            })}
        </>
    );
};
