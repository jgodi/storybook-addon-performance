import {
  readFile
} from "./chunk-TPOUPAAB.mjs";
import {
  Button,
  Form,
  Icons
} from "./chunk-4EQSHNDX.mjs";
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
  copySelectId,
  hiddenFileAnchorId,
  loadButtonId,
  pinButtonId,
  sampleSelectId,
  saveButtonId,
  startAllButtonId
} from "./chunk-7MKKXQK2.mjs";
import {
  useRequiredContext
} from "./chunk-VQZJGAKV.mjs";

// src/panel/top-bar.tsx
import { styled } from "@storybook/theming";
import React from "react";
import { useActor } from "@xstate/react";
var TABLET_BREAKPOINT = 768;
var Container = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;
var Message = styled.small`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  flex-shrink: 1;
  flex-grow: 1;
`;
var Segment = styled.div`
  display: flex;
  align-items: center;

  > * {
    margin: var(--halfGrid) !important;
    flex-shrink: 0;
  }
`;
var HiddenAnchor = styled.a`
  display: none;
`;
var FileButtons = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;

  > * {
    margin: var(--halfGrid) !important;
    flex-shrink: 0;
  }
`;
var MetaSettings = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
`;
var ResponsiveIcon = styled(Icons)`
  @media screen and (max-width: ${TABLET_BREAKPOINT}px) {
    margin-right: 0px !important;
  }
`;
var ResponsiveText = styled.span`
  @media screen and (max-width: ${TABLET_BREAKPOINT}px) {
    display: none;
  }
`;
var CollapseSegment = styled.div`
  margin: var(--halfGrid);
  align-items: center;
  display: grid;
  grid-template-columns: min-content minmax(100px, auto);
  gap: var(--halfGrid);
`;
function Topbar() {
  const service = useRequiredContext(service_context_default);
  const [state, send] = useActor(service);
  const current = state.context.current;
  const pinned = state.context.pinned;
  const sizes = state.context.sizes;
  const enabled = {
    start: nextEventsInclude("START_ALL", state.nextEvents),
    change: nextEventsInclude("SET_VALUES", state.nextEvents) && pinned == null,
    pin: nextEventsInclude("PIN", state.nextEvents) && current.results != null,
    unpin: nextEventsInclude("UNPIN", state.nextEvents) && current.results != null
  };
  const icons = {
    pin: pinned ? "lock" : "unlock",
    save: "download",
    load: "upload"
  };
  return /* @__PURE__ */ React.createElement(Container, null, /* @__PURE__ */ React.createElement(Segment, null, /* @__PURE__ */ React.createElement(
    Button,
    {
      css: {
        textTransform: "uppercase"
      },
      primary: true,
      small: true,
      onClick: () => send({ type: "START_ALL" }),
      disabled: !enabled.start,
      id: startAllButtonId
    },
    "Start all"
  ), /* @__PURE__ */ React.createElement(
    Form.Select,
    {
      id: copySelectId,
      disabled: !enabled.change,
      value: current.copies,
      onChange: (event) => {
        const values = {
          samples: current.samples,
          copies: Number(event.target.value)
        };
        send({ type: "SET_VALUES", ...values });
      }
    },
    sizes.map((size) => /* @__PURE__ */ React.createElement("option", { key: size, value: size }, size, " ", pluraliseCopies(size)))
  ), /* @__PURE__ */ React.createElement(
    Form.Select,
    {
      id: sampleSelectId,
      disabled: !enabled.change,
      value: current.samples,
      onChange: (event) => {
        const values = {
          copies: current.copies,
          samples: Number(event.target.value)
        };
        send({ type: "SET_VALUES", ...values });
      }
    },
    sizes.map((size) => /* @__PURE__ */ React.createElement("option", { key: size, value: size }, size, " ", pluraliseSamples(size)))
  )), /* @__PURE__ */ React.createElement(MetaSettings, null, /* @__PURE__ */ React.createElement(CollapseSegment, null, /* @__PURE__ */ React.createElement(
    Button,
    {
      id: pinButtonId,
      secondary: true,
      outline: !pinned,
      small: true,
      disabled: pinned ? !enabled.unpin : !enabled.pin,
      onClick: () => send({ type: pinned ? "UNPIN" : "PIN" })
    },
    /* @__PURE__ */ React.createElement(ResponsiveIcon, { icon: icons.pin, "aria-label": icons.pin }),
    /* @__PURE__ */ React.createElement(ResponsiveText, null, pinned ? "Unpin baseline" : "Pin as baseline")
  ), /* @__PURE__ */ React.createElement(Message, null, state.context.message)), /* @__PURE__ */ React.createElement(FileButtons, null, /* @__PURE__ */ React.createElement(
    Button,
    {
      id: saveButtonId,
      secondary: true,
      small: true,
      outline: true,
      disabled: current.results == null,
      onClick: () => send({ type: "SAVE" })
    },
    /* @__PURE__ */ React.createElement(ResponsiveIcon, { icon: icons.save, "aria-label": icons.save }),
    /* @__PURE__ */ React.createElement(ResponsiveText, null, "Save result")
  ), /* @__PURE__ */ React.createElement(
    Button,
    {
      secondary: true,
      small: true,
      outline: true,
      onClick: () => {
        var _a;
        (_a = document.getElementById(loadButtonId)) == null ? void 0 : _a.click();
      }
    },
    /* @__PURE__ */ React.createElement(ResponsiveIcon, { icon: icons.load, "aria-label": icons.load }),
    /* @__PURE__ */ React.createElement(ResponsiveText, null, "Load result")
  ), /* @__PURE__ */ React.createElement(
    Form.Input,
    {
      style: { display: "none" },
      id: loadButtonId,
      type: "file",
      accept: ".json",
      onChange: (e) => {
        readFile(
          e,
          (results, storyName) => send({ type: "LOAD_FROM_FILE", pinned: results, storyName })
        );
      }
    }
  )), /* @__PURE__ */ React.createElement(HiddenAnchor, { id: hiddenFileAnchorId })));
}

export {
  Topbar
};
