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

// src/task-runner/async.ts
var async_exports = {};
__export(async_exports, {
  asyncFor: () => asyncFor,
  asyncMap: () => asyncMap
});
module.exports = __toCommonJS(async_exports);
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
async function asyncFor({ count, fn }) {
  for (let i = 0; i < count; i++) {
    await waitForFrame();
    await fn(i);
  }
}
