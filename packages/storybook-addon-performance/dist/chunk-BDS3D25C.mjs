import {
  UnsupportedError
} from "./chunk-AXGAUA2B.mjs";

// src/task-runner/get-error-result.ts
function getErrorResult({ task, error }) {
  if (error instanceof UnsupportedError) {
    return {
      type: "error",
      taskName: task.name,
      reason: "unsupported",
      message: error.message
    };
  }
  return {
    type: "error",
    taskName: task.name,
    reason: "unhandled",
    message: null
  };
}

export {
  getErrorResult
};
