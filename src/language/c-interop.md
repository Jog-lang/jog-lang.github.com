---
title: C interop
---

# C interop

```jog
type c_int = i32
type c_char = i8

extern {
    fn abs(n: c_int): c_int
}

fn cAbs(n: i32): i32 = abs(n)
```

`std.c` has shared aliases and libc/runtime bindings when imports resolve. `@link("lib")` and `jog.mod` `link.*` / `libdir.*` feed the linker.
