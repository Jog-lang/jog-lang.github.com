---
title: Getting started
---

# Getting started

Jog is at early preview (`jog 0.0.1`). The [JogCompiler](https://github.com/Jog-lang/JogCompiler) repository has two long-lived branches:

| Branch | Binary | Role |
|---|---|---|
| `seed` | `jog` | C stage-0 compiler |
| `develop` | `jogc` | Jog self-hosted compiler (needs an external `jog`) |

Build `jog` first, then use that binary to build `jogc`.

## Prerequisites

- Windows x86-64 or Linux x86-64 (aarch64 is not supported yet)
- For `seed`: CMake, Ninja, and a C toolchain (**gcc** and **clang** on `PATH`)
- For `develop`: a working `jog` binary (from `seed`) and a C linker toolchain for the emitted C

## Build `jog` (`seed`)

Clone JogCompiler and check out **`seed`**:

```
git clone https://github.com/Jog-lang/JogCompiler.git
cd JogCompiler
git checkout seed
```

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

Put that binary on your `PATH`, or set `JOG` to its full path (JogBuild, JogLSP, and a `develop` checkout honor `JOG`). Std ships next to the compiler (`../std` from the binary’s folder), or set `JOG_ROOT` to the folder that contains `std/` and `runtime/`.

Confirm:

```
jog version
```

You should see `jog 0.0.1`.

## Build `jogc` (`develop`)

Check out **`develop`** (same clone, or a second worktree). This branch has no CMake seed tree — stage 0 is always an external `jog`.

```
git checkout develop
export JOG=/path/to/seed/build-linux/jog   # Windows: path to build/jog.exe
"$JOG" build -o out/jogc
./out/jogc version
```

On Windows the output is typically `out/jogc.exe`. `JOG` must be set, or `jog` must be on `PATH`.

Day-to-day work can use either binary. For shipping modules and for tools that spawn a compiler, point `JOG` at the one you intend to run; see [Toolchain](toolchain/) and [Tools](tools/).

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

`jog run` builds in debug mode and runs the program. `jog build` writes an executable under `out/` (or the `-o` path). Add `out/` to `.gitignore`. The same commands work with `jogc` once you have built it.

You can also try the compiler’s own example after a seed build:

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

`jog check` / `jogc check` only typecheck and stop before lowering; confirm with `test` or `build` when you care about IR, C emit, and linking.

## Next

- [Tour](tour/) — language overview
- [Toolchain](toolchain/) — commands, flags, layout
- [Examples](examples/)
