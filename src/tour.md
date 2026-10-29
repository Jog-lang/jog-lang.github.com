---
title: Tour
---

# Tour

A short walkthrough of what **jog 0.0.1** accepts today. For design depth and status badges, see [Language](language/).

## At a glance

- Low-level, C-like semantics: manual memory, no GC, no exceptions. Compiles to C, then clang or gcc.
- Types after names. Declarations start with a keyword. Everything is **public by default**; `private` narrows it.
- Numbers never convert implicitly — every conversion is `as`. Integer overflow panics.
- Allocation goes through an `Allocator` passed as a **context** (an implicit parameter matched by type).
- Errors are values: a fallible function returns `error?` as its last result.

## Lexical basics

Files are UTF-8 `.jog`. Comments: `//` and nested `/* */`. A newline ends a statement when the last token can end an expression; a line ending in an operator or `,` continues. Lines starting with `.`, `?.`, or `?:` continue the previous line.

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

fn sumTo(n: i64): i64 {
    var total: i64 = 0
    for i in 0..n {
        total += i
    }
    return total
}
```

`for` is the only loop: `for cond { }`, `for i in a..b { }`, `for i, x in xs { }`. `if` and `when` are expressions.

## Packages

A **folder is a package**. Files in the same folder see each other without imports. `import std.io` and `import net.http as h` are per-file. The entry point is `fn main()` in the root package (the folder with `jog.mod`). `*.test.jog` files compile only under `jog test`.

## Types in brief

Integers (`i8`…`i64`, `u8`…`u64`, `isize`/`usize`), floats, `bool`, `rune`, `str` (read-only byte view), `bytes`, arrays `[N]T`, slices `[]T`, pointers `*T` / `*T?`, tuples, distinct types (`type Celsius: f64`), structs, enums, and structural interfaces.

```jog
fn widen(a: i32): i64 = a as i64

struct Point {
    x: i64
    y: i64
}

fn Point.len2(): i64 = self.x * self.x + self.y * self.y
```

## Errors and contexts

```jog
fn lookup(key: str): (i64, error?) {
    if key == "answer" {
        return 42, null
    }
    return 0, ErrNotFound
}

fn copyText(s: str): str with (a: mem.Allocator) {
    val (raw, err) = a.alloc(s.len, align(u8))
    if err != null {
        panic("out of memory")
    }
    // ... copy bytes ...
    return raw
}
```

Provide a context with `with (mem.heap()) { ... }`, `context a = mem.heap()`, or `call(...) with (value)`. `main` starts with runtime defaults, so it can allocate without declaring contexts.

## Generics, lambdas, coroutines

```jog
fn maxOf<T: cmp.Ordered>(a: T, b: T): T {
    if a > b { return a }
    return b
}

fn apply(x: i64, f: (i64) -> i64): i64 = f(x)

fn answer(): i64 {
    var v: i64 = 0
    scope {
        val task = go with (mem.heap()) { 40 + 2 }
        v = task.join()
    }
    return v
}
```

## Manifest

Minimal `jog.mod`:

```
module hello
```

Optional v2 lines include `version`, `kind executable|library`, `jog 0.0.1`, `require`, `export`, and `link`. See [Modules](modules/).

## Next

- [Language](language/) — per-feature pages
- [Std](std/) — standard library overview
- [Examples](examples/)
