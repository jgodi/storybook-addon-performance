import {
  runInteractionTask
} from "./chunk-E4JWRCHL.mjs";
import {
  printError
} from "./chunk-YROX3NBH.mjs";
import {
  withContainer
} from "./chunk-6P5V2VJH.mjs";
import {
  withDuration
} from "./chunk-VYSEMBV4.mjs";
import {
  asyncMap
} from "./chunk-A6YV2NW4.mjs";
import {
  getErrorResult
} from "./chunk-BDS3D25C.mjs";
import {
  mark
} from "./chunk-VMYJOIQJ.mjs";

// src/task-runner/run-timed-task.ts
function getAverage(values) {
  return values.reduce((total, current) => total + current, 0) / values.length;
}
function getStandardDeviation(average, values) {
  const squaredDifferences = values.map((value) => (value - average) ** 2);
  const squareDifferenceAverage = getAverage(squaredDifferences);
  return Math.sqrt(squareDifferenceAverage);
}
function getDifferenceFrom(relativeTo, target) {
  const diff = Math.abs(target - relativeTo);
  return diff / relativeTo * 100;
}
function getUpperAndLower(average, values) {
  const ordered = [...values].sort((a, b) => a - b);
  const lowest = ordered[0];
  const highest = ordered[ordered.length - 1];
  return {
    lowerPercentage: getDifferenceFrom(average, lowest),
    upperPercentage: getDifferenceFrom(average, highest)
  };
}
async function runTimedTask({ task, getElement }) {
  return withContainer((container) => {
    return mark(
      task.name,
      () => withDuration((controls) => task.run({ controls, container, getElement }))
    );
  });
}
async function getResultForTimedTask({
  task,
  getElement,
  samples
}) {
  try {
    const durations = await asyncMap({
      source: Array.from({ length: samples }),
      map: async function map() {
        if (task.type === "timed") {
          return runTimedTask({
            task,
            getElement
          });
        }
        return runInteractionTask({
          task,
          getElement
        });
      }
    });
    const average = getAverage(durations);
    const { upperPercentage, lowerPercentage } = getUpperAndLower(average, durations);
    const standardDeviation = getStandardDeviation(average, durations);
    const result = {
      type: "timed",
      taskName: task.name,
      averageMs: average,
      samples,
      variance: {
        upperPercentage,
        lowerPercentage,
        standardDeviation
      }
    };
    return result;
  } catch (error) {
    printError({ task, error });
    return getErrorResult({ task, error });
  }
}

export {
  getResultForTimedTask
};
