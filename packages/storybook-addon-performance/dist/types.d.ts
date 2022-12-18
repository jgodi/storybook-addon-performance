type Nullable<T> = T | null;
type Combine<First, Second> = Omit<First, keyof Second> & Second;
type BaseTask = {
    name: string;
    description: string;
};
interface Container extends HTMLElement {
    _reactRootContainer?: any;
}
type RunStaticTaskArgs = {
    getElement: () => React.ReactElement;
    container: HTMLElement;
};
type RunStaticTaskArgsWithReactRoot = {
    getElement: () => React.ReactElement;
    container: Container;
};
type StaticTask = BaseTask & {
    scale?: string;
    type: 'static';
    run: (args: RunStaticTaskArgs) => Promise<string>;
};
type TimedControls = {
    time: (fn: () => Promise<void>) => Promise<void>;
};
type RunTimedTaskArgs = {
    getElement: () => React.ReactElement;
    controls: TimedControls;
    container: HTMLElement;
};
type TimedTask = BaseTask & {
    type: 'timed';
    run: (args: RunTimedTaskArgs) => Promise<void>;
};
type InteractionTaskArgs = {
    controls: TimedControls;
    container: HTMLElement;
};
type InteractionTask = BaseTask & {
    type: 'interaction';
    run: (args: InteractionTaskArgs) => Promise<void>;
};
type PublicInteractionTask = Omit<InteractionTask, 'description' | 'type'> & {
    description?: string;
};
type Task = TimedTask | StaticTask | InteractionTask;
type TaskGroup = {
    groupId: string;
    name: string;
    tasks: Task[];
};
type Variance = {
    standardDeviation: number;
    upperPercentage: number;
    lowerPercentage: number;
};
type TimedResult = {
    type: 'timed';
    taskName: string;
    averageMs: number;
    samples: number;
    variance: Variance;
};
type StaticResult = {
    type: 'static';
    taskName: string;
    value: string;
};
type ErrorResult = {
    type: 'error';
    taskName: string;
    reason: 'unsupported' | 'unhandled';
    message: Nullable<string>;
};
type Result = TimedResult | StaticResult | ErrorResult;
type ResultMap = {
    [taskName: string]: Result;
};
type TaskMap = {
    [taskName: string]: Task;
};
type TaskGroupResult = {
    groupId: string;
    map: ResultMap;
};
type AllowedGroup = 'client' | 'server';

export { AllowedGroup, Combine, ErrorResult, InteractionTask, InteractionTaskArgs, Nullable, PublicInteractionTask, Result, ResultMap, RunStaticTaskArgs, RunStaticTaskArgsWithReactRoot, RunTimedTaskArgs, StaticResult, StaticTask, Task, TaskGroup, TaskGroupResult, TaskMap, TimedControls, TimedResult, TimedTask, Variance };
