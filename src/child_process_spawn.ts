import { spawn } from "node:child_process";

type SpawnParams = Parameters<typeof spawn>;

export const childProcessSpawn = (
  command: SpawnParams[0],
  args: SpawnParams[1],
  options: SpawnParams[2] & { log?: boolean } = { log: false }
) => {
  return new Promise<string>((resolve, reject) => {
    const cp = spawn(command, args, {
      cwd: process.cwd(),
      ...options,
      stdio: [process.stdin, "pipe", process.stderr],
      shell: true,
    });

    cp.on("error", (err) => {
      console.error("child process error", err);
      reject(err);
    });

    cp.on("close", (code) => {
      const result = Buffer.concat(buffers).toString("utf-8").trim();
      resolve(result);
      if (options.log) {
        console.log("-- child process start --");
        console.log("child process exited with code", code);
        console.log("stdout: ", result);
        console.log("-- child process end --");
      }
    });

    const buffers: Uint8Array[] = [];
    cp.stdout!.on("data", (chunk) => buffers.push(chunk as Uint8Array));
  });
};
