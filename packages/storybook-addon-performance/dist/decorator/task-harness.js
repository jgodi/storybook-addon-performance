"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/decorator/task-harness.tsx
var task_harness_exports = {};
__export(task_harness_exports, {
  default: () => TaskHarness
});
module.exports = __toCommonJS(task_harness_exports);
var import_react3 = require("react");

// src/events.ts
var events_default = {
  START_ALL: "start all",
  START_ONE: "start one",
  FINISH_ALL: "finish all",
  FINISH_ONE: "finish one",
  PUBLISH_INTERACTIONS: "publish interactions"
};

// src/task-runner/to-safe-element.tsx
var import_react = __toESM(require("react"));
function Host({ children }) {
  return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, children());
}
function toSafeElement({ getNode, copies }) {
  const nodes = Array.from({ length: copies }, (_, key) => /* @__PURE__ */ import_react.default.createElement(Host, { key }, getNode));
  return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, nodes);
}

// src/util/get-result-map.ts
function getResultMap(list) {
  return list.reduce((acc, item) => {
    acc[item.taskName] = item;
    return acc;
  }, {});
}

// src/task-runner/async.ts
function waitForFrame() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => resolve());
  });
}
async function asyncMap({
  source,
  map
}) {
  const results = [];
  for (let i = 0; i < source.length; i++) {
    await waitForFrame();
    const value = await map(source[i], i, source);
    results.push(value);
  }
  return results;
}

// src/task-runner/custom-errors.ts
var UnsupportedError = class extends Error {
};

// src/task-runner/get-error-result.ts
function getErrorResult({ task, error }) {
  if (error instanceof UnsupportedError) {
    return {
      type: "error",
      taskName: task.name,
      reason: "unsupported",
      message: error.message
    };
  }
  return {
    type: "error",
    taskName: task.name,
    reason: "unhandled",
    message: null
  };
}

// src/task-runner/print-error.ts
function printError({ task, error }) {
  if (false) {
    return;
  }
  console.group(`\u{1F680}\u274C Error in task: (${task.name})`);
  console.error(error);
  console.groupEnd();
}

// src/addon-constants.ts
var packageName = "storybook-addon-performance";

// src/task-runner/mark.ts
var startMark = `${packageName}-start`;
var endMark = `${packageName}-end`;
async function mark(taskName, fn) {
  performance.mark(startMark);
  try {
    const result = await fn();
    performance.mark(endMark);
    performance.measure(`\u{1F680} (Task: ${taskName})`, startMark, endMark);
    return result;
  } catch (e) {
    performance.mark(endMark);
    performance.measure(`\u{1F680}\u274C (Task: ${taskName})`, startMark, endMark);
    throw e;
  }
}

// src/task-runner/with-container.ts
var import_react_dom = __toESM(require("react-dom"));
async function withContainer(fn) {
  const container = document.createElement("div");
  container.setAttribute(`data-${packageName}-managed-container`, "true");
  container.style.visibility = "invisible";
  document.body.appendChild(container);
  const result = await fn(container);
  import_react_dom.default.unmountComponentAtNode(container);
  if (document.body.contains(container)) {
    document.body.removeChild(container);
  }
  return result;
}

// src/task-runner/run-static-task.ts
async function runStaticTask({ task, getElement: getElement2 }) {
  return await withContainer(async (container) => {
    return await mark(task.name, () => task.run({ getElement: getElement2, container }));
  });
}
async function getResultForStaticTask({
  task,
  getElement: getElement2
}) {
  try {
    const value = await runStaticTask({ task, getElement: getElement2 });
    const result = {
      type: "static",
      taskName: task.name,
      value
    };
    return result;
  } catch (error) {
    printError({ task, error });
    return getErrorResult({ task, error });
  }
}

// src/task-runner/run-interaction-task.ts
var import_react_dom2 = __toESM(require("react-dom"));

// ../../node_modules/tiny-invariant/dist/esm/tiny-invariant.js
var isProduction = false;
var prefix = "Invariant failed";
function invariant(condition, message) {
  if (condition) {
    return;
  }
  if (isProduction) {
    throw new Error(prefix);
  }
  var provided = typeof message === "function" ? message() : message;
  var value = provided ? "".concat(prefix, ": ").concat(provided) : prefix;
  throw new Error(value);
}

