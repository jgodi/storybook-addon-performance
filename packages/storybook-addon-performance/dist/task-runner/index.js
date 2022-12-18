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

// src/task-runner/index.ts
var task_runner_exports = {};
__export(task_runner_exports, {
  runAll: () => runAll,
  runOneStatic: () => runOneStatic,
  runOneTimed: () => runOneTimed
});
module.exports = __toCommonJS(task_runner_exports);

// src/task-runner/to-safe-element.tsx
var import_react = __toESM(require("react"));
function Host({ children }) {
  return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, children());
}
function toSafeElement({ getNode, copies }) {
  const nodes = Array.from({ length: copies }, (_, key) => /* @__PURE__ */ import_react.default.createElement(Host, { key }, getNode));
  return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, nodes);
}

// src/util/get-result-map.ts
function getResultMap(list) {
  return list.reduce((acc, item) => {
    acc[item.taskName] = item;
    return acc;
  }, {});
}

// src/task-runner/async.ts
function waitForFrame() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => resolve());
  });
}
async function asyncMap({
  source,
  map
}) {
  const results = [];
  for (let i = 0; i < source.length; i++) {
    await waitForFrame();
    const value = await map(source[i], i, source);
    results.push(value);
  }
  return results;
}

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

// src/task-runner/run-interaction-task.ts
var import_react_dom2 = __toESM(require("react-dom"));

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

// src/task-runner/run-timed-task.ts
function getAverage(values) {
  return values.reduce((total, current) => total + current, 0) / values.length;
}
function getStandardDeviation(average, values) {
  const squaredDifferences = values.map((value) => (value - average) ** 2);
  const squareDifferenceAverage = getAverage(squaredDifferences);
  return Math.sqrt(squareDifferenceAverage);
}
function getDifferenceFrom(relativeTo, target) {
  const diff = Math.abs(target - relativeTo);
  return diff / relativeTo * 100;
}
function getUpperAndLower(average, values) {
  const ordered = [...values].sort((a, b) => a - b);
  const lowest = ordered[0];
  const highest = ordered[ordered.length - 1];
  return {
    lowerPercentage: getDifferenceFrom(average, lowest),
    upperPercentage: getDifferenceFrom(average, highest)
  };
}
async function runTimedTask({ task, getElement }) {
  return withContainer((container) => {
    return mark(
      task.name,
      () => withDuration((controls) => task.run({ controls, container, getElement }))
    );
  });
}
async function getResultForTimedTask({
  task,
  getElement,
  samples
}) {
  try {
    const durations = await asyncMap({
      source: Array.from({ length: samples }),
      map: async function map() {
        if (task.type === "timed") {
          return runTimedTask({
            task,
            getElement
          });
        }
        return runInteractionTask({
          task,
          getElement
        });
      }
    });
    const average = getAverage(durations);
    const { upperPercentage, lowerPercentage } = getUpperAndLower(average, durations);
    const standardDeviation = getStandardDeviation(average, durations);
    const result = {
      type: "timed",
      taskName: task.name,
      averageMs: average,
      samples,
      variance: {
        upperPercentage,
        lowerPercentage,
        standardDeviation
      }
    };
    return result;
  } catch (error) {
    printError({ task, error });
    return getErrorResult({ task, error });
  }
}

// src/task-runner/run-group.ts
async function runGroup({
  group,
  getElement,
  samples
}) {
  const staticResults = await asyncMap({
    source: group.tasks.filter((task) => task.type === "static"),
    map: async function map(task) {
      return getResultForStaticTask({
        task,
        getElement
      });
    }
  });
  const timedResults = await asyncMap({
    source: group.tasks.filter((task) => task.type === "timed"),
    map: async function map(task) {
      return getResultForTimedTask({
        task,
        getElement,
        samples
      });
    }
  });
  const interactionResults = await asyncMap({
    source: group.tasks.filter((task) => task.type === "interaction"),
    map: async function map(task) {
      return getResultForTimedTask({
        task,
        getElement,
        samples
      });
    }
  });
  const results = {
    groupId: group.groupId,
    map: getResultMap([...timedResults, ...staticResults, ...interactionResults])
  };
  return results;
}

// src/task-runner/index.ts
async function runAll({
  groups,
  getNode,
  samples,
  copies
}) {
  const value = [];
  for (const group of groups) {
    const results = await runGroup({
      group,
      getElement: () => toSafeElement({ getNode, copies }),
      samples
    });
    value.push(results);
  }
  return value;
}
async function runOneTimed({
  task,
  getNode,
  copies,
  samples
}) {
  const result = await getResultForTimedTask({
    task,
    getElement: () => toSafeElement({ getNode, copies }),
    samples
  });
  return result;
}
async function runOneStatic({
  task,
  getNode,
  copies
}) {
  return getResultForStaticTask({
    task,
    getElement: () => toSafeElement({ getNode, copies })
  });
}
