'use client';

import { FiChevronDown } from 'icons/fi';
import { cn } from 'lib/utils';
import React, { useState } from 'react';

const Accordion = ({ children }: React.PropsWithChildren) => {
    const groups = React.Children.toArray(children).reduce<React.ReactElement[][]>((acc, child) => {
        if (React.isValidElement(child) && (child.props as { variant: string }).variant === 'h3') {
            acc.push([child]);
        } else if (React.isValidElement(child)) {
            acc[acc.length - 1]?.push(child);
        }
        return acc;
    }, []);

    const [openStates, setOpenStates] = useState<boolean[]>(groups.map(() => false));

    const toggleOpen = (index: number) => {
        setOpenStates((prev) => {
            const newStates = [...prev];
            newStates[index] = !newStates[index];
            return newStates;
        });
    };

    return (
        <div className='flex h-fit w-full flex-col'>
            {groups.map(([heading, ...items], i) => {
                const headingValue = (heading as React.ReactElement<{ children: React.ReactNode }>).props.children;
                const id = headingValue
                    ?.toString()
                    .trim()
                    .toLocaleLowerCase()
                    .replace(/\s+/g, '-')
                    .replace(/[^\p{L}\p{N}-]/gu, '')
                    .replace(/\./g, '');
                return (
                    <div
                        key={i}
                        className={cn(
                            'grid w-full grid-rows-[min-content_0fr] border-b border-white/15 transition-[grid-template-rows] duration-300',
                            openStates[i] ? 'grid-rows-[min-content_1fr]' : '',
                        )}
                    >
                        <h3
                            id={id}
                            onClick={() => toggleOpen(i)}
                            className='!mb-0 !mt-2 flex cursor-pointer flex-row items-center'
                        >
                            {headingValue}
                            <FiChevronDown
                                size={18}
                                className={cn(
                                    'ml-auto text-base-400 transition-transform duration-300',
                                    openStates[i] && 'rotate-180',
                                )}
                            />
                        </h3>
                        <div className='mb-2 flex w-full flex-col gap-2 overflow-hidden duration-500'>{items}</div>
                    </div>
                );
            })}
        </div>
    );
};

export default Accordion;
