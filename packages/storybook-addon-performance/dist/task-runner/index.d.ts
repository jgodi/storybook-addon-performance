import { TaskGroup, TaskGroupResult, TimedTask, InteractionTask, TimedResult, ErrorResult, StaticTask, StaticResult } from '../types.js';
import react__default from 'react';

type RunAllArgs = {
    groups: TaskGroup[];
    getNode: () => react__default.ReactNode;
    samples: number;
    copies: number;
};
declare function runAll({ groups, getNode, samples, copies, }: RunAllArgs): Promise<TaskGroupResult[]>;
type RunOneTimedTaskArgs = {
    task: TimedTask | InteractionTask;
    getNode: () => react__default.ReactNode;
    copies: number;
    samples: number;
};
declare function runOneTimed({ task, getNode, copies, samples, }: RunOneTimedTaskArgs): Promise<TimedResult | ErrorResult>;
type RunOneStaticTaskArgs = {
    task: StaticTask;
    getNode: () => react__default.ReactNode;
    copies: number;
};
declare function runOneStatic({ task, getNode, copies, }: RunOneStaticTaskArgs): Promise<StaticResult | ErrorResult>;

export { RunAllArgs, RunOneStaticTaskArgs, RunOneTimedTaskArgs, runAll, runOneStatic, runOneTimed };
