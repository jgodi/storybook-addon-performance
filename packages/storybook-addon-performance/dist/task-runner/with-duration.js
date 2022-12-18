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

// src/task-runner/with-duration.ts
var with_duration_exports = {};
__export(with_duration_exports, {
  default: () => withDuration
});
module.exports = __toCommonJS(with_duration_exports);

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
