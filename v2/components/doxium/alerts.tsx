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

export interface AlertsProps {
    type?: 'bookmark' | 'warning' | 'error' | 'success' | 'info' | 'star' | 'accent' | 'base';
    link?: string;
}

const getAlertColor = (type: AlertsProps['type']) => {
    switch (type) {
        case 'bookmark':
            return 'bg-yellow-200 text-yellow-800 border-yellow-400 dark:bg-yellow-800 dark:text-yellow-200 dark:border-yellow-600';
        case 'warning':
            return 'bg-orange-200 text-orange-800 border-orange-400 dark:bg-orange-800 dark:text-yellow-300 dark:border-orange-700';
        case 'error':
            return 'bg-red-200 text-red-800 border-red-400 dark:bg-red-800 dark:text-red-300 dark:border-red-600';
        case 'success':
            return 'bg-green-200 text-green-800 border-green-400 dark:bg-green-800 dark:text-green-300 dark:border-green-500';
        case 'info':
            return 'bg-blue-200 text-blue-800 border-blue-400 dark:bg-blue-800 dark:text-blue-300 dark:border-blue-500';
        case 'accent':
            return 'bg-accent-200 text-accent-800 border-accent-400 dark:bg-accent-700/80 dark:text-accent-200 dark:border-accent-600/80';
        case 'base':
            return 'bg-base-200 text-base-800 border-base-400 dark:bg-base-600 dark:text-base-300 dark:border-white/30';
        case 'star':
            return 'bg-yellow-200 text-yellow-800 border-yellow-400 dark:bg-yellow-700 dark:text-yellow-300 dark:border-yellow-500';
        default:
            return 'bg-accent-200 text-accent-800 border-accent-400 dark:bg-accent-600 dark:text-accent-200 dark:border-accent-500';
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
