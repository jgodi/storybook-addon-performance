import { Channel } from '@storybook/channels';
import react__default from 'react';
import { PublicInteractionTask, AllowedGroup } from '../types.js';

type Props = {
    getNode: () => react__default.ReactNode;
    channel: Channel;
    interactions: PublicInteractionTask[];
    allowedGroups: AllowedGroup[];
};
declare function TaskHarness({ getNode, channel, interactions, allowedGroups }: Props): react__default.ReactElement<any, string | react__default.JSXElementConstructor<any>>;

export { TaskHarness as default };
