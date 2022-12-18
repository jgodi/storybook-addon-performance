import {
  packageName
} from "./chunk-4NFBTX2N.mjs";

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

export {
  startAllButtonId,
  panelId,
  sampleSelectId,
  copySelectId,
  pinButtonId,
  hiddenFileAnchorId,
  loadButtonId,
  saveButtonId
};
