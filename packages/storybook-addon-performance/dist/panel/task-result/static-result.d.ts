import { StaticTask, StaticResult, Nullable } from '../../types.js';

declare function StaticResultView({ task, result, pinned, }: {
    task: StaticTask;
    result: StaticResult;
    pinned: Nullable<StaticResult>;
}): JSX.Element;

export { StaticResultView as default };
