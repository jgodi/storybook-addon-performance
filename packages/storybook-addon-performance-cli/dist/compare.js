"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const compare_1 = require("./util/compare");
const write_1 = require("./util/write");
const compare = (baseline, current) => {
    const allDiffs = Object.entries(current)
        .map(([groupId, current]) => [groupId, current, baseline[groupId]])
        .map(([groupId, current, baseline]) => ({
        [groupId]: current.map((0, compare_1.calculateDifference)(baseline)),
    }))
        .reduce((acc, val) => ({ ...acc, ...val }));
    (0, write_1.writeFile)(types_1.ProcessDescription.Compare, 'current-vs-baseline', JSON.stringify(allDiffs));
    return allDiffs;
};
exports.default = compare;
