import { expect, test, describe } from "vitest";
import { parseReflog } from "../src/reflog-parser";

describe("parseReflog", () => {
  test("should parse reflog output with checkout events", () => {
    const reflogOutput = `c3e0e2b (HEAD -> main, origin/main, test-0) HEAD@{2025-08-08 22:54:18 +0200}: checkout: moving from test-0 to main
c3e0e2b (HEAD -> main, origin/main, test-0) HEAD@{2025-08-08 22:52:59 +0200}: checkout: moving from main to test-0
c3e0e2b (HEAD -> main, origin/main, test-0) HEAD@{2025-08-08 22:47:51 +0200}: checkout: moving from test-0 to main
c3e0e2b (HEAD -> main, origin/main, test-0) HEAD@{2025-08-08 22:47:44 +0200}: checkout: moving from main to test-0
c3e0e2b (HEAD -> main, origin/main, test-0) HEAD@{2025-07-28 23:37:27 +0200}: checkout: moving from test-0 to main
c3e0e2b (HEAD -> main, origin/main, test-0) HEAD@{2025-07-28 23:13:23 +0200}: checkout: moving from main to test-0
c3e0e2b (HEAD -> main, origin/main, test-0) HEAD@{2025-07-28 23:01:07 +0200}: commit: chore: setup pnpm version for ci`;

    const result = parseReflog(reflogOutput, new Date("2025-08-08"));

    expect(result).toHaveLength(4); // Only 4 switches from 2025-08-08

    expect(result[0]).toEqual({
      branch: "main",
      timestamp: new Date("2025-08-08T22:54:18+02:00"),
    });

    expect(result[1]).toEqual({
      branch: "test-0",
      timestamp: new Date("2025-08-08T22:52:59+02:00"),
    });

    expect(result[2]).toEqual({
      branch: "main",
      timestamp: new Date("2025-08-08T22:47:51+02:00"),
    });

    expect(result[3]).toEqual({
      branch: "test-0",
      timestamp: new Date("2025-08-08T22:47:44+02:00"),
    });
  });

  test("should filter out events before the specified date", () => {
    const reflogOutput = `c3e0e2b HEAD@{2025-08-08 22:54:18 +0200}: checkout: moving from test-0 to main
c3e0e2b HEAD@{2025-07-28 23:37:27 +0200}: checkout: moving from test-0 to main`;

    const result = parseReflog(reflogOutput, new Date("2025-08-08"));

    expect(result).toHaveLength(1);
    expect(result[0].branch).toBe("main");
    expect(result[0].timestamp).toEqual(new Date("2025-08-08T22:54:18+02:00"));
  });

  test("should handle empty reflog output", () => {
    const result = parseReflog("");
    expect(result).toHaveLength(0);
  });

  test("should ignore non-checkout events", () => {
    const reflogOutput = `c3e0e2b HEAD@{2025-08-08 22:54:18 +0200}: checkout: moving from test-0 to main
c3e0e2b HEAD@{2025-08-08 22:47:44 +0200}: commit: chore: setup pnpm version for ci`;

    const result = parseReflog(reflogOutput, new Date("2025-08-08"));

    expect(result).toHaveLength(1);
    expect(result[0].branch).toBe("main");
  });
});
