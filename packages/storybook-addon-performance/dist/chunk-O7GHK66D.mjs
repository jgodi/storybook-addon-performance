// src/util/flatten.ts
function flatten(lists) {
  return Array.prototype.concat.apply([], lists);
}

export {
  flatten
};
