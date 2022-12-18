"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const calculate_1 = require("./util/calculate");
const write_1 = require("./util/write");
const calculate = (resultsByType) => {
    const calculationsByResultType = Object.fromEntries(resultsByType
        .map(({ type, ...resultsByGroupId }) => [type, resultsByGroupId])
        .map(([type, resultsByGroupId]) => [type, Object.entries(resultsByGroupId)])
        .map((entry) => entry)
        .map(([type, resultByGroupId]) => [
        type,
        resultByGroupId.map(([groupId, result]) => [groupId, (0, calculate_1.performCalculations)(result)]),
    ])
        .map((entry) => entry)
        .map(([type, calculationsByGroupId]) => [type, Object.fromEntries(calculationsByGroupId)]));
    Object.entries(calculationsByResultType).forEach(([directoryName, output]) => {
        (0, write_1.writeFile)(types_1.ProcessDescription.Calculate, directoryName, JSON.stringify(output));
    });
    return calculationsByResultType;
};
exports.default = calculate;
