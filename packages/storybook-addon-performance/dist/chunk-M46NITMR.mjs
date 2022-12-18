import {
  __commonJS,
  __toESM
} from "./chunk-22M6QDW2.mjs";

// ../../node_modules/xstate/lib/_virtual/_tslib.js
var require_tslib = __commonJS({
  "../../node_modules/xstate/lib/_virtual/_tslib.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.__assign = function() {
      exports.__assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return exports.__assign.apply(this, arguments);
    };
    function __rest(s, e) {
      var t = {};
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
          t[p] = s[p];
      if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
            t[p[i]] = s[p[i]];
        }
      return t;
    }
    function __values(o) {
      var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
      if (m)
        return m.call(o);
      if (o && typeof o.length === "number")
        return {
          next: function() {
            if (o && i >= o.length)
              o = void 0;
            return { value: o && o[i++], done: !o };
          }
        };
      throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m)
        return o;
      var i = m.call(o), r, ar = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
          ar.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"]))
            m.call(i);
        } finally {
          if (e)
            throw e.error;
        }
      }
      return ar;
    }
    function __spreadArray(to, from, pack) {
      if (pack || arguments.length === 2)
        for (var i = 0, l = from.length, ar; i < l; i++) {
          if (ar || !(i in from)) {
            if (!ar)
              ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
          }
        }
      return to.concat(ar || Array.prototype.slice.call(from));
    }
    exports.__read = __read;
    exports.__rest = __rest;
    exports.__spreadArray = __spreadArray;
    exports.__values = __values;
  }
});

// ../../node_modules/xstate/lib/constants.js
var require_constants = __commonJS({
  "../../node_modules/xstate/lib/constants.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var STATE_DELIMITER = ".";
    var EMPTY_ACTIVITY_MAP = {};
    var DEFAULT_GUARD_TYPE = "xstate.guard";
    var TARGETLESS_KEY = "";
    exports.DEFAULT_GUARD_TYPE = DEFAULT_GUARD_TYPE;
    exports.EMPTY_ACTIVITY_MAP = EMPTY_ACTIVITY_MAP;
    exports.STATE_DELIMITER = STATE_DELIMITER;
    exports.TARGETLESS_KEY = TARGETLESS_KEY;
  }
});

// ../../node_modules/xstate/lib/environment.js
var require_environment = __commonJS({
  "../../node_modules/xstate/lib/environment.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var IS_PRODUCTION = false;
    exports.IS_PRODUCTION = IS_PRODUCTION;
  }
});

