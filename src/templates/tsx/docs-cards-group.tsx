// @ts-nocheck

import DocsCards, { DocsCardsProps } from '$COMPONENTS-ALIAS/docs-cards';
import React, { ReactElement } from 'react';

interface DocsCardsGroupProps {
    cols: number;
    children: ReactElement<DocsCardsProps> | ReactElement<DocsCardsProps>[];
}

const DocsCardsGroup = ({ cols, children }: DocsCardsGroupProps) => {
    const modifiedChildren = React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === DocsCards) {
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

export default DocsCardsGroup;
