import react__default from 'react';

type ExpandedArgs = {
    isExpanded: boolean;
};
type Props = {
    name: string;
    result: react__default.ReactNode;
    getExpanded: (args: ExpandedArgs) => react__default.ReactNode;
};
declare function ExpandingResult({ name, result, getExpanded }: Props): JSX.Element;

export { ExpandedArgs, ExpandingResult };
