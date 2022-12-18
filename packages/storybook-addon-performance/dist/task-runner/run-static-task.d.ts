import { StaticResult, ErrorResult, StaticTask } from '../types.js';

type StaticArgs = {
    task: StaticTask;
    getElement: () => React.ReactElement;
};
declare function getResultForStaticTask({ task, getElement, }: StaticArgs): Promise<StaticResult | ErrorResult>;

export { getResultForStaticTask };
