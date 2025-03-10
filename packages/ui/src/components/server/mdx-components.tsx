import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { Alert, AlertProps } from 'server/alert';
import { CardGroup, CardGroupProps, CardItem, CardItemProps } from 'server/card';
import { CodeWrapper } from 'server/code-wrapper';
import { ColumnGroup, ColumnGroupProps, ColumnItem, ColumnItemProps } from 'server/column';
import { cleanHeadingId, getConfig } from 'server/lib';
import { Outline } from 'server/outline';
import { Timeline } from 'server/timeline';
import { FileProps, FolderProps, preProps, ShikiThemeBackgroundHexDefault, TabsProps } from 'server/types';
import { cn } from 'server/utils';
import { VideoComponent, VideoProps } from 'server/video';
import { BundledTheme } from 'shiki';

const Accordion = dynamic(() => import('client/accordion').then((mod) => mod.Accordion));
const File = dynamic(() => import('client/filetree').then((mod) => mod.File));
const Folder = dynamic(() => import('client/filetree').then((mod) => mod.Folder));
const HashtagButton = dynamic(() => import('client/hashtag-button').then((mod) => mod.HashtagButton));
const Tabs = dynamic(() => import('client/tabs').then((mod) => mod.Tabs));

export const mdxComponents = {
    a: ({ children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
        const external = props.href?.toString().startsWith('http');
        return external ? (
            <a {...props} rel='noopener norefferer' target='_blank'>
                {children}
            </a>
        ) : (
            <Link href={props.href ?? ''}>{children}</Link>
        );
    },
    h1: ({ children }: React.HTMLAttributes<HTMLHeadingElement>) => {
        // Not a good solution:
        const cleanedText =
            typeof children === 'string'
                ? children
                : Array.isArray(children)
                  ? children.filter((child) => typeof child === 'string' || typeof child === 'number').join('')
                  : children;
        return (
            <HashtagButton id={cleanHeadingId(cleanedText?.toString() || '')} variant='h1'>
                {children}
            </HashtagButton>
        );
    },
    h2: ({ children }: React.HTMLAttributes<HTMLHeadingElement>) => {
        // Not a good solution:
        const cleanedText =
            typeof children === 'string'
                ? children
                : Array.isArray(children)
                  ? children.filter((child) => typeof child === 'string' || typeof child === 'number').join('')
                  : children;
        return (
            <HashtagButton id={cleanHeadingId(cleanedText?.toString() || '')} variant='h2'>
                {children}
            </HashtagButton>
        );
    },
    h3: ({ children }: React.HTMLAttributes<HTMLHeadingElement>) => {
        // Not a good solution:
        const cleanedText =
            typeof children === 'string'
                ? children
                : Array.isArray(children)
                  ? children.filter((child) => typeof child === 'string' || typeof child === 'number').join('')
                  : children;
        return (
            <HashtagButton id={cleanHeadingId(cleanedText?.toString() || '')} variant='h3'>
                {children}
            </HashtagButton>
        );
    },
    code: async ({ children }: React.HTMLAttributes<HTMLUnknownElement>) => {
        const config = await getConfig();
        const theme = config.style.shikiTheme;
        const currentTheme = theme as BundledTheme;
        const color = ShikiThemeBackgroundHexDefault[currentTheme];
        const long = children ? children.toString().split('').length > 75 : false;
        return (
            <span
                className={cn(
                    'text-base-900 dark:text-base-50 mx-0.5 my-2 rounded-md border border-black/5 px-1.5 py-0.5 text-[0.85em] font-semibold dark:border-white/5',
                    long ? 'whitespace-pre-wrap' : 'whitespace-nowrap',
                )}
                style={{ background: color }}
            >
                <span className='not-prose font-mono'>{children}</span>
            </span>
        );
    },
    pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => {
        const codeElement = children as React.ReactElement<React.PropsWithChildren<{ className: string }>>;
        const language = codeElement.props.className?.replace('language-', '') || '';
        const lineNumbers: boolean = (props as preProps).lineNumbers || false;
        const noTopBar: boolean = (props as preProps).noTopBar || false;
        const noCopyButton: boolean = (props as preProps).noCopyButton || false;
        const twoSlash: boolean = (props as preProps).twoSlash || false;
        const name: string | undefined = (props as preProps).name || undefined;
        return (
            <CodeWrapper
                language={language}
                lineNumbers={lineNumbers}
                noTopBar={noTopBar}
                noCopyButton={noCopyButton}
                twoSlash={twoSlash}
                name={name}
            >
                {codeElement.props.children as string}
            </CodeWrapper>
        );
    },
    blockquote: ({ children }: React.HTMLAttributes<HTMLElement>) => {
        return (
            <span className='border-base-950 text-base-950 dark:border-base-600 dark:text-base-400 my-2 flex border-l-2 py-2.5 pl-4 text-sm font-light italic !no-underline md:text-base'>
                <span className='not-prose'>{children}</span>
            </span>
        );
    },
    Accordion: ({ children }: React.PropsWithChildren) => {
        return <Accordion>{children}</Accordion>;
    },
    Alert: ({ type = 'accent', children, link, title }: React.PropsWithChildren<AlertProps>) => {
        return (
            <Alert type={type} link={link} title={title}>
                {children}
            </Alert>
        );
    },
    CardGroup: ({ cols, children, title }: CardGroupProps) => {
        return (
            <CardGroup cols={cols} title={title}>
                {children}
            </CardGroup>
        );
    },
    CardItem: ({ title, href, children, full = false, newTab = false }: React.PropsWithChildren<CardItemProps>) => {
        return (
            <CardItem title={title} href={href} full={full} newTab={newTab}>
                {children}
            </CardItem>
        );
    },
    Image: ({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) => {
        return (
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                placeholder='empty'
                loading='lazy'
                // unoptimized={true}
            />
        );
    },
    Outline: ({ children }: { children: React.ReactNode }) => {
        return <Outline>{children}</Outline>;
    },
    Tabs: ({
        tabs,
        defaultTab = tabs[0],
        widthFull = true,
        sync = false,
        children,
    }: React.PropsWithChildren<TabsProps>) => {
        return (
            <Tabs tabs={tabs} defaultTab={defaultTab} widthFull={widthFull} sync={sync}>
                {children}
            </Tabs>
        );
    },
    Timeline: ({ children }: React.PropsWithChildren) => {
        return <Timeline>{children}</Timeline>;
    },
    Video: (props: VideoProps) => {
        return <VideoComponent {...props} />;
    },
    Folder: ({ name, children, defaultOpen = false, toggleable = true }: FolderProps) => {
        return (
            <Folder name={name} toggleable={toggleable} defaultOpen={defaultOpen}>
                {children}
            </Folder>
        );
    },
    File: ({ name }: FileProps) => {
        return <File name={name} />;
    },
    ColumnGroup: ({ children }: { children: ColumnGroupProps }) => {
        return <ColumnGroup>{children}</ColumnGroup>;
    },
    ColumnItem: ({ children, center }: React.PropsWithChildren<ColumnItemProps>) => {
        return <ColumnItem center={center}>{children}</ColumnItem>;
    },
};
