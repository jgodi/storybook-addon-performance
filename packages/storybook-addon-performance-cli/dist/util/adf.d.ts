import { Calculation, CalculationWithDiff } from '../types';
interface Attributes {
    title?: string;
    text?: string;
    color?: string;
    style?: string;
    background?: string;
    isNumberColumnEnabled?: boolean;
    layout?: string;
}
export interface Content {
    type: string;
    attrs?: Attributes;
    text?: string;
    content?: Content[];
    marks?: {
        type: string;
    }[];
}
export declare const buildAdf: (content: Content[]) => {
    version: number;
    type: string;
    content: Content[];
};
export declare const buildTable: (heading: string, tableRows: Content[]) => ({
    type: string;
    attrs: {
        level: number;
        isNumberColumnEnabled?: undefined;
        layout?: undefined;
    };
    content: {
        type: string;
        text: string;
    }[];
} | {
    type: string;
    attrs: {
        isNumberColumnEnabled: boolean;
        layout: string;
        level?: undefined;
    };
    content: (Content | {
        type: string;
        content: {
            type: string;
            content: ({
                type: string;
                content: {
                    type: string;
                    text: string;
                    marks: {
                        type: string;
                    }[];
                }[];
            } | {
                type: string;
                content: {
                    type: string;
                    text: string;
                    marks: {
                        type: string;
                        attrs: {
                            type: string;
                        };
                    }[];
                }[];
            })[];
        }[];
    })[];
})[];
export declare const buildTableRows: (result: CalculationWithDiff | Calculation) => Content;
export declare const buildNameCell: (key: string) => Content;
export declare const buildResultCell: ({ medianValue, numberOfSamples, samples }: Omit<Calculation, 'key'>, diff?: number) => Content;
export {};
