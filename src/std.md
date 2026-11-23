---
title: Std
---

# Std

The standard library ships with the compiler (`../std` next to the `jog` binary, or `$JOG_ROOT/std`). Confirm with `jog roots`. Import as `import std.<package>`; refer by last segment (`mem.heap`) or alias when supported.

## Conventions

- **Allocation is a context.** Methods that allocate declare `with (a: mem.Allocator)`. Containers do not store an allocator.
- **Out of memory** in std allocators typically **panics**.
- Builtin **`print`** is available without importing `std.io`.
- Programmer errors (bad index, pop on empty) panic.

## Packages

| Package | Role | Notes on v2 tip |
|---|---|---|
| `std.c` | C aliases, libc / runtime bindings | Used by other packages |
| `std.cmp` | `Ordered`, `Comparable`, numeric sets | OK |
| `std.io` | `print` / files / logger | **Import currently broken** — use builtin `print` |
| `std.mem` | `Allocator`, `heap()` | OK |
| `std.testing` | `@test` helpers | OK |
| `std.list` | `List<T>` | OK |
| `std.map` | `Map<K, V>` (+ `fnv1a`) | OK |
| `std.strbuilder` | Growable text buffer | OK |
| `std.arena` | Bump `Arena` | Parse/import gaps possible |
| `std.fs` | Files, join, list | Host-dependent |
| `std.conv` | Parse/format integers & floats, hex | OK |
| `std.os` | args, env, pid, hostname, … | OK |
| `std.json` | `Value` tree parse/stringify | OK |
| `std.proc` | Run child, capture output | Host-dependent |
| `std.math` | libm + helpers | OK |
| `std.text` | `str` views / owned helpers | OK |

## Quick examples

```jog
fn main() {
    print("hi\n")
}
```

```jog
import std.mem
import std.list

fn demo(): i64 {
    var total: i64 = 0
    with (mem.heap()) {
        var xs: list.List<i64>
        xs.push(1, 2, 3)
        defer xs.free()
        for i in 0 as usize..xs.len {
            total += xs.get(i)
        }
    }
    return total
}
```

```jog
import std.testing

@test
fn smoke() with (t: testing.Testing) {
    t.expect(2 + 2 == 4)
}
```

For API detail, read the `.jog` sources under the compiler’s `std/` tree. See also [Memory](language/memory/) and [Contexts](language/contexts/).
