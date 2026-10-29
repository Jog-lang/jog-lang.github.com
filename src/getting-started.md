---
title: Getting started
---

# Getting started

Jog is at early preview (`jog 0.0.1`). You build the seed compiler from source, then use it to check, test, and run modules.

## Prerequisites

- Windows x86-64 or Linux x86-64 (aarch64 is not supported yet)
- CMake, Ninja, and a C toolchain: **gcc** and **clang** on `PATH`

## Build the compiler

Clone [JogCompiler](https://github.com/Jog-lang/JogCompiler) and build:

**Windows**

```
cmake -S . -B build -G Ninja
cmake --build build --target jog
```

The binary is `build/jog.exe`. Optionally run the full gate: `pwsh scripts/check.ps1` (prints `check: OK`).

**Linux**

```
cmake -S . -B build-linux -G Ninja
cmake --build build-linux --target jog
```

The binary is `build-linux/jog`. Optionally: `scripts/check.sh`.

Put that binary on your `PATH`, or set `JOG` to its full path (tools such as JogBuild and JogLSP honor `JOG`). Std ships next to the compiler (`../std` from the binary’s folder), or set `JOG_ROOT` to the folder that contains `std/` and `runtime/`.

Confirm:

```
jog version
```

You should see `jog 0.0.1`.

## Hello module

Create a folder with a manifest and a main file:

`jog.mod`

```
module hello
```

`main.jog`

```jog
import std.io

fn main() {
    io.println("Hello from Jog!")
}
```

From that folder:

```
jog check
jog run
jog build -o out/hello
```

`jog run` builds in debug mode and runs the program. `jog build` writes an executable under `out/` (or the `-o` path). Add `out/` to `.gitignore`.

You can also try the compiler’s own example after a build:

```
jog run examples/hello
```

## Tests

Put tests in `*.test.jog` next to the code (same package). Mark functions with `@test`:

```jog
import std.testing

@test
fn adds() with (t: testing.Testing) {
    t.expect(1 + 1 == 2)
}
```

```
jog test
```

`jog check` only typechecks; confirm with `jog test` or `jog build` when you care about lowering and linking.

## Next

- [Tour](tour/) — language overview
- [Toolchain](toolchain/) — commands, flags, layout
- [Examples](examples/)
