declare function getResultMap<T extends {
    taskName: string;
}>(list: T[]): Record<string, T>;

export { getResultMap as default };
