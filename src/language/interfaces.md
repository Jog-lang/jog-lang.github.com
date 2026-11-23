---
title: Interfaces
---

# Interfaces

Structural interfaces: a value matches if it has the required methods (and fields when specified).

```jog
interface Named {
    fn greet(): str
}
```

## Caveats on v2

Interface methods that return `str` have been observed to segfault in some harnesses — keep smoke tests thin and prefer integer-returning methods until Friction closes.
