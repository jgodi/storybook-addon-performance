"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeFile = void 0;
const fs = require("fs");
const print_1 = require("./print");
const writeFile = (description, fileName, content) => {
    const outputDir = 'sb-perf';
    const outputPath = `${fileName}.json`;
    fs.existsSync(outputDir) || fs.mkdirSync(outputDir);
    fs.writeFile(outputDir + '/' + outputPath, content, 'utf-8', (e) => {
        if (e) {
            return (0, print_1.debug)('💔 An error occurred – ', e);
        }
        (0, print_1.stdout)(`✨ ${description} is saved to ${outputDir}/${outputPath}!`);
    });
};
exports.writeFile = writeFile;
