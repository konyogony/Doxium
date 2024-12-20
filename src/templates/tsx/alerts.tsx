// @ts-nocheck

import {
    FiAlertCircle,
    FiAlertTriangle,
    FiBookmark,
    FiCheck,
    FiInfo,
    FiMessageCircle,
    FiSquare,
    FiStar,
} from '@vertisanpro/react-icons/fi';
import { cn } from '$LIB-ALIAS/utils';

interface AlertsProps {
    variant?: 'bookmark' | 'warning' | 'error' | 'success' | 'tip' | 'star' | 'accent' | 'base';
    link?: string;
}

const getAlertColor = (variant: AlertsProps['variant']) => {
    switch (variant) {
        case 'bookmark':
            return 'bg-yellow-800/70 text-yellow-600 border-yellow-400/40';
        case 'warning':
            return 'bg-orange-700/50 text-yellow-500 border-orange-400/40';
        case 'error':
            return 'bg-red-700/50 text-red-500 border-red-400/40';
        case 'success':
            return 'bg-green-700/50 text-green-600 border-green-300/40';
        case 'tip':
            return 'bg-blue-700/50 text-blue-500 border-blue-300/40';
        case 'accent':
            return 'bg-$ACCENT-COLOR-600/50 text-$ACCENT-COLOR-500 border-$ACCENT-COLOR-200/40';
        case 'base':
            return 'bg-$COLOR-600/30 text-$COLOR-400 border-white/20';
        case 'star':
            return 'bg-yellow-600/50 text-yellow-500 border-yellow-200/40';
        default:
            return 'bg-$ACCENT-COLOR-600/50 text-$ACCENT-COLOR-500 border-$ACCENT-COLOR-200/40';
    }
};

const getAlertIcon = (variant: AlertsProps['variant']) => {
    switch (variant) {
        case 'bookmark':
            return <FiBookmark size={18} />;
        case 'warning':
            return <FiAlertTriangle size={18} />;
        case 'error':
            return <FiAlertCircle size={18} />;
        case 'success':
            return <FiCheck size={18} />;
        case 'tip':
            return <FiMessageCircle size={18} />;
        case 'accent':
            return <FiInfo size={18} />;
        case 'base':
            return <FiInfo size={18} />;
        case 'star':
            return <FiStar size={18} />;
        default:
            return <FiSquare size={18} />;
    }
};

const Alerts = ({ variant = 'accent', children, link }: React.PropsWithChildren<AlertsProps>) => {
    return link ? (
        <a
            className={cn(
                'not-prose my-3 flex w-full flex-row items-center rounded-lg border-[0.01em] px-3.5 py-2.5 text-sm font-normal',
                getAlertColor(variant),
            )}
            href={link}
            target='_blank'
            rel='noopener noreferrer'
        >
            {getAlertIcon(variant)}
            <span className='ml-2'>{children}</span>
        </a>
    ) : (
        <span
            className={cn(
                'not-prose my-3 flex w-full flex-row items-center rounded-lg border-[0.01em] px-3.5 py-2.5 text-sm font-normal',
                getAlertColor(variant),
            )}
        >
            {getAlertIcon(variant)}
            <span className='ml-2'>{children}</span>
        </span>
    );
};

export default Alerts;
