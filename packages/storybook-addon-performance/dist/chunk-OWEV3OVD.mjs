import {
  TimedResultView
} from "./chunk-7WAVKKDP.mjs";
import {
  ErrorResultView
} from "./chunk-ZRT6AJLB.mjs";
import {
  StaticResultView
} from "./chunk-NFRQK5NY.mjs";
import {
  invariant
} from "./chunk-FLQHF53G.mjs";

// src/panel/task-result/index.tsx
import React from "react";
function TaskResult({ task, result, pinned }) {
  if (result == null) {
    return null;
  }
  if (result.type === "error") {
    return /* @__PURE__ */ React.createElement(ErrorResultView, { key: task.name, task, result });
  }
  if (result.type === "static") {
    invariant(task.type === "static", `Unexpected task type: ${task.type}`);
    const pin = pinned && pinned.type === "static" ? pinned : null;
    return /* @__PURE__ */ React.createElement(StaticResultView, { key: task.name, task, result, pinned: pin });
  }
  if (result.type === "timed") {
    invariant(
      task.type === "timed" || task.type === "interaction",
      `Unexpected task type: ${task.type}`
    );
    const pin = pinned && pinned.type === "timed" ? pinned : null;
    return /* @__PURE__ */ React.createElement(TimedResultView, { key: task.name, task, result, pinned: pin });
  }
  console.error("Incorrect data passed to TaskResult", { result, task, pinned });
  return null;
}

export {
  TaskResult
};
