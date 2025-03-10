import { Button, cn, SecondarySidebar } from '@doxium/ui/server';
import config from 'config';
import Link from 'next/link';

const colorScheme = config.style.colorScheme;

const NotFound = () => {
    return (
        <>
            <div
                className={cn(
                    'prose prose-base marker:text-base-800 prose-headings:my-2 prose-headings:w-full prose-headings:border-black/15 prose-h1:my-4 prose-h1:mt-4 prose-h1:border-b prose-h1:pb-2 prose-p:my-2 hover:prose-a:text-accent-600 prose-ol:my-0 prose-ol:mb-4 prose-ul:my-0 prose-ul:mb-4 prose-ul:list-inside prose-ul:pl-0 prose-li:my-0.5 prose-hr:border-black/20 dark:marker:text-base-200 dark:prose-headings:border-white/15 dark:prose-hr:border-white/20 flex h-fit w-screen shrink-0 flex-col items-start px-6 lg:px-0 xl:max-w-[40%]',
                    colorScheme === 'dark' && 'prose-invert',
                )}
            >
                <h1>404 Not Found</h1>
                <p>Oops! Seems like the page you are looking for does not exist.</p>
                <Button asChild className='mt-4 !no-underline' variant={'outline'}>
                    <Link href='/'>Go Home</Link>
                </Button>
                <div className='mt-8 mb-4 h-[1px] w-full bg-white/15' />
            </div>
            <SecondarySidebar headings={null} />
        </>
    );
};

export default NotFound;
