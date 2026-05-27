#!/usr/bin/env node
import { spawnSync } from "child_process";
import { rm } from "fs/promises";
import path from "path";
import process, { stdin as input, stdout as output } from "process";
import readline from "readline/promises";

const CONFIRM_TOKEN = "CLEAN";
const args = process.argv.slice(2);
const FORCE = args.includes("--yes") || args.includes("--force") || args.includes("-y");
const VERBOSE = args.includes("--verbose") || args.includes("-v");

const log = (...s) => {
  if (VERBOSE) console.log(...s);
};
const fail = (msg, code = 1) => {
  console.error(msg);
  process.exit(code);
};

const pathsToRemove = ["node_modules", ".turbo", "dist", ".next", ".astro"].map((p) =>
  path.resolve(process.cwd(), p)
);

async function confirm() {
  if (FORCE) return true;
  const rl = readline.createInterface({ input, output });
  const answer = await rl.question(`Type ${CONFIRM_TOKEN} to permanently remove build/artifacts: `);
  rl.close();
  return answer.trim().toUpperCase() === CONFIRM_TOKEN;
}

function checkTool(cmd, versionArg = "--version") {
  try {
    const res = spawnSync(cmd, [versionArg], { stdio: "pipe" });
    return res.status === 0;
  } catch {
    return false;
  }
}

function runSync(cmd, argsArr, opts = {}) {
  const res = spawnSync(cmd, argsArr, { stdio: opts.capture ? "pipe" : "inherit" });
  if (res.error) throw res.error;
  if (res.status !== 0) {
    const stdout = res.stdout ? res.stdout.toString() : "";
    const stderr = res.stderr ? res.stderr.toString() : "";
    const msg = [`Command failed: ${cmd} ${argsArr.join(" ")}`, stdout, stderr]
      .filter(Boolean)
      .join("\n---\n");
    throw new Error(msg);
  }
  return res;
}

async function removePaths(paths) {
  for (const p of paths) {
    try {
      log(`Removing: ${p}`);
      // force: true to ignore missing paths; recursive: true to remove directories
      await rm(p, { recursive: true, force: true });
    } catch (err) {
      throw new Error(`Failed to remove ${p}: ${err?.message || err}`);
    }
  }
}

(async () => {
  try {
    const ok = await confirm();
    if (!ok) {
      console.log("Aborted.");
      process.exit(0);
    }

    // Check required tools
    if (!checkTool("pnpm")) fail("pnpm not found in PATH. Install pnpm or ensure it's available.");
    if (!checkTool("turbo")) log("turbo not found in PATH; skipping turbo steps.");

    // Stop turbo daemon if available
    if (checkTool("turbo")) {
      try {
        runSync("turbo", ["daemon", "stop"]);
        // small delay to let daemon shut down cleanly
        await new Promise((r) => setTimeout(r, 250));
      } catch (err) {
        console.warn("Warning: turbo daemon stop failed:", err.message);
        // continue to attempt turbo clean anyway
      }

      try {
        runSync("turbo", ["clean"]);
      } catch (err) {
        console.warn("Warning: turbo clean failed:", err.message);
      }
    }

    // Remove filesystem paths
    await removePaths(pathsToRemove);

    console.log("Clean complete.");
    process.exit(0);
  } catch (err) {
    console.error("Error during clean:", err?.message || err);
    if (VERBOSE && err?.stack) console.error(err.stack);
    process.exit(1);
  }
})();
