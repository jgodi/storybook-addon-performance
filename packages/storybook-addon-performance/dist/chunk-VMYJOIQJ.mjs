import {
  packageName
} from "./chunk-4NFBTX2N.mjs";

// src/task-runner/mark.ts
var startMark = `${packageName}-start`;
var endMark = `${packageName}-end`;
async function mark(taskName, fn) {
  performance.mark(startMark);
  try {
    const result = await fn();
    performance.mark(endMark);
    performance.measure(`\u{1F680} (Task: ${taskName})`, startMark, endMark);
    return result;
  } catch (e) {
    performance.mark(endMark);
    performance.measure(`\u{1F680}\u274C (Task: ${taskName})`, startMark, endMark);
    throw e;
  }
}

export {
  mark
};
