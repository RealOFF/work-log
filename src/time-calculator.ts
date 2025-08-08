import type { BranchSwitch } from "./types";

export function calculateBranchTimes(
  branchSwitches: BranchSwitch[],
  currentTime: Date,
) {
  const branchTimes = new Map<string, number>();

  if (branchSwitches.length === 0) {
    return branchTimes;
  }

  const sortedSwitches = [...branchSwitches].sort(
    (a, b) => a.timestamp.getTime() - b.timestamp.getTime(),
  );

  for (let i = 0; i < sortedSwitches.length; i++) {
    const currentSwitch = sortedSwitches[i];
    const nextSwitch = sortedSwitches[i + 1];

    const startTime = currentSwitch.timestamp;
    const endTime = nextSwitch ? nextSwitch.timestamp : currentTime;

    const timeSpent =
      Math.max(0, endTime.getTime() - startTime.getTime()) / (1000 * 60);

    const currentTimeForBranch = branchTimes.get(currentSwitch.branch) || 0;
    branchTimes.set(currentSwitch.branch, currentTimeForBranch + timeSpent);
  }

  return branchTimes;
}
