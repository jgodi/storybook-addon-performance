import {
  saveFile
} from "./chunk-TPOUPAAB.mjs";
import {
  clearPinned,
  getPinned,
  savePinned
} from "./chunk-MB2HSXAO.mjs";
import {
  STORY_CHANGED,
  STORY_RENDERED
} from "./chunk-GJXIKFVV.mjs";
import {
  bindAll
} from "./chunk-BUURX2RZ.mjs";
import {
  events_default
} from "./chunk-JLU3L6VB.mjs";

// src/panel/use-panel-machine.tsx
import { useMachine } from "@xstate/react";
import { useEffect } from "react";
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
  const [state, send, service] = useMachine(machine);
  useEffect(
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
  useEffect(() => {
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

export {
  usePanelMachine
};
