// @ts-nocheck

import config from 'config';

const authors = config.authors;
const appName = config.misc.appName;

const Footer = () => {
    return (
        <div className='mt-auto flex w-full flex-col border-t border-black/15 px-[10vw] py-6 lg:px-[20vw] dark:border-white/15'>
            <div className='text-base-800 dark:text-base-400 flex flex-col justify-between text-xs md:flex-row'>
                <span>
                    © {new Date().getFullYear()} {appName || 'Doxium'}
                </span>
                {Object.keys(authors).length > 0 && (
                    <span>
                        Made with &hearts; by&nbsp;
                        {Object.keys(authors).map((v, i) => (
                            <a
                                href={Object.values(authors)[i]}
                                className='text-primary mr-1'
                                rel='noopener noreferrer'
                                target='_blank'
                                key={i}
                            >
                                {v} {!Object.keys(authors)[i + 1] ? '' : '•'}
                            </a>
                        ))}
                    </span>
                )}
            </div>
        </div>
    );
};

export default Footer;
