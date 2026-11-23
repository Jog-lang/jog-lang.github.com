---
title: Tour
---

# Tour

A short walkthrough of what **jog 0.2.x-v2** accepts today. For design depth and open gaps, see [Language](../language/).

## At a glance

- Low-level, C-like semantics: manual memory, no GC, no exceptions. Native: IR → asm → `zig cc`.
- Types after names. Declarations start with a keyword. Everything is **public by default**; `private` narrows it.
- Numbers never convert implicitly — every conversion is `as`. Integer overflow panics.
- Allocation goes through an `Allocator` passed as a **context**.
- Prefer builtin `print` for hello-world; std packages that import cleanly include `mem`, `list`, `testing`, and others listed on [Std](../std/).

## Lexical basics

Files are UTF-8 `.jog`. Comments: `//` and nested `/* */`. A newline ends a statement when the last token can end an expression; a line ending in an operator or `,` continues.

```jog
fn longSum(a: i64, b: i64, c: i64): i64 {
    val total = a +
        b +
        c
    return total
}
```

Literals: `42`, `1_000_000`, `0xFF`, `3.14`, `"text\n"`, `` `raw path` ``, `c"nul C string"`, `'a'`, `true`, `false`, `null`.

## Declarations and control flow

```jog
val MaxItems = 64
var calls: i64

fn add(a: i32, b: i32): i32 {
    return a + b
}

fn square(x: i64): i64 = x * x

fn sign(x: i64): i64 {
    if x > 0 { return 1 }
    if x < 0 { return -1 }
    return 0
}

fn sumTo(n: i64): i64 {
    var total: i64 = 0
    for i in 0..n {
        total += i
    }
    return total
}
```

`for` is the only loop: `for cond { }`, `for i in a..b { }`. `if` is a **statement** on this tip (not an expression). Plain enums use exhaustive `when`:

```jog
enum Color {
    Red
    Green
}

fn code(c: Color): i64 {
    return when c {
        Red -> 1
        Green -> 2
    }
}
```

Enum payloads, lambdas, and `if` expressions are specified but **not yet** on v2.

## Packages

A **folder is a package**. Files listed in `jog.mod` (`root` / `source`) share declarations. `import std.mem` is per-file. The entry point is `fn main()` in the root package. `*.test.jog` files compile under `jog test`.

## Types in brief

Integers, floats, `bool`, `str` (byte view), arrays `[N]T`, slices `[]T`, pointers `*T` / `*T?`, tuples, distinct types, structs, plain enums, structural interfaces.

```jog
fn widen(a: i32): i64 = a as i64

struct Point {
    x: i64
    y: i64
}

fn Point.len2(): i64 = self.x * self.x + self.y * self.y
```

## Contexts

```jog
import std.mem

fn copyText(s: str): str with (a: mem.Allocator) {
    val (raw, err) = a.alloc(s.len, align(u8))
    if err != null {
        panic("out of memory")
    }
    for i in 0 as usize..s.len {
        raw.ptr[i] = s.ptr[i]
    }
    return raw
}
```

Provide a context with `with (mem.heap()) { ... }` or `call(...) with (value)`.

## Generics and coroutines

```jog
import std.cmp

fn maxOf<T: cmp.Ordered>(a: T, b: T): T {
    if a > b { return a }
    return b
}
```

Coroutines on v2 use `go(fn, arg)`, `yield()`, and `coro_drain()` (see compiler `examples/coro_yield.jog`). The older `scope` / `go { }` / `Chan` form is not yet on this tip.

## Manifest

```
module hello
root main.jog
```

Optional lines: `version`, `kind`, `jog 0.2.0`, `require`, `export`, `link`, directory `source`. See [Modules](../modules/).

## Next

- [Language](../language/) — per-feature pages
- [Std](../std/) — standard library overview
- [Examples](../examples/)
