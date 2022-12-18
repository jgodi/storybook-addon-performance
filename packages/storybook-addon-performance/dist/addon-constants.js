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

// src/addon-constants.ts
var addon_constants_exports = {};
__export(addon_constants_exports, {
  addonKey: () => addonKey,
  decoratorKey: () => decoratorKey,
  packageName: () => packageName,
  panelKey: () => panelKey,
  panelTitle: () => panelTitle,
  paramKey: () => paramKey
});
module.exports = __toCommonJS(addon_constants_exports);
var addonKey = "performance";
var panelKey = "performance/panel";
var panelTitle = "Performance";
var decoratorKey = "withPerformance";
var paramKey = "performance";
var packageName = "storybook-addon-performance";
