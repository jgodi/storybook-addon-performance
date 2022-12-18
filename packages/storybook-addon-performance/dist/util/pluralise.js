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

// src/util/pluralise.ts
var pluralise_exports = {};
__export(pluralise_exports, {
  pluralise: () => pluralise,
  pluraliseCopies: () => pluraliseCopies,
  pluraliseSamples: () => pluraliseSamples
});
module.exports = __toCommonJS(pluralise_exports);
function pluralise({ value, single, multiple }) {
  return value === 1 ? single : multiple;
}
function pluraliseCopies(copies) {
  return pluralise({ value: copies, single: "copy", multiple: "copies" });
}
function pluraliseSamples(samples) {
  return pluralise({ value: samples, single: "sample", multiple: "samples" });
}
