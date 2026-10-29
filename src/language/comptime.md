---
title: Comptime
status: partial
---

# Comptime

**Status:** partial

Ordinary Jog can run inside the compiler for constants and annotations. There is no separate macro language.

## What runs at compile time

| Where | Example |
|---|---|
| Top-level `val` | `val Max = 1 + 2` |
| Constant positions | array lengths |
| Annotation arguments | `@align(n)` |
| Explicit `@comptime(expr)` | inside a function |

Top-level `val` constants are evaluated by the compiler. Built-in annotations are handled at compile time.

## Designed, not general yet

- User-defined annotations via `@Annotation` functions (generate code next to a declaration) come after V1.
- Runtime reflection from module metadata is after V1.
- `@embed("path")` and a broader comptime subset are specified; treat advanced metaprogramming as planned unless you have a working example under `jog test`.

## Budget

`jog build` / `jog run` accept `--comptime-steps N` (default a large IR instruction budget) to cap compile-time evaluation.
