---
title: Errors
---

# Errors

Design: fallible functions return `error?` as the last result; sentinels in `std.error` compare by identity.

**On the Zig tip today:** top-level `val ErrX = &global` does not lower, so importing `std.error` / `std.io` is unreliable. Guide demos use `(T, bool)` until that lands.

```jog
fn lookup(key: i64): (i64, bool) {
    if key == 1 {
        return 42, true
    }
    return 0, false
}
```

There is no `try` / `?` propagation sugar on this tip.
