---
title: Functions
status: works in V1
---

# Functions

**Status:** works in V1

Ordinary functions, expression bodies, multiple returns, lambdas, trailing lambdas, named/default arguments, `if` / `when` as expressions.

```jog
fn divmod(a: i64, b: i64): (i64, i64) {
    return a / b, a % b
}

fn square(x: i64): i64 = x * x

fn connect(host: str, port: i64 = 80, retries: i64 = 3): i64 =
    port + retries

fn apply(x: i64, f: (i64) -> i64): i64 = f(x)

fn lambdas(): i64 {
    val double = (x: i64) -> { x * 2 }
    var sum: i64 = 0
    repeat(3) { i -> sum += i }
    repeat(2) { sum += it }
    return apply(5, double) + sum
}
```

## `when` and patterns

```jog
fn httpKind(code: i64): str {
    return when code {
        200, 204 -> "ok"
        in 300..400 -> "redirect"
        404 -> "missing"
        else -> "error"
    }
}
```

First match wins. Enum `when` must be exhaustive or have `else`.

## Pack parameters

```jog
fn sum(...i64: xs): i64 {
    var total: i64 = 0
    for i in 0 as usize..xs.len {
        total += xs[i]
    }
    return total
}
```

The pack is a `[]T` in the body and must be the last parameter.

## V1 notes

- Non-escaping function parameters may capture locals by reference.
- `escaping` function values are not ready yet.
- Operator methods (`fn T.op+`) parse, but user operators often do not apply yet — see [generics](generics/).
