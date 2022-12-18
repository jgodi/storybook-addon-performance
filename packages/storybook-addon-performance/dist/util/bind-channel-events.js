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

// src/util/bind-channel-events.ts
var bind_channel_events_exports = {};
__export(bind_channel_events_exports, {
  bind: () => bind,
  bindAll: () => bindAll
});
module.exports = __toCommonJS(bind_channel_events_exports);
function bind(channel, binding) {
  channel.on(binding.eventName, binding.fn);
  return function unbind() {
    channel.off(binding.eventName, binding.fn);
  };
}
function bindAll(channel, bindings) {
  const unbinds = bindings.map((binding) => bind(channel, binding));
  return function unbindAll() {
    unbinds.forEach((unbind) => unbind());
  };
}
