import react__default from 'react';
import { TaskGroupResult, TaskGroup } from '../types.js';

type RunGroupArgs = {
    group: TaskGroup;
    getElement: () => react__default.ReactElement;
    samples: number;
};
declare function runGroup({ group, getElement, samples, }: RunGroupArgs): Promise<TaskGroupResult>;

export { runGroup as default };
