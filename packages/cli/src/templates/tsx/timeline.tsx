// @ts-nocheck

import { cn } from 'doxium/utils';
import { Children, isValidElement, PropsWithChildren, ReactElement } from 'react';

// Might be better to use css and pseduoelements to add numbers and stuff, but its to complicated for me
export const Timeline = ({ children }: PropsWithChildren) => {
    const groups = Children.toArray(children).reduce<ReactElement[][]>((acc, child) => {
        if (isValidElement(child) && typeof child.type === 'function' && child.type.name === 'h2') {
            acc.push([child]);
        } else if (isValidElement(child)) {
            acc[acc.length - 1]?.push(child);
        }
        return acc;
    }, []);
    return (
        <div className='my-4 ml-4 flex h-fit w-full flex-col border-l border-black/15 pr-4 dark:border-white/15'>
            {groups.map((group, i) => (
                <div key={i} className='flex flex-col gap-2'>
                    <div className={cn('flex flex-row items-center', i === 0 ? '-mt-1' : 'mt-6')}>
                        <div className='sm-full bg-base-100 dark:bg-base-950 relative flex size-10 -translate-x-1/2 items-center justify-center'>
                            <div className='bg-base-200/50 dark:bg-base-800 my-auto flex size-8 justify-center rounded-full'>
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
