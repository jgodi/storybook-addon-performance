import { RunContext } from './machine.js';
import { Nullable } from '../types.js';
import 'xstate';

declare function savePinned(storyName: string, results: RunContext): void;
declare function clearPinned(storyName: string): void;
declare function getPinned(storyName: string): Nullable<RunContext>;

export { clearPinned, getPinned, savePinned };
