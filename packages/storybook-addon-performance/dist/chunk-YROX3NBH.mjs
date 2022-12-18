// src/task-runner/print-error.ts
function printError({ task, error }) {
  if (false) {
    return;
  }
  console.group(`\u{1F680}\u274C Error in task: (${task.name})`);
  console.error(error);
  console.groupEnd();
}

export {
  printError
};
