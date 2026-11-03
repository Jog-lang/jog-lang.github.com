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

[JogLSP](https://github.com/Jog-lang/JogLSP) is the language server and VS Code / Cursor extension. It is still early preview: it does what is listed below, not rename, find-references, formatting, or inlay hints.

**What the extension does today**

- TextMate highlighting, comments, and brackets (client-side; no server required for color)
- **Diagnostics** on open, change, and save — in-process load and typecheck via the JogCompiler **`develop`** frontend (`require jogc`), with open buffers overriding disk; module `require` lines still go through `jog-build deps --flags`
- **Document symbols** — top-level declarations (functions, types, bindings)
- **Hover** — type and declaration when known; empty on unknown or error nodes
- **Go to definition** — across files and packages, including std
- **Completion** — names in scope, and fields/methods after `.` (incomplete tokens still complete)

Build the server from `server/` against a local **`develop`** checkout of JogCompiler (the server’s `jog.mod` requires module `jogc`):

```
# from JogLSP/server, with JOG pointing at seed jog
jog build -o out/server --module jogc=../../JogCompiler
jog test --module jogc=../../JogCompiler
```

The editor package is under `editors/vscode`. Copy `server/out/server` (or `server.exe`) into `editors/vscode/bin/`, package the VSIX, and install. Settings: `jog.serverPath` for the server binary; `jog.compilerPath` (or `JOG`) for the seed `jog` used when resolving `jog-build` and related tools.

## Maturity

| Tool | Role | Honesty check |
|---|---|---|
| `jog` | Seed compiler (C, branch `seed`) | Reference for V1; builds native and wasm |
| `jogc` | Self-hosted compiler (Jog, branch `develop`) | Same commands; built with an external `jog` |
| JogBuild | Dependency / pack / invoke | Local deps and archives; remote fetch later |
| JogLSP | Editor language server | Diags on open/change/save, symbols, hover, definition, completion; no rename/refs/format yet |

See also [Toolchain](toolchain/) for compiler commands and [Links](links/).