// src/task-runner/with-duration.ts
async function getDuration(fn) {
  const start = performance.now();
  await fn();
  const finish = performance.now();
  return finish - start;
}
async function withDuration(fn) {
  let timedDuration = null;
  let isControlled = false;
  const controls = {
    time: async function time(fn2) {
      invariant(!isControlled, "controls.time has already been used");
      isControlled = true;
      timedDuration = await getDuration(fn2);
    }
  };
  const wholeTaskDuration = await getDuration(() => fn(controls));
  if (isControlled) {
    invariant(
      timedDuration != null,
      `
      You have used controls.timed but have not waited for the result to finish
      Ensure that you wait for the result:

      await controls.time(async () => {});

      You might not be waiting for controls.time

      controls.time(async () => {});
    `
    );
    return timedDuration;
  }
  return wholeTaskDuration;
}

// src/task-runner/run-interaction-task.ts
async function runInteractionTask({ task, getElement: getElement2 }) {
  return withContainer(async (container) => {
    import_react_dom2.default.render(getElement2(), container);
    const duration = await mark(
      task.name,
      () => withDuration((controls) => task.run({ controls, container }))
    );
    import_react_dom2.default.unmountComponentAtNode(container);
    return duration;
  });
}

// src/task-runner/run-timed-task.ts
function getAverage(values) {
  return values.reduce((total, current) => total + current, 0) / values.length;
}
function getStandardDeviation(average, values) {
  const squaredDifferences = values.map((value) => (value - average) ** 2);
  const squareDifferenceAverage = getAverage(squaredDifferences);
  return Math.sqrt(squareDifferenceAverage);
}
function getDifferenceFrom(relativeTo, target) {
  const diff = Math.abs(target - relativeTo);
  return diff / relativeTo * 100;
}
function getUpperAndLower(average, values) {
  const ordered = [...values].sort((a, b) => a - b);
  const lowest = ordered[0];
  const highest = ordered[ordered.length - 1];
  return {
    lowerPercentage: getDifferenceFrom(average, lowest),
    upperPercentage: getDifferenceFrom(average, highest)
  };
}
async function runTimedTask({ task, getElement: getElement2 }) {
  return withContainer((container) => {
    return mark(
      task.name,
      () => withDuration((controls) => task.run({ controls, container, getElement: getElement2 }))
    );
  });
}
async function getResultForTimedTask({
  task,
  getElement: getElement2,
  samples
}) {
  try {
    const durations = await asyncMap({
      source: Array.from({ length: samples }),
      map: async function map() {
        if (task.type === "timed") {
          return runTimedTask({
            task,
            getElement: getElement2
          });
        }
        return runInteractionTask({
          task,
          getElement: getElement2
        });
      }
    });
    const average = getAverage(durations);
    const { upperPercentage, lowerPercentage } = getUpperAndLower(average, durations);
    const standardDeviation = getStandardDeviation(average, durations);
    const result = {
      type: "timed",
      taskName: task.name,
      averageMs: average,
      samples,
      variance: {
        upperPercentage,
        lowerPercentage,
        standardDeviation
      }
    };
    return result;
  } catch (error) {
    printError({ task, error });
    return getErrorResult({ task, error });
  }
}

// src/task-runner/run-group.ts
async function runGroup({
  group: group3,
  getElement: getElement2,
  samples
}) {
  const staticResults = await asyncMap({
    source: group3.tasks.filter((task) => task.type === "static"),
    map: async function map(task) {
      return getResultForStaticTask({
        task,
        getElement: getElement2
      });
    }
  });
  const timedResults = await asyncMap({
    source: group3.tasks.filter((task) => task.type === "timed"),
    map: async function map(task) {
      return getResultForTimedTask({
        task,
        getElement: getElement2,
        samples
      });
    }
  });
  const interactionResults = await asyncMap({
    source: group3.tasks.filter((task) => task.type === "interaction"),
    map: async function map(task) {
      return getResultForTimedTask({
        task,
        getElement: getElement2,
        samples
      });
    }
  });
  const results = {
    groupId: group3.groupId,
    map: getResultMap([...timedResults, ...staticResults, ...interactionResults])
  };
  return results;
}

// src/task-runner/index.ts
async function runAll({
  groups,
  getNode,
  samples,
  copies
}) {
  const value = [];
  for (const group3 of groups) {
    const results = await runGroup({
      group: group3,
      getElement: () => toSafeElement({ getNode, copies }),
      samples
    });
    value.push(results);
  }
  return value;
}
async function runOneTimed({
  task,
  getNode,
  copies,
  samples
}) {
  const result = await getResultForTimedTask({
    task,
    getElement: () => toSafeElement({ getNode, copies }),
    samples
  });
  return result;
}
async function runOneStatic({
  task,
  getNode,
  copies
}) {
  return getResultForStaticTask({
    task,
    getElement: () => toSafeElement({ getNode, copies })
  });
}

// src/task-runner/get-element.tsx
var import_react2 = __toESM(require("react"));
function getElement(getNode) {
  return () => /* @__PURE__ */ import_react2.default.createElement(import_react2.default.Fragment, null, getNode());
}

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

