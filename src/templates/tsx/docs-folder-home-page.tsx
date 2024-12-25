// @ts-nocheck

import { FiChevronRight } from 'icons/fi';
import Link from 'next/link';
import { Button } from 'ui/button';

const Home = () => {
    return (
        <div className='flex flex-col gap-4'>
            <div className='w-full flex h-[90vh] flex-col items-center text-center justify-center gap-2'>
                <span className='text-$COLOR-50 text-6xl font-bold'>Doxium</span>
                <span className='text-$COLOR-300 pb-2 font-medium'>
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
