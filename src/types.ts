export type BranchTimeEntry = {
  branch: string;
  timeSpent: number; // in minutes
  lastActive: Date;
};

export type BranchSwitch = {
  branch: string;
  timestamp: Date;
};
