import {
  Section
} from "./chunk-3B5URMMI.mjs";
import {
  Button,
  Icons
} from "./chunk-LJMZBB6P.mjs";
import {
  pluraliseCopies,
  pluraliseSamples
} from "./chunk-CDM3JJQQ.mjs";
import {
  nextEventsInclude
} from "./chunk-DAHN6GF6.mjs";
import {
  service_context_default
} from "./chunk-2TOYQF42.mjs";
import {
  useRequiredContext
} from "./chunk-VQZJGAKV.mjs";

// src/panel/task-result/expanding-result.tsx
import React, { useCallback, useState } from "react";
import { styled } from "@storybook/theming";
import { useActor } from "@xstate/react";
var Container = styled.div`
  --result-border-radius: 4px;
  margin-bottom: var(--grid);
  border: 1px solid lightgray;
  border-radius: var(--result-border-radius);
`;
var HeaderButton = styled.button`
  /* reset */
  margin: 0;
  padding: 0;
  border: none;

  width: 100%;
  height: calc(var(--grid) * 4);
  text-align: left;
  font-size: 16px;
  font-weight: bold;

  border-radius: var(--result-border-radius);
  background-color: ${(props) => props.theme.background.content};
  color: ${(props) => props.theme.color.defaultText};

  display: flex;
  align-items: center;
  padding: 0 var(--grid);

  > * {
    margin-left: var(--grid);
    flex-shrink: 0;
  }
`;
var Name = styled.h4`
  /* the name will push the result over, it can also collapse when there is no room */
  flex-grow: 1;
  flex-shrink: 1;
  font-weight: bold;

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
var IconContainer = styled.span`
  margin-left: 0;
  width: var(--grid);
  height: var(--grid);
`;
function ExpandIcon({ isExpanded }) {
  return /* @__PURE__ */ React.createElement(IconContainer, null, /* @__PURE__ */ React.createElement(Icons, { icon: isExpanded ? "arrowdown" : "arrowright" }));
}
function ExpandingResult({ name, result, getExpanded }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggle = useCallback(() => setIsExpanded((value) => !value), [setIsExpanded]);
  const service = useRequiredContext(service_context_default);
  const [state, send] = useActor(service);
  const expanded = getExpanded({ isExpanded });
  const { copies, samples } = state.context.current;
  return /* @__PURE__ */ React.createElement(Container, null, /* @__PURE__ */ React.createElement(HeaderButton, { onClick: toggle, isExpanded, "aria-expanded": isExpanded }, /* @__PURE__ */ React.createElement(ExpandIcon, { isExpanded }), /* @__PURE__ */ React.createElement(Name, null, name), result), isExpanded ? /* @__PURE__ */ React.createElement(Section, null, /* @__PURE__ */ React.createElement(
    Button,
    {
      secondary: true,
      small: true,
      disabled: !nextEventsInclude("START_ONE", state.nextEvents),
      onClick: () => send({ type: "START_ONE", taskName: name })
    },
    "Run task",
    " ",
    /* @__PURE__ */ React.createElement("small", null, "(", copies, " ", pluraliseCopies(copies), ", ", samples, " ", pluraliseSamples(samples), ")")
  ), expanded) : null);
}

export {
  ExpandingResult
};
