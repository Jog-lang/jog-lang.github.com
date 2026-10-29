---
title: Examples
---

# Examples

Curated snippets that match V1 reality (`jog 0.0.1`). Copy into a module with a `jog.mod` and run `jog test` or `jog run`.

## Hello

Minimal print via std:

```jog
import std.io

fn main() {
    io.println("Hello from Jog!")
}
```

`jog.mod`:

```
module hello
```

Direct libc (as in the compiler’s `examples/hello`):

```jog
extern {
    fn puts(s: *const c_char): c_int
}

type c_char = i8
type c_int = i32

fn main() {
    val greeting = c"Hello from Jog!"
    if puts(greeting) < 0 {
        return
    }
}
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
    return if x > 0 { 1 } else if x < 0 { -1 } else { 0 }
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

fn *Point.move(dx: i64, dy: i64) {
    self.x += dx
    self.y += dy
}

enum Shape {
    Circle(r: f64)
    Rect(w: f64, h: f64)
    Empty
}

fn area(s: Shape): f64 {
    return when s {
        Circle(r) -> 3.0 * r * r
        Rect(w, h) -> w * h
        Empty -> 0.0
    }
}
```

## Errors

```jog
struct NotFound {
    tag: u8
}

fn NotFound.message(): str = "not found"

var notFound: NotFound
val ErrNotFound = &notFound

fn lookup(key: str): (i64, error?) {
    if key == "answer" {
        return 42, null
    }
    return 0, ErrNotFound
}
```

## Contexts and lists

```jog
import std.mem
import std.list

fn squares(n: i64): list.List<i64> with (a: mem.Allocator) {
    var xs: list.List<i64>
    for i in 0..n {
        xs.push(i * i)
    }
    return xs
}

fn heapDemo(): i64 {
    var total: i64 = 0
    with (mem.heap()) {
        var xs = squares(4)
        defer xs.free()
        for i in 0 as usize..xs.len {
            total += xs.get(i)
        }
    }
    return total
}
```

## Generics

```jog
import std.cmp

fn maxOf<T: cmp.Ordered>(a: T, b: T): T {
    if a > b {
        return a
    }
    return b
}

struct Pair<A, B> {
    first: A
    second: B
}

fn Pair<A, B>.swap(): Pair<B, A> =
    Pair<B, A>(first: self.second, second: self.first)
```

## Lambdas

```jog
fn apply(x: i64, f: (i64) -> i64): i64 = f(x)

fn repeat(n: i64, body: (i64) -> ()) {
    for i in 0..n {
        body(i)
    }
}

fn lambdas(): i64 {
    val double = (x: i64) -> { x * 2 }
    var sum: i64 = 0
    repeat(3) { i -> sum += i }
    repeat(2) { sum += it }
    return apply(5, double) + sum
}
```

## Coroutines

```jog
import std.mem

fn channelSum(): i64 {
    var total: i64 = 0
    scope {
        val ch = Chan<i64>.init(4) with (mem.heap())
        go with (mem.heap()) {
            ch.send(1)
            ch.send(2)
            ch.close()
        }
        for v in ch {
            total += v
        }
    }
    return total
}
```

## C interop

```jog
import std.c

extern {
    fn abs(n: c.int): c.int
}

fn cAbs(n: i32): i32 = abs(n)
```

## Platform split

Core:

```jog
expect fn platform_name(): str
```

Windows:

```jog
actual fn platform_name(): str = "windows"
```

Posix (linux / macos):

```jog
actual fn platform_name(): str = "posix"
```

## Tests

```jog
import std.testing

@test
fn packsWork() with (t: testing.Testing) {
    t.expect(1 + 1 == 2)
}

@test("overflow panics")
fn panicsWork() with (t: testing.Testing) {
    var big: u8 = 255
    t.expectPanic { big += 1 }
}
```

Put tests in `*.test.jog` next to the code. See [Getting started](../getting-started/) and [Tour](../tour/).
