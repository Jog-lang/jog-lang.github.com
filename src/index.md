---
title: Jog
---

# Jog

**Jog** is a low-level language in the same place as C and Go. You work with functions, explicit layouts, and pointers. Memory is managed by hand — no GC. Code is built from structs, methods, and structural interfaces. On top of that sit coroutines, contexts (implicit parameters matched by type), and a few conveniences from Go, Kotlin, and TypeScript.

The product compiler is the Zig-hosted **`jog`** (`jog` 0.2.x-v2) on JogCompiler branch **`develop`** (tracking alias **`v2`**). Native builds go IR → asm → `zig cc`; WebAssembly uses `--target wasm32-emscripten` (IR → C → emcc). Source files use `.jog`. The module manifest is `jog.mod`. Distributed libraries use `.jogz` archives.

This site is the public user wiki for an **early preview**. Expect rough edges; guides describe what the Zig tip actually compiles. Older C seed (`seed`) and self-hosted Jog (`develop-jogc`) trees are archives only.

## Start here

- [Getting started](getting-started/) — build `jog` with Zig from `develop`
- [Tour](tour/) — short language walkthrough
- [Language](language/) — feature pages (gaps called out where still open)
- [Toolchain](toolchain/) — `jog` commands
- [Examples](examples/) — curated programs
- [Tools](tools/) — JogBuild and JogLSP
- [Libraries](libraries/) — JogSDL and JogEngine
- [Links](links/) — public repositories and branches

## Taste

```jog
struct Point {
    x: i64
    y: i64
}

fn Point.len2(): i64 = self.x * self.x + self.y * self.y

fn *Point.move(dx: i64, dy: i64) {
    self.x += dx
    self.y += dy
}

enum Color {
    Red
    Green
    Blue
}

fn colorCode(c: Color): i64 {
    return when c {
        Red -> 1
        Green -> 2
        Blue -> 3
    }
}
```
