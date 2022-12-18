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

// src/util/convert-bytes-to.ts
var convert_bytes_to_exports = {};
__export(convert_bytes_to_exports, {
  bytesToKiloBytes: () => bytesToKiloBytes,
  bytesToMegaBytes: () => bytesToMegaBytes
});
module.exports = __toCommonJS(convert_bytes_to_exports);

// src/util/to-fixed.ts
function toFixed(value, precision = 2) {
  return value.toFixed(precision);
}

// src/util/convert-bytes-to.ts
function bytesToKiloBytes(bytes) {
  return toFixed(bytes / Math.pow(10, 3));
}
function bytesToMegaBytes(bytes) {
  return toFixed(bytes / Math.pow(10, 6));
}
