import {
  runGroup
} from "./chunk-MOB4TRSU.mjs";
import {
  getResultForStaticTask
} from "./chunk-NM3VPNFF.mjs";
import {
  getResultForTimedTask
} from "./chunk-OAVL6TOI.mjs";
import {
  toSafeElement
} from "./chunk-4KNXMVP2.mjs";

// src/task-runner/index.ts
async function runAll({
  groups,
  getNode,
  samples,
  copies
}) {
  const value = [];
  for (const group of groups) {
    const results = await runGroup({
      group,
      getElement: () => toSafeElement({ getNode, copies }),
      samples
    });
    value.push(results);
  }
  return value;
}
async function runOneTimed({
  task,
  getNode,
  copies,
  samples
}) {
  const result = await getResultForTimedTask({
    task,
    getElement: () => toSafeElement({ getNode, copies }),
    samples
  });
  return result;
}
async function runOneStatic({
  task,
  getNode,
  copies
}) {
  return getResultForStaticTask({
    task,
    getElement: () => toSafeElement({ getNode, copies })
  });
}

export {
  runAll,
  runOneTimed,
  runOneStatic
};
