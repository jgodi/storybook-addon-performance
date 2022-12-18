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

// src/tasks/get-interaction-group.ts
var get_interaction_group_exports = {};
__export(get_interaction_group_exports, {
  getInteractionGroup: () => getInteractionGroup,
  interactionGroupId: () => interactionGroupId
});
module.exports = __toCommonJS(get_interaction_group_exports);
var interactionGroupId = "Interactions";
function getInteractionGroup(interactions) {
  const tasks = interactions.map(
    (item, index) => {
      return {
        ...item,
        type: "interaction",
        name: item.name,
        description: item.description || "(None provided)"
      };
    }
  );
  return {
    groupId: interactionGroupId,
    name: "Interactions \u{1F579}",
    tasks
  };
}
