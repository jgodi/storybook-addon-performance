"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/panel/use-panel-machine.tsx
var use_panel_machine_exports = {};
__export(use_panel_machine_exports, {
  default: () => usePanelMachine
});
module.exports = __toCommonJS(use_panel_machine_exports);

// ../../node_modules/@storybook/core-events/dist/index.mjs
var events = ((events2) => (events2.CHANNEL_CREATED = "channelCreated", events2.CONFIG_ERROR = "configError", events2.STORY_INDEX_INVALIDATED = "storyIndexInvalidated", events2.STORY_SPECIFIED = "storySpecified", events2.SET_CONFIG = "setConfig", events2.SET_STORIES = "setStories", events2.SET_INDEX = "setIndex", events2.SET_CURRENT_STORY = "setCurrentStory", events2.CURRENT_STORY_WAS_SET = "currentStoryWasSet", events2.FORCE_RE_RENDER = "forceReRender", events2.FORCE_REMOUNT = "forceRemount", events2.PRELOAD_ENTRIES = "preloadStories", events2.STORY_PREPARED = "storyPrepared", events2.STORY_CHANGED = "storyChanged", events2.STORY_UNCHANGED = "storyUnchanged", events2.STORY_RENDERED = "storyRendered", events2.STORY_MISSING = "storyMissing", events2.STORY_ERRORED = "storyErrored", events2.STORY_THREW_EXCEPTION = "storyThrewException", events2.STORY_RENDER_PHASE_CHANGED = "storyRenderPhaseChanged", events2.PLAY_FUNCTION_THREW_EXCEPTION = "playFunctionThrewException", events2.UPDATE_STORY_ARGS = "updateStoryArgs", events2.STORY_ARGS_UPDATED = "storyArgsUpdated", events2.RESET_STORY_ARGS = "resetStoryArgs", events2.SET_GLOBALS = "setGlobals", events2.UPDATE_GLOBALS = "updateGlobals", events2.GLOBALS_UPDATED = "globalsUpdated", events2.REGISTER_SUBSCRIPTION = "registerSubscription", events2.PREVIEW_KEYDOWN = "previewKeydown", events2.PREVIEW_BUILDER_PROGRESS = "preview_builder_progress", events2.SELECT_STORY = "selectStory", events2.STORIES_COLLAPSE_ALL = "storiesCollapseAll", events2.STORIES_EXPAND_ALL = "storiesExpandAll", events2.DOCS_RENDERED = "docsRendered", events2.SHARED_STATE_CHANGED = "sharedStateChanged", events2.SHARED_STATE_SET = "sharedStateSet", events2.NAVIGATE_URL = "navigateUrl", events2.UPDATE_QUERY_PARAMS = "updateQueryParams", events2))(events || {});
var { CHANNEL_CREATED, CONFIG_ERROR, CURRENT_STORY_WAS_SET, DOCS_RENDERED, FORCE_RE_RENDER, FORCE_REMOUNT, GLOBALS_UPDATED, NAVIGATE_URL, PLAY_FUNCTION_THREW_EXCEPTION, PRELOAD_ENTRIES, PREVIEW_BUILDER_PROGRESS, PREVIEW_KEYDOWN, REGISTER_SUBSCRIPTION, RESET_STORY_ARGS, SELECT_STORY, SET_CONFIG, SET_CURRENT_STORY, SET_GLOBALS, SET_INDEX, SET_STORIES, SHARED_STATE_CHANGED, SHARED_STATE_SET, STORIES_COLLAPSE_ALL, STORIES_EXPAND_ALL, STORY_ARGS_UPDATED, STORY_CHANGED, STORY_ERRORED, STORY_INDEX_INVALIDATED, STORY_MISSING, STORY_PREPARED, STORY_RENDER_PHASE_CHANGED, STORY_RENDERED, STORY_SPECIFIED, STORY_THREW_EXCEPTION, STORY_UNCHANGED, UPDATE_GLOBALS, UPDATE_QUERY_PARAMS, UPDATE_STORY_ARGS } = events;
var IGNORED_EXCEPTION = new Error("ignoredException");

// src/panel/use-panel-machine.tsx
var import_react = require("@xstate/react");
var import_react2 = require("react");

// src/events.ts
var events_default = {
  START_ALL: "start all",
  START_ONE: "start one",
  FINISH_ALL: "finish all",
  FINISH_ONE: "finish one",
  PUBLISH_INTERACTIONS: "publish interactions"
};

// src/util/bind-channel-events.ts
function bind(channel, binding) {
  channel.on(binding.eventName, binding.fn);
  return function unbind() {
    channel.off(binding.eventName, binding.fn);
  };
}
function bindAll(channel, bindings) {
  const unbinds = bindings.map((binding) => bind(channel, binding));
  return function unbindAll() {
    unbinds.forEach((unbind) => unbind());
  };
}

