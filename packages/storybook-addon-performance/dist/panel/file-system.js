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

// src/panel/file-system.ts
var file_system_exports = {};
__export(file_system_exports, {
  readFile: () => readFile,
  saveFile: () => saveFile
});
module.exports = __toCommonJS(file_system_exports);

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

// src/panel/file-system.ts
function saveFile(storyName, current) {
  const anchor = document.getElementById(hiddenFileAnchorId);
  if (anchor) {
    anchor.setAttribute(
      "href",
      "data:text/json," + encodeURIComponent(JSON.stringify(current, null, 2))
    );
    anchor.setAttribute("download", `${storyName}.json`);
    anchor.click();
  }
}
function readFile(e, callback) {
  const reader = new FileReader();
  const { files } = e.currentTarget;
  if (files && files.length) {
    reader.readAsText(files[0]);
    reader.onload = ({ target }) => {
      var _a, _b;
      if (target) {
        const context = JSON.parse((_b = (_a = target.result) == null ? void 0 : _a.toString()) != null ? _b : "");
        const [storyName] = files[0].name.split(".json");
        callback(context, storyName);
      }
    };
  }
}
