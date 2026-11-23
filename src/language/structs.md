---
title: Structs
---

# Structs

C layout, methods outside the type, pointer receivers for mutation.

```jog
struct Point {
    x: i64
    y: i64
}

fn Point.len2(): i64 = self.x * self.x + self.y * self.y

fn *Point.move(dx: i64, dy: i64) {
    self.x += dx
    self.y += dy
}
```

## Not yet on v2

- Struct embedding (`struct Player { Entity … }`)
- Field assign through a `val p = &c; p.field = …` in some cases — mutate via `*T` methods or the local binding
