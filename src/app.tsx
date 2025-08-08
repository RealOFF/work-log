import { Box, Text } from "ink";
import type { BranchTimeEntry } from "./types";
import { formatDuration, formatTime } from "./utils";

type AppProps = {
  data: BranchTimeEntry[];
};

export function App({ data }: AppProps) {
  if (data.length === 0) {
    return (
      <Box flexDirection="column" padding={1}>
        <Text color="yellow">No branch activity found for today.</Text>
        <Text dimColor>
          Make sure you&apos;re in a git repository and have switched branches
          today.
        </Text>
      </Box>
    );
  }

  const totalTime = data.reduce((sum, entry) => sum + entry.timeSpent, 0);

  const maxBranchLength = Math.max(...data.map((d) => d.branch.length), 6);
  const timeColumnWidth = 10;
  const lastActiveWidth = 12;

  return (
    <Box flexDirection="column" padding={1}>
      <Text color="cyan" bold>
        📊 Git Branch Time Tracker - Today
      </Text>
      <Text> </Text>

      <Box>
        <Text bold color="gray">
          {"Branch".padEnd(maxBranchLength)} {"Time".padEnd(timeColumnWidth)}{" "}
          {"Last Active".padEnd(lastActiveWidth)}
        </Text>
      </Box>

      <Text color="gray">
        {"─".repeat(maxBranchLength + timeColumnWidth + lastActiveWidth + 2)}
      </Text>

      {data.map((entry, index) => (
        <Box key={entry.branch}>
          <Text color={index === 0 ? "green" : "white"}>
            {entry.branch.padEnd(maxBranchLength)}
          </Text>
          <Text color="cyan">
            {" " + formatDuration(entry.timeSpent).padEnd(timeColumnWidth)}
          </Text>
          <Text color="yellow">{" " + formatTime(entry.lastActive)}</Text>
        </Box>
      ))}

      <Text> </Text>
      <Text color="gray">
        {"─".repeat(maxBranchLength + timeColumnWidth + lastActiveWidth + 2)}
      </Text>
      <Box>
        <Text bold>{"Total".padEnd(maxBranchLength)}</Text>
        <Text bold color="cyan">
          {" " + formatDuration(totalTime)}
        </Text>
      </Box>
    </Box>
  );
}
