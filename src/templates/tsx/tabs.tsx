// @ts-nocheck

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Children } from 'react';

interface TabsProps {
    tabs: string[];
    defaultTab?: string;
    widthFull?: boolean;
}

const Tabs = ({
    tabs,
    defaultTab = tabs[0],
    widthFull = true,
    children,
}: React.PropsWithChildren<TabsProps>) => {
    return (
        <Tabs defaultValue={defaultTab} className={widthFull ? 'w-full' : ''}>
            <TabsList className={widthFull ? 'w-full' : ''}>
                {tabs.map((v, i) => (
                    <TabsTrigger value={v} key={i} className={widthFull ? 'w-full' : ''}>
                        {v}
                    </TabsTrigger>
                ))}
            </TabsList>
            {Children.map(children, (v, i) => {
                return (
                    <TabsContent value={tabs[i]} key={i}>
                        {v}
                    </TabsContent>
                );
            })}
        </Tabs>
    );
};

export default Tabs;
