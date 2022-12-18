import {
  ExpandingResult
} from "./chunk-W6UH7UZ4.mjs";
import {
  Content,
  Heading,
  ResultScale,
  ResultValue,
  Table,
  TitleCell,
  ValueCell,
  ValueLozenge
} from "./chunk-3B5URMMI.mjs";

// src/panel/task-result/static-result.tsx
import React from "react";
function DiffToPinned({
  task,
  result,
  pinned
}) {
  if (pinned == null) {
    return null;
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Heading, null, "Compared with pinned"), /* @__PURE__ */ React.createElement(Content, null, /* @__PURE__ */ React.createElement(Table, null, /* @__PURE__ */ React.createElement("tbody", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement(TitleCell, null, "Pinned value"), /* @__PURE__ */ React.createElement(ValueCell, null, /* @__PURE__ */ React.createElement(ValueLozenge, { type: "raw" }, pinned.value, task.scale))), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement(TitleCell, null, "Current value"), /* @__PURE__ */ React.createElement(ValueCell, null, /* @__PURE__ */ React.createElement(ValueLozenge, { type: pinned.value === result.value ? "raw" : "info" }, result.value, task.scale)))))));
}
function Expanded({
  task,
  result,
  pinned
}) {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(DiffToPinned, { task, result, pinned }), /* @__PURE__ */ React.createElement(Heading, null, "Description"), /* @__PURE__ */ React.createElement(Content, null, task.description));
}
function StaticResultView({
  task,
  result,
  pinned
}) {
  const resultNode = /* @__PURE__ */ React.createElement(React.Fragment, null, pinned && pinned.value !== result.value ? /* @__PURE__ */ React.createElement(ValueLozenge, { type: "info" }, pinned.value, task.scale) : null, /* @__PURE__ */ React.createElement(ResultValue, null, result.value), " ", /* @__PURE__ */ React.createElement(ResultScale, null, task.scale));
  return /* @__PURE__ */ React.createElement(
    ExpandingResult,
    {
      name: task.name,
      result: resultNode,
      getExpanded: ({ isExpanded }) => isExpanded ? /* @__PURE__ */ React.createElement(Expanded, { task, result, pinned }) : null
    }
  );
}

export {
  StaticResultView
};
