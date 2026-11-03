---
title: Tools
---

# Tools

Beside the compilers `jog` and `jogc`, two companion projects are written in Jog itself. Both are early preview quality, matching `jog 0.0.1`.

Set **`JOG`** to the compiler binary you want the tools to run (`seed`’s `jog` or `develop`’s `jogc`), or put that binary on `PATH` under the name the tool expects. See [Getting started](getting-started/) and [Toolchain](toolchain/).

## JogBuild

[JogBuild](https://github.com/Jog-lang/JogBuild) is the build tool: it reads `jog.mod`, resolves local folder and `.jogz` dependencies, unpacks archives into a cache, writes `jog.lock`, packs libraries, and invokes the compiler with `--module <name>=<dir>` flags.

Commands include `init`, `build`, `run`, `test`, `pack`, `deps`, and `help`.

There is **no network fetch** yet — only local paths and `.jogz` archives on disk. Optionally set `JOG_CACHE` for the module cache; otherwise JogBuild uses a platform default under the user cache directory.

Build the tool from its repo root with a working compiler:

```
jog build -o out/jog-build
out/jog-build help
```

Prefer `jog-build` when a module has `require` lines. The compiler itself never follows dependency paths — without `--module` flags it reports that a required module was not given.

## JogLSP

[JogLSP](https://github.com/Jog-lang/JogLSP) is a **diagnostics-only** language server. On save it runs `jog check --diag=json` (via the binary `JOG` / `jog.compilerPath` points at) and surfaces those diagnostics over LSP (stdin/stdout framing).

It does not yet provide completions, go-to-definition, hover, document symbols, or rename. Highlighting in the VS Code / Cursor extension comes from a TextMate grammar and does not need the server. Richer editor features land later; this page will be updated when they ship.

Build the server from `server/` in that repo:

```
jog test
jog build
```

The editor package lives under `editors/vscode`. Point `jog.compilerPath` (or `JOG`) at the compiler you want check-on-save to use.

## Maturity

| Tool | Role | Honesty check |
|---|---|---|
| `jog` | Seed compiler (C, branch `seed`) | Reference for V1; builds native and wasm |
| `jogc` | Self-hosted compiler (Jog, branch `develop`) | Same commands; built with an external `jog` |
| JogBuild | Dependency / pack / invoke | Local deps and archives; remote fetch later |
| JogLSP | Editor diagnostics | Check-on-save only until the next wiki pass |

See also [Toolchain](toolchain/) for compiler commands and [Links](links/).
