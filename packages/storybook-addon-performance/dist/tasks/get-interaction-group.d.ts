import { PublicInteractionTask, TaskGroup } from '../types.js';

declare const interactionGroupId: string;
declare function getInteractionGroup(interactions: PublicInteractionTask[]): TaskGroup;

export { getInteractionGroup, interactionGroupId };
