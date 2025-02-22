// @ts-nocheck

import { Button } from '@doxium/ui';
import { FiChevronRight } from 'icons/fi';
import Link from 'next/link';

const Home = () => {
    return (
        <div className='flex flex-col gap-4'>
            <div className='flex min-h-screen w-full flex-col items-center justify-center gap-2 text-center'>
                <span className='text-base-50 text-6xl font-bold'>Doxium</span>
                <span className='text-base-300 pb-2 font-medium'>
                    An easy solution to generate modern documentation in Next.js
                </span>
                <Button className='w-fit' asChild>
                    <Link href='/docs' className='flex items-center'>
                        Visit the docs <FiChevronRight size={12} className='-ml-0.5 mt-[1px]' />
                    </Link>
                </Button>
            </div>
        </div>
    );
};

export default Home;
