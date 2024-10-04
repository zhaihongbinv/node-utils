import { spawn } from "node:child_process";
type SpawnParams = Parameters<typeof spawn>;
export declare const childProcessSpawn: (command: SpawnParams[0], args: SpawnParams[1], options?: SpawnParams[2] & {
    log?: boolean;
}) => Promise<string>;
export {};
