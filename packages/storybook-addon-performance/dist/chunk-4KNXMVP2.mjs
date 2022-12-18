// src/task-runner/to-safe-element.tsx
import React from "react";
function Host({ children }) {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, children());
}
function toSafeElement({ getNode, copies }) {
  const nodes = Array.from({ length: copies }, (_, key) => /* @__PURE__ */ React.createElement(Host, { key }, getNode));
  return /* @__PURE__ */ React.createElement(React.Fragment, null, nodes);
}

export {
  toSafeElement
};
