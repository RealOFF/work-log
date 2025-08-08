import type { BranchTimeEntry } from "./types";
import type { GitOperations } from "./git-operations";
import { parseReflog } from "./reflog-parser";
import { calculateBranchTimes } from "./time-calculator";

export async function getBranchTimeData(
  gitOps: GitOperations,
): Promise<BranchTimeEntry[]> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const currentTime = new Date();

  const reflogOutput = await gitOps.getReflog(today);
  const branchSwitches = parseReflog(reflogOutput, today);

  const branchTimes = calculateBranchTimes(branchSwitches, currentTime);

  const result: BranchTimeEntry[] = [];

  for (const [branch, timeSpent] of branchTimes) {
    const lastSwitch = branchSwitches
      .filter((switch_) => switch_.branch === branch)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())[0];

    result.push({
      branch,
      timeSpent: Math.round(timeSpent),
      lastActive: lastSwitch?.timestamp || today,
    });
  }

  return result.sort((a, b) => b.timeSpent - a.timeSpent);
}
