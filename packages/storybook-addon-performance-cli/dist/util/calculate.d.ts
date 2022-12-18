import type { ResultMap } from 'storybook-addon-performance';
import { ResultsByGroupId, Results, Calculation } from '../types';
export declare const convertToTaskValueMap: (resultMap: ResultMap) => {};
export declare const combineTaskResultsByGroupId: (results: ResultsByGroupId, [groupId, taskValueMap]: [string, Results]) => ResultsByGroupId;
export declare const median: (numbers: number[]) => number;
export declare const performCalculations: (data: Results) => Calculation[];
