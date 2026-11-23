---
title: Examples
---

# Examples

Curated snippets that match the Zig tip (`jog` 0.2.x-v2). Copy into a module with `root main.jog` and run `jog test` or `jog build`.

## Hello

```jog
fn main() {
    print("Hello from Jog!\n")
}
```

`jog.mod`:

```
module hello
root main.jog
```

## Basics

```jog
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

fn sign(x: i64): i64 {
    if x > 0 { return 1 }
    if x < 0 { return -1 }
    return 0
}
```

## Types and structs

```jog
fn widen(a: i32): i64 = a as i64

struct Point {
    x: i64
    y: i64
}

fn Point.len2(): i64 = self.x * self.x + self.y * self.y

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

## Contexts

```jog
import std.mem

fn copyText(s: str): str with (a: mem.Allocator) {
    val (raw, err) = a.alloc(s.len, align(u8))
    if err != null {
        panic("out of memory")
    }
    return raw
}
```

## Generics

```jog
import std.cmp

fn maxOf<T: cmp.Ordered>(a: T, b: T): T {
    if a > b { return a }
    return b
}
```

## Coroutines

```jog
fn worker(arg: *byte) {
    yield()
}

fn main() {
    go(worker, null)
    coro_drain()
}
```

## C interop

```jog
type c_int = i32

extern {
    fn abs(n: c_int): c_int
}

fn cAbs(n: i32): i32 = abs(n)
```

## Tests

```jog
import std.testing

@test
fn packsWork() with (t: testing.Testing) {
    t.expect(1 + 1 == 2)
}
```

See [Getting started](../getting-started/) and [Tour](../tour/).
