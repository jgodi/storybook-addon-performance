"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const calculate_1 = require("./calculate");
const compare_1 = require("./compare");
const adf_1 = require("./adf");
const calculate_2 = require("./util/calculate");
const print_1 = require("./util/print");
const main = (...args) => {
    const cliArgs = args.length ? args : process.argv;
    if (cliArgs.length <= 2) {
        return (0, print_1.usage)();
    }
    const input = cliArgs.slice(2);
    const resultTypes = { '-b': 'baseline', '-c': 'current' };
    const flags = Object.keys(resultTypes);
    const inputPaths = input
        .map((arg, i) => (flags.includes(arg) ? { [resultTypes[arg]]: input[i + 1] } : {}))
        .reduce((acc, val) => ({ ...acc, ...val }));
    if (Object.entries(inputPaths).length < 2) {
        return (0, print_1.usage)();
    }
    const resultsByType = Object.entries(inputPaths).map(([type, pathName]) => {
        const files = fs.readdirSync(pathName, 'utf-8');
        if (!files) {
            return (0, print_1.debug)(`💔 Directory '${pathName}' is empty - ` +
                'did you specify a directory with storybook-addon-performance output files?');
        }
        try {
            const resultsByGroupId = files
                .map((dataFile) => {
                const json = fs.readFileSync(path.join(pathName, dataFile));
                return JSON.parse(json.toString());
            })
                .map(({ results }) => results)
                .flatMap((taskGroupResults) => taskGroupResults)
                .map(({ groupId, map }) => [groupId, (0, calculate_2.convertToTaskValueMap)(map)])
                .reduce(calculate_2.combineTaskResultsByGroupId, {});
            return { type, ...resultsByGroupId };
        }
        catch (e) {
            return (0, print_1.debug)(`💔 Problem parsing a file in '${pathName}' - ` +
                'was this created by the storybook-addon-performance? \n', e);
        }
    });
    const calulationsByResultType = (0, calculate_1.default)(resultsByType);
    const { baseline, current } = calulationsByResultType;
    const calculationsWithDiff = (0, compare_1.default)(baseline, current);
    (0, adf_1.default)(calculationsWithDiff);
};
exports.default = main;
