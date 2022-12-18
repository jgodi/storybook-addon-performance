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

// src/task-runner/run-interaction-task.ts
var run_interaction_task_exports = {};
__export(run_interaction_task_exports, {
  default: () => runInteractionTask
});
module.exports = __toCommonJS(run_interaction_task_exports);
var import_react_dom2 = __toESM(require("react-dom"));

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

// ../../node_modules/tiny-invariant/dist/esm/tiny-invariant.js
var isProduction = false;
var prefix = "Invariant failed";
function invariant(condition, message) {
  if (condition) {
    return;
  }
  if (isProduction) {
    throw new Error(prefix);
  }
  var provided = typeof message === "function" ? message() : message;
  var value = provided ? "".concat(prefix, ": ").concat(provided) : prefix;
  throw new Error(value);
}

// src/task-runner/with-duration.ts
async function getDuration(fn) {
  const start = performance.now();
  await fn();
  const finish = performance.now();
  return finish - start;
}
async function withDuration(fn) {
  let timedDuration = null;
  let isControlled = false;
  const controls = {
    time: async function time(fn2) {
      invariant(!isControlled, "controls.time has already been used");
      isControlled = true;
      timedDuration = await getDuration(fn2);
    }
  };
  const wholeTaskDuration = await getDuration(() => fn(controls));
  if (isControlled) {
    invariant(
      timedDuration != null,
      `
      You have used controls.timed but have not waited for the result to finish
      Ensure that you wait for the result:

      await controls.time(async () => {});

      You might not be waiting for controls.time

      controls.time(async () => {});
    `
    );
    return timedDuration;
  }
  return wholeTaskDuration;
}

// src/task-runner/run-interaction-task.ts
async function runInteractionTask({ task, getElement }) {
  return withContainer(async (container) => {
    import_react_dom2.default.render(getElement(), container);
    const duration = await mark(
      task.name,
      () => withDuration((controls) => task.run({ controls, container }))
    );
    import_react_dom2.default.unmountComponentAtNode(container);
    return duration;
  });
}
