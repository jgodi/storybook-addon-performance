"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateDifference = void 0;
const calculateDifference = (baseline) => ({ key, ...current }, index) => ({
    key,
    current,
    baseline: baseline[index],
    diffPercentage: (current.medianValue / baseline[index].medianValue) * 100 - 100,
});
exports.calculateDifference = calculateDifference;
