import { execFile } from "node:child_process";
import { promisify } from "node:util";

export interface GitOperations {
  getReflog: (sinceDate: Date) => Promise<string>;
  getCurrentBranch: () => Promise<string>;
}

export type RunGit = (args: string[]) => Promise<string>;

const execFileAsync = promisify(execFile);

const defaultRunGit: RunGit = async (args) => {
  const { stdout } = await execFileAsync("git", args, {
    maxBuffer: 1024 * 1024 * 10,
  });
  return stdout;
};

export const createRealGitOperations = (
  runGit: RunGit = defaultRunGit,
): GitOperations => {
  return {
    getReflog: async (sinceDate: Date) => {
      const iso = sinceDate.toISOString();
      return runGit(["reflog", "--date=iso", `--since=${iso}`]);
    },
    getCurrentBranch: async () => {
      const out = await runGit(["rev-parse", "--abbrev-ref", "HEAD"]);
      return out.trim();
    },
  };
};
