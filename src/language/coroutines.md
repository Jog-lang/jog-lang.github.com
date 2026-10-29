---
title: Coroutines
status: works in V1
---

# Coroutines

**Status:** works in V1

Stackful coroutines with structured concurrency. V1 runs on one OS thread and switches at `send`, `recv`, `sleep`, and `yield`.

```jog
import std.mem

fn answer(): i64 {
    var v: i64 = 0
    scope {
        val task = go with (mem.heap()) { 40 + 2 }
        v = task.join()
    }
    return v
}

fn channelSum(): i64 {
    var total: i64 = 0
    scope {
        val ch = Chan<i64>.init(4) with (mem.heap())
        go with (mem.heap()) {
            ch.send(1)
            ch.send(2)
            ch.close()
        }
        for v in ch {
            total += v
        }
    }
    return total
}

fn firstReady(): i64 {
    var got: i64 = 0
    scope {
        val ch = Chan<i64>.init(0) with (mem.heap())
        go with (mem.heap()) { ch.send(7) }
        select {
            recv(ch) { v -> got = v }
        }
    }
    return got
}
```

- `go` needs a `Scope` (from `scope { }`) and an `Allocator` for the coroutine stack.
- `scope` returns after every child finishes.
- Inside `main`, `go { ... }` can omit `with` because of default contexts; elsewhere write `go with (mem.heap()) { ... }`.
- `select` supports `recv`, `send`, `timeout(ms)`, and `default`.
- Send on a closed channel yields `ErrClosed`.
