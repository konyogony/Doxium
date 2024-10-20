import { execa } from 'execa';
import fs from 'fs-extra';
import { responseT } from '../utils/types.js';
import { blueText, boldText, errorText, infoText, successText } from '../utils/utils.js';

export const configureShadcn = async (response: responseT, pmx: string[], pm: string) => {
    try {
        await execa(pm, ['run', 'prettier', './', '-w'], { stdio: 'ignore' });
        console.log('\n' + infoText('Installing shadcn...'));

        const tailwindConfigContent = `import typogrophy from '@tailwindcss/typography';
        import type { Config } from 'tailwindcss';
        import tailwindcssAnimate from 'tailwindcss-animate';

        export default {
            darkMode: ['class'],
            content: [
                './pages/**/*.{js,ts,jsx,tsx,mdx}',
                './components/**/*.{js,ts,jsx,tsx,mdx}',
                './app/**/*.{js,ts,jsx,tsx,mdx}',
            ],
            theme: {
                extend: {
                    colors: {
                        background: 'var(--background)',
                        foreground: 'var(--foreground)',
                    },
                    borderRadius: {
                        lg: 'var(--radius)',
                        md: 'calc(var(--radius) - 2px)',
                        sm: 'calc(var(--radius) - 4px)',
                    },
                },
            },
            plugins: [tailwindcssAnimate, typogrophy],
        } satisfies Config;

        `;

        try {
            await fs.writeFile('./tailwind.config.ts', tailwindConfigContent);
            console.log(successText(`${blueText('tailwind.config.ts')} ${boldText('file found and updated!')}`));
        } catch (error) {
            console.error(errorText(`Error updating ${'tailwind.config.ts'} file:`), error);
            process.exit(1);
        }

        const globalsCssContent = `@tailwind base;
        @tailwind components;
        @tailwind utilities;

        html {
            @apply scroll-smooth
        }

        body {
            @apply bg-${response['base-color']}-950 text-zinc-200;
        }

        @layer utilities {
            .text-balance {
                text-wrap: balance;
            }
        }

        @layer base {
            :root {
                --radius: 0.5rem;
            }
        }

        code {
            counter-increment: step 0;
            counter-reset: step;
        }

        code > .line:not(:last-child)::before {
            @apply mr-6 inline-block w-4 text-right text-[rgba(115,138,148,0.4)] content-[counter(step)];
            counter-increment: step;
        }

        .codeBlock > pre {
            @apply my-0 rounded-t-none;
        }

        @keyframes spin-slow {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }

        `;

        try {
            await fs.writeFile('./app/globals.css', globalsCssContent);
            console.log(successText(`${blueText('app/globals.css')} ${boldText('file found and updated!')}`));
        } catch (error) {
            console.error(errorText(`Error updating ${'app/globals.css'} file:`), error);
            process.exit(1);
        }

        const componentsJsonContent = `{
            "$schema": "https://ui.shadcn.com/schema.json",
            "style": "${response['shadcn-style']}",
            "rsc": true,
            "tsx": true,
            "tailwind": {
                "config": "tailwind.config.ts",
                "css": "app/globals.css",
                "baseColor": "${response['base-color']}",
                "cssVariables": false,
                "prefix": ""
            },
            "aliases": {
                "components": "@/components",
                "utils": "@/lib/utils",
                "ui": "@/components/ui",
                "lib": "@/lib",
                "hooks": "@/hooks"
            }
        }`;

        try {
            await fs.writeFile('./components.json', componentsJsonContent);
            console.log(successText(`${blueText('components.json')} ${boldText('file created!')}`));
        } catch (error) {
            console.error(errorText(`Error creating ${'components.json'} file:`), error);
            process.exit(1);
        }

        const utilsContent = `import { clsx, type ClassValue } from 'clsx';
        import { twMerge } from 'tailwind-merge';

        export function cn(...inputs: ClassValue[]) {
            return twMerge(clsx(inputs));
        }
        `;

        try {
            await fs.mkdir('./lib');
            await fs.writeFile('./lib/utils.ts', utilsContent);
            console.log(successText(`${blueText('lib/utils.ts')} ${boldText('file created!')}`));
        } catch (error) {
            console.error(errorText(`Error creating ${'lib/utils.ts'} file:`), error);
            process.exit(1);
        }

        await execa(
            pmx[0],
            [pmx[1], 'shadcn@latest', 'add', 'breadcrumb', 'button'].filter((str) => str !== '' && str !== undefined),
            { stdio: 'ignore' },
        );
        console.log(successText('Shadcn components installed successfully!'));

        await execa(pm, ['run', 'prettier', './', '-w'], { stdio: 'ignore' });

        console.log(successText('Shadcn installed successfully!'));
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};
