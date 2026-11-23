---
title: Memory
---

# Memory

Manual allocation through `mem.Allocator`. Containers take the allocator as a context on allocating methods.

```jog
import std.mem

fn block(): usize {
    with (mem.heap()) {
        val (b, err) = mem.heap().alloc(16, 8)
        if err != null { return 0 }
        defer mem.heap().free(b)
        return b.len
    }
}
```

Spec helpers like free-standing `new` / `alloc` sugar are not all present — call allocator methods.

**Caveat:** `defer` has been observed to segfault in some programs on this tip; prefer explicit frees in hot smoke paths until Friction closes.
