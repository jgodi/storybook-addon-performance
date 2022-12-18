import { Channel } from '@storybook/channels';

type Binding = {
    eventName: string;
    fn: (...args: any[]) => void;
};
declare function bind(channel: Channel, binding: Binding): () => void;
declare function bindAll(channel: Channel, bindings: Binding[]): () => void;

export { Binding, bind, bindAll };
