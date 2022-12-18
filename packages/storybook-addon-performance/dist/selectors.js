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

// src/selectors.ts
var selectors_exports = {};
__export(selectors_exports, {
  copySelectId: () => copySelectId,
  hiddenFileAnchorId: () => hiddenFileAnchorId,
  loadButtonId: () => loadButtonId,
  panelId: () => panelId,
  pinButtonId: () => pinButtonId,
  sampleSelectId: () => sampleSelectId,
  saveButtonId: () => saveButtonId,
  startAllButtonId: () => startAllButtonId
});
module.exports = __toCommonJS(selectors_exports);

// src/addon-constants.ts
var packageName = "storybook-addon-performance";

// src/selectors.ts
function prefix(selector) {
  return `${packageName}-${selector}`;
}
var startAllButtonId = prefix("start-all-button");
var panelId = prefix("panel");
var sampleSelectId = prefix("sample-select");
var copySelectId = prefix("copy-select");
var pinButtonId = prefix("pin-button");
var hiddenFileAnchorId = prefix("hidden-anchor");
var loadButtonId = prefix("load-button");
var saveButtonId = prefix("save-button");
