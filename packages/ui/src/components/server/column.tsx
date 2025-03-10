import { isValidElement, PropsWithChildren, ReactElement } from 'react';
import { cn } from 'server/utils';

export interface ColumnItemProps {
    center?: boolean;
}

export const ColumnItem = ({ children, center }: PropsWithChildren<ColumnItemProps>) => {
    return <div className={cn('flex w-full flex-col py-2', center && 'items-center justify-center')}>{children}</div>;
};

export type ColumnGroupProps = ReactElement<typeof ColumnItem> | Array<ReactElement<typeof ColumnItem>>;

export const ColumnGroup = ({ children }: { children: ColumnGroupProps }) => {
    const columnsArray = Array.isArray(children) ? children : [children];
    return (
        <div
            className='grid w-full gap-4'
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
