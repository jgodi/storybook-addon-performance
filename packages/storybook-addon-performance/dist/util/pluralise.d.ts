type Args = {
    value: number;
    single: string;
    multiple: string;
};
declare function pluralise({ value, single, multiple }: Args): string;
declare function pluraliseCopies(copies: number): string;
declare function pluraliseSamples(samples: number): string;

export { pluralise, pluraliseCopies, pluraliseSamples };
