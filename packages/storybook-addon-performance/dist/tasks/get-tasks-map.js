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

// src/tasks/get-tasks-map.ts
var get_tasks_map_exports = {};
__export(get_tasks_map_exports, {
  default: () => getTaskMap
});
module.exports = __toCommonJS(get_tasks_map_exports);
var import_utils = require("xstate/lib/utils");
function getTaskMap(groups) {
  return (0, import_utils.flatten)(groups.map((group) => group.tasks)).reduce((acc, task) => {
    acc[task.name] = task;
    return acc;
  }, {});
}
