// @ts-nocheck

import { FiTerminal } from 'icons/fi';
import { SiHtml5, SiJavascript, SiMdx, SiReact, SiRust, SiTailwindcss, SiTypescript } from 'icons/si';
import { VscJson, VscSymbolFile } from 'icons/vsc';
import { JSX } from 'react';

interface WikiCodeWrapperIconReturn {
    icon: JSX.Element;
    lang: string;
}

interface WikiCodeWrapperIconProps {
    language: string;
    name: string | undefined;
}

const WikiCodeWrapperIcon = ({ language, name }: WikiCodeWrapperIconProps) => {
    return (
        <>
            {getIcon(language).icon}
            {name ? (
                <span className='text-xs text-gray-950 dark:text-gray-300/80'>{name}</span>
            ) : (
                getIcon(language).lang
            )}
        </>
    );
};

const getIcon = (language: string): WikiCodeWrapperIconReturn => {
    switch (language) {
        case 'ts':
            return { icon: <SiTypescript size={16} />, lang: 'Typescript' };
        case 'jsx':
        case 'tsx':
            return { icon: <SiReact size={16} />, lang: 'React' };
        case 'js':
            return { icon: <SiJavascript size={16} />, lang: 'Javascript' };
        case 'rs':
            return { icon: <SiRust size={16} />, lang: 'Rust' };
        case 'html':
            return { icon: <SiHtml5 size={16} />, lang: 'HTML' };
        case 'mdx':
            return { icon: <SiMdx size={16} />, lang: 'MDX' };
        case 'css':
            return { icon: <SiTailwindcss size={16} />, lang: 'Tailwind' };
        case 'json':
            return { icon: <VscJson size={16} />, lang: 'JSON' };
        case 'bash':
        case 'sh':
            return { icon: <FiTerminal size={16} />, lang: 'Terminal' };
        default:
            return { icon: <VscSymbolFile size={16} />, lang: 'File' };
    }
};

export default WikiCodeWrapperIcon;
