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

// src/panel/machine.ts
var machine_exports = {};
__export(machine_exports, {
  default: () => machine_default
});
module.exports = __toCommonJS(machine_exports);
var import_xstate = require("xstate");
var initial = {
  message: null,
  sizes: [1, 10, 100],
  storyName: "unknown",
  current: {
    results: null,
    samples: 1,
    copies: 1
  },
  pinned: null
};
var machine = (0, import_xstate.Machine)(
  {
    id: "panel",
    initial: "waiting",
    context: initial,
    states: {
      waiting: {
        entry: (0, import_xstate.assign)(() => initial),
        on: {
          LOADED: {
            target: "active",
            actions: (0, import_xstate.assign)((context, event) => {
              const message = event.pinned ? `Loaded pinned result for story: ${event.storyName}` : null;
              return {
                ...context,
                message,
                pinned: event.pinned,
                storyName: event.storyName,
                current: event.pinned || context.current
              };
            })
          }
        }
      },
      active: {
        id: "active",
        initial: "idle",
        on: {
          WAIT: "#panel.waiting"
        },
        states: {
          idle: {
            exit: "clearMessage",
            on: {
              START_ALL: "running",
              START_ONE: "running",
              SET_VALUES: {
                internal: true,
                target: "idle",
                cond: (context) => {
                  return context.pinned == null;
                },
                actions: [
                  "clearMessage",
                  (0, import_xstate.assign)({
                    current: (context, event) => {
                      return {
                        results: null,
                        storyName: context.storyName,
                        samples: event.samples,
                        copies: event.copies
                      };
                    }
                  })
                ]
              },
              PIN: {
                internal: true,
                target: "idle",
                cond: (context) => {
                  return context.current.results != null;
                },
                actions: (0, import_xstate.assign)((context) => {
                  return {
                    ...context,
                    pinned: context.current,
                    message: "Result pinned"
                  };
                })
              },
              SAVE: {
                internal: true,
                target: "idle",
                cond: (context) => {
                  return context.current.results != null;
                },
                actions: (0, import_xstate.assign)((context) => {
                  return {
                    ...context,
                    message: "Result saved"
                  };
                })
              },
              LOAD_FROM_FILE: {
                internal: true,
                target: "idle",
                actions: (0, import_xstate.assign)((context, event) => {
                  const message = event.pinned ? `Loaded pinned result: ${event.storyName}` : null;
                  return {
                    ...context,
                    message,
                    pinned: event.pinned,
                    storyName: event.storyName,
                    current: event.pinned || context.current
                  };
                })
              },
              UNPIN: {
                internal: true,
                target: "idle",
                cond: (context) => {
                  return context.pinned != null;
                },
                actions: (0, import_xstate.assign)((context) => {
                  return {
                    ...context,
                    pinned: null,
                    message: "Pinned result removed"
                  };
                })
              }
            }
          },
          running: {
            on: {
              FINISH: {
                target: "idle",
                actions: (0, import_xstate.assign)({
                  current: (context, event) => {
                    const current = {
                      ...context.current,
                      results: event.results
                    };
                    return current;
                  }
                })
              }
            }
          }
        }
      }
    }
  },
  {
    actions: {
      clearMessage: (0, import_xstate.assign)((context) => {
        return {
          ...context,
          message: null
        };
      })
    }
  }
);
var machine_default = machine;
