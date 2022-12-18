declare function mark<T>(taskName: string, fn: () => Promise<T>): Promise<T>;

export { mark as default };
