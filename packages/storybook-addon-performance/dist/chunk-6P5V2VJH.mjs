import {
  packageName
} from "./chunk-4NFBTX2N.mjs";

// src/task-runner/with-container.ts
import ReactDOM from "react-dom";
async function withContainer(fn) {
  const container = document.createElement("div");
  container.setAttribute(`data-${packageName}-managed-container`, "true");
  container.style.visibility = "invisible";
  document.body.appendChild(container);
  const result = await fn(container);
  ReactDOM.unmountComponentAtNode(container);
  if (document.body.contains(container)) {
    document.body.removeChild(container);
  }
  return result;
}

export {
  withContainer
};
