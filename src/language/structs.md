---
title: Structs
status: works in V1
---

# Structs

**Status:** works in V1

Value types with fields, defaults, methods outside the type, embedding, and extensions.

```jog
struct Config {
    name: str
    retries: i32 = 3
    verbose: bool
}

struct Point {
    x: i64
    y: i64
}

fn Point.len2(): i64 = self.x * self.x + self.y * self.y

fn *Point.move(dx: i64, dy: i64) {
    self.x += dx
    self.y += dy
}

fn i64.isEven(): bool = self % 2 == 0

struct Entity {
    id: u64
    pos: Point
}

struct Player {
    Entity
    name: str
}
```

- Literals: named (`Config(name: "srv")`), positional (`Point(1, 2)`), or zero (`Point()`). No heap allocation from a literal alone.
- `fn T.m` is a read-only `self`; `fn *T.m` can mutate. Calling a pointer method on a value takes `&` automatically.
- Methods declared in the type’s package; the same syntax in another package is an extension (public members only).
- Embedding promotes fields.

## V1 notes

- Call methods on a bound value, not directly on a fresh literal (`val p = Point(...); p.len2()`).
- Pointer methods on array elements: take `val e = &arr[i]` first.
- `@packed` is accepted but ignored for size.
