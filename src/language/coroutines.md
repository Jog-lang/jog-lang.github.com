---
title: Coroutines
---

# Coroutines

Stackful coroutines. On the Zig tip the working form is runtime-style:

```jog
fn worker(arg: *byte) {
    print("w1\n")
    yield()
    print("w2\n")
}

fn main() {
    go(worker, null)
    coro_drain()
}
```

See also `dispatcher_single()` / multi-worker examples under JogCompiler `examples/coro_*.jog`.

## Not yet on v2

- `scope { }` / `go { … }` / `go with (alloc) { … }`
- `Chan<T>` / `select`
