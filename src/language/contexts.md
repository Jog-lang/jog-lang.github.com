---
title: Contexts
status: works in V1
---

# Contexts

**Status:** works in V1

A context is a parameter the caller does not write; the compiler fills it from values in scope **by type**.

Declare with `with (name: Type)`. Provide with:

- a `with (value) { ... }` block
- `context name = value` for the rest of the block
- `call(...) with (value)` at one call site

```jog
import std.mem
import std.list
import std.arena

fn copyText(s: str): str with (a: mem.Allocator) {
    val (raw, err) = a.alloc(s.len, align(u8))
    if err != null {
        panic("out of memory")
    }
    for i in 0 as usize..s.len {
        raw.ptr[i] = s.ptr[i]
    }
    return raw
}

fn heapDemo(): i64 {
    var total: i64 = 0
    with (mem.heap()) {
        var xs: list.List<i64>
        for i in 0..4 {
            xs.push(i * i)
        }
        defer xs.free()
        for i in 0 as usize..xs.len {
            total += xs.get(i)
        }
    }
    return total
}

fn arenaDemo(): usize {
    var ar = arena.init(0)
    defer ar.release()
    var n: usize = 0
    with (&ar) {
        val s = copyText("hey")
        n = s.len
    }
    return n
}
```

Public functions must declare their contexts; private functions and lambdas may infer them. `main` starts with runtime defaults (allocator, error allocator, scope, logger), so it can call allocating code directly. Other entry paths must declare or provide what they use.
