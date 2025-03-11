// @ts-nocheck

'use client';

import { cn } from 'doxium/utils';
import { FiChevronDown } from 'icons/fi';
import { Children, isValidElement, PropsWithChildren, ReactElement, ReactNode, useState } from 'react';

export const Accordion = ({ children }: PropsWithChildren) => {
    const groups = Children.toArray(children).reduce<ReactElement[][]>((acc, child) => {
        if (isValidElement(child) && (child.props as { variant: string }).variant === 'h3') {
            acc.push([child]);
        } else if (isValidElement(child)) {
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
                const headingValue = (heading as ReactElement<{ children: ReactNode }>).props.children;
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
                            'grid w-full grid-rows-[min-content_0fr] border-b border-black/15 transition-[grid-template-rows] duration-300 dark:border-white/15',
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
                                    'text-base-800 dark:text-base-400 ml-auto transition-transform duration-300',
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
