import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FiChevronRight } from 'react-icons/fi';

const Home = () => {
    return (
        <div className='flex flex-col gap-4'>
            <div className='ml-[35vw] flex h-[80vh] w-fit flex-col justify-center gap-2'>
                <span className='text-6xl font-bold text-zinc-50'>Doxium</span>
                <span className='pb-2 font-medium text-zinc-300'>
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
