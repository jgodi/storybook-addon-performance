// src/tasks/get-tasks-map.ts
import { flatten } from "xstate/lib/utils";
function getTaskMap(groups) {
  return flatten(groups.map((group) => group.tasks)).reduce((acc, task) => {
    acc[task.name] = task;
    return acc;
  }, {});
}

export {
  getTaskMap
};
