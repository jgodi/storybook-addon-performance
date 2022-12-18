import { TimedResult, ErrorResult, TimedTask, InteractionTask } from '../types.js';

type RepeatArgs = {
    task: TimedTask | InteractionTask;
    getElement: () => React.ReactElement;
    samples: number;
};
declare function getResultForTimedTask({ task, getElement, samples, }: RepeatArgs): Promise<TimedResult | ErrorResult>;

export { getResultForTimedTask };
