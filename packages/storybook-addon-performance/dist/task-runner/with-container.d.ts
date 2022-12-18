declare function withContainer<T>(fn: (container: HTMLElement) => Promise<T>): Promise<T>;

export { withContainer as default };
