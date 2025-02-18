import config from 'config';

const Footer = () => {
    return (
        <div className='mt-auto flex w-full flex-col border-t border-black/15 px-[10vw] py-6 dark:border-white/15 lg:px-[20vw]'>
            <div className='flex flex-row justify-between text-xs text-base-800 dark:text-base-400'>
                <span>
                    © {new Date().getFullYear()} {config.misc.appName || 'Doxium'}
                </span>
                <span>
                    Made with &hearts; by&nbsp;
                    {Object.keys(config.authors).map((v, i) => (
                        <a
                            href={Object.values(config.authors)[i]}
                            className='text-primary mr-1'
                            rel='noopener noreferrer'
                            target='_blank'
                            key={i}
                        >
                            {v} {!Object.keys(config.authors)[i + 1] ? '' : '•'}
                        </a>
                    ))}
                </span>
            </div>
        </div>
    );
};

export default Footer;
