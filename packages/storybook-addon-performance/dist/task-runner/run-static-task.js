"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/task-runner/run-static-task.ts
var run_static_task_exports = {};
__export(run_static_task_exports, {
  getResultForStaticTask: () => getResultForStaticTask
});
module.exports = __toCommonJS(run_static_task_exports);

// src/task-runner/custom-errors.ts
var UnsupportedError = class extends Error {
};

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

// src/task-runner/print-error.ts
function printError({ task, error }) {
  if (false) {
    return;
  }
  console.group(`\u{1F680}\u274C Error in task: (${task.name})`);
  console.error(error);
  console.groupEnd();
}

// src/addon-constants.ts
var packageName = "storybook-addon-performance";

// src/task-runner/mark.ts
var startMark = `${packageName}-start`;
var endMark = `${packageName}-end`;
async function mark(taskName, fn) {
  performance.mark(startMark);
  try {
    const result = await fn();
    performance.mark(endMark);
    performance.measure(`\u{1F680} (Task: ${taskName})`, startMark, endMark);
    return result;
  } catch (e) {
    performance.mark(endMark);
    performance.measure(`\u{1F680}\u274C (Task: ${taskName})`, startMark, endMark);
    throw e;
  }
}

// src/task-runner/with-container.ts
var import_react_dom = __toESM(require("react-dom"));
async function withContainer(fn) {
  const container = document.createElement("div");
  container.setAttribute(`data-${packageName}-managed-container`, "true");
  container.style.visibility = "invisible";
  document.body.appendChild(container);
  const result = await fn(container);
  import_react_dom.default.unmountComponentAtNode(container);
  if (document.body.contains(container)) {
    document.body.removeChild(container);
  }
  return result;
}

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
