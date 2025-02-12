import Card, { CardProps } from 'doxium/card';
import React, { ReactElement } from 'react';

interface CardGroupProps {
    cols: number;
    children: ReactElement<CardProps> | ReactElement<CardProps>[];
}

const CardGroup = ({ cols, children }: CardGroupProps) => {
    const modifiedChildren = React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === Card) {
            return React.cloneElement(child, { full: true });
        }
        return child;
    });
    return (
        <div
            style={{
                gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
            }}
            className={'grid w-full gap-2'}
        >
            {modifiedChildren}
        </div>
    );
};

export default CardGroup;
