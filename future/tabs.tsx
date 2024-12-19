// @ts-nocheck

'use client';

import { useTabsState } from '@/components/doxium/tabs-provider';
import { TabsContent, TabsList, TabsTrigger, Tabs as UITabs } from '@/components/ui/tabs';
import { Children, useEffect, useState } from 'react';

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
    const { data, setValue } = useTabsState();
    const key = tabs.join(',');

    const [localValue, setLocalValue] = useState<string>(defaultTab); // Start with defaultTab value

    // Find the value for the specific key in the global state (from TabsStateContext)
    const keyValue = data.find((item) => item.key === key);

    useEffect(() => {
        if (sync) {
            if (keyValue && keyValue.value) {
                // If value exists in TabsStateContext (localStorage synced), use it
                setLocalValue(keyValue.value);
            } else if (!keyValue) {
                // If no value exists in TabsStateContext, set defaultTab to global state and localStorage
                setValue(key, defaultTab);
            }
        }
    }, [keyValue, setValue, sync, key, defaultTab]);

    // Handle tab changes
    const handleChange = (value: string) => {
        if (sync && value !== localValue) {
            setLocalValue(value); // Update local state
            setValue(key, value); // Sync across tabs and store in localStorage
        }
    };

    // If sync is enabled, load the correct value and sync with BroadcastChannel
    return sync ? (
        <UITabs
            value={localValue} // Controlled value with local state
            onValueChange={handleChange}
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
        </UITabs>
    ) : (
        <UITabs defaultValue={defaultTab} className={widthFull ? 'w-full' : ''}>
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
        </UITabs>
    );
};

export default Tabs;
