interface VideoTagProps {
    src: string;
    width: number;
    height: number;
    controls?: boolean;
    autoPlay?: boolean;
    loop?: boolean;
    muted?: boolean;
    playsInline?: boolean;
    preload?: 'auto' | 'metadata' | 'none';
}

interface VideoIframeProps {
    src: string;
    width: number;
    height: number;
    title: string;
    allowFullScreen?: boolean;
    loading?: 'lazy' | 'eager';
}

type VideoProps = VideoTagProps | VideoIframeProps;

const isExternal = (url: string) => {
    return /^(http|https):\/\//.test(url);
};

const VideoComponent = (props: VideoProps) => {
    if (isExternal(props.src)) {
        return (
            <iframe
                src={props.src}
                width={props.width}
                height={props.height}
                title={(props as VideoIframeProps).title}
                allowFullScreen={(props as VideoIframeProps).allowFullScreen || false}
                loading={(props as VideoIframeProps).loading || 'lazy'}
            />
        );
    } else {
        return (
            <video
                width={props.width}
                height={props.height}
                controls={(props as VideoTagProps).controls || false}
                preload={(props as VideoTagProps).preload || 'metadata'}
                autoPlay={(props as VideoTagProps).autoPlay || false}
                loop={(props as VideoTagProps).loop || false}
                muted={(props as VideoTagProps).muted || false}
                playsInline={(props as VideoTagProps).playsInline || false}
            >
                <source src={props.src} type={`video/${props.src.split('.').pop()}`} />
                Your browser does not support the video tag.
            </video>
        );
    }
};

export default VideoComponent;

// This is hella bad btw
