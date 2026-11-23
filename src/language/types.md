---
title: Types
---

# Types

Scalars, views, arrays, pointers, options, tuples, distinct types, plain enums — with limits around payloads, `str ==`, and some casts.

- Integers never convert implicitly: use `as`.
- `str` is a read-only byte view (`.ptr`, `.len`). Prefer `s.ptr[i]` for bytes.
- `*T?` optional pointers: `!!`, `?:` (safe-call `?.` still limited).
- Distinct types: `type Celsius: f64` — convert with `as`.
- Plain enums work with `when`. **Enum payloads are not yet parsed.**

```jog
fn widen(a: i32): i64 = a as i64

type Celsius: f64
fn warm(c: Celsius): bool = c as f64 > 20.0
```
