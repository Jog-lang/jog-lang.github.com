---
title: Tools
---

# Tools

Beside the Zig-hosted compiler `jog`, two companion projects help day-to-day work. Both track the v2 line.

Set **`JOG`** to your `jog` binary (or put it on `PATH`). See [Getting started](getting-started/) and [Toolchain](toolchain/).

## JogBuild

[JogBuild](https://github.com/Jog-lang/JogBuild) reads `jog.mod`, resolves local folder and `.jogz` dependencies, unpacks archives into a cache, writes `jog.lock`, packs libraries, and invokes the compiler with `--module <name>=<dir>` flags.

Commands include `init`, `build`, `run`, `test`, `pack`, `deps`, and `help`.

There is **no network fetch** yet — only local paths and `.jogz` archives on disk. Optionally set `JOG_CACHE` for the module cache.

```
jog build -o out/jog-build
out/jog-build help
```

Prefer `jog-build` when a module has `require` lines. The compiler itself never follows dependency paths.

## JogLSP

[JogLSP](https://github.com/Jog-lang/JogLSP) is the Zig language server and VS Code / Cursor extension for the v2 compiler.

**What the extension does today**

- TextMate highlighting (client-side)
- **Diagnostics** on open/change/save via `jog check --diag=json` (module flags from `jog-build deps --flags` when available)
- **Document symbols**, **hover**, **go to definition**, **completion**

Build the Zig server from `server/`:

```
cd server && zig build
# install zig-out/bin/server into editors/vscode/bin/
```

Settings: `jog.serverPath` for the server binary; `jog.compilerPath` (or `JOG`) for the compiler.

## Maturity

| Tool | Role | Honesty check |
|---|---|---|
| `jog` | Zig compiler (`develop` / `v2`) | Product line for new work |
| JogBuild | Dependency / pack / invoke | Local deps and archives |
| JogLSP | Editor language server | Diags, symbols, hover, definition, completion |

See also [Toolchain](toolchain/) and [Links](links/).