// src/tasks/get-tasks-map.ts
var import_utils = require("xstate/lib/utils");
function getTaskMap(groups) {
  return (0, import_utils.flatten)(groups.map((group3) => group3.tasks)).reduce((acc, task) => {
    acc[task.name] = task;
    return acc;
  }, {});
}

// src/tasks/preset/client.tsx
var import_react_dom3 = __toESM(require("react-dom"));
var import_server = __toESM(require("react-dom/server"));
var render = {
  type: "timed",
  name: "Initial render",
  description: `This task records how long ReactDOM.render() takes with your component`,
  run: async ({ getElement: getElement2, container }) => {
    import_react_dom3.default.render(getElement2(), container);
  }
};
var hydrate = {
  type: "timed",
  name: "Hydrate",
  description: `
      This task records how long a ReactDOMServer.hydrate() call
      takes. If you are server side rendering a React component then html is
      sent down to the browser. Hydration is the process of React reading through
      the HTML and building up it's internal virtual model. After hydration React
      is able to take over the HTML as if it had done the original render on the client.
  `,
  run: async ({ getElement: getElement2, controls, container }) => {
    const html = import_server.default.renderToString(getElement2());
    container.innerHTML = html;
    await controls.time(async function mount() {
      import_react_dom3.default.hydrate(getElement2(), container);
    });
  }
};
var reRender = {
  type: "timed",
  name: "Re render",
  description: `
      This task records how long it takes to re-render the component with no prop changes.
      Note: You can improve this score quickly by using React.memo near the top of your
      component tree.
  `,
  run: async ({ getElement: getElement2, controls, container }) => {
    import_react_dom3.default.render(getElement2(), container);
    await controls.time(async function mount() {
      import_react_dom3.default.render(getElement2(), container);
    });
  }
};
function getAllChildren(container) {
  return Array.from(container.querySelectorAll("*"));
}
var domElementCount = {
  type: "static",
  name: "DOM element count",
  description: `
    The more DOM element your component creates, the more work the browser needs to do
  `,
  run: async ({ getElement: getElement2, container }) => {
    import_react_dom3.default.render(getElement2(), container);
    const allChildren = getAllChildren(container);
    return String(allChildren.length);
  }
};
var domElementCountWithoutSvg = {
  type: "static",
  name: "DOM element count (no nested inline svg elements)",
  description: `
    The count of DOM elements excluding inner SVG elements
  `,
  run: async ({ getElement: getElement2, container }) => {
    import_react_dom3.default.render(getElement2(), container);
    const allChildren = getAllChildren(container).filter((el) => {
      const parent = el.closest("svg");
      if (!parent) {
        return true;
      }
      if (parent === el) {
        return true;
      }
      return false;
    });
    return String(allChildren.length);
  }
};
var completeRender = {
  type: "timed",
  name: "Complete render (mount + layout + paint)",
  description: `
    Time taken for the CPU to become idle after starting ReactDOM.render.
    This will include React's time to create the element and mount it into the DOM,
    as well as subsequent browser layout and painting
  `,
  run: async ({ getElement: getElement2, container }) => {
    const idle = window.requestIdleCallback;
    if (typeof idle !== "function") {
      throw new UnsupportedError("requestIdleCallback is not supported in this browser");
    }
    import_react_dom3.default.render(getElement2(), container);
    await new Promise((resolve) => {
      idle(() => resolve());
    });
  }
};
function traverse(rootNode, callback) {
  function walk(node) {
    callback(node);
    if (!node.child && !node.sibling) {
      return;
    }
    node.child && walk(node.child);
    node.sibling && walk(node.sibling);
  }
  walk(rootNode);
}
var reactFiberNodeCount = {
  type: "static",
  name: "React Fiber node count",
  description: `
    The number of React Elements or internal objects ("fibers") that hold information about the component tree state.
  `,
  run: async ({ getElement: getElement2, container }) => {
    var _a2, _b2;
    import_react_dom3.default.render(getElement2(), container);
    const fiberRoot = (_b2 = (_a2 = container == null ? void 0 : container._reactRootContainer) == null ? void 0 : _a2._internalRoot) == null ? void 0 : _b2.current;
    let count = 0;
    fiberRoot && traverse(fiberRoot, () => count++);
    return String(count);
  }
};
var group = {
  groupId: "Client",
  name: "Client \u{1F469}\u200D\u{1F4BB}",
  tasks: [
    render,
    reRender,
    hydrate,
    domElementCount,
    domElementCountWithoutSvg,
    completeRender,
    reactFiberNodeCount
  ]
};
var client_default = group;

// src/tasks/preset/server.tsx
var import_server2 = __toESM(require("react-dom/server"));

