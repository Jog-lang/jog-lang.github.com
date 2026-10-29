---
title: C interop
status: works in V1
---

# C interop

**Status:** works in V1

Call C through `extern` blocks in Jog syntax. Types and helpers live in `std.c`.

```jog
import std.c

extern {
    fn abs(n: c.int): c.int
    fn atoi(s: *const c.char): c.int
}

fn cAbs(n: i32): i32 = abs(n)

fn cParse(): i32 = atoi(c"1234")

fn cLen(): usize = c.strlen(c"hello")
```

- `c"..."` is a NUL-terminated `*const c.char`.
- `@link("name")` on an `extern` block (or `link` lines in `jog.mod`) passes libraries to the linker.
- `private extern { }` keeps bindings package-private.
- C variadics: `...` on an `extern` function.
- Nullable C pointers: `*T?`. Untyped: `*void` / `*void?`.
- Function pointer types: `extern (c.int) -> c.int`.
- `@opaque struct`, `@union struct`, and `@export fn` (callable from C) are part of the surface; `@export` is accepted in V1.

`std.c` aliases match the Windows x64 (LLP64) host (`c.int` = `i32`, `c.long` = `i32`, `c.size_t` = `usize`, and so on).
