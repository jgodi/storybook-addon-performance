// src/task-runner/get-element.tsx
import React from "react";
function getElement(getNode) {
  return () => /* @__PURE__ */ React.createElement(React.Fragment, null, getNode());
}

export {
  getElement
};