// ../../node_modules/fflate/esm/browser.js
var u8 = Uint8Array;
var u16 = Uint16Array;
var u32 = Uint32Array;
var fleb = new u8([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0]);
var fdeb = new u8([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0]);
var clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
var freb = function(eb, start) {
  var b = new u16(31);
  for (var i = 0; i < 31; ++i) {
    b[i] = start += 1 << eb[i - 1];
  }
  var r = new u32(b[30]);
  for (var i = 1; i < 30; ++i) {
    for (var j = b[i]; j < b[i + 1]; ++j) {
      r[j] = j - b[i] << 5 | i;
    }
  }
  return [b, r];
};
var _a = freb(fleb, 2);
var fl = _a[0];
var revfl = _a[1];
fl[28] = 258, revfl[258] = 28;
var _b = freb(fdeb, 0);
var fd = _b[0];
var revfd = _b[1];
var rev = new u16(32768);
for (i = 0; i < 32768; ++i) {
  x = (i & 43690) >>> 1 | (i & 21845) << 1;
  x = (x & 52428) >>> 2 | (x & 13107) << 2;
  x = (x & 61680) >>> 4 | (x & 3855) << 4;
  rev[i] = ((x & 65280) >>> 8 | (x & 255) << 8) >>> 1;
}
var x;
var i;
var hMap = function(cd, mb, r) {
  var s = cd.length;
  var i = 0;
  var l = new u16(mb);
  for (; i < s; ++i) {
    if (cd[i])
      ++l[cd[i] - 1];
  }
  var le = new u16(mb);
  for (i = 0; i < mb; ++i) {
    le[i] = le[i - 1] + l[i - 1] << 1;
  }
  var co;
  if (r) {
    co = new u16(1 << mb);
    var rvb = 15 - mb;
    for (i = 0; i < s; ++i) {
      if (cd[i]) {
        var sv = i << 4 | cd[i];
        var r_1 = mb - cd[i];
        var v = le[cd[i] - 1]++ << r_1;
        for (var m = v | (1 << r_1) - 1; v <= m; ++v) {
          co[rev[v] >>> rvb] = sv;
        }
      }
    }
  } else {
    co = new u16(s);
    for (i = 0; i < s; ++i) {
      if (cd[i]) {
        co[i] = rev[le[cd[i] - 1]++] >>> 15 - cd[i];
      }
    }
  }
  return co;
};
var flt = new u8(288);
for (i = 0; i < 144; ++i)
  flt[i] = 8;
var i;
for (i = 144; i < 256; ++i)
  flt[i] = 9;
var i;
for (i = 256; i < 280; ++i)
  flt[i] = 7;
var i;
for (i = 280; i < 288; ++i)
  flt[i] = 8;
var i;
var fdt = new u8(32);
for (i = 0; i < 32; ++i)
  fdt[i] = 5;
