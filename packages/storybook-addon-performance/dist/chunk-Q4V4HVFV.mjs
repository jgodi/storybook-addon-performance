import {
  ExpandingResult
} from "./chunk-JRDX5EZF.mjs";
import {
  Content,
  Heading,
  ValueLozenge
} from "./chunk-3B5URMMI.mjs";

// src/panel/task-result/error-result.tsx
import React from "react";
function ErrorSection({ result }) {
  const message = result.message ? /* @__PURE__ */ React.createElement(Content, null, "Message: ", result.message) : null;
  if (result.reason === "unhandled") {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Heading, null, "Error \u274C"), /* @__PURE__ */ React.createElement(Content, null, "An unhandled error has occurred while running this task"), message);
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Heading, null, "Unsupported \u26A0\uFE0F"), /* @__PURE__ */ React.createElement(Content, null, "This task is not supported in the current running environment"), message);
}
function Expanded({ task, result }) {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(ErrorSection, { result }), /* @__PURE__ */ React.createElement(Heading, null, "Description"), /* @__PURE__ */ React.createElement(Content, null, task.description));
}
function ErrorResultView({ task, result }) {
  const resultNode = result.reason === "unsupported" ? /* @__PURE__ */ React.createElement(ValueLozenge, { type: "warning" }, "Unsupported") : /* @__PURE__ */ React.createElement(ValueLozenge, { type: "negative" }, "Error");
  return /* @__PURE__ */ React.createElement(
    ExpandingResult,
    {
      name: task.name,
      result: resultNode,
      getExpanded: ({ isExpanded }) => isExpanded ? /* @__PURE__ */ React.createElement(Expanded, { task, result }) : null
    }
  );
}

export {
  ErrorResultView
};
