'use client';

import { cn } from 'lib/utils';
import { useEffect, useRef, useState } from 'react';

interface TabsProps {
    tabs: string[];
    defaultTab?: string;
    widthFull?: boolean;
    sync?: boolean;
}

const Tabs = ({
    tabs,
    defaultTab = tabs[0],
    widthFull = true,
    sync = false,
    children,
}: React.PropsWithChildren<TabsProps>) => {
    const defaultIndex = tabs.indexOf(defaultTab);
    const [activeIndex, setActiveIndex] = useState(defaultIndex);
    const userInitiatedRef = useRef(false);

    useEffect(() => {
        if (typeof window === 'undefined' && !sync) return;
        const savedIndex = localStorage.getItem(JSON.stringify(tabs));
        setActiveIndex(savedIndex !== null ? parseInt(savedIndex, 10) : defaultIndex);
        if (savedIndex === null) localStorage.setItem(JSON.stringify(tabs), defaultIndex.toString());
    }, [tabs, defaultIndex, sync]);

    useEffect(() => {
        if (typeof window === 'undefined' && !sync) return;
        if (userInitiatedRef.current) {
            localStorage.setItem(JSON.stringify(tabs), activeIndex.toString());
            window.dispatchEvent(new CustomEvent('tabChange', { detail: { tabs, activeIndex } }));
            userInitiatedRef.current = false;
        }
    }, [activeIndex, tabs, sync]);

    useEffect(() => {
        if (!sync) return;
        const handleTabChange = (event: CustomEvent) => {
            if (JSON.stringify(event.detail.tabs) === JSON.stringify(tabs)) {
                setActiveIndex(event.detail.activeIndex);
            }
        };
        window.addEventListener('tabChange', handleTabChange as EventListener);
        return () => window.removeEventListener('tabChange', handleTabChange as EventListener);
    }, [tabs, sync]);

    const handleTabClick = (index: number) => {
        userInitiatedRef.current = true;
        setActiveIndex(index);
    };

    return (
        <div className={cn('my-2 flex flex-col', widthFull ? 'w-full' : 'w-fit')}>
            <div className='flex flex-row gap-6 border-b border-white/15'>
                {tabs.map((v, i) => (
                    <button
                        key={i}
                        onClick={() => handleTabClick(i)}
                        className={cn(
                            'border-b pb-2 text-base font-medium transition-all duration-300',
                            activeIndex === i ? 'border-accent-600' : 'border-transparent',
                        )}
                    >
                        {v}
                    </button>
                ))}
            </div>
            <div>{(children as React.ReactNode[])[activeIndex]}</div>
        </div>
    );
};

export default Tabs;
