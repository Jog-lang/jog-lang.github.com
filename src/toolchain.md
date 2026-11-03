---
title: Toolchain
---

# Toolchain

JogCompiler ships two compilers with the **same command surface**:

| Binary | Branch | Built from |
|---|---|---|
| `jog` | `seed` | C sources (CMake) |
| `jogc` | `develop` | Jog sources (`jog build` with an external `jog`) |

Both report `jog 0.0.1` style versioning for the preview. They read a module, typecheck, lower to IR, emit C, and link with clang or gcc. WebAssembly uses `--target wasm32` with `wasm-ld` (and Node for `run`).

For day-to-day work and for tools (JogBuild, JogLSP), pick one binary and point `JOG` at it — that is the compiler those tools will run. The seed `jog` remains the reference for V1; `jogc` is the self-hosted path and shares the commands below.

## Commands

```
usage: jog <command> [arguments]
```

The same table applies to `jogc`:

| Command | Does |
|---|---|
| `build` | Compile to an executable |
| `run` | Debug build, then run (`--` passes args to the program) |
| `test` | Build with `*.test.jog`, run `@test` functions |
| `check` | Load, resolve, typecheck — **stops before lowering** |
| `emit-c` | Print generated C |
| `emit-ir` | Print IR |
| `parse` / `lex` | Debug one file |
| `version` / `help` | Version string / usage |

Common flags:

- `[package]` — start path (file or folder); walks up to `jog.mod`. Default: current directory.
- `--module name=dir` — map a `require`d module to a source folder (repeatable).
- `build`: `-o file`, `--release`, `--release-fast`, `--keep-c`, `--target wasm32`, `--comptime-steps N`
- `check`: `--diag=text|json`

## Outputs

- Executable: `out/<module name>` (`.exe` on Windows, `.wasm` for wasm), or `-o`.
- Generated C: `out/<module>.c` (deleted after link unless `--keep-c`).
- Ignore `out/` in git.

## Build modes

| Mode | Flag | Bounds / `!!` | Overflow |
|---|---|---|---|
| debug | (default) | on | on |
| release | `--release` | on | on |
| release-fast | `--release-fast` | off | on |

`run` and `test` always use debug.

## Environment

| Variable | Meaning |
|---|---|
| `JOG_CC` | C compiler instead of searching clang then gcc |
| `JOG_ROOT` | Folder containing `std/` and `runtime/` |
| `JOG` | Path to the compiler binary for JogBuild / JogLSP / building `jogc` (not read by `jog` itself when you invoke it directly) |
| `JOG_CACHE` | JogBuild module cache |

## Diagnostics

Text on stderr: `file:line:column: severity: message`.

`jog check --diag=json` (or `jogc check --diag=json`) prints JSON Lines on stdout with `file`, `line`, `column` (1-based bytes), `severity`, `message`.

## Project layout

See [Modules](modules/). With dependencies, use [JogBuild](tools/) or pass `--module` yourself.

## Building from source

See [Getting started](getting-started/): check out `seed` for `jog`, then `develop` with `JOG` set for `jogc`. Repository and branch links: [Links](links/).
