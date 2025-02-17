'use client';

import { cn } from 'lib/utils';
import { useEffect, useState } from 'react';

export interface TabsProps {
    tabs: string[];
    defaultTab?: string;
    widthFull?: boolean;
    sync?: boolean;
    children: React.ReactNode[] | React.ReactNode;
}

const getTabGroupId = (tabs: string[]) => `tabs:${tabs.join(',')}`;

const Tabs = ({ tabs, defaultTab = tabs[0], widthFull = true, sync = false, children }: TabsProps) => {
    const defaultIndex = tabs.indexOf(defaultTab);
    const [activeIndex, setActiveIndex] = useState(defaultIndex);
    const tabGroupId = getTabGroupId(tabs);
    const childrenArray = Array.isArray(children) ? children : [children];

    useEffect(() => {
        if (!sync) return;

        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === tabGroupId && e.newValue !== null) {
                setActiveIndex(parseInt(e.newValue, 10));
            }
        };

        const handleTabSync = (e: Event) => {
            const event = e as CustomEvent;
            if (event.detail.id === tabGroupId) {
                setActiveIndex(event.detail.index);
            }
        };

        const savedIndex = localStorage.getItem(tabGroupId);
        if (savedIndex !== null) {
            setActiveIndex(parseInt(savedIndex, 10));
        }

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('tabSync', handleTabSync);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('tabSync', handleTabSync);
        };
    }, [sync, tabGroupId]);

    const handleTabClick = (index: number) => {
        setActiveIndex(index);
        if (sync) {
            localStorage.setItem(tabGroupId, index.toString());
            window.dispatchEvent(
                new CustomEvent('tabSync', {
                    detail: { id: tabGroupId, index },
                }),
            );
            window.dispatchEvent(
                new StorageEvent('storage', {
                    key: tabGroupId,
                    newValue: index.toString(),
                }),
            );
        }
    };

    return (
        <div className={cn('my-2 flex flex-col', widthFull ? 'w-full' : 'w-fit')}>
            <div className='flex flex-row gap-6 border-b border-black/15 dark:border-white/15'>
                {tabs.map((tab, i) => (
                    <button
                        key={tab}
                        onClick={() => handleTabClick(i)}
                        className={cn(
                            'border-b pb-2 text-base font-medium transition-all duration-300',
                            activeIndex === i ? 'border-accent-600' : 'border-transparent',
                        )}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            <div className='mt-4'>{childrenArray[activeIndex]}</div>
        </div>
    );
};

export default Tabs;
