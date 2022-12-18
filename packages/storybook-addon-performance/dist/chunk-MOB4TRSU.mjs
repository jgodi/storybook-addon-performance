import {
  getResultMap
} from "./chunk-ND5DBEMX.mjs";
import {
  getResultForStaticTask
} from "./chunk-NM3VPNFF.mjs";
import {
  getResultForTimedTask
} from "./chunk-OAVL6TOI.mjs";
import {
  asyncMap
} from "./chunk-A6YV2NW4.mjs";

// src/task-runner/run-group.ts
async function runGroup({
  group,
  getElement,
  samples
}) {
  const staticResults = await asyncMap({
    source: group.tasks.filter((task) => task.type === "static"),
    map: async function map(task) {
      return getResultForStaticTask({
        task,
        getElement
      });
    }
  });
  const timedResults = await asyncMap({
    source: group.tasks.filter((task) => task.type === "timed"),
    map: async function map(task) {
      return getResultForTimedTask({
        task,
        getElement,
        samples
      });
    }
  });
  const interactionResults = await asyncMap({
    source: group.tasks.filter((task) => task.type === "interaction"),
    map: async function map(task) {
      return getResultForTimedTask({
        task,
        getElement,
        samples
      });
    }
  });
  const results = {
    groupId: group.groupId,
    map: getResultMap([...timedResults, ...staticResults, ...interactionResults])
  };
  return results;
}

export {
  runGroup
};
