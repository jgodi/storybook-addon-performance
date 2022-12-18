import { CalculationsByGroupId } from './types';
declare const compare: (baseline: CalculationsByGroupId, current: CalculationsByGroupId) => {
    [x: string]: import("./types").CalculationWithDiff[];
};
export default compare;
