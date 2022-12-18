import { TimedResult, StaticResult } from './types.js';

declare const _default: {
    START_ALL: string;
    START_ONE: string;
    FINISH_ALL: string;
    FINISH_ONE: string;
    PUBLISH_INTERACTIONS: string;
};

type RunOne = {
    Params: {
        taskName: string;
        copies: number;
        samples: number;
    };
    Result: {
        taskName: string;
        result: TimedResult | StaticResult;
    };
};
type RunAll = {
    Params: {
        copies: number;
        samples: number;
    };
    Results: {
        results: [];
    };
};

export { RunAll, RunOne, _default as default };
