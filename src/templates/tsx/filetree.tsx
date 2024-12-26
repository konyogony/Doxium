// @ts-nocheck

'use client';

import { FiFile, FiFolder } from 'icons/fi';
import { cn } from 'lib/utils';
import { ReactElement, useCallback, useState } from 'react';

interface FolderProps {
    name: string;
}

interface FileProps {
    name: string;
}

const Filetree = ({ children }: React.PropsWithChildren): ReactElement => {
    return <div className='flex h-fit w-full flex-col rounded-lg bg-base-900 p-4'>{children}</div>;
};

const Folder = ({ name, children }: React.PropsWithChildren<FolderProps>) => {
    const [open, setOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setOpen((prev) => !prev);
    }, []);

    return (
        <div className='flex flex-col gap-2'>
            <button className='flex flex-row gap-2' onClick={toggleOpen}>
                <FiFolder /> {name}
            </button>
            <div className={cn('flex-col gap-2', open ? 'flex' : 'hidden')}>{children}</div>
        </div>
    );
};
Folder.displayName = 'Folder';

const File = ({ name }: FileProps) => {
    return (
        <div className={cn('flex flex-row gap-2')}>
            <FiFile size={16} />
            {name}
        </div>
    );
};
File.displayName = 'File';

export default Object.assign(Filetree, { Folder, File });
