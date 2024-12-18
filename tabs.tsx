'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Children, useEffect, useState } from 'react';

interface DocsTabsProps {
    tabs: string[];
    defaultTab?: string;
    widthFull?: boolean;
    sync?: boolean;
}

const DocsTabs = ({
    tabs,
    defaultTab = tabs[0],
    widthFull = true,
    sync = false,
    children,
}: React.PropsWithChildren<DocsTabsProps>) => {
    const [currentValue, setCurrentValue] = useState<string>(defaultTab);
    const key = JSON.stringify(tabs);

    // Initialize the tab value from localStorage or create it if it doesn't exist
    useEffect(() => {
        if (sync) {
            const storedValue = localStorage.getItem(key);
            if (storedValue) {
                setCurrentValue(storedValue);
            } else {
                localStorage.setItem(key, defaultTab);
            }
        }
    }, [key, defaultTab, sync]);

    // Handle changes to the tab selection and update localStorage
    const handleTabChange = (value: string) => {
        if (sync) {
            setCurrentValue(value);
            localStorage.setItem(key, value);
        }
    };

    // Sync tab across different components or windows using the storage event
    useEffect(() => {
        if (sync) {
            const handleStorageChange = (event: StorageEvent) => {
                if (event.key === key) {
                    setCurrentValue(event.newValue || defaultTab);
                }
            };

            // Listen for changes in localStorage
            window.addEventListener('storage', handleStorageChange);

            return () => {
                window.removeEventListener('storage', handleStorageChange);
            };
        }
    }, [key, sync, defaultTab]);

    return (
        <Tabs
            value={sync ? currentValue : defaultTab}
            onValueChange={handleTabChange}
            className={widthFull ? 'w-full' : ''}
        >
            <TabsList className={widthFull ? 'w-full' : ''}>
                {tabs.map((v, i) => (
                    <TabsTrigger value={v} key={i} className={widthFull ? 'w-full' : ''}>
                        {v}
                    </TabsTrigger>
                ))}
            </TabsList>
            {Children.map(children, (v, i) => (
                <TabsContent value={tabs[i]} key={i}>
                    {v}
                </TabsContent>
            ))}
        </Tabs>
    );
};

export default DocsTabs;
