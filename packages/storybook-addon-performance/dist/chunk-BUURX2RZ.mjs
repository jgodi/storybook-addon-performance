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

export {
  bind,
  bindAll
};
