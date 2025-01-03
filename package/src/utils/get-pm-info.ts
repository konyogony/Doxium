import pc from 'picocolors';
import { errorText, successText } from './utils.js';

export const getPmInfo = async (mute_output: boolean) => {
    const userAgent = process.env.npm_config_user_agent;

    if (!userAgent) {
        console.error(errorText('Error detecting package manager:'));
        process.exit(1);
    }

    const pm = (() => {
        if (userAgent.startsWith('npm/')) {
            return 'npm';
        } else if (userAgent.startsWith('yarn/')) {
            return 'yarn';
        } else if (userAgent.startsWith('pnpm/')) {
            return 'pnpm';
        } else if (userAgent.startsWith('bun/')) {
            return 'bun';
        }
        return 'npm';
    })();

    !mute_output && console.log('\n' + successText(`Detected package manager: ${pc.blue(pm)}.`));

    let pmx: string[];
    let pmi: string[];

    switch (pm) {
        case 'yarn':
            pmx = ['yarn', 'dlx'];
            pmi = ['yarn', 'add'];
            break;
        case 'bun':
            pmx = ['bunx'];
            pmi = ['bun', 'add'];
            break;
        case 'pnpm':
            pmx = ['pnpm', 'dlx'];
            pmi = ['pnpm', 'add'];
            break;
        default:
            pmx = ['npx'];
            pmi = ['npm', 'install'];
    }

    return { pm, pmx, pmi };
};
