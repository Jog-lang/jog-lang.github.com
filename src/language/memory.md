---
title: Memory
status: partial
---

# Memory

**Status:** partial

No GC. Explicit allocation through an `Allocator` context. Pointers and slices as in C-family languages, with checked slices for everyday work.

## Pointers

```jog
var x: i32 = 5
val p: *i32 = &x
*p = 6
```

`*T` is never null; `*T?` may be. Field access and method calls auto-dereference. Pointer arithmetic and `p[i]` are unchecked (like C). Prefer slices for bounds-checked access.

## Allocators

```jog
interface Allocator {
    fn alloc(size: usize, align: usize): (bytes, error?)
    fn resize(b: bytes, size: usize): (bytes, error?)
    fn free(b: bytes)
}
```

- `mem.heap()` — malloc-backed general allocator (std panics on OOM rather than returning an error).
- `std.arena` — bump allocator; `free` is a no-op; `release` drops everything.
- Containers take the allocator as a context on allocating methods (`push`, `free`), never as a stored field.

```jog
with (mem.heap()) {
    val (buf, err) = a.alloc(size(T), align(T))
    // ...
}
```

## V1 notes

- Spec helpers such as `new`, `tryAlloc`, `dup`, `delete` are not in std yet — call `alloc` / `free` on the allocator.
- To free an allocated `str`, rebuild a `bytes` header or use `fs.free_str`.
- `@unchecked { }` disables bounds checks for a block; overflow checks stay on in all build modes.
