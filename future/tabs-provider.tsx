// @ts-nocheck

'use client';

// TabsProvider.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';

interface KeyValue {
    key: string;
    value: string;
}

interface TabsState {
    data: KeyValue[];
    setValue: (key: string, value: string) => void;
}

const TabsStateContext = createContext<TabsState | null>(null);

export const TabsProvider = ({ children }: { children: React.ReactNode }) => {
    const [data, setData] = useState<KeyValue[]>([]); // Initialize with empty state

    // Load state from localStorage on first render
    useEffect(() => {
        try {
            const keys = Object.keys(localStorage).filter((key) => key.startsWith('tabsState-'));
            const savedState = keys.map((key) => ({
                key: key.replace('tabsState-', ''),
                value: localStorage.getItem(key) || '',
            }));
            setData(savedState);
        } catch (error) {
            console.error('Error loading tabs state from localStorage:', error);
        }
    }, []);

    useEffect(() => {
        const channel = new BroadcastChannel('tabs-state');

        // Sync state across tabs when a change occurs
        channel.onmessage = (event) => {
            const newData = event.data;
            setData(newData); // Update state only when the data is different
        };

        return () => {
            channel.close();
        };
    }, []);

    const setValue = (key: string, value: string) => {
        setData((prevState) => {
            const existingItemIndex = prevState.findIndex((item) => item.key === key);
            let newData;
            if (existingItemIndex !== -1) {
                newData = prevState.map((item) => (item.key === key ? { ...item, value } : item));
            } else {
                newData = [...prevState, { key, value }];
            }
            if (JSON.stringify(prevState) === JSON.stringify(newData)) {
                return prevState; // Return early if no changes
            }

            // Sync the updated state across tabs
            const channel = new BroadcastChannel('tabs-state');
            channel.postMessage(newData);
            channel.close();

            // Save the updated state to individual localStorage entries
            localStorage.setItem(`tabsState-${key}`, value);

            return newData;
        });
    };

    return <TabsStateContext.Provider value={{ data, setValue }}>{children}</TabsStateContext.Provider>;
};

export const useTabsState = () => {
    const context = useContext(TabsStateContext);
    if (!context) {
        throw new Error('useTabsState must be used within a TabsProvider');
    }
    return context;
};
