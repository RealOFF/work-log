import { render } from "ink";
import { App } from "./app";
import { createRealGitOperations } from "./git-operations";
import { getBranchTimeData } from "./branch-time-service";

export async function main() {
  const gitOps = createRealGitOperations();
  try {
    const branchTimeData = await getBranchTimeData(gitOps);
    render(<App data={branchTimeData} />);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}
