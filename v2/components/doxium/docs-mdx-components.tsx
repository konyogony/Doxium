import config from 'config';
import CodeWrapper from 'doxium/code-wrapper';
import HashtagButton from 'doxium/hashtag-button';
import { cleanHeadingId } from 'lib/lib';
import { cn } from 'lib/utils';
import Link from 'next/link';
import { BundledTheme } from 'shiki';
import { preProps, ShikiThemeBackgroundHexDefault } from 'types';
import Accordion from './accordion';
import Alerts, { AlertsProps } from './alerts';
import Card, { CardProps } from './card';
import CardGroup, { CardGroupProps } from './card-group';
import Image, { ImageProps } from './image';
import Outline from './outline';
import Tabs, { TabsProps } from './tabs';
import Timeline from './timeline';
import Video, { VideoProps } from './video';

const theme = config.style.shikiTheme;

const mdxComponents = {
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
        return (
            <HashtagButton id={cleanHeadingId(children?.toString() || '')} variant='h1'>
                {children}
            </HashtagButton>
        );
    },
    h2: ({ children }: React.HTMLAttributes<HTMLHeadingElement>) => {
        return (
            <HashtagButton id={cleanHeadingId(children?.toString() || '')} variant='h2'>
                {children}
            </HashtagButton>
        );
    },
    h3: ({ children }: React.HTMLAttributes<HTMLHeadingElement>) => {
        return (
            <HashtagButton id={cleanHeadingId(children?.toString() || '')} variant='h3'>
                {children}
            </HashtagButton>
        );
    },
    code: async ({ children }: React.HTMLAttributes<HTMLUnknownElement>) => {
        const currentTheme = theme as BundledTheme;
        const color = ShikiThemeBackgroundHexDefault[currentTheme];
        const long = children ? children.toString().split('').length > 75 : false;
        return (
            <span
                className={cn(
                    'mx-0.5 my-2 rounded-md border border-white/5 px-1.5 py-0.5 text-[0.85em] font-semibold text-base-50',
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
            <span
                className={
                    'my-2 flex border-l-2 border-base-600 py-2.5 pl-4 text-sm font-light italic text-base-400 !no-underline md:text-base'
                }
            >
                <span className='not-prose'>{children}</span>
            </span>
        );
    },
    Accordion: ({ children }: React.PropsWithChildren) => {
        return <Accordion>{children}</Accordion>;
    },
    Alerts: ({ type = 'accent', children, link }: React.PropsWithChildren<AlertsProps>) => {
        return (
            <Alerts type={type} link={link}>
                {children}
            </Alerts>
        );
    },
    CardGroup: ({ cols, children }: CardGroupProps) => {
        return <CardGroup cols={cols}>{children}</CardGroup>;
    },
    Card: ({ title, href, children, full = false, newTab = false }: React.PropsWithChildren<CardProps>) => {
        return (
            <Card title={title} href={href} full={full} newTab={newTab}>
                {children}
            </Card>
        );
    },
    Image: ({ src, alt, width, height }: ImageProps) => {
        return <Image src={src} alt={alt} width={width} height={height} />;
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
        return <Video {...props} />;
    },
};

export default mdxComponents;
