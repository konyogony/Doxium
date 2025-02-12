const Footer = () => {
    return (
        <div className='mt-auto flex w-full flex-col border-t border-white/15 px-[10vw] py-6 lg:px-[20vw]'>
            <div className='flex flex-row justify-between text-xs text-base-400'>
                <span>© 2024 Doxium</span>
                <span>
                    Made with &hearts; by&nbsp;
                    <a
                        href='https://github.com/konyogony'
                        className='text-primary'
                        rel='noopener noreferrer'
                        target='_blank'
                    >
                        konyogony
                    </a>
                </span>
            </div>
        </div>
    );
};

export default Footer;
