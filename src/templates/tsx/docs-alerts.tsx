// @ts-nocheck

import { cn } from '@/lib/utils';
import {
    FiAlertOctagon,
    FiAlertTriangle,
    FiBookmark,
    FiCheck,
    FiCircle,
    FiMessageSquare,
    FiSquare,
} from '@vertisanpro/react-icons/fi';

interface DocsAlertsProps {
    variant?: 'bookmark' | 'warning' | 'error' | 'success' | 'tip' | 'accent' | 'base';
    link?: string;
}

// TODO: I kinda dont like these colours, maybe we should change them later
const getAlertColor = (variant: DocsAlertsProps['variant']) => {
    switch (variant) {
        case 'bookmark':
            return 'bg-yellow-800/70 text-yellow-400 border-yellow-400/50';
        case 'warning':
            return 'bg-orange-800/70 text-yellow-400 border-orange-400/50';
        case 'error':
            return 'bg-red-700/50 text-red-300 border-red-400/50';
        case 'success':
            return 'bg-green-700/50 text-green-400 border-green-300/50';
        case 'tip':
            return 'bg-blue-700/50 text-blue-300 border-blue-300/50';
        case 'accent':
            return 'bg-$ACCENT-COLOR-600/50 text-$ACCENT-COLOR-300 border-$ACCENT-COLOR-200/50';
        case 'base':
            return 'bg-$COLOR-600/25 text-$COLOR-200 border-white/25';
        default:
            return 'bg-$ACCENT-COLOR-600/50 text-$ACCENT-COLOR-300 border-$ACCENT-COLOR-200/50';
    }
};

const getAlertIcon = (variant: DocsAlertsProps['variant']) => {
    switch (variant) {
        case 'bookmark':
            return <FiBookmark size={16} />;
        case 'warning':
            return <FiAlertTriangle size={16} />;
        case 'error':
            return <FiAlertOctagon size={16} />;
        case 'success':
            return <FiCheck size={16} />;
        case 'tip':
            return <FiMessageSquare size={16} />;
        case 'accent':
            return <FiCircle size={16} />;
        case 'base':
            return <FiSquare size={16} />;
        default:
            return <FiSquare size={16} />;
    }
};

const DocsAlerts = ({ variant = 'accent', children, link }: React.PropsWithChildren<DocsAlertsProps>) => {
    return (
        <a
            className={cn(
                'not-prose my-3 flex w-full flex-row items-center rounded-md border-[0.01em] px-3 py-2 text-sm font-normal',
                getAlertColor(variant),
            )}
            href={link}
            target='_blank'
            rel='noopener noreferrer'
        >
            {getAlertIcon(variant)}
            <span className='ml-2'>{children}</span>
        </a>
    );
};

export default DocsAlerts;
