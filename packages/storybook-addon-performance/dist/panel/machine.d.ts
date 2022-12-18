import { State, Interpreter, ResolveTypegenMeta, TypegenDisabled, BaseActionObject, ServiceMap, StateMachine } from 'xstate';
import { Nullable, TaskGroupResult } from '../types.js';

type MachineEvents = {
    type: 'WAIT';
} | {
    type: 'LOADED';
    storyName: string;
    pinned: Nullable<RunContext>;
} | {
    type: 'START_ALL';
} | {
    type: 'START_ONE';
    taskName: string;
} | {
    type: 'FINISH';
    results: TaskGroupResult[];
} | {
    type: 'PIN';
} | {
    type: 'UNPIN';
} | {
    type: 'SAVE';
} | {
    type: 'LOAD_FROM_FILE';
    storyName: string;
    pinned: Nullable<RunContext>;
} | {
    type: 'SET_VALUES';
    copies: number;
    samples: number;
};
type RunContext = {
    results: Nullable<TaskGroupResult[]>;
    samples: number;
    copies: number;
};
type MachineContext = {
    message: Nullable<string>;
    sizes: number[];
    current: RunContext;
    storyName: string;
    pinned: Nullable<RunContext>;
};
type MachineSchema = {
    states: {
        waiting: Record<string, any>;
        active: {
            states: {
                idle: Record<string, any>;
                running: Record<string, any>;
            };
        };
    };
};
type StateType = State<MachineContext, MachineEvents, MachineSchema>;
type ServiceType = Interpreter<MachineContext, MachineSchema, MachineEvents, {
    value: any;
    context: MachineContext;
}, ResolveTypegenMeta<TypegenDisabled, MachineEvents, BaseActionObject, ServiceMap>>;
type MachineType = StateMachine<MachineContext, MachineSchema, MachineEvents>;
declare const machine: MachineType;

export { MachineContext, MachineEvents, MachineSchema, MachineType, RunContext, ServiceType, StateType, machine as default };
