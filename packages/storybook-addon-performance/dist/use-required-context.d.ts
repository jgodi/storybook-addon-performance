import { Context } from 'react';
import { Nullable } from './types.js';

declare function useRequiredContext<T>(Context: Context<Nullable<T>>): T | never;

export { useRequiredContext as default };
