import { AllowedGroup, PublicInteractionTask, TaskGroup } from '../types.js';

declare function getGroups({ allowedGroups, interactions, }: {
    allowedGroups: AllowedGroup[];
    interactions: PublicInteractionTask[];
}): TaskGroup[];

export { getGroups };
