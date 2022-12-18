import { Task, Nullable, Result } from '../../types.js';

type ResultProps = {
    task: Task;
    result: Nullable<Result>;
    pinned: Nullable<Result>;
};
declare function TaskResult({ task, result, pinned }: ResultProps): JSX.Element | null;

export { TaskResult as default };
