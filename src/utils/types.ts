import { Answers } from 'prompts';

export type responseT = Answers<
    'app-name' | 'eslint' | 'turbopack' | 'prettier' | 'shadcn-style' | 'base-color' | 'proceed'
>;
