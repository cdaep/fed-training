// jest-axe.d.ts
declare module 'jest-axe' {
    import { AxesResults } from 'axe-core';
    import { MatcherFunction } from '@testing-library/jest-dom';
  
    export const axe: (container: HTMLElement) => Promise<AxesResults>;
    export const toHaveNoViolations: MatcherFunction<[], AxesResults>;
  }