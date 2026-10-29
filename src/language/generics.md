---
title: Generics
status: partial
---

# Generics

**Status:** partial

Type parameters `<T>`, interface constraints, monomorphization. Std constraints live in `std.cmp`.

```jog
import std.cmp

fn maxOf<T: cmp.Ordered>(a: T, b: T): T {
    if a > b { return a }
    return b
}

fn total<T: cmp.Number>(start: T, xs: []T): T {
    var sum = start
    for i in 0 as usize..xs.len {
        sum = sum + xs[i]
    }
    return sum
}

struct Pair<A, B> {
    first: A
    second: B
}

fn Pair<A, B>.swap(): Pair<B, A> =
    Pair<B, A>(first: self.second, second: self.first)
```

Call as `maxOf(3, 7)` or `byteSize<i32>(3)`. Construct as `Pair<i64, str>(first: 1, second: "one")`.

Type sets: `Signed`, `Unsigned`, `Integer`, `Float`, `Number` (`~T` includes distinct types over `T`).

## V1 notes

- No zero value for a bare `T` inside a generic body — pass a start value instead of `var x: T`.
- `str` does not satisfy `cmp.Ordered`.
- User `op<=>` / `op==` methods do not yet make the operators apply, so user types cannot meet `Ordered` / `Comparable` that way.
- Calls like `list.empty<i64>()` may fail to infer `T` from another package; write `var xs: list.List<i64>` instead.
