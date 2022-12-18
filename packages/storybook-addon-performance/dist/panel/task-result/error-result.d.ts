import { Task, ErrorResult } from '../../types.js';

declare function ErrorResultView({ task, result }: {
    task: Task;
    result: ErrorResult;
}): JSX.Element;

export { ErrorResultView as default };
