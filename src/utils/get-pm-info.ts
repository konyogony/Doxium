import { detect } from 'detect-package-manager';
import pc from 'picocolors';
import { errorText, successText } from './utils.js';

export const getPmInfo = async () => {
    const pm = await detect().catch((err) => {
        console.error(errorText('Error detecting package manager:'), err);
        return null;
    });

    if (!pm) {
        console.error(errorText('Package manager detection failed.'));
        process.exit(1);
    } else {
        console.log('\n' + successText(`Detected package manager: ${pc.blue(pm)}.`));
    }

    let pmx: string[];
    let pmi: string[];

    switch (pm) {
        case 'yarn':
            pmx = ['yarn', 'create'];
            pmi = ['yarn', 'add'];
            break;
        case 'bun':
            pmx = ['bunx'];
            pmi = ['bun', 'add'];
            break;
        case 'pnpm':
            pmx = ['pnpx'];
            pmi = ['pnpm', 'add'];
            break;
        default:
            pmx = ['npx'];
            pmi = ['npm', 'install'];
    }

    return { pm, pmx, pmi };
};

// Very wonky
