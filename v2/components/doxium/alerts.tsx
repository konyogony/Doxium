import {
    FiAlertCircle,
    FiAlertTriangle,
    FiBookmark,
    FiCheck,
    FiInfo,
    FiMessageCircle,
    FiSquare,
    FiStar,
} from 'icons/fi';
import { cn } from 'lib/utils';

interface AlertsProps {
    type?: 'bookmark' | 'warning' | 'error' | 'success' | 'info' | 'star' | 'accent' | 'base';
    link?: string;
}

const getAlertColor = (type: AlertsProps['type']) => {
    switch (type) {
        case 'bookmark':
            return 'bg-yellow-900 text-yellow-200 border-yellow-600';
        case 'warning':
            return 'bg-orange-900 text-yellow-300 border-orange-600';
        case 'error':
            return 'bg-red-900 text-red-300 border-red-600';
        case 'success':
            return 'bg-green-900 text-green-300 border-green-500';
        case 'info':
            return 'bg-blue-900 text-blue-300 border-blue-500';
        case 'accent':
            return 'bg-accent-700 text-accent-200 border-accent-500';
        case 'base':
            return 'bg-base-700 text-base-300 border-white/30';
        case 'star':
            return 'bg-yellow-800 text-yellow-300 border-yellow-500';
        default:
            return 'bg-accent-700 text-accent-200 border-accent-500';
    }
};

const getAlertIcon = (type: AlertsProps['type']) => {
    switch (type) {
        case 'bookmark':
            return <FiBookmark size={20} />;
        case 'warning':
            return <FiAlertTriangle size={20} />;
        case 'error':
            return <FiAlertCircle size={20} />;
        case 'success':
            return <FiCheck size={20} />;
        case 'info':
            return <FiInfo size={20} />;
        case 'accent':
            return <FiMessageCircle size={20} />;
        case 'base':
            return <FiInfo size={20} />;
        case 'star':
            return <FiStar size={20} />;
        default:
            return <FiSquare size={20} />;
    }
};

const Alerts = ({ type = 'accent', children, link }: React.PropsWithChildren<AlertsProps>) => {
    return link ? (
        <a
            className={cn(
                'not-prose my-3 flex w-full flex-row items-center rounded-lg border-[0.01em] px-3.5 py-2.5 text-sm font-normal',
                getAlertColor(type),
            )}
            href={link}
            target='_blank'
            rel='noopener noreferrer'
        >
            {getAlertIcon(type)}
            <span className='ml-2'>{children}</span>
        </a>
    ) : (
        <span
            className={cn(
                'not-prose my-3 flex w-full flex-row items-center rounded-lg border-[0.01em] px-3.5 py-2.5 text-sm font-normal',
                getAlertColor(type),
            )}
        >
            {getAlertIcon(type)}
            <span className='ml-2'>{children}</span>
        </span>
    );
};

export default Alerts;
