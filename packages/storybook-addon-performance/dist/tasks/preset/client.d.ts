import { TaskGroup } from '../../types.js';

interface Fiber {
    child: Fiber | null;
    sibling: Fiber | null;
}
declare function traverse(rootNode: Fiber, callback: (node: Fiber) => void): void;
declare const group: TaskGroup;

export { group as default, traverse };
