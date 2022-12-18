import { InteractionTask } from '../types.js';

type Args = {
    task: InteractionTask;
    getElement: () => React.ReactElement;
};
declare function runInteractionTask({ task, getElement }: Args): Promise<number>;

export { runInteractionTask as default };
