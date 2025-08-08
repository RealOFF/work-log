import type { BranchSwitch } from "./types";

export function parseReflog(
  reflogOutput: string,
  sinceDate: Date = new Date(),
): BranchSwitch[] {
  const today = new Date(sinceDate);
  today.setHours(0, 0, 0, 0);

  const lines = reflogOutput
    .trim()
    .split("\n")
    .filter((line) => line.length > 0);

  const branchSwitches: BranchSwitch[] = [];

  for (const line of lines) {
    const match = line.match(
      /HEAD@\{([^}]+)\}: checkout: moving from .+ to (.+)$/,
    );

    if (match) {
      const timestampStr = match[1];
      const branch = match[2];

      let timestamp: Date;

      if (timestampStr.includes("-") && timestampStr.includes(":")) {
        timestamp = new Date(timestampStr);
      } else {
        timestamp = new Date(timestampStr);
      }

      if (!isNaN(timestamp.getTime()) && timestamp >= today) {
        branchSwitches.push({ branch, timestamp });
      }
    }
  }

  return branchSwitches.sort(
    (a, b) => b.timestamp.getTime() - a.timestamp.getTime(),
  );
}
