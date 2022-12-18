import { MachineEvents } from './machine.js';
import 'xstate';
import '../types.js';

declare function nextEventsInclude(name: MachineEvents['type'], events: string[]): boolean;

export { nextEventsInclude as default };