var i;
var flm = /* @__PURE__ */ hMap(flt, 9, 0);
var fdm = /* @__PURE__ */ hMap(fdt, 5, 0);
var shft = function(p) {
  return (p + 7) / 8 | 0;
};
var slc = function(v, s, e) {
  if (s == null || s < 0)
    s = 0;
  if (e == null || e > v.length)
    e = v.length;
  var n = new (v.BYTES_PER_ELEMENT == 2 ? u16 : v.BYTES_PER_ELEMENT == 4 ? u32 : u8)(e - s);
  n.set(v.subarray(s, e));
  return n;
};
var wbits = function(d, p, v) {
  v <<= p & 7;
  var o = p / 8 | 0;
  d[o] |= v;
  d[o + 1] |= v >>> 8;
};
var wbits16 = function(d, p, v) {
  v <<= p & 7;
  var o = p / 8 | 0;
  d[o] |= v;
  d[o + 1] |= v >>> 8;
  d[o + 2] |= v >>> 16;
};
var hTree = function(d, mb) {
  var t = [];
  for (var i = 0; i < d.length; ++i) {
    if (d[i])
      t.push({ s: i, f: d[i] });
  }
  var s = t.length;
  var t2 = t.slice();
  if (!s)
    return [et, 0];
  if (s == 1) {
    var v = new u8(t[0].s + 1);
    v[t[0].s] = 1;
    return [v, 1];
  }
  t.sort(function(a, b) {
    return a.f - b.f;
  });
  t.push({ s: -1, f: 25001 });
  var l = t[0], r = t[1], i0 = 0, i1 = 1, i2 = 2;
  t[0] = { s: -1, f: l.f + r.f, l, r };
  while (i1 != s - 1) {
    l = t[t[i0].f < t[i2].f ? i0++ : i2++];
    r = t[i0 != i1 && t[i0].f < t[i2].f ? i0++ : i2++];
    t[i1++] = { s: -1, f: l.f + r.f, l, r };
  }
  var maxSym = t2[0].s;
  for (var i = 1; i < s; ++i) {
    if (t2[i].s > maxSym)
      maxSym = t2[i].s;
  }
  var tr = new u16(maxSym + 1);
  var mbt = ln(t[i1 - 1], tr, 0);
  if (mbt > mb) {
    var i = 0, dt = 0;
    var lft = mbt - mb, cst = 1 << lft;
    t2.sort(function(a, b) {
      return tr[b.s] - tr[a.s] || a.f - b.f;
    });
    for (; i < s; ++i) {
      var i2_1 = t2[i].s;
      if (tr[i2_1] > mb) {
        dt += cst - (1 << mbt - tr[i2_1]);
        tr[i2_1] = mb;
      } else
        break;
    }
    dt >>>= lft;
    while (dt > 0) {
      var i2_2 = t2[i].s;
      if (tr[i2_2] < mb)
        dt -= 1 << mb - tr[i2_2]++ - 1;
      else
        ++i;
    }
    for (; i >= 0 && dt; --i) {
      var i2_3 = t2[i].s;
      if (tr[i2_3] == mb) {
        --tr[i2_3];
        ++dt;
      }
    }
    mbt = mb;
  }
  return [new u8(tr), mbt];
};
var ln = function(n, l, d) {
  return n.s == -1 ? Math.max(ln(n.l, l, d + 1), ln(n.r, l, d + 1)) : l[n.s] = d;
};
var lc = function(c) {
  var s = c.length;
  while (s && !c[--s])
    ;
  var cl = new u16(++s);
  var cli = 0, cln = c[0], cls = 1;
  var w = function(v) {
    cl[cli++] = v;
  };
  for (var i = 1; i <= s; ++i) {
    if (c[i] == cln && i != s)
      ++cls;
    else {
      if (!cln && cls > 2) {
        for (; cls > 138; cls -= 138)
          w(32754);
        if (cls > 2) {
          w(cls > 10 ? cls - 11 << 5 | 28690 : cls - 3 << 5 | 12305);
          cls = 0;
        }
      } else if (cls > 3) {
        w(cln), --cls;
        for (; cls > 6; cls -= 6)
          w(8304);
        if (cls > 2)
          w(cls - 3 << 5 | 8208), cls = 0;
      }
      while (cls--)
        w(cln);
      cls = 1;
      cln = c[i];
    }
  }
  return [cl.subarray(0, cli), s];
};
var clen = function(cf, cl) {
  var l = 0;
  for (var i = 0; i < cl.length; ++i)
    l += cf[i] * cl[i];
  return l;
};
var wfblk = function(out, pos, dat) {
  var s = dat.length;
  var o = shft(pos + 2);
  out[o] = s & 255;
  out[o + 1] = s >>> 8;
  out[o + 2] = out[o] ^ 255;
  out[o + 3] = out[o + 1] ^ 255;
  for (var i = 0; i < s; ++i)
    out[o + i + 4] = dat[i];
  return (o + 4 + s) * 8;
};
var wblk = function(dat, out, final, syms, lf, df, eb, li, bs, bl, p) {
  wbits(out, p++, final);
  ++lf[256];
  var _a2 = hTree(lf, 15), dlt = _a2[0], mlb = _a2[1];
  var _b2 = hTree(df, 15), ddt = _b2[0], mdb = _b2[1];
  var _c = lc(dlt), lclt = _c[0], nlc = _c[1];
  var _d = lc(ddt), lcdt = _d[0], ndc = _d[1];
  var lcfreq = new u16(19);
  for (var i = 0; i < lclt.length; ++i)
    lcfreq[lclt[i] & 31]++;
  for (var i = 0; i < lcdt.length; ++i)
    lcfreq[lcdt[i] & 31]++;
  var _e = hTree(lcfreq, 7), lct = _e[0], mlcb = _e[1];
  var nlcc = 19;
  for (; nlcc > 4 && !lct[clim[nlcc - 1]]; --nlcc)
    ;
  var flen = bl + 5 << 3;
  var ftlen = clen(lf, flt) + clen(df, fdt) + eb;
  var dtlen = clen(lf, dlt) + clen(df, ddt) + eb + 14 + 3 * nlcc + clen(lcfreq, lct) + (2 * lcfreq[16] + 3 * lcfreq[17] + 7 * lcfreq[18]);
  if (flen <= ftlen && flen <= dtlen)
    return wfblk(out, p, dat.subarray(bs, bs + bl));
  var lm, ll, dm, dl;
  wbits(out, p, 1 + (dtlen < ftlen)), p += 2;
  if (dtlen < ftlen) {
    lm = hMap(dlt, mlb, 0), ll = dlt, dm = hMap(ddt, mdb, 0), dl = ddt;
    var llm = hMap(lct, mlcb, 0);
    wbits(out, p, nlc - 257);
    wbits(out, p + 5, ndc - 1);
    wbits(out, p + 10, nlcc - 4);
    p += 14;
    for (var i = 0; i < nlcc; ++i)
      wbits(out, p + 3 * i, lct[clim[i]]);
    p += 3 * nlcc;
    var lcts = [lclt, lcdt];
    for (var it = 0; it < 2; ++it) {
      var clct = lcts[it];
      for (var i = 0; i < clct.length; ++i) {
        var len = clct[i] & 31;
        wbits(out, p, llm[len]), p += lct[len];
        if (len > 15)
          wbits(out, p, clct[i] >>> 5 & 127), p += clct[i] >>> 12;
      }
    }
  } else {
    lm = flm, ll = flt, dm = fdm, dl = fdt;
  }
  for (var i = 0; i < li; ++i) {
    if (syms[i] > 255) {
      var len = syms[i] >>> 18 & 31;
      wbits16(out, p, lm[len + 257]), p += ll[len + 257];
      if (len > 7)
        wbits(out, p, syms[i] >>> 23 & 31), p += fleb[len];
      var dst = syms[i] & 31;
      wbits16(out, p, dm[dst]), p += dl[dst];
      if (dst > 3)
        wbits16(out, p, syms[i] >>> 5 & 8191), p += fdeb[dst];
    } else {
      wbits16(out, p, lm[syms[i]]), p += ll[syms[i]];
    }
  }
  wbits16(out, p, lm[256]);
  return p + ll[256];
};
var deo = /* @__PURE__ */ new u32([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]);
var et = /* @__PURE__ */ new u8(0);
var dflt = function(dat, lvl, plvl, pre, post, lst) {
  var s = dat.length;
  var o = new u8(pre + s + 5 * (1 + Math.ceil(s / 7e3)) + post);
  var w = o.subarray(pre, o.length - post);
  var pos = 0;
  if (!lvl || s < 8) {
    for (var i = 0; i <= s; i += 65535) {
      var e = i + 65535;
      if (e >= s) {
        w[pos >> 3] = lst;
      }
      pos = wfblk(w, pos + 1, dat.subarray(i, e));
    }
  } else {
    var opt = deo[lvl - 1];
    var n = opt >>> 13, c = opt & 8191;
    var msk_1 = (1 << plvl) - 1;
    var prev = new u16(32768), head = new u16(msk_1 + 1);
    var bs1_1 = Math.ceil(plvl / 3), bs2_1 = 2 * bs1_1;
    var hsh = function(i2) {
      return (dat[i2] ^ dat[i2 + 1] << bs1_1 ^ dat[i2 + 2] << bs2_1) & msk_1;
    };
    var syms = new u32(25e3);
    var lf = new u16(288), df = new u16(32);
    var lc_1 = 0, eb = 0, i = 0, li = 0, wi = 0, bs = 0;
    for (; i < s; ++i) {
      var hv = hsh(i);
      var imod = i & 32767, pimod = head[hv];
      prev[imod] = pimod;
      head[hv] = imod;
      if (wi <= i) {
        var rem = s - i;
        if ((lc_1 > 7e3 || li > 24576) && rem > 423) {
          pos = wblk(dat, w, 0, syms, lf, df, eb, li, bs, i - bs, pos);
          li = lc_1 = eb = 0, bs = i;
          for (var j = 0; j < 286; ++j)
            lf[j] = 0;
          for (var j = 0; j < 30; ++j)
            df[j] = 0;
        }
        var l = 2, d = 0, ch_1 = c, dif = imod - pimod & 32767;
        if (rem > 2 && hv == hsh(i - dif)) {
          var maxn = Math.min(n, rem) - 1;
          var maxd = Math.min(32767, i);
          var ml = Math.min(258, rem);
          while (dif <= maxd && --ch_1 && imod != pimod) {
            if (dat[i + l] == dat[i + l - dif]) {
              var nl = 0;
              for (; nl < ml && dat[i + nl] == dat[i + nl - dif]; ++nl)
                ;
              if (nl > l) {
                l = nl, d = dif;
                if (nl > maxn)
                  break;
                var mmd = Math.min(dif, nl - 2);
                var md = 0;
                for (var j = 0; j < mmd; ++j) {
                  var ti = i - dif + j + 32768 & 32767;
                  var pti = prev[ti];
                  var cd = ti - pti + 32768 & 32767;
                  if (cd > md)
                    md = cd, pimod = ti;
                }
              }
            }
            imod = pimod, pimod = prev[imod];
            dif += imod - pimod + 32768 & 32767;
          }
        }
        if (d) {
          syms[li++] = 268435456 | revfl[l] << 18 | revfd[d];
          var lin = revfl[l] & 31, din = revfd[d] & 31;
          eb += fleb[lin] + fdeb[din];
          ++lf[257 + lin];
          ++df[din];
          wi = i + l;
          ++lc_1;
        } else {
          syms[li++] = dat[i];
          ++lf[dat[i]];
        }
      }
    }
    pos = wblk(dat, w, lst, syms, lf, df, eb, li, bs, i - bs, pos);
    if (!lst && pos & 7)
      pos = wfblk(w, pos + 1, et);
  }
  return slc(o, 0, pre + shft(pos) + post);
};
var crct = /* @__PURE__ */ function() {
  var t = new Int32Array(256);
  for (var i = 0; i < 256; ++i) {
    var c = i, k = 9;
    while (--k)
      c = (c & 1 && -306674912) ^ c >>> 1;
    t[i] = c;
  }
  return t;
}();
var crc = function() {
  var c = -1;
  return {
    p: function(d) {
      var cr = c;
      for (var i = 0; i < d.length; ++i)
        cr = crct[cr & 255 ^ d[i]] ^ cr >>> 8;
      c = cr;
    },
    d: function() {
      return ~c;
    }
  };
};
var dopt = function(dat, opt, pre, post, st) {
  return dflt(dat, opt.level == null ? 6 : opt.level, opt.mem == null ? Math.ceil(Math.max(8, Math.min(13, Math.log(dat.length))) * 1.5) : 12 + opt.mem, pre, post, !st);
};
var wbytes = function(d, b, v) {
  for (; v; ++b)
    d[b] = v, v >>>= 8;
};
var gzh = function(c, o) {
  var fn = o.filename;
  c[0] = 31, c[1] = 139, c[2] = 8, c[8] = o.level < 2 ? 4 : o.level == 9 ? 2 : 0, c[9] = 3;
  if (o.mtime != 0)
    wbytes(c, 4, Math.floor(new Date(o.mtime || Date.now()) / 1e3));
  if (fn) {
    c[3] = 8;
    for (var i = 0; i <= fn.length; ++i)
      c[i + 10] = fn.charCodeAt(i);
  }
};
var gzhl = function(o) {
  return 10 + (o.filename && o.filename.length + 1 || 0);
};
function gzipSync(data, opts) {
  if (!opts)
    opts = {};
  var c = crc(), l = data.length;
  c.p(data);
  var d = dopt(data, opts, gzhl(opts), 8), s = d.length;
  return gzh(d, opts), wbytes(d, s - 8, c.d()), wbytes(d, s - 4, l), d;
}
var te = typeof TextEncoder != "undefined" && /* @__PURE__ */ new TextEncoder();
var td = typeof TextDecoder != "undefined" && /* @__PURE__ */ new TextDecoder();
var tds = 0;
try {
  td.decode(et, { stream: true });
  tds = 1;
} catch (e) {
}
function strToU8(str, latin1) {
  if (latin1) {
    var ar_1 = new u8(str.length);
    for (var i = 0; i < str.length; ++i)
      ar_1[i] = str.charCodeAt(i);
    return ar_1;
  }
  if (te)
    return te.encode(str);
  var l = str.length;
  var ar = new u8(str.length + (str.length >> 1));
  var ai = 0;
  var w = function(v) {
    ar[ai++] = v;
  };
  for (var i = 0; i < l; ++i) {
    if (ai + 5 > ar.length) {
      var n = new u8(ai + 8 + (l - i << 1));
      n.set(ar);
      ar = n;
    }
    var c = str.charCodeAt(i);
    if (c < 128 || latin1)
      w(c);
    else if (c < 2048)
      w(192 | c >> 6), w(128 | c & 63);
    else if (c > 55295 && c < 57344)
      c = 65536 + (c & 1023 << 10) | str.charCodeAt(++i) & 1023, w(240 | c >> 18), w(128 | c >> 12 & 63), w(128 | c >> 6 & 63), w(128 | c & 63);
    else
      w(224 | c >> 12), w(128 | c >> 6 & 63), w(128 | c & 63);
  }
  return slc(ar, 0, ai);
}