// ../../node_modules/xstate/lib/utils.js
var require_utils = __commonJS({
  "../../node_modules/xstate/lib/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var _tslib = require_tslib();
    var constants = require_constants();
    var environment = require_environment();
    var _a;
    function keys(value) {
      return Object.keys(value);
    }
    function matchesState(parentStateId, childStateId, delimiter) {
      if (delimiter === void 0) {
        delimiter = constants.STATE_DELIMITER;
      }
      var parentStateValue = toStateValue(parentStateId, delimiter);
      var childStateValue = toStateValue(childStateId, delimiter);
      if (isString(childStateValue)) {
        if (isString(parentStateValue)) {
          return childStateValue === parentStateValue;
        }
        return false;
      }
      if (isString(parentStateValue)) {
        return parentStateValue in childStateValue;
      }
      return Object.keys(parentStateValue).every(function(key) {
        if (!(key in childStateValue)) {
          return false;
        }
        return matchesState(parentStateValue[key], childStateValue[key]);
      });
    }
    function getEventType(event) {
      try {
        return isString(event) || typeof event === "number" ? "".concat(event) : event.type;
      } catch (e) {
        throw new Error("Events must be strings or objects with a string event.type property.");
      }
    }
    function getActionType(action) {
      try {
        return isString(action) || typeof action === "number" ? "".concat(action) : isFunction(action) ? action.name : action.type;
      } catch (e) {
        throw new Error("Actions must be strings or objects with a string action.type property.");
      }
    }
    function toStatePath(stateId, delimiter) {
      try {
        if (isArray(stateId)) {
          return stateId;
        }
        return stateId.toString().split(delimiter);
      } catch (e) {
        throw new Error("'".concat(stateId, "' is not a valid state path."));
      }
    }
    function isStateLike(state) {
      return typeof state === "object" && "value" in state && "context" in state && "event" in state && "_event" in state;
    }
    function toStateValue(stateValue, delimiter) {
      if (isStateLike(stateValue)) {
        return stateValue.value;
      }
      if (isArray(stateValue)) {
        return pathToStateValue(stateValue);
      }
      if (typeof stateValue !== "string") {
        return stateValue;
      }
      var statePath = toStatePath(stateValue, delimiter);
      return pathToStateValue(statePath);
    }
    function pathToStateValue(statePath) {
      if (statePath.length === 1) {
        return statePath[0];
      }
      var value = {};
      var marker = value;
      for (var i = 0; i < statePath.length - 1; i++) {
        if (i === statePath.length - 2) {
          marker[statePath[i]] = statePath[i + 1];
        } else {
          marker[statePath[i]] = {};
          marker = marker[statePath[i]];
        }
      }
      return value;
    }
    function mapValues(collection, iteratee) {
      var result = {};
      var collectionKeys = Object.keys(collection);
      for (var i = 0; i < collectionKeys.length; i++) {
        var key = collectionKeys[i];
        result[key] = iteratee(collection[key], key, collection, i);
      }
      return result;
    }
    function mapFilterValues(collection, iteratee, predicate) {
      var e_1, _a2;
      var result = {};
      try {
        for (var _b = _tslib.__values(Object.keys(collection)), _c = _b.next(); !_c.done; _c = _b.next()) {
          var key = _c.value;
          var item = collection[key];
          if (!predicate(item)) {
            continue;
          }
          result[key] = iteratee(item, key, collection);
        }
      } catch (e_1_1) {
        e_1 = {
          error: e_1_1
        };
      } finally {
        try {
          if (_c && !_c.done && (_a2 = _b.return))
            _a2.call(_b);
        } finally {
          if (e_1)
            throw e_1.error;
        }
      }
      return result;
    }
    var path = function(props) {
      return function(object) {
        var e_2, _a2;
        var result = object;
        try {
          for (var props_1 = _tslib.__values(props), props_1_1 = props_1.next(); !props_1_1.done; props_1_1 = props_1.next()) {
            var prop = props_1_1.value;
            result = result[prop];
          }
        } catch (e_2_1) {
          e_2 = {
            error: e_2_1
          };
        } finally {
          try {
            if (props_1_1 && !props_1_1.done && (_a2 = props_1.return))
              _a2.call(props_1);
          } finally {
            if (e_2)
              throw e_2.error;
          }
        }
        return result;
      };
    };
    function nestedPath(props, accessorProp) {
      return function(object) {
        var e_3, _a2;
        var result = object;
        try {
          for (var props_2 = _tslib.__values(props), props_2_1 = props_2.next(); !props_2_1.done; props_2_1 = props_2.next()) {
            var prop = props_2_1.value;
            result = result[accessorProp][prop];
          }
        } catch (e_3_1) {
          e_3 = {
            error: e_3_1
          };
        } finally {
          try {
            if (props_2_1 && !props_2_1.done && (_a2 = props_2.return))
              _a2.call(props_2);
          } finally {
            if (e_3)
              throw e_3.error;
          }
        }
        return result;
      };
    }
    function toStatePaths(stateValue) {
      if (!stateValue) {
        return [[]];
      }
      if (isString(stateValue)) {
        return [[stateValue]];
      }
      var result = flatten2(Object.keys(stateValue).map(function(key) {
        var subStateValue = stateValue[key];
        if (typeof subStateValue !== "string" && (!subStateValue || !Object.keys(subStateValue).length)) {
          return [[key]];
        }
        return toStatePaths(stateValue[key]).map(function(subPath) {
          return [key].concat(subPath);
        });
      }));
      return result;
    }
    function pathsToStateValue(paths) {
      var e_4, _a2;
      var result = {};
      if (paths && paths.length === 1 && paths[0].length === 1) {
        return paths[0][0];
      }
      try {
        for (var paths_1 = _tslib.__values(paths), paths_1_1 = paths_1.next(); !paths_1_1.done; paths_1_1 = paths_1.next()) {
          var currentPath = paths_1_1.value;
          var marker = result;
          for (var i = 0; i < currentPath.length; i++) {
            var subPath = currentPath[i];
            if (i === currentPath.length - 2) {
              marker[subPath] = currentPath[i + 1];
              break;
            }
            marker[subPath] = marker[subPath] || {};
            marker = marker[subPath];
          }
        }
      } catch (e_4_1) {
        e_4 = {
          error: e_4_1
        };
      } finally {
        try {
          if (paths_1_1 && !paths_1_1.done && (_a2 = paths_1.return))
            _a2.call(paths_1);
        } finally {
          if (e_4)
            throw e_4.error;
        }
      }
      return result;
    }
    function flatten2(array) {
      var _a2;
      return (_a2 = []).concat.apply(_a2, _tslib.__spreadArray([], _tslib.__read(array), false));
    }
    function toArrayStrict(value) {
      if (isArray(value)) {
        return value;
      }
      return [value];
    }
    function toArray(value) {
      if (value === void 0) {
        return [];
      }
      return toArrayStrict(value);
    }
    function mapContext(mapper, context, _event) {
      var e_5, _a2;
      if (isFunction(mapper)) {
        return mapper(context, _event.data);
      }
      var result = {};
      try {
        for (var _b = _tslib.__values(Object.keys(mapper)), _c = _b.next(); !_c.done; _c = _b.next()) {
          var key = _c.value;
          var subMapper = mapper[key];
          if (isFunction(subMapper)) {
            result[key] = subMapper(context, _event.data);
          } else {
            result[key] = subMapper;
          }
        }
      } catch (e_5_1) {
        e_5 = {
          error: e_5_1
        };
      } finally {
        try {
          if (_c && !_c.done && (_a2 = _b.return))
            _a2.call(_b);
        } finally {
          if (e_5)
            throw e_5.error;
        }
      }
      return result;
    }
    function isBuiltInEvent(eventType) {
      return /^(done|error)\./.test(eventType);
    }
    function isPromiseLike(value) {
      if (value instanceof Promise) {
        return true;
      }
      if (value !== null && (isFunction(value) || typeof value === "object") && isFunction(value.then)) {
        return true;
      }
      return false;
    }
    function isBehavior(value) {
      return value !== null && typeof value === "object" && "transition" in value && typeof value.transition === "function";
    }
    function partition(items, predicate) {
      var e_6, _a2;
      var _b = _tslib.__read([[], []], 2), truthy = _b[0], falsy = _b[1];
      try {
        for (var items_1 = _tslib.__values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
          var item = items_1_1.value;
          if (predicate(item)) {
            truthy.push(item);
          } else {
            falsy.push(item);
          }
        }
      } catch (e_6_1) {
        e_6 = {
          error: e_6_1
        };
      } finally {
        try {
          if (items_1_1 && !items_1_1.done && (_a2 = items_1.return))
            _a2.call(items_1);
        } finally {
          if (e_6)
            throw e_6.error;
        }
      }
      return [truthy, falsy];
    }
    function updateHistoryStates(hist, stateValue) {
      return mapValues(hist.states, function(subHist, key) {
        if (!subHist) {
          return void 0;
        }
        var subStateValue = (isString(stateValue) ? void 0 : stateValue[key]) || (subHist ? subHist.current : void 0);
        if (!subStateValue) {
          return void 0;
        }
        return {
          current: subStateValue,
          states: updateHistoryStates(subHist, subStateValue)
        };
      });
    }
    function updateHistoryValue(hist, stateValue) {
      return {
        current: stateValue,
        states: updateHistoryStates(hist, stateValue)
      };
    }
    function updateContext(context, _event, assignActions, state) {
      if (!environment.IS_PRODUCTION) {
        exports.warn(!!context, "Attempting to update undefined context");
      }
      var updatedContext = context ? assignActions.reduce(function(acc, assignAction) {
        var e_7, _a2;
        var assignment = assignAction.assignment;
        var meta = {
          state,
          action: assignAction,
          _event
        };
        var partialUpdate = {};
        if (isFunction(assignment)) {
          partialUpdate = assignment(acc, _event.data, meta);
        } else {
          try {
            for (var _b = _tslib.__values(Object.keys(assignment)), _c = _b.next(); !_c.done; _c = _b.next()) {
              var key = _c.value;
              var propAssignment = assignment[key];
              partialUpdate[key] = isFunction(propAssignment) ? propAssignment(acc, _event.data, meta) : propAssignment;
            }
          } catch (e_7_1) {
            e_7 = {
              error: e_7_1
            };
          } finally {
            try {
              if (_c && !_c.done && (_a2 = _b.return))
                _a2.call(_b);
            } finally {
              if (e_7)
                throw e_7.error;
            }
          }
        }
        return Object.assign({}, acc, partialUpdate);
      }, context) : context;
      return updatedContext;
    }
    exports.warn = function() {
    };
    if (!environment.IS_PRODUCTION) {
      exports.warn = function(condition, message) {
        var error = condition instanceof Error ? condition : void 0;
        if (!error && condition) {
          return;
        }
        if (console !== void 0) {
          var args = ["Warning: ".concat(message)];
          if (error) {
            args.push(error);
          }
          console.warn.apply(console, args);
        }
      };
    }
    function isArray(value) {
      return Array.isArray(value);
    }
    function isFunction(value) {
      return typeof value === "function";
    }
    function isString(value) {
      return typeof value === "string";
    }
    function toGuard(condition, guardMap) {
      if (!condition) {
        return void 0;
      }
      if (isString(condition)) {
        return {
          type: constants.DEFAULT_GUARD_TYPE,
          name: condition,
          predicate: guardMap ? guardMap[condition] : void 0
        };
      }
      if (isFunction(condition)) {
        return {
          type: constants.DEFAULT_GUARD_TYPE,
          name: condition.name,
          predicate: condition
        };
      }
      return condition;
    }
    function isObservable(value) {
      try {
        return "subscribe" in value && isFunction(value.subscribe);
      } catch (e) {
        return false;
      }
    }
    var symbolObservable = /* @__PURE__ */ function() {
      return typeof Symbol === "function" && Symbol.observable || "@@observable";
    }();
    var interopSymbols = (_a = {}, _a[symbolObservable] = function() {
      return this;
    }, _a[Symbol.observable] = function() {
      return this;
    }, _a);
    function isMachine(value) {
      return !!value && "__xstatenode" in value;
    }
    function isActor(value) {
      return !!value && typeof value.send === "function";
    }
    var uniqueId = /* @__PURE__ */ function() {
      var currentId = 0;
      return function() {
        currentId++;
        return currentId.toString(16);
      };
    }();
    function toEventObject(event, payload) {
      if (isString(event) || typeof event === "number") {
        return _tslib.__assign({
          type: event
        }, payload);
      }
      return event;
    }
    function toSCXMLEvent(event, scxmlEvent) {
      if (!isString(event) && "$$type" in event && event.$$type === "scxml") {
        return event;
      }
      var eventObject = toEventObject(event);
      return _tslib.__assign({
        name: eventObject.type,
        data: eventObject,
        $$type: "scxml",
        type: "external"
      }, scxmlEvent);
    }
    function toTransitionConfigArray(event, configLike) {
      var transitions = toArrayStrict(configLike).map(function(transitionLike) {
        if (typeof transitionLike === "undefined" || typeof transitionLike === "string" || isMachine(transitionLike)) {
          return {
            target: transitionLike,
            event
          };
        }
        return _tslib.__assign(_tslib.__assign({}, transitionLike), {
          event
        });
      });
      return transitions;
    }
    function normalizeTarget(target) {
      if (target === void 0 || target === constants.TARGETLESS_KEY) {
        return void 0;
      }
      return toArray(target);
    }
    function reportUnhandledExceptionOnInvocation(originalError, currentError, id) {
      if (!environment.IS_PRODUCTION) {
        var originalStackTrace = originalError.stack ? " Stacktrace was '".concat(originalError.stack, "'") : "";
        if (originalError === currentError) {
          console.error("Missing onError handler for invocation '".concat(id, "', error was '").concat(originalError, "'.").concat(originalStackTrace));
        } else {
          var stackTrace = currentError.stack ? " Stacktrace was '".concat(currentError.stack, "'") : "";
          console.error("Missing onError handler and/or unhandled exception/promise rejection for invocation '".concat(id, "'. ") + "Original error: '".concat(originalError, "'. ").concat(originalStackTrace, " Current error is '").concat(currentError, "'.").concat(stackTrace));
        }
      }
    }
    function evaluateGuard(machine, guard, context, _event, state) {
      var guards = machine.options.guards;
      var guardMeta = {
        state,
        cond: guard,
        _event
      };
      if (guard.type === constants.DEFAULT_GUARD_TYPE) {
        return ((guards === null || guards === void 0 ? void 0 : guards[guard.name]) || guard.predicate)(context, _event.data, guardMeta);
      }
      var condFn = guards === null || guards === void 0 ? void 0 : guards[guard.type];
      if (!condFn) {
        throw new Error("Guard '".concat(guard.type, "' is not implemented on machine '").concat(machine.id, "'."));
      }
      return condFn(context, _event.data, guardMeta);
    }
    function toInvokeSource(src) {
      if (typeof src === "string") {
        return {
          type: src
        };
      }
      return src;
    }
    function toObserver(nextHandler, errorHandler, completionHandler) {
      var noop = function() {
      };
      var isObserver = typeof nextHandler === "object";
      var self = isObserver ? nextHandler : null;
      return {
        next: ((isObserver ? nextHandler.next : nextHandler) || noop).bind(self),
        error: ((isObserver ? nextHandler.error : errorHandler) || noop).bind(self),
        complete: ((isObserver ? nextHandler.complete : completionHandler) || noop).bind(self)
      };
    }
    function createInvokeId(stateNodeId, index) {
      return "".concat(stateNodeId, ":invocation[").concat(index, "]");
    }
    exports.createInvokeId = createInvokeId;
    exports.evaluateGuard = evaluateGuard;
    exports.flatten = flatten2;
    exports.getActionType = getActionType;
    exports.getEventType = getEventType;
    exports.interopSymbols = interopSymbols;
    exports.isActor = isActor;
    exports.isArray = isArray;
    exports.isBehavior = isBehavior;
    exports.isBuiltInEvent = isBuiltInEvent;
    exports.isFunction = isFunction;
    exports.isMachine = isMachine;
    exports.isObservable = isObservable;
    exports.isPromiseLike = isPromiseLike;
    exports.isStateLike = isStateLike;
    exports.isString = isString;
    exports.keys = keys;
    exports.mapContext = mapContext;
    exports.mapFilterValues = mapFilterValues;
    exports.mapValues = mapValues;
    exports.matchesState = matchesState;
    exports.nestedPath = nestedPath;
    exports.normalizeTarget = normalizeTarget;
    exports.partition = partition;
    exports.path = path;
    exports.pathToStateValue = pathToStateValue;
    exports.pathsToStateValue = pathsToStateValue;
    exports.reportUnhandledExceptionOnInvocation = reportUnhandledExceptionOnInvocation;
    exports.symbolObservable = symbolObservable;
    exports.toArray = toArray;
    exports.toArrayStrict = toArrayStrict;
    exports.toEventObject = toEventObject;
    exports.toGuard = toGuard;
    exports.toInvokeSource = toInvokeSource;
    exports.toObserver = toObserver;
    exports.toSCXMLEvent = toSCXMLEvent;
    exports.toStatePath = toStatePath;
    exports.toStatePaths = toStatePaths;
    exports.toStateValue = toStateValue;
    exports.toTransitionConfigArray = toTransitionConfigArray;
    exports.uniqueId = uniqueId;
    exports.updateContext = updateContext;
    exports.updateHistoryStates = updateHistoryStates;
    exports.updateHistoryValue = updateHistoryValue;
  }
});

// src/tasks/get-tasks-map.ts
var import_utils = __toESM(require_utils());
function getTaskMap(groups) {
  return (0, import_utils.flatten)(groups.map((group) => group.tasks)).reduce((acc, task) => {
    acc[task.name] = task;
    return acc;
  }, {});
}

export {
  getTaskMap
};
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
