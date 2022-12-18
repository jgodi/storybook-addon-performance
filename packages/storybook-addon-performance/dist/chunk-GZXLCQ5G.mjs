// ../../node_modules/xstate/es/_virtual/_tslib.js
var __assign = function() {
  __assign = Object.assign || function __assign2(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
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
  } catch (error3) {
    e = { error: error3 };
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

// ../../node_modules/xstate/es/types.js
var ActionTypes;
(function(ActionTypes2) {
  ActionTypes2["Start"] = "xstate.start";
  ActionTypes2["Stop"] = "xstate.stop";
  ActionTypes2["Raise"] = "xstate.raise";
  ActionTypes2["Send"] = "xstate.send";
  ActionTypes2["Cancel"] = "xstate.cancel";
  ActionTypes2["NullEvent"] = "";
  ActionTypes2["Assign"] = "xstate.assign";
  ActionTypes2["After"] = "xstate.after";
  ActionTypes2["DoneState"] = "done.state";
  ActionTypes2["DoneInvoke"] = "done.invoke";
  ActionTypes2["Log"] = "xstate.log";
  ActionTypes2["Init"] = "xstate.init";
  ActionTypes2["Invoke"] = "xstate.invoke";
  ActionTypes2["ErrorExecution"] = "error.execution";
  ActionTypes2["ErrorCommunication"] = "error.communication";
  ActionTypes2["ErrorPlatform"] = "error.platform";
  ActionTypes2["ErrorCustom"] = "xstate.error";
  ActionTypes2["Update"] = "xstate.update";
  ActionTypes2["Pure"] = "xstate.pure";
  ActionTypes2["Choose"] = "xstate.choose";
})(ActionTypes || (ActionTypes = {}));
var SpecialTargets;
(function(SpecialTargets2) {
  SpecialTargets2["Parent"] = "#_parent";
  SpecialTargets2["Internal"] = "#_internal";
})(SpecialTargets || (SpecialTargets = {}));

// ../../node_modules/xstate/es/actionTypes.js
var start = ActionTypes.Start;
var stop = ActionTypes.Stop;
var raise = ActionTypes.Raise;
var send = ActionTypes.Send;
var cancel = ActionTypes.Cancel;
var nullEvent = ActionTypes.NullEvent;
var assign = ActionTypes.Assign;
var after = ActionTypes.After;
var doneState = ActionTypes.DoneState;
var log = ActionTypes.Log;
var init = ActionTypes.Init;
var invoke = ActionTypes.Invoke;
var errorExecution = ActionTypes.ErrorExecution;
var errorPlatform = ActionTypes.ErrorPlatform;
var error = ActionTypes.ErrorCustom;
var update = ActionTypes.Update;
var choose = ActionTypes.Choose;
var pure = ActionTypes.Pure;

// ../../node_modules/xstate/es/constants.js
var STATE_DELIMITER = ".";
var EMPTY_ACTIVITY_MAP = {};
var DEFAULT_GUARD_TYPE = "xstate.guard";
var TARGETLESS_KEY = "";

// ../../node_modules/xstate/es/environment.js
var IS_PRODUCTION = false;

// ../../node_modules/xstate/es/utils.js
var _a;
function matchesState(parentStateId, childStateId, delimiter) {
  if (delimiter === void 0) {
    delimiter = STATE_DELIMITER;
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
    for (var _b = __values(Object.keys(collection)), _c = _b.next(); !_c.done; _c = _b.next()) {
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
      for (var props_1 = __values(props), props_1_1 = props_1.next(); !props_1_1.done; props_1_1 = props_1.next()) {
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
      for (var props_2 = __values(props), props_2_1 = props_2.next(); !props_2_1.done; props_2_1 = props_2.next()) {
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
  var result = flatten(Object.keys(stateValue).map(function(key) {
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
function flatten(array) {
  var _a2;
  return (_a2 = []).concat.apply(_a2, __spreadArray([], __read(array), false));
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
    for (var _b = __values(Object.keys(mapper)), _c = _b.next(); !_c.done; _c = _b.next()) {
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
function partition(items, predicate) {
  var e_6, _a2;
  var _b = __read([[], []], 2), truthy = _b[0], falsy = _b[1];
  try {
    for (var items_1 = __values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
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
  if (!IS_PRODUCTION) {
    warn(!!context, "Attempting to update undefined context");
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
        for (var _b = __values(Object.keys(assignment)), _c = _b.next(); !_c.done; _c = _b.next()) {
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
var warn = function() {
};
if (!IS_PRODUCTION) {
  warn = function(condition, message) {
    var error3 = condition instanceof Error ? condition : void 0;
    if (!error3 && condition) {
      return;
    }
    if (console !== void 0) {
      var args = ["Warning: ".concat(message)];
      if (error3) {
        args.push(error3);
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
      type: DEFAULT_GUARD_TYPE,
      name: condition,
      predicate: guardMap ? guardMap[condition] : void 0
    };
  }
  if (isFunction(condition)) {
    return {
      type: DEFAULT_GUARD_TYPE,
      name: condition.name,
      predicate: condition
    };
  }
  return condition;
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
function toEventObject(event, payload) {
  if (isString(event) || typeof event === "number") {
    return __assign({
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
  return __assign({
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
    return __assign(__assign({}, transitionLike), {
      event
    });
  });
  return transitions;
}
function normalizeTarget(target) {
  if (target === void 0 || target === TARGETLESS_KEY) {
    return void 0;
  }
  return toArray(target);
}
function evaluateGuard(machine2, guard, context, _event, state) {
  var guards = machine2.options.guards;
  var guardMeta = {
    state,
    cond: guard,
    _event
  };
  if (guard.type === DEFAULT_GUARD_TYPE) {
    return ((guards === null || guards === void 0 ? void 0 : guards[guard.name]) || guard.predicate)(context, _event.data, guardMeta);
  }
  var condFn = guards === null || guards === void 0 ? void 0 : guards[guard.type];
  if (!condFn) {
    throw new Error("Guard '".concat(guard.type, "' is not implemented on machine '").concat(machine2.id, "'."));
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
function createInvokeId(stateNodeId, index) {
  return "".concat(stateNodeId, ":invocation[").concat(index, "]");
}

// ../../node_modules/xstate/es/actions.js
var initEvent = /* @__PURE__ */ toSCXMLEvent({
  type: init
});
function getActionFunction(actionType, actionFunctionMap) {
  return actionFunctionMap ? actionFunctionMap[actionType] || void 0 : void 0;
}
function toActionObject(action, actionFunctionMap) {
  var actionObject;
  if (isString(action) || typeof action === "number") {
    var exec = getActionFunction(action, actionFunctionMap);
    if (isFunction(exec)) {
      actionObject = {
        type: action,
        exec
      };
    } else if (exec) {
      actionObject = exec;
    } else {
      actionObject = {
        type: action,
        exec: void 0
      };
    }
  } else if (isFunction(action)) {
    actionObject = {
      type: action.name || action.toString(),
      exec: action
    };
  } else {
    var exec = getActionFunction(action.type, actionFunctionMap);
    if (isFunction(exec)) {
      actionObject = __assign(__assign({}, action), {
        exec
      });
    } else if (exec) {
      var actionType = exec.type || action.type;
      actionObject = __assign(__assign(__assign({}, exec), action), {
        type: actionType
      });
    } else {
      actionObject = action;
    }
  }
  return actionObject;
}
var toActionObjects = function(action, actionFunctionMap) {
  if (!action) {
    return [];
  }
  var actions = isArray(action) ? action : [action];
  return actions.map(function(subAction) {
    return toActionObject(subAction, actionFunctionMap);
  });
};
function toActivityDefinition(action) {
  var actionObject = toActionObject(action);
  return __assign(__assign({
    id: isString(action) ? action : actionObject.id
  }, actionObject), {
    type: actionObject.type
  });
}
function raise2(event) {
  if (!isString(event)) {
    return send2(event, {
      to: SpecialTargets.Internal
    });
  }
  return {
    type: raise,
    event
  };
}
function resolveRaise(action) {
  return {
    type: raise,
    _event: toSCXMLEvent(action.event)
  };
}
function send2(event, options) {
  return {
    to: options ? options.to : void 0,
    type: send,
    event: isFunction(event) ? event : toEventObject(event),
    delay: options ? options.delay : void 0,
    id: options && options.id !== void 0 ? options.id : isFunction(event) ? event.name : getEventType(event)
  };
}
function resolveSend(action, ctx, _event, delaysMap) {
  var meta = {
    _event
  };
  var resolvedEvent = toSCXMLEvent(isFunction(action.event) ? action.event(ctx, _event.data, meta) : action.event);
  var resolvedDelay;
  if (isString(action.delay)) {
    var configDelay = delaysMap && delaysMap[action.delay];
    resolvedDelay = isFunction(configDelay) ? configDelay(ctx, _event.data, meta) : configDelay;
  } else {
    resolvedDelay = isFunction(action.delay) ? action.delay(ctx, _event.data, meta) : action.delay;
  }
  var resolvedTarget = isFunction(action.to) ? action.to(ctx, _event.data, meta) : action.to;
  return __assign(__assign({}, action), {
    to: resolvedTarget,
    _event: resolvedEvent,
    event: resolvedEvent.data,
    delay: resolvedDelay
  });
}
var resolveLog = function(action, ctx, _event) {
  return __assign(__assign({}, action), {
    value: isString(action.expr) ? action.expr : action.expr(ctx, _event.data, {
      _event
    })
  });
};
var cancel2 = function(sendId) {
  return {
    type: cancel,
    sendId
  };
};
function start2(activity) {
  var activityDef = toActivityDefinition(activity);
  return {
    type: ActionTypes.Start,
    activity: activityDef,
    exec: void 0
  };
}
function stop2(actorRef) {
  var activity = isFunction(actorRef) ? actorRef : toActivityDefinition(actorRef);
  return {
    type: ActionTypes.Stop,
    activity,
    exec: void 0
  };
}
function resolveStop(action, context, _event) {
  var actorRefOrString = isFunction(action.activity) ? action.activity(context, _event.data) : action.activity;
  var resolvedActorRef = typeof actorRefOrString === "string" ? {
    id: actorRefOrString
  } : actorRefOrString;
  var actionObject = {
    type: ActionTypes.Stop,
    activity: resolvedActorRef
  };
  return actionObject;
}
var assign2 = function(assignment) {
  return {
    type: assign,
    assignment
  };
};
function after2(delayRef, id) {
  var idSuffix = id ? "#".concat(id) : "";
  return "".concat(ActionTypes.After, "(").concat(delayRef, ")").concat(idSuffix);
}
function done(id, data) {
  var type = "".concat(ActionTypes.DoneState, ".").concat(id);
  var eventObject = {
    type,
    data
  };
  eventObject.toString = function() {
    return type;
  };
  return eventObject;
}
function doneInvoke(id, data) {
  var type = "".concat(ActionTypes.DoneInvoke, ".").concat(id);
  var eventObject = {
    type,
    data
  };
  eventObject.toString = function() {
    return type;
  };
  return eventObject;
}
function error2(id, data) {
  var type = "".concat(ActionTypes.ErrorPlatform, ".").concat(id);
  var eventObject = {
    type,
    data
  };
  eventObject.toString = function() {
    return type;
  };
  return eventObject;
}
var pluckAssigns = function(actionBlocks) {
  var e_1, _a2;
  var assignActions = [];
  try {
    for (var actionBlocks_1 = __values(actionBlocks), actionBlocks_1_1 = actionBlocks_1.next(); !actionBlocks_1_1.done; actionBlocks_1_1 = actionBlocks_1.next()) {
      var block = actionBlocks_1_1.value;
      var i = 0;
      while (i < block.length) {
        if (block[i].type === assign) {
          assignActions.push(block[i]);
          block.splice(i, 1);
          continue;
        }
        i++;
      }
    }
  } catch (e_1_1) {
    e_1 = {
      error: e_1_1
    };
  } finally {
    try {
      if (actionBlocks_1_1 && !actionBlocks_1_1.done && (_a2 = actionBlocks_1.return))
        _a2.call(actionBlocks_1);
    } finally {
      if (e_1)
        throw e_1.error;
    }
  }
  return assignActions;
};
function resolveActions(machine2, currentState, currentContext, _event, actionBlocks, predictableExec, preserveActionOrder) {
  if (preserveActionOrder === void 0) {
    preserveActionOrder = false;
  }
  var assignActions = preserveActionOrder ? [] : pluckAssigns(actionBlocks);
  var updatedContext = assignActions.length ? updateContext(currentContext, _event, assignActions, currentState) : currentContext;
  var preservedContexts = preserveActionOrder ? [currentContext] : void 0;
  var deferredToBlockEnd = [];
  function handleAction(actionObject) {
    var _a2;
    switch (actionObject.type) {
      case raise: {
        return resolveRaise(actionObject);
      }
      case send:
        var sendAction = resolveSend(actionObject, updatedContext, _event, machine2.options.delays);
        if (!IS_PRODUCTION) {
          warn(
            !isString(actionObject.delay) || typeof sendAction.delay === "number",
            "No delay reference for delay expression '".concat(actionObject.delay, "' was found on machine '").concat(machine2.id, "'")
          );
        }
        if (predictableExec && sendAction.to !== SpecialTargets.Internal) {
          deferredToBlockEnd.push(sendAction);
        }
        return sendAction;
      case log: {
        var resolved = resolveLog(actionObject, updatedContext, _event);
        predictableExec === null || predictableExec === void 0 ? void 0 : predictableExec(resolved, updatedContext, _event);
        return resolved;
      }
      case choose: {
        var chooseAction = actionObject;
        var matchedActions = (_a2 = chooseAction.conds.find(function(condition) {
          var guard = toGuard(condition.cond, machine2.options.guards);
          return !guard || evaluateGuard(machine2, guard, updatedContext, _event, !predictableExec ? currentState : void 0);
        })) === null || _a2 === void 0 ? void 0 : _a2.actions;
        if (!matchedActions) {
          return [];
        }
        var _b = __read(resolveActions(machine2, currentState, updatedContext, _event, [toActionObjects(toArray(matchedActions), machine2.options.actions)], predictableExec, preserveActionOrder), 2), resolvedActionsFromChoose = _b[0], resolvedContextFromChoose = _b[1];
        updatedContext = resolvedContextFromChoose;
        preservedContexts === null || preservedContexts === void 0 ? void 0 : preservedContexts.push(updatedContext);
        return resolvedActionsFromChoose;
      }
      case pure: {
        var matchedActions = actionObject.get(updatedContext, _event.data);
        if (!matchedActions) {
          return [];
        }
        var _c = __read(resolveActions(machine2, currentState, updatedContext, _event, [toActionObjects(toArray(matchedActions), machine2.options.actions)], predictableExec, preserveActionOrder), 2), resolvedActionsFromPure = _c[0], resolvedContext = _c[1];
        updatedContext = resolvedContext;
        preservedContexts === null || preservedContexts === void 0 ? void 0 : preservedContexts.push(updatedContext);
        return resolvedActionsFromPure;
      }
      case stop: {
        var resolved = resolveStop(actionObject, updatedContext, _event);
        predictableExec === null || predictableExec === void 0 ? void 0 : predictableExec(resolved, currentContext, _event);
        return resolved;
      }
      case assign: {
        updatedContext = updateContext(updatedContext, _event, [actionObject], !predictableExec ? currentState : void 0);
        preservedContexts === null || preservedContexts === void 0 ? void 0 : preservedContexts.push(updatedContext);
        break;
      }
      default:
        var resolvedActionObject = toActionObject(actionObject, machine2.options.actions);
        var exec_1 = resolvedActionObject.exec;
        if (predictableExec) {
          predictableExec(resolvedActionObject, updatedContext, _event);
        } else if (exec_1 && preservedContexts) {
          var contextIndex_1 = preservedContexts.length - 1;
          resolvedActionObject = __assign(__assign({}, resolvedActionObject), {
            exec: function(_ctx) {
              var args = [];
              for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
              }
              exec_1.apply(void 0, __spreadArray([preservedContexts[contextIndex_1]], __read(args), false));
            }
          });
        }
        return resolvedActionObject;
    }
  }
  function processBlock(block) {
    var e_2, _a2;
    var resolvedActions2 = [];
    try {
      for (var block_1 = __values(block), block_1_1 = block_1.next(); !block_1_1.done; block_1_1 = block_1.next()) {
        var action = block_1_1.value;
        var resolved = handleAction(action);
        if (resolved) {
          resolvedActions2 = resolvedActions2.concat(resolved);
        }
      }
    } catch (e_2_1) {
      e_2 = {
        error: e_2_1
      };
    } finally {
      try {
        if (block_1_1 && !block_1_1.done && (_a2 = block_1.return))
          _a2.call(block_1);
      } finally {
        if (e_2)
          throw e_2.error;
      }
    }
    deferredToBlockEnd.forEach(function(action2) {
      predictableExec(action2, updatedContext, _event);
    });
    deferredToBlockEnd.length = 0;
    return resolvedActions2;
  }
  var resolvedActions = flatten(actionBlocks.map(processBlock));
  return [resolvedActions, updatedContext];
}

// ../../node_modules/xstate/es/serviceScope.js
var serviceStack = [];
var provide = function(service, fn) {
  serviceStack.push(service);
  var result = fn(service);
  serviceStack.pop();
  return result;
};

// ../../node_modules/xstate/es/Actor.js
function createNullActor(id) {
  var _a2;
  return _a2 = {
    id,
    send: function() {
      return void 0;
    },
    subscribe: function() {
      return {
        unsubscribe: function() {
          return void 0;
        }
      };
    },
    getSnapshot: function() {
      return void 0;
    },
    toJSON: function() {
      return {
        id
      };
    }
  }, _a2[symbolObservable] = function() {
    return this;
  }, _a2;
}
function createInvocableActor(invokeDefinition, machine2, context, _event) {
  var _a2;
  var invokeSrc = toInvokeSource(invokeDefinition.src);
  var serviceCreator = (_a2 = machine2 === null || machine2 === void 0 ? void 0 : machine2.options.services) === null || _a2 === void 0 ? void 0 : _a2[invokeSrc.type];
  var resolvedData = invokeDefinition.data ? mapContext(invokeDefinition.data, context, _event) : void 0;
  var tempActor = serviceCreator ? createDeferredActor(serviceCreator, invokeDefinition.id, resolvedData) : createNullActor(invokeDefinition.id);
  tempActor.meta = invokeDefinition;
  return tempActor;
}
function createDeferredActor(entity, id, data) {
  var tempActor = createNullActor(id);
  tempActor.deferred = true;
  if (isMachine(entity)) {
    var initialState_1 = tempActor.state = provide(void 0, function() {
      return (data ? entity.withContext(data) : entity).initialState;
    });
    tempActor.getSnapshot = function() {
      return initialState_1;
    };
  }
  return tempActor;
}

// ../../node_modules/xstate/es/stateUtils.js
var isLeafNode = function(stateNode) {
  return stateNode.type === "atomic" || stateNode.type === "final";
};
function getAllChildren(stateNode) {
  return Object.keys(stateNode.states).map(function(key) {
    return stateNode.states[key];
  });
}
function getChildren(stateNode) {
  return getAllChildren(stateNode).filter(function(sn) {
    return sn.type !== "history";
  });
}
function getAllStateNodes(stateNode) {
  var stateNodes = [stateNode];
  if (isLeafNode(stateNode)) {
    return stateNodes;
  }
  return stateNodes.concat(flatten(getChildren(stateNode).map(getAllStateNodes)));
}
function getConfiguration(prevStateNodes, stateNodes) {
  var e_1, _a2, e_2, _b, e_3, _c, e_4, _d;
  var prevConfiguration = new Set(prevStateNodes);
  var prevAdjList = getAdjList(prevConfiguration);
  var configuration = new Set(stateNodes);
  try {
    for (var configuration_1 = __values(configuration), configuration_1_1 = configuration_1.next(); !configuration_1_1.done; configuration_1_1 = configuration_1.next()) {
      var s = configuration_1_1.value;
      var m = s.parent;
      while (m && !configuration.has(m)) {
        configuration.add(m);
        m = m.parent;
      }
    }
  } catch (e_1_1) {
    e_1 = {
      error: e_1_1
    };
  } finally {
    try {
      if (configuration_1_1 && !configuration_1_1.done && (_a2 = configuration_1.return))
        _a2.call(configuration_1);
    } finally {
      if (e_1)
        throw e_1.error;
    }
  }
  var adjList = getAdjList(configuration);
  try {
    for (var configuration_2 = __values(configuration), configuration_2_1 = configuration_2.next(); !configuration_2_1.done; configuration_2_1 = configuration_2.next()) {
      var s = configuration_2_1.value;
      if (s.type === "compound" && (!adjList.get(s) || !adjList.get(s).length)) {
        if (prevAdjList.get(s)) {
          prevAdjList.get(s).forEach(function(sn) {
            return configuration.add(sn);
          });
        } else {
          s.initialStateNodes.forEach(function(sn) {
            return configuration.add(sn);
          });
        }
      } else {
        if (s.type === "parallel") {
          try {
            for (var _e = (e_3 = void 0, __values(getChildren(s))), _f = _e.next(); !_f.done; _f = _e.next()) {
              var child = _f.value;
              if (!configuration.has(child)) {
                configuration.add(child);
                if (prevAdjList.get(child)) {
                  prevAdjList.get(child).forEach(function(sn) {
                    return configuration.add(sn);
                  });
                } else {
                  child.initialStateNodes.forEach(function(sn) {
                    return configuration.add(sn);
                  });
                }
              }
            }
          } catch (e_3_1) {
            e_3 = {
              error: e_3_1
            };
          } finally {
            try {
              if (_f && !_f.done && (_c = _e.return))
                _c.call(_e);
            } finally {
              if (e_3)
                throw e_3.error;
            }
          }
        }
      }
    }
  } catch (e_2_1) {
    e_2 = {
      error: e_2_1
    };
  } finally {
    try {
      if (configuration_2_1 && !configuration_2_1.done && (_b = configuration_2.return))
        _b.call(configuration_2);
    } finally {
      if (e_2)
        throw e_2.error;
    }
  }
  try {
    for (var configuration_3 = __values(configuration), configuration_3_1 = configuration_3.next(); !configuration_3_1.done; configuration_3_1 = configuration_3.next()) {
      var s = configuration_3_1.value;
      var m = s.parent;
      while (m && !configuration.has(m)) {
        configuration.add(m);
        m = m.parent;
      }
    }
  } catch (e_4_1) {
    e_4 = {
      error: e_4_1
    };
  } finally {
    try {
      if (configuration_3_1 && !configuration_3_1.done && (_d = configuration_3.return))
        _d.call(configuration_3);
    } finally {
      if (e_4)
        throw e_4.error;
    }
  }
  return configuration;
}
function getValueFromAdj(baseNode, adjList) {
  var childStateNodes = adjList.get(baseNode);
  if (!childStateNodes) {
    return {};
  }
  if (baseNode.type === "compound") {
    var childStateNode = childStateNodes[0];
    if (childStateNode) {
      if (isLeafNode(childStateNode)) {
        return childStateNode.key;
      }
    } else {
      return {};
    }
  }
  var stateValue = {};
  childStateNodes.forEach(function(csn) {
    stateValue[csn.key] = getValueFromAdj(csn, adjList);
  });
  return stateValue;
}
function getAdjList(configuration) {
  var e_5, _a2;
  var adjList = /* @__PURE__ */ new Map();
  try {
    for (var configuration_4 = __values(configuration), configuration_4_1 = configuration_4.next(); !configuration_4_1.done; configuration_4_1 = configuration_4.next()) {
      var s = configuration_4_1.value;
      if (!adjList.has(s)) {
        adjList.set(s, []);
      }
      if (s.parent) {
        if (!adjList.has(s.parent)) {
          adjList.set(s.parent, []);
        }
        adjList.get(s.parent).push(s);
      }
    }
  } catch (e_5_1) {
    e_5 = {
      error: e_5_1
    };
  } finally {
    try {
      if (configuration_4_1 && !configuration_4_1.done && (_a2 = configuration_4.return))
        _a2.call(configuration_4);
    } finally {
      if (e_5)
        throw e_5.error;
    }
  }
  return adjList;
}
function getValue(rootNode, configuration) {
  var config = getConfiguration([rootNode], configuration);
  return getValueFromAdj(rootNode, getAdjList(config));
}
function has(iterable, item) {
  if (Array.isArray(iterable)) {
    return iterable.some(function(member) {
      return member === item;
    });
  }
  if (iterable instanceof Set) {
    return iterable.has(item);
  }
  return false;
}
function nextEvents(configuration) {
  return __spreadArray([], __read(new Set(flatten(__spreadArray([], __read(configuration.map(function(sn) {
    return sn.ownEvents;
  })), false)))), false);
}
function isInFinalState(configuration, stateNode) {
  if (stateNode.type === "compound") {
    return getChildren(stateNode).some(function(s) {
      return s.type === "final" && has(configuration, s);
    });
  }
  if (stateNode.type === "parallel") {
    return getChildren(stateNode).every(function(sn) {
      return isInFinalState(configuration, sn);
    });
  }
  return false;
}
function getMeta(configuration) {
  if (configuration === void 0) {
    configuration = [];
  }
  return configuration.reduce(function(acc, stateNode) {
    if (stateNode.meta !== void 0) {
      acc[stateNode.id] = stateNode.meta;
    }
    return acc;
  }, {});
}
function getTagsFromConfiguration(configuration) {
  return new Set(flatten(configuration.map(function(sn) {
    return sn.tags;
  })));
}

// ../../node_modules/xstate/es/State.js
function stateValuesEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (a === void 0 || b === void 0) {
    return false;
  }
  if (isString(a) || isString(b)) {
    return a === b;
  }
  var aKeys = Object.keys(a);
  var bKeys = Object.keys(b);
  return aKeys.length === bKeys.length && aKeys.every(function(key) {
    return stateValuesEqual(a[key], b[key]);
  });
}
var State = /* @__PURE__ */ function() {
  function State3(config) {
    var _this = this;
    var _a2;
    this.actions = [];
    this.activities = EMPTY_ACTIVITY_MAP;
    this.meta = {};
    this.events = [];
    this.value = config.value;
    this.context = config.context;
    this._event = config._event;
    this._sessionid = config._sessionid;
    this.event = this._event.data;
    this.historyValue = config.historyValue;
    this.history = config.history;
    this.actions = config.actions || [];
    this.activities = config.activities || EMPTY_ACTIVITY_MAP;
    this.meta = getMeta(config.configuration);
    this.events = config.events || [];
    this.matches = this.matches.bind(this);
    this.toStrings = this.toStrings.bind(this);
    this.configuration = config.configuration;
    this.transitions = config.transitions;
    this.children = config.children;
    this.done = !!config.done;
    this.tags = (_a2 = Array.isArray(config.tags) ? new Set(config.tags) : config.tags) !== null && _a2 !== void 0 ? _a2 : /* @__PURE__ */ new Set();
    this.machine = config.machine;
    Object.defineProperty(this, "nextEvents", {
      get: function() {
        return nextEvents(_this.configuration);
      }
    });
  }
  State3.from = function(stateValue, context) {
    if (stateValue instanceof State3) {
      if (stateValue.context !== context) {
        return new State3({
          value: stateValue.value,
          context,
          _event: stateValue._event,
          _sessionid: null,
          historyValue: stateValue.historyValue,
          history: stateValue.history,
          actions: [],
          activities: stateValue.activities,
          meta: {},
          events: [],
          configuration: [],
          transitions: [],
          children: {}
        });
      }
      return stateValue;
    }
    var _event = initEvent;
    return new State3({
      value: stateValue,
      context,
      _event,
      _sessionid: null,
      historyValue: void 0,
      history: void 0,
      actions: [],
      activities: void 0,
      meta: void 0,
      events: [],
      configuration: [],
      transitions: [],
      children: {}
    });
  };
  State3.create = function(config) {
    return new State3(config);
  };
  State3.inert = function(stateValue, context) {
    if (stateValue instanceof State3) {
      if (!stateValue.actions.length) {
        return stateValue;
      }
      var _event = initEvent;
      return new State3({
        value: stateValue.value,
        context,
        _event,
        _sessionid: null,
        historyValue: stateValue.historyValue,
        history: stateValue.history,
        activities: stateValue.activities,
        configuration: stateValue.configuration,
        transitions: [],
        children: {}
      });
    }
    return State3.from(stateValue, context);
  };
  State3.prototype.toStrings = function(stateValue, delimiter) {
    var _this = this;
    if (stateValue === void 0) {
      stateValue = this.value;
    }
    if (delimiter === void 0) {
      delimiter = ".";
    }
    if (isString(stateValue)) {
      return [stateValue];
    }
    var valueKeys = Object.keys(stateValue);
    return valueKeys.concat.apply(valueKeys, __spreadArray([], __read(valueKeys.map(function(key) {
      return _this.toStrings(stateValue[key], delimiter).map(function(s) {
        return key + delimiter + s;
      });
    })), false));
  };
  State3.prototype.toJSON = function() {
    var _a2 = this;
    _a2.configuration;
    _a2.transitions;
    var tags = _a2.tags;
    _a2.machine;
    var jsonValues = __rest(_a2, ["configuration", "transitions", "tags", "machine"]);
    return __assign(__assign({}, jsonValues), {
      tags: Array.from(tags)
    });
  };
  State3.prototype.matches = function(parentStateValue) {
    return matchesState(parentStateValue, this.value);
  };
  State3.prototype.hasTag = function(tag) {
    return this.tags.has(tag);
  };
  State3.prototype.can = function(event) {
    var _a2;
    if (IS_PRODUCTION) {
      warn(!!this.machine, "state.can(...) used outside of a machine-created State object; this will always return false.");
    }
    var transitionData = (_a2 = this.machine) === null || _a2 === void 0 ? void 0 : _a2.getTransitionData(this, event);
    return !!(transitionData === null || transitionData === void 0 ? void 0 : transitionData.transitions.length) && transitionData.transitions.some(function(t) {
      return t.target !== void 0 || t.actions.length;
    });
  };
  return State3;
}();

// ../../node_modules/xstate/es/invokeUtils.js
function toInvokeSource2(src) {
  if (typeof src === "string") {
    var simpleSrc = {
      type: src
    };
    simpleSrc.toString = function() {
      return src;
    };
    return simpleSrc;
  }
  return src;
}
function toInvokeDefinition(invokeConfig) {
  return __assign(__assign({
    type: invoke
  }, invokeConfig), {
    toJSON: function() {
      invokeConfig.onDone;
      invokeConfig.onError;
      var invokeDef = __rest(invokeConfig, ["onDone", "onError"]);
      return __assign(__assign({}, invokeDef), {
        type: invoke,
        src: toInvokeSource2(invokeConfig.src)
      });
    }
  });
}

// ../../node_modules/xstate/es/StateNode.js
var NULL_EVENT = "";
var STATE_IDENTIFIER = "#";
var WILDCARD = "*";
var EMPTY_OBJECT = {};
var isStateId = function(str) {
  return str[0] === STATE_IDENTIFIER;
};
var createDefaultOptions = function() {
  return {
    actions: {},
    guards: {},
    services: {},
    activities: {},
    delays: {}
  };
};
var validateArrayifiedTransitions = function(stateNode, event, transitions) {
  var hasNonLastUnguardedTarget = transitions.slice(0, -1).some(function(transition) {
    return !("cond" in transition) && !("in" in transition) && (isString(transition.target) || isMachine(transition.target));
  });
  var eventText = event === NULL_EVENT ? "the transient event" : "event '".concat(event, "'");
  warn(!hasNonLastUnguardedTarget, "One or more transitions for ".concat(eventText, " on state '").concat(stateNode.id, "' are unreachable. ") + "Make sure that the default transition is the last one defined.");
};
var StateNode = /* @__PURE__ */ function() {
  function StateNode2(config, options, _context, _stateInfo) {
    if (_context === void 0) {
      _context = "context" in config ? config.context : void 0;
    }
    var _this = this;
    var _a2;
    this.config = config;
    this._context = _context;
    this.order = -1;
    this.__xstatenode = true;
    this.__cache = {
      events: void 0,
      relativeValue: /* @__PURE__ */ new Map(),
      initialStateValue: void 0,
      initialState: void 0,
      on: void 0,
      transitions: void 0,
      candidates: {},
      delayedTransitions: void 0
    };
    this.idMap = {};
    this.tags = [];
    this.options = Object.assign(createDefaultOptions(), options);
    this.parent = _stateInfo === null || _stateInfo === void 0 ? void 0 : _stateInfo.parent;
    this.key = this.config.key || (_stateInfo === null || _stateInfo === void 0 ? void 0 : _stateInfo.key) || this.config.id || "(machine)";
    this.machine = this.parent ? this.parent.machine : this;
    this.path = this.parent ? this.parent.path.concat(this.key) : [];
    this.delimiter = this.config.delimiter || (this.parent ? this.parent.delimiter : STATE_DELIMITER);
    this.id = this.config.id || __spreadArray([this.machine.key], __read(this.path), false).join(this.delimiter);
    this.version = this.parent ? this.parent.version : this.config.version;
    this.type = this.config.type || (this.config.parallel ? "parallel" : this.config.states && Object.keys(this.config.states).length ? "compound" : this.config.history ? "history" : "atomic");
    this.schema = this.parent ? this.machine.schema : (_a2 = this.config.schema) !== null && _a2 !== void 0 ? _a2 : {};
    this.description = this.config.description;
    if (!IS_PRODUCTION) {
      warn(!("parallel" in this.config), 'The "parallel" property is deprecated and will be removed in version 4.1. '.concat(this.config.parallel ? "Replace with `type: 'parallel'`" : "Use `type: '".concat(this.type, "'`"), " in the config for state node '").concat(this.id, "' instead."));
    }
    this.initial = this.config.initial;
    this.states = this.config.states ? mapValues(this.config.states, function(stateConfig, key) {
      var _a3;
      var stateNode = new StateNode2(stateConfig, {}, void 0, {
        parent: _this,
        key
      });
      Object.assign(_this.idMap, __assign((_a3 = {}, _a3[stateNode.id] = stateNode, _a3), stateNode.idMap));
      return stateNode;
    }) : EMPTY_OBJECT;
    var order = 0;
    function dfs(stateNode) {
      var e_1, _a3;
      stateNode.order = order++;
      try {
        for (var _b = __values(getAllChildren(stateNode)), _c = _b.next(); !_c.done; _c = _b.next()) {
          var child = _c.value;
          dfs(child);
        }
      } catch (e_1_1) {
        e_1 = {
          error: e_1_1
        };
      } finally {
        try {
          if (_c && !_c.done && (_a3 = _b.return))
            _a3.call(_b);
        } finally {
          if (e_1)
            throw e_1.error;
        }
      }
    }
    dfs(this);
    this.history = this.config.history === true ? "shallow" : this.config.history || false;
    this._transient = !!this.config.always || (!this.config.on ? false : Array.isArray(this.config.on) ? this.config.on.some(function(_a3) {
      var event = _a3.event;
      return event === NULL_EVENT;
    }) : NULL_EVENT in this.config.on);
    this.strict = !!this.config.strict;
    this.onEntry = toArray(this.config.entry || this.config.onEntry).map(function(action) {
      return toActionObject(action);
    });
    this.onExit = toArray(this.config.exit || this.config.onExit).map(function(action) {
      return toActionObject(action);
    });
    this.meta = this.config.meta;
    this.doneData = this.type === "final" ? this.config.data : void 0;
    this.invoke = toArray(this.config.invoke).map(function(invokeConfig, i) {
      var _a3, _b;
      if (isMachine(invokeConfig)) {
        var invokeId = createInvokeId(_this.id, i);
        _this.machine.options.services = __assign((_a3 = {}, _a3[invokeId] = invokeConfig, _a3), _this.machine.options.services);
        return toInvokeDefinition({
          src: invokeId,
          id: invokeId
        });
      } else if (isString(invokeConfig.src)) {
        var invokeId = invokeConfig.id || createInvokeId(_this.id, i);
        return toInvokeDefinition(__assign(__assign({}, invokeConfig), {
          id: invokeId,
          src: invokeConfig.src
        }));
      } else if (isMachine(invokeConfig.src) || isFunction(invokeConfig.src)) {
        var invokeId = invokeConfig.id || createInvokeId(_this.id, i);
        _this.machine.options.services = __assign((_b = {}, _b[invokeId] = invokeConfig.src, _b), _this.machine.options.services);
        return toInvokeDefinition(__assign(__assign({
          id: invokeId
        }, invokeConfig), {
          src: invokeId
        }));
      } else {
        var invokeSource = invokeConfig.src;
        return toInvokeDefinition(__assign(__assign({
          id: createInvokeId(_this.id, i)
        }, invokeConfig), {
          src: invokeSource
        }));
      }
    });
    this.activities = toArray(this.config.activities).concat(this.invoke).map(function(activity) {
      return toActivityDefinition(activity);
    });
    this.transition = this.transition.bind(this);
    this.tags = toArray(this.config.tags);
  }
  StateNode2.prototype._init = function() {
    if (this.__cache.transitions) {
      return;
    }
    getAllStateNodes(this).forEach(function(stateNode) {
      return stateNode.on;
    });
  };
  StateNode2.prototype.withConfig = function(options, context) {
    var _a2 = this.options, actions = _a2.actions, activities = _a2.activities, guards = _a2.guards, services = _a2.services, delays = _a2.delays;
    return new StateNode2(this.config, {
      actions: __assign(__assign({}, actions), options.actions),
      activities: __assign(__assign({}, activities), options.activities),
      guards: __assign(__assign({}, guards), options.guards),
      services: __assign(__assign({}, services), options.services),
      delays: __assign(__assign({}, delays), options.delays)
    }, context !== null && context !== void 0 ? context : this.context);
  };
  StateNode2.prototype.withContext = function(context) {
    return new StateNode2(this.config, this.options, context);
  };
  Object.defineProperty(StateNode2.prototype, "context", {
    get: function() {
      return isFunction(this._context) ? this._context() : this._context;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(StateNode2.prototype, "definition", {
    get: function() {
      return {
        id: this.id,
        key: this.key,
        version: this.version,
        context: this.context,
        type: this.type,
        initial: this.initial,
        history: this.history,
        states: mapValues(this.states, function(state) {
          return state.definition;
        }),
        on: this.on,
        transitions: this.transitions,
        entry: this.onEntry,
        exit: this.onExit,
        activities: this.activities || [],
        meta: this.meta,
        order: this.order || -1,
        data: this.doneData,
        invoke: this.invoke,
        description: this.description,
        tags: this.tags
      };
    },
    enumerable: false,
    configurable: true
  });
  StateNode2.prototype.toJSON = function() {
    return this.definition;
  };
  Object.defineProperty(StateNode2.prototype, "on", {
    get: function() {
      if (this.__cache.on) {
        return this.__cache.on;
      }
      var transitions = this.transitions;
      return this.__cache.on = transitions.reduce(function(map, transition) {
        map[transition.eventType] = map[transition.eventType] || [];
        map[transition.eventType].push(transition);
        return map;
      }, {});
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(StateNode2.prototype, "after", {
    get: function() {
      return this.__cache.delayedTransitions || (this.__cache.delayedTransitions = this.getDelayedTransitions(), this.__cache.delayedTransitions);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(StateNode2.prototype, "transitions", {
    get: function() {
      return this.__cache.transitions || (this.__cache.transitions = this.formatTransitions(), this.__cache.transitions);
    },
    enumerable: false,
    configurable: true
  });
  StateNode2.prototype.getCandidates = function(eventName) {
    if (this.__cache.candidates[eventName]) {
      return this.__cache.candidates[eventName];
    }
    var transient = eventName === NULL_EVENT;
    var candidates = this.transitions.filter(function(transition) {
      var sameEventType = transition.eventType === eventName;
      return transient ? sameEventType : sameEventType || transition.eventType === WILDCARD;
    });
    this.__cache.candidates[eventName] = candidates;
    return candidates;
  };
  StateNode2.prototype.getDelayedTransitions = function() {
    var _this = this;
    var afterConfig = this.config.after;
    if (!afterConfig) {
      return [];
    }
    var mutateEntryExit = function(delay, i) {
      var delayRef = isFunction(delay) ? "".concat(_this.id, ":delay[").concat(i, "]") : delay;
      var eventType = after2(delayRef, _this.id);
      _this.onEntry.push(send2(eventType, {
        delay
      }));
      _this.onExit.push(cancel2(eventType));
      return eventType;
    };
    var delayedTransitions = isArray(afterConfig) ? afterConfig.map(function(transition, i) {
      var eventType = mutateEntryExit(transition.delay, i);
      return __assign(__assign({}, transition), {
        event: eventType
      });
    }) : flatten(Object.keys(afterConfig).map(function(delay, i) {
      var configTransition = afterConfig[delay];
      var resolvedTransition = isString(configTransition) ? {
        target: configTransition
      } : configTransition;
      var resolvedDelay = !isNaN(+delay) ? +delay : delay;
      var eventType = mutateEntryExit(resolvedDelay, i);
      return toArray(resolvedTransition).map(function(transition) {
        return __assign(__assign({}, transition), {
          event: eventType,
          delay: resolvedDelay
        });
      });
    }));
    return delayedTransitions.map(function(delayedTransition) {
      var delay = delayedTransition.delay;
      return __assign(__assign({}, _this.formatTransition(delayedTransition)), {
        delay
      });
    });
  };
  StateNode2.prototype.getStateNodes = function(state) {
    var _a2;
    var _this = this;
    if (!state) {
      return [];
    }
    var stateValue = state instanceof State ? state.value : toStateValue(state, this.delimiter);
    if (isString(stateValue)) {
      var initialStateValue = this.getStateNode(stateValue).initial;
      return initialStateValue !== void 0 ? this.getStateNodes((_a2 = {}, _a2[stateValue] = initialStateValue, _a2)) : [this, this.states[stateValue]];
    }
    var subStateKeys = Object.keys(stateValue);
    var subStateNodes = [this];
    subStateNodes.push.apply(subStateNodes, __spreadArray([], __read(flatten(subStateKeys.map(function(subStateKey) {
      return _this.getStateNode(subStateKey).getStateNodes(stateValue[subStateKey]);
    }))), false));
    return subStateNodes;
  };
  StateNode2.prototype.handles = function(event) {
    var eventType = getEventType(event);
    return this.events.includes(eventType);
  };
  StateNode2.prototype.resolveState = function(state) {
    var stateFromConfig = state instanceof State ? state : State.create(state);
    var configuration = Array.from(getConfiguration([], this.getStateNodes(stateFromConfig.value)));
    return new State(__assign(__assign({}, stateFromConfig), {
      value: this.resolve(stateFromConfig.value),
      configuration,
      done: isInFinalState(configuration, this),
      tags: getTagsFromConfiguration(configuration),
      machine: this.machine
    }));
  };
  StateNode2.prototype.transitionLeafNode = function(stateValue, state, _event) {
    var stateNode = this.getStateNode(stateValue);
    var next = stateNode.next(state, _event);
    if (!next || !next.transitions.length) {
      return this.next(state, _event);
    }
    return next;
  };
  StateNode2.prototype.transitionCompoundNode = function(stateValue, state, _event) {
    var subStateKeys = Object.keys(stateValue);
    var stateNode = this.getStateNode(subStateKeys[0]);
    var next = stateNode._transition(stateValue[subStateKeys[0]], state, _event);
    if (!next || !next.transitions.length) {
      return this.next(state, _event);
    }
    return next;
  };
  StateNode2.prototype.transitionParallelNode = function(stateValue, state, _event) {
    var e_2, _a2;
    var transitionMap = {};
    try {
      for (var _b = __values(Object.keys(stateValue)), _c = _b.next(); !_c.done; _c = _b.next()) {
        var subStateKey = _c.value;
        var subStateValue = stateValue[subStateKey];
        if (!subStateValue) {
          continue;
        }
        var subStateNode = this.getStateNode(subStateKey);
        var next = subStateNode._transition(subStateValue, state, _event);
        if (next) {
          transitionMap[subStateKey] = next;
        }
      }
    } catch (e_2_1) {
      e_2 = {
        error: e_2_1
      };
    } finally {
      try {
        if (_c && !_c.done && (_a2 = _b.return))
          _a2.call(_b);
      } finally {
        if (e_2)
          throw e_2.error;
      }
    }
    var stateTransitions = Object.keys(transitionMap).map(function(key) {
      return transitionMap[key];
    });
    var enabledTransitions = flatten(stateTransitions.map(function(st) {
      return st.transitions;
    }));
    var willTransition = stateTransitions.some(function(st) {
      return st.transitions.length > 0;
    });
    if (!willTransition) {
      return this.next(state, _event);
    }
    var configuration = flatten(Object.keys(transitionMap).map(function(key) {
      return transitionMap[key].configuration;
    }));
    return {
      transitions: enabledTransitions,
      exitSet: flatten(stateTransitions.map(function(t) {
        return t.exitSet;
      })),
      configuration,
      source: state,
      actions: flatten(Object.keys(transitionMap).map(function(key) {
        return transitionMap[key].actions;
      }))
    };
  };
  StateNode2.prototype._transition = function(stateValue, state, _event) {
    if (isString(stateValue)) {
      return this.transitionLeafNode(stateValue, state, _event);
    }
    if (Object.keys(stateValue).length === 1) {
      return this.transitionCompoundNode(stateValue, state, _event);
    }
    return this.transitionParallelNode(stateValue, state, _event);
  };
  StateNode2.prototype.getTransitionData = function(state, event) {
    return this._transition(state.value, state, toSCXMLEvent(event));
  };
  StateNode2.prototype.next = function(state, _event) {
    var e_3, _a2;
    var _this = this;
    var eventName = _event.name;
    var actions = [];
    var nextStateNodes = [];
    var selectedTransition;
    try {
      for (var _b = __values(this.getCandidates(eventName)), _c = _b.next(); !_c.done; _c = _b.next()) {
        var candidate = _c.value;
        var cond = candidate.cond, stateIn = candidate.in;
        var resolvedContext = state.context;
        var isInState = stateIn ? isString(stateIn) && isStateId(stateIn) ? state.matches(toStateValue(this.getStateNodeById(stateIn).path, this.delimiter)) : matchesState(toStateValue(stateIn, this.delimiter), path(this.path.slice(0, -2))(state.value)) : true;
        var guardPassed = false;
        try {
          guardPassed = !cond || evaluateGuard(this.machine, cond, resolvedContext, _event, state);
        } catch (err) {
          throw new Error("Unable to evaluate guard '".concat(cond.name || cond.type, "' in transition for event '").concat(eventName, "' in state node '").concat(this.id, "':\n").concat(err.message));
        }
        if (guardPassed && isInState) {
          if (candidate.target !== void 0) {
            nextStateNodes = candidate.target;
          }
          actions.push.apply(actions, __spreadArray([], __read(candidate.actions), false));
          selectedTransition = candidate;
          break;
        }
      }
    } catch (e_3_1) {
      e_3 = {
        error: e_3_1
      };
    } finally {
      try {
        if (_c && !_c.done && (_a2 = _b.return))
          _a2.call(_b);
      } finally {
        if (e_3)
          throw e_3.error;
      }
    }
    if (!selectedTransition) {
      return void 0;
    }
    if (!nextStateNodes.length) {
      return {
        transitions: [selectedTransition],
        exitSet: [],
        configuration: state.value ? [this] : [],
        source: state,
        actions
      };
    }
    var allNextStateNodes = flatten(nextStateNodes.map(function(stateNode) {
      return _this.getRelativeStateNodes(stateNode, state.historyValue);
    }));
    var isInternal = !!selectedTransition.internal;
    return {
      transitions: [selectedTransition],
      exitSet: isInternal ? [] : flatten(nextStateNodes.map(function(targetNode) {
        return _this.getPotentiallyReenteringNodes(targetNode);
      })),
      configuration: allNextStateNodes,
      source: state,
      actions
    };
  };
  StateNode2.prototype.getPotentiallyReenteringNodes = function(targetNode) {
    if (this.order < targetNode.order) {
      return [this];
    }
    var nodes = [];
    var marker = this;
    var possibleAncestor = targetNode;
    while (marker && marker !== possibleAncestor) {
      nodes.push(marker);
      marker = marker.parent;
    }
    if (marker !== possibleAncestor) {
      return [];
    }
    nodes.push(possibleAncestor);
    return nodes;
  };
  StateNode2.prototype.getActions = function(resolvedConfig, isDone, transition, currentContext, _event, prevState, predictableExec) {
    var e_4, _a2, e_5, _b;
    var _this = this;
    var prevConfig = prevState ? getConfiguration([], this.getStateNodes(prevState.value)) : [];
    var entrySet = /* @__PURE__ */ new Set();
    try {
      for (var _c = __values(Array.from(resolvedConfig).sort(function(a, b) {
        return a.order - b.order;
      })), _d = _c.next(); !_d.done; _d = _c.next()) {
        var sn = _d.value;
        if (!has(prevConfig, sn) || has(transition.exitSet, sn) || sn.parent && entrySet.has(sn.parent)) {
          entrySet.add(sn);
        }
      }
    } catch (e_4_1) {
      e_4 = {
        error: e_4_1
      };
    } finally {
      try {
        if (_d && !_d.done && (_a2 = _c.return))
          _a2.call(_c);
      } finally {
        if (e_4)
          throw e_4.error;
      }
    }
    try {
      for (var prevConfig_1 = __values(prevConfig), prevConfig_1_1 = prevConfig_1.next(); !prevConfig_1_1.done; prevConfig_1_1 = prevConfig_1.next()) {
        var sn = prevConfig_1_1.value;
        if (!has(resolvedConfig, sn) || has(transition.exitSet, sn.parent)) {
          transition.exitSet.push(sn);
        }
      }
    } catch (e_5_1) {
      e_5 = {
        error: e_5_1
      };
    } finally {
      try {
        if (prevConfig_1_1 && !prevConfig_1_1.done && (_b = prevConfig_1.return))
          _b.call(prevConfig_1);
      } finally {
        if (e_5)
          throw e_5.error;
      }
    }
    transition.exitSet.sort(function(a, b) {
      return b.order - a.order;
    });
    var entryStates = Array.from(entrySet).sort(function(a, b) {
      return a.order - b.order;
    });
    var exitStates = new Set(transition.exitSet);
    var doneEvents = flatten(entryStates.map(function(sn2) {
      var events = [];
      if (sn2.type !== "final") {
        return events;
      }
      var parent = sn2.parent;
      if (!parent.parent) {
        return events;
      }
      events.push(
        done(sn2.id, sn2.doneData),
        done(parent.id, sn2.doneData ? mapContext(sn2.doneData, currentContext, _event) : void 0)
      );
      var grandparent = parent.parent;
      if (grandparent.type === "parallel") {
        if (getChildren(grandparent).every(function(parentNode) {
          return isInFinalState(transition.configuration, parentNode);
        })) {
          events.push(done(grandparent.id));
        }
      }
      return events;
    }));
    var entryActions = entryStates.map(function(stateNode) {
      var entryActions2 = stateNode.onEntry;
      var invokeActions = stateNode.activities.map(function(activity) {
        return start2(activity);
      });
      return toActionObjects(predictableExec ? __spreadArray(__spreadArray([], __read(entryActions2), false), __read(invokeActions), false) : __spreadArray(__spreadArray([], __read(invokeActions), false), __read(entryActions2), false), _this.machine.options.actions);
    }).concat([doneEvents.map(raise2)]);
    var exitActions = Array.from(exitStates).map(function(stateNode) {
      return toActionObjects(__spreadArray(__spreadArray([], __read(stateNode.onExit), false), __read(stateNode.activities.map(function(activity) {
        return stop2(activity);
      })), false), _this.machine.options.actions);
    });
    var actions = exitActions.concat([toActionObjects(transition.actions, this.machine.options.actions)]).concat(entryActions);
    if (isDone) {
      var stopActions = toActionObjects(flatten(__spreadArray([], __read(resolvedConfig), false).sort(function(a, b) {
        return b.order - a.order;
      }).map(function(stateNode) {
        return stateNode.onExit;
      })), this.machine.options.actions).filter(function(action) {
        return action.type !== raise && (action.type !== send || !!action.to && action.to !== SpecialTargets.Internal);
      });
      return actions.concat([stopActions]);
    }
    return actions;
  };
  StateNode2.prototype.transition = function(state, event, context, exec) {
    if (state === void 0) {
      state = this.initialState;
    }
    var _event = toSCXMLEvent(event);
    var currentState;
    if (state instanceof State) {
      currentState = context === void 0 ? state : this.resolveState(State.from(state, context));
    } else {
      var resolvedStateValue = isString(state) ? this.resolve(pathToStateValue(this.getResolvedPath(state))) : this.resolve(state);
      var resolvedContext = context !== null && context !== void 0 ? context : this.machine.context;
      currentState = this.resolveState(State.from(resolvedStateValue, resolvedContext));
    }
    if (!IS_PRODUCTION && _event.name === WILDCARD) {
      throw new Error("An event cannot have the wildcard type ('".concat(WILDCARD, "')"));
    }
    if (this.strict) {
      if (!this.events.includes(_event.name) && !isBuiltInEvent(_event.name)) {
        throw new Error("Machine '".concat(this.id, "' does not accept event '").concat(_event.name, "'"));
      }
    }
    var stateTransition = this._transition(currentState.value, currentState, _event) || {
      transitions: [],
      configuration: [],
      exitSet: [],
      source: currentState,
      actions: []
    };
    var prevConfig = getConfiguration([], this.getStateNodes(currentState.value));
    var resolvedConfig = stateTransition.configuration.length ? getConfiguration(prevConfig, stateTransition.configuration) : prevConfig;
    stateTransition.configuration = __spreadArray([], __read(resolvedConfig), false);
    return this.resolveTransition(stateTransition, currentState, currentState.context, exec, _event);
  };
  StateNode2.prototype.resolveRaisedTransition = function(state, _event, originalEvent, predictableExec) {
    var _a2;
    var currentActions = state.actions;
    state = this.transition(state, _event, void 0, predictableExec);
    state._event = originalEvent;
    state.event = originalEvent.data;
    (_a2 = state.actions).unshift.apply(_a2, __spreadArray([], __read(currentActions), false));
    return state;
  };
  StateNode2.prototype.resolveTransition = function(stateTransition, currentState, context, predictableExec, _event) {
    var e_6, _a2, e_7, _b;
    var _this = this;
    if (_event === void 0) {
      _event = initEvent;
    }
    var configuration = stateTransition.configuration;
    var willTransition = !currentState || stateTransition.transitions.length > 0;
    var resolvedConfiguration = willTransition ? stateTransition.configuration : currentState ? currentState.configuration : [];
    var isDone = isInFinalState(resolvedConfiguration, this);
    var resolvedStateValue = willTransition ? getValue(this.machine, configuration) : void 0;
    var historyValue = currentState ? currentState.historyValue ? currentState.historyValue : stateTransition.source ? this.machine.historyValue(currentState.value) : void 0 : void 0;
    var actionBlocks = this.getActions(new Set(resolvedConfiguration), isDone, stateTransition, context, _event, currentState, predictableExec);
    var activities = currentState ? __assign({}, currentState.activities) : {};
    try {
      for (var actionBlocks_1 = __values(actionBlocks), actionBlocks_1_1 = actionBlocks_1.next(); !actionBlocks_1_1.done; actionBlocks_1_1 = actionBlocks_1.next()) {
        var block = actionBlocks_1_1.value;
        try {
          for (var block_1 = (e_7 = void 0, __values(block)), block_1_1 = block_1.next(); !block_1_1.done; block_1_1 = block_1.next()) {
            var action = block_1_1.value;
            if (action.type === start) {
              activities[action.activity.id || action.activity.type] = action;
            } else if (action.type === stop) {
              activities[action.activity.id || action.activity.type] = false;
            }
          }
        } catch (e_7_1) {
          e_7 = {
            error: e_7_1
          };
        } finally {
          try {
            if (block_1_1 && !block_1_1.done && (_b = block_1.return))
              _b.call(block_1);
          } finally {
            if (e_7)
              throw e_7.error;
          }
        }
      }
    } catch (e_6_1) {
      e_6 = {
        error: e_6_1
      };
    } finally {
      try {
        if (actionBlocks_1_1 && !actionBlocks_1_1.done && (_a2 = actionBlocks_1.return))
          _a2.call(actionBlocks_1);
      } finally {
        if (e_6)
          throw e_6.error;
      }
    }
    var _c = __read(resolveActions(this, currentState, context, _event, actionBlocks, predictableExec, this.machine.config.predictableActionArguments || this.machine.config.preserveActionOrder), 2), resolvedActions = _c[0], updatedContext = _c[1];
    var _d = __read(partition(resolvedActions, function(action2) {
      return action2.type === raise || action2.type === send && action2.to === SpecialTargets.Internal;
    }), 2), raisedEvents = _d[0], nonRaisedActions = _d[1];
    var invokeActions = resolvedActions.filter(function(action2) {
      var _a3;
      return action2.type === start && ((_a3 = action2.activity) === null || _a3 === void 0 ? void 0 : _a3.type) === invoke;
    });
    var children = invokeActions.reduce(function(acc, action2) {
      acc[action2.activity.id] = createInvocableActor(action2.activity, _this.machine, updatedContext, _event);
      return acc;
    }, currentState ? __assign({}, currentState.children) : {});
    var nextState = new State({
      value: resolvedStateValue || currentState.value,
      context: updatedContext,
      _event,
      _sessionid: currentState ? currentState._sessionid : null,
      historyValue: resolvedStateValue ? historyValue ? updateHistoryValue(historyValue, resolvedStateValue) : void 0 : currentState ? currentState.historyValue : void 0,
      history: !resolvedStateValue || stateTransition.source ? currentState : void 0,
      actions: resolvedStateValue ? nonRaisedActions : [],
      activities: resolvedStateValue ? activities : currentState ? currentState.activities : {},
      events: [],
      configuration: resolvedConfiguration,
      transitions: stateTransition.transitions,
      children,
      done: isDone,
      tags: getTagsFromConfiguration(resolvedConfiguration),
      machine: this
    });
    var didUpdateContext = context !== updatedContext;
    nextState.changed = _event.name === update || didUpdateContext;
    var history = nextState.history;
    if (history) {
      delete history.history;
    }
    var hasAlwaysTransitions = !isDone && (this._transient || configuration.some(function(stateNode) {
      return stateNode._transient;
    }));
    if (!willTransition && (!hasAlwaysTransitions || _event.name === NULL_EVENT)) {
      return nextState;
    }
    var maybeNextState = nextState;
    if (!isDone) {
      if (hasAlwaysTransitions) {
        maybeNextState = this.resolveRaisedTransition(maybeNextState, {
          type: nullEvent
        }, _event, predictableExec);
      }
      while (raisedEvents.length) {
        var raisedEvent = raisedEvents.shift();
        maybeNextState = this.resolveRaisedTransition(maybeNextState, raisedEvent._event, _event, predictableExec);
      }
    }
    var changed = maybeNextState.changed || (history ? !!maybeNextState.actions.length || didUpdateContext || typeof history.value !== typeof maybeNextState.value || !stateValuesEqual(maybeNextState.value, history.value) : void 0);
    maybeNextState.changed = changed;
    maybeNextState.history = history;
    return maybeNextState;
  };
  StateNode2.prototype.getStateNode = function(stateKey) {
    if (isStateId(stateKey)) {
      return this.machine.getStateNodeById(stateKey);
    }
    if (!this.states) {
      throw new Error("Unable to retrieve child state '".concat(stateKey, "' from '").concat(this.id, "'; no child states exist."));
    }
    var result = this.states[stateKey];
    if (!result) {
      throw new Error("Child state '".concat(stateKey, "' does not exist on '").concat(this.id, "'"));
    }
    return result;
  };
  StateNode2.prototype.getStateNodeById = function(stateId) {
    var resolvedStateId = isStateId(stateId) ? stateId.slice(STATE_IDENTIFIER.length) : stateId;
    if (resolvedStateId === this.id) {
      return this;
    }
    var stateNode = this.machine.idMap[resolvedStateId];
    if (!stateNode) {
      throw new Error("Child state node '#".concat(resolvedStateId, "' does not exist on machine '").concat(this.id, "'"));
    }
    return stateNode;
  };
  StateNode2.prototype.getStateNodeByPath = function(statePath) {
    if (typeof statePath === "string" && isStateId(statePath)) {
      try {
        return this.getStateNodeById(statePath.slice(1));
      } catch (e) {
      }
    }
    var arrayStatePath = toStatePath(statePath, this.delimiter).slice();
    var currentStateNode = this;
    while (arrayStatePath.length) {
      var key = arrayStatePath.shift();
      if (!key.length) {
        break;
      }
      currentStateNode = currentStateNode.getStateNode(key);
    }
    return currentStateNode;
  };
  StateNode2.prototype.resolve = function(stateValue) {
    var _a2;
    var _this = this;
    if (!stateValue) {
      return this.initialStateValue || EMPTY_OBJECT;
    }
    switch (this.type) {
      case "parallel":
        return mapValues(this.initialStateValue, function(subStateValue, subStateKey) {
          return subStateValue ? _this.getStateNode(subStateKey).resolve(stateValue[subStateKey] || subStateValue) : EMPTY_OBJECT;
        });
      case "compound":
        if (isString(stateValue)) {
          var subStateNode = this.getStateNode(stateValue);
          if (subStateNode.type === "parallel" || subStateNode.type === "compound") {
            return _a2 = {}, _a2[stateValue] = subStateNode.initialStateValue, _a2;
          }
          return stateValue;
        }
        if (!Object.keys(stateValue).length) {
          return this.initialStateValue || {};
        }
        return mapValues(stateValue, function(subStateValue, subStateKey) {
          return subStateValue ? _this.getStateNode(subStateKey).resolve(subStateValue) : EMPTY_OBJECT;
        });
      default:
        return stateValue || EMPTY_OBJECT;
    }
  };
  StateNode2.prototype.getResolvedPath = function(stateIdentifier) {
    if (isStateId(stateIdentifier)) {
      var stateNode = this.machine.idMap[stateIdentifier.slice(STATE_IDENTIFIER.length)];
      if (!stateNode) {
        throw new Error("Unable to find state node '".concat(stateIdentifier, "'"));
      }
      return stateNode.path;
    }
    return toStatePath(stateIdentifier, this.delimiter);
  };
  Object.defineProperty(StateNode2.prototype, "initialStateValue", {
    get: function() {
      var _a2;
      if (this.__cache.initialStateValue) {
        return this.__cache.initialStateValue;
      }
      var initialStateValue;
      if (this.type === "parallel") {
        initialStateValue = mapFilterValues(this.states, function(state) {
          return state.initialStateValue || EMPTY_OBJECT;
        }, function(stateNode) {
          return !(stateNode.type === "history");
        });
      } else if (this.initial !== void 0) {
        if (!this.states[this.initial]) {
          throw new Error("Initial state '".concat(this.initial, "' not found on '").concat(this.key, "'"));
        }
        initialStateValue = isLeafNode(this.states[this.initial]) ? this.initial : (_a2 = {}, _a2[this.initial] = this.states[this.initial].initialStateValue, _a2);
      } else {
        initialStateValue = {};
      }
      this.__cache.initialStateValue = initialStateValue;
      return this.__cache.initialStateValue;
    },
    enumerable: false,
    configurable: true
  });
  StateNode2.prototype.getInitialState = function(stateValue, context) {
    this._init();
    var configuration = this.getStateNodes(stateValue);
    return this.resolveTransition({
      configuration,
      exitSet: [],
      transitions: [],
      source: void 0,
      actions: []
    }, void 0, context !== null && context !== void 0 ? context : this.machine.context, void 0);
  };
  Object.defineProperty(StateNode2.prototype, "initialState", {
    get: function() {
      var initialStateValue = this.initialStateValue;
      if (!initialStateValue) {
        throw new Error("Cannot retrieve initial state from simple state '".concat(this.id, "'."));
      }
      return this.getInitialState(initialStateValue);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(StateNode2.prototype, "target", {
    get: function() {
      var target;
      if (this.type === "history") {
        var historyConfig = this.config;
        if (isString(historyConfig.target)) {
          target = isStateId(historyConfig.target) ? pathToStateValue(this.machine.getStateNodeById(historyConfig.target).path.slice(this.path.length - 1)) : historyConfig.target;
        } else {
          target = historyConfig.target;
        }
      }
      return target;
    },
    enumerable: false,
    configurable: true
  });
  StateNode2.prototype.getRelativeStateNodes = function(relativeStateId, historyValue, resolve) {
    if (resolve === void 0) {
      resolve = true;
    }
    return resolve ? relativeStateId.type === "history" ? relativeStateId.resolveHistory(historyValue) : relativeStateId.initialStateNodes : [relativeStateId];
  };
  Object.defineProperty(StateNode2.prototype, "initialStateNodes", {
    get: function() {
      var _this = this;
      if (isLeafNode(this)) {
        return [this];
      }
      if (this.type === "compound" && !this.initial) {
        if (!IS_PRODUCTION) {
          warn(false, "Compound state node '".concat(this.id, "' has no initial state."));
        }
        return [this];
      }
      var initialStateNodePaths = toStatePaths(this.initialStateValue);
      return flatten(initialStateNodePaths.map(function(initialPath) {
        return _this.getFromRelativePath(initialPath);
      }));
    },
    enumerable: false,
    configurable: true
  });
  StateNode2.prototype.getFromRelativePath = function(relativePath) {
    if (!relativePath.length) {
      return [this];
    }
    var _a2 = __read(relativePath), stateKey = _a2[0], childStatePath = _a2.slice(1);
    if (!this.states) {
      throw new Error("Cannot retrieve subPath '".concat(stateKey, "' from node with no states"));
    }
    var childStateNode = this.getStateNode(stateKey);
    if (childStateNode.type === "history") {
      return childStateNode.resolveHistory();
    }
    if (!this.states[stateKey]) {
      throw new Error("Child state '".concat(stateKey, "' does not exist on '").concat(this.id, "'"));
    }
    return this.states[stateKey].getFromRelativePath(childStatePath);
  };
  StateNode2.prototype.historyValue = function(relativeStateValue) {
    if (!Object.keys(this.states).length) {
      return void 0;
    }
    return {
      current: relativeStateValue || this.initialStateValue,
      states: mapFilterValues(this.states, function(stateNode, key) {
        if (!relativeStateValue) {
          return stateNode.historyValue();
        }
        var subStateValue = isString(relativeStateValue) ? void 0 : relativeStateValue[key];
        return stateNode.historyValue(subStateValue || stateNode.initialStateValue);
      }, function(stateNode) {
        return !stateNode.history;
      })
    };
  };
  StateNode2.prototype.resolveHistory = function(historyValue) {
    var _this = this;
    if (this.type !== "history") {
      return [this];
    }
    var parent = this.parent;
    if (!historyValue) {
      var historyTarget = this.target;
      return historyTarget ? flatten(toStatePaths(historyTarget).map(function(relativeChildPath) {
        return parent.getFromRelativePath(relativeChildPath);
      })) : parent.initialStateNodes;
    }
    var subHistoryValue = nestedPath(parent.path, "states")(historyValue).current;
    if (isString(subHistoryValue)) {
      return [parent.getStateNode(subHistoryValue)];
    }
    return flatten(toStatePaths(subHistoryValue).map(function(subStatePath) {
      return _this.history === "deep" ? parent.getFromRelativePath(subStatePath) : [parent.states[subStatePath[0]]];
    }));
  };
  Object.defineProperty(StateNode2.prototype, "stateIds", {
    get: function() {
      var _this = this;
      var childStateIds = flatten(Object.keys(this.states).map(function(stateKey) {
        return _this.states[stateKey].stateIds;
      }));
      return [this.id].concat(childStateIds);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(StateNode2.prototype, "events", {
    get: function() {
      var e_8, _a2, e_9, _b;
      if (this.__cache.events) {
        return this.__cache.events;
      }
      var states = this.states;
      var events = new Set(this.ownEvents);
      if (states) {
        try {
          for (var _c = __values(Object.keys(states)), _d = _c.next(); !_d.done; _d = _c.next()) {
            var stateId = _d.value;
            var state = states[stateId];
            if (state.states) {
              try {
                for (var _e = (e_9 = void 0, __values(state.events)), _f = _e.next(); !_f.done; _f = _e.next()) {
                  var event_1 = _f.value;
                  events.add("".concat(event_1));
                }
              } catch (e_9_1) {
                e_9 = {
                  error: e_9_1
                };
              } finally {
                try {
                  if (_f && !_f.done && (_b = _e.return))
                    _b.call(_e);
                } finally {
                  if (e_9)
                    throw e_9.error;
                }
              }
            }
          }
        } catch (e_8_1) {
          e_8 = {
            error: e_8_1
          };
        } finally {
          try {
            if (_d && !_d.done && (_a2 = _c.return))
              _a2.call(_c);
          } finally {
            if (e_8)
              throw e_8.error;
          }
        }
      }
      return this.__cache.events = Array.from(events);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(StateNode2.prototype, "ownEvents", {
    get: function() {
      var events = new Set(this.transitions.filter(function(transition) {
        return !(!transition.target && !transition.actions.length && transition.internal);
      }).map(function(transition) {
        return transition.eventType;
      }));
      return Array.from(events);
    },
    enumerable: false,
    configurable: true
  });
  StateNode2.prototype.resolveTarget = function(_target) {
    var _this = this;
    if (_target === void 0) {
      return void 0;
    }
    return _target.map(function(target) {
      if (!isString(target)) {
        return target;
      }
      var isInternalTarget = target[0] === _this.delimiter;
      if (isInternalTarget && !_this.parent) {
        return _this.getStateNodeByPath(target.slice(1));
      }
      var resolvedTarget = isInternalTarget ? _this.key + target : target;
      if (_this.parent) {
        try {
          var targetStateNode = _this.parent.getStateNodeByPath(resolvedTarget);
          return targetStateNode;
        } catch (err) {
          throw new Error("Invalid transition definition for state node '".concat(_this.id, "':\n").concat(err.message));
        }
      } else {
        return _this.getStateNodeByPath(resolvedTarget);
      }
    });
  };
  StateNode2.prototype.formatTransition = function(transitionConfig) {
    var _this = this;
    var normalizedTarget = normalizeTarget(transitionConfig.target);
    var internal = "internal" in transitionConfig ? transitionConfig.internal : normalizedTarget ? normalizedTarget.some(function(_target) {
      return isString(_target) && _target[0] === _this.delimiter;
    }) : true;
    var guards = this.machine.options.guards;
    var target = this.resolveTarget(normalizedTarget);
    var transition = __assign(__assign({}, transitionConfig), {
      actions: toActionObjects(toArray(transitionConfig.actions)),
      cond: toGuard(transitionConfig.cond, guards),
      target,
      source: this,
      internal,
      eventType: transitionConfig.event,
      toJSON: function() {
        return __assign(__assign({}, transition), {
          target: transition.target ? transition.target.map(function(t) {
            return "#".concat(t.id);
          }) : void 0,
          source: "#".concat(_this.id)
        });
      }
    });
    return transition;
  };
  StateNode2.prototype.formatTransitions = function() {
    var e_10, _a2;
    var _this = this;
    var onConfig;
    if (!this.config.on) {
      onConfig = [];
    } else if (Array.isArray(this.config.on)) {
      onConfig = this.config.on;
    } else {
      var _b = this.config.on, _c = WILDCARD, _d = _b[_c], wildcardConfigs = _d === void 0 ? [] : _d, strictTransitionConfigs_1 = __rest(_b, [typeof _c === "symbol" ? _c : _c + ""]);
      onConfig = flatten(Object.keys(strictTransitionConfigs_1).map(function(key) {
        if (!IS_PRODUCTION && key === NULL_EVENT) {
          warn(false, "Empty string transition configs (e.g., `{ on: { '': ... }}`) for transient transitions are deprecated. Specify the transition in the `{ always: ... }` property instead. " + 'Please check the `on` configuration for "#'.concat(_this.id, '".'));
        }
        var transitionConfigArray = toTransitionConfigArray(key, strictTransitionConfigs_1[key]);
        if (!IS_PRODUCTION) {
          validateArrayifiedTransitions(_this, key, transitionConfigArray);
        }
        return transitionConfigArray;
      }).concat(toTransitionConfigArray(WILDCARD, wildcardConfigs)));
    }
    var eventlessConfig = this.config.always ? toTransitionConfigArray("", this.config.always) : [];
    var doneConfig = this.config.onDone ? toTransitionConfigArray(String(done(this.id)), this.config.onDone) : [];
    if (!IS_PRODUCTION) {
      warn(!(this.config.onDone && !this.parent), 'Root nodes cannot have an ".onDone" transition. Please check the config of "'.concat(this.id, '".'));
    }
    var invokeConfig = flatten(this.invoke.map(function(invokeDef) {
      var settleTransitions = [];
      if (invokeDef.onDone) {
        settleTransitions.push.apply(settleTransitions, __spreadArray([], __read(toTransitionConfigArray(String(doneInvoke(invokeDef.id)), invokeDef.onDone)), false));
      }
      if (invokeDef.onError) {
        settleTransitions.push.apply(settleTransitions, __spreadArray([], __read(toTransitionConfigArray(String(error2(invokeDef.id)), invokeDef.onError)), false));
      }
      return settleTransitions;
    }));
    var delayedTransitions = this.after;
    var formattedTransitions = flatten(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], __read(doneConfig), false), __read(invokeConfig), false), __read(onConfig), false), __read(eventlessConfig), false).map(function(transitionConfig) {
      return toArray(transitionConfig).map(function(transition) {
        return _this.formatTransition(transition);
      });
    }));
    try {
      for (var delayedTransitions_1 = __values(delayedTransitions), delayedTransitions_1_1 = delayedTransitions_1.next(); !delayedTransitions_1_1.done; delayedTransitions_1_1 = delayedTransitions_1.next()) {
        var delayedTransition = delayedTransitions_1_1.value;
        formattedTransitions.push(delayedTransition);
      }
    } catch (e_10_1) {
      e_10 = {
        error: e_10_1
      };
    } finally {
      try {
        if (delayedTransitions_1_1 && !delayedTransitions_1_1.done && (_a2 = delayedTransitions_1.return))
          _a2.call(delayedTransitions_1);
      } finally {
        if (e_10)
          throw e_10.error;
      }
    }
    return formattedTransitions;
  };
  return StateNode2;
}();

// ../../node_modules/xstate/es/Machine.js
function Machine(config, options, initialContext) {
  if (initialContext === void 0) {
    initialContext = config.context;
  }
  return new StateNode(config, options, initialContext);
}

// ../../node_modules/xstate/es/index.js
var assign3 = assign2;

// src/panel/machine.ts
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
var machine = Machine(
  {
    id: "panel",
    initial: "waiting",
    context: initial,
    states: {
      waiting: {
        entry: assign3(() => initial),
        on: {
          LOADED: {
            target: "active",
            actions: assign3((context, event) => {
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
                  assign3({
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
                actions: assign3((context) => {
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
                actions: assign3((context) => {
                  return {
                    ...context,
                    message: "Result saved"
                  };
                })
              },
              LOAD_FROM_FILE: {
                internal: true,
                target: "idle",
                actions: assign3((context, event) => {
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
                actions: assign3((context) => {
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
                actions: assign3({
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
      clearMessage: assign3((context) => {
        return {
          ...context,
          message: null
        };
      })
    }
  }
);
var machine_default = machine;

export {
  machine_default
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
