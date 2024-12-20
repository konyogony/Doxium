// @ts-nocheck

import React from 'react';

const Timeline = ({ children }: React.PropsWithChildren) => {
    const groups = React.Children.toArray(children).reduce<React.ReactElement[][]>((acc, child) => {
        if (React.isValidElement(child) && typeof child.type === 'function' && child.type.name === 'h2') {
            acc.push([child]);
        } else if (React.isValidElement(child)) {
            acc[acc.length - 1]?.push(child);
        }
        return acc;
    }, []);

    return (
        <div className='my-2 ml-4 flex h-fit w-full flex-col border-l border-white/15 pr-4'>
            {groups.map((group, i) => (
                <div key={i} className='flex flex-col gap-2'>
                    <div className='-my-1 flex flex-row items-center'>
                        <div className='relative flex size-10 -translate-x-1/2 items-center justify-center rounded-full bg-$COLOR-950'>
                            <div className='size-8 flex my-auto rounded-full bg-$COLOR-800 justify-center'>
                                <span className='flex my-auto'>{i + 1}</span>
                            </div>
                        </div>
                        {group[0]}
                    </div>
                    <div className='ml-10 flex flex-col'>{group.slice(1)}</div>
                </div>
            ))}
        </div>
    );
};

export default Timeline;
