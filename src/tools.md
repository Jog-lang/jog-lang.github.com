---
title: Tools
---

# Tools

Beside the seed compiler `jog`, two companion projects are written in Jog itself. Both are early preview quality, matching `jog 0.0.1`.

## JogBuild

[JogBuild](https://github.com/Jog-lang/JogBuild) is the build tool: it reads `jog.mod`, resolves local folder and `.jogz` dependencies, unpacks archives into a cache, writes `jog.lock`, packs libraries, and invokes the compiler with `--module <name>=<dir>` flags.

Commands include `init`, `build`, `run`, `test`, `pack`, `deps`, and `help`.

Set `JOG` to your compiler binary (or put `jog` on `PATH`). Optionally set `JOG_CACHE` for the module cache; otherwise JogBuild uses a platform default under the user cache directory.

Build the tool from its repo root with a working `jog`:

```
jog build -o out/jog-build
out/jog-build help
```

Prefer `jog-build` when a module has `require` lines. The compiler itself never follows dependency paths — without `--module` flags it reports that a required module was not given.

## JogLSP

[JogLSP](https://github.com/Jog-lang/JogLSP) is a **diagnostics-only** language server. On save it runs `jog check --diag=json` and surfaces those diagnostics over LSP (stdin/stdout framing).

It does not yet provide completions, go-to-definition, or rename. Highlighting in the VS Code / Cursor extension comes from a TextMate grammar and does not need the server.

Build the server from `server/` in that repo:

```
jog test
jog build
```

The editor package lives under `editors/vscode`. Point `jog.compilerPath` (or `JOG`) at your `jog` binary.

## Maturity

| Tool | Role | Honesty check |
|---|---|---|
| `jog` | Seed compiler (C) | Reference for V1; builds native and wasm |
| JogBuild | Dependency / pack / invoke | Local deps and archives; remote fetch later |
| JogLSP | Editor diagnostics | Check-on-save only |

See also [Toolchain](toolchain/) for compiler commands and [Links](links/).
