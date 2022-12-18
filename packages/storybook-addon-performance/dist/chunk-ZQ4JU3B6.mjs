import {
  Topbar
} from "./chunk-5VCB72FY.mjs";
import {
  usePanelMachine
} from "./chunk-RVE3ZDU2.mjs";
import {
  machine_default
} from "./chunk-GZXLCQ5G.mjs";
import {
  task_group_default
} from "./chunk-B3JDL7E6.mjs";
import {
  service_context_default
} from "./chunk-2TOYQF42.mjs";
import {
  panelId
} from "./chunk-7MKKXQK2.mjs";
import {
  getGroups
} from "./chunk-WANCIFZ2.mjs";

// src/panel/panel.tsx
import { styled } from "@storybook/theming";
import React, { useMemo } from "react";
var Container = styled.div`
  --grid: 10px;
  --halfGrid: calc(var(--grid) / 2);

  font-size: 16px;
  line-height: 1.5;
`;
var GroupContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  min-height: 100%;
  padding: 0 var(--halfGrid);
`;
function findResult(group, context) {
  if (!context || !context.results) {
    return null;
  }
  const result = context.results.find(
    (item) => item.groupId === group.groupId
  );
  return result || null;
}
function Panel({
  channel,
  interactions,
  allowedGroups
}) {
  const { state, service } = usePanelMachine(machine_default, channel);
  const groups = useMemo(
    () => getGroups({ allowedGroups, interactions }),
    [interactions, allowedGroups]
  );
  return /* @__PURE__ */ React.createElement(service_context_default.Provider, { value: service }, /* @__PURE__ */ React.createElement(Container, { id: panelId }, /* @__PURE__ */ React.createElement(Topbar, null), /* @__PURE__ */ React.createElement(GroupContainer, null, groups.map((group) => {
    if (state.context.current.results == null) {
      return null;
    }
    return /* @__PURE__ */ React.createElement(
      task_group_default,
      {
        key: group.groupId,
        group,
        result: findResult(group, state.context.current),
        pinned: findResult(group, state.context.pinned)
      }
    );
  }))));
}

export {
  Panel
};
