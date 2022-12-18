type MapArgs<FromValue, ToValue> = {
    source: FromValue[];
    map: (item: FromValue, index: number, list: FromValue[]) => Promise<ToValue>;
};
declare function asyncMap<FromValue, ToValue>({ source, map, }: MapArgs<FromValue, ToValue>): Promise<ToValue[]>;
type ForArgs = {
    count: number;
    fn: (index: number) => Promise<void>;
};
declare function asyncFor({ count, fn }: ForArgs): Promise<void>;

export { asyncFor, asyncMap };
