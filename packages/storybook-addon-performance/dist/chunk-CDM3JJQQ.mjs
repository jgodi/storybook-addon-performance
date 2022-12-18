// src/util/pluralise.ts
function pluralise({ value, single, multiple }) {
  return value === 1 ? single : multiple;
}
function pluraliseCopies(copies) {
  return pluralise({ value: copies, single: "copy", multiple: "copies" });
}
function pluraliseSamples(samples) {
  return pluralise({ value: samples, single: "sample", multiple: "samples" });
}

export {
  pluralise,
  pluraliseCopies,
  pluraliseSamples
};
