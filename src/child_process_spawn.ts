import { spawn } from "node:child_process";

type SpawnParams = Parameters<typeof spawn>;

export const childProcessSpawn = (
  command: SpawnParams[0],
  args: SpawnParams[1],
  options: SpawnParams[2] & { output?: boolean } = { output: true }
) => {
  const cp = spawn(command, args, {
    cwd: process.cwd(),
    ...options,
    stdio: [process.stdin, "pipe", process.stderr],
    shell: true,
  });

  if (options.output) {
    const buffers: Uint8Array[] = [];
    cp.stdout!.on("data", buffers.push);

    cp.on("close", (code) => {
      console.log("-- child process start --");
      console.log("child process exited with code", code);
      console.log("stdout: ", Buffer.concat(buffers).toString("utf-8").trim());
      console.log("-- child process end --");
    });
  }
};
