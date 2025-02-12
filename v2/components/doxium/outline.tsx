import { cn } from 'lib/utils';

const Outline = ({ children }: { children: React.ReactNode }) => {
    return <div className={cn('w-full rounded-lg border border-white/15 px-4 py-2')}>{children}</div>;
};

export default Outline;
