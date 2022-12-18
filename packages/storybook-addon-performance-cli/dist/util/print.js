"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usage = exports.stdout = exports.debug = void 0;
const debug = (...args) => console.warn(...args);
exports.debug = debug;
const stdout = (...args) => console.log(...args);
exports.stdout = stdout;
const usage = () => (0, exports.debug)(`
  Please input two directories – one containing the current test results,
  and one containing the baseline to compare it against.

  Usage
    $ sb-perf -c <[current-results-path]> -b <[baseline-path]>

    Arguments
      -c        Directory of performance test results of current state
      -b        Directory of baseline test results

    Example
      $ sb-perf -c current -b baseline
`);
exports.usage = usage;
