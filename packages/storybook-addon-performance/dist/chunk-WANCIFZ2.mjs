import {
  client_default
} from "./chunk-MCCJVA2C.mjs";
import {
  server_default
} from "./chunk-2YZJDOAC.mjs";
import {
  flatten
} from "./chunk-O7GHK66D.mjs";
import {
  getInteractionGroup
} from "./chunk-L47UYYE5.mjs";
import {
  invariant
} from "./chunk-FLQHF53G.mjs";

// src/tasks/get-groups.ts
function getDuplicateTaskNames(groups) {
  const tasks = flatten(groups.map((group) => group.tasks));
  const allNames = tasks.map((task) => task.name);
  const duplicates = allNames.filter((name) => {
    return allNames.filter((value) => value === name).length > 1;
  });
  return [...new Set(duplicates)];
}
function getGroups({
  allowedGroups,
  interactions
}) {
  const result = [];
  if (allowedGroups.includes("server")) {
    result.push(server_default);
  }
  if (allowedGroups.includes("client")) {
    const tasks = allowedGroups.includes("server") ? client_default.tasks : client_default.tasks.filter((task) => task.name !== "Hydrate");
    result.push({
      ...client_default,
      tasks
    });
  }
  result.push(getInteractionGroup(interactions));
  const duplicateNames = getDuplicateTaskNames(result);
  invariant(
    !duplicateNames.length,
    `Tasks found with duplicate names: [${duplicateNames.join(",")}]`
  );
  return result;
}

export {
  getGroups
};
