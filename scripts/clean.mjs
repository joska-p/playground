#!/usr/bin/env node
import { spawnSync } from "child_process";
import { stdin as input, stdout as output } from "process";
import readline from "readline/promises";

const rl = readline.createInterface({ input, output });

const CONFIRM_TOKEN = "CLEAN";
const answer = await rl.question(`Type ${CONFIRM_TOKEN} to permanently remove build/artifacts: `);
rl.close();

if (answer !== CONFIRM_TOKEN) {
  console.log("Aborted.");
  process.exit(0);
}

const run = (cmd, args) => {
  const res = spawnSync(cmd, args, { stdio: "inherit" });
  if (res.error) throw res.error;
  if (res.status !== 0) throw new Error(`${cmd} ${args.join(" ")} exited with ${res.status}`);
};

try {
  run("turbo", ["daemon", "stop"]);
  run("turbo", ["clean"]);
  run("pnpm", [
    "-r",
    "--parallel",
    "exec",
    "rm",
    "-rf",
    "node_modules",
    ".turbo",
    "dist",
    ".next",
    ".astro",
  ]);
  console.log("Clean complete.");
} catch (err) {
  console.error("Error during clean:", err.message);
  process.exit(1);
}
