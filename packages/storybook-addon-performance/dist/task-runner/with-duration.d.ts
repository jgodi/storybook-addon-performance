import { TimedControls } from '../types.js';

declare function withDuration(fn: (controls: TimedControls) => Promise<void>): Promise<number>;

export { withDuration as default };
