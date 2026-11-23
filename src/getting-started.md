---
title: Getting started
---

# Getting started

Jog’s product compiler is Zig-hosted **`jog`** (`jog` 0.2.x-v2) on [JogCompiler](https://github.com/Jog-lang/JogCompiler) branch **`develop`** (alias **`v2`**). Branches `seed` (C stage-0) and `develop-jogc` (pre-cut self-hosted Jog) are archives only.

## Prerequisites

- Linux x86-64 or Windows x86-64
- [Zig](https://ziglang.org/) (see the compiler repo’s `build.zig.zon` for the pinned version)
- For wasm: [emsdk](https://emscripten.org/) (`emcc` on `PATH`)

## Build `jog`

```
git clone https://github.com/Jog-lang/JogCompiler.git
cd JogCompiler
git checkout develop
zig build
./zig-out/bin/jog version
./zig-out/bin/jog roots
```

Put `./zig-out/bin/jog` on your `PATH`, or set `JOG` to its full path. Std and core must be discoverable: either leave them next to the binary layout, or set `JOG_ROOT` to the checkout (the folder that contains `std/` and `core/`). Confirm with `jog roots`.

You should see a line like `jog 0.2.12-v2 (zig host, …)`.

## Hello module

`jog.mod`

```
module hello
root main.jog
```

`main.jog`

```jog
fn main() {
    print("Hello from Jog!\n")
}
```

From that folder:

```
jog check .
jog build . -o out/hello
./out/hello
```

Builtin `print` writes bytes (add your own newline). `import std.io` is not reliable on this tip yet — see [Std](../std/). Add `out/` to `.gitignore`.

Try a compiler example after the build:

```
jog build examples/hello.jog -o out/hello
./out/hello
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
jog test .
```

`jog check` only typechecks and stops before lowering; confirm with `test` or `build` when you care about codegen and linking.

## Editor (optional)

[JogLSP](https://github.com/Jog-lang/JogLSP) is a Zig language server for the v2 compiler: diagnostics via `jog check --diag=json`, symbols, hover, definition, completion. Set `JOG` (or `jog.compilerPath`) to your `jog` binary. Build steps: [Tools](../tools/).

## Next

- [Tour](../tour/) — language overview
- [Toolchain](../toolchain/) — commands, flags, layout
- [Tools](../tools/) — JogBuild and JogLSP
- [Examples](../examples/)
