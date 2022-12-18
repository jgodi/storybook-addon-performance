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

// src/tasks/preset/client.tsx
var client_exports = {};
__export(client_exports, {
  default: () => client_default,
  traverse: () => traverse
});
module.exports = __toCommonJS(client_exports);
var import_react_dom = __toESM(require("react-dom"));
var import_server = __toESM(require("react-dom/server"));

// src/task-runner/custom-errors.ts
var UnsupportedError = class extends Error {
};

// src/tasks/preset/client.tsx
var render = {
  type: "timed",
  name: "Initial render",
  description: `This task records how long ReactDOM.render() takes with your component`,
  run: async ({ getElement, container }) => {
    import_react_dom.default.render(getElement(), container);
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
  run: async ({ getElement, controls, container }) => {
    const html = import_server.default.renderToString(getElement());
    container.innerHTML = html;
    await controls.time(async function mount() {
      import_react_dom.default.hydrate(getElement(), container);
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
  run: async ({ getElement, controls, container }) => {
    import_react_dom.default.render(getElement(), container);
    await controls.time(async function mount() {
      import_react_dom.default.render(getElement(), container);
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
  run: async ({ getElement, container }) => {
    import_react_dom.default.render(getElement(), container);
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
  run: async ({ getElement, container }) => {
    import_react_dom.default.render(getElement(), container);
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
  run: async ({ getElement, container }) => {
    const idle = window.requestIdleCallback;
    if (typeof idle !== "function") {
      throw new UnsupportedError("requestIdleCallback is not supported in this browser");
    }
    import_react_dom.default.render(getElement(), container);
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
  run: async ({ getElement, container }) => {
    var _a, _b;
    import_react_dom.default.render(getElement(), container);
    const fiberRoot = (_b = (_a = container == null ? void 0 : container._reactRootContainer) == null ? void 0 : _a._internalRoot) == null ? void 0 : _b.current;
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
