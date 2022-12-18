import {
  ExpandingResult
} from "./chunk-JRDX5EZF.mjs";
import {
  Content,
  Heading,
  Note,
  ResultScale,
  ResultValue,
  Table,
  TitleCell,
  ValueCell,
  ValueLozenge
} from "./chunk-3B5URMMI.mjs";
import {
  getChange
} from "./chunk-2M3HHHG7.mjs";
import {
  toFixed
} from "./chunk-2VA53ZMH.mjs";

// src/panel/task-result/timed-result.tsx
import React from "react";
function getDiff({ result, pinned }) {
  if (!pinned) {
    return 0;
  }
  return getChange({
    baseline: pinned.averageMs,
    value: result.averageMs
  });
}
function DiffToPinned({ result, pinned }) {
  if (pinned == null) {
    return null;
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Heading, null, "Compared with pinned"), /* @__PURE__ */ React.createElement(Content, null, /* @__PURE__ */ React.createElement(Table, null, /* @__PURE__ */ React.createElement("tbody", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement(TitleCell, null, "Pinned value"), /* @__PURE__ */ React.createElement(ValueCell, null, /* @__PURE__ */ React.createElement(ValueLozenge, { type: "raw" }, toFixed(pinned.averageMs, 1), "ms"))), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement(TitleCell, null, "Current value"), /* @__PURE__ */ React.createElement(ValueCell, null, /* @__PURE__ */ React.createElement(ValueLozenge, { type: "raw" }, toFixed(result.averageMs, 1), "ms"))), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement(TitleCell, null, "Difference"), /* @__PURE__ */ React.createElement(ValueCell, null, /* @__PURE__ */ React.createElement(DiffLozenge, { diff: getDiff({ result, pinned }) })))))));
}
function Variance({ result }) {
  if (result.samples === 1) {
    return null;
  }
  const wasStable = result.variance.standardDeviation < 1;
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Heading, null, "Variance"), /* @__PURE__ */ React.createElement(Note, null, "When doing multiple runs there can be differences between the runs. The lower the variance, the higher confidence you can have"), /* @__PURE__ */ React.createElement(Table, null, /* @__PURE__ */ React.createElement("tbody", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement(TitleCell, null, "Samples"), /* @__PURE__ */ React.createElement(ValueCell, null, /* @__PURE__ */ React.createElement(ValueLozenge, { type: "info" }, result.samples))), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement(TitleCell, null, "Standard deviation"), /* @__PURE__ */ React.createElement(ValueCell, null, /* @__PURE__ */ React.createElement(
    ValueLozenge,
    {
      hasWarningIcon: wasStable,
      type: wasStable ? "positive" : "negative"
    },
    toFixed(result.variance.standardDeviation)
  ))), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement(TitleCell, null, "Lowest"), /* @__PURE__ */ React.createElement(ValueCell, null, /* @__PURE__ */ React.createElement(ValueLozenge, { type: "raw" }, "-", toFixed(result.variance.lowerPercentage), "%"))), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement(TitleCell, null, "Highest"), /* @__PURE__ */ React.createElement(ValueCell, null, /* @__PURE__ */ React.createElement(ValueLozenge, { type: "raw" }, "+", toFixed(result.variance.upperPercentage), "%"))))));
}
function Expanded({
  task,
  result,
  pinned
}) {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(DiffToPinned, { result, pinned }), /* @__PURE__ */ React.createElement(Variance, { result }), /* @__PURE__ */ React.createElement(Heading, null, "Description"), /* @__PURE__ */ React.createElement(Content, null, task.description));
}
function DiffLozenge({ diff }) {
  const type = (() => {
    const threshold = 5;
    if (diff > threshold) {
      return "negative";
    }
    if (diff < -threshold) {
      return "positive";
    }
    return "faint";
  })();
  const sign = diff >= 0 ? "+" : "-";
  return /* @__PURE__ */ React.createElement(ValueLozenge, { type }, sign, toFixed(Math.abs(diff), 1), "%");
}
function TimedResultView({ task, pinned, result }) {
  const diff = getDiff({ result, pinned });
  const resultNode = /* @__PURE__ */ React.createElement(React.Fragment, null, diff ? /* @__PURE__ */ React.createElement(DiffLozenge, { diff }) : null, /* @__PURE__ */ React.createElement(ResultValue, null, toFixed(result.averageMs)), " ", /* @__PURE__ */ React.createElement(ResultScale, null, "ms"));
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
  TimedResultView
};
