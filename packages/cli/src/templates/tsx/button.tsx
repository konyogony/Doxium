// @ts-nocheck

// This is from shadcn/ui

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from 'doxium/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

const buttonVariants = cva(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-base-950 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:focus-visible:ring-base-300',
    {
        variants: {
            variant: {
                default:
                    'bg-base-900 text-base-50 shadow-sm hover:bg-base-900/90 dark:bg-base-50 dark:text-base-900 dark:hover:bg-base-50/90',
                destructive:
                    'bg-red-500 text-base-50 shadow-xs hover:bg-red-500/90 dark:bg-red-900 dark:text-base-50 dark:hover:bg-red-900/90',
                outline:
                    'border border-base-200 bg-white shadow-xs hover:bg-base-100 hover:text-base-900 dark:border-base-800 dark:bg-base-950 dark:hover:bg-base-800 dark:hover:text-base-50',
                secondary:
                    'bg-base-100 text-base-900 shadow-xs hover:bg-base-100/80 dark:bg-base-800 dark:text-base-50 dark:hover:bg-base-800/80',
                ghost: 'hover:bg-base-100 hover:text-base-900 dark:hover:bg-base-800 dark:hover:text-base-50',
                link: 'text-base-900 underline-offset-4 hover:underline dark:text-base-50',
            },
            size: {
                default: 'h-9 px-4 py-2',
                sm: 'h-8 rounded-md px-3 text-xs',
                lg: 'h-10 rounded-md px-8',
                icon: 'h-9 w-9',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button';
        return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
    },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
