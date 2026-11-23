---
title: Toolchain
---

# Toolchain

JogCompiler’s product binary is Zig-hosted **`jog`** on branch **`develop`** (`v2` alias). It typechecks, lowers to IR, and either emits native asm (linked with `zig cc`) or C for Emscripten.

Archives: `seed` (C `jog`), `develop-jogc` (self-hosted `jogc`). Same command *names* where they overlap, but day-to-day docs target the Zig tip only.

## Commands

```
usage: jog <command> [args]
```

| Command | Does |
|---|---|
| `version` / `help` | Version string / usage |
| `roots` | Print std/core discovery |
| `parse` / `symbols` | Debug / LSP symbols |
| `ide …` | JSON IDE queries (JogLSP) |
| `check` | Load and typecheck — **stops before lowering** |
| `test` | Build+run `@test` in root-module `*.test.jog` |
| `build` | Native or `--target wasm32-emscripten` executable |
| `deps` | Source paths or `--module` flags |

Common flags:

- Path: `.jog` file, directory with `jog.mod`, or `jog.mod`
- `--module name=dir` — map a `require`d module (repeatable)
- `build`: `-o OUT`, `--keep-asm`, `--keep-c`, `--target wasm32-emscripten`, `--libdir` / `-L`
- `check`: `--diag=json`, `--test`

## Environment

| Variable | Meaning |
|---|---|
| `JOG_ROOT` | Folder containing `std/` and `core/` |
| `JOG` | Compiler path for JogBuild / JogLSP |
| `JOG_CACHE` | JogBuild module cache |
| `EMCC` | Emscripten override |

## Diagnostics

Text on stderr: `file:line:column: severity: message`.

`jog check --diag=json` prints JSON Lines on stdout with `file`, `line`, `column` (1-based bytes), `severity`, `message`.

## Building from source

See [Getting started](../getting-started/). Branches: [Links](../links/).