// src/util/to-fixed.ts
function toFixed(value, precision = 2) {
  return value.toFixed(precision);
}

// src/util/convert-bytes-to.ts
function bytesToKiloBytes(bytes) {
  return toFixed(bytes / Math.pow(10, 3));
}

// src/tasks/preset/server.tsx
var renderToString = {
  type: "timed",
  name: "Render to string",
  description: `This task records how long a ReactDOM.renderToString() call takes`,
  run: async ({ getElement: getElement2 }) => {
    import_server2.default.renderToString(getElement2());
  }
};
var renderToStaticMarkup = {
  type: "timed",
  name: "Render to static markup (cannot be hydrated)",
  description: `
    This task records how long a ReactDOM.renderToStaticMarkup() call takes.
    This output cannot be hydrated on the client
  `,
  run: async ({ getElement: getElement2 }) => {
    import_server2.default.renderToStaticMarkup(getElement2());
  }
};
var getRawStringSizeInKB = {
  type: "static",
  name: "String output size",
  description: `
    The size of the string generated by ReactDOM.renderToString().
  `,
  scale: "kb",
  run: async ({ getElement: getElement2 }) => {
    const output = import_server2.default.renderToString(getElement2());
    const blob = new Blob([output]);
    return bytesToKiloBytes(blob.size);
  }
};
var getGzipStringSizeInKB = {
  type: "static",
  name: "String output size (gzip)",
  description: `
    The gzipped size of the string generated by ReactDOM.renderToString().
  `,
  scale: "kb",
  run: async ({ getElement: getElement2 }) => {
    const output = import_server2.default.renderToString(getElement2());
    const buf = strToU8(output);
    const bytes = gzipSync(buf, { level: 9 });
    return bytesToKiloBytes(bytes.length);
  }
};
var getRawStaticMarkupSizeInKB = {
  type: "static",
  name: "Static markup output size",
  description: `
    The size of the string generated by ReactDOM.renderToStaticMarkup().
  `,
  scale: "kb",
  run: async ({ getElement: getElement2 }) => {
    const output = import_server2.default.renderToStaticMarkup(getElement2());
    const blob = new Blob([output]);
    return bytesToKiloBytes(blob.size);
  }
};
var getGzipStaticMarkupSizeInKB = {
  type: "static",
  name: "Static markup output size (gzip)",
  description: `
    The gzipped size of the string generated by ReactDOM.renderToStaticMarkup().
  `,
  scale: "kb",
  run: async ({ getElement: getElement2 }) => {
    const output = import_server2.default.renderToStaticMarkup(getElement2());
    const buf = strToU8(output);
    const bytes = gzipSync(buf, { level: 9 });
    return bytesToKiloBytes(bytes.length);
  }
};
var group2 = {
  groupId: "Server",
  name: "Server \u2601\uFE0F",
  tasks: [
    renderToString,
    renderToStaticMarkup,
    getRawStringSizeInKB,
    getGzipStringSizeInKB,
    getRawStaticMarkupSizeInKB,
    getGzipStaticMarkupSizeInKB
  ]
};
var server_default = group2;

