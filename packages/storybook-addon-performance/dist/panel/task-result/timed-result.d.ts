import { TimedTask, InteractionTask, TimedResult, Nullable } from '../../types.js';

type TimedProps = {
    task: TimedTask | InteractionTask;
    result: TimedResult;
    pinned: Nullable<TimedResult>;
};
declare function TimedResultView({ task, pinned, result }: TimedProps): JSX.Element;

export { TimedResultView as default };
