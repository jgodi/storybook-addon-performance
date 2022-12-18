import {
  printError
} from "./chunk-YROX3NBH.mjs";
import {
  withContainer
} from "./chunk-6P5V2VJH.mjs";
import {
  getErrorResult
} from "./chunk-BDS3D25C.mjs";
import {
  mark
} from "./chunk-VMYJOIQJ.mjs";

// src/task-runner/run-static-task.ts
async function runStaticTask({ task, getElement }) {
  return await withContainer(async (container) => {
    return await mark(task.name, () => task.run({ getElement, container }));
  });
}
async function getResultForStaticTask({
  task,
  getElement
}) {
  try {
    const value = await runStaticTask({ task, getElement });
    const result = {
      type: "static",
      taskName: task.name,
      value
    };
    return result;
  } catch (error) {
    printError({ task, error });
    return getErrorResult({ task, error });
  }
}

export {
  getResultForStaticTask
};
