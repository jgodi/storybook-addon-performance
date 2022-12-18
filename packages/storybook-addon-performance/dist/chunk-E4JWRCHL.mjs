import {
  withContainer
} from "./chunk-6P5V2VJH.mjs";
import {
  withDuration
} from "./chunk-VYSEMBV4.mjs";
import {
  mark
} from "./chunk-VMYJOIQJ.mjs";

// src/task-runner/run-interaction-task.ts
import ReactDOM from "react-dom";
async function runInteractionTask({ task, getElement }) {
  return withContainer(async (container) => {
    ReactDOM.render(getElement(), container);
    const duration = await mark(
      task.name,
      () => withDuration((controls) => task.run({ controls, container }))
    );
    ReactDOM.unmountComponentAtNode(container);
    return duration;
  });
}

export {
  runInteractionTask
};
