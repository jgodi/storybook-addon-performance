"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildResultCell = exports.buildNameCell = exports.buildTableRows = exports.buildTable = exports.buildAdf = void 0;
const buildAdf = (content) => ({
    version: 1,
    type: 'doc',
    content,
});
exports.buildAdf = buildAdf;
const buildTable = (heading, tableRows) => [
    {
        type: 'heading',
        attrs: {
            level: 2,
        },
        content: [
            {
                type: 'text',
                text: heading,
            },
        ],
    },
    {
        type: 'table',
        attrs: {
            isNumberColumnEnabled: false,
            layout: 'default',
        },
        content: [
            {
                type: 'tableRow',
                content: [
                    {
                        type: 'tableHeader',
                        content: [
                            {
                                type: 'paragraph',
                                content: [],
                            },
                        ],
                    },
                    {
                        type: 'tableHeader',
                        content: [
                            {
                                type: 'paragraph',
                                content: [
                                    {
                                        type: 'text',
                                        text: 'Baseline',
                                        marks: [
                                            {
                                                type: 'strong',
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                type: 'paragraph',
                                content: [
                                    {
                                        type: 'text',
                                        text: 'This should test the component before any changes.',
                                        marks: [
                                            {
                                                type: 'subsup',
                                                attrs: {
                                                    type: 'sup',
                                                },
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        type: 'tableHeader',
                        content: [
                            {
                                type: 'paragraph',
                                content: [
                                    {
                                        type: 'text',
                                        text: 'Current state',
                                        marks: [
                                            {
                                                type: 'strong',
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                type: 'paragraph',
                                content: [
                                    {
                                        type: 'text',
                                        text: 'This should test the fully converted component.',
                                        marks: [
                                            {
                                                type: 'subsup',
                                                attrs: {
                                                    type: 'sup',
                                                },
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            ...tableRows,
        ],
    },
];
exports.buildTable = buildTable;
const buildTableRows = (result) => {
    const name = (0, exports.buildNameCell)(result.key);
    if ('diffPercentage' in result) {
        const { baseline, current, diffPercentage } = result;
        return {
            type: 'tableRow',
            content: [name, (0, exports.buildResultCell)(baseline), (0, exports.buildResultCell)(current, diffPercentage)],
        };
    }
    const missingBaseline = {
        medianValue: 0,
        numberOfSamples: 0,
        samples: [0],
        minValue: 0,
        maxValue: 0,
        meanValue: 0,
    };
    return {
        type: 'tableRow',
        content: [name, (0, exports.buildResultCell)(missingBaseline), (0, exports.buildResultCell)(result)],
    };
};
exports.buildTableRows = buildTableRows;
const buildNameCell = (key) => {
    return {
        type: 'tableCell',
        attrs: {
            background: '#f4f5f7',
        },
        content: [
            {
                type: 'paragraph',
                content: [
                    {
                        type: 'text',
                        text: key,
                        marks: [
                            {
                                type: 'strong',
                            },
                        ],
                    },
                ],
            },
        ],
    };
};
exports.buildNameCell = buildNameCell;
const buildResultCell = ({ medianValue, numberOfSamples, samples }, diff) => {
    return {
        type: 'tableCell',
        content: [
            {
                type: 'paragraph',
                content: [
                    {
                        type: 'text',
                        text: medianValue.toFixed(2),
                    },
                    ...buildDiffStatus(diff),
                ],
            },
            {
                type: 'nestedExpand',
                attrs: {
                    title: `Raw runs (${numberOfSamples} times)`,
                },
                content: [
                    {
                        type: 'paragraph',
                        content: [
                            {
                                type: 'text',
                                text: samples.map((num) => num && num.toFixed(2)).join('\t'),
                            },
                        ],
                    },
                ],
            },
        ],
    };
};
exports.buildResultCell = buildResultCell;
const getStatusColor = (diff) => {
    if (diff < 0) {
        return 'green';
    }
    else if (diff > 0) {
        return 'red';
    }
    return 'neutral';
};
const buildDiffStatus = (diff) => {
    if (!diff) {
        return [];
    }
    return [
        {
            type: 'text',
            text: ' ',
        },
        {
            type: 'status',
            attrs: {
                text: String(diff.toFixed(2)) + '%',
                color: getStatusColor(diff),
                style: 'bold',
            },
        },
        {
            type: 'text',
            text: ' ',
        },
    ];
};
