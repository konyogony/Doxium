'use client';

import {
    BsFiletypeCs,
    BsFiletypeGif,
    BsFiletypeJava,
    BsFiletypeJpg,
    BsFiletypeMp4,
    BsFiletypePng,
    BsFiletypeSql,
    BsTerminal,
} from 'icons/bs';
import { FiChevronDown, FiFile, FiFolder } from 'icons/fi';
import {
    SiC,
    SiCplusplus,
    SiCss3,
    SiDart,
    SiGo,
    SiGradle,
    SiHtml5,
    SiJavascript,
    SiJson,
    SiKotlin,
    SiLua,
    SiMarkdown,
    SiMdx,
    SiPerl,
    SiPhp,
    SiPython,
    SiReact,
    SiRuby,
    SiRust,
    SiScala,
    SiSvg,
    SiSwift,
    SiToml,
    SiTypescript,
    SiYaml,
} from 'icons/si';
import { cn } from 'lib/utils';
import React, { ReactElement, useCallback, useState } from 'react';

interface SelectIconProps {
    type: 'folder' | 'file';
    extension?: string;
    size?: number;
}

const SelectIcon = ({ type, extension, size }: SelectIconProps) => {
    if (type === 'folder') {
        return <FiFolder size={size} />;
    }

    switch (extension) {
        case 'mdx':
            return <SiMdx size={size} />;
        case 'md':
            return <SiMarkdown size={size} />;
        case 'tsx':
            return <SiReact size={size} />;
        case 'ts':
            return <SiTypescript size={size} />;
        case 'js':
            return <SiJavascript size={size} />;
        case 'jsx':
            return <SiReact size={size} />;
        case 'mjs':
            return <SiJavascript size={size} />;
        case 'json':
            return <SiJson size={size} />;
        case 'yaml':
            return <SiYaml size={size} />;
        case 'yml':
            return <SiYaml size={size} />;
        case 'toml':
            return <SiToml size={size} />;
        case 'html':
            return <SiHtml5 size={size} />;
        case 'css':
            return <SiCss3 size={size} />;
        case 'svg':
            return <SiSvg size={size} />;
        case 'png':
            return <BsFiletypePng size={size} />;
        case 'jpg':
            return <BsFiletypeJpg size={size} />;
        case 'jpeg':
            return <BsFiletypeJpg size={size} />;
        case 'gif':
            return <BsFiletypeGif size={size} />;
        case 'mp4':
            return <BsFiletypeMp4 size={size} />;
        case 'sh':
            return <BsTerminal size={size} />;
        case 'py':
            return <SiPython size={size} />;
        case 'go':
            return <SiGo size={size} />;
        case 'java':
            return <BsFiletypeJava size={size} />;
        case 'c':
            return <SiC size={size} />;
        case 'cpp':
            return <SiCplusplus size={size} />;
        case 'cs':
            return <BsFiletypeCs size={size} />;
        case 'rs':
            return <SiRust size={size} />;
        case 'rb':
            return <SiRuby size={size} />;
        case 'php':
            return <SiPhp size={size} />;
        case 'sql':
            return <BsFiletypeSql size={size} />;
        case 'pl':
            return <SiPerl size={size} />;
        case 'swift':
            return <SiSwift size={size} />;
        case 'kt':
            return <SiKotlin size={size} />;
        case 'gradle':
            return <SiGradle size={size} />;
        case 'scala':
            return <SiScala size={size} />;
        case 'lua':
            return <SiLua size={size} />;
        case 'dart':
            return <SiDart size={size} />;
        default:
            return <FiFile size={size} />;
    }
};

interface FiletreeProps {
    children:
        | ReactElement<typeof FiletreeFolder>
        | ReactElement<typeof FiletreeFile>
        | Array<ReactElement<typeof FiletreeFolder> | ReactElement<typeof FiletreeFile>>;
}

export const Filetree = ({ children }: FiletreeProps): ReactElement => {
    return <div className='my-2 flex h-fit w-full flex-col rounded-lg bg-base-900 px-4 py-2'>{children}</div>;
};

interface FolderProps {
    name: string;
    defaultOpen?: boolean;
    toggleable?: boolean;
}

type FiletreeFolderChildren =
    | ReactElement<typeof FiletreeFolder>
    | ReactElement<typeof FiletreeFile>
    | Array<ReactElement<typeof FiletreeFolder> | ReactElement<typeof FiletreeFile>>;

interface FiletreeFolderProps extends FolderProps {
    children: FiletreeFolderChildren;
}

export const FiletreeFolder = ({ name, children, defaultOpen = false, toggleable = true }: FiletreeFolderProps) => {
    const [open, setOpen] = useState(defaultOpen);

    const toggleOpen = useCallback(() => {
        if (toggleable) {
            setOpen((prev) => !prev);
        }
    }, [toggleable]);

    return (
        <div
            className={cn(
                'grid w-full grid-rows-[min-content_0fr] transition-[grid-template-rows]',
                open ? 'grid-rows-[min-content_1fr]' : '',
            )}
        >
            <button
                className='group flex flex-row items-center gap-1 transition-all duration-150 hover:text-accent-600'
                onClick={toggleOpen}
            >
                <SelectIcon type='folder' size={16} />
                {name}
                {toggleable && (
                    <FiChevronDown
                        size={16}
                        className={cn(
                            'text-base-400 transition-all duration-150 group-hover:text-accent-600',
                            !open && '-rotate-90',
                        )}
                    />
                )}
            </button>
            <div className='ml-[7px] flex-col gap-2 overflow-hidden border-l border-white/15 pl-6'>{children}</div>
        </div>
    );
};

interface FileProps {
    name: string;
}

export const FiletreeFile = ({ name }: FileProps) => {
    return (
        <div className={cn('flex flex-row items-center gap-2')}>
            <SelectIcon type='file' extension={name.split('.').pop()} size={16} />
            {name}
        </div>
    );
};