// src/tasks/get-interaction-group.ts
var interactionGroupId = "Interactions";
function getInteractionGroup(interactions) {
  const tasks = interactions.map(
    (item, index) => {
      return {
        ...item,
        type: "interaction",
        name: item.name,
        description: item.description || "(None provided)"
      };
    }
  );
  return {
    groupId: interactionGroupId,
    name: "Interactions \u{1F579}",
    tasks
  };
}

// src/util/flatten.ts
function flatten2(lists) {
  return Array.prototype.concat.apply([], lists);
}

// src/tasks/get-groups.ts
function getDuplicateTaskNames(groups) {
  const tasks = flatten2(groups.map((group3) => group3.tasks));
  const allNames = tasks.map((task) => task.name);
  const duplicates = allNames.filter((name) => {
    return allNames.filter((value) => value === name).length > 1;
  });
  return [...new Set(duplicates)];
}
function getGroups({
  allowedGroups,
  interactions
}) {
  const result = [];
  if (allowedGroups.includes("server")) {
    result.push(server_default);
  }
  if (allowedGroups.includes("client")) {
    const tasks = allowedGroups.includes("server") ? client_default.tasks : client_default.tasks.filter((task) => task.name !== "Hydrate");
    result.push({
      ...client_default,
      tasks
    });
  }
  result.push(getInteractionGroup(interactions));
  const duplicateNames = getDuplicateTaskNames(result);
  invariant(
    !duplicateNames.length,
    `Tasks found with duplicate names: [${duplicateNames.join(",")}]`
  );
  return result;
}

// src/decorator/task-harness.tsx
function TaskHarness({ getNode, channel, interactions, allowedGroups }) {
  const groups = (0, import_react3.useMemo)(
    function merge() {
      return getGroups({
        allowedGroups,
        interactions
      });
    },
    [interactions, allowedGroups]
  );
  const tasks = (0, import_react3.useMemo)(() => getTaskMap(groups), [groups]);
  (0, import_react3.useEffect)(
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
