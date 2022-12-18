import { Channel } from '@storybook/channels';
import { PublicInteractionTask, AllowedGroup } from '../types.js';

declare function Panel({ channel, interactions, allowedGroups, }: {
    channel: Channel;
    interactions: PublicInteractionTask[];
    allowedGroups: AllowedGroup[];
}): JSX.Element;

export { Panel as default };
