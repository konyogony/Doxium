import { cn } from 'lib/utils';
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
        <div className='my-4 ml-4 flex h-fit w-full flex-col border-l border-white/15 pr-4'>
            {groups.map((group, i) => (
                <div key={i} className='flex flex-col gap-2'>
                    <div className={cn('flex flex-row items-center', i === 0 ? '-mt-1' : 'mt-6')}>
                        <div className='relative flex size-10 -translate-x-1/2 items-center justify-center rounded-full bg-base-950'>
                            <div className='my-auto flex size-8 justify-center rounded-full bg-base-800'>
                                <span className='my-auto flex'>{i + 1}</span>
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
