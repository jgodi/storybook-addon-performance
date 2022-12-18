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

// src/panel/pinned-storage.ts
var pinned_storage_exports = {};
__export(pinned_storage_exports, {
  clearPinned: () => clearPinned,
  getPinned: () => getPinned,
  savePinned: () => savePinned
});
module.exports = __toCommonJS(pinned_storage_exports);

// src/addon-constants.ts
var packageName = "storybook-addon-performance";

// src/panel/pinned-storage.ts
function hasProperty(value, key) {
  return Object.prototype.hasOwnProperty.call(value, key);
}
function isValidContext(value) {
  if (typeof value !== "object") {
    return false;
  }
  if (value == null) {
    return false;
  }
  if (Array.isArray(value)) {
    return false;
  }
  const hasAllProperties = ["results", "samples", "copies"].every(
    (key) => hasProperty(value, key)
  );
  if (!hasAllProperties) {
    return false;
  }
  const map = value && value.results && value.results[0] ? value.results[0].map : void 0;
  if (map == null) {
    return false;
  }
  const hasTaskId = Object.keys(map).some((key) => {
    const entry = map[key];
    return hasProperty(entry, "taskId");
  });
  return hasTaskId ? false : true;
}
function getKey(storyName) {
  return `${packageName}-${storyName}`;
}
function savePinned(storyName, results) {
  localStorage.setItem(getKey(storyName), JSON.stringify(results));
}
function clearPinned(storyName) {
  localStorage.removeItem(getKey(storyName));
}
function getPinned(storyName) {
  const raw = localStorage.getItem(getKey(storyName));
  if (!raw) {
    return null;
  }
  const value = JSON.parse(raw);
  if (!isValidContext(value)) {
    console.warn("Unsupported value found in localStorage. Value cleared");
    clearPinned(storyName);
    return null;
  }
  return value;
}