// src/addon-constants.ts
var packageName = "storybook-addon-performance";

// src/selectors.ts
function prefix(selector) {
  return `${packageName}-${selector}`;
}
var startAllButtonId = prefix("start-all-button");
var panelId = prefix("panel");
var sampleSelectId = prefix("sample-select");
var copySelectId = prefix("copy-select");
var pinButtonId = prefix("pin-button");
var hiddenFileAnchorId = prefix("hidden-anchor");
var loadButtonId = prefix("load-button");
var saveButtonId = prefix("save-button");

// src/panel/file-system.ts
function saveFile(storyName, current) {
  const anchor = document.getElementById(hiddenFileAnchorId);
  if (anchor) {
    anchor.setAttribute(
      "href",
      "data:text/json," + encodeURIComponent(JSON.stringify(current, null, 2))
    );
    anchor.setAttribute("download", `${storyName}.json`);
    anchor.click();
  }
}

// src/panel/pinned-storage.ts
function hasProperty(value, key) {
  return Object.prototype.hasOwnProperty.call(value, key);
}
function isValidContext(value) {
  if (typeof value !== "object") {
    return false;
  }
  if (value == null) {
    return false;
  }
  if (Array.isArray(value)) {
    return false;
  }
  const hasAllProperties = ["results", "samples", "copies"].every(
    (key) => hasProperty(value, key)
  );
  if (!hasAllProperties) {
    return false;
  }
  const map = value && value.results && value.results[0] ? value.results[0].map : void 0;
  if (map == null) {
    return false;
  }
  const hasTaskId = Object.keys(map).some((key) => {
    const entry = map[key];
    return hasProperty(entry, "taskId");
  });
  return hasTaskId ? false : true;
}
function getKey(storyName) {
  return `${packageName}-${storyName}`;
}
function savePinned(storyName, results) {
  localStorage.setItem(getKey(storyName), JSON.stringify(results));
}
function clearPinned(storyName) {
  localStorage.removeItem(getKey(storyName));
}
function getPinned(storyName) {
  const raw = localStorage.getItem(getKey(storyName));
  if (!raw) {
    return null;
  }
  const value = JSON.parse(raw);
  if (!isValidContext(value)) {
    console.warn("Unsupported value found in localStorage. Value cleared");
    clearPinned(storyName);
    return null;
  }
  return value;
}

// src/panel/use-panel-machine.tsx
function mergeWithResults({ existing, result }) {
  return existing.map((groupResult) => {
    return {
      ...groupResult,
      map: {
        ...groupResult.map,
        [result.taskName]: result
      }
    };
  });
}
function usePanelMachine(machine, channel) {
  const [state, send, service] = (0, import_react.useMachine)(machine);
  (0, import_react2.useEffect)(
    function bindChannelEvents() {
      const unsubscribe = bindAll(channel, [
        {
          eventName: STORY_RENDERED,
          fn: (storyName) => {
            service.send("LOADED", { storyName, pinned: getPinned(storyName) });
          }
        },
        {
          eventName: STORY_CHANGED,
          fn: () => service.send("WAIT")
        }
      ]);
      return unsubscribe;
    },
    [service, channel]
  );
  (0, import_react2.useEffect)(() => {
    function finishAll({ results }) {
      service.send("FINISH", { results });
    }
    function finishOne({ result }) {
      const results = mergeWithResults({
        existing: service.state.context.current.results,
        result
      });
      service.send("FINISH", { results });
    }
    const unbindChannel = bindAll(channel, [
      { eventName: events_default.FINISH_ALL, fn: finishAll },
      { eventName: events_default.FINISH_ONE, fn: finishOne }
    ]);
    const unsubscribable = service.subscribe(
      function next(state2, event) {
        if (!state2.changed) {
          return;
        }
        if (!event) {
          return;
        }
        const { current, storyName } = state2.context;
        if (event.type === "SAVE") {
          saveFile(storyName, current);
          return;
        }
        if (event.type === "PIN") {
          savePinned(storyName, current);
          return;
        }
        if (event.type === "UNPIN") {
          clearPinned(storyName);
          return;
        }
        const { samples, copies } = current;
        if (state2.matches("active.running")) {
          if (event.type === "START_ALL") {
            channel.emit(events_default.START_ALL, {
              samples,
              copies
            });
            return;
          }
          if (event.type === "START_ONE") {
            channel.emit(events_default.START_ONE, {
              taskName: event.taskName,
              samples,
              copies
            });
          }
        }
      }
    );
    return function unsubscribe() {
      unbindChannel();
      unsubscribable.unsubscribe();
    };
  }, [service, channel]);
  return { state, send, service };
}
