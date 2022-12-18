import {
  toFixed
} from "./chunk-2VA53ZMH.mjs";

// src/util/convert-bytes-to.ts
function bytesToKiloBytes(bytes) {
  return toFixed(bytes / Math.pow(10, 3));
}
function bytesToMegaBytes(bytes) {
  return toFixed(bytes / Math.pow(10, 6));
}

export {
  bytesToKiloBytes,
  bytesToMegaBytes
};
