import { cn } from 'server/utils';

export const Outline = ({ children }: { children: React.ReactNode }) => {
    return (
        <div
            className={cn(
                'flex w-full flex-col items-center justify-center rounded-lg border border-black/15 px-4 py-2 dark:border-white/15',
            )}
        >
            {children}
        </div>
    );
};
