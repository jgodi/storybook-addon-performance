import {
  TaskResult
} from "./chunk-OWEV3OVD.mjs";
import {
  Link2
} from "./chunk-LJMZBB6P.mjs";
import {
  interactionGroupId
} from "./chunk-L47UYYE5.mjs";

// src/panel/task-group.tsx
import { styled } from "@storybook/theming";
import React from "react";
var Title = styled.h3`
  font-weight: bold;
  margin-bottom: var(--grid);
`;
var Container = styled.div`
  padding: var(--halfGrid);
`;
function EmptyGroupMessage({ group }) {
  if (group.groupId === interactionGroupId && !group.tasks.length) {
    return /* @__PURE__ */ React.createElement("small", null, "No", " ", /* @__PURE__ */ React.createElement(
      Link2,
      {
        href: "https://github.com/atlassian-labs/storybook-addon-performance#usage-interactions",
        target: "_blank",
        rel: "noopener"
      },
      "interactions"
    ), " ", "defined.");
  }
  return null;
}
var task_group_default = React.memo(function TaskGroup({ group, result, pinned }) {
  if (!result) {
    return null;
  }
  return /* @__PURE__ */ React.createElement(Container, null, /* @__PURE__ */ React.createElement(Title, null, group.name), /* @__PURE__ */ React.createElement(EmptyGroupMessage, { group }), group.tasks.map((task) => {
    return /* @__PURE__ */ React.createElement(
      TaskResult,
      {
        key: task.name,
        task,
        result: result.map[task.name] || null,
        pinned: (pinned == null ? void 0 : pinned.map[task.name]) || null
      }
    );
  }));
});

export {
  task_group_default
};
