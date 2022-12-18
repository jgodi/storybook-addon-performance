import { Task, ErrorResult } from '../types.js';

declare function getErrorResult({ task, error }: {
    task: Task;
    error: any;
}): ErrorResult;

export { getErrorResult as default };
