---
title: Generics
---

# Generics

```jog
import std.cmp

fn maxOf<T: cmp.Ordered>(a: T, b: T): T {
    if a > b { return a }
    return b
}

struct Pair<A, B> {
    first: A
    second: B
}
```

User `op<=>` / `op==` methods still do not always make operators apply for constraints — stick to types that already satisfy `Ordered` / `Comparable`.
