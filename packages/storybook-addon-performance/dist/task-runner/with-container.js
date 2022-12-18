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

// src/task-runner/with-container.ts
var with_container_exports = {};
__export(with_container_exports, {
  default: () => withContainer
});
module.exports = __toCommonJS(with_container_exports);
var import_react_dom = __toESM(require("react-dom"));

// src/addon-constants.ts
var packageName = "storybook-addon-performance";

// src/task-runner/with-container.ts
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
