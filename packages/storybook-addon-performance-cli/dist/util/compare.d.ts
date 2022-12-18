import { Calculation, CalculationWithDiff } from '../types';
export declare const calculateDifference: (baseline: Calculation[]) => ({ key, ...current }: Calculation, index: number) => CalculationWithDiff;
