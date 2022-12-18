"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/task-runner/get-error-result.ts
var get_error_result_exports = {};
__export(get_error_result_exports, {
  default: () => getErrorResult
});
module.exports = __toCommonJS(get_error_result_exports);

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
