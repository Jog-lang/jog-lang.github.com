---
title: Std
---

# Std

The standard library ships with the compiler (`../std` next to the `jog` binary, or `$JOG_ROOT/std`). Import as `import std.<package>`; refer by last segment (`io.println`) or alias.

## Conventions (V1)

- **Allocation is a context.** Methods that allocate declare `with (a: mem.Allocator)`. Containers do not store an allocator.
- **Out of memory** in std allocators typically **panics** rather than returning an error.
- Some I/O failures use `(T, bool)` instead of `error?`.
- Programmer errors (bad index, pop on empty) panic.

## Packages

| Package | Role |
|---|---|
| `std.c` | C type aliases, libc / runtime bindings |
| `std.cmp` | `Ordered`, `Comparable`, numeric type sets |
| `std.io` | `print` / `println`, `eprint`, file `read_all` / `write_all`, `Logger` |
| `std.mem` | `Allocator`, `heap()`, error arena |
| `std.testing` | `Testing` for `@test` (`expect`, `expectEq`, `expectPanic`, …) |
| `std.list` | Growable `List<T>` |
| `std.map` | `Map<K, V>` (caller supplies hash; `fnv1a` for `str`) |
| `std.strbuilder` | Growable text buffer |
| `std.arena` | Bump `Arena` implementing `Allocator` |
| `std.fs` | Files, join, directory list (Windows-focused in V1) |
| `std.os` | `argc` / `argv`, `env` |
| `std.proc` | Run a child and capture output (Windows-focused in V1) |
| `std.math` | `floor`, `ceil`, `log2`, `exp2` via libm |
| `std.text` | `str` views and helpers: `slice`, `starts_with`, `trim`, `parse_u64_dec`, `clone`, `split`, `runes`, … |

## `std.text`

Import `std.text` for string views and owned copies. Most helpers allocate nothing. `clone`, case maps, `replace`, and `runes` need an `Allocator` context.

```jog
import std.text as texts

fn digits(s: str): (u64, bool) {
    return texts.parse_u64_dec(s.trim())
}
```

| API | Role |
|---|---|
| `slice` / `starts_with` / `ends_with` / `index_of` / `contains` | Views and search (empty needle matches at the start) |
| `trim` / `trim_start` / `trim_end` | Strip ASCII space, tab, CR, LF |
| `is_digit` / `is_hex_digit` / `parse_u64_dec` | ASCII classification and unsigned decimal parse (no overflow check) |
| `clone` / `to_lower` / `to_upper` / `replace` | Owned copies |
| `split` / `count` | Split views; non-overlapping match count |
| `rune_iter` / `runes` | UTF-8 code points (ill-formed bytes → U+FFFD) |

## Quick examples

```jog
import std.io
import std.mem
import std.list

fn main() {
    io.println("hi")
    with (mem.heap()) {
        var xs: list.List<i64>
        xs.push(1, 2, 3)
        defer xs.free()
        io.println("ok")
    }
}
```

```jog
import std.testing

@test
fn smoke() with (t: testing.Testing) {
    t.expect(2 + 2 == 4)
    t.expectEq("a", "a")
}
```

For API detail, read the `.jog` sources under the compiler’s `std/` tree. See also [Memory](language/memory/) and [Contexts](language/contexts/).
