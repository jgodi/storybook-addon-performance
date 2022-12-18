import {
  getTaskMap
} from "./chunk-7WT77Z7F.mjs";
import {
  getElement
} from "./chunk-T6CTPZ3A.mjs";
import {
  runAll,
  runOneStatic,
  runOneTimed
} from "./chunk-S7JQP3A5.mjs";
import {
  getGroups
} from "./chunk-WANCIFZ2.mjs";
import {
  bindAll
} from "./chunk-BUURX2RZ.mjs";
import {
  events_default
} from "./chunk-JLU3L6VB.mjs";

// src/decorator/task-harness.tsx
import { useMemo, useEffect } from "react";
function TaskHarness({ getNode, channel, interactions, allowedGroups }) {
  const groups = useMemo(
    function merge() {
      return getGroups({
        allowedGroups,
        interactions
      });
    },
    [interactions, allowedGroups]
  );
  const tasks = useMemo(() => getTaskMap(groups), [groups]);
  useEffect(
    function setup() {
      function safeEmit(name, args) {
        if (!safeEmit.isEnabled) {
          return;
        }
        channel.emit(name, args);
      }
      safeEmit.isEnabled = true;
      const unbindAll = bindAll(channel, [
        {
          eventName: events_default.START_ALL,
          fn: async function onStartAll({ copies, samples }) {
            const results = await runAll({
              groups,
              getNode,
              samples,
              copies
            });
            safeEmit(events_default.FINISH_ALL, { results });
          }
        },
        {
          eventName: events_default.START_ONE,
          fn: async function onStartOne({ taskName, copies, samples }) {
            const task = tasks[taskName];
            if (task == null) {
              throw new Error(`Could not find task with id: ${taskName}`);
            }
            if (task.type === "timed" || task.type === "interaction") {
              const result = await runOneTimed({
                task,
                getNode,
                samples,
                copies
              });
              safeEmit(events_default.FINISH_ONE, { taskName, result });
              return;
            }
            if (task.type === "static") {
              const result = await runOneStatic({
                task,
                getNode,
                copies
              });
              safeEmit(events_default.FINISH_ONE, { taskName, result });
              return;
            }
          }
        }
      ]);
      return function unbind() {
        unbindAll();
        safeEmit.isEnabled = false;
      };
    },
    [channel, getNode, interactions, groups, tasks]
  );
  return getElement(getNode)();
}

export {
  TaskHarness
};
