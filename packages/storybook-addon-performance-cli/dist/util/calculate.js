"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.performCalculations = exports.median = exports.combineTaskResultsByGroupId = exports.convertToTaskValueMap = void 0;
const getTaskValue = (result) => {
    if ('averageMs' in result) {
        return result.averageMs;
    }
    if ('value' in result) {
        return Number(result.value);
    }
    return null;
};
const convertToTaskValueMap = (resultMap) => {
    return Object.values(resultMap).reduce((acc, result) => {
        return { ...acc, [result.taskName]: [getTaskValue(result)] };
    }, {});
};
exports.convertToTaskValueMap = convertToTaskValueMap;
const combineTaskResultsByGroupId = (results, [groupId, taskValueMap]) => {
    Object.entries(taskValueMap).forEach(([taskName, value]) => {
        results[groupId] = {
            ...results[groupId],
            [taskName]: results[groupId] && results[groupId][taskName]
                ? results[groupId][taskName].concat(value)
                : value,
        };
    });
    return results;
};
exports.combineTaskResultsByGroupId = combineTaskResultsByGroupId;
const median = (numbers) => {
    const sorted = numbers.slice().sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);
    if (sorted.length % 2 === 0) {
        return (sorted[middle - 1] + sorted[middle]) / 2;
    }
    return sorted[middle];
};
exports.median = median;
const performCalculations = (data) => {
    const numberOfSamples = Object.values(data)[0].length;
    return Object.entries(data).map(([key, values]) => ({
        key,
        numberOfSamples,
        samples: values,
        minValue: Math.min(...values),
        maxValue: Math.max(...values),
        meanValue: values.reduce((acc, curr) => acc + curr, 0) / numberOfSamples,
        medianValue: (0, exports.median)(values),
    }));
};
exports.performCalculations = performCalculations;
