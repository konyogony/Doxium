// @ts-nocheck

import { cn } from 'lib/utils';
import React, { isValidElement, ReactElement } from 'react';

export interface ColumnItemProps {
    center?: boolean;
}

export const ColumnItem = ({ children, center }: React.PropsWithChildren<ColumnItemProps>) => {
    return <div className={cn('flex w-full flex-col', center && 'items-center justify-center')}>{children}</div>;
};

export type ColumnGroupProps = ReactElement<typeof ColumnItem> | Array<ReactElement<typeof ColumnItem>>;

export const ColumnGroup = ({ children }: { children: ColumnGroupProps }) => {
    const columnsArray = Array.isArray(children) ? children : [children];
    return (
        <div
            className='grid w-full gap-2'
            style={{
                gridTemplateColumns: `repeat(${columnsArray.length}, 1fr)`,
            }}
        >
            {columnsArray.map((v) => {
                if (isValidElement(v)) {
                    return <div className='flex flex-col py-2'>{v}</div>;
                }
                return null;
            })}
        </div>
    );
};
