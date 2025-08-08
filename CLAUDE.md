# Claude Development Rules

This document contains project-specific rules and conventions for AI assistants working on this codebase.

## Project Overview

Work-log is a CLI tool that tracks time spent in git branches using reflog analysis and displays results in a beautiful table format using Ink React.

## Build System

- **Primary build tool**: `tsdown` - modern TypeScript bundler
- **Development**: `pnpm run dev` (watch mode)
- **Production build**: `pnpm run build`
- **Testing**: `vitest`

## Code Conventions

### TypeScript

- **Prefer `type` over `interface`** - Use type aliases instead of interfaces
- **Strict TypeScript** - Follow strict type checking
- **ESM modules** - Use ES module imports/exports

### File Naming

- **kebab-case** - All files should use kebab-case naming
- Examples: `work-log-app.tsx`, `git-parser.ts`, `time-calculator.ts`

### Code Style

- **ESLint + Prettier** - Automated formatting and linting
- **No semicolons** - Prettier configured without semicolons
- **2 spaces** - Standard indentation
- **Minimal comments** - Add comments ONLY for code that is genuinely difficult to understand. Most code should be self-documenting through good naming and clear structure

## Scripts and Commands

Essential npm scripts:

- `pnpm run build` - Build the project with tsdown
- `pnpm run dev` - Development mode with watch
- `pnpm run test` - Run tests with vitest
- `pnpm run lint` - Lint code with ESLint
- `pnpm run format` - Format code with Prettier
- `pnpm run format:check` - Check code formatting
- `pnpm run typecheck` - TypeScript type checking
- `pnpm run work-log` - Run the CLI tool in development

## Dependencies

### Runtime

- `ink` - React for CLI applications
- `react` - React library
- `simple-git` - Git operations

### Development

- `tsdown` - Build tool
- `vitest` - Testing framework
- `eslint` - Code linting
- `prettier` - Code formatting
- `typescript` - TypeScript compiler

## Project Structure

```text
src/
├── index.ts   # Library entry point
├── main.tsx   # CLI entry point with UI components
├── utils.ts   # Utility functions
└── [other modules] # Additional modules in kebab-case
```

## Development Workflow

1. **Always run linting and formatting** before commits:

   ```bash
   pnpm run lint
   pnpm run format:check
   pnpm run typecheck
   ```

2. **Use tsdown for building** - Don't configure other build tools

3. **Follow existing patterns** - Look at existing files for code style examples

4. **Test thoroughly** - Run `pnpm run test` and manually test CLI with `pnpm run work-log`

## CLI Tool Specifics

- **Entry point**: `src/main.tsx` (contains all CLI logic and UI components)
- **Git operations**: Use `simple-git` library
- **UI framework**: Ink React for terminal interfaces
- **Time tracking**: Parse git reflog for branch switches
- **Architecture**: Single file approach with all components in main.tsx

## Important Notes

- This is a CLI tool, not a web application
- Focus on terminal user experience
- Git repository context is required for functionality
- Handle edge cases gracefully (no git repo, no branch switches, etc.)
