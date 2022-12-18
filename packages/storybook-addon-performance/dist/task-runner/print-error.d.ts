import { Task } from '../types.js';

declare function printError({ task, error }: {
    task: Task;
    error: any;
}): void;

export { printError as default };
