import react__default from 'react';

type Args = {
    getNode: () => react__default.ReactNode;
    copies: number;
};
declare function toSafeElement({ getNode, copies }: Args): react__default.ReactElement;

export { toSafeElement as default };
