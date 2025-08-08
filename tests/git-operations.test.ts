import { describe, test, expect } from "vitest";
import { createRealGitOperations, type RunGit } from "../src/git-operations";

describe("createRealGitOperations", () => {
  test("uses injected runGit for getCurrentBranch", async () => {
    let capturedArgs: string[] | null = null;
    const fakeRunGit: RunGit = async (args) => {
      capturedArgs = args;
      if (args[0] === "rev-parse") return "feature\n";
      return "";
    };

    const gitOps = createRealGitOperations(fakeRunGit);
    const branch = await gitOps.getCurrentBranch();

    expect(branch).toBe("feature");
    expect(capturedArgs).toEqual(["rev-parse", "--abbrev-ref", "HEAD"]);
  });

  test("uses injected runGit for getReflog and passes since date in ISO", async () => {
    let capturedArgs: string[] = [];
    const fakeRunGit: RunGit = async (args) => {
      capturedArgs = args;
      return "MOCKED_REFLOG";
    };

    const gitOps = createRealGitOperations(fakeRunGit);
    const since = new Date("2025-08-08T00:00:00.000Z");
    const out = await gitOps.getReflog(since);

    expect(out).toBe("MOCKED_REFLOG");
    expect(capturedArgs[0]).toBe("reflog");
    expect(capturedArgs).toContain("--date=iso");
    expect(capturedArgs.some((a) => a.startsWith("--since="))).toBe(true);
    expect(capturedArgs.find((a) => a.startsWith("--since="))).toBe(
      `--since=${since.toISOString()}`,
    );
  });
});
