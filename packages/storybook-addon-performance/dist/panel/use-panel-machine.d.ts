import * as xstate from 'xstate';
import { MachineType, MachineContext, MachineEvents, MachineSchema } from './machine.js';
import { Channel } from '@storybook/channels';
import '../types.js';

declare function usePanelMachine(machine: MachineType, channel: Channel): {
    state: xstate.State<MachineContext, MachineEvents, MachineSchema, {
        value: any;
        context: MachineContext;
    }, xstate.ResolveTypegenMeta<xstate.TypegenDisabled, MachineEvents, xstate.BaseActionObject, xstate.ServiceMap>>;
    send: (event: xstate.SingleOrArray<xstate.Event<MachineEvents>> | xstate.SCXML.Event<MachineEvents>, payload?: xstate.EventData | undefined) => xstate.State<MachineContext, MachineEvents, MachineSchema, {
        value: any;
        context: MachineContext;
    }, xstate.ResolveTypegenMeta<xstate.TypegenDisabled, MachineEvents, xstate.BaseActionObject, xstate.ServiceMap>>;
    service: xstate.Interpreter<MachineContext, MachineSchema, MachineEvents, {
        value: any;
        context: MachineContext;
    }, xstate.ResolveTypegenMeta<xstate.TypegenDisabled, MachineEvents, xstate.BaseActionObject, xstate.ServiceMap>>;
};

export { usePanelMachine as default };
