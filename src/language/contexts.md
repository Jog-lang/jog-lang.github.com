---
title: Contexts
---

# Contexts

Implicit parameters matched by type. Allocators are the main example.

```jog
import std.mem

fn copyText(s: str): str with (a: mem.Allocator) {
    val (raw, err) = a.alloc(s.len, align(u8))
    if err != null {
        panic("out of memory")
    }
    return raw
}

fn demo(): usize {
    val s = copyText("abc") with (mem.heap())
    return s.len
}
```

Provide contexts with `with (value) { … }`, `context name = value`, or `call(…) with (value)`.
