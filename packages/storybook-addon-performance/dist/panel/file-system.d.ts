import { RunContext } from './machine.js';
import 'xstate';
import '../types.js';

declare function saveFile(storyName: string, current: RunContext): void;
declare function readFile(e: React.FormEvent<HTMLInputElement>, callback: (context: RunContext, storyFile: string) => void): void;

export { readFile, saveFile };
