"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adf_1 = require("./util/adf");
const types_1 = require("./types");
const write_1 = require("./util/write");
const adf = (calculationsByGroupId) => {
    const outputTables = Object.entries(calculationsByGroupId)
        .map(([key, results]) => (0, adf_1.buildTable)(key, results.map(adf_1.buildTableRows)))
        .flatMap((table) => table);
    const adf = (0, adf_1.buildAdf)(outputTables);
    (0, write_1.writeFile)(types_1.ProcessDescription.ADF, 'adf', JSON.stringify(adf));
};
exports.default = adf;
