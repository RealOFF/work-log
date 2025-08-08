# work-log

📊 A CLI tool that tracks time spent in git branches using reflog analysis and displays results in a beautiful table format.

## Features

- **Time tracking**: Automatically calculates time spent in each git branch today
- **Git reflog analysis**: Uses git reflog to track branch switches and calculate durations  
- **Beautiful output**: Terminal table display using Ink React
- **Real-time data**: Shows current day's branch activity with last active times
- **Zero configuration**: Works out of the box in any git repository

## Installation

```bash
# Clone and install dependencies
git clone <repo-url>
cd work-log
pnpm install

# Build the project
pnpm run build

# Run the CLI tool
pnpm run work-log
```

## Usage

### Development Mode
```bash
# Run directly with tsx (development)
pnpm run work-log
```

### Built Version
```bash
# Run the built CLI tool
node dist/main.js

# Or use the npm script
pnpm start
```

### Global Installation (after publishing)
```bash
# Install globally
npm install -g work-log

# Run anywhere
work-log
```

## Example Output

```text
📊 Git Branch Time Tracker - Today

Branch          Time      Last Active
────────────────────────────────────────
feature/login   2h 34m    14:23
main           1h 12m    16:45
bugfix/auth    45m       13:10
────────────────────────────────────────
Total          4h 31m
```

## How It Works

1. **Reflog Analysis**: Parses `git reflog` to find branch checkout events from today
2. **Time Calculation**: Calculates duration between branch switches
3. **Data Aggregation**: Sums up total time spent per branch
4. **Table Display**: Uses Ink React to render a beautiful terminal table

## Requirements

- Node.js (latest LTS recommended)
- Git repository (tool must be run inside a git repo)
- Branch switching activity (tool shows data for current day only)

## Development

### Setup
```bash
# Install dependencies
pnpm install

# Run in development mode
pnpm run dev
```

### Available Scripts
- `pnpm run build` - Build with tsdown
- `pnpm run dev` - Development mode with watch
- `pnpm run test` - Run tests with vitest
- `pnpm run lint` - Lint code with ESLint
- `pnpm run format` - Format code with Prettier
- `pnpm run format:check` - Check formatting
- `pnpm run typecheck` - TypeScript type checking
- `pnpm run work-log` - Run CLI tool in development

### Tech Stack
- **Build Tool**: tsdown
- **Runtime**: Node.js
- **UI Framework**: Ink (React for CLI)
- **Git Operations**: simple-git
- **Language**: TypeScript
- **Testing**: Vitest
- **Linting**: ESLint + Prettier

### Code Conventions
- Use `type` instead of `interface` for TypeScript
- File naming: kebab-case (`work-log-app.tsx`)
- ESM modules with strict TypeScript

## Contributing

1. Fork the repository
2. Create a feature branch
3. Follow the code conventions in `CLAUDE.md`
4. Run tests and linting: `pnpm run test && pnpm run lint`
5. Submit a pull request

## License

MIT