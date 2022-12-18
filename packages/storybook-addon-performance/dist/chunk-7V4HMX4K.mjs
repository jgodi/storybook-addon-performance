import {
  TaskHarness
} from "./chunk-HAQ55VP5.mjs";
import {
  allow_all_groups_default
} from "./chunk-GVYWDKN7.mjs";
import {
  require_window
} from "./chunk-J4LQTMV4.mjs";
import {
  decoratorKey,
  paramKey
} from "./chunk-4NFBTX2N.mjs";
import {
  __toESM
} from "./chunk-22M6QDW2.mjs";

// src/decorator/decorator.tsx
import React from "react";

// ../../node_modules/@storybook/preview-api/dist/chunk-GRRYLBAT.mjs
var makeDecorator = ({ name, parameterName, wrapper, skipIfNoParametersOrOptions = false }) => {
  let decorator = (options) => (storyFn, context) => {
    let parameters = context.parameters && context.parameters[parameterName];
    return parameters && parameters.disable || skipIfNoParametersOrOptions && !options && !parameters ? storyFn(context) : wrapper(storyFn, context, { options, parameters });
  };
  return (...args) => typeof args[0] == "function" ? decorator()(...args) : (...innerArgs) => {
    if (innerArgs.length > 1)
      return args.length > 1 ? decorator(args)(...innerArgs) : decorator(...args)(...innerArgs);
    throw new Error(`Passing stories directly into ${name}() is not allowed,
        instead use addDecorator(${name}) and pass options with the '${parameterName}' parameter`);
  };
};

// ../../node_modules/@storybook/channels/dist/index.mjs
var generateRandomId = () => Math.random().toString(16).slice(2);
var Channel = class {
  constructor({ transport, async = false } = {}) {
    this.sender = generateRandomId();
    this.events = {};
    this.data = {};
    this.transport = void 0;
    this.isAsync = async, transport && (this.transport = transport, this.transport.setHandler((event) => this.handleEvent(event)));
  }
  get hasTransport() {
    return !!this.transport;
  }
  addListener(eventName, listener) {
    this.events[eventName] = this.events[eventName] || [], this.events[eventName].push(listener);
  }
  emit(eventName, ...args) {
    let event = { type: eventName, args, from: this.sender }, options = {};
    args.length >= 1 && args[0] && args[0].options && (options = args[0].options);
    let handler = () => {
      this.transport && this.transport.send(event, options), this.handleEvent(event);
    };
    this.isAsync ? setImmediate(handler) : handler();
  }
  last(eventName) {
    return this.data[eventName];
  }
  eventNames() {
    return Object.keys(this.events);
  }
  listenerCount(eventName) {
    let listeners = this.listeners(eventName);
    return listeners ? listeners.length : 0;
  }
  listeners(eventName) {
    return this.events[eventName] || void 0;
  }
  once(eventName, listener) {
    let onceListener = this.onceListener(eventName, listener);
    this.addListener(eventName, onceListener);
  }
  removeAllListeners(eventName) {
    eventName ? this.events[eventName] && delete this.events[eventName] : this.events = {};
  }
  removeListener(eventName, listener) {
    let listeners = this.listeners(eventName);
    listeners && (this.events[eventName] = listeners.filter((l) => l !== listener));
  }
  on(eventName, listener) {
    this.addListener(eventName, listener);
  }
  off(eventName, listener) {
    this.removeListener(eventName, listener);
  }
  handleEvent(event) {
    let listeners = this.listeners(event.type);
    listeners && listeners.length && listeners.forEach((fn) => {
      fn.apply(event, event.args);
    }), this.data[event.type] = event.args;
  }
  onceListener(eventName, listener) {
    let onceListener = (...args) => (this.removeListener(eventName, onceListener), listener(...args));
    return onceListener;
  }
};

// ../../node_modules/@storybook/preview-api/dist/chunk-QSH26RWA.mjs
var import_global = __toESM(require_window(), 1);
var import_global2 = __toESM(require_window(), 1);
function mockChannel() {
  let transport = { setHandler: () => {
  }, send: () => {
  } };
  return new Channel({ transport });
}
var AddonStore = class {
  constructor() {
    this.getChannel = () => {
      if (!this.channel) {
        let channel = mockChannel();
        return this.setChannel(channel), channel;
      }
      return this.channel;
    };
    this.getServerChannel = () => {
      if (!this.serverChannel)
        throw new Error("Accessing non-existent serverChannel");
      return this.serverChannel;
    };
    this.ready = () => this.promise;
    this.hasChannel = () => !!this.channel;
    this.hasServerChannel = () => !!this.serverChannel;
    this.setChannel = (channel) => {
      this.channel = channel, this.resolve();
    };
    this.setServerChannel = (channel) => {
      this.serverChannel = channel;
    };
    this.promise = new Promise((res) => {
      this.resolve = () => res(this.getChannel());
    });
  }
};
var KEY = "__STORYBOOK_ADDONS_PREVIEW";
function getAddonsStore() {
  return import_global.default[KEY] || (import_global.default[KEY] = new AddonStore()), import_global.default[KEY];
}
var addons = getAddonsStore();

// src/decorator/decorator.tsx
var decorator_default = makeDecorator({
  name: decoratorKey,
  parameterName: paramKey,
  skipIfNoParametersOrOptions: false,
  wrapper: (getStory, context, { parameters }) => {
    const interactions = parameters && parameters.interactions || [];
    const allowedGroups = parameters && parameters.allowedGroups || allow_all_groups_default;
    return /* @__PURE__ */ React.createElement(
      TaskHarness,
      {
        getNode: () => getStory(context),
        channel: addons.getChannel(),
        interactions,
        allowedGroups
      }
    );
  }
});

export {
  decorator_default
};
