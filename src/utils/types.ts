import { Answers } from 'prompts';

export type responseT = Answers<
    | 'app-name'
    | 'eslint'
    | 'prettier'
    | 'use-docs'
    | 'shadcn-style'
    | 'base-color'
    | 'proceed'
    | 'github-repo'
    | 'accent-color'
    | 'shiki-theme'
>;
