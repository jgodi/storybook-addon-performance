import type { Calculation, ResultsByGroupId, ResultType } from './types';
declare const calculate: (resultsByType: (ResultsByGroupId & {
    type: ResultType;
})[]) => {
    [k: string]: {
        [k: string]: Calculation[];
    };
};
export default calculate;
