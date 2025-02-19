import React, { isValidElement, ReactElement } from 'react';

export const ColumnItem = ({ children }: React.PropsWithChildren) => {
    return <div className='flex w-full flex-col'>{children}</div>;
};

export type ColumnGroupProps = ReactElement<typeof ColumnItem> | Array<ReactElement<typeof ColumnItem>>;

export const ColumnGroup = ({ children }: { children: ColumnGroupProps }) => {
    const columnsArray = Array.isArray(children) ? children : [children];
    return (
        <div
            className='grid w-full'
            style={{
                gridTemplateColumns: `repeat(${columnsArray.length}, 1fr)`,
            }}
        >
            {columnsArray.map((v) => {
                if (isValidElement(v)) {
                    return v;
                }
                return null;
            })}
        </div>
    );
};
