---
title: Toolchain
---

# Toolchain

The seed compiler command is `jog` (`jog version` → `jog 0.0.1`). It reads a module, typechecks, lowers to IR, emits C, and links with clang or gcc. WebAssembly uses `--target wasm32` with `wasm-ld` (and Node for `run`).

## Commands

```
usage: jog <command> [arguments]
```

| Command | Does |
|---|---|
| `build` | Compile to an executable |
| `run` | Debug build, then run (`--` passes args to the program) |
| `test` | Build with `*.test.jog`, run `@test` functions |
| `check` | Load, resolve, typecheck (no lowering) |
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
| `JOG` | Path to `jog` for JogBuild / JogLSP (not read by `jog` itself) |
| `JOG_CACHE` | JogBuild module cache |

## Diagnostics

Text on stderr: `file:line:column: severity: message`.

`jog check --diag=json` prints JSON Lines on stdout with `file`, `line`, `column` (1-based bytes), `severity`, `message`.

## Project layout

See [Modules](modules/). With dependencies, use [JogBuild](tools/) or pass `--module` yourself.

## Building `jog` from source

See [Getting started](getting-started/) and the [JogCompiler](https://github.com/Jog-lang/JogCompiler) README.
