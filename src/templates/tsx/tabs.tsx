// @ts-nocheck
'use client';

import { cn } from 'lib/utils';
import { useState } from 'react';

interface TabsProps {
    tabs: string[];
    defaultTab?: string;
    widthFull?: boolean;
}

const CustomTabs = ({ tabs, defaultTab = tabs[0], widthFull = true, children }: React.PropsWithChildren<TabsProps>) => {
    const [activeIndex, setActiveIndex] = useState(tabs.indexOf(defaultTab));
    return (
        <div className={cn('my-2 flex flex-col', widthFull ? 'w-full' : 'w-fit')}>
            <div className='flex flex-row gap-6 border-b border-white/15'>
                {tabs.map((v, i) => (
                    <button
                        key={i}
                        onClick={() => setActiveIndex(i)}
                        className={cn(
                            'border-b pb-2 text-base font-medium transition-all duration-300',
                            activeIndex === i ? 'border-$ACCENT-COLOR-600' : 'border-transparent',
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

export default CustomTabs;
